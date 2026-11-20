/**
 * Progress/statistics/calendar/account screen presentation.
 * Classic browser script; dependency order is declared in index.html.
 */
function progress() {
  var h =
    '<div class="top"><button class="back" onclick="go(\'home\')" aria-label="Back">' +
    BACK_SVG +
    "</button></div><h1>Progress</h1>";
  var acc = S.stats.a ? Math.round((S.stats.c / S.stats.a) * 100) : 0;
  h +=
    '<div class="tiles"><div class="tile"><b>' +
    acc +
    '%</b><span>accuracy</span></div><div class="tile"><b>' +
    S.learned.length +
    "</b><span>words learned</span></div></div>";

  var scn = CASES.filter(function (c) {
    return c.scn;
  });
  h +=
    '<div class="sec">Scenarios</div><div class="row"><div><b>Scenarios solved</b><span>Multi-step cases with consequences</span></div><em>' +
    scn.filter(caseDone).length +
    " of " +
    scn.length +
    "</em></div>";
  if (EVENTS.length)
    h +=
      '<div class="row"><div><b>Event stars</b><span>Earned by finishing events, kept forever</span></div><em>' +
      S.stars.length +
      " of " +
      EVENTS.length +
      "</em></div>";
  var st = streakNow();
  h += '<div class="sec">Daily goal and streak</div>';
  h +=
    '<div class="row"><div><b>Daily goal</b><span>' +
    GOAL +
    (GOAL === 1 ? " case" : " cases") +
    " a day, +" +
    GOAL_XP +
    " XP</span></div><em>" +
    Math.min(S.day.n, GOAL) +
    " of " +
    GOAL +
    "</em></div>";
  h +=
    '<div class="row"><div><b>Current streak</b><span>Best: ' +
    dayWord(S.best) +
    "</span></div><em>" +
    dayWord(st) +
    "</em></div>";
  MILESTONES.forEach(function (m) {
    var got = st >= m[0];
    h +=
      '<div class="row' +
      (got ? "" : " lock") +
      '"><div><b>' +
      m[0] +
      " days in a row</b><span>+" +
      m[1] +
      " XP</span></div><em>" +
      (got ? "Reached" : m[0] - st + " to go") +
      "</em></div>";
  });

  h += '<div class="sec">Review queue</div>';
  h +=
    '<div class="row"><div><b>Words to review</b><span>Due now in Review</span></div><em>' +
    dueCount() +
    "</em></div>";
  h +=
    '<div class="row"><div><b>Cases to retry</b><span>Come up in Random case</span></div><em>' +
    S.retry.length +
    "</em></div>";
  if (ARTICLES.length)
    h +=
      '<div class="row"><div><b>Articles with quiz</b><span>Read, then answer 5 questions</span></div><em>' +
      artsDone() +
      " of " +
      ARTICLES.length +
      "</em></div>";

  h += '<div class="sec">Career path</div>';
  var cg = curGrade();
  for (var g = 0; g < PLAN.length; g++) {
    var gs = gStats(g),
      open = gs.done > 0 || g <= cg;
    var cur = g === cg && !gs.complete;
    h +=
      '<div class="row' +
      (cur ? " cur" : "") +
      (open ? "" : " lock") +
      '"><div><b>' +
      esc(LEVELS[g].n) +
      "</b><span>" +
      gs.done +
      " of " +
      gs.total +
      " levels, boss case included" +
      (gs.done > 0 ? ", score " + Math.round(gradeScore(g).pct * 100) + "%" : "") +
      "</span></div><em>" +
      (gs.complete ? "Complete" : cur ? "Current" : open ? "Started" : "Locked") +
      "</em></div>";
  }
  var topics = Object.keys(S.stats.t);
  if (topics.length) {
    h += '<div class="sec">Topics</div>';
    topics.sort().forEach(function (t) {
      var v = S.stats.t[t],
        p = v[0] ? Math.round((v[1] / v[0]) * 100) : 0;
      h +=
        '<div class="topic"><div><b>' +
        esc(t) +
        "</b><span>" +
        v[1] +
        " of " +
        v[0] +
        ' correct</span></div><div class="bar"><i style="width:' +
        p +
        '%"></i></div></div>';
    });
  }
  h +=
    '<div class="sec">Settings</div><button class="row tgl' +
    (S.rv !== false ? " on" : "") +
    '" onclick="toggleRv()"><div><b>Review before lessons</b><span>' +
    (S.rv !== false
      ? "5 words from your last 5 lessons. Tap to turn off."
      : "Turned off. Tap to turn on.") +
    '</span></div><i class="sw"></i></button>';
  h += offlineHTML();
  h += accountHTML();
  h +=
    '<button class="reset" onclick="resetTap()">' +
    (ui.resetArmed ? "Tap again to erase progress in this track" : "Reset this track") +
    "</button>";
  h +=
    '<button class="special alt onbbtn" onclick="startOnb()"><div><b>Onboarding</b><span>Show the quick tour again</span></div><em>Start</em></button>';
  var msg =
    store.kind === "claude"
      ? "Saved to your Claude account."
      : cloud.user && cloud.ready && !cloudPending && navigator.onLine
        ? "Saved to your account and on this device."
        : store.kind === "local"
          ? "Saved on this device only."
          : "Saving is not available in this view, progress will reset when you leave.";
  if (store.status === "error") msg = "Last save failed. It will retry on your next answer.";
  h += '<div class="save">' + msg + "</div>";
  return h;
}
