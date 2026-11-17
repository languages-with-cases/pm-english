/* Run against a local static server: node tests/practice-browser.cjs */
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const base = process.env.PRACTICE_URL || "http://127.0.0.1:8000";
(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox"],
  });
  try {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      reducedMotion: "reduce",
    });
    // App code is real; block unrelated remote fonts/auth SDK in this offline test.
    await context.route("**/*", (route) =>
      route.request().url().startsWith(base) ? route.continue() : route.abort(),
    );
    const page = await context.newPage(),
      errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(base);
    await page.evaluate(() => {
      const st = {};
      for (const track of ["product", "dev", "pm", "an", "ba"])
        st[track] = {
          xp: 120,
          done: ["b01:0"],
          pts: { "b01:0": 10 },
          seen: ["scope"],
          onb: true,
          onb2: true,
          rt: "reset-2026-10-25",
        };
      localStorage.setItem("pm-english-tracks-v2", JSON.stringify({ v: 2, cur: "product", st }));
    });
    await page.reload();
    await page.waitForFunction(() => ui.loaded && TK === "product");
    await page.locator("#splash").waitFor({ state: "detached" });
    await page.addStyleTag({
      content: "*,*::before,*::after{animation:none!important;transition:none!important}",
    });
    const tasks = await page.evaluate(() => PRACTICE_DATA);
    const click = async (action, id = "") =>
      page.locator(`[data-pr-action="${action}"][data-pr-id="${id}"]`).first().click();
    const press = async (action, id = "", key = "Enter") => {
      const el = page.locator(`[data-pr-action="${action}"][data-pr-id="${id}"]`).first();
      await el.focus();
      await page.keyboard.press(key);
    };
    async function home() {
      if (await page.locator('[data-pr-action="list"]').count()) await click("list");
      if (await page.locator('[data-pr-action="home"]').count()) await click("home");
    }
    async function switchTrack(track) {
      await home();
      if ((await page.evaluate(() => CUR_TRACK)) !== track) {
        await page.getByRole("button", { name: "Change track", exact: true }).click();
        const name = await page.evaluate((id) => trackMeta(id).name, track);
        const card = page
          .locator(".tcard")
          .filter({ has: page.getByRole("heading", { name, exact: true }) });
        if ((await card.locator(".thead").getAttribute("aria-expanded")) !== "true")
          await card.locator(".thead").click();
        await card.locator(".cta").click();
      }
      await page.getByRole("button", { name: /Additional practice/ }).click();
      assert.equal(await page.locator(".pr-task").count(), 3);
    }
    function firstWrong(s) {
      return s.options.find((o) => !s.key.includes(o.id)).id;
    }
    async function fill(s, wrong, edit) {
      if (s.kind === "select") {
        if (edit) {
          const id = firstWrong(s);
          await click("select", id);
          await click("select", id);
        }
        const ids = s.key.slice();
        if (wrong) ids[0] = firstWrong(s);
        for (const id of ids) await click("select", id);
      } else if (s.kind === "order") {
        if (edit) {
          await click("add", s.keys[0][0]);
          await click("remove", s.keys[0][0]);
        }
        let ids = s.keys[0].slice();
        if (wrong) [ids[0], ids[1]] = [ids[1], ids[0]];
        for (const id of ids) await click("add", id);
      } else {
        if (edit) {
          const l = s.left[0].id;
          await click("left", l);
          await click("right", s.right.find((o) => o.id !== s.key[l]).id);
          await click("left", l);
          await click("right", s.key[l]);
        }
        for (const [i, item] of s.left.entries()) {
          await click("left", item.id);
          await click(
            "right",
            wrong && i === 0 ? s.right.find((o) => o.id !== s.key[item.id]).id : s.key[item.id],
          );
        }
      }
    }
    let stepChecks = 0;
    for (const task of tasks) {
      await switchTrack(task.track);
      const before = await page.evaluate(() => ({
        xp: S.xp,
        done: S.done,
        pts: S.pts,
        pass: S.pass,
        grades: PLAN.map((_, g) => gradeScore(g)),
      }));
      for (const wrong of [true, false]) {
        await click("start", task.id);
        assert.equal(await page.locator(".practice input, .practice textarea").count(), 0);
        const attemptOrder = await page.evaluate(() =>
          ui.practice.steps.map((s) => [s.order, s.rightOrder]),
        );
        for (const [i, s] of task.steps.entries()) {
          await click("check");
          assert.match(await page.locator("#pr-error").innerText(), /Ответ пока не проверен/);
          assert.equal(
            await page.evaluate(() => ui.practice.steps[ui.practice.index].checked),
            false,
          );
          await fill(s, wrong && i === 0, true);
          assert.deepEqual(
            await page.evaluate(() => ui.practice.steps.map((s) => [s.order, s.rightOrder])),
            attemptOrder,
          );
          await click("check");
          assert.match(
            await page.locator("#pr-feedback").innerText(),
            wrong && i === 0 ? /Not quite/ : /Correct/,
          );
          if (s.response) assert.ok(await page.locator("blockquote").innerText());
          await click("next");
          stepChecks++;
        }
        assert.match(
          await page.locator("#pr-result").innerText(),
          wrong ? /Keep practising/ : /Completed/,
        );
        assert.equal(
          await page.evaluate((id) => (S.practiceDone || []).includes(id), task.id),
          !wrong,
        );
        await page.waitForFunction(() => !saving);
        if (!wrong) {
          const after = await page.evaluate(() => ({
            xp: S.xp,
            done: S.done,
            pts: S.pts,
            pass: S.pass,
            grades: PLAN.map((_, g) => gradeScore(g)),
          }));
          assert.deepEqual(after, before, "Practice must not change chapter progression");
          await click("retry");
          assert.equal(await page.evaluate(() => ui.practice.steps[0].checked), false);
          assert.equal(await page.evaluate(() => ui.practice.index), 0);
          assert.equal(
            await page.evaluate(
              (id) => (S.practiceDone || []).filter((x) => x === id).length,
              task.id,
            ),
            1,
          );
        }
        await click("list");
      }
      console.log(
        "PASS",
        task.id,
        "correct/wrong, incomplete, edits, retry, fixed order, isolated progress",
      );
    }
    console.log("Checking reload and state migration");
    // All completions survive local reload and remain scoped to their track.
    await page.reload();
    await page.waitForFunction(() => ui.loaded);
    await page.locator("#splash").waitFor({ state: "detached" });
    const packed = await page.evaluate(() => packAll());
    for (const track of ["product", "dev", "pm", "an", "ba"]) {
      assert.equal(packed.st[track].practiceDone.length, 3);
      assert.equal(packed.st[track].xp, 120);
      assert.deepEqual(packed.st[track].done, ["b01:0"]);
    }
    // Legacy states have no new field and still preserve old chapter data.
    const legacy = await page.evaluate(() => {
      const s = merge({ xp: 75, done: ["b03:0"], pts: { "b03:0": 6 }, onb: true });
      return { xp: s.xp, done: s.done, practiceDone: s.practiceDone, pts: s.pts };
    });
    assert.deepEqual(legacy, { xp: 75, done: ["b03:0"], practiceDone: [], pts: { "b03:0": 6 } });
    const merged = await page.evaluate(() => {
      const a = defaultState(),
        b = defaultState();
      a.xp = 100;
      b.xp = 200;
      a.practiceDone = ["product-funnel-v1"];
      b.practiceDone = ["product-priority-v1"];
      const r = better(a, b);
      return { xp: r.xp, done: r.practiceDone };
    });
    assert.deepEqual(merged, { xp: 200, done: ["product-funnel-v1", "product-priority-v1"] });
    console.log("Checking keyboard controls");
    // Keyboard-only interaction and focus retention for all mechanics.
    await switchTrack("dev");
    await press("start", "dev-review-v1");
    await page.keyboard.press("Tab");
    assert.equal(
      await page.evaluate(() => document.activeElement.classList.contains("pr-code")),
      true,
    );
    await page.keyboard.press("Tab");
    assert.equal(
      await page.evaluate(() => document.activeElement.getAttribute("data-pr-action")),
      "select",
    );
    await press("select", "4", "Space");
    await press("check");
    assert.match(await page.locator("#pr-feedback").innerText(), /Correct/);
    assert.equal(await page.evaluate(() => document.activeElement.id), "pr-feedback");
    await press("next");
    await press("select", "boundary");
    await press("check");
    await press("next");
    await press("list");
    await press("start", "dev-incident-v1");
    await press("add", "deploy");
    await press("remove", "deploy");
    for (const id of ["deploy", "alert", "rollback", "recovery"]) await press("add", id);
    await press("check");
    assert.match(await page.locator("#pr-feedback").innerText(), /Correct/);
    await press("list");
    await press("start", "dev-bug-v1");
    for (const [left, right] of [
      ["step1", "steps"],
      ["step2", "steps"],
      ["expected", "expected"],
      ["actual", "actual"],
    ]) {
      await press("left", left);
      await press("right", right);
    }
    await press("check");
    assert.match(await page.locator("#pr-feedback").innerText(), /Correct/);
    await press("list");
    console.log("Checking legacy case flow");
    // Old cases still launch and old option interaction still checks an answer.
    await click("home");
    await page.locator(".ctarow .cta2").click();
    for (let i = 0; i < 8; i++) {
      const view = await page.evaluate(() => ui.view);
      if (view === "case") break;
      if (view === "prep") {
        await page.locator(".prskip").click();
        continue;
      }
      const cta = page.locator("#app .cta:not([disabled])").first();
      await cta.click();
    }
    assert.equal(await page.evaluate(() => ui.view), "case");
    await page.locator('[onclick="openMsg()"]').click();
    await page.waitForFunction(() => ui.cur.stage === "opts");
    await page.locator(".opt").first().click();
    assert.notEqual(await page.evaluate(() => ui.cur.chosen), null);
    console.log("Checking mobile layouts");
    // Representative narrow-screen artifacts and controls, including the long matching criteria.
    await page.evaluate(() => go("home"));
    await page.setViewportSize({ width: 375, height: 812 });
    for (const id of [
      "pm-gantt-v1",
      "dev-review-v1",
      "dev-bug-v1",
      "an-sql-v1",
      "an-charts-v1",
      "ba-acceptance-v1",
    ]) {
      const task = tasks.find((t) => t.id === id);
      await switchTrack(task.track);
      await click("start", id);
      const width = await page.evaluate(() => ({
        body: document.documentElement.scrollWidth,
        viewport: innerWidth,
        app: document.getElementById("app").clientWidth,
        scroll: document.getElementById("app").scrollWidth,
      }));
      assert.ok(width.body <= width.viewport, JSON.stringify({ id, width }));
      assert.ok(width.scroll <= width.app + 1, JSON.stringify({ id, width }));
      if (task.steps[0].kind === "match") {
        await fill(task.steps[0], false, true);
        await click("check");
        assert.match(await page.locator("#pr-feedback").innerText(), /Correct/);
      }
      fs.mkdirSync("/tmp/pm-english-qa", { recursive: true });
      await page.screenshot({ path: "/tmp/pm-english-qa/" + id + ".png", fullPage: true });
      await click("list");
    }
    // A touch-enabled mobile context exercises repeated matching targets with real taps.
    const touchContext = await browser.newContext({
      storageState: await context.storageState(),
      viewport: { width: 375, height: 812 },
      isMobile: true,
      hasTouch: true,
    });
    await touchContext.route("**/*", (r) =>
      r.request().url().startsWith(base) ? r.continue() : r.abort(),
    );
    const mobile = await touchContext.newPage();
    mobile.on("pageerror", (e) => errors.push(e.message));
    await mobile.goto(base);
    await mobile.waitForFunction(() => ui.loaded);
    await mobile.locator("#splash").waitFor({ state: "detached" });
    await mobile.evaluate(() => selectTrack("dev"));
    await mobile.getByRole("button", { name: /Additional practice/ }).tap();
    await mobile.locator('[data-pr-action="start"][data-pr-id="dev-bug-v1"]').tap();
    assert.equal(await mobile.locator(".pr-mock-input").count(), 3);
    assert.equal(await mobile.locator(".pr-validation").count(), 2);
    await mobile.screenshot({ path: "/tmp/pm-english-qa/touch-bug-report.png", fullPage: true });
    for (const [left, right] of [
      ["step1", "steps"],
      ["step2", "steps"],
      ["expected", "expected"],
      ["actual", "actual"],
    ]) {
      await mobile.locator(`[data-pr-action="left"][data-pr-id="${left}"]`).tap();
      await mobile.locator(`[data-pr-action="right"][data-pr-id="${right}"]`).tap();
    }
    await mobile.locator('[data-pr-action="check"]').tap();
    assert.match(await mobile.locator("#pr-feedback").innerText(), /Correct/);
    await mobile.locator('[data-pr-action="next"]').tap();
    assert.match(await mobile.locator("#pr-result").innerText(), /Completed/);
    await touchContext.close();
    console.log(
      "PASS: touch-enabled 375px context, static UI screens, repeated category taps and result.",
    );
    assert.deepEqual(errors, [], "No uncaught browser exceptions");
    console.log(
      `PASS: ${stepChecks} browser step checks; 15 correct + 15 wrong attempts; keyboard select/order/match; reload, track switching, legacy states, cloud merge, old cases; six mobile layouts.`,
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
