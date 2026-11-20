/**
 * Start once, after all dependencies: snapshot Product, restore progress, apply the saved track and initialize account sync.
 * Classic browser script; dependency order is declared in index.html.
 */

snapshotProductTrack();

render();

initStore().then(function () {
  var rs = false;
  Object.keys(STATES).forEach(function (k) {
    if (STATES[k].rt !== RESET_TAG) {
      STATES[k] = defaultState();
      STATES[k].rt = RESET_TAG;
      rs = true;
    }
  });
  if (TK) {
    S = STATES[TK];
    applyTrack(TK);
  } else {
    S = defaultState();
    S.rt = RESET_TAG;
  }
  if (rs) save();
  ui.loaded = true;
  if (TK && (!S.onb || !S.onb2)) ui.onb = { i: 0 };
  render();
  initCloud();
});

setTimeout(function () {
  var e = document.getElementById("splash");
  if (!e) return;
  e.classList.add("out");
  setTimeout(function () {
    e.remove();
  }, 500);
}, 2100);

initOffline();
