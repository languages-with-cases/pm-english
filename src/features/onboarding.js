/**
 * Welcome/tutorial overlays, their examples, transitions and completion flags.
 * Classic browser script; dependency order is declared in index.html.
 */
function onbMock(m) {
  if (m === "path") {
    var names = trackShort(),
      k = 0.62,
      W = 700,
      H = 190,
      top = 30,
      bot = 165;
    var f = function (t) {
      return (Math.exp(k * t) - 1) / (Math.exp(k * 6) - 1);
    };
    var X = function (t) {
        return (t + 0.5) * 100;
      },
      Y = function (t) {
        return bot - (bot - top) * f(t);
      };
    var pts = [];
    for (var j = 0; j <= 60; j++) {
      var t = j / 10;
      pts.push(X(t).toFixed(1) + "," + Y(t).toFixed(1));
    }
    var dots = "";
    for (var i = 0; i < 7; i++) {
      var end = i === 0 || i === 6;
      dots +=
        '<circle cx="' +
        X(i) +
        '" cy="' +
        Y(i).toFixed(1) +
        '" r="' +
        (end ? 16 : 13) +
        '" fill="' +
        (end ? "#2457f5" : "#fff") +
        '" stroke="#2457f5" stroke-width="' +
        (end ? 0 : 5) +
        '"/>';
    }
    return (
      '<div class="omock path"><svg viewBox="0 0 ' +
      W +
      " " +
      H +
      '" width="100%" aria-hidden="true"><polyline points="' +
      pts.join(" ") +
      '" fill="none" stroke="#9db6ff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>' +
      dots +
      "</svg>" +
      '<div class="plabels">' +
      names
        .map(function (n) {
          return "<span>" + n + "</span>";
        })
        .join("") +
      "</div></div>"
    );
  }
  if (m === "chat") {
    return (
      '<div class="omock"><div class="bub">Export won\'t be ready by Friday. What do we do?</div>' +
      '<div class="opt ok" style="max-width:92%;margin-left:auto">Offer a smaller release on Friday and the rest next week.<span class="oc"><span class="oh"><b>10 XP</b><i>Best choice</i></span></span></div></div>'
    );
  }
  if (m === "tr") {
    return (
      '<div class="omock"><div class="bub"><span class="tw on">Export</span> won\'t be ready by Friday.</div>' +
      '<div class="trpop demo"><div class="trw">export</div><div class="trt">экспорт</div><div class="trt">выгрузка</div></div></div>'
    );
  }
  if (m === "streak") {
    return (
      '<div class="omock row2"><div class="tile streak"><div class="stx"><b>3 days</b><span>Day streak</span></div>' +
      FLAME +
      "</div>" +
      '<div class="chips" style="align-content:center"><span class="chip">scope</span><span class="chip">backlog</span><span class="chip">stakeholder</span></div></div>'
    );
  }
  return (
    '<div class="omock"><div class="evcard done"><div class="evt"><small>Event completed</small><b>Business Trip</b></div></div>' +
    '<div class="ostars"><b>Intern</b>' +
    STAR(30) +
    STAR(30) +
    "</div></div>"
  );
}

function onbOverlay() {
  var o = ui.onb,
    n = ONB.length,
    s = ONB[o.i],
    last = o.i === n - 1;
  var dots = "";
  for (var i = 0; i < n; i++) dots += '<i class="' + (i === o.i ? "on" : "") + '"></i>';
  return (
    '<div class="ov2 onb"><div class="chap">' +
    '<div class="onbtop"><div class="odots">' +
    dots +
    '</div><button class="oskip" onclick="onbDone()">' +
    (last ? "Close" : "Skip") +
    "</button></div>" +
    onbMock(s.m) +
    '<div class="ck">' +
    esc(s.k) +
    '</div><h2 class="ct">' +
    esc(s.t) +
    '</h2><p class="story">' +
    esc(s.p) +
    '</p><div class="sp"></div>' +
    '<div class="onbbtns">' +
    (o.i > 0 ? '<button class="cta alt" onclick="onbGo(-1)">Back</button>' : "") +
    '<button class="cta" onclick="' +
    (last ? "onbDone()" : "onbGo(1)") +
    '">' +
    (last ? "Start playing" : "Next") +
    "</button></div>" +
    "</div></div>"
  );
}

var onbBusy = false;

function onbGo(d) {
  if (!ui.onb || onbBusy) return;
  var ni = Math.max(0, Math.min(ONB.length - 1, ui.onb.i + d));
  if (ni === ui.onb.i) return;
  var sel = ".ov2.onb .omock,.ov2.onb .ck,.ov2.onb .ct,.ov2.onb .story";
  var olds = document.querySelectorAll(sel);
  var go2 = function () {
    ui.onb.i = ni;
    render();
    var e = document.querySelector(".ov2.onb");
    if (e) e.scrollTop = 0;
    var ns = document.querySelectorAll(sel);
    for (var k = 0; k < ns.length; k++) {
      var x = ns[k];
      x.style.setProperty("--ox", (d > 0 ? 36 : -36) + "px");
      x.style.animation = "onbin .5s cubic-bezier(.22,1,.36,1) " + k * 55 + "ms both";
    }
    setTimeout(function () {
      onbBusy = false;
    }, 300);
  };
  if (!olds.length) {
    go2();
    return;
  }
  onbBusy = true;
  for (var j = 0; j < olds.length; j++) {
    var y = olds[j];
    y.style.setProperty("--ox", (d > 0 ? -36 : 36) + "px");
    y.style.animation = "onbout .18s ease-in both";
  }
  setTimeout(go2, 170);
}

function onbDone() {
  ui.onb = null;
  if (!S.onb || !S.onb2) {
    S.onb = true;
    S.onb2 = true;
    save();
  }
  render();
  window.scrollTo(0, 0);
}

function startOnb() {
  ui.onb = { i: 0 };
  render();
}

function bub(t, out) {
  return '<div class="bub' + (out ? " out" : "") + '">' + tw(t) + "</div>";
}
