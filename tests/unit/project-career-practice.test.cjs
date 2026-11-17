const { careerFiles } = require("../helpers/assets.cjs");
const assert = require("node:assert/strict"),
  fs = require("node:fs"),
  vm = require("node:vm"),
  crypto = require("node:crypto");
const c = { document: { addEventListener() {} }, console };
vm.createContext(c);
for (const f of [
  ...careerFiles,
  "data/practice/additional.js",
  "data/practice/product.js",
  "data/practice/project.js",
  "src/features/practice.js",
  "src/features/career-practice.js",
])
  vm.runInContext(fs.readFileSync(f, "utf8"), c);
const all = JSON.parse(JSON.stringify(c.CAREER_PRACTICE_DATA)),
  tasks = all.filter((t) => t.track === "pm"),
  product = all.filter((t) => t.track === "product");
assert.equal(all.length, 84);
assert.equal(new Set(all.map((t) => t.id)).size, 84);
assert.equal(tasks.length, 42);
assert.equal(
  crypto.createHash("sha256").update(JSON.stringify(product)).digest("hex"),
  "900bb220eae1f669fe063f41ef877ba73770004b8da6fd52f0343f5cda1d5f75",
);
const plans = JSON.parse(JSON.stringify(c.CAREER_CONTENT.tracks.pm.plan)),
  slots = [];
