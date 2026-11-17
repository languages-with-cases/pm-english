/**
 * Public case-entry functions and pre-lesson vocabulary preparation. Delegates to explicit case-controller core functions after preparation.
 * Classic browser script; dependency order is declared in index.html.
 */
function startCase(c, retry, mode, replay) {
  if (!retry && !replay && mode !== "skip") {
    var ks = [];
    c.steps.forEach(function (s) {
      s.words.forEach(function (w) {
        var k = w.w.toLowerCase();
        if (WORDS[k] && ks.indexOf(k) === -1) ks.push(k);
      });
    });
    if (ks.length) {
      S.hist = S.hist || [];
      S.hist.push(ks);
      S.hist = S.hist.slice(-5);
      save();
    }
  }
  return startCaseCore(c, retry, mode, replay);
}

function beginCase(c, retry, mode, replay) {
  if (S.rv !== false && !retry && !replay && mode !== "skip") {
    var qs = prepQs();
    if (qs.length) {
      ui.pr = { qs: qs, i: 0, score: 0, next: [c, retry, mode, replay], mode: mode };
      ui.view = "prep";
      ui.cur = null;
      ui.intro = null;
      ui.chap = null;
      ui.nw = null;
      render();
      window.scrollTo(0, 0);
      return;
    }
  }
  return beginCaseCore(c, retry, mode, replay);
}

function prepQs() {
  var pool = [];
  (S.hist || []).forEach(function (a) {
    a.forEach(function (k) {
      if (WORDS[k] && pool.indexOf(k) === -1) pool.push(k);
    });
  });
  if (pool.length < 5) {
    S.seen.forEach(function (k) {
      if (WORDS[k] && pool.indexOf(k) === -1 && pool.length < 12) pool.push(k);
    });
  }
  var keys = pick(pool, 5),
    all = Object.keys(WORDS);
  return keys.map(function (k, i) {
    var w = WORDS[k],
      rev = i % 2 === 1;
    var ds = pick(
      all.filter(function (x) {
        return x !== k && WORDS[x].ru !== w.ru && WORDS[x].w.toLowerCase() !== k;
      }),
      3,
    );
    var opts = [{ t: rev ? w.w : w.ru, ok: true }].concat(
      ds.map(function (x) {
        return { t: rev ? WORDS[x].w : WORDS[x].ru, ok: false };
      }),
    );
    opts = pick(opts, opts.length);
    return { key: k, rev: rev, opts: opts, chosen: null };
  });
}

function prepAnswer(k) {
  var p = ui.pr;
  if (!p) return;
  var q = p.qs[p.i];
  if (q.chosen !== null) return;
  q.chosen = k;
  if (q.opts[k].ok) p.score++;
  var y = $app.scrollTop;
  render();
  $app.scrollTop = y;
  autoScrollNext();
}

function prepNext() {
  var p = ui.pr;
  if (!p) return;
  if (p.i + 1 < p.qs.length) {
    p.i++;
    render();
    window.scrollTo(0, 0);
    return;
  }
  prepDone();
}

function prepDone() {
  var p = ui.pr;
  if (!p) return;
  ui.pr = null;
  beginCaseCore.apply(null, p.next);
}

function prepView() {
  var p = ui.pr,
    q = p.qs[p.i],
    w = WORDS[q.key];
  var back = p.mode === "camp" ? "levels" : p.mode === "event" ? "event" : "home";
  var h =
    '<div class="top"><button class="back" onclick="ui.pr=null;go(\'' +
    back +
    '\')" aria-label="Back">' +
    BACK_SVG +
    '</button><div class="who"><b>Quick review</b><span>Words from your last lessons</span></div><button class="prskip" onclick="prepDone()">Skip</button></div>';
  h +=
    '<div class="rprog"><div class="bar"><i style="width:' +
    Math.round((p.i / p.qs.length) * 100) +
    '%"></i></div><span>' +
    (p.i + 1) +
    " of " +
    p.qs.length +
    "</span></div>";
  h +=
    '<div class="prcard"><small>' +
    (q.rev ? "Choose the English word" : "Choose the translation") +
    '</small><div class="prw">' +
    esc(q.rev ? w.ru : w.w) +
    (q.rev ? "" : spkBtn(w.w, "big")) +
    "</div></div>";
  for (var k = 0; k < q.opts.length; k++) {
    var o = q.opts[k],
      cls = "ropt";
    if (q.chosen !== null) {
      if (o.ok) cls += " ok";
      else if (k === q.chosen) cls += " bad";
      else cls += " dim";
    }
    h +=
      '<button class="' +
      cls +
      '" onclick="prepAnswer(' +
      k +
      ')"' +
      (q.chosen !== null ? " disabled" : "") +
      ">" +
      esc(o.t) +
      "</button>";
  }
  if (q.chosen !== null) {
    var ok = q.opts[q.chosen].ok;
    h +=
      '<div class="fb"><h3 class="' +
      (ok ? "ok" : "bad") +
      '">' +
      (ok ? "Correct" : "Not quite") +
      "</h3><p><b>" +
      esc(w.w) +
      "</b>, " +
      esc(w.ru) +
      " " +
      spkBtn(w.w) +
      '</p><p class="ex">' +
      esc(w.ex) +
      "</p></div>" +
      '<button class="cta" onclick="prepNext()">' +
      (p.i + 1 < p.qs.length ? "Next" : "Start lesson") +
      "</button>";
  }
  return h;
}

function toggleRv() {
  S.rv = S.rv === false;
  save();
  var y = $app.scrollTop;
  render();
  $app.scrollTop = y;
}
