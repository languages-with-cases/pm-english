/**
 * Product event cards, scenario state/meters, completion and star rewards.
 * Classic browser script; dependency order is declared in index.html.
 */
function STAR(sz, dim) {
  return (
    '<img class="star' +
    (dim ? " dim" : "") +
    '" src="' +
    STAR_IMG +
    '" width="' +
    sz +
    '" height="' +
    sz +
    '" alt="" aria-hidden="true">'
  );
}

function starsHtml(sz) {
  var n = S.stars.length;
  if (!n) return "";
  var h =
    '<span class="stars" aria-label="' + n + (n === 1 ? " event star" : " event stars") + '">';
  for (var i = 0; i < n; i++) h += STAR(sz);
  return h + "</span>";
}

function evById(id) {
  for (var i = 0; i < EVENTS.length; i++) {
    if (EVENTS[i].id === id) return EVENTS[i];
  }
  return null;
}

function evState(id) {
  var e = S.ev[id];
  return e || { l: 0, m: [50, 50, 50], pts: 0, max: 0 };
}

function evDone(id) {
  return S.stars.indexOf(id) > -1;
}

function evCard() {
  if (!EVENTS.length) return "";
  var ev = EVENTS[0],
    st = evState(ev.id);
  if (evDone(ev.id)) {
    return (
      '<button class="evcard done" onclick="go(\'event\')"><div class="evt"><small>Event completed</small><b>' +
      esc(ev.title) +
      "</b></div></button>"
    );
  }
  var started = st.l > 0;
  return (
    '<button class="evcard" onclick="go(\'event\')"><div class="evt"><small>New event</small><b>' +
    esc(ev.title) +
    "</b></div><em>" +
    (started ? "Continue" : "Start event") +
    "</em></button>"
  );
}

function evMeters(ev, st) {
  var h = '<div class="mt">';
  for (var i = 0; i < ev.meters.length; i++) {
    var v = st.m[i];
    h +=
      '<div class="mrow"><span>' +
      esc(ev.meters[i]) +
      '</span><div class="bar"><i' +
      (v < 30 ? ' class="low"' : "") +
      ' style="width:' +
      v +
      '%"></i></div><em>' +
      v +
      "</em></div>";
  }
  return h + "</div>";
}

function evView() {
  var ev = EVENTS[0],
    st = evState(ev.id),
    done = evDone(ev.id);
  var h =
    '<div class="top"><button class="back" onclick="go(\'home\')" aria-label="Back">' +
    BACK_SVG +
    '</button><div class="who"><b>Event</b><span>' +
    esc(ev.title) +
    ", " +
    esc(ev.place) +
    "</span></div></div>";
  h +=
    '<div class="hero"><small>' +
    (done ? "Completed" : "Limited event") +
    "</small><h1>" +
    esc(ev.title) +
    "</h1></div>";
  h += '<div class="scene"><p>' + esc(ev.story) + "</p></div>";
  h += '<div class="sec">Your numbers</div>' + evMeters(ev, st);
  h += '<div class="sec">Levels</div>';
  ev.levels.forEach(function (lv, i) {
    var state = i < st.l ? "done" : i === st.l ? "cur" : "lock";
    var tag = state === "done" ? "Done" : state === "cur" ? "Play" : "Locked";
    h +=
      '<button class="row evrow' +
      (state === "cur" ? " cur" : "") +
      (state === "lock" ? " lock" : "") +
      '"' +
      (state === "cur" ? ' onclick="evOpen(' + i + ')"' : " disabled") +
      "><div><b>Level " +
      (i + 1) +
      ", " +
      esc(lv.day) +
      "</b><span>" +
      esc(lv.topic) +
      ", " +
      lv.steps.length +
      " messages</span></div><em>" +
      tag +
      "</em></button>";
  });
  if (done)
    h +=
      '<div class="evstar">' +
      STAR(56) +
      "<p>You earned a star for this event. It stays next to your title forever.</p></div>";
  else
    h +=
      '<div class="pnote">Finish all ' +
      ev.levels.length +
      " levels to earn a star next to your title.</div>";
  return h;
}

