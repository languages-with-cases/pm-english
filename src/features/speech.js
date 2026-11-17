/**
 * Text-to-speech voice selection and Listen button handling; microphone recognition is owned by lesson/controller.js.
 * Classic browser script; dependency order is declared in index.html.
 */
var spkVoice = null;

function spkPick() {
  try {
    var v = speechSynthesis.getVoices() || [];
    spkVoice =
      v.filter(function (x) {
        return /^en[-_]US/i.test(x.lang);
      })[0] ||
      v.filter(function (x) {
        return /^en/i.test(x.lang);
      })[0] ||
      null;
  } catch (e) {}
}

try {
  speechSynthesis.onvoiceschanged = spkPick;
  spkPick();
} catch (e) {}

function speak(t) {
  try {
    if (!window.speechSynthesis) {
      toast("Audio is not available here");
      return;
    }
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(String(t));
    u.lang = "en-US";
    u.rate = 0.9;
    if (spkVoice) u.voice = spkVoice;
    speechSynthesis.speak(u);
  } catch (e) {
    toast("Audio is not available here");
  }
}

function spkBtn(t, cls) {
  return (
    '<button class="spk' +
    (cls ? " " + cls : "") +
    '" type="button" data-say="' +
    esc(t) +
    '" aria-label="Listen">' +
    SPK_SVG +
    "</button>"
  );
}

document.addEventListener(
  "click",
  function (e) {
    var b = e.target.closest && e.target.closest(".spk");
    if (b) {
      e.stopPropagation();
      e.preventDefault();
      speak(b.getAttribute("data-say"));
    }
  },
  true,
);
