// Real service-worker lifecycle at the GitHub Pages subpath; no external services.
const { chromium } = require("playwright");
const assert = require("node:assert/strict"),
  fs = require("node:fs"),
  http = require("node:http"),
  path = require("node:path");
const root = process.cwd();
let upgrade = false,
  corruptOfflineDownload = false;
const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://local");
  if (!url.pathname.startsWith("/pm-english/")) {
    res.writeHead(404).end();
    return;
  }
  let name = decodeURIComponent(url.pathname.slice("/pm-english/".length)) || "index.html";
  const file = path.resolve(root, name);
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    res.writeHead(404).end();
    return;
  }
  const type =
    {
      ".js": "application/javascript",
      ".html": "text/html",
      ".css": "text/css",
      ".svg": "image/svg+xml",
      ".webmanifest": "application/manifest+json",
    }[path.extname(file)] || "application/octet-stream";
  let body = fs.readFileSync(file);
  if (corruptOfflineDownload && name === "assets/images/star.png")
    body = Buffer.from("incorrect CDN bytes");
  if (upgrade && name === "service-worker.js") body = Buffer.from(body + "\n// upgrade fixture\n");
  if (upgrade && name === "offline-assets.js")
    body = Buffer.from(body.toString().replace(/"revision": "[^"]+"/, '"revision": "upgrade"'));
  res.writeHead(200, { "Content-Type": type, "Cache-Control": "no-store" });
  res.end(body);
});
(async () => {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const base = `http://127.0.0.1:${server.address().port}/pm-english/`;
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    args: ["--no-sandbox"],
    headless: true,
  });
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    await context.route("**/*", (route) =>
      route.request().url().startsWith(base) ? route.continue() : route.abort(),
    );
    let page = await context.newPage();
    const errors = [];
    context.on("page", (p) => p.on("pageerror", (e) => errors.push(e.message)));
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(base);
    await page.waitForFunction(() => ui.loaded && offlineState.ready, { timeout: 60000 });
    await page.evaluate(async () => {
      for (const id of ["product", "pm", "ba", "dev", "an"]) {
        selectTrack(id);
        S.onb = true;
        S.onb2 = true;
        S.xp = 123;
        ui.onb = null;
        await flush();
      }
    });
    await context.setOffline(true);
    await page.reload();
    await page.waitForFunction(() => ui.loaded && TK === "an");
    for (const track of ["product", "pm", "ba", "dev", "an"]) {
      await page.evaluate(async (id) => {
        selectTrack(id);
        ui.onb = null;
        go("progress");
        if (S.xp !== 123) throw Error("Legacy progress lost");
        practiceStart(practiceTasks(id)[0].id);
      }, track);
      // Complete an authored exercise entirely through actual button clicks.
      while (await page.evaluate(() => !ui.practice.finished)) {
        const step = await page.evaluate(() => ui.practice.task.steps[ui.practice.index]);
        const click = async (action, id) =>
          page
            .locator(`[data-pr-action="${action}"]${id ? `[data-pr-id="${id}"]` : ""}`)
            .first()
            .click();
        if (step.kind === "select") for (const id of step.key) await click("select", id);
        else if (step.kind === "order") for (const id of step.keys[0]) await click("add", id);
        else
          for (const item of step.left) {
            await click("left", item.id);
            await click("right", step.key[item.id]);
          }
        await click("check");
        await click("next");
      }
      await page.waitForFunction(() => !saving);
    }
    const saved = await page.evaluate(() => JSON.stringify(packAll()));
    await page.reload();
    await page.waitForFunction(() => ui.loaded && TK === "an");
    assert.equal(
      await page.evaluate(() => JSON.stringify(packAll())),
      saved,
      "all five offline completions survive reload",
    );
    await page.evaluate(() => go("progress"));
    assert.match(await page.locator('[role="status"]').innerText(), /Вы без интернета/);
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      true,
    );
    await context.setOffline(false);
    upgrade = true;
    await page.evaluate(async () => (await navigator.serviceWorker.getRegistration()).update());
    await page.waitForFunction(
      async () => !!(await navigator.serviceWorker.getRegistration()).waiting,
    );
    assert.equal(
      await page.evaluate(
        async () => (await caches.keys()).filter((n) => n.startsWith("pm-english-offline-")).length,
      ),
      2,
      "old and new snapshots coexist while old tab is open",
    );
    const updatedWorker =
      context
        .serviceWorkers()
        .find(
          (asyncWorker) =>
            asyncWorker.url().endsWith("service-worker.js") &&
            asyncWorker !== context.serviceWorkers()[0],
        ) || context.serviceWorkers().at(-1);
    await context.setOffline(true);
    await page.close();
    // Give the waiting worker the no-clients activation boundary before opening another window.
    let activated = false;
    for (let i = 0; i < 100; i++) {
      try {
        activated = await updatedWorker.evaluate(async () => {
          const keys = (await caches.keys()).filter((n) => n.startsWith("pm-english-offline-"));
          return keys.length === 1 && keys[0] === "pm-english-offline-upgrade";
        });
      } catch (_) {}
      if (activated) break;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    assert.ok(activated, "new snapshot activates after the last old client closes");
    page = await context.newPage();
    await page.goto(base);
    await page.waitForFunction(() => ui.loaded);
    await page.waitForFunction(
      async () =>
        (await caches.keys()).filter((n) => n.startsWith("pm-english-offline-")).length === 1,
    );
    assert.deepEqual(
      await page.evaluate(async () =>
        (await caches.keys()).filter((n) => n.startsWith("pm-english-offline-")),
      ),
      ["pm-english-offline-upgrade"],
    );
    assert.equal(
      await page.evaluate(() => JSON.stringify(packAll())),
      saved,
      "worker update preserves all saved progress",
    );
    assert.deepEqual(errors, []);
    await context.close();
    upgrade = false;
    corruptOfflineDownload = true;
    const recovery = await browser.newContext();
    await recovery.route("**/*", (route) =>
      route.request().url().startsWith(base) ? route.continue() : route.abort(),
    );
    const recoveryPage = await recovery.newPage();
    await recoveryPage.goto(base);
    await recoveryPage.waitForFunction(() => offlineState.failed);
    assert.equal(
      await recoveryPage.evaluate(() => offlineState.ready),
      false,
      "a corrupt snapshot must not report offline availability",
    );
    assert.equal(
      await recoveryPage.evaluate(
        async () => !!(await navigator.serviceWorker.getRegistration())?.active,
      ),
      false,
    );
    corruptOfflineDownload = false;
    await recoveryPage.reload();
    await recoveryPage.waitForFunction(() => offlineState.ready);
    await recovery.setOffline(true);
    await recoveryPage.reload();
    await recoveryPage.waitForFunction(() => ui.loaded);
    await recovery.close();
    console.log(
      "PASS: Pages subpath; first download; cold offline reload; all five tracks/practice completion/local persistence; mobile; staged update/old-cache cleanup; failed-checksum rejection/recovery; no page errors.",
    );
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
  server.close();
});
