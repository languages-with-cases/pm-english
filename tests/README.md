# Career content checks

Run from the repository root with Node.js 18+, Python 3, the `playwright` Node package and Chromium installed.

The content build uses the immutable original commit rather than whichever files happen to be in the worktree. A supplied HTML path also works in execution environments that restrict child processes:

```sh
git show a55e1ced315c6e73e2bcb1aa6cde55fd4bd044b1:index.html > /tmp/career-baseline.html
CAREER_BASELINE=/tmp/career-baseline.html node scripts/build-career.cjs
CAREER_BASELINE=/tmp/career-baseline.html node tests/career-content.test.cjs
python -m http.server 8000 --bind 127.0.0.1
# In a second terminal:
node tests/career-browser.cjs
node tests/career-touch.cjs
```

Without `CAREER_BASELINE`, the builder reads that commit directly with Git. Fetch the baseline commit if using a shallow checkout that does not contain it. For the browser test, install Playwright if needed (`npm install --no-save --package-lock=false playwright`), set `CHROMIUM_PATH` if Chromium is not `/usr/bin/chromium`, and set `CAREER_URL` for a different local server.

Content checks cover every case/step, authored option coverage, explicit full-credit alternatives, word-length comparability, deterministic regeneration, factual regressions, 35 bilingual stories, and unchanged IDs, step counts, chapter plans, level thresholds and maximum points.

The browser suite exercises the actual renderer/answer handler for all 2,034 career choices, every tone choice and all 470 sentence-build targets. It also clicks through ten complete scenario paths, the ordinary saved-progress navigation, a keyboard answer, state reload and five 375-pixel layouts. Screenshots go to `/tmp/pm-english-career-qa/`.

The additional touch test completes the updated banking metric and CI lessons through the case, wording and block-building stages using actual taps, including block removal and reinsertion.

Remote fonts and the existing Firebase SDK are blocked during deterministic browser tests. Live account synchronization, microphone recognition and physical iOS/Android devices require separate checks. No new API or backend is used by this change.