function evOpen(i) {
  var ev = EVENTS[0],
    st = evState(ev.id);
  if (i !== st.l || evDone(ev.id)) return;
  ui.evi = i;
  ui.view = "evintro";
  ui.cur = null;
  render();
  window.scrollTo(0, 0);
}

function evIntroView() {
  var ev = EVENTS[0],
    i = ui.evi,
    lv = ev.levels[i],
    c = lv.c;
  var h =
    '<div class="top"><button class="back" onclick="go(\'event\')" aria-label="Back">' +
    BACK_SVG +
    '</button><div class="who"><b>' +
    esc(ev.title) +
    "</b><span>" +
    esc(ev.place) +
    "</span></div></div>";
  h +=
    '<div class="hero"><small>Level ' +
    (i + 1) +
    " of " +
    ev.levels.length +
    "</small><h1>" +
    esc(lv.day) +
    '</h1><div class="when">' +
    esc(ev.title) +
    ", " +
    esc(ev.place) +
    "</div></div>";
  h += '<div class="scene"><p>' + esc(lv.scene) + "</p></div>";
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
  h += '<button class="cta" style="margin-top:22px" onclick="evIntroStart()">Open message</button>';
  return h;
}

function evIntroStart() {
  var ev = EVENTS[0];
  if (ui.evi === undefined) return;
  beginCase(ev.levels[ui.evi].c, false, "event", false);
}

function evFinishLevel(cur) {
  var c = cur.c,
    ev = evById(c.ev),
    st = evState(ev.id);
  if (c.evIdx === st.l) {
    st.l += 1;
    st.m = cur.m.slice();
    st.pts += cur.pts;
    st.max += cur.smax;
    S.ev[ev.id] = st;
  }
  if (st.l >= ev.levels.length) {
    if (S.stars.indexOf(ev.id) === -1) S.stars.push(ev.id);
    var ratio = st.max ? st.pts / st.max : 0,
      ek = ratio >= 0.75 ? "good" : ratio >= 0.4 ? "mid" : "bad";
    save();
    ui.cur = null;
    ui.view = "event";
    ui.lvlUp = {
      stages: ["evresult", "evstar"],
      i: 0,
      evr: { id: ev.id, ek: ek, pct: Math.round(ratio * 100), m: st.m.slice() },
    };
    ui.lvlNext = function () {
      go("home");
    };
    render();
    window.scrollTo(0, 0);
  } else {
    save();
    go("event");
  }
}

var EV_HEAD = { good: "Outstanding trip", mid: "A solid trip", bad: "A tough trip" };

function evOverlay(u, stage) {
  var r = u.evr,
    ev = evById(r.id);
  if (stage === "evresult") {
    var nums = ev.meters
      .map(function (n, i) {
        return n + " " + r.m[i];
      })
      .join(", ");
    return scr(
      "Event complete",
      esc(EV_HEAD[r.ek]),
      [ev.endings[r.ek], "Your final numbers: " + nums + ".", "Your score: " + r.pct + "%."],
      "Continue",
      true,
    );
  }
  var g = curGrade();
  return (
    '<div class="ov2"><div class="chap"><div class="bigstar">' +
    STAR(110) +
    '</div><div class="ck">New star</div><h2 class="ct">You earned a star</h2>' +
    '<p class="story">' +
    esc(
      "Congratulations! You finished the " +
        ev.title +
        " and made it back from " +
        ev.place +
        ". A star now shines next to your title, and it stays there forever, whatever your position becomes.",
    ) +
    "</p>" +
    '<p class="story">Your title now: <b>' +
    esc(LEVELS[g].n) +
    "</b> " +
    starsHtml(20) +
    '</p><div class="sp"></div>' +
    '<button class="cta" onclick="lvlContinue()">Great</button></div></div>'
  );
}

function startM(c, mode) {
  if (mode === "event" && c.ev) {
    return evState(c.ev).m.slice();
  }
  return [50, 50, 50];
}
