/**
 * Product articles, keyword explanations and quizzes; only one articlesView implementation is retained.
 * Classic browser script; dependency order is declared in index.html.
 */
function readMins(a) {
  var n = a.text.join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(n / 180));
}

function artsDone() {
  return ARTICLES.filter(function (a) {
    return S.art[a.id];
  }).length;
}

function openArticle(id) {
  var a = AMAP[id];
  if (!a) return;
  ui.art = a;
  ui.view = "article";
  ui.cur = null;
  ui.rev = null;
  ui.qz = null;
  a.words.forEach(function (w) {
    var k = w.w.toLowerCase();
    if (S.seen.indexOf(k) === -1) S.seen.push(k);
  });
  markActive();
  save();
  render();
  window.scrollTo(0, 0);
}

function showKw(i) {
  var a = ui.art;
  if (!a) return;
  var w = a.words[i],
    el = document.getElementById("sheet");
  if (!el || !w) return;
  el.innerHTML =
    '<div><div class="hd"><b>' +
    esc(w.w) +
    '</b><button class="x" onclick="hideKw()">Close</button></div><div class="ru">' +
    esc(w.ru) +
    "</div><p>" +
    esc(w.how) +
    '</p><p class="ex">' +
    esc(w.ex) +
    "</p></div>";
  el.className = "sheet on";
}

function hideKw() {
  var el = document.getElementById("sheet");
  if (el) el.className = "sheet";
}

function startQuiz() {
  var a = ui.art;
  if (!a) return;
  var qs = a.quiz.map(function (q) {
    var opts = [{ t: q.ok, ok: true }].concat(
      q.wrong.map(function (t) {
        return { t: t, ok: false };
      }),
    );
    var tf =
      opts.length === 2 && /^(True|False)$/.test(opts[0].t) && /^(True|False)$/.test(opts[1].t);
    var o = tf
      ? opts.slice().sort(function (x) {
          return x.t === "True" ? -1 : 1;
        })
      : shuffle(opts.length).map(function (i) {
          return opts[i];
        });
    return { q: q.q, e: q.e, w: q.w, opts: o, chosen: null };
  });
  ui.qz = {
    a: a,
    qs: qs,
    i: 0,
    score: 0,
    done: false,
    first: !S.art[a.id],
    bonus: [],
    earned: 0,
    pending: null,
  };
  ui.view = "quiz";
  render();
  window.scrollTo(0, 0);
}

function quizAnswer(k) {
  var z = ui.qz;
  if (!z || z.done) return;
  var q = z.qs[z.i];
  if (q.chosen !== null) return;
  q.chosen = k;
  var ok = q.opts[k].ok;
  markActive();
  if (ok) {
    z.score += 1;
    if (q.w && S.learned.indexOf(q.w) === -1) S.learned.push(q.w);
  }
  if (z.i + 1 >= z.qs.length) {
    var a = z.a;
    if (z.first) {
      z.earned = z.score * QUIZ_XP + (z.score === z.qs.length ? QUIZ_BONUS : 0);
      S.xp += z.earned;
      S.art[a.id] = { s: z.score };
      z.bonus = dailyProgress();
    } else if (z.score > (S.art[a.id].s || 0)) {
      S.art[a.id] = { s: z.score };
    }
  }
  save();
  render();
  autoScrollNext();
}

function quizNext() {
  var z = ui.qz;
  if (!z) return;
  if (z.i + 1 < z.qs.length) {
    z.i += 1;
    render();
    window.scrollTo(0, 0);
    return;
  }
  var show = function () {
    z.done = true;
    render();
    window.scrollTo(0, 0);
  };
  if (z.pending) {
    ui.lvlUp = z.pending;
    z.pending = null;
    ui.lvlNext = show;
    render();
  } else show();
}

