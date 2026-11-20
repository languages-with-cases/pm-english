const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const { execFileSync } = require("node:child_process");
test("offline snapshot includes every shipped asset and is current", () => {
  execFileSync(process.execPath, ["scripts/build-offline.cjs", "--check"]);
});
function storageHarness() {
  const saved = new Map(),
    requests = [],
    online = {};
  let snapshot = { st: { product: { xp: 1 } } };
  const c = {
    JSON,
    Date,
    navigator: { onLine: true },
    window: { addEventListener: (key, fn) => (online[key] = fn) },
    localStorage: { setItem: (k, v) => saved.set(k, v) },
    KEY2: "progress",
    store: { kind: "local" },
    ui: { view: "practice" },
    packAll: () => snapshot,
    cloud: {
      user: { uid: "one" },
      ready: true,
      db: {},
      fs: {
        doc: (_, collection, uid) => uid,
        setDoc: (uid, data) =>
          new Promise((resolve, reject) => requests.push({ uid, data, resolve, reject })),
      },
    },
  };
  vm.createContext(c);
  vm.runInContext(fs.readFileSync("src/core/storage.js", "utf8"), c);
  return { c, saved, requests, online, set: (xp) => (snapshot = { st: { product: { xp } } }) };
}
const tick = () => new Promise((resolve) => setImmediate(resolve));
test("pending cloud writes never block repeated local saves; reconnect sends latest snapshot", async () => {
  const h = storageHarness();
  await h.c.flush(); // The server acknowledgement intentionally never arrives yet.
  h.c.navigator.onLine = false;
  for (const xp of [2, 3, 4]) {
    h.set(xp);
    await h.c.flush();
  }
  assert.equal(JSON.parse(h.saved.get("progress")).st.product.xp, 4);
  assert.equal(h.c.saving, false);
  assert.equal(h.requests.length, 1);
  h.c.navigator.onLine = true;
  h.requests[0].resolve();
  await tick();
  assert.equal(h.requests.length, 2);
  assert.equal(JSON.parse(h.requests[1].data.all).st.product.xp, 4);
  h.requests[1].resolve();
  await tick();
  assert.equal(h.c.cloudPending, null);
});
test("cloud errors preserve local progress, retry on reconnect and respect account ownership", async () => {
  const h = storageHarness();
  await h.c.flush();
  h.requests[0].reject(Error("offline"));
  await tick();
  assert.equal(h.c.store.status, "ok");
  h.online.online();
  await tick();
  assert.equal(h.requests.length, 2);
  h.c.cloud.user = { uid: "two" };
  h.set(8);
  await h.c.flush();
  h.requests[1].resolve();
  await tick();
  assert.equal(h.requests[2].uid, "two");
  assert.equal(JSON.parse(h.requests[2].data.all).st.product.xp, 8);
  h.requests[2].resolve();
  await tick();
});