for (let ch = 0; ch < plans.length; ch++) {
  const ids = plans[ch].b.concat(plans[ch].s, [plans[ch].boss]);
  for (let l = 2; l <= ids.length; l += 2) slots.push([ch + 1, l, ids[l - 1]]);
}
assert.deepEqual(
  tasks.map((t) => [t.chapter, t.level, t.caseId]),
  slots,
);
assert.deepEqual(
  tasks.reduce((a, t) => ((a[t.format] = (a[t.format] || 0) + 1), a), {}),
  { gantt: 14, status: 14, scope: 14 },
);
for (const t of tasks) {
  assert.equal(t.difficulty, t.chapter);
  assert.ok(!c.PRACTICE_DATA.some((x) => x.id === t.id));
  for (const s of t.steps) {
    const empty = { selected: [], sequence: [], pairs: {} };
    assert.equal(c.practiceComplete(s, empty), false);
    if (s.kind === "select") {
      assert.equal(s.count, s.key.length);
      assert.ok(s.count > 0 && s.count < s.options.length);
      assert.equal(new Set(s.options.map((o) => o.id)).size, s.options.length);
      const good = { ...empty, selected: s.key.slice() };
      assert.ok(c.practiceComplete(s, good));
      assert.ok(c.practiceCorrect(s, good));
      const bad = {
        ...empty,
        selected: [s.options.find((o) => !s.key.includes(o.id)).id, ...s.key.slice(1)],
      };
      assert.ok(c.practiceComplete(s, bad));
      assert.equal(c.practiceCorrect(s, bad), false);
      if (s.count > 1)
        assert.equal(c.practiceComplete(s, { ...empty, selected: s.key.slice(1) }), false);
      if (t.format === "scope" || (t.format === "gantt" && s.count === 1)) {
        const lengths = s.options.map((o) => o.text.split(/\s+/).length);
        assert.ok(
          Math.max(...lengths) / Math.min(...lengths) <= 1.85,
          t.id + " comparable options " + lengths,
        );
      }
    } else {
      assert.equal(s.kind, "match");
      assert.equal(Object.keys(s.key).length, s.left.length);
      assert.ok(s.left.length >= 4 && s.left.length <= 7);
      assert.ok(s.left.every((item) => s.explain.includes(item.id + " — ")));
      assert.equal(new Set(s.left.map((item) => item.text)).size, s.left.length);
      for (const item of s.left) assert.ok(s.right.some((r) => r.id === s.key[item.id]));
      const good = { ...empty, pairs: s.key };
      assert.ok(c.practiceComplete(s, good));
      assert.ok(c.practiceCorrect(s, good));
      const bad = {
        ...empty,
        pairs: { ...s.key, [s.left[0].id]: s.right.find((r) => r.id !== s.key[s.left[0].id]).id },
      };
      assert.ok(c.practiceComplete(s, bad));
      assert.equal(c.practiceCorrect(s, bad), false);
      if (t.chapter >= 2)
        assert.ok(
          new Set(Object.values(s.key)).size < s.left.length,
          "categories must be reusable",
        );
    }
    assert.ok(s.explain.length > 70);
  }
  if (t.format === "gantt") {
    const a = t.artifacts.find((a) => a.kind === "gantt"),
      rows = a.rows,
      windows = t.artifacts.find((a) => a.title === "Authorized release days");
    const allowed = windows ? windows.rows[0][1].split(", ").map(Number) : null;
    assert.ok(a.endDay >= Math.max(...rows.map((r) => r[5])));
    assert.ok(a.endDay <= 32);
    if (allowed) assert.ok(a.endDay >= Math.max(...allowed));
    const baseline = {},
      updated = {};
    for (const row of rows) {
      const id = row[0].split(" · ")[0],
        start = row[4],
        finish = row[5],
        duration = finish - start + 1,
        deps = row[3] === "None" ? [] : row[3].split(", ");
      assert.equal(row[1], "Day " + start);
      assert.equal(row[2], "Day " + finish);
      assert.ok(duration >= 1);
      assert.ok(
        deps.every((d) => baseline[d]),
        t.id + " topological order",
      );
      assert.ok(
        deps.every((d) => baseline[d].finish < start),
        t.id + " baseline dependency",
      );
      baseline[id] = { start, finish };
      let next = Math.max(
        start + (id === t.audit.delayedTask ? t.audit.delayDays : 0),
        ...deps.map((d) => updated[d].finish + 1),
      );
      if (id === "R" && allowed) {
        assert.ok(allowed.includes(start));
        next = allowed.find((d) => d >= next);
        assert.ok(next);
      }
      updated[id] = { start: next, finish: next + duration - 1 };
    }
    const changed = Object.keys(baseline).filter(
      (id) =>
        id !== t.audit.delayedTask &&
        (baseline[id].start !== updated[id].start || baseline[id].finish !== updated[id].finish),
    );
    assert.deepEqual([...t.steps[0].key].sort(), changed.sort(), t.id + " affected tasks");
    assert.deepEqual(
      t.steps[1].key,
      [String(updated.R.start)],
      t.id + " earliest permitted release",
    );
    assert.ok(
      t.artifacts[0].body.includes(
        t.audit.delayedTask + " starts " + t.audit.delayDays + " days later",
      ),
    );
  } else if (t.format === "scope") {
    const limits = t.artifacts.find((a) => a.title === "Binding limits").rows,
      plans = t.artifacts.find((a) => a.title === "Assessed alternatives");
    assert.deepEqual(
      plans.headers.slice(1),
      limits.map((r) => r[0]),
    );
    const feasible = plans.rows.filter((r) =>
      limits.every(([metric, op, cap], i) => {
        assert.ok(op === "≤" || op === "≥");
        return op === "≤" ? +r[i + 1] <= +cap : +r[i + 1] >= +cap;
      }),
    );
    assert.equal(feasible.length, 1, t.id + " unambiguous feasible proposal");
    assert.deepEqual(t.steps[0].key, [feasible[0][0]]);
  }
}
// Exercise the real hook across colliding IDs in both supported tracks and all unaffected tracks/modes.
for (const [track, j] of Object.entries(c.CAREER_CONTENT.tracks)) {
  c.CUR_TRACK = track;
  c.PLAN = j.plan;
  for (const ca of j.cases)
    for (const mode of ["camp", "rand", "skip", "event"]) {
      const found = c.careerPracticeFor({ c: ca, mode });
      const expected = mode === "camp" && all.find((t) => t.track === track && t.caseId === ca.id);
      assert.equal(found?.id || null, expected?.id || null, track + "/" + ca.id + "/" + mode);
    }
}
assert.equal(c.practiceMergeDone([tasks[0].id], [product[0].id, tasks[0].id]).length, 2);
console.log(
  "PASS: 42 Project slots, 14 per format; independent Gantt dependency/window propagation, unique feasible scope proposals, matching keys/edits/incomplete/wrong answers; track-ID isolation; all 42 Product variants unchanged.",
);
