/**
 * Route the current ui.view to its renderer, size the fixed app and apply screen-transition animations.
 * Classic browser script; dependency order is declared in index.html.
 */
var lastTransitionKey = "";

function render() {
  renderScreen();
  try {
    var v = ui.view,
      k = "";
    if (ui.lvlUp)
      k =
        "L" +
        ui.lvlUp.i +
        "|" +
        (ui.lvlUp.stages ? ui.lvlUp.stages[ui.lvlUp.i] : "") +
        "|" +
        ui.lvlUp.g;
    else if (
      !ui.onb &&
      [
        "intro",
        "chapter",
        "evintro",
        "newwords",
        "skipres",
        "review",
        "quiz",
        "article",
        "event",
        "prep",
        "rp",
        "rplist",
      ].indexOf(v) >= 0
    )
      k =
        v +
        "|" +
        (ui.pr ? "p" + ui.pr.i : "") +
        (ui.rp ? "r" + ui.rp.i + (ui.rp.checked ? "c" : "") : "") +
        "|" +
        (ui.intro ? ui.intro.idx : "") +
        (ui.chap ? ui.chap.idx : "") +
        (ui.evi !== undefined ? ui.evi : "") +
        (ui.nw && ui.nw.c ? ui.nw.c.id : "") +
        (ui.rev ? ui.rev.i : "") +
        (ui.qz ? ui.qz.i + "/" + ui.qz.done : "") +
        (ui.sr ? "s" : "");
    if (k && k !== lastTransitionKey) {
      var a = document.getElementById("app");
      a.classList.add("sf");
      setTimeout(function () {
        a.classList.remove("sf");
      }, 1500);
    } else if (k && k === lastTransitionKey) {
      document.getElementById("app").classList.remove("sf");
    }
    if (!k) {
      var a2 = document.getElementById("app");
      a2.classList.remove("sf");
    }
    lastTransitionKey = k;
  } catch (e) {}
}

function padApp() {
  var nv = document.querySelector(".nav");
  $app.style.paddingBottom = nv ? nv.offsetHeight + 72 + "px" : "28px";
}

window.addEventListener("resize", padApp);

if (document.fonts && document.fonts.ready) document.fonts.ready.then(padApp);

function renderScreen() {
  closeTrans();
  if (!ui.loaded) {
    $app.innerHTML = '<div class="center">Loading your progress</div>';
    return;
  }
  rollDay();
  if (!TK) ui.view = "tracks";
  var h;
  if (ui.view === "tracks") h = tracksView();
  else if (ui.view === "home") h = home();
  else if (ui.view === "practiceList") h = practiceListView();
  else if (ui.view === "practice") h = practiceView();
  else if (ui.view === "levels") h = levelsView();
  else if (ui.view === "intro" && ui.intro) h = introView();
  else if (ui.view === "chapter" && ui.chap) h = chapterView();
  else if (ui.view === "event") h = evView();
  else if (ui.view === "evintro" && ui.evi !== undefined) h = evIntroView();
  else if (ui.view === "rp" && ui.rp) h = rpView();
  else if (ui.view === "rplist") h = rpListView();
  else if (ui.view === "prep" && ui.pr) h = prepView();
  else if (ui.view === "newwords" && ui.nw) h = nwView();
  else if (ui.view === "skipres" && ui.sr) h = skipResView();
  else if (ui.view === "case" && ui.cur) h = caseView();
  else if (ui.view === "review" && ui.rev) h = reviewView();
  else if (ui.view === "articles") h = articlesView();
  else if (ui.view === "article" && ui.art) h = articleView();
  else if (ui.view === "quiz" && ui.qz) h = quizView();
  else if (ui.view === "words") h = words();
  else if (ui.view === "progress") h = progress();
  else h = home();
  var hideNav =
    ui.view === "practice" ||
    ui.view === "tracks" ||
    (ui.view === "rp" && ui.rp) ||
    ui.view === "rplist" ||
    (ui.view === "prep" && ui.pr) ||
    (ui.view === "case" && ui.cur) ||
    (ui.view === "review" && ui.rev) ||
    (ui.view === "article" && ui.art) ||
    (ui.view === "quiz" && ui.qz) ||
    (ui.view === "intro" && ui.intro) ||
    (ui.view === "chapter" && ui.chap) ||
    (ui.view === "evintro" && ui.evi !== undefined) ||
    (ui.view === "newwords" && ui.nw) ||
    (ui.view === "skipres" && ui.sr);
  $app.innerHTML =
    h + (hideNav ? "" : nav()) + (ui.lvlUp ? overlay() : "") + (ui.onb ? onbOverlay() : "");
  padApp();
  animateMeters();
  if (ui.view === "levels") updBanner();
}
