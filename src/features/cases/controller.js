/**
 * Main case lifecycle: opening, answers, feedback, rewards, retries and continuation to the lesson extras. Public startCase/beginCase include preparation in preparation.js.
 * Classic browser script; dependency order is declared in index.html.
 */
function openLevel(idx) {
  var f = FLAT[idx];
  if (!f) return;
  var st = levelState(idx, curIdx());
  if (st === "lock") {
    var gb = gateBlocked();
    toast(
      gb >= 0
        ? "Score " + passTxt() + " in chapter " + (gb + 1) + " to unlock this level"
        : "Finish the previous levels first",
    );
    return;
  }
  if (st === "cur" && S.gseen.indexOf(f.g) === -1) {
    ui.chap = { g: f.g, idx: idx };
    ui.intro = null;
    ui.view = "chapter";
    ui.cur = null;
    render();
    window.scrollTo(0, 0);
    return;
  }
  ui.intro = { idx: idx, replay: st === "done", skipped: st === "skip" };
  ui.chap = null;
  ui.view = "intro";
  ui.cur = null;
  render();
  window.scrollTo(0, 0);
}

function chapStart() {
  var ch = ui.chap;
  if (!ch) return;
  if (S.gseen.indexOf(ch.g) === -1) {
    S.gseen.push(ch.g);
    save();
  }
  var idx = ch.idx;
  ui.chap = null;
  openLevel(idx);
}

function introStart() {
  var i = ui.intro;
  if (!i) return;
  var f = FLAT[i.idx];
  ui.campBack = !!(i.replay || i.skipped);
  beginCase(BYID[f.id], i.replay, "camp", i.replay);
}

function trySkip(tg) {
  var pg = PLAN[tg - 1];
  if (!pg) return;
  ui.skipTo = tg;
  startCase(BYID[pg.boss], true, "skip", false);
}

function skipAhead(tg) {
  FLAT.forEach(function (f) {
    if (f.g < tg && !fDone(f) && S.skip.indexOf(f.id) === -1) S.skip.push(f.id);
  });
  for (var pg = 0; pg < tg; pg++) {
    if (S.pass.indexOf(pg) === -1) S.pass.push(pg);
  }
  save();
}

function skipContinue() {
  var n = curIdx();
  ui.sr = null;
  if (n < FLAT.length) openLevel(n);
  else go("levels");
}

function smaxOf(c) {
  var t = 0;
  c.steps.forEach(function (s) {
    var m = 0;
    s.options.forEach(function (o) {
      if (o.p !== undefined && o.p > m) m = o.p;
    });
    t += m;
  });
  return t;
}

function startCaseCore(c, retry, mode, replay) {
  var first = 0;
  if (!retry && mode !== "event") {
    for (var i = 0; i < c.steps.length; i++) {
      if (!stepDone(c, i)) {
        first = i;
        break;
      }
    }
  }
  ui.cur = {
    c: c,
    mode: mode || "rand",
    back: !!ui.campBack,
    replay: !!replay,
    boss: isBoss(c.id),
    retry: !!retry,
    allOk: true,
    bonus: [],
    step: first,
    order: shuffle(c.steps[first].options.length),
    chosen: null,
    thread: [],
    ok: null,
    pending: null,
    stage: "wait",
    fresh: null,
    tier: null,
    gain: 0,
    earned: 0,
    pts: 0,
    smax: smaxOf(c),
    m: c.meters ? startM(c, mode) : null,
    mPrev: c.meters ? startM(c, mode) : null,
    prevBad: false,
    shown: "",
    lastR: "",
  };
  ui.campBack = false;
  ui.view = "case";
  ui.rev = null;
  ui.intro = null;
  ui.chap = null;
  render();
  window.scrollTo(0, 0);
}

function solveRandom() {
  var r = randomNext();
  if (r) {
    ui.lastRand = r.c.id;
    beginCase(r.c, r.retry, "rand", false);
  }
}

