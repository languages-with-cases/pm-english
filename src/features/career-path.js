/**
 * Career-path layout, chapter/intro screens, skip/new-word screens and promotion overlays.
 * Classic browser script; dependency order is declared in index.html.
 */
function bannerInner(g) {
  var gs = gStats(g);
  return (
    "<div><small>Chapter " +
    (g + 1) +
    "</small><b>" +
    esc(LEVELS[g].n) +
    "</b></div><em>" +
    gs.done +
    " of " +
    gs.total +
    "</em>"
  );
}

var CX = 160,
  SH = 72,
  ROW = 118,
  TOP0 = 112,
  SNAKE = [0, 1, 0, -1];

function gradeSection(g, ci) {
  var idxs = [],
    a = [];
  FLAT.forEach(function (f, i) {
    if (f.g === g) {
      a.push(f);
      idxs.push(i);
    }
  });
  var gs = gStats(g),
    n = a.length,
    H = TOP0 + (n - 1) * ROW + 104;
  var pts = a.map(function (f, k) {
    return { x: CX + SNAKE[k % 4] * SH, y: TOP0 + k * ROW };
  });
  var Rr = ((ROW * ROW + SH * SH) / (2 * SH)).toFixed(2);
  function segD(s) {
    return (
      "M" +
      pts[s].x +
      " " +
      pts[s].y +
      " A" +
      Rr +
      " " +
      Rr +
      " 0 0 " +
      (Math.floor(s / 2) % 2 === 0 ? 1 : 0) +
      " " +
      pts[s + 1].x +
      " " +
      pts[s + 1].y
    );
  }
  var offD = "",
    onD = "",
    skD = "";
  for (var s = 0; s < n - 1; s++) {
    offD += segD(s) + " ";
    var ss = levelState(idxs[s], ci);
    if (ss === "done") onD += segD(s) + " ";
    else if (ss === "skip") skD += segD(s) + " ";
  }
  var svg =
    '<svg class="pth" viewBox="0 0 320 ' +
    H +
    '" preserveAspectRatio="none" aria-hidden="true"><path class="off" d="' +
    offD +
    '"/>' +
    (skD ? '<path class="sk" d="' + skD + '"/>' : "") +
    (onD ? '<path class="on" d="' + onD + '"/>' : "") +
    "</svg>";
  var nodes = "";
  a.forEach(function (f, k) {
    var i = idxs[k],
      st = levelState(i, ci),
      p = pts[k],
      inner;
    if (st === "done") inner = ICO.check;
    else if (st === "lock") inner = ICO.lock;
    else if (st === "skip") inner = "";
    else inner = f.boss ? ICO.star : String(f.i + 1);
    var lab =
      (f.boss ? "Boss case" : "Level " + (f.i + 1)) +
      ", " +
      (st === "done"
        ? "completed"
        : st === "cur"
          ? "next up"
          : st === "skip"
            ? "skipped, open"
            : "locked");
    nodes +=
      '<button class="nd ' +
      st +
      (f.boss ? " boss" : "") +
      '"' +
      (st === "cur" ? ' id="curnode"' : "") +
      ' style="left:' +
      ((p.x / 320) * 100).toFixed(2) +
      "%;top:" +
      p.y +
      'px" onclick="openLevel(' +
      i +
      ')" aria-label="' +
      lab +
      '">' +
      inner +
      (st === "cur" ? '<span class="pill">Start</span>' : "") +
      (f.boss ? '<span class="bl">Boss case</span>' : "") +
      "</button>";
  });
  var cg = curGrade();
  var sub = gs.complete
    ? gradePassed(g)
      ? "Completed"
      : "Score " + Math.round(gradeScore(g).pct * 100) + "%, need " + passTxt() + " to move on"
    : gs.done === 0 && g > cg
      ? "Locked until you score " + passTxt() + " in " + esc(LEVELS[g - 1].n)
      : gs.done + " of " + gs.total + " levels" + (g < cg ? ", skipped ones are open" : "");
  var skip =
    g > cg && !gs.complete
      ? '<button class="skipbtn" onclick="trySkip(' + g + ')">Try to skip ahead</button>'
      : "";
  var arts = ARTICLES.length
    ? '<button class="skipbtn alt" onclick="openArticles(' + g + ')">Articles</button>'
    : "";
  return (
    '<section class="gsec" data-g="' +
    g +
    '"><div class="gh"><small>Chapter ' +
    (g + 1) +
    "</small><h2>" +
    esc(ROLES[g].t) +
    "</h2><span>" +
    sub +
    '</span><div class="gbtns">' +
    arts +
    skip +
    "</div></div>" +
    '<div class="pathbox" style="height:' +
    H +
    'px">' +
    svg +
    nodes +
    "</div></section>"
  );
}

