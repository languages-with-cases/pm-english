/**
 * Spaced word review, word-list search/filter UI and vocabulary screens.
 * Classic browser script; dependency order is declared in index.html.
 */
function isDue(k) {
  var e = S.wr[slug(k)];
  return !e || e.d <= S.rc;
}

function dueCount() {
  return S.seen.filter(function (k) {
    return WORDS[k] && isDue(k);
  }).length;
}

function reEsc(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function blank(w) {
  var re = new RegExp(reEsc(w.w), "i");
  return re.test(w.ex) ? w.ex.replace(re, "______") : null;
}

function makeQ(k) {
  var w = WORDS[k];
  var seenOthers = S.seen.filter(function (x) {
    return x !== k && WORDS[x];
  });
  var ds = pick(seenOthers, 3);
  if (ds.length < 3) {
    var rest = Object.keys(WORDS).filter(function (x) {
      return x !== k && ds.indexOf(x) === -1;
    });
    ds = ds.concat(pick(rest, 3 - ds.length));
  }
  var cl = blank(w),
    type = cl && Math.random() < 0.5 ? "cloze" : "meaning";
  var opts = [{ t: type === "cloze" ? w.w : w.ru, ok: true }].concat(
    ds.map(function (x) {
      return { t: type === "cloze" ? WORDS[x].w : WORDS[x].ru, ok: false };
    }),
  );
  var order = shuffle(opts.length);
  return {
    key: k,
    type: type,
    prompt: type === "cloze" ? cl : w.w,
    opts: order.map(function (i) {
      return opts[i];
    }),
    chosen: null,
  };
}

function startReview() {
  var keys = S.seen.filter(function (k) {
    return WORDS[k];
  });
  if (!keys.length) return;
  var due = keys.filter(isDue),
    extra = false;
  if (!due.length) {
    due = keys.slice();
    extra = true;
  }
  due = pick(due, due.length)
    .sort(function (a, b) {
      var ea = S.wr[slug(a)],
        eb = S.wr[slug(b)];
      return (ea ? ea.b : -1) - (eb ? eb.b : -1);
    })
    .slice(0, 10);
  ui.rev = { qs: due.map(makeQ), i: 0, score: 0, extra: extra, done: false };
  ui.view = "review";
  ui.cur = null;
  render();
  window.scrollTo(0, 0);
}

function revAnswer(k) {
  var r = ui.rev;
  if (!r || r.done) return;
  var q = r.qs[r.i];
  if (q.chosen !== null) return;
  q.chosen = k;
  markActive();
  var ok = q.opts[k].ok;
  var sk = slug(q.key),
    e = S.wr[sk] || { b: 0, d: 0 };
  var nb = ok ? Math.min(3, e.b + 1) : 0;
  S.rc += 1;
  S.wr[sk] = { b: nb, d: S.rc + INTERVALS[nb] };
  var li = S.learned.indexOf(q.key);
  if (ok) {
    r.score += 1;
    if (li === -1) S.learned.push(q.key);
  } else if (li > -1) S.learned.splice(li, 1);
  save();
  render();
  autoScrollNext();
}

function revNext() {
  var r = ui.rev;
  if (!r) return;
  if (r.i + 1 < r.qs.length) {
    r.i += 1;
  } else {
    r.done = true;
  }
  render();
  window.scrollTo(0, 0);
}

function setFilter(f) {
  ui.filter = f;
  render();
}

function onSearch(v) {
  ui.q = v;
  var el = document.getElementById("wl");
  if (el) el.innerHTML = wordList();
}

function reviewView() {
  var r = ui.rev;
  var top =
    '<div class="top"><button class="back" onclick="go(\'words\')" aria-label="Back">' +
    BACK_SVG +
    '</button><div class="who"><b>Review words</b><span>' +
    (r.extra ? "Extra practice" : "Due now") +
    "</span></div></div>";
  if (r.done) {
    return (
      top +
      '<div class="rdone"><h1>' +
      r.score +
      " of " +
      r.qs.length +
      "</h1><p>correct" +
      (r.extra ? ". Nothing was due, so this was extra practice." : ".") +
      "</p>" +
      '<button class="cta" onclick="startReview()">Review again</button>' +
      '<button class="cta alt" onclick="go(\'words\')">Back to dictionary</button></div>'
    );
  }
  var q = r.qs[r.i],
    w = WORDS[q.key];
  var h =
    top +
    '<div class="rprog"><div class="bar"><i style="width:' +
    Math.round((r.i / r.qs.length) * 100) +
    '%"></i></div><span>' +
    (r.i + 1) +
    " of " +
    r.qs.length +
    "</span></div>";
  h += '<div class="rq' + (q.type === "cloze" ? " cloze" : "") + '">' + esc(q.prompt) + "</div>";
  h +=
    '<div class="rhint">' +
    (q.type === "cloze" ? "Choose the missing word" : "Choose the meaning") +
    "</div>";
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
      '" onclick="revAnswer(' +
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
      '<div class="fb" id="fb"><h3 class="' +
      (ok ? "ok" : "bad") +
      '">' +
      (ok ? "Correct" : "Not quite") +
      "</h3>" +
      "<p><b>" +
      esc(w.w) +
      "</b>, " +
      esc(w.ru) +
      "</p><p>" +
      esc(w.how) +
      '</p><p class="ex">' +
      esc(w.ex) +
      "</p></div>" +
      '<button class="cta" onclick="revNext()">' +
      (r.i + 1 < r.qs.length ? "Next" : "See result") +
      "</button>";
  }
  return h;
}

