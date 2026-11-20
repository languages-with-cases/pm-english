/* Complete versioned app snapshots. Updates wait until previous tabs close. */
importScripts("./offline-assets.js");
var OFFLINE_PREFIX = "pm-english-offline-";
var OFFLINE_CACHE = OFFLINE_PREFIX + OFFLINE_BUILD.revision;
var OFFLINE_BASE = new URL("./", self.location.href);
self.addEventListener("install", function (event) {
  event.waitUntil(
    (async function () {
      var cache = await caches.open(OFFLINE_CACHE);
      // Validate every byte before publishing a snapshot. A failed install never replaces the active worker.
      for (var asset of OFFLINE_BUILD.assets) {
        var url = new URL(asset.url, OFFLINE_BASE).href;
        var response = await fetch(url, { cache: "reload" });
        if (!response.ok) throw Error("Offline download failed: " + asset.url);
        var digest = await crypto.subtle.digest("SHA-256", await response.clone().arrayBuffer());
        var actual = Array.from(new Uint8Array(digest))
          .map(function (x) {
            return x.toString(16).padStart(2, "0");
          })
          .join("");
        if (actual !== asset.sha) throw Error("Offline version mismatch: " + asset.url);
        await cache.put(url, response);
      }
    })(),
  );
});
self.addEventListener("activate", function (event) {
  event.waitUntil(
    (async function () {
      for (var name of await caches.keys()) {
        if (name.startsWith(OFFLINE_PREFIX) && name !== OFFLINE_CACHE) await caches.delete(name);
      }
      await self.clients.claim();
    })(),
  );
});
self.addEventListener("fetch", function (event) {
  var request = event.request,
    url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== OFFLINE_BASE.origin) return;
  var shell =
    request.mode === "navigate" &&
    (url.pathname === OFFLINE_BASE.pathname ||
      url.pathname === new URL("index.html", OFFLINE_BASE).pathname);
  var known = OFFLINE_BUILD.assets.some(function (asset) {
    return new URL(asset.url, OFFLINE_BASE).href === url.href;
  });
  if (!shell && !known) return; // Never cache Firebase, account data or unrelated requests.
  event.respondWith(
    (async function () {
      var cache = await caches.open(OFFLINE_CACHE);
      return (
        (await cache.match(shell ? new URL("index.html", OFFLINE_BASE).href : request)) ||
        fetch(request)
      );
    })(),
  );
});
