/**
 * Shared escaping/randomization helpers and read-only case/vocabulary catalog operations.
 * Classic browser script; dependency order is declared in index.html.
 */
function esc(s) {
  return String(s).replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
  });
}

function lvlIdx(xp) {
  var i = 0;
  for (var k = 0; k < LEVELS.length; k++) {
    if (xp >= LEVELS[k].xp) i = k;
  }
  return i;
}

function stepDone(c, i) {
  return S.done.indexOf(c.id + ":" + i) > -1;
}

function caseDone(c) {
  for (var i = 0; i < c.steps.length; i++) {
    if (!stepDone(c, i)) return false;
  }
  return true;
}

function shuffle(n) {
  var a = [];
  for (var i = 0; i < n; i++) a.push(i);
  for (var j = n - 1; j > 0; j--) {
    var k = Math.floor(Math.random() * (j + 1));
    var t = a[j];
    a[j] = a[k];
    a[k] = t;
  }
  return a;
}

function pick(arr, n) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i];
    a[i] = a[j];
    a[j] = t;
  }
  return a.slice(0, n);
}

function slug(k) {
  return k.toLowerCase().replace(/[^a-z0-9]+/g, "_");
}

function allWords() {
  var m = {};
  CASES.forEach(function (c) {
    c.steps.forEach(function (s) {
      s.words.forEach(function (w) {
        var k = w.w.toLowerCase();
        if (!m[k]) m[k] = w;
      });
    });
  });
  ARTICLES.forEach(function (a) {
    a.words.forEach(function (w) {
      var k = w.w.toLowerCase();
      if (!m[k]) m[k] = w;
    });
  });
  return m;
}