function artHtml(a) {
  return a.text
    .map(function (p) {
      var h = esc(p).replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, function (m, disp, key) {
        var i = -1;
        for (var j = 0; j < a.words.length; j++) {
          if (a.words[j].w.toLowerCase() === key.toLowerCase()) {
            i = j;
            break;
          }
        }
        return i < 0
          ? disp
          : '<button class="kw" onclick="showKw(' + i + ')">' + disp + "</button>";
      });
      return "<p>" + h + "</p>";
    })
    .join("");
}

function articleView() {
  var a = ui.art;
  return (
    '<div class="top"><button class="back" onclick="go(\'articles\')" aria-label="Back">' +
    BACK_SVG +
    '</button><div class="who"><b>' +
    esc(a.topic) +
    "</b><span>" +
    readMins(a) +
    " min read</span></div></div>" +
    '<div class="art"><h1>' +
    esc(a.title) +
    '</h1><div class="hint">Tap the highlighted words for translations. They are added to your dictionary.</div>' +
    artHtml(a) +
    '<button class="cta" onclick="startQuiz()">Take the quiz</button></div><div style="height:170px"></div><div id="sheet" class="sheet"></div>'
  );
}

function quizView() {
  var z = ui.qz,
    n = z.qs.length;
  var top =
    '<div class="top"><button class="back" onclick="go(\'articles\')" aria-label="Back">' +
    BACK_SVG +
    '</button><div class="who"><b>' +
    esc(z.a.title) +
    "</b><span>Quiz</span></div></div>";
  if (z.done) {
    var h = top + '<div class="rdone"><h1>' + z.score + " of " + n + "</h1><p>correct</p>";
    if (z.first) {
      h += '<div class="rbonus"><div class="bonus">Quiz, +' + z.score * QUIZ_XP + " XP</div>";
      if (z.score === n) h += '<div class="bonus">Perfect score, +' + QUIZ_BONUS + " XP</div>";
      h +=
        z.bonus
          .map(function (b) {
            return '<div class="bonus">' + esc(b.t) + ", +" + b.xp + " XP</div>";
          })
          .join("") + "</div>";
    } else {
      h += '<div class="rbonus"><div class="bonusnote">Retakes give no XP.</div></div>';
    }
    h +=
      '<button class="cta" onclick="go(\'articles\')">Back to articles</button>' +
      '<button class="cta alt" onclick="startQuiz()">Take the quiz again</button></div>';
    return h;
  }
  var q = z.qs[z.i];
  var h2 =
    top +
    '<div class="rprog"><div class="bar"><i style="width:' +
    Math.round((z.i / n) * 100) +
    '%"></i></div><span>' +
    (z.i + 1) +
    " of " +
    n +
    "</span></div>";
  h2 += '<div class="rq cloze">' + esc(q.q) + '</div><div class="rhint">Choose one answer</div>';
  for (var k = 0; k < q.opts.length; k++) {
    var o = q.opts[k],
      cls = "ropt";
    if (q.chosen !== null) {
      if (o.ok) cls += " ok";
      else if (k === q.chosen) cls += " bad";
      else cls += " dim";
    }
    h2 +=
      '<button class="' +
      cls +
      '" onclick="quizAnswer(' +
      k +
      ')"' +
      (q.chosen !== null ? " disabled" : "") +
      ">" +
      esc(o.t) +
      "</button>";
  }
  if (q.chosen !== null) {
    var ok = q.opts[q.chosen].ok;
    h2 +=
      '<div class="fb" id="fb"><h3 class="' +
      (ok ? "ok" : "bad") +
      '">' +
      (ok ? "Correct" : "Not quite") +
      "</h3><p>" +
      esc(q.e) +
      "</p></div>" +
      '<button class="cta" onclick="quizNext()">' +
      (z.i + 1 < n ? "Next question" : "See result") +
      "</button>";
  }
  return h2;
}

function artsOf(g) {
  return ARTICLES.filter(function (a, i) {
    return Math.floor(i / 3) === g;
  });
}

function openArticles(g) {
  ui.artG = g;
  go("articles");
}
