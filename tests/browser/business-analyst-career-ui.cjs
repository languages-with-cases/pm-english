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
    const act = (a, id = "") =>
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
    async function solve(t, alternate = false) {
      for (const s of t.steps) {
        if (s.kind === "select") for (const id of s.key) await act("select", id);
        else if (s.kind === "order")
          for (const id of s.keys[alternate && s.keys.length > 1 ? 1 : 0]) await act("add", id);
        else
          for (const item of s.left) {
            await act("left", item.id);
            await act("right", s.key[item.id]);
          }
        await act("check");
        assert.match(await p.locator("#pr-feedback").innerText(), /Correct/);
        if (s.response)
          assert.equal(await p.locator(".practice blockquote").innerText(), s.response);
        await act("next");
      }
      await act("lesson-finish");
      await p.waitForFunction(() => !saving);
    }
    // One case ID means three different exercises; completion must stay in its own track.
    const saved = [];
    for (const track of ["ba", "pm", "product"]) {
      const t = await start(track, "b32");
      assert.equal(t.track, track);
      saved.push(t);
      await solve(t);
    }
    await p.reload();
    await p.waitForFunction(() => ui.loaded);
    for (const t of saved) {
      assert.ok(
        await p.evaluate(
          ({ track, id }) => {
            selectTrack(track);
            return S.practiceDone.includes(id);
          },
          { track: t.track, id: t.id },
        ),
      );
      for (const other of saved.filter((x) => x.track !== t.track))
        assert.equal(await p.evaluate((id) => S.practiceDone.includes(id), other.id), false);
    }
    // Every explicitly valid alternate process ordering must work through the real UI.
    const alternateTasks = await p.evaluate(() =>
      CAREER_PRACTICE_DATA.filter(
        (t) => t.track === "ba" && t.format === "process" && t.steps[0].keys.length > 1,
      ),
    );
    assert.equal(alternateTasks.length, 4);
    for (const t of alternateTasks) {
      await start("ba", t.caseId);
      await solve(t, true);
    }
    fs.mkdirSync("/tmp/ba-career-practice", { recursive: true });
    for (const format of ["question", "acceptance", "process"]) {
      const id = await p.evaluate(
        (format) =>
          CAREER_PRACTICE_DATA.filter((t) => t.track === "ba" && t.format === format).at(-1).caseId,
        format,
      );
      const t = await start("ba", id);
      assert.ok(await p.getByText("Task 3 of 3", { exact: true }).isVisible());
      assert.equal(await p.locator("input,textarea").count(), 0);
      const w = await p.evaluate(() => [
        document.documentElement.scrollWidth,
        innerWidth,
        document.getElementById("app").scrollWidth,
        document.getElementById("app").clientWidth,
      ]);
      assert.ok(w[0] <= w[1] && w[2] <= w[3] + 1);
      if (format === "question") {
        assert.equal(await p.locator(".practice blockquote").count(), 0);
        const s = t.steps[0];
        await act("select", s.options.find((o) => !s.key.includes(o.id)).id);
        await act("check");
        assert.match(await p.locator("#pr-feedback").innerText(), /Not quite/);
        assert.equal(await p.locator(".practice blockquote").innerText(), s.response);
      } else if (format === "acceptance") {
        const s = t.steps[0],
          last = s.left.at(-1);
        await act("left", last.id);
        const menu = p.locator('[aria-label="Matching targets"]');
        let box = await menu.boundingBox();
        assert.ok(box.y >= 0 && box.y + box.height <= 812, "BA criteria fit inside phone viewport");
        for (const id of await p.evaluate(() => ui.practice.steps[0].rightOrder)) {
          const button = p.locator(`[data-pr-action="right"][data-pr-id="${id}"]`);
          await button.focus();
          const b = await button.boundingBox();
          assert.ok(b.y >= 0 && b.y + b.height <= 812, "each criterion is keyboard reachable");
        }
        await act("right", s.key[last.id]);
        assert.equal(
          await p.evaluate((id) => ui.practice.steps[0].pairs[id], last.id),
          s.key[last.id],
        );
      } else {
        await p.locator(".pr-options").first().scrollIntoViewIfNeeded();
      }
      await p.screenshot({ path: "/tmp/ba-career-practice/advanced-" + format + ".png" });
    }
    assert.equal(
      await p.evaluate(() => getComputedStyle(document.body).backgroundColor),
      "rgb(230, 243, 255)",
    );
    assert.deepEqual(
      await p.evaluate(() =>
        ["product", "pm", "ba", "dev", "an"].map((t) => practiceTasks(t).length),
      ),
      [3, 3, 3, 3, 3],
    );
    console.log(
      "PASS: BA/Project/Product shared-ID persistence isolation; all four alternate process orders; prepared stakeholder reply after wrong/correct checks; three phone layouts; long criteria remain keyboard reachable; Additional and background unchanged.",
    );
  } finally {
    await b.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
