const { chromium } = require("playwright"),
  assert = require("node:assert/strict"),
  fs = require("node:fs");
const base = process.env.CAREER_URL || "http://127.0.0.1:8000/";
(async () => {
  const b = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  try {
    const p = await b.newPage({ viewport: { width: 375, height: 812 }, reducedMotion: "reduce" });
    await p.route("**/*", (r) => (r.request().url().startsWith(base) ? r.continue() : r.abort()));
    await p.goto(base);
    await p.waitForFunction(() => ui.loaded);
    await p.locator("#splash").waitFor({ state: "detached" });
    const click = (a, id = "") =>
      p.locator(`[data-pr-action="${a}"][data-pr-id="${id}"]`).first().click();
    async function start(track, id) {
      return p.evaluate(
        ({ track, id }) => {
          selectTrack(track);
          S.onb = S.onb2 = true;
          ui.onb = null;
          startCase(BYID[id], false, "camp", true);
          lxStart(ui.cur);
          ui.cur.x.tChosen = 0;
          lxToBuild();
          return ui.practice.task;
        },
        { track, id },
      );
    }
    async function solve(t) {
      for (const s of t.steps) {
        if (s.kind === "select") for (const id of s.key) await click("select", id);
        else
          for (const item of s.left) {
            await click("left", item.id);
            await click("right", s.key[item.id]);
          }
        await click("check");
        assert.match(await p.locator("#pr-feedback").innerText(), /Correct/);
        await click("next");
      }
      await click("lesson-finish");
      await p.waitForFunction(() => !saving);
    }
    // Same case IDs are used in both careers: neither the exercise nor completion may leak.
    const pm = await start("pm", "b32");
    assert.equal(pm.format, "gantt");
    await solve(pm);
    const product = await start("product", "b32");
    assert.equal(product.format, "ab");
    assert.equal(await p.evaluate((id) => S.practiceDone.includes(id), pm.id), false);
    await solve(product);
    await p.evaluate(() => selectTrack("pm"));
    assert.ok(await p.evaluate((id) => S.practiceDone.includes(id), pm.id));
    assert.equal(await p.evaluate((id) => S.practiceDone.includes(id), product.id), false);
    await p.waitForFunction(() => !saving);
    await p.reload();
    await p.waitForFunction(() => ui.loaded);
    assert.equal(await p.evaluate(() => CUR_TRACK), "pm");
    assert.ok(await p.evaluate((id) => S.practiceDone.includes(id), pm.id));
    fs.mkdirSync("/tmp/project-career-practice", { recursive: true });
    for (const format of ["gantt", "status", "scope"]) {
      const id = await p.evaluate(
        (format) =>
          CAREER_PRACTICE_DATA.filter((t) => t.track === "pm" && t.format === format).at(-1).caseId,
        format,
      );
      const t = await start("pm", id);
      assert.equal(await p.locator("input,textarea").count(), 0);
      assert.ok(await p.getByText("Task 3 of 3", { exact: true }).isVisible());
      const width = await p.evaluate(() => [
        document.documentElement.scrollWidth,
        innerWidth,
        document.getElementById("app").scrollWidth,
        document.getElementById("app").clientWidth,
      ]);
      assert.ok(width[0] <= width[1] && width[2] <= width[3] + 1);
      if (format === "gantt") {
        const a = t.artifacts.find((a) => a.kind === "gantt");
        assert.equal(a.endDay, 32);
        assert.equal(await p.locator(".pr-gantt").first().locator("span").count(), a.endDay);
        const region = p.locator(".pr-scroll").first();
        await region.focus();
        await p.keyboard.press("ArrowRight");
        await p.waitForFunction(() => document.querySelector(".pr-scroll").scrollLeft > 0);
        await region.evaluate((el) => (el.scrollLeft = 0));
        // Too many selected cards must not be graded; changing the selection must unblock checking.
        const extra = t.steps[0].options.find((o) => !t.steps[0].key.includes(o.id)).id;
        for (const id of [...t.steps[0].key, extra]) {
          await p.locator(`[data-pr-action="select"][data-pr-id="${id}"]`).focus();
          await p.keyboard.press("Enter");
        }
        await p.locator('[data-pr-action="check"]').focus();
        await p.keyboard.press("Space");
        assert.ok(await p.locator("#pr-error").isVisible());
        assert.equal(await p.evaluate(() => ui.practice.steps[0].checked), false);
        await click("select", extra);
        await click("check");
        assert.match(await p.locator("#pr-feedback").innerText(), /Correct/);
      }
      if (format === "status") {
        const id = t.steps[0].left.at(-1).id;
        await p.locator(`[data-pr-action="left"][data-pr-id="${id}"]`).scrollIntoViewIfNeeded();
        const targets = p.locator('[aria-label="Matching targets"]'),
          box = await targets.boundingBox();
        assert.ok(
          box.y >= 0 && box.y + box.height <= 812,
          "status categories stay in the phone viewport",
        );
      } else await p.locator(".pr-scroll,.pr-options").first().scrollIntoViewIfNeeded();
      await p.screenshot({ path: "/tmp/project-career-practice/advanced-" + format + ".png" });
    }
    // Legacy Additional Gantt keeps its original twelve-day June diagram.
    await p.evaluate(() => practiceStart("pm-gantt-v1"));
    assert.equal(await p.locator(".pr-gantt").first().locator("span").count(), 12);
    assert.match(await p.locator(".pr-gantt").first().getAttribute("aria-label"), /^June /);
    assert.equal(
      await p.evaluate(() => getComputedStyle(document.body).backgroundColor),
      "rgb(230, 243, 255)",
    );
    console.log(
      "PASS: Product/Project colliding-ID isolation and saved reload; advanced three-format phone layouts; 32-day chart and keyboard horizontal scroll; over-selection/edit/keyboard check; legacy June Gantt and blue background.",
    );
  } finally {
    await b.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
