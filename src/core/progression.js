/**
 * Career completion, random/retry selection, daily goals, XP promotions and point-based chapter gates.
 * Classic browser script; dependency order is declared in index.html.
 */
function fDone(f) {
  return caseDone(BYID[f.id]);
}

function gSlice(g) {
  return FLAT.filter(function (f) {
    return f.g === g;
  });
}

function gStats(g) {
  var a = gSlice(g),
    d = a.filter(fDone).length;
  return { total: a.length, done: d, left: a.length - d, complete: d === a.length };
}

function gradesDone() {
  var n = 0;
  for (var g = 0; g < PLAN.length; g++) {
    if (gStats(g).complete) n++;
  }
  return n;
}

function isSkipped(f) {
  return S.skip.indexOf(f.id) > -1 && !fDone(f);
}

function curIdx() {
  for (var i = 0; i < FLAT.length; i++) {
    if (!fDone(FLAT[i]) && !isSkipped(FLAT[i])) {
      var g = FLAT[i].g;
      if (g > 0 && !gradePassed(g - 1)) return weakIdx(g - 1);
      return i;
    }
  }
  var last = PLAN.length - 1;
  if (!gradePassed(last)) return weakIdx(last);
  return FLAT.length;
}

function frontier() {
  var i = curIdx();
  return i < FLAT.length ? FLAT[i].g : PLAN.length;
}

function curGrade() {
  var i = curIdx();
  return i < FLAT.length ? FLAT[i].g : PLAN.length - 1;
}

function levelState(i, ci) {
  var f = FLAT[i];
  if (fDone(f)) return "done";
  if (i === ci) return "cur";
  return isSkipped(f) ? "skip" : "lock";
}

function nextGradeName(g) {
  return g < LEVELS.length - 1 ? LEVELS[g + 1].n : null;
}

function isBoss(id) {
  for (var i = 0; i < PLAN.length; i++) {
    if (PLAN[i].boss === id) return true;
  }
  return false;
}

function weekLabel(f) {
  if (f.boss) return "Final week";
  var d = ["Monday", "Wednesday", "Friday"];
  return "Week " + (Math.floor(f.i / 3) + 1) + ", " + d[f.i % 3];
}

function chanRu(ch) {
  return ch === "Email" ? "на почту" : "в " + ch;
}

function randPool() {
  var due = S.retry
    .filter(function (r) {
      return BYID[r.id] && r.due <= S.cc;
    })
    .map(function (r) {
      return { c: BYID[r.id], retry: true, kind: "retry" };
    });
  if (due.length) return due;
  var list = [];
  BONUS.forEach(function (id) {
    var c = BYID[id];
    if (c && !caseDone(c)) list.push({ c: c, retry: false, kind: "bonus" });
  });
  FLAT.forEach(function (f) {
    var c = BYID[f.id];
    if (caseDone(c)) list.push({ c: c, retry: true, kind: "practice" });
  });
  return list;
}

function randomNext() {
  var p = randPool();
  if (p.length > 1 && ui.lastRand)
    p = p.filter(function (x) {
      return x.c.id !== ui.lastRand;
    });
  return p.length ? p[Math.floor(Math.random() * p.length)] : null;
}

function mkPromo(cur, gAfter) {
  var c = cur.c,
    res = null;
  if (c.scn && c.endings) {
    var ratio = cur.smax ? cur.pts / cur.smax : 0,
      ek = ratio >= 0.75 ? "good" : ratio >= 0.4 ? "mid" : "bad";
    res = { ek: ek, pct: Math.round(ratio * 100), xp: cur.earned, text: c.endings[ek] };
  }
  var end = gAfter >= PLAN.length,
    st = [];
  if (res) st.push("result");
  st.push(end ? "end" : "promo");
  if (!end) st.push("chapter");
  return { g: end ? undefined : gAfter, end: end, res: res, stages: st, i: 0 };
}

function ymd(d) {
  return (
    d.getFullYear() +
    "-" +
    String(d.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(d.getDate()).padStart(2, "0")
  );
}

function todayStr() {
  return ymd(new Date());
}

function yestStr() {
  var d = new Date();
  d.setDate(d.getDate() - 1);
  return ymd(d);
}

function rollDay() {
  var t = todayStr();
  if (S.day.d !== t) S.day = { d: t, n: 0, g: false };
}

function streakNow() {
  var t = todayStr();
  return S.last === t || S.last === yestStr() ? S.streak : 0;
}

function stepMax(s, c) {
  var m = 0;
  s.options.forEach(function (o) {
    if (o.p !== undefined && o.p > m) m = o.p;
  });
  return m || (c.type === "special" ? 20 : 10);
}

function caseScore(c) {
  var e = 0,
    m = 0;
  c.steps.forEach(function (s, i) {
    var mx = stepMax(s, c),
      p = S.pts[c.id + ":" + i];
    if (p === undefined) p = stepDone(c, i) ? mx : 0;
    m += mx;
    e += Math.min(p, mx);
  });
  return { e: e, m: m, pct: m ? e / m : 1 };
}

function gradeScore(g) {
  var e = 0,
    m = 0;
  gSlice(g).forEach(function (f) {
    var s = caseScore(BYID[f.id]);
    e += s.e;
    m += s.m;
  });
  return { e: e, m: m, pct: m ? e / m : 1 };
}

function gradePassed(g) {
  if (g < 0) return true;
  if (S.pass.indexOf(g) > -1) return true;
  if (!gStats(g).complete) return false;
  if (gradeScore(g).pct >= PASS_PCT - 1e-9) {
    S.pass.push(g);
    return true;
  }
  return false;
}

function weakIdx(g) {
  var best = -1,
    bp = 2;
  FLAT.forEach(function (f, i) {
    if (f.g !== g || !fDone(f)) return;
    var s = caseScore(BYID[f.id]);
    if (s.pct < bp) {
      bp = s.pct;
      best = i;
    }
  });
  if (best < 0) {
    for (var i = 0; i < FLAT.length; i++) {
      if (FLAT[i].g === g) return i;
    }
  }
  return best;
}

function gateBlocked() {
  var ci = curIdx();
  return ci < FLAT.length && fDone(FLAT[ci]) ? FLAT[ci].g : -1;
}

function passTxt() {
  return Math.round(PASS_PCT * 100) + "%";
}

function recPts(c, cur, base) {
  if (cur.mode === "skip" || cur.mode === "event" || c.ev) return;
  var k = c.id + ":" + cur.step,
    mx = stepMax(c.steps[cur.step], c),
    prev = S.pts[k];
  if (prev === undefined) prev = cur.retry && stepDone(c, cur.step) ? mx : 0;
  S.pts[k] = Math.min(mx, Math.max(prev, base));
}
