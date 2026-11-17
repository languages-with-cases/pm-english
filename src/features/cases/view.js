/**
 * Case message/options/feedback markup, scenario meters and their display animation.
 * Classic browser script; dependency order is declared in index.html.
 */
function meterHtml(cur) {
  var c = cur.c,
    fb = cur.chosen !== null,
    h = '<div class="mt">';
  for (var i = 0; i < c.meters.length; i++) {
    var to = cur.m[i],
      from = fb ? cur.mPrev[i] : to;
    h +=
      '<div class="mrow"><span>' +
      esc(c.meters[i]) +
      '</span><div class="bar"><i' +
      (to < 30 ? ' class="low"' : "") +
      ' style="width:' +
      from +
      '%" data-to="' +
      to +
      '"></i></div><em>' +
      to +
      "</em></div>";
  }
  return h + "</div>";
}

function animateMeters() {
  var els = document.querySelectorAll(".mt i[data-to]");
  if (!els || !els.length) return;
  setTimeout(function () {
    for (var i = 0; i < els.length; i++) {
      els[i].style.width = els[i].getAttribute("data-to") + "%";
    }
  }, 60);
}

function caseView() {
  var cur = ui.cur,
    c = cur.c,
    st = c.steps[cur.step];
  if (cur.x && !cur.x.done) return lxView();
  var init = c.sender.name.charAt(0).toUpperCase();
  var parts = [];
  if (cur.mode === "skip") parts.push("Skip challenge");
  else if (cur.replay) parts.push("Practice");
  else if (cur.retry) parts.push("Retry");
  if (cur.mode === "event") parts.push("Event");
  if (cur.boss && cur.mode !== "skip") parts.push("Boss");
  if (lxOn(cur)) parts.push("Task 1 of 3");
  if (c.steps.length > 1) parts.push("Step " + (cur.step + 1) + " of " + c.steps.length);
  var h =
    '<div class="top">' +
    '<button class="back" onclick="go(\'' +
    (cur.mode === "event" ? "event" : cur.mode !== "rand" ? "levels" : "home") +
    '\')" aria-label="Back">' +
    BACK_SVG +
    "</button>" +
    '<div class="avatar">' +
    esc(init) +
    "</div>" +
    '<div class="who"><b>' +
    esc(c.sender.name) +
    "</b><span>" +
    esc(c.sender.role) +
    ", " +
    esc(c.sender.channel) +
    "</span></div>" +
    (parts.length ? '<div class="tag">' + parts.join(", ") + "</div>" : "") +
    "</div>";
  if (c.meters) h += meterHtml(cur);
  cur.thread.forEach(function (t) {
    h +=
      bub(t.msg, false) +
      bub(t.reply, true) +
      (t.r ? '<div class="narr">' + tw(t.r) + "</div>" : "");
  });
  if (cur.stage === "wait") {
    h +=
      '<button class="bub notif pop" onclick="openMsg()">New message from ' +
      esc(c.sender.name) +
      "<span>Tap to open" +
      (c.scn ? ", up to " + cur.smax + " XP" : "") +
      "</span></button>";
    return h;
  }
  var shownMsg = st.alt && cur.prevBad ? st.alt : st.msg;
  cur.shown = shownMsg;
  h += '<div class="bub' + (cur.fresh === "msg" ? " pop" : "") + '">' + tw(shownMsg) + "</div>";
  if (cur.stage !== "opts") return h;
  var anim = cur.fresh === "opts";
  h +=
    '<div class="opts"><div class="opts-h' +
    (anim ? " pop" : "") +
    '">Choose the best answer:</div>';
  for (var k = 0; k < cur.order.length; k++) {
    var oi = cur.order[k],
      o = st.options[oi];
    var cls = "opt",
      done = cur.chosen !== null,
      inner = tw(o.t);
    if (done) {
      cls += o.ok ? " ok" : o.p > 0 ? " part" : " bad";
      inner +=
        '<span class="oc"><span class="oh"><b>' +
        o.p +
        " XP</b>" +
        (oi === cur.chosen ? "<i>Your answer</i>" : "") +
        "</span>" +
        (o.c ? '<span class="ob">' + esc(o.c) + "</span>" : "") +
        "</span>";
    }
    if (anim) cls += " pop";
    h +=
      '<button class="' +
      cls +
      '"' +
      (anim ? ' style="animation-delay:' + (k + 1) * 150 + 'ms"' : "") +
      ' onclick="answer(' +
      k +
      ')"' +
      (done ? ' aria-disabled="true"' : "") +
      ">" +
      inner +
      "</button>";
  }
  h += "</div>";
  if (cur.chosen !== null) {
    var last = cur.step + 1 >= c.steps.length;
    var o2 = st.options[cur.chosen];
    var head, hcls;
    head =
      cur.tier === "best"
        ? "Best choice, +" + cur.gain + " XP"
        : cur.tier === "part"
          ? "Reasonable choice, +" + cur.gain + " XP"
          : "Not this one, +0 XP";
    hcls = cur.tier === "best" ? "ok" : cur.tier === "part" ? "part" : "bad";
    var fx = "";
    if (c.scn) {
      fx =
        "<h4>What happened</h4><p>" +
        tw(o2.r) +
        '</p><div class="effs">' +
        o2.e
          .map(function (d, i) {
            return d === 0
              ? ""
              : '<span class="eff ' +
                  (d > 0 ? "up" : "dn") +
                  '">' +
                  esc(c.meters[i]) +
                  " " +
                  (d > 0 ? "+" : "") +
                  d +
                  "</span>";
          })
          .join("") +
        "</div>" +
        (st.explain ? "<h4>Takeaway</h4>" : "");
    }
    var endHtml = "";
    if (c.scn && last && !(cur.pending && cur.pending.res)) {
      var ratio = cur.smax ? cur.pts / cur.smax : 0;
      var ek = ratio >= 0.75 ? "good" : ratio >= 0.4 ? "mid" : "bad";
      var et = ek === "good" ? "Great outcome" : ek === "mid" ? "Mixed outcome" : "Rough outcome";
      endHtml =
        "<h4>" +
        et +
        "</h4><p>" +
        tw(c.endings[ek]) +
        '</p><div class="bonus">Case total, +' +
        cur.earned +
        " XP</div>";
    }
    h +=
      '<div class="fb" id="fb">' +
      '<h3 class="' +
      hcls +
      '">' +
      head +
      "</h3>" +
      fx +
      (st.explain ? "<p>" + tw(st.explain) + "</p>" : "") +
      "<h4>Added to your dictionary</h4>" +
      '<div class="chips">' +
      st.words
        .map(function (w) {
          return '<span class="chip">' + esc(w.w) + "</span>";
        })
        .join("") +
      "</div>" +
      endHtml +
      (last &&
      S.retry.some(function (r) {
        return r.id === c.id;
      })
        ? '<div class="bonusnote">This case will come back later in Random case.</div>'
        : "") +
      cur.bonus
        .map(function (b) {
          return '<div class="bonus">' + esc(b.t) + ", +" + b.xp + " XP</div>";
        })
        .join("") +
      "</div>" +
      '<button class="cta" onclick="nextTap()">' +
      nextLabel(cur, last) +
      "</button>";
  }
  return h;
}
