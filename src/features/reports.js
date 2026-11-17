/**
 * Product report exercises: browsing, gap selection, editing and answer evaluation.
 * Classic browser script; dependency order is declared in index.html.
 */
function rpDone(i) {
  return S.rp && S.rp[i] !== undefined;
}

function openReports() {
  ui.rp = null;
  ui.view = "rplist";
  ui.cur = null;
  render();
  window.scrollTo(0, 0);
}

function rpOpen(i) {
  var r = RP[i];
  ui.rp = {
    i: i,
    ord: r.g.map(function () {
      return pick([0, 1, 2], 3);
    }),
    ans: [null, null, null],
    act: 0,
    checked: false,
  };
  ui.view = "rp";
  render();
  window.scrollTo(0, 0);
}

function rpListView() {
  var done = 0;
  for (var i = 0; i < RP.length; i++) if (rpDone(i)) done++;
  var h =
    '<div class="top"><button class="back" onclick="go(\'home\')" aria-label="Back">' +
    BACK_SVG +
    '</button><div class="who"><b>Reports</b><span>' +
    done +
    " of " +
    RP.length +
    " written</span></div></div>";
  h +=
    '<h1>Write a report</h1><div class="sub">Short emails to your manager. Fill in three gaps with the best option.</div>';
  RP.forEach(function (r, i) {
    var d = rpDone(i);
    h +=
      '<button class="artcard" onclick="rpOpen(' +
      i +
      ')"><div class="ah"><b>' +
      esc(r.subj) +
      '</b><em class="' +
      (d ? "done" : "") +
      '">' +
      (d ? S.rp[i] + " of 3" : "New") +
      "</em></div><span>To " +
      esc(r.to) +
      "</span></button>";
  });
  return h;
}

function rpBody(p) {
  var r = RP[p.i],
    paras = r.t.split("\n\n");
  return paras
    .map(function (para) {
      var h = esc(para).replace(/\{(\d)\}/g, function (m, n) {
        var g = +n - 1,
          a = p.ans[g],
          cls = "gap",
          txt;
        if (p.checked) {
          var ok = r.g[g][0],
            right = a === 0;
          cls += right ? " ok" : " bad";
          txt = ok;
        } else if (a !== null) {
          cls += " fill" + (p.act === g ? " act" : "");
          txt = r.g[g][a];
        } else {
          cls += (p.act === g ? " act" : "") + " empty";
          txt = "Gap " + n;
        }
        return '<button class="' + cls + '" onclick="rpGap(' + g + ')">' + esc(txt) + "</button>";
      });
      return "<p>" + h + "</p>";
    })
    .join("");
}

function rpView() {
  var p = ui.rp,
    r = RP[p.i];
  var h =
    '<div class="top"><button class="back" onclick="openReports()" aria-label="Back">' +
    BACK_SVG +
    '</button><div class="who"><b>Write a report</b><span>Report ' +
    (p.i + 1) +
    " of " +
    RP.length +
    "</span></div></div>";
  h +=
    '<div class="mail"><div class="mh"><span>To</span><b>' +
    esc(r.to) +
    '</b></div><div class="mh"><span>Subject</span><b>' +
    esc(r.subj) +
    '</b></div><div class="mb">' +
    rpBody(p) +
    "</div></div>";
  var all = p.ans.every(function (x) {
    return x !== null;
  });
  if (!p.checked) {
    var g = p.act;
    h += '<div class="rphint">Gap ' + (g + 1) + " of 3: choose the best option</div>";
    for (var k = 0; k < 3; k++) {
      var o = p.ord[g][k];
      h +=
        '<button class="ropt' +
        (p.ans[g] === o ? " sel" : "") +
        '" onclick="rpPick(' +
        o +
        ')">' +
        esc(r.g[g][o]) +
        "</button>";
    }
    if (all) h += '<button class="cta" onclick="rpCheck()">Check report</button>';
  } else {
    var sc = p.ans.filter(function (a) {
      return a === 0;
    }).length;
    h +=
      '<div class="fb"><h3 class="' + (sc === 3 ? "ok" : "bad") + '">' + sc + " of 3 correct</h3>";
    for (var j = 0; j < 3; j++) {
      var okk = p.ans[j] === 0;
      h +=
        "<p><b>Gap " +
        (j + 1) +
        ".</b> " +
        (okk ? "" : "You chose: <i>" + esc(r.g[j][p.ans[j]]) + "</i>. ") +
        "Best: <b>" +
        esc(r.g[j][0]) +
        '</b></p><p class="ex">' +
        esc(r.g[j][3]) +
        "</p>";
    }
    h += "</div>";
    if (p.i + 1 < RP.length)
      h += '<button class="cta" onclick="rpOpen(' + (p.i + 1) + ')">Next report</button>';
    h += '<button class="cta alt" onclick="openReports()">All reports</button>';
  }
  return h;
}

function rpKeep(f) {
  var y = $app.scrollTop;
  f();
  render();
  $app.scrollTop = y;
}

function rpGap(g) {
  var p = ui.rp;
  if (!p || p.checked) return;
  p.act = g;
  rpKeep(function () {});
}

function rpPick(o) {
  var p = ui.rp;
  if (!p || p.checked) return;
  p.ans[p.act] = o;
  var nx = -1;
  for (var d = 1; d <= 3; d++) {
    var g = (p.act + d) % 3;
    if (p.ans[g] === null) {
      nx = g;
      break;
    }
  }
  if (nx >= 0) p.act = nx;
  rpKeep(function () {});
}

function rpCheck() {
  var p = ui.rp;
  if (!p || p.checked) return;
  var sc = p.ans.filter(function (a) {
    return a === 0;
  }).length;
  p.checked = true;
  S.rp = S.rp || {};
  if (S.rp[p.i] === undefined) {
    S.xp += sc * 3;
    markActive();
  }
  S.rp[p.i] = Math.max(S.rp[p.i] || 0, sc);
  save();
  render();
  window.scrollTo(0, 0);
}
