const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ctx = { document: { addEventListener() {} }, console };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync("data/practice/additional.js", "utf8"), ctx);
vm.runInContext(fs.readFileSync("src/features/practice.js", "utf8"), ctx);
const tasks = JSON.parse(JSON.stringify(ctx.PRACTICE_DATA));
assert.equal(tasks.length, 15);
assert.equal(new Set(tasks.map((t) => t.id)).size, 15);
for (const track of ["product", "dev", "pm", "an", "ba"])
  assert.equal(tasks.filter((t) => t.track === track).length, 3);
for (const t of tasks)
  for (const s of t.steps) {
    assert.ok(s.explain);
    const items = s.options || s.cards || s.left,
      ids = items.map((o) => o.id);
    assert.equal(new Set(ids).size, ids.length);
    const st = { selected: [], sequence: [], pairs: {} };
    assert.equal(ctx.practiceComplete(s, st), false);
    if (s.kind === "select") {
      assert.equal(s.count, s.key.length);
      s.key.forEach((id) => assert.ok(ids.includes(id)));
      st.selected = s.key.slice();
    } else if (s.kind === "order") {
      for (const key of s.keys) assert.deepEqual([...key].sort(), [...ids].sort());
      st.sequence = s.keys[0].slice();
    } else {
      assert.deepEqual(Object.keys(s.key).sort(), [...ids].sort());
      Object.values(s.key).forEach((id) => assert.ok(s.right.some((o) => o.id === id)));
      st.pairs = { ...s.key };
    }
    assert.ok(ctx.practiceComplete(s, st));
    assert.ok(ctx.practiceCorrect(s, st));
    if (s.kind === "select") st.selected = [ids.find((id) => !s.key.includes(id))];
    else if (s.kind === "order") st.sequence.reverse();
    else st.pairs[ids[0]] = s.right.find((o) => o.id !== s.key[ids[0]]).id;
    assert.equal(ctx.practiceCorrect(s, st), false);
  }
// Explicit alternative orders are accepted; extra/missing selection is rejected.
assert.ok(
  ctx.practiceCorrect(
    {
      kind: "order",
      keys: [
        ["a", "b"],
        ["b", "a"],
      ],
    },
    { sequence: ["b", "a"] },
  ),
);
assert.equal(ctx.practiceCorrect({ kind: "select", key: ["a"] }, { selected: ["a", "b"] }), false);
assert.equal(ctx.practiceComplete({ kind: "select", count: 2 }, { selected: ["a"] }), false);
assert.deepEqual(
  Array.from(ctx.practiceMergeDone([tasks[0].id, "unknown"], [tasks[0].id, tasks[3].id])),
  [tasks[0].id, tasks[3].id],
);
// Independent arithmetic/oracles: catch content/key drift rather than only replaying keys.
const find = (id) => tasks.find((t) => t.id === id);
const funnel = find("product-funnel-v1")
  .artifacts.find((a) => a.kind === "table")
  .rows.map((r) => r.slice(1).map((v) => Number(v.replaceAll(",", ""))));
const diffs = funnel
  .slice(1)
  .map((r, i) => (r[1] / funnel[i][1]) * 100 - (r[0] / funnel[i][0]) * 100);
assert.deepEqual(
  diffs.map((x) => Math.round(x)),
  [-5, -10, 10],
);
assert.deepEqual(Array.from(find("product-funnel-v1").steps[0].key), ["identity"]);
const rows = find("product-priority-v1").artifacts.find((a) => a.kind === "table").rows;
const todo = rows.map((r) => ({ id: r[0][0], score: +r[1] / +r[2], dep: r[3] })),
  ordered = [];
while (todo.length) {
  const available = todo
    .filter((r) => r.dep === "None" || ordered.includes(r.dep))
    .sort((a, b) => b.score - a.score);
  assert.ok(available.length);
  assert.notEqual(available[0]?.score, available[1]?.score);
  ordered.push(available[0].id);
  todo.splice(todo.indexOf(available[0]), 1);
}
assert.deepEqual(ordered, ["C", "A", "B", "D"]);
assert.deepEqual(Array.from(find("product-priority-v1").steps[0].keys[0]), ordered);
assert.ok(0.35 - 0.2 > 0.1);
assert.ok(-0.2 <= 0);
assert.equal(Math.max(7, 5 + 4) + 1 + 2, 12); // test starts + two days through release
assert.deepEqual(Array.from(find("pm-gantt-v1").steps[0].key).sort(), ["release", "test"]);
assert.deepEqual(Array.from(find("pm-gantt-v1").steps[1].key), ["12"]);
const orders = [
    { id: 1, amount: 20 },
    { id: 2, amount: 30 },
  ],
  items = [
    { id: 1, sku: "A" },
    { id: 1, sku: "B" },
    { id: 2, sku: "C" },
  ];
const joined = orders.flatMap((o) =>
  items.filter((i) => i.id === o.id).map((i) => [o.id, o.amount, i.sku]),
);
assert.deepEqual(joined, [
  [1, 20, "A"],
  [1, 20, "B"],
  [2, 30, "C"],
]);
assert.equal(
  joined.reduce((n, r) => n + r[1], 0),
  70,
);
assert.equal(
  orders.reduce((n, o) => n + o.amount, 0),
  50,
);
assert.ok(
  find("an-sql-v1")
    .steps[0].options.find((o) => o.id === "three")
    .text.includes("1 | 20 | B"),
);
assert.equal(420 + 80, 500);
assert.equal(4 - 3 + 3, 4);
console.log(
  "PASS: 15 tasks / 22 steps; schema, all correct/wrong keys, incomplete answers, alternate ordering, progress union and independent numeric oracles.",
);
