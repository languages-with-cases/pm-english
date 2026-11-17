/**
 * Render task headers, tone options, microphone states, sentence blocks and completion/error feedback.
 * Classic browser script; dependency order is declared in index.html.
 */
function lxErrText(e) {
  if (e === "nosupport") return "Speech recognition is not available here. Tap the words instead.";
  if (e === "not-allowed" || e === "service-not-allowed")
    return "Microphone access is blocked. Tap the words instead.";
  if (e === "no-speech") return "No speech was heard. Tap the mic and speak right away.";
  if (e === "audio-capture") return "No microphone was found. Tap the words instead.";
  if (e === "network") return "Speech recognition needs an internet connection.";
  if (e === "aborted") return "";
  return "Speech recognition stopped. Try again or tap the words.";
}

function lxView() {
  var x = ui.cur.x,
    f = x._an !== x.stage;
  x._an = x.stage;
  var h = lxView0();
  return f ? '<div class="lxfresh">' + h + "</div>" : h;
}

function lxHead(cur, n) {
  var c = cur.c;
  return (
    '<div class="top"><button class="back" onclick="go(\'' +
    (cur.mode !== "rand" ? "levels" : "home") +
    '\')" aria-label="Back">' +
    BACK_SVG +
    "</button>" +
    '<div class="avatar">' +
    esc(c.sender.name.charAt(0).toUpperCase()) +
    "</div>" +
    '<div class="who"><b>' +
    esc(c.sender.name) +
    "</b><span>" +
    esc(c.sender.role) +
    ", " +
    esc(c.sender.channel) +
    "</span></div>" +
    '<div class="tag">Task ' +
    n +
    " of 3</div></div>"
  );
}

function lxView0() {
  var cur = ui.cur,
    x = cur.x,
    h;
  if (x.careerTask && (x.stage === "careerPractice" || x.stage === "end"))
    return careerPracticeView(cur);
  if (x.stage === "tone") {
    var T = x.L.tone,
      done = x.tChosen !== null;
    h =
      lxHead(cur, 2) +
      '<div class="lxk">Tone check</div><div class="lxctx">' +
      esc(T.ctx) +
      "</div>" +
      '<div class="opts"><div class="opts-h">Which message is accurate, clear and appropriate here?</div>';
    for (var k = 0; k < x.tOrder.length; k++) {
      var oi = x.tOrder[k],
        o = T.opts[oi],
        cls = "opt",
        inner = esc(o.t);
      if (done) {
        cls += o.ok ? " ok" : " bad";
        inner +=
          '<span class="oc"><span class="oh"><b>' +
          (o.ok ? "Best wording" : "Needs revision") +
          "</b>" +
          (oi === x.tChosen ? "<i>Your answer</i>" : "") +
          '</span><span class="ob">' +
          esc(o.c) +
          "</span></span>";
      }
      h +=
        '<button type="button" class="' +
        cls +
        ' lxopt" data-k="' +
        k +
        '"' +
        (done ? " disabled" : "") +
        ">" +
        inner +
        "</button>";
    }
    h += '</div><div class="note" id="lxerr"></div>';
    if (done) {
      var ok = T.opts[x.tChosen].ok;
      h +=
        '<div class="fb" id="fb"><h3 class="' +
        (ok ? "ok" : "bad") +
        '">' +
        (ok ? "Good wording" + (x.tGain ? ", +" + x.tGain + " XP" : "") : "Not this one, +0 XP") +
        "</h3></div>" +
        '<button class="cta" onclick="lxToBuild()">Next task</button>';
    }
    return h;
  }
  var won = x.result && x.result.ok;
  h =
    lxHead(cur, 3) +
    '<div class="lxk">Build the sentence</div>' +
    '<div class="lxctx">' +
    "Say the sentence using all the blocks in the right order, or tap the blocks one by one and press Done." +
    "</div>";
  if (!won) {
    h += '<div class="tapans">';
    if (!x.picked.length)
      h += '<span class="tapph">Say the sentence, or tap the words below</span>';
    x.picked.forEach(function (k, i) {
      h +=
        '<button type="button" class="spb on" data-k="' +
        k +
        '" onclick="lxUnpick(' +
        i +
        ')">' +
        esc(x.blocks[k]) +
        "</button>";
    });
    h += '</div><div class="spblocks pool">';
    x.bOrder.forEach(function (k) {
      if (x.picked.indexOf(k) < 0)
        h +=
          '<button type="button" class="spb" id="lxb' +
          k +
          '" data-k="' +
          k +
          '" onclick="lxPick(' +
          k +
          ')">' +
          esc(x.blocks[k]) +
          "</button>";
    });
    h += "</div>";
  } else {
    h += '<div class="spblocks">';
    x.bOrder.forEach(function (k) {
      h += '<span class="spb lit" id="lxb' + k + '">' + esc(x.blocks[k]) + "</span>";
    });
    h += "</div>";
  }
  if (won) {
    h +=
      '<div class="spres ok"><b>Correct' +
      (x.bGain ? ", +" + x.bGain + " XP" : "") +
      "</b><span>" +
      esc(x.L.build) +
      "</span></div>" +
      '<button class="cta" onclick="lxFinish()">' +
      esc(nextLabel(cur, true)) +
      "</button>";
    return h;
  }
  var full = x.picked.length === x.blocks.length;
  if (x.picked.length) {
    h +=
      '<div class="lxinw"><button class="cta" onclick="lxDone()"' +
      (full ? "" : " disabled") +
      ">Done</button></div>";
  } else {
    h +=
      '<div class="spmicw"><button class="spmic' +
      (x.state === "listening" ? " on" : "") +
      '" onclick="lxMic()" aria-label="Speak">' +
      MIC_SVG +
      "</button>" +
      '<div class="splive" id="lxlive">' +
      (x.state === "listening" ? "Listening..." : "Tap and speak") +
      "</div></div>";
    if (x.err && lxErrText(x.err)) h += '<div class="note">' + esc(lxErrText(x.err)) + "</div>";
  }
  if (x.result && !x.result.ok) {
    h +=
      '<div class="spres bad"><b>Not quite, ' +
      x.result.pct +
      "% match</b><span>" +
      (x.result.via === "text" ? "You built" : "You said") +
      ": “" +
      esc(x.said || "...") +
      "”</span></div>";
    if (x.tries >= LX_TRIES)
      h += '<div class="spres"><b>Correct order</b><span>' + esc(x.L.build) + "</span></div>";
  }
  if (x.tries >= LX_TRIES)
    h += '<div class="sprow"><button class="cta ghost" onclick="lxFinish()">Skip</button></div>';
  return h;
}

document.addEventListener("click", function (ev) {
  var t = ev.target && ev.target.closest ? ev.target.closest(".lxopt") : null;
  if (!t || t.disabled) return;
  ev.preventDefault();
  lxTone(+t.getAttribute("data-k"));
});
