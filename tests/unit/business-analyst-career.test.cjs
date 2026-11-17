const { careerFiles } = require("../helpers/assets.cjs");
const assert = require("node:assert/strict"),
  fs = require("node:fs"),
  vm = require("node:vm"),
  crypto = require("node:crypto");
const c = { console, document: { addEventListener() {} } };
vm.createContext(c);
for (const f of [
  ...careerFiles,
  "data/practice/additional.js",
  "data/practice/product.js",
  "data/practice/project.js",
  "data/practice/business-analyst.js",
  "src/features/practice.js",
  "src/features/career-practice.js",
])
  vm.runInContext(fs.readFileSync(f, "utf8"), c);
const all = JSON.parse(JSON.stringify(c.CAREER_PRACTICE_DATA)),
  tasks = all.filter((t) => t.track === "ba"),
  prior = all.filter((t) => t.track !== "ba");
assert.equal(tasks.length, 42);
assert.equal(all.length, 126);
assert.equal(new Set(all.map((t) => t.id)).size, 126);
assert.equal(
  crypto.createHash("sha256").update(JSON.stringify(prior)).digest("hex"),
  "940f08649b7d811be51da8eeabb0cdedd47cb75a047cf1d72ea2ad289086b96d",
);
const plans = c.CAREER_CONTENT.tracks.ba.plan,
  slots = [];
plans.forEach((p, i) =>
  p.b.concat(p.s, [p.boss]).forEach((id, j) => {
    if (j % 2) slots.push([i + 1, j + 1, id]);
  }),
);
assert.deepEqual(
  tasks.map((t) => [t.chapter, t.level, t.caseId]),
  slots,
);
assert.deepEqual(
  tasks.reduce((a, t) => ((a[t.format] = (a[t.format] || 0) + 1), a), {}),
  { question: 14, acceptance: 14, process: 14 },
);
const parse = (x) =>
  x === "true" ? true : x === "false" ? false : /^-?\d+(\.\d+)?$/.test(x) ? +x : x;
