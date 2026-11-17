const { careerFiles } = require("../helpers/assets.cjs");
const assert = require("node:assert/strict"),
  fs = require("node:fs"),
  vm = require("node:vm");
const c = { document: { addEventListener() {} }, console };
vm.createContext(c);
for (const f of [
  ...careerFiles,
  "data/practice/additional.js",
  "data/practice/product.js",
  "src/features/practice.js",
  "src/features/career-practice.js",
])
  vm.runInContext(fs.readFileSync(f, "utf8"), c);
const tasks = JSON.parse(JSON.stringify(c.CAREER_PRACTICE_DATA)),
  plans = JSON.parse(JSON.stringify(c.CAREER_CONTENT.tracks.product.plan));
assert.equal(tasks.length, 42);
assert.equal(new Set(tasks.map((t) => t.id)).size, 42);
const slots = [];
for (let ch = 0; ch < plans.length; ch++) {
  const ids = plans[ch].b.concat(plans[ch].s, [plans[ch].boss]);
  for (let level = 2; level <= ids.length; level += 2) slots.push([ch + 1, level, ids[level - 1]]);
}
assert.deepEqual(
  tasks.map((t) => [t.chapter, t.level, t.caseId]),
  slots,
);
assert.deepEqual(
  tasks.reduce((m, t) => ((m[t.format] = (m[t.format] || 0) + 1), m), {}),
  { ab: 14, funnel: 14, priority: 14 },
);
for (const t of tasks) {
  assert.equal(t.track, "product");
  assert.ok(!c.PRACTICE_DATA.some((x) => x.id === t.id));
  if (t.chapter >= 3)
    for (const s of t.steps.filter(
      (s) => s.kind === "select" && s.options[0].text.split(/\s+/).length > 10,
    )) {
      const lengths = s.options.map((o) => o.text.split(/\s+/).length);
      assert.ok(
        Math.max(...lengths) / Math.min(...lengths) <= 1.85,
        t.id + " comparable reply lengths",
      );
    }
  for (const s of t.steps) {
    assert.ok(s.explain.length > 50);
    const st = { selected: [], sequence: [], pairs: {} };
    assert.equal(c.practiceComplete(s, st), false);
    if (s.kind === "select") {
      assert.equal(s.count, 1);
      assert.ok(s.options.some((o) => o.id === s.key[0]));
      st.selected = s.key.slice();
    } else {
      assert.equal(s.kind, "order");
      assert.deepEqual([...s.keys[0]].sort(), s.cards.map((x) => x.id).sort());
      st.sequence = s.keys[0].slice();
    }
    assert.ok(c.practiceCorrect(s, st));
    assert.ok(c.practiceComplete(s, st));
    if (s.kind === "select") st.selected = [s.options.find((o) => !s.key.includes(o.id)).id];
    else st.sequence.reverse();
    assert.equal(c.practiceCorrect(s, st), false);
  }
  if (t.audit.version === 2) {
    assert.equal(t.difficulty, t.chapter);
    assert.ok(t.chapter >= 3 && t.chapter <= 7);
    if (t.format === "priority") {
      const a = t.artifacts.find((a) => a.title === "Assessed initiatives");
      const col = (r, name) => +r[a.headers.indexOf(name)];
      const items = a.rows.map((r) => {
        let benefit;
        switch (t.audit.scoring) {
          case "ratio":
            benefit = col(r, "Impact");
            break;
          case "confidence":
            benefit = (col(r, "Impact") * col(r, "Confidence %")) / 100;
            break;
          case "rice":
            benefit =
              (col(r, "Reach accounts") * col(r, "Impact per account") * col(r, "Confidence %")) /
              100;
            break;
          case "net":
            benefit = col(r, "Annual benefit $k") - col(r, "Annual run cost $k");
            break;
          case "risk": {
            const probability = col(r, "Success probability %") / 100;
            benefit =
              probability * col(r, "Upside $k") - (1 - probability) * col(r, "Failure loss $k");
            break;
          }
          default:
            assert.fail("unknown scoring");
        }
        const effort = +r[a.headers.findIndex((h) => h.startsWith("Effort"))];
        assert.ok(effort > 0);
        return {
          id: r[0][0],
          score: benefit / effort,
          deps: r.at(-1) === "None" ? [] : r.at(-1).split(", "),
        };
      });
      const expected = [];
      while (items.length) {
        const ready = items
          .filter((x) => x.deps.every((id) => expected.includes(id)))
          .sort((a, b) => b.score - a.score);
        assert.ok(ready.length, t.id + " dependency cycle");
        let next;
        if (!expected.length && t.audit.mandatory) {
          next = ready.find((x) => x.id === t.audit.mandatory);
          assert.ok(next);
          assert.ok(t.artifacts[0].body.includes("item " + next.id + " FIRST"));
        } else {
          assert.ok(
            !ready[1] || Math.abs(ready[0].score - ready[1].score) > 1e-8,
            t.id + " ambiguous top score",
          );
          next = ready[0];
        }
        expected.push(next.id);
        items.splice(
          items.findIndex((x) => x.id === next.id),
          1,
        );
      }
      assert.deepEqual(t.steps[0].keys, [expected], t.id);
      assert.deepEqual(t.audit.expectedOrder, expected);
    } else if (t.format === "ab") {
      const rows = t.artifacts.find((a) => a.title === "Decision evidence").rows;
      const value = (label) => rows.find((r) => r[0] === label)[1];
      const numbers = (s) => s.match(/[+-]?\d+(?:\.\d+)?/g).map(Number);
      const interval = numbers(value("95% CI for primary effect")),
        threshold = numbers(value("Required lower bound"))[0];
      assert.ok(interval[0] < interval[1]);
      let pass = value("Validity / maturity").startsWith("Pass:") && interval[0] > threshold;
      const labels = rows
        .filter((r) => r[0].endsWith(": control → treatment"))
        .map((r) => r[0].replace(": control → treatment", ""));
      assert.deepEqual(labels, t.audit.guardLabels);
      for (const label of labels) {
        const [before, after] = numbers(value(label + ": control → treatment")),
          limit = numbers(value("Allowed " + label + " increase"))[0];
        assert.ok(before >= 0 && after <= 100);
        pass = pass && after - before <= limit + 1e-8;
      }
      assert.deepEqual(t.steps[0].key, [pass ? "launch" : "hold"], t.id);
    }
    if (t.format !== "funnel") continue;
  }
  const rows = t.artifacts.find((a) => a.kind === "table").rows;
  if (t.format === "funnel") {
    const values = rows.map((r) => r.slice(1).map((x) => Number(x.replaceAll(",", ""))));
    const drops = values
      .slice(1)
      .map((v, i) => (v[1] / values[i][1]) * 100 - (v[0] / values[i][0]) * 100);
    const min = Math.min(...drops);
    assert.equal(drops.filter((x) => Math.abs(x - min) < 1e-8).length, 1);
    assert.deepEqual(t.steps[0].key, ["step" + (drops.indexOf(min) + 1)]);
    assert.equal(drops.indexOf(min) + 1, t.audit.largestDeclineStage);
  } else if (t.format === "priority") {
    const remaining = rows.map((r) => ({ id: r[0][0], score: +r[1] / +r[2], dep: r[3] })),
      order = [];
    while (remaining.length) {
      const a = remaining
        .filter((r) => r.dep === "None" || order.includes(r.dep))
        .sort((a, b) => b.score - a.score);
      assert.ok(a.length);
      assert.notEqual(a[0].score, a[1]?.score);
      order.push(a[0].id);
      remaining.splice(
        remaining.findIndex((r) => r.id === a[0].id),
        1,
      );
    }
    assert.deepEqual(t.steps[0].keys, [order]);
    assert.deepEqual(order, t.audit.expectedOrder);
  } else {
    const numbers = (s) =>
      s
        .replaceAll(",", "")
        .replaceAll("−", "-")
        .match(/[+-]?\d+(?:\.\d+)?/g)
        .map(Number);
    const interval = numbers(rows.find((r) => r[0].startsWith("95% CI"))[1]);
    assert.equal(interval[0], t.audit.lower);
    const max = numbers(rows.find((r) => r[0].startsWith("Allowed"))[1])[0];
    assert.equal(max, t.audit.guardMax);
    let before, after;
    if (t.caseId === "b23") {
      const a = numbers(rows.find((r) => r[0].startsWith("Control:"))[1]),
        b = numbers(rows.find((r) => r[0].startsWith("Treatment:"))[1]);
      before = (a[1] / a[0]) * 100;
      after = (b[1] / b[0]) * 100;
    } else [before, after] = numbers(rows.find((r) => r[0].includes("control → treatment"))[1]);
    assert.equal(before, t.audit.guardBefore);
    assert.equal(after, t.audit.guardAfter);
    const decision = interval[0] > 0 && after - before <= max + 1e-8 ? "launch" : "hold";
    assert.deepEqual(t.steps[0].key, [decision]);
  }
}
// The hook itself must reject every out-of-scope track, chapter, mode and odd slot.
for (const [track, j] of Object.entries(c.CAREER_CONTENT.tracks)) {
  c.CUR_TRACK = track;
  c.PLAN = j.plan;
  for (const ca of j.cases)
    for (const mode of ["camp", "rand", "skip", "event"]) {
      const found = c.careerPracticeFor({ c: ca, mode });
      const expected =
        track === "product" && mode === "camp" && tasks.some((t) => t.caseId === ca.id);
      assert.equal(!!found, expected, track + "/" + ca.id + "/" + mode);
    }
}
assert.equal(c.practiceMergeDone(["product-funnel-v1"], [tasks[0].id]).length, 2);
// The 12 already-published pilot variants retain their exact data and stable IDs.
const crypto = require("node:crypto");
assert.equal(
  crypto
    .createHash("sha256")
    .update(JSON.stringify(tasks.slice(0, 12)))
    .digest("hex"),
  "1eff3872cd86053f6d136bd4d7138bf057ec524ea8dd093062795a4548b4b327",
);
assert.deepEqual(
  tasks.slice(12).reduce((a, t) => ((a[t.chapter] = (a[t.chapter] || 0) + 1), a), {}),
  { 3: 6, 4: 6, 5: 6, 6: 6, 7: 6 },
);
// Independently reconcile the displayed aggregate-mix evidence with the segment tables.
for (const id of ["product-c5-l06-funnel-v1", "product-c7-l06-funnel-v1"]) {
  const t = tasks.find((t) => t.id === id),
    rows = t.artifacts[2].rows.map((r) => r.slice(1).map(Number));
  const before = rows.reduce((n, r) => n + r[1], 0) / rows.reduce((n, r) => n + r[0], 0);
  const after = rows.reduce((n, r) => n + r[3], 0) / rows.reduce((n, r) => n + r[2], 0);
  assert.ok(after > before);
  assert.ok(rows[0][3] / rows[0][2] < rows[0][1] / rows[0][0]);
  const target = t.artifacts[1].rows.map((r) => r.slice(1).map((x) => +x.replaceAll(",", "")));
  assert.deepEqual(rows[0], [target[1][0], target[2][0], target[1][1], target[2][1]]);
}
console.log(
  "PASS: 42 even Product slots in all 7 chapters; 30 new variants with progressive scoring, multi-guardrail decisions and cohort analysis; independent keys/arithmetic/dependencies/mix and complete scope guards; original 12 unchanged.",
);