function levelsView() {
  var ci = curIdx(),
    done = FLAT.filter(fDone).length;
  var bosses = PLAN.length;
  ui.bg = 0;
  var h =
    '<h1>Career path</h1><div class="sub">' +
    done +
    " of " +
    FLAT.length +
    " levels completed. Finish every level of a chapter and its boss case, and score at least " +
    passTxt() +
    " of the points, to get promoted.</div>";
  h += '<div class="pbanner" id="pbn">' + bannerInner(0) + "</div>";
  for (var g = 0; g < PLAN.length; g++) h += gradeSection(g, ci);
  return h;
}

function introView() {
  var i = ui.intro,
    f = FLAT[i.idx],
    c = BYID[f.id],
    g = f.g,
    gn = nextGradeName(g),
    rep = i.replay;
  var h =
    '<div class="top"><button class="back" onclick="go(\'levels\')" aria-label="Back">' +
    BACK_SVG +
    '</button><div class="who"><b>Chapter ' +
    (g + 1) +
    "</b><span>" +
    esc(LEVELS[g].n) +
    "</span></div></div>";
  if (f.boss) {
    var B = BOSSINTRO[g];
    h +=
      '<div class="hero"><small>Boss case</small><h1>The final test</h1><div class="when">Chapter ' +
      (g + 1) +
      ", " +
      esc(LEVELS[g].n) +
      "</div></div>";
    h +=
      '<div class="scene boss"><p>' +
      esc(B.en) +
      '</p><div class="goal">' +
      (gn ? "Pass it to become " + esc(gn) + "." : "Pass it to complete your career.") +
      "</div></div>";
  } else {
    var O = OPENERS[i.idx % OPENERS.length];
    h +=
      '<div class="hero"><small>Level ' +
      (f.i + 1) +
      " of " +
      f.n +
      "</small><h1>" +
      esc(weekLabel(f)) +
      '</h1><div class="when">Chapter ' +
      (g + 1) +
      ", " +
      esc(LEVELS[g].n) +
      "</div></div>";
    h += '<div class="scene"><p>' + esc(O.en) + "</p></div>";
  }
  h +=
    '<div class="from"><div class="avatar">' +
    esc(c.sender.name.charAt(0).toUpperCase()) +
    '</div><div class="tx"><b>' +
    esc(c.sender.name) +
    ", " +
    esc(c.sender.role) +
    "</b><span>writes to you " +
    (c.sender.channel === "Email" ? "by email" : "in " + esc(c.sender.channel)) +
    '</span></div><div class="tp">' +
    esc(c.topic) +
    "</div></div>";
  h +=
    '<button class="cta' +
    (f.boss && !rep ? " bossbtn" : "") +
    '" style="margin-top:22px" onclick="introStart()">' +
    (rep ? "Practice again" : f.boss ? "Take the challenge" : "Open message") +
    "</button>";
  if (rep)
    h +=
      '<div class="pnote">Practice gives half XP. A better answer than before raises your chapter score.</div>';
  else if (i.skipped)
    h += '<div class="pnote">You skipped this level. Finish it to earn XP and a checkmark.</div>';
  return h;
}

function chapInner(g, label, btn) {
  var R = ROLES[g],
    T = STORY[g];
  return (
    '<div class="chap"><div class="ck">' +
    label +
    '</div><h2 class="ct">' +
    esc(R.t) +
    "</h2>" +
    '<p class="story">' +
    esc(T.en) +
    '</p><p class="rl">' +
    esc(R.en) +
    '</p><div class="sp"></div>' +
    btn +
    "</div>"
  );
}

function chapterView() {
  var ch = ui.chap;
  return (
    '<div class="top"><button class="back" onclick="go(\'levels\')" aria-label="Back">' +
    BACK_SVG +
    "</button></div>" +
    chapInner(
      ch.g,
      "Chapter " + (ch.g + 1),
      '<button class="cta" onclick="chapStart()">Begin chapter</button>',
    )
  );
}

function skipResView() {
  var r = ui.sr,
    g = r.g;
  var h =
    '<div class="top"><button class="back" onclick="go(\'levels\')" aria-label="Back">' +
    BACK_SVG +
    '</button><div class="who"><b>Skip challenge</b><span>Chapter ' +
    (g + 1) +
    ", " +
    esc(LEVELS[g].n) +
    "</span></div></div>";
  if (r.ok) {
    h +=
      '<div class="hero"><small>Great outcome, ' +
      r.pct +
      '%</small><h1>You jumped ahead</h1><div class="when">Chapter ' +
      (g + 1) +
      ", " +
      esc(LEVELS[g].n) +
      "</div></div>" +
      '<div class="scene"><p>You handled the boss case so well that the earlier levels are marked as complete.</p></div>' +
      '<button class="cta" style="margin-top:22px" onclick="skipContinue()">Continue</button>';
  } else {
    h +=
      '<div class="hero"><small>Result, ' +
      r.pct +
      '%</small><h1>Not this time</h1><div class="when">You need a great outcome, 75% or more</div></div>' +
      '<div class="scene"><p>Your progress is unchanged. You can try again right now, or go back and play the levels one by one.</p></div>' +
      '<button class="cta" style="margin-top:22px" onclick="trySkip(' +
      g +
      ')">Try again</button>' +
      '<button class="cta alt" onclick="go(\'levels\')">Back to levels</button>';
  }
  return h;
}