for (const t of tasks) {
  assert.equal(t.difficulty, t.chapter);
  assert.ok(!c.PRACTICE_DATA.some((x) => x.id === t.id));
  for (const s of t.steps) {
    const st = { selected: [], sequence: [], pairs: {} };
    assert.equal(c.practiceComplete(s, st), false);
    if (s.kind === "select") {
      assert.equal(s.count, 1);
      assert.ok(s.response?.startsWith("Stakeholder:"));
      assert.ok(s.response.length > 100);
      st.selected = s.key.slice();
      assert.ok(c.practiceCorrect(s, st));
      st.selected = [s.options.find((o) => !s.key.includes(o.id)).id];
      assert.equal(c.practiceCorrect(s, st), false);
      const lengths = s.options.map((o) => o.text.split(/\s+/).length);
      assert.ok(
        Math.max(...lengths) / Math.min(...lengths) <= 1.85,
        t.id + " balanced questions " + lengths,
      );
    } else if (s.kind === "order") {
      for (const key of s.keys) {
        st.sequence = key.slice();
        assert.ok(c.practiceCorrect(s, st));
        assert.deepEqual(key.slice().sort(), s.cards.map((x) => x.id).sort());
      }
      st.sequence = s.keys[0].slice();
      [st.sequence[0], st.sequence[1]] = [st.sequence[1], st.sequence[0]];
      assert.equal(c.practiceCorrect(s, st), false);
    } else {
      assert.equal(s.kind, "match");
      assert.deepEqual(Object.keys(s.key).sort(), s.left.map((x) => x.id).sort());
      assert.ok(s.left.every((x) => s.right.some((r) => r.id === s.key[x.id])));
      st.pairs = { ...s.key };
      assert.ok(c.practiceCorrect(s, st));
      st.pairs[s.left[0].id] = s.right.find((x) => x.id !== s.key[s.left[0].id]).id;
      assert.equal(c.practiceCorrect(s, st), false);
      assert.ok(s.left.length >= 3);
      assert.ok(s.right.length >= 3);
    }
    assert.ok(s.explain.length > 100);
  }
  if (t.format === "process") {
    const rows = t.artifacts.find((a) => a.title === "Main-path prerequisites").rows,
      deps = Object.fromEntries(
        rows.map(([id, req]) => [id, req === "None" ? [] : req.split(", ")]),
      ),
      orders = [];
    function visit(order) {
      if (order.length === rows.length) {
        orders.push(order);
        return;
      }
      for (const [id, req] of Object.entries(deps))
        if (!order.includes(id) && req.every((d) => order.includes(d))) visit([...order, id]);
    }
    visit([]);
    assert.deepEqual(
      t.steps[0].keys.map((x) => x.join("|")).sort(),
      orders.map((x) => x.join("|")).sort(),
      t.id + " all permitted orders",
    );
    const gates = t.artifacts.find((a) => a.title === "Validation gates — first failure wins").rows,
      observations = t.artifacts.find((a) => a.title === "Observed outcomes");
    for (const r of observations.rows) {
      const v = Object.fromEntries(
        observations.headers.slice(1).map((f, i) => [f, parse(r[i + 1])]),
      );
      let route = "complete";
      for (const [i, [field, op, value, label]] of gates.entries()) {
        const actual = v[field],
          expected = parse(value);
        let pass;
        if (op === "=") pass = actual === expected;
        else if (op === "≤") pass = actual <= expected;
        else if (op === ">") pass = actual > expected;
        else assert.fail("unsupported operator");
        assert.equal(t.steps[1].right.find((x) => x.id === t.audit.gateRoutes[i]).text, label);
        if (!pass) {
          route = t.audit.gateRoutes[i];
          break;
        }
      }
      assert.equal(t.steps[1].key[r[0]], route, t.id + "/" + r[0]);
    }
  } else if (t.format === "acceptance") {
    const policy = Object.fromEntries(
        t.artifacts
          .find((a) => a.title === "Approved policy facts")
          .rows.map(([k, v]) => [k, parse(v)]),
      ),
      obs = t.artifacts.find((a) => a.title === "Observed scenarios");
    for (const r of obs.rows) {
      const x = Object.fromEntries(obs.headers.slice(1).map((k, i) => [k, parse(r[i + 1])]));
      let key;
      switch (t.audit.model) {
        case "token":
          key = !x["Token present"]
            ? "missing"
            : x["Age minutes"] >= policy["Token lifetime minutes"]
              ? "expired"
              : "valid";
          break;
        case "quote":
          key = !x["Loan open"]
            ? "closed"
            : x["Quote age minutes"] >= policy["Quote lifetime minutes"]
              ? "refresh"
              : "execute";
          break;
        case "discount":
          key = !x["Loan open"]
            ? "state"
            : x["Principal $"] >= policy["Inclusive principal threshold $"]
              ? "discount"
              : "standard";
          break;
        case "usability":
          key =
            x["Valid participants"] < policy["Minimum valid participants"]
              ? "sample"
              : (x["Completed task"] / x["Valid participants"]) * 100 >=
                  policy["Minimum completion %"]
                ? "met"
                : "missed";
          break;
        case "nfr":
          key =
            x["Concurrent sessions"] < policy["Target concurrent sessions"]
              ? "rerun"
              : x["p95 ms"] <= policy["Maximum p95 ms"]
                ? "pass"
                : "fail";
          break;
        case "sms":
          key =
            x["Amount $"] <= policy["SMS threshold $"]
              ? "standard"
              : x["SMS verified"]
                ? "sms"
                : "hold";
          break;
        case "mapping":
          key = x["Fraud hold"]
            ? "restricted"
            : policy["Active legacy codes"].split(",").includes(x["Legacy code"])
              ? "active"
              : x["Legacy code"] === policy["Closed legacy code"]
                ? "closed"
                : "quarantine";
          break;
        case "idempotency":
          key = !x.Authorized
            ? "denied"
            : !x["ID exists"]
              ? "new"
              : x["Payload same"]
                ? "same"
                : "conflict";
          break;
        case "migration":
          key = x["Fraud hold"]
            ? "restricted"
            : !x["Birth date present"] || (x.Duplicate && !x["Verified match"])
              ? "quarantine"
              : x.Duplicate
                ? "merge"
                : "migrate";
          break;
        case "throughput":
          key =
            x.TPS < policy["Minimum TPS"] || x.Minutes < policy["Minimum measured minutes"]
              ? "incomplete"
              : x["p99 ms"] > policy["Maximum p99 ms"] ||
                  x["Lost payments"] > policy["Maximum lost payments"]
                ? "fail"
                : "pass";
          break;
        case "coaching":
          key = x["Personal details included"]
            ? "privacy"
            : x["Sampled deliverables"] < policy["Minimum sampled deliverables"]
              ? "sample"
              : x["Criterion coverage %"] >= policy["Minimum criterion coverage %"]
                ? "met"
                : "followup";
          break;
        case "metric":
          key = x["Personal information"]
            ? "privacy"
            : !x["Denominator verified"] || x["In-scope requirements"] <= 0
              ? "definition"
              : (x["Linked requirements"] / x["In-scope requirements"]) * 100 >=
                  policy["Minimum linked coverage %"]
                ? "met"
                : "gap";
          break;
        case "partnership":
          key = x["Authorization withdrawn"]
            ? "stop"
            : !x["Evidence verified"] ||
                x["Evidence age days"] > policy["Maximum evidence age days"]
              ? "evidence"
              : x["Pilot customers"] > policy["Maximum pilot customers"]
                ? "limit"
                : "pilot";
          break;
        case "delegation":
          key =
            x.Withdrawn ||
            Date.parse(x["Request UTC"]) >= Date.parse(policy["Delegation expiry UTC"])
              ? "expired"
              : !x["In scope"]
                ? "scope"
                : x["Amount $"] > policy["Inclusive delegated limit $"]
                  ? "limit"
                  : "within";
          break;
        default:
          assert.fail("missing independent acceptance oracle");
      }
      assert.equal(t.steps[0].key[r[0]], key, t.id + "/" + r[0]);
    }
  }
}
for (const [track, j] of Object.entries(c.CAREER_CONTENT.tracks)) {
  c.CUR_TRACK = track;
  c.PLAN = j.plan;
  for (const ca of j.cases)
    for (const mode of ["camp", "rand", "skip", "event"]) {
      const got = c.careerPracticeFor({ c: ca, mode }),
        expected = mode === "camp" && all.find((t) => t.track === track && t.caseId === ca.id);
      assert.equal(got?.id || null, expected?.id || null, track + "/" + ca.id + "/" + mode);
    }
}
assert.equal(c.practiceMergeDone([tasks[0].id], [prior[0].id, tasks[0].id]).length, 2);
console.log(
  "PASS: 42 BA slots; 14 questions/responses, all permitted process orders and first-failure routes, independent boundary/ratio/privacy/version/authority acceptance oracles; 126 track-aware slots; original 84 tasks unchanged.",
);