var GENERIC = [
  "delay",
  "confirm",
  "affect",
  "replace",
  "adapt",
  "wording",
  "postpone",
  "follow-up",
  "worth it",
  "pressure",
  "check with",
  "make it work",
  "regardless of",
  "concern",
  "implement",
  "involve",
  "proceed",
  "trade",
  "expectations",
  "feedback",
  "document",
  "pattern",
  "flag",
  "align",
  "tied to",
  "consistent",
  "draft",
  "ambitious",
  "trust",
  "structure",
  "miss",
  "recover",
  "condition",
  "realistic",
  "come back to",
  "vague",
  "fit into",
  "provide context",
  "urgent",
  "refresh",
  "balance",
  "clarify",
  "weigh",
  "manually",
  "automate",
  "fair question",
  "change my mind",
  "open to feedback",
  "claim",
  "range",
  "limitation",
  "limitations",
  "terms",
  "productivity",
  "tailor",
  "gap",
  "boost",
  "concise",
  "focus on",
  "simplify",
  "from scratch",
  "push through",
  "specific",
  "privately",
  "definition",
  "variable",
  "evaluate",
  "stable",
  "premature",
  "noise",
  "learning",
  "audit",
  "documented",
  "mandatory",
  "expand",
  "reorder",
  "visible",
  "own it",
  "heads-up",
  "learnings",
  "asks",
  "exposed",
  "notify",
  "briefing",
  "safeguard",
  "wary",
  "guarded",
  "recurring",
  "rush",
  "outright",
  "alternative",
  "negotiable",
  "panel",
  "criteria",
  "fad",
  "finalist",
  "monitor",
  "pilot",
  "default setting",
  "key result",
  "schedule",
  "commitment",
  "impact",
  "effort",
  "scale",
  "confirm",
  "delay",
  "tentative",
  "capacity",
  "estimate",
  "replace",
  "signal",
  "opportunity",
  "selection bias",
  "status page",
  "slip",
  "target",
  "timeline",
  "scope",
  "size",
  "log",
  "trade-off",
  "strategic value",
  "bluff",
  "survive",
  "exception",
  "swap",
  "interruption",
  "shield",
  "jointly",
  "workload",
  "crunch",
  "price cap",
  "lock in",
  "transition period",
  "compensation",
  "proportional",
  "objection",
  "demo",
  "brief",
  "faq",
  "stable",
  "expand",
  "new flow",
  "milestone",
  "visible",
  "own it",
  "affected users",
  "escalation path",
  "exposed",
];

function newWordsFor(c) {
  var seen = {},
    out = [];
  c.steps.forEach(function (st) {
    st.words.forEach(function (w) {
      var k = w.w.toLowerCase();
      if (seen[k] || S.seen.indexOf(k) > -1 || GENERIC.indexOf(k) > -1) return;
      seen[k] = 1;
      out.push(w);
    });
  });
  return out.slice(0, 8);
}

function beginCaseCore(c, retry, mode, replay) {
  var ws = retry || replay ? [] : newWordsFor(c);
  if (!ws.length) {
    startCase(c, retry, mode, replay);
    return;
  }
  ui.nw = { c: c, retry: retry, mode: mode, replay: replay, words: ws };
  ui.view = "newwords";
  ui.cur = null;
  ui.intro = null;
  ui.chap = null;
  render();
  window.scrollTo(0, 0);
}

function nwNext() {
  var n = ui.nw;
  if (!n) return;
  ui.nw = null;
  startCase(n.c, n.retry, n.mode, n.replay);
}

