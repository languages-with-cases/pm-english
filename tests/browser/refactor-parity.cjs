const { chromium } = require("playwright"),
  assert = require("node:assert/strict"),
  fs = require("node:fs");
const { baselineSite } = require("../helpers/baseline-site.cjs");
(async () => {
  const old = await baselineSite(),
    browser = await chromium.launch({
      executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
      args: ["--no-sandbox"],
    });
  try {
    const urls = [old.url, process.env.CAREER_URL || "http://127.0.0.1:8000/"],
      pages = [],
      errors = [];
    for (const base of urls) {
      const proxyUrl =
        base.startsWith("https:") && process.env.HTTPS_PROXY
          ? new URL(process.env.HTTPS_PROXY)
          : null;
      const context = await browser.newContext({
        proxy: proxyUrl ? { server: proxyUrl.protocol + "//" + proxyUrl.host } : undefined,
        viewport: { width: 375, height: 812 },
        timezoneId: "UTC",
        reducedMotion: "reduce",
      });
      await context.addInitScript(() => {
        const NativeDate = Date;
        window.Date = class extends NativeDate {
          constructor(...args) {
            super(...(args.length ? args : ["2026-11-17T12:00:00Z"]));
          }
          static now() {
            return new NativeDate("2026-11-17T12:00:00Z").getTime();
          }
        };
        window.resetRandom = () => {
          let seed = 739;
          Math.random = () => {
            seed = (seed * 16807) % 2147483647;
            return (seed - 1) / 2147483646;
          };
        };
        resetRandom();
      });
      await context.route("**/*", (r) =>
        r.request().url().startsWith(base) ? r.continue() : r.abort(),
      );
      const p = await context.newPage();
      p.on("pageerror", (e) => errors.push(base + e.message));
      await p.goto(base);
      await p.waitForFunction(() => ui.loaded);
      await p.locator("#splash").waitFor({ state: "detached" });
      await p.addStyleTag({
        content:
          "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}",
      });
      pages.push(p);
    }
    const data = [];
    for (const p of pages)
      data.push(
        await p.evaluate(() =>
          Object.fromEntries(
            TRACKS.map((t) => {
              const d = dataFor(t.id);
              return [t.id, JSON.parse(JSON.stringify(d))];
            }),
          ),
        ),
      );
    assert.deepEqual(
      data[1],
      data[0],
      "All five complete track snapshots, including articles/events/reports, must survive extraction",
    );
    const config = [];
    for (const p of pages)
      config.push(
        await p.evaluate(() => ({
          KEY,
          KEY2,
          RESET_TAG,
          PASS_PCT,
          LX_TEXT_XP,
          CLOUD_CONFIG,
          CLOUD_SDK,
          practice: CAREER_PRACTICE_DATA,
          additional: PRACTICE_DATA,
        })),
      );
    assert.deepEqual(config[1], config[0]);
    fs.mkdirSync("/tmp/pm-refactor-parity", { recursive: true });
    let frames = 0;
    const scenarios = [
      "home",
      "levels",
      "words",
      "progress",
      "case",
      "tone",
      "build",
      "additional",
    ];
    for (const track of ["product", "dev", "pm", "an", "ba"])
      for (const view of [
        ...scenarios,
        ...(track === "product"
          ? ["articles", "report", "event", "onboarding", "preparation"]
          : []),
      ]) {
        const snapshots = [],
          shots = [];
        for (const [i, p] of pages.entries()) {
          snapshots.push(
            await p.evaluate(
              ({ track, view }) => {
                resetRandom();
                selectTrack(track);
                S = defaultState();
                S.rt = RESET_TAG;
                S.onb = S.onb2 = true;
                S.rv = false;
                S.gseen = [0, 1, 2, 3, 4, 5, 6];
                S.xp = 250;
                S.streak = 3;
                S.last = "2026-11-17";
                S.seen = ["scope"];
                STATES[TK] = S;
                ui.onb = null;
                ui.lvlUp = null;
                go("home");
                if (view === "articles") go("articles");
                else if (view === "report") rpOpen(0);
                else if (view === "event") evOpen(0);
                else if (view === "onboarding") startOnb();
                else if (view === "preparation") {
                  S.rv = true;
                  S.hist = [Object.keys(WORDS).slice(0, 6)];
                  beginCase(BYID.b01, false, "rand", false);
                } else if (view === "case" || view === "tone" || view === "build") {
                  startCase(BYID.b01, false, "rand", true);
                  ui.cur.stage = "opts";
                  ui.cur.order = [0, 1, 2];
                  ui.cur.shown = ui.cur.c.steps[0].msg;
                  if (view !== "case") {
                    lxStart(ui.cur);
                    if (view === "build") {
                      ui.cur.x.tChosen = 0;
                      lxToBuild();
                    }
                  } else render();
                } else if (view === "additional") go("practiceList");
                else go(view);
                document.getElementById("app").scrollTop = 0;
                return {
                  text: document.getElementById("app").innerText,
                  state: JSON.parse(JSON.stringify(packAll())),
                  words: WORDS,
                  flat: FLAT,
                  width: document.documentElement.scrollWidth,
                  background: getComputedStyle(document.body).backgroundColor,
                };
              },
              { track, view },
            ),
          );
          await p.evaluate(() =>
            Promise.all([...document.images].map((img) => img.decode?.().catch(() => {}))),
          );
          shots.push(
            await p.screenshot({
              path: "/tmp/pm-refactor-parity/" + track + "-" + view + "-" + i + ".png",
            }),
          );
        }
        assert.deepEqual(
          snapshots[1],
          snapshots[0],
          track + "/" + view + " state, vocabulary, progression and rendered text",
        );
        assert.ok(shots[0].equals(shots[1]), track + "/" + view + " pixel comparison");
        frames++;
      }
    // Exercise the supplemental Product features that were previously built inline.
    const supplemental = [];
    for (const p of pages)
      supplemental.push(
        await p.evaluate(() => {
          resetRandom();
          selectTrack("product");
          S = defaultState();
          S.rt = RESET_TAG;
          S.onb = S.onb2 = true;
          S.rv = true;
          STATES[TK] = S;
          ui.onb = null;
          ui.lvlUp = null;
          S.hist = [Object.keys(WORDS).slice(0, 6)];
          beginCase(BYID.b01, false, "rand", false);
          if (ui.view !== "prep") throw Error("missing vocabulary preparation");
          while (ui.pr) {
            prepAnswer(ui.pr.qs[ui.pr.i].opts.findIndex((o) => o.ok));
            prepNext();
          }
          if (!["case", "newwords"].includes(ui.view)) throw Error("preparation continuation");
          ui.lvlUp = null;
          openArticle("a01");
          startQuiz();
          while (!ui.qz.done) {
            quizAnswer(ui.qz.qs[ui.qz.i].opts.findIndex((o) => o.ok));
            quizNext();
          }
          if (S.art.a01.s !== ARTICLES[0].quiz.length) throw Error("article quiz");
          for (let i = 0; i < RP.length; i++) {
            rpOpen(i);
            for (let j = 0; j < 3; j++) {
              rpGap(j);
              rpPick(0);
            }
            rpCheck();
            if (S.rp[i] !== 3) throw Error("report grading");
          }
          S.rv = false;
          for (const level of EVENTS[0].levels) {
            ui.lvlUp = null;
            const c = level.c;
            startCase(c, false, "event", true);
            for (let i = 0; i < c.steps.length; i++) {
              ui.cur.stage = "opts";
              ui.cur.order = c.steps[i].options.map((_, j) => j);
              render();
              answer(c.steps[i].options.findIndex((o) => o.ok));
              nextTap();
            }
          }
          if (S.ev[EVENTS[0].id].l !== EVENTS[0].levels.length || !S.stars.includes(EVENTS[0].id))
            throw Error("event completion/star");
          return JSON.parse(JSON.stringify(packAll()));
        }),
      );
    assert.deepEqual(
      supplemental[1],
      supplemental[0],
      "Preparation continuation, article quiz, all reports and all event levels preserve saved outcomes",
    );
    // Both original inline scripts matter: preserve the scroll bridge AND the touch spring.
    for (const p of pages) {
      await p.evaluate(() => {
        const app = document.getElementById("app");
        app.scrollTop = 0;
        function touch(type, y) {
          const e = new Event(type, { bubbles: true, cancelable: true });
          Object.defineProperty(e, "touches", { value: [{ clientY: y }] });
          app.dispatchEvent(e);
        }
        touch("touchstart", 200);
        touch("touchmove", 260);
        touch("touchmove", 320);
      });
      await p.waitForFunction(() =>
        [...document.getElementById("app").children].some((e) =>
          e.style.transform.includes("translate3d"),
        ),
      );
      await p.evaluate(() =>
        document.getElementById("app").dispatchEvent(new Event("touchend", { bubbles: true })),
      );
      assert.ok(
        await p.evaluate(() =>
          [...document.getElementById("app").children].every((e) => !e.style.transform),
        ),
      );
    }
    assert.deepEqual(errors, []);
    console.log(
      "PASS: exact five-track data/config/practice parity and " +
        frames +
        " identical phone screenshots, text, state, vocabulary and progression including Product supplemental screens, plus report/event/article/preparation outcomes and touch overscroll.",
    );
  } finally {
    await browser.close();
    await old.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
