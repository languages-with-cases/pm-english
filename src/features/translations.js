/**
 * Word tokenization and tap/long-press translation popups, using the shared TR dictionary.
 * Classic browser script; dependency order is declared in index.html.
 */
var TWRE = /[A-Za-z]+(?:['\u2019\-][A-Za-z]+)*/g;

function tw(t) {
  t = String(t);
  var out = "",
    last = 0,
    m;
  TWRE.lastIndex = 0;
  while ((m = TWRE.exec(t))) {
    out += esc(t.slice(last, m.index)) + '<span class="tw">' + esc(m[0]) + "</span>";
    last = m.index + m[0].length;
  }
  return out + esc(t.slice(last));
}

function trFor(w) {
  var k = w.toLowerCase().replace(/\u2019/g, "'");
  if (TR[k]) return TR[k];
  var b = k.replace(/'s$/, "");
  return TR[b] || null;
}

var trEl = null,
  trOn = null,
  trHold = null,
  trSuppress = 0;

function closeTrans() {
  if (trEl && trEl.parentNode) trEl.parentNode.removeChild(trEl);
  trEl = null;
  if (trOn) {
    trOn.classList.remove("on");
    trOn = null;
  }
}

function showTrans(el) {
  closeTrans();
  var w = el.textContent,
    tr = trFor(w);
  var pop = document.createElement("div");
  pop.className = "trpop";
  pop.setAttribute("role", "dialog");
  var h = '<div class="trw"><span>' + esc(w.toLowerCase()) + "</span>" + spkBtn(w) + "</div>";
  if (tr)
    h += tr
      .map(function (x) {
        return '<div class="trt">' + esc(x) + "</div>";
      })
      .join("");
  else h += '<div class="trn">No translation yet</div>';
  pop.innerHTML = h;
  pop.style.visibility = "hidden";
  document.body.appendChild(pop);
  var r = el.getBoundingClientRect(),
    pw = pop.offsetWidth,
    ph = pop.offsetHeight,
    vw = window.innerWidth,
    vh = window.innerHeight;
  var left = Math.max(12, Math.min(vw - pw - 12, r.left + r.width / 2 - pw / 2));
  var top = r.top - ph - 8;
  if (top < 12) top = r.bottom + 8;
  if (top + ph > vh - 12) top = Math.max(12, vh - ph - 12);
  pop.style.left = left + "px";
  pop.style.top = top + "px";
  pop.style.visibility = "visible";
  el.classList.add("on");
  trOn = el;
  trEl = pop;
}

(function () {
  function wordEl(e) {
    var t = e.target;
    return t && t.closest ? t.closest(".tw") : null;
  }
  document.addEventListener(
    "pointerdown",
    function (e) {
      if (trEl && !e.target.closest(".trpop")) closeTrans();
      var el = wordEl(e);
      if (el && el.closest(".opt") && !el.closest(".opt").getAttribute("aria-disabled")) {
        clearTimeout(trHold);
        trHold = setTimeout(function () {
          trSuppress = 1;
          showTrans(el);
        }, 420);
      }
    },
    true,
  );
  ["pointerup", "pointercancel", "pointermove", "scroll"].forEach(function (n) {
    document.addEventListener(
      n,
      function () {
        clearTimeout(trHold);
        if (trSuppress && n !== "pointermove")
          setTimeout(function () {
            trSuppress = 0;
          }, 350);
      },
      true,
    );
  });
  document.addEventListener(
    "click",
    function (e) {
      if (trSuppress) {
        trSuppress = 0;
        e.stopPropagation();
        e.preventDefault();
        return;
      }
      var el = wordEl(e);
      if (!el) return;
      var opt = el.closest(".opt");
      if (opt && !opt.getAttribute("aria-disabled")) return;
      e.stopPropagation();
      showTrans(el);
    },
    true,
  );
  document.addEventListener(
    "contextmenu",
    function (e) {
      if (wordEl(e)) e.preventDefault();
    },
    true,
  );
  window.addEventListener("scroll", closeTrans, { passive: true });
  window.addEventListener("resize", closeTrans);
})();
