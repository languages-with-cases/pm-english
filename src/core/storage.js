/**
 * Normalize old/new progress payloads and serialize local or host saves, with optional cloud persistence.
 * Classic browser script; dependency order is declared in index.html.
 */
async function initStore() {
  try {
    if (window.claude && typeof window.claude.use === "function") {
      var db = await window.claude.use("db");
      var user = await window.claude.use("user");
      if (db && user) {
        var id = await user.id();
        if (id) {
          store.ref = db.collection("data/users/" + id).doc("progress-v2");
          store.kind = "claude";
        }
      }
    }
  } catch (e) {
    store.kind = "none";
  }
  if (store.kind === "claude") {
    try {
      var snap = await store.ref.get();
      if (snap.exists) loadAll(snap.data());
      store.status = "ok";
      return;
    } catch (e) {
      store.kind = "none";
    }
  }
  try {
    var raw = localStorage.getItem(KEY2);
    if (!raw) raw = localStorage.getItem(KEY);
    if (raw) loadAll(JSON.parse(raw));
    localStorage.setItem(KEY + "-t", "1");
    localStorage.removeItem(KEY + "-t");
    store.kind = "local";
    store.status = "ok";
  } catch (e) {
    store.kind = "none";
    store.status = "none";
  }
}

function merge(d) {
  var b = defaultState();
  if (!d) return b;
  b.practiceDone = practiceMergeDone(d.practiceDone, []);
  b.xp = +d.xp || 0;
  ["done", "seen", "learned", "pend"].forEach(function (k) {
    b[k] = Array.isArray(d[k]) ? d[k].slice() : [];
  });
  b.retry = Array.isArray(d.retry)
    ? d.retry
        .filter(function (r) {
          return r && r.id;
        })
        .map(function (r) {
          return { id: r.id, due: +r.due || 0 };
        })
    : [];
  if (d.stats) {
    b.stats.a = +d.stats.a || 0;
    b.stats.c = +d.stats.c || 0;
    b.stats.t = d.stats.t || {};
  }
  b.cc = +d.cc || 0;
  b.rc = +d.rc || 0;
  b.wr = d.wr && typeof d.wr === "object" ? d.wr : {};
  b.streak = +d.streak || 0;
  b.best = +d.best || 0;
  b.last = typeof d.last === "string" ? d.last : "";
  if (d.day && typeof d.day === "object")
    b.day = { d: d.day.d || "", n: +d.day.n || 0, g: !!d.day.g };
  b.act = Array.isArray(d.act) ? d.act.slice() : [];
  b.goal = Array.isArray(d.goal) ? d.goal.slice() : [];
  b.art = d.art && typeof d.art === "object" ? d.art : {};
  b.skip = Array.isArray(d.skip)
    ? d.skip.filter(function (x) {
        return typeof x === "string";
      })
    : [];
  b.gseen = Array.isArray(d.gseen)
    ? d.gseen.filter(function (x) {
        return typeof x === "number";
      })
    : [];
  b.onb = d.onb === undefined ? b.xp > 0 || b.done.length > 0 : !!d.onb;
  b.onb2 = !!d.onb2;
  b.rt = typeof d.rt === "string" ? d.rt : "";
  b.stars = Array.isArray(d.stars)
    ? d.stars.filter(function (x) {
        return typeof x === "string";
      })
    : [];
  b.ev = {};
  if (d.ev && typeof d.ev === "object") {
    Object.keys(d.ev).forEach(function (k) {
      var e = d.ev[k];
      if (
        e &&
        typeof e === "object" &&
        Array.isArray(e.m) &&
        e.m.length === 3 &&
        e.m.every(function (x) {
          return typeof x === "number";
        })
      )
        b.ev[k] = { l: +e.l || 0, m: e.m.slice(), pts: +e.pts || 0, max: +e.max || 0 };
    });
  }
  b.lx = d.lx && typeof d.lx === "object" ? d.lx : {};
  b.rv = d.rv === undefined ? true : !!d.rv;
  b.rp = {};
  if (d.rp && typeof d.rp === "object")
    Object.keys(d.rp).forEach(function (k) {
      if (+k >= 0 && +k < 10 && typeof d.rp[k] === "number")
        b.rp[k] = Math.max(0, Math.min(3, d.rp[k]));
    });
  b.pts = {};
  if (d.pts && typeof d.pts === "object")
    Object.keys(d.pts).forEach(function (k) {
      if (typeof d.pts[k] === "number") b.pts[k] = d.pts[k];
    });
  b.pass = Array.isArray(d.pass)
    ? d.pass.filter(function (x) {
        return typeof x === "number";
      })
    : null;
  b.hist = Array.isArray(d.hist)
    ? d.hist
        .filter(Array.isArray)
        .map(function (a) {
          return a.filter(function (x) {
            return typeof x === "string";
          });
        })
        .slice(-5)
    : [];
  return b;
}

var saving = false,
  dirty = false;

// Cloud acknowledgements must never block subsequent local saves while offline.
var cloudPending = null,
  cloudWriting = false;
async function syncPendingCloud() {
  if (
    cloudWriting ||
    !cloudPending ||
    (typeof navigator !== "undefined" && navigator.onLine === false)
  )
    return;
  var pending = cloudPending;
  if (!cloud.user || !cloud.ready || cloud.user.uid !== pending.uid) {
    cloudPending = null;
    return;
  }
  cloudWriting = true;
  try {
    await cloud.fs.setDoc(cloud.fs.doc(cloud.db, "users", pending.uid), {
      data: JSON.stringify(pending.data.st.product || {}),
      all: JSON.stringify(pending.data),
      updated: Date.now(),
    });
    if (cloudPending === pending) cloudPending = null;
  } catch (error) {
    // Keep the latest local snapshot for the next save or reconnection.
    cloudWriting = false;
    return;
  }
  cloudWriting = false;
  if (cloudPending) syncPendingCloud();
}
if (typeof window !== "undefined" && window.addEventListener)
  window.addEventListener("online", syncPendingCloud);

async function persist() {
  var data = JSON.parse(JSON.stringify(packAll()));
  if (store.kind === "claude") {
    await store.ref.set(data);
  } else if (store.kind === "local") {
    localStorage.setItem(KEY2, JSON.stringify(data));
  }
  if (typeof cloud !== "undefined" && cloud.user && cloud.ready) {
    cloudPending = { uid: cloud.user.uid, data: data };
    syncPendingCloud();
  }
}

async function flush() {
  if (saving) {
    dirty = true;
    return;
  }
  saving = true;
  do {
    dirty = false;
    try {
      await persist();
      if (store.kind !== "none") store.status = "ok";
    } catch (e) {
      store.status = "error";
    }
  } while (dirty);
  saving = false;
  if (ui.view === "home" || ui.view === "progress") render();
}

function save() {
  flush();
}

function resetTap() {
  if (!ui.resetArmed) {
    ui.resetArmed = true;
    render();
    return;
  }
  var ob = S.onb,
    ob2 = S.onb2;
  S = defaultState();
  S.onb = ob;
  S.onb2 = ob2;
  S.rt = RESET_TAG;
  if (TK) STATES[TK] = S;
  ui.resetArmed = false;
  save();
  render();
}
