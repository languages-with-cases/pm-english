/**
 * Touch pull/bounce behavior at the fixed app scroll boundaries.
 * Classic browser script; dependency order is declared in index.html.
 */
(function () {
  var a = document.getElementById("app");
  if (!a) return;
  function kids() {
    return Array.prototype.filter.call(a.children, function (c) {
      var l = c.classList;
      return !l.contains("nav") && !l.contains("ov2") && !l.contains("toast");
    });
  }
  var cur = 0,
    tgt = 0,
    raf = 0,
    pulling = false,
    tr = null;
  function apply() {
    var ks = kids();
    for (var i = 0; i < ks.length; i++) {
      var st = ks[i].style;
      st.transition = "none";
      st.willChange = "transform";
      st.transform = cur ? "translate3d(0," + cur.toFixed(2) + "px,0)" : "";
    }
  }
  function loop() {
    raf = 0;
    cur += (tgt - cur) * 0.28;
    if (Math.abs(tgt - cur) < 0.15) cur = tgt;
    apply();
    if (cur !== tgt || pulling) raf = requestAnimationFrame(loop);
  }
  function kick() {
    if (!raf) raf = requestAnimationFrame(loop);
  }
  function release(ms, ease) {
    pulling = false;
    tgt = 0;
    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
    var ks = kids(),
      v = cur;
    cur = 0;
    ks.forEach(function (k) {
      k.style.transition = "transform " + ms + "ms " + ease;
      k.style.transform = "";
    });
    clearTimeout(tr);
    tr = setTimeout(function () {
      ks.forEach(function (k) {
        k.style.transition = "";
        k.style.willChange = "";
      });
    }, ms + 60);
  }
  var sy = 0,
    ps = null,
    tch = false,
    hist = [],
    cd = 0;
  function edge(dy) {
    return (
      (dy > 0 && a.scrollTop <= 0) || (dy < 0 && a.scrollTop + a.clientHeight >= a.scrollHeight - 1)
    );
  }
  a.addEventListener(
    "touchstart",
    function (e) {
      tch = true;
      sy = e.touches[0].clientY;
      ps = null;
      clearTimeout(tr);
    },
    { passive: true },
  );
  a.addEventListener(
    "touchmove",
    function (e) {
      var y = e.touches[0].clientY,
        dy = y - sy;
      if (ps === null) {
        if (Math.abs(dy) < 12 || !edge(dy)) return;
        ps = y;
        pulling = true;
      }
      var raw = y - ps;
      if (
        (raw > 0 && a.scrollTop > 0) ||
        (raw < 0 && a.scrollTop + a.clientHeight < a.scrollHeight - 1)
      ) {
        ps = null;
        pulling = false;
        tgt = 0;
        kick();
        return;
      }
      var m = Math.abs(raw);
      tgt = Math.sign(raw) * 82 * (1 - Math.exp(-m / 190));
      if (e.cancelable) e.preventDefault();
      kick();
    },
    { passive: false },
  );
  function end() {
    tch = false;
    if (ps !== null || cur) {
      release(650, "cubic-bezier(.22,1,.36,1)");
    }
    ps = null;
  }
  a.addEventListener("touchend", end);
  a.addEventListener("touchcancel", end);
  function bounce(v) {
    var now = Date.now();
    if (now - cd < 800) return;
    cd = now;
    var amp = Math.min(34, Math.abs(v) * 12 + 6);
    var dir = v > 0 ? -1 : 1;
    var ks = kids();
    ks.forEach(function (k) {
      k.style.transition = "transform .22s cubic-bezier(.2,.7,.3,1)";
      k.style.transform = "translate3d(0," + dir * amp + "px,0)";
    });
    setTimeout(function () {
      kids().forEach(function (k) {
        k.style.transition = "transform .7s cubic-bezier(.22,1,.36,1)";
        k.style.transform = "";
      });
      setTimeout(function () {
        kids().forEach(function (k) {
          k.style.transition = "";
        });
      }, 760);
    }, 220);
  }
  a.addEventListener(
    "scroll",
    function () {
      var t = Date.now(),
        y = a.scrollTop;
      hist.push([t, y]);
      while (hist.length > 1 && t - hist[0][0] > 90) hist.shift();
      if (tch) return;
      var h0 = hist[0],
        dt = t - h0[0];
      if (dt < 8) return;
      var v = (y - h0[1]) / dt;
      var max = a.scrollHeight - a.clientHeight;
      if (y >= max - 1 && v > 1.2) bounce(v);
      else if (y <= 0 && v < -1.2) bounce(v);
    },
    { passive: true },
  );
})();
