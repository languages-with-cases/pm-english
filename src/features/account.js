/**
 * Firebase Auth UI, login/logout, account ownership boundaries and initial Firestore reconciliation.
 * Classic browser script; dependency order is declared in index.html.
 */
var OWNER_KEY = KEY + "-owner";

var cloud = {
  on: !!CLOUD_CONFIG.apiKey,
  loaded: false,
  ready: false,
  user: null,
  busy: false,
  msg: "",
};

function better(a, b) {
  var winner;
  if ((b.xp || 0) !== (a.xp || 0)) winner = (b.xp || 0) > (a.xp || 0) ? b : a;
  else winner = (b.done || []).length > (a.done || []).length ? b : a;
  // Practice is monotonic and independent of XP: keep completions from both devices.
  return Object.assign({}, winner, {
    practiceDone: practiceMergeDone(a.practiceDone, b.practiceDone),
  });
}

async function onCloudUser(user) {
  cloud.user = user;
  cloud.msg = "";
  if (user) {
    try {
      var snap = await cloud.fs.getDoc(cloud.fs.doc(cloud.db, "users", user.uid));
      var remote = null;
      if (snap.exists()) {
        remote = remoteAll(snap.data());
      }
      var owner = null;
      try {
        owner = localStorage.getItem(OWNER_KEY);
      } catch (e) {}
      var local = JSON.parse(JSON.stringify(packAll()));
      var all;
      if (!owner || owner === user.uid) all = remote ? mergeAlls(local, remote) : local;
      else all = remote || { v: 2, cur: null, st: {} };
      var keepOnb = S && { onb: S.onb, onb2: S.onb2 };
      loadAll(all);
      Object.keys(STATES).forEach(function (k) {
        if (!STATES[k].rt) STATES[k].rt = RESET_TAG;
      });
      if (TK) {
        applyTrack(TK);
      } else {
        S = newState();
        if (keepOnb) {
          S.onb = keepOnb.onb;
          S.onb2 = keepOnb.onb2;
        }
      }
      try {
        localStorage.setItem(OWNER_KEY, user.uid);
      } catch (e) {}
      cloud.ready = true;
      store.status = "ok";
      await flush();
    } catch (e) {
      cloud.ready = false;
      store.status = "error";
      cloud.msg = "Could not load your progress. Check your connection and try again.";
    }
  } else {
    cloud.ready = false;
  }
  if (ui.view === "home" || ui.view === "progress") render();
}

async function initCloud() {
  if (!cloud.on || store.kind === "claude") return;
  try {
    var m = await Promise.all([
      import(CLOUD_SDK + "firebase-app.js"),
      import(CLOUD_SDK + "firebase-auth.js"),
      import(CLOUD_SDK + "firebase-firestore.js"),
    ]);
    var fb = m[0].initializeApp(CLOUD_CONFIG);
    cloud.au = m[1];
    cloud.fs = m[2];
    cloud.auth = m[1].getAuth(fb);
    cloud.db = m[2].getFirestore(fb);
    cloud.loaded = true;
    cloud.au.onAuthStateChanged(cloud.auth, onCloudUser);
  } catch (e) {
    cloud.on = false;
    if (ui.view === "progress") render();
  }
}

var GOOGLE_SVG =
  '<svg viewBox="0 0 48 48" width="20" height="20"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.9 2.4 30.4 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.6z"/><path fill="#FBBC05" d="M10.5 28.7c-.5-1.4-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/></svg>';

function accErrText(e) {
  var m = {
    "auth/invalid-email": "That email address is not valid.",
    "auth/missing-password": "Enter your password.",
    "auth/missing-email": "Enter your email.",
    "auth/weak-password": "Use a password of at least 6 characters.",
    "auth/email-already-in-use": "This email is already registered. Tap Sign in.",
    "auth/invalid-credential": "Wrong email or password.",
    "auth/wrong-password": "Wrong email or password.",
    "auth/user-not-found": "Wrong email or password.",
    "auth/popup-closed-by-user": "The sign-in window was closed.",
    "auth/cancelled-popup-request": "The sign-in window was closed.",
    "auth/popup-blocked": "Your browser blocked the sign-in window. Allow pop-ups and try again.",
    "auth/network-request-failed": "No internet connection.",
    "auth/too-many-requests": "Too many attempts. Try again later.",
    "auth/unauthorized-domain":
      "This site address is not allowed in Firebase (Authorized domains).",
  };
  return m[e && e.code] || "Could not sign in. Try again.";
}

