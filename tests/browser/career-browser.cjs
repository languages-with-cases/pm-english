const { chromium } = require("playwright");
const assert = require("node:assert/strict"),
  fs = require("node:fs");
const base = process.env.CAREER_URL || "http://127.0.0.1:8000";
(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox"],
  });
  try {
    const context = await browser.newContext({
      viewport: { width: 1200, height: 900 },
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
    await page.evaluate(() => {
      const st = {};
      for (const id of ["product", "dev", "pm", "an", "ba"])
        st[id] = {
          xp: 250,
          done: ["b01:0", "b03:0"],
          pts: { "b01:0": 10, "b03:0": 6 },
          seen: ["scope"],
          onb: true,
          onb2: true,
          gseen: [0],
          pass: [],
          rt: "reset-2026-10-25",
        };
      localStorage.setItem(KEY2, JSON.stringify({ v: 2, cur: "product", st }));
    });
    await page.reload();
    await page.waitForFunction(() => ui.loaded && TK === "product");
    await page.locator("#splash").waitFor({ state: "detached" });
    const legacy = await page.evaluate(() => JSON.parse(JSON.stringify(packAll())));
    const contracts = await page.evaluate(() =>
      Object.fromEntries(
        TRACKS.map((t) => {
          const d = dataFor(t.id);
          return [
            t.id,
            {
              ids: d.CASES.map((c) => c.id),
              plan: d.PLAN,
              levels: d.LEVELS,
              total: d.CASES.reduce((n, c) => n + c.steps.length, 0),
            },
          ];
        }),
      ),
    );
    assert.deepEqual(
      Object.values(contracts)
        .map((d) => d.total)
        .sort(),
      [135, 135, 135, 136, 137],
    );
    // Exercise the actual renderer and answer handler for every displayed option of every edited step.
    let checks = 0;
    for (const track of ["dev", "pm", "an", "ba", "product"]) {
      const result = await page.evaluate((track) => {
        selectTrack(track);
        ui.onb = null;
        let n = 0;
        for (const c of CASES)
          for (const [i, s] of c.steps.entries())
            for (let oi = 0; oi < s.options.length; oi++) {
              S = defaultState();
              S.onb = S.onb2 = true;
              S.rt = RESET_TAG;
              STATES[TK] = S;
              ui.lvlUp = null;
              ui.onb = null;
              ui.pr = null;
              startCase(c, false, "rand", true);
              ui.cur.step = i;
              ui.cur.stage = "opts";
              ui.cur.order = shuffle(s.options.length);
              ui.cur.shown = s.msg;
              render();
              if (document.querySelectorAll(".opts .opt").length !== 3)
                throw Error(track + "/" + c.id + "." + i + " option rendering");
              const pos = ui.cur.order.indexOf(oi),
                o = s.options[oi];
              answer(pos);
              if (ui.cur.chosen !== oi || ui.cur.pts !== o.p || S.pts[c.id + ":" + i] !== o.p)
                throw Error(track + "/" + c.id + "." + i + " grade mismatch");
              if (!document.getElementById("fb")?.textContent.includes(s.explain.slice(0, 24)))
                throw Error(track + "/" + c.id + "." + i + " missing explanation");
              if (ui.cur.m && !ui.cur.m.every((x) => x >= 0 && x <= 100))
                throw Error("Invalid scenario meter");
              n++;
            }
        for (const [id, L] of Object.entries(LX)) {
          if (spScore(L.build, L.build) !== 1 || lxBlocks(L.build).length < 2)
            throw Error(track + "/" + id + " build target");
          for (let oi = 0; oi < L.tone.opts.length; oi++) {
            S = defaultState();
            S.onb = S.onb2 = true;
            S.rt = RESET_TAG;
            STATES[TK] = S;
            ui.onb = null;
            ui.lvlUp = null;
            startCase(BYID[id], false, "rand", true);
            lxStart(ui.cur);
            if (document.querySelectorAll(".lxopt").length !== 3)
              throw Error(track + "/" + id + " tone options");
            const pos = ui.cur.x.tOrder.indexOf(oi);
            lxTone(pos);
            if (ui.cur.x.tChosen !== oi || ui.cur.x.tGain !== (L.tone.opts[oi].ok ? 5 : 0))
              throw Error(track + "/" + id + " tone grading");
          }
        }
        return n;
      }, track);
      checks += result;
      console.log(
        "PASS",
        track,
        result,
        "case option checks; 282 tone choices and all sentence-build targets",
      );
    }
    assert.equal(checks, 2034);
    await page.waitForFunction(() => !saving);
    // Restore a real pre-change payload and verify persisted meanings after reload.
    await page.evaluate((p) => {
      loadAll(p);
      applyTrack(TK);
      save();
      go("home");
    }, legacy);
    await page.waitForFunction(() => !saving);
    await page.reload();
    await page.waitForFunction(() => ui.loaded);
    await page.locator("#splash").waitFor({ state: "detached" });
    const restored = await page.evaluate(() => packAll());
    for (const id of Object.keys(legacy.st)) {
      assert.equal(restored.st[id].xp, legacy.st[id].xp);
      assert.deepEqual(restored.st[id].done, legacy.st[id].done);
      assert.deepEqual(restored.st[id].pts, legacy.st[id].pts);
      assert.deepEqual(restored.st[id].pass, legacy.st[id].pass);
    }
    // Normal UI route from saved chapter progress through word preparation to a case.
    await page.locator(".ctarow .cta2").click();
    for (let i = 0; i < 8; i++) {
      const view = await page.evaluate(() => ui.view);
      if (view === "case") break;
      if (view === "prep") await page.locator(".prskip").click();
      else await page.locator("#app .cta:not([disabled])").first().click();
    }
    assert.equal(await page.evaluate(() => ui.view), "case");
    await page.locator('[onclick="openMsg()"]').click();
    await page.waitForFunction(() => ui.cur.stage === "opts");
    const order = await page.evaluate(() => ui.cur.order.slice());
    const bestPosition = await page.evaluate(() =>
      ui.cur.order.findIndex((i) => ui.cur.c.steps[ui.cur.step].options[i].ok),
    );
    await page.locator(".opts .opt").nth(bestPosition).focus();
    await page.keyboard.press("Enter");
    assert.equal(await page.evaluate(() => ui.cur.ok), true);
    assert.deepEqual(await page.evaluate(() => ui.cur.order), order);
    // Multi-step scenarios: real taps/clicks and nextTap preserve score, branch prompts and ending mechanics.
    for (const track of ["dev", "pm", "an", "ba", "product"])
      for (const weak of [false, true]) {
        const meta = await page.evaluate((track) => {
          selectTrack(track);
          ui.onb = null;
          S = defaultState();
          S.rt = RESET_TAG;
          S.onb = S.onb2 = true;
          STATES[TK] = S;
          const c = BYID[PLAN[0].boss];
          startCase(c, false, "rand", true);
          return { id: c.id, steps: c.steps.length };
        }, track);
        let expected = 0;
        for (let i = 0; i < meta.steps; i++) {
          if (i === 0) await page.locator('[onclick="openMsg()"]').click();
          await page.waitForFunction(() => ui.cur?.stage === "opts");
          const answer = await page.evaluate((weak) => {
            const s = ui.cur.c.steps[ui.cur.step],
              source = weak
                ? s.options.findIndex((o) => o.p === Math.min(...s.options.map((x) => x.p)))
                : s.options.findIndex((o) => o.ok);
            return { pos: ui.cur.order.indexOf(source), points: s.options[source].p };
          }, weak);
          expected += answer.points;
          await page.locator(".opts .opt").nth(answer.pos).click();
          assert.equal(await page.evaluate(() => ui.cur.pts), expected);
          assert.ok((await page.locator("#fb").innerText()).length > 100);
          if (i + 1 < meta.steps) {
            await page.locator('[onclick="nextTap()"]').click();
            await page.waitForFunction(() => ui.cur?.stage === "opts");
          }
        }
        console.log(
          "PASS scenario",
          track,
          meta.id,
          weak ? "weak branch" : "full-credit branch",
          expected,
          "points",
        );
      }
    // Mobile, long professional replies and a scenario feedback screen remain readable without page overflow.
    await page.setViewportSize({ width: 375, height: 812 });
    fs.mkdirSync("/tmp/pm-english-career-qa", { recursive: true });
    for (const track of ["dev", "pm", "an", "ba", "product"]) {
      await page.evaluate((track) => {
        selectTrack(track);
        ui.onb = null;
        S = defaultState();
        S.onb = S.onb2 = true;
        S.rt = RESET_TAG;
        STATES[TK] = S;
        const c = CASES.find((c) => c.id === "b13");
        startCase(c, false, "rand", true);
        ui.cur.stage = "opts";
        render();
      }, track);
      assert.equal(await page.locator(".opts .opt").count(), 3);
      const widths = await page.evaluate(() => ({
        root: document.documentElement.scrollWidth,
        w: innerWidth,
        app: document.getElementById("app").scrollWidth,
        c: document.getElementById("app").clientWidth,
      }));
      assert.ok(
        widths.root <= widths.w && widths.app <= widths.c + 1,
        track + JSON.stringify(widths),
      );
      await page.screenshot({ path: "/tmp/pm-english-career-qa/" + track + ".png" });
    }
    assert.deepEqual(errors, []);
    console.log(
      "PASS: 2,034 case grades + 1,410 tone choices; 470 sentence-build targets; 10 complete scenario branches; legacy reload, existing UI navigation, keyboard, stable shuffle and five 375px layouts.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
