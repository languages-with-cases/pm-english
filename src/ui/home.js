/**
 * Shared bottom navigation, home dashboard and streak display.
 * Classic browser script; dependency order is declared in index.html.
 */
function nav() {
  var t = function (id, label, svg) {
    return (
      '<button class="' +
      (ui.view === id ||
      (id === "levels" && ui.view === "articles") ||
      (id === "home" && (ui.view === "event" || ui.view === "evintro"))
        ? "on"
        : "") +
      '" onclick="go(\'' +
      id +
      "')\">" +
      svg +
      "<span>" +
      label +
      "</span></button>"
    );
  };
  return (
    '<div class="nav"><div>' +
    t(
      "home",
      "Home",
      '<svg viewBox="0 0 24 24"><path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/></svg>',
    ) +
    t(
      "levels",
      "Levels",
      '<svg viewBox="0 0 24 24"><circle cx="7" cy="6" r="2.5"/><circle cx="17" cy="12" r="2.5"/><circle cx="7" cy="18" r="2.5"/><path d="M9.2 7.2l5.6 3.6M14.8 13.2l-5.6 3.6"/></svg>',
    ) +
    t(
      "words",
      "Words",
      '<svg viewBox="0 0 24 24"><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/></svg>',
    ) +
    "</div></div>"
  );
}

function streakCard() {
  return (
    '<div class="tile streak"><div class="stx"><b>' +
    dayWord(streakNow()) +
    "</b><span>Day streak</span></div>" +
    FLAME +
    "</div>"
  );
}

function dayWord(n) {
  return n + (n === 1 ? " day" : " days");
}

function home() {
  var ci = curIdx(),
    g = curGrade(),
    gs = gStats(g),
    all = ci >= FLAT.length,
    nm = nextGradeName(g);
  var pct = Math.round((gs.done / gs.total) * 100);
  var meta = all
    ? "<span>All chapters complete</span><span>" + S.xp + " XP</span>"
    : "<span>" +
      gs.done +
      " of " +
      gs.total +
      " levels</span><span>" +
      gs.left +
      (gs.left === 1 ? " level" : " levels") +
      " to " +
      (nm ? esc(nm) : "the top") +
      "</span>";
  var f = all ? null : FLAT[ci];
  var cTitle = all ? "All done" : f.boss ? "Boss case" : "Level " + (f.i + 1);
  var cSub = all ? "Career complete" : f.boss ? "Chapter finale" : esc(BYID[f.id].topic);
  var blk = gateBlocked();
  if (blk >= 0) {
    var gsc = gradeScore(blk),
      gp = Math.round(gsc.pct * 100);
    pct = gp;
    meta =
      "<span>Chapter score " +
      gp +
      "%</span><span>Need " +
      passTxt() +
      " to " +
      (nm ? "become " + esc(nm) : "finish") +
      "</span>";
    cTitle = "Raise your score";
    cSub = "Replay " + esc(BYID[f.id].topic);
  }
  var pool = randPool(),
    rk = pool.length ? pool[0].kind : "";
  var rsub =
    rk === "retry"
      ? "Retry a mistake"
      : rk === "bonus"
        ? "Bonus or practice"
        : rk === "practice"
          ? "Practice"
          : "Finish a level first";
  var due = dueCount();
  var n = Math.min(S.day.n, GOAL);
  var h =
    '<div class="toprow"><div class="brand" style="--b1:\'' +
    esc(trackMeta(CUR_TRACK || "product").b) +
    "'\">" +
    esc(trackName()) +
    "</div></div>" +
    '<div class="lvl">' +
    esc(LEVELS[g].n) +
    starsHtml(26) +
    "</div>" +
    '<div class="xpbar"><i style="width:' +
    pct +
    '%"></i></div>' +
    '<div class="xpmeta">' +
    meta +
    "</div>" +
    '<div class="ctarow"><button class="cta2" onclick="openLevel(' +
    ci +
    ')"' +
    (all ? " disabled" : "") +
    "><b>" +
    cTitle +
    "</b><span>" +
    cSub +
    "</span></button>" +
    streakCard() +
    "</div>" +
    evCard() +
    (blk >= 0
      ? '<div class="gate">You finished every level of this chapter, but your score is below ' +
        passTxt() +
        ". The next chapter opens at " +
        passTxt() +
        " of the points. Replay the cases where you picked weaker answers: a better answer raises your score.</div>"
      : "") +
    '<div class="tiles">' +
    '<div class="tile"><b>' +
    S.xp +
    "</b><span>XP earned</span></div>" +
    '<div class="tile"><b>' +
    S.seen.length +
    "</b><span>words in dictionary</span></div>" +
    "</div>";
  if (store.status === "error")
    h +=
      '<div class="note">Progress could not be saved. Check your connection and keep going, it will retry on the next answer.</div>';
  var R = ROLES[g];
  h += '<div class="role"><b>' + esc(R.t) + "</b><p>" + esc(R.en) + "</p></div>";
  h +=
    '<button class="cta2 hard rndbtn" onclick="solveRandom()"' +
    (pool.length ? "" : " disabled") +
    "><b>Random case</b><span>" +
    rsub +
    "</span></button>";
  if (RP.length)
    h +=
      '<button class="cta2 hard rndbtn" onclick="openReports()"><b>Write a report</b><span>' +
      Object.keys(S.rp || {}).length +
      " of 10 done</span></button>";
  h +=
    '<button class="special alt" onclick="go(\'progress\')"><div><b>Progress</b><span>Stats, streak and topics</span></div><em>Open</em></button>';
  h += practiceHomeCard();
  h += homeSignIn();
  h += '<button class="accb ghost homeg2" onclick="go(\'tracks\')">Change track</button>';
  return h;
}