function accountHTML() {
  if (!cloud.on || store.kind === "claude") return "";
  var h = '<div class="sec">Account</div><div class="acc">';
  if (!cloud.loaded) return h + "<p>Loading...</p></div>";
  if (cloud.user) {
    h +=
      '<b>Signed in</b><p class="who">' +
      esc(cloud.user.email || cloud.user.displayName || "Account") +
      "</p>" +
      "<p>" +
      (cloud.ready ? "Your progress is saved to your account and syncs across devices." : "") +
      "</p>" +
      (cloud.msg ? '<div class="accerr">' + esc(cloud.msg) + "</div>" : "") +
      '<button class="accb ghost" onclick="cloudOut()">Sign out</button></div>';
    return h;
  }
  h +=
    "<b>Save your progress</b><p>Sign in to keep your progress and use it on any device.</p>" +
    '<button class="accb g" onclick="cloudGoogle()">' +
    GOOGLE_SVG +
    "<span>Continue with Google</span></button>" +
    '<div class="accor">or with email</div>' +
    '<input id="accE" type="email" inputmode="email" autocomplete="email" placeholder="Email">' +
    '<input id="accP" type="password" autocomplete="current-password" placeholder="Password (6+ characters)">' +
    '<div class="accrow"><button class="accb" onclick="cloudEmail(false)">Sign in</button><button class="accb ghost" onclick="cloudEmail(true)">Create account</button></div>' +
    '<button class="acclnk" onclick="cloudForgot()">Forgot password?</button><div class="accerr" id="accErr"></div></div>';
  return h;
}

function homeSignIn() {
  if (!cloud.on || !cloud.loaded || cloud.user || store.kind === "claude") return "";
  return (
    '<button class="accb g homeg" onclick="cloudGoogle()">' +
    GOOGLE_SVG +
    '<span>Sign in with Google</span></button><div class="accerr" id="accErr"></div>'
  );
}

function accMsg(t, ok) {
  var el = document.getElementById("accErr");
  if (!el) return;
  el.textContent = t || "";
  el.className = "accerr" + (ok ? " ok" : "");
}

async function accRun(fn) {
  if (cloud.busy) return;
  cloud.busy = true;
  accMsg("");
  try {
    await fn();
  } catch (e) {
    accMsg(accErrText(e));
  }
  cloud.busy = false;
}

function cloudGoogle() {
  return accRun(function () {
    return cloud.au.signInWithPopup(cloud.auth, new cloud.au.GoogleAuthProvider());
  });
}

function accVals() {
  return [
    (document.getElementById("accE") || { value: "" }).value.trim(),
    (document.getElementById("accP") || { value: "" }).value,
  ];
}

function cloudEmail(create) {
  return accRun(function () {
    var v = accVals();
    return create
      ? cloud.au.createUserWithEmailAndPassword(cloud.auth, v[0], v[1])
      : cloud.au.signInWithEmailAndPassword(cloud.auth, v[0], v[1]);
  });
}

function cloudForgot() {
  return accRun(async function () {
    var v = accVals();
    if (!v[0]) {
      accMsg("Enter your email first, we will send a reset link.");
      return;
    }
    await cloud.au.sendPasswordResetEmail(cloud.auth, v[0]);
    accMsg("Reset link sent. Check your email.", true);
  });
}

async function cloudOut() {
  try {
    await cloud.au.signOut(cloud.auth);
  } catch (e) {}
  cloud.user = null;
  cloud.ready = false;
  cloud.msg = "";
  var ob = S.onb,
    ob2 = S.onb2;
  STATES = {};
  TK = null;
  S = defaultState();
  S.onb = ob;
  S.onb2 = ob2;
  S.rt = RESET_TAG;
  try {
    localStorage.removeItem(KEY);
    localStorage.removeItem(KEY2);
    localStorage.removeItem(OWNER_KEY);
  } catch (e) {}
  ui.view = "tracks";
  render();
}