function nwView() {
  var n = ui.nw,
    c = n.c,
    back = n.mode === "camp" ? "levels" : n.mode === "event" ? "event" : "home";
  var h =
    '<div class="top"><button class="back" onclick="go(\'' +
    back +
    '\')" aria-label="Back">' +
    BACK_SVG +
    '</button><div class="who"><b>New words</b><span>' +
    esc(c.topic) +
    "</span></div></div>";
  h += '<h1>New words</h1><div class="sub">Terms you will meet in this case.</div>';
  n.words.forEach(function (w) {
    h +=
      '<div class="wcard"><b>' +
      esc(w.w) +
      spkBtn(w.w) +
      '</b><div class="wr">' +
      esc(w.ru) +
      '</div><div class="we">' +
      esc(w.ex) +
      "</div></div>";
  });
  h += '<div class="nwb"><button class="cta" onclick="nwNext()">Next</button></div>';
  return h;
}

function scr(kicker, title, paras, btn, medal) {
  return (
    '<div class="ov2"><div class="chap">' +
    (medal ? '<div class="medal">' + ICO.star + "</div>" : "") +
    '<div class="ck">' +
    kicker +
    '</div><h2 class="ct">' +
    title +
    "</h2>" +
    paras
      .map(function (p) {
        return '<p class="story">' + esc(p) + "</p>";
      })
      .join("") +
    '<div class="sp"></div>' +
    '<button class="cta" onclick="lvlContinue()">' +
    btn +
    "</button></div></div>"
  );
}

function overlay() {
  var u = ui.lvlUp,
    st = u.stages ? u.stages[u.i] : "chapter",
    r = u.res;
  if (st === "evresult" || st === "evstar") return evOverlay(u, st);
  if (st === "result") {
    return scr(
      u.skipped ? "Skip challenge complete" : "Boss case complete",
      esc(RES_HEAD[r.ek]),
      [r.text, "Your score: " + r.pct + "%. You earned " + r.xp + " XP in this case."],
      "Continue",
      true,
    );
  }
  if (st === "promo") {
    var tone = r ? PROMO_TONE[r.ek] : PROMO_TONE.good;
    return scr(
      "Congratulations",
      "You've been promoted to " + esc(LEVELS[u.g].n),
      u.skipped
        ? [
            PROMO[u.g],
            tone,
            "You jumped straight here by passing the boss case of the previous chapter. The levels you skipped stay open, so you can still play them for XP.",
          ]
        : [PROMO[u.g], tone],
      "Continue",
      true,
    );
  }
  if (st === "end") {
    return scr(
      "Congratulations",
      "You reached the top: " + esc(LEVELS[LEVELS.length - 1].n),
      [r ? PROMO_TONE[r.ek] : PROMO_TONE.good, END_STORY.en],
      "Finish",
      true,
    );
  }
  return (
    '<div class="ov2">' +
    chapInner(
      u.g,
      "Chapter " + (u.g + 1),
      '<button class="cta" onclick="lvlContinue()">Begin chapter</button>',
    ) +
    "</div>"
  );
}

function articlesView() {
  var g = ui.artG || 0;
  var h =
    '<div class="top"><button class="back" onclick="go(\'levels\')" aria-label="Back">' +
    BACK_SVG +
    '</button><div class="who"><b>Articles</b><span>Chapter ' +
    (g + 1) +
    ", " +
    esc(LEVELS[g].n) +
    "</span></div></div>";
  var list = artsOf(g),
    done = list.filter(function (a) {
      return S.art[a.id];
    }).length;
  h +=
    '<h1>Articles</h1><div class="sub">Short reads for this chapter. Read, learn the words, then take a quiz. ' +
    done +
    " of " +
    list.length +
    " quizzes done.</div>";
  list.forEach(function (a) {
    var r = S.art[a.id];
    h +=
      '<button class="artcard" onclick="openArticle(\'' +
      a.id +
      '\')"><div class="ah"><b>' +
      esc(a.title) +
      '</b><em class="' +
      (r ? "done" : "") +
      '">' +
      (r ? "Quiz " + r.s + " of " + a.quiz.length : "New") +
      "</em></div><span>" +
      esc(a.topic) +
      ", " +
      readMins(a) +
      " min read</span></button>";
  });
  return h;
}
