/**
 * Bridge window scroll APIs to the fixed app scroller and dispatch its scroll events.
 * Classic browser script; dependency order is declared in index.html.
 */
(function () {
  var a = document.getElementById("app");
  if (!a) return;
  var st = window.scrollTo;
  window.scrollTo = function (x, y) {
    var t = typeof x === "object" && x ? x.top : y;
    a.scrollTop = t || 0;
  };
  try {
    Object.defineProperty(window, "pageYOffset", {
      get: function () {
        return a.scrollTop;
      },
    });
    Object.defineProperty(window, "scrollY", {
      get: function () {
        return a.scrollTop;
      },
    });
  } catch (e) {}
  a.addEventListener(
    "scroll",
    function () {
      window.dispatchEvent(new Event("scroll"));
    },
    { passive: true },
  );
})();