function scheduleOpts(cur) {
  setTimeout(function () {
    if (ui.cur !== cur || cur.stage !== "msg") return;
    cur.stage = "opts";
    cur.fresh = "opts";
    render();
    cur.fresh = null;
    var o = document.querySelectorAll(".opt");
    if (o.length)
      setTimeout(function () {
        o[o.length - 1].scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 450);
  }, 500);
}

function openMsg() {
  var cur = ui.cur;
  if (!cur || cur.stage !== "wait") return;
  cur.stage = "msg";
  cur.fresh = "msg";
  render();
  cur.fresh = null;
  scheduleOpts(cur);
}

function setRetry(id) {
  S.retry = S.retry.filter(function (r) {
    return r.id !== id;
  });
  S.retry.push({ id: id, due: S.cc + 2 + (Math.random() < 0.5 ? 0 : 1) });
}

function markActive() {
  rollDay();
  var t = todayStr();
  if (S.act.indexOf(t) === -1) S.act.push(t);
}

function dailyProgress() {
  var bonus = [];
  rollDay();
  S.day.n += 1;
  if (S.day.n >= GOAL && !S.day.g) {
    S.day.g = true;
    S.xp += GOAL_XP;
    bonus.push({ t: "Daily goal complete", xp: GOAL_XP });
    if (S.last === yestStr()) S.streak += 1;
    else if (S.last !== todayStr()) S.streak = 1;
    S.last = todayStr();
    if (S.goal.indexOf(S.last) === -1) S.goal.push(S.last);
    if (S.streak > S.best) S.best = S.streak;
    MILESTONES.forEach(function (m) {
      if (S.streak === m[0]) {
        S.xp += m[1];
        bonus.push({ t: m[0] + "-day streak", xp: m[1] });
      }
    });
  }
  return bonus;
}

function finishCase(cur) {
  var c = cur.c;
  S.cc += 1;
  var pi = S.pend.indexOf(c.id);
  if (cur.retry) {
    if (cur.allOk)
      S.retry = S.retry.filter(function (r) {
        return r.id !== c.id;
      });
    else setRetry(c.id);
  } else if (pi > -1) {
    S.pend.splice(pi, 1);
    setRetry(c.id);
  }
  cur.bonus = dailyProgress();
}

function answer(k) {
  var cur = ui.cur;
  if (!cur || cur.chosen !== null || cur.stage !== "opts") return;
  var c = cur.c,
    st = c.steps[cur.step];
  var oi = cur.order[k],
    opt = st.options[oi];
  cur.chosen = oi;
  cur.ok = opt.ok;
  var gBefore = frontier();
  markActive();
  var base = opt.p !== undefined ? opt.p : opt.ok ? (c.type === "special" ? 20 : 10) : 0;
  var tier = opt.ok ? "best" : base > 0 ? "part" : "bad";
  var gain = cur.retry ? Math.round(base / 2) : base;
  var smx = 0;
  st.options.forEach(function (x) {
    if (x.p > smx) smx = x.p;
  });
  var weak = !opt.ok && base <= 0.3 * smx;
  cur.weak = weak;
  cur.tier = tier;
  cur.gain = 0;
  cur.lastR = opt.r || "";
  if (c.meters && opt.e) {
    cur.mPrev = cur.m.slice();
    cur.m = cur.m.map(function (v, i) {
      return Math.max(0, Math.min(100, v + opt.e[i]));
    });
  }
  cur.pts += base;
  if (cur.retry) {
    recPts(c, cur, base);
    S.xp += gain;
    cur.gain = gain;
    if (weak) cur.allOk = false;
  } else {
    var key = c.id + ":" + cur.step;
    if (S.done.indexOf(key) === -1) {
      recPts(c, cur, base);
      S.done.push(key);
      S.xp += gain;
      cur.gain = gain;
      S.stats.a += 1;
      if (opt.ok) S.stats.c += 1;
      var t = S.stats.t[c.topic] || [0, 0];
      S.stats.t[c.topic] = [t[0] + 1, t[1] + (opt.ok ? 1 : 0)];
    }
    if (weak && !c.ev && S.pend.indexOf(c.id) === -1) S.pend.push(c.id);
  }
  cur.earned += cur.gain;
  st.words.forEach(function (w) {
    var k2 = w.w.toLowerCase();
    if (S.seen.indexOf(k2) === -1) S.seen.push(k2);
    if (opt.ok && S.learned.indexOf(k2) === -1) S.learned.push(k2);
  });
  if (cur.step + 1 >= c.steps.length) finishCase(cur);
  var gAfter = frontier();
  if (gAfter > gBefore) {
    cur.pending = mkPromo(cur, gAfter);
  }
  save();
  render();
  autoScrollNext();
}

function autoScrollNext() {
  setTimeout(function () {
    var a = document.getElementById("app");
    if (!a) return;
    var max = a.scrollHeight - a.clientHeight;
    if (max - a.scrollTop > 2) a.scrollTo({ top: max, behavior: "smooth" });
  }, 180);
}

function proceed() {
  var cur = ui.cur;
  if (!cur) return;
  var c = cur.c;
  if (cur.step + 1 < c.steps.length) {
    cur.thread.push({
      msg: cur.shown || c.steps[cur.step].msg,
      reply: c.steps[cur.step].options[cur.chosen].t,
      r: cur.lastR,
    });
    cur.prevBad = !!cur.weak;
    cur.step += 1;
    cur.order = shuffle(c.steps[cur.step].options.length);
    cur.chosen = null;
    cur.ok = null;
    cur.stage = "msg";
    cur.fresh = "msg";
    render();
    cur.fresh = null;
    window.scrollTo(0, 0);
    scheduleOpts(cur);
  } else if (cur.mode === "skip") {
    var ratio = cur.smax ? cur.pts / cur.smax : 0,
      ok = ratio >= 0.75,
      tg = ui.skipTo;
    if (ok) {
      skipAhead(tg);
      var rs = {
        ek: "good",
        pct: Math.round(ratio * 100),
        xp: cur.earned,
        text: cur.c.endings.good,
      };
      ui.lvlUp = {
        g: tg,
        end: false,
        res: rs,
        stages: ["result", "promo", "chapter"],
        i: 0,
        skipped: true,
      };
      ui.lvlNext = function () {
        var n = curIdx();
        if (n < FLAT.length) openLevel(n);
        else go("levels");
      };
      ui.sr = null;
      ui.cur = null;
      ui.view = "levels";
      render();
      window.scrollTo(0, 0);
    } else {
      ui.sr = { ok: false, pct: Math.round(ratio * 100), g: tg };
      ui.view = "skipres";
      ui.cur = null;
      render();
      window.scrollTo(0, 0);
    }
  } else if (cur.mode === "event") {
    evFinishLevel(cur);
  } else if (cur.mode === "camp") {
    var n = curIdx();
    if (!cur.replay && !cur.back && n < FLAT.length) openLevel(n);
    else go("levels");
  } else {
    var next = randomNext();
    if (next) {
      ui.lastRand = next.c.id;
      beginCase(next.c, next.retry, "rand", false);
    } else go("home");
  }
}

function lxOn(cur) {
  return hasLx(cur.c) && cur.mode !== "skip" && cur.mode !== "event";
}

function lxDue(cur) {
  return (
    lxOn(cur) && cur.step + 1 >= cur.c.steps.length && cur.chosen !== null && !(cur.x && cur.x.done)
  );
}

function nextLabel(cur, last) {
  if (last && !cur.x && lxOn(cur)) return "Next task";
  if (!last) return "Next message";
  if (cur.mode === "skip") return "See result";
  if (cur.mode === "event") return "Continue";
  if (cur.pending) return "Continue";
  if (cur.mode === "camp") {
    if (cur.replay || cur.back) return "Back to levels";
    return curIdx() < FLAT.length ? "Next level" : "Back to levels";
  }
  return "Next case";
}

function nextTap() {
  var cur = ui.cur;
  if (!cur) return;
  if (lxDue(cur)) {
    lxStart(cur);
    return;
  }
  if (cur.pending) {
    ui.lvlUp = cur.pending;
    cur.pending = null;
    render();
  } else proceed();
}

function lvlContinue() {
  var u = ui.lvlUp;
  if (u && u.stages && u.i < u.stages.length - 1) {
    u.i += 1;
    render();
    window.scrollTo(0, 0);
    return;
  }
  if (u && u.g !== undefined && S.gseen.indexOf(u.g) === -1) {
    S.gseen.push(u.g);
    save();
  }
  ui.lvlUp = null;
  var f = ui.lvlNext;
  ui.lvlNext = null;
  if (f) f();
  else proceed();
}
