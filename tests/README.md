# Practice checks

Run from the repository root with Node.js 18+, Python 3, Playwright and Chromium installed.

```sh
node tests/practice-data.test.cjs
python -m http.server 8000 --bind 127.0.0.1
# In another terminal:
node tests/practice-browser.cjs
```

The browser test uses the `playwright` Node package (`npm install --no-save --package-lock=false playwright` if it is not already available). Set `CHROMIUM_PATH` if Chromium is not `/usr/bin/chromium`; set `PRACTICE_URL` for another server address.

The data test checks all keys, incomplete/incorrect answers, explicit alternate orders, and independent arithmetic for the funnel, dependency-aware priority rule, Gantt schedule and SQL join. The browser test completes all 15 exercises correctly and incorrectly, edits selections, retries, checks fixed option order, reloads progress, switches tracks, checks legacy state/case behavior, keyboard controls, six narrow layouts, and a touch-enabled phone context. Screenshots go to `/tmp/pm-english-qa/`.

Remote fonts and the existing Firebase SDK are blocked by the browser test. Local persistence and cloud-state merge behavior are tested; a real signed-in Firebase round trip and physical iOS/Android devices require a separate manual check. The new practice itself makes no API calls.
