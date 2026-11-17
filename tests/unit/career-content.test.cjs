const { careerFiles } = require("../helpers/assets.cjs");
const assert = require("node:assert/strict"),
  fs = require("node:fs"),
  vm = require("node:vm");
const { baseline, generate } = require("../../scripts/build-career.cjs");
const before = baseline(),
  c = {};
vm.createContext(c);
for (const f of careerFiles) vm.runInContext(fs.readFileSync(f, "utf8"), c);
const data = JSON.parse(JSON.stringify(c.CAREER_CONTENT));
const oldGenerated = careerFiles.map((f) => fs.readFileSync(f, "utf8"));
generate();
assert.deepEqual(
  careerFiles.map((f) => fs.readFileSync(f, "utf8")),
  oldGenerated,
  "Build must be deterministic",
);
assert.equal(Object.keys(data.tracks).length, 5);
let n = 0,
  cases = 0;
for (const [track, j] of Object.entries(data.tracks)) {
  const old = before[track];
  assert.equal(j.cases.length, 94);
  assert.deepEqual(j.plan, old.plan);
  assert.deepEqual(j.levels, old.levels);
  assert.deepEqual(j.bonus, old.bonus);
  assert.equal(j.story.length, 7);
  j.story.forEach((s) => {
    assert.ok(s.en.length > 80 && s.ru.length > 60);
  });
  assert.deepEqual(
    j.cases.map((c) => c.id),
    old.cases.map((c) => c.id),
  );
  let longest = 0,
    unbalanced = [];
  for (const ca of j.cases) {
    const prior = old.cases.find((c) => c.id === ca.id);
    cases++;
    assert.equal(ca.type, prior.type);
    assert.equal(ca.steps.length, prior.steps.length);
    assert.deepEqual(ca.meters, prior.meters);
    for (const [i, s] of ca.steps.entries()) {
      n++;
      const prev = prior.steps[i],
        key = track + "/" + ca.id + "." + i,
        max = Math.max(...prev.options.map((o) => o.p));
      assert.equal(s.options.length, 3, key);
      assert.equal(new Set(s.options.map((o) => o.t)).size, 3, key);
      assert.equal(
        Math.max(...s.options.map((o) => o.p)),
        max,
        key + " max must preserve old points",
      );
      assert.ok(
        s.options.some((o) => o.ok) && s.options.some((o) => !o.ok),
        key + " must contain discriminating alternatives",
      );
      for (const o of s.options) {
        assert.equal(o.ok, o.p === max, key + " key");
        assert.ok(o.t.length > 45 && o.c.length > 35, key);
        assert.ok(!prev.options.some((p) => p.t === o.t), key + " reply was not rewritten");
        if (ca.meters) assert.equal(o.e.length, ca.meters.length, key);
      }
      assert.ok(s.explain.length > 75, key);
      assert.ok(s.msg);
      assert.ok(s.words.length >= 1, key);
      assert.ok(
        !/первый вариант|второй вариант|третий вариант|ответ сверху/i.test(s.explain),
        key + " positional feedback",
      );
      const lengths = s.options.map((o) => o.t.split(/\s+/).length);
      if (Math.max(...lengths) / Math.min(...lengths) > 1.85) unbalanced.push([key, lengths]);
      const pref = s.options.find((o) => o.ok);
      if (
        pref.t.split(/\s+/).length >
        Math.max(...s.options.filter((o) => o !== pref).map((o) => o.t.split(/\s+/).length))
      )
        longest++;
    }
  }
  assert.deepEqual(unbalanced, [], track + " answer length differences");
  console.log(
    "PASS",
    track,
    j.cases.length,
    "cases;",
    j.cases.reduce((n, c) => n + c.steps.length, 0),
    "steps; contract, keys, feedback, wording and length",
  );
}
assert.equal(cases, 470);
assert.equal(n, 678);
const step = (track, id, i = 0) => data.tracks[track].cases.find((c) => c.id === id).steps[i];
const best = (track, id, i = 0) => step(track, id, i).options.find((o) => o.ok).t;
assert.match(best("an", "b13"), /null|equal/i);
assert.doesNotMatch(best("an", "b13"), /97% probability|probably not random/i);
assert.match(best("dev", "b29"), /atomicity|atomic/);
assert.doesNotMatch(best("dev", "b29"), /5%/);
assert.match(best("ba", "sc05", 1), /twenty-seven|twenty-seven-hour/);
assert.match(best("ba", "sc05", 1), /ten-hour/);
assert.match(best("ba", "sc10"), /sunk|forward/i);
assert.equal((40 * 12 * 10) / 60, 80);
assert.match(data.tracks.dev.lx.b35.tone.opts.find((o) => o.ok).t, /eighty aggregate build-hours/);
assert.match(data.tracks.an.lx.s13.tone.opts.find((o) => o.ok).t, /verify/);
assert.doesNotMatch(best("an", "b56"), /half.*time/);
assert.match(step("ba", "sc06").msg, /six requested roles/);
const book = JSON.parse(fs.readFileSync("content/storybook.json", "utf8"));
for (const [track, j] of Object.entries(data.tracks)) {
  for (const [i, p] of j.plan.entries())
    assert.ok(j.story[i].en && book.chapters[track][i].learning);
  for (const id of Object.keys(book.links[track]))
    assert.ok(
      j.plan.some((p) => p.b.includes(id) || p.s.includes(id) || p.boss === id),
      track + "/" + id + " bridge must be in campaign",
    );
}
console.log(
  "PASS: 470 cases / 678 authored steps, immutable progress denominators, 35 bilingual chapters, explicit alternative keys and factual-regression checks.",
);
