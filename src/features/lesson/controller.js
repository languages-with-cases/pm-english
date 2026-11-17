/**
 * Tone and sentence-task state, XP deduplication, speech recognition and block selection. Career replacements reuse this completion contract.
 * Classic browser script; dependency order is declared in index.html.
 */
var SR_API = window.SpeechRecognition || window.webkitSpeechRecognition || null;

var lxRec = null;

function spNorm(t) {
  t = String(t)
    .toLowerCase()
    .replace(/[‘’ʼ`]/g, "'");
  t = t
    .replace(/\b(it|that|what|there|here|who|he|she)'s\b/g, "$1 is")
    .replace(/\blet's\b/g, "let us");
  t = t
    .replace(/\bcan't\b/g, "can not")
    .replace(/\bwon't\b/g, "will not")
    .replace(/\bcannot\b/g, "can not");
  t = t
    .replace(/n't\b/g, " not")
    .replace(/'ll\b/g, " will")
    .replace(/'re\b/g, " are")
    .replace(/'m\b/g, " am")
    .replace(/'ve\b/g, " have")
    .replace(/'d\b/g, " would");
  t = t
    .replace(/%/g, " percent")
    .replace(/[^a-z0-9' ]+/g, " ")
    .replace(/'/g, "");
  return t
    .split(/\s+/)
    .filter(Boolean)
    .map(function (w) {
      return NUMW[w] || w;
    });
}

function spLcs(a, b) {
  var m = a.length,
    n = b.length,
    prev = new Array(n + 1).fill(0);
  for (var i = 1; i <= m; i++) {
    var cur = [0];
    for (var j = 1; j <= n; j++) {
      cur[j] = a[i - 1] === b[j - 1] ? prev[j - 1] + 1 : Math.max(prev[j], cur[j - 1]);
    }
    prev = cur;
  }
  return prev[n];
}

function spScore(target, said) {
  var a = spNorm(target),
    b = spNorm(said);
  if (!a.length || !b.length) return 0;
  var l = spLcs(a, b);
  return Math.min(l / a.length, l / b.length);
}

function lxBlocks(text) {
  var w = text
      .toLowerCase()
      .replace(/[^a-z0-9' ]+/g, " ")
      .split(/\s+/)
      .filter(Boolean),
    n = w.length,
    size = n <= 8 ? 1 : 2,
    out = [];
  for (var i = 0; i < n; i += size) out.push(w.slice(i, i + size).join(" "));
  return out;
}

function lxOrder(n) {
  var o,
    g = 0;
  do {
    o = shuffle(n);
    g++;
  } while (
    n > 1 &&
    g < 20 &&
    o.every(function (v, i) {
      return v === i;
    })
  );
  return o;
}

function hasLx(c) {
  return !!LX[c.id];
}

function lxStart(cur) {
  var L = LX[cur.c.id],
    bl = lxBlocks(L.build);
  cur.x = {
    stage: "tone",
    L: L,
    tOrder: shuffle(L.tone.opts.length),
    tChosen: null,
    blocks: bl,
    bOrder: lxOrder(bl.length),
    mode: "voice",
    state: "idle",
    live: "",
    said: "",
    err: "",
    tries: 0,
    result: null,
    typed: "",
    picked: [],
    xp: 0,
  };
  render();
  window.scrollTo(0, 0);
}

function lxSeen(id, k) {
  var e = S.lx[id] || {};
  return !!e[k];
}

function lxMark(id, k, xp, cur) {
  if (!S.lx[id]) S.lx[id] = {};
  if (!S.lx[id][k]) {
    S.lx[id][k] = 1;
    var g = cur.retry ? Math.round(xp / 2) : xp;
    S.xp += g;
    cur.x.xp += g;
    cur.earned += g;
    return g;
  }
  return 0;
}

function lxErr(e) {
  try {
    var el = document.getElementById("lxerr");
    var m = "Something went wrong: " + (e && e.message ? e.message : e);
    if (el) el.textContent = m;
    else toast(m);
  } catch (_) {}
}

function lxTone(k) {
  var cur = ui.cur,
    x = cur && cur.x;
  if (!x || x.tChosen !== null) return;
  try {
    var oi = x.tOrder[k],
      ok = !!x.L.tone.opts[oi].ok;
    try {
      markActive();
    } catch (e) {}
    var g = 0;
    try {
      g = lxMark(cur.c.id, "t", ok ? LX_TONE_XP : 0, cur);
    } catch (e) {}
    x.tGain = ok ? g : 0;
    x.tChosen = oi;
    try {
      save();
    } catch (e) {}
    render();
  } catch (e) {
    x.tChosen = null;
    render();
    lxErr(e);
    return;
  }
  autoScrollNext();
}

function lxToBuild() {
  if (careerPracticeFor(ui.cur)) {
    careerPracticeStart(ui.cur);
    return;
  }
  var x = ui.cur.x;
  x.stage = "build";
  render();
  window.scrollTo(0, 0);
}

function lxLit(x, said) {
  var tw = spNorm(said),
    k = 0,
    lit = [];
  for (var b = 0; b < x.blocks.length; b++) {
    var bw = spNorm(x.blocks[b]),
      all = bw.length > 0;
    for (var i = 0; i < bw.length; i++) {
      var f = -1;
      for (var y = k; y < tw.length; y++) {
        if (tw[y] === bw[i]) {
          f = y;
          break;
        }
      }
      if (f === -1) {
        all = false;
        break;
      }
      k = f + 1;
    }
    lit.push(all);
    if (!all) break;
  }
  return lit;
}

function lxPaint() {
  var x = ui.cur && ui.cur.x;
  if (!x) return;
  var src = x.mode === "text" ? x.typed : x.live || x.said,
    lit = lxLit(x, src);
  for (var b = 0; b < x.blocks.length; b++) {
    var el = document.getElementById("lxb" + b);
    if (el) {
      if (lit[b]) el.classList.add("lit");
      else el.classList.remove("lit");
    }
  }
  var lv = document.getElementById("lxlive");
  if (lv)
    lv.textContent = x.live
      ? "“" + x.live + "”"
      : x.state === "listening"
        ? "Listening..."
        : "Tap and speak";
}

function lxMic() {
  var x = ui.cur && ui.cur.x;
  if (!x) return;
  if (x.state === "listening") {
    try {
      lxRec && lxRec.stop();
    } catch (e) {}
    return;
  }
  if (!SR_API) {
    x.err = "nosupport";
    render();
    return;
  }
  try {
    lxRec = new SR_API();
    lxRec.lang = "en-US";
    lxRec.interimResults = true;
    lxRec.continuous = false;
    lxRec.maxAlternatives = 3;
  } catch (e) {
    x.err = "nosupport";
    render();
    return;
  }
  x.state = "listening";
  x.live = "";
  x.err = "";
  var finals = [],
    got = false;
  lxRec.onresult = function (ev) {
    var txt = "",
      pre = "";
    for (var i = 0; i < ev.results.length; i++) {
      txt += ev.results[i][0].transcript + " ";
      if (i < ev.results.length - 1) pre += ev.results[i][0].transcript + " ";
    }
    x.live = txt.trim();
    var r = ev.results[ev.results.length - 1];
    if (r.isFinal) {
      got = true;
      finals = [];
      for (var a = 0; a < r.length; a++) finals.push((pre + r[a].transcript).trim());
    }
    lxPaint();
  };
  lxRec.onerror = function (ev) {
    x.err = ev.error || "error";
  };
  lxRec.onend = function () {
    if (!ui.cur || ui.cur.x !== x) return;
    x.state = "idle";
    if (!got && x.live) {
      finals = [x.live];
      got = true;
    }
    if (got) lxCheck(finals, "voice");
    else render();
  };
  try {
    lxRec.start();
  } catch (e) {
    x.state = "idle";
    x.err = "start";
  }
  render();
}

function lxCheck(alts, via) {
  var cur = ui.cur,
    x = cur.x,
    best = 0,
    bt = alts[0] || "";
  alts.forEach(function (t) {
    var s = spScore(x.L.build, t);
    if (s > best) {
      best = s;
      bt = t;
    }
  });
  x.said = bt;
  x.live = "";
  x.tries++;
  markActive();
  var need = via === "voice" ? 0.85 : 0.95;
  if (best >= need) {
    x.result = { ok: true, via: via, pct: Math.round(best * 100) };
    x.bGain = lxMark(cur.c.id, "b", via === "voice" ? LX_VOICE_XP : LX_TEXT_XP, cur);
  } else x.result = { ok: false, via: via, pct: Math.round(best * 100) };
  save();
  render();
  if (x.result && (x.result.ok || x.tries >= LX_TRIES)) autoScrollNext();
}

function lxFlip() {
  var old = {};
  document.querySelectorAll(".spb[data-k]").forEach(function (e) {
    var r = e.getBoundingClientRect();
    old[e.getAttribute("data-k")] = r;
  });
  render();
  var els = [];
  document.querySelectorAll(".spb[data-k]").forEach(function (e) {
    var o = old[e.getAttribute("data-k")];
    if (!o) return;
    var r = e.getBoundingClientRect(),
      dx = o.left - r.left,
      dy = o.top - r.top;
    if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
    e.style.transition = "none";
    e.style.transform = "translate(" + dx + "px," + dy + "px)";
    e.style.position = "relative";
    e.style.zIndex = "3";
    els.push(e);
  });
  if (!els.length) return;
  void document.body.offsetHeight;
  els.forEach(function (e) {
    e.style.transition = "transform .5s cubic-bezier(.25,.9,.3,1.12)";
    e.style.transform = "";
  });
  setTimeout(function () {
    els.forEach(function (e) {
      e.style.transition = "";
      e.style.zIndex = "";
    });
  }, 600);
}

function lxPick(k) {
  var x = ui.cur && ui.cur.x;
  if (!x || (x.result && x.result.ok) || x.picked.indexOf(k) >= 0) return;
  if (x.state === "listening") {
    x.live = "";
    try {
      lxRec && lxRec.abort();
    } catch (e) {}
    x.state = "idle";
  }
  x.picked.push(k);
  x.result = null;
  lxFlip();
}

function lxUnpick(i) {
  var x = ui.cur && ui.cur.x;
  if (!x || (x.result && x.result.ok)) return;
  x.picked.splice(i, 1);
  x.result = null;
  lxFlip();
}

function lxDone() {
  var x = ui.cur && ui.cur.x;
  if (!x || x.picked.length < x.blocks.length) return;
  lxCheck(
    [
      x.picked
        .map(function (k) {
          return x.blocks[k];
        })
        .join(" "),
    ],
    "text",
  );
}

function lxTyped(v) {
  var x = ui.cur && ui.cur.x;
  if (!x) return;
  x.typed = v;
  lxPaint();
}

function lxSubmitText() {
  var x = ui.cur && ui.cur.x;
  if (!x || !x.typed.trim()) return;
  lxCheck([x.typed], "text");
}

function lxMode(m) {
  var x = ui.cur && ui.cur.x;
  if (!x) return;
  try {
    lxRec && lxRec.abort();
  } catch (e) {}
  x.state = "idle";
  x.mode = m;
  x.result = null;
  x.err = "";
  render();
  if (m === "text") {
    x.picked = [];
    render();
  }
}

function lxFinish() {
  var cur = ui.cur;
  if (!cur || !cur.x) return;
  try {
    lxRec && lxRec.abort();
  } catch (e) {}
  cur.x.done = true;
  cur.x.stage = "end";
  nextTap();
}