function wordList() {
  var q = ui.q.trim().toLowerCase();
  var items = S.seen
    .map(function (k) {
      return { k: k, w: WORDS[k], l: S.learned.indexOf(k) > -1 };
    })
    .filter(function (x) {
      return x.w;
    });
  if (ui.filter === "new")
    items = items.filter(function (x) {
      return !x.l;
    });
  if (ui.filter === "learned")
    items = items.filter(function (x) {
      return x.l;
    });
  if (q)
    items = items.filter(function (x) {
      return x.w.w.toLowerCase().indexOf(q) > -1 || x.w.ru.toLowerCase().indexOf(q) > -1;
    });
  if (!items.length) {
    return (
      '<div class="empty">' +
      (S.seen.length ? "No words match." : "Words appear here after your first case.") +
      "</div>"
    );
  }
  items.sort(function (a, b) {
    return a.w.w.localeCompare(b.w.w);
  });
  return items
    .map(function (x) {
      return (
        '<div class="card"><div class="w"><b>' +
        esc(x.w.w) +
        spkBtn(x.w.w) +
        '</b><i class="' +
        (x.l ? "" : "new") +
        '">' +
        (x.l ? "Learned" : "New") +
        "</i></div>" +
        '<div class="ru">' +
        esc(x.w.ru) +
        "</div>" +
        "<p>" +
        esc(x.w.how) +
        "</p>" +
        '<p class="ex">' +
        esc(x.w.ex) +
        "</p></div>"
      );
    })
    .join("");
}

function words() {
  var f = function (id, label) {
    return (
      '<button class="f' +
      (ui.filter === id ? " on" : "") +
      '" onclick="setFilter(\'' +
      id +
      "')\">" +
      label +
      "</button>"
    );
  };
  return (
    "<h1>Dictionary</h1>" +
    (S.seen.length
      ? '<button class="cta" style="margin:0 0 16px" onclick="startReview()">Review words</button>'
      : "") +
    '<input class="search" type="search" placeholder="Search a word" value="' +
    esc(ui.q) +
    '" oninput="onSearch(this.value)">' +
    '<div class="filters">' +
    f("all", "All") +
    f("new", "New") +
    f("learned", "Learned") +
    "</div>" +
    '<div id="wl">' +
    wordList() +
    "</div>"
  );
}
