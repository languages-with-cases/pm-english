const { chromium } = require("playwright");
const assert = require("node:assert/strict");
(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox"],
  });
  try {
    const base = process.env.CAREER_URL || "http://127.0.0.1:8000";
    const context = await browser.newContext({
      viewport: { width: 375, height: 812 },
      hasTouch: true,
      isMobile: true,
      reducedMotion: "reduce",
    });
    await context.route("**/*", (r) =>
      r.request().url().startsWith(base) ? r.continue() : r.abort(),
    );
    const page = await context.newPage(),
      errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(base);
    await page.waitForFunction(() => ui.loaded);
    await page.locator("#splash").waitFor({ state: "detached" });
    for (const [track, id] of [
      ["product", "b21"],
      ["dev", "b35"],
    ]) {
      await page.evaluate(
        ([track, id]) => {
          selectTrack(track);
          ui.onb = null;
          S = defaultState();
          S.onb = S.onb2 = true;
          S.rt = RESET_TAG;
          STATES[TK] = S;
          startCase(BYID[id], false, "rand", true);
          ui.cur.stage = "opts";
          render();
        },
        [track, id],
      );
      const pos = await page.evaluate(() =>
        ui.cur.order.findIndex((i) => ui.cur.c.steps[0].options[i].ok),
      );
      await page.locator(".opts .opt").nth(pos).tap();
      assert.equal(await page.evaluate(() => ui.cur.ok), true);
      await page.evaluate(() => lxStart(ui.cur));
      assert.ok(
        await page
          .getByText("Which message is accurate, clear and appropriate here?", { exact: true })
          .isVisible(),
      );
      const t = await page.evaluate(() =>
        ui.cur.x.tOrder.findIndex((i) => ui.cur.x.L.tone.opts[i].ok),
      );
      await page.locator(".lxopt").nth(t).tap();
      assert.equal(await page.evaluate(() => ui.cur.x.tGain), 5);
      await page.locator('[onclick="lxToBuild()"]').tap();
      const count = await page.evaluate(() => ui.cur.x.blocks.length);
      await page.locator("#lxb0").tap();
      await page.locator('[onclick="lxUnpick(0)"]').tap();
      for (let i = 0; i < count; i++) await page.locator("#lxb" + i).tap();
      await page.locator('[onclick="lxDone()"]').tap();
      assert.equal(await page.evaluate(() => ui.cur.x.result.ok), true);
      assert.ok((await page.locator(".spres.ok").innerText()).includes("Correct"));
    }
    assert.deepEqual(errors, []);
    console.log(
      "PASS touch: Product banking metric and Developer CI; case choice, professional wording, block removal/reinsert and complete sentence build.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
