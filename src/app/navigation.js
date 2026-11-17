/**
 * Screen transitions, scroll-to-current-level behavior, chapter banners and toast notifications.
 * Classic browser script; dependency order is declared in index.html.
 */
function go(v) {
  ui.practice = null;
  ui.view = v;
  ui.cur = null;
  ui.rev = null;
  ui.art = null;
  ui.qz = null;
  ui.intro = null;
  ui.chap = null;
  ui.nw = null;
  ui.sr = null;
  ui.campBack = false;
  ui.resetArmed = false;
  try {
    lxRec && lxRec.abort();
  } catch (e) {}
  render();
  if (v === "levels") scrollToCur();
  else window.scrollTo(0, 0);
}

function scrollToCur() {
  var el = document.getElementById("curnode");
  if (!el) {
    window.scrollTo(0, 0);
    updBanner();
    return;
  }
  var r = el.getBoundingClientRect();
  window.scrollTo(0, Math.max(0, window.pageYOffset + r.top - window.innerHeight * 0.42));
  updBanner();
}

function updBanner() {
  if (ui.view !== "levels") return;
  var b = document.getElementById("pbn");
  if (!b) return;
  var secs = document.querySelectorAll(".gsec"),
    g = 0;
  for (var i = 0; i < secs.length; i++) {
    if (secs[i].getBoundingClientRect().top <= 120) g = +secs[i].getAttribute("data-g");
  }
  if (ui.bg !== g) {
    ui.bg = g;
    b.innerHTML = bannerInner(g);
  }
}

window.addEventListener("scroll", updBanner, { passive: true });

function toast(m) {
  var old = document.getElementById("toast");
  if (old && old.parentNode) old.parentNode.removeChild(old);
  var t = document.createElement("div");
  t.id = "toast";
  t.className = "toast";
  t.textContent = m;
  document.body.appendChild(t);
  setTimeout(function () {
    if (t.parentNode) t.parentNode.removeChild(t);
  }, 1900);
}
