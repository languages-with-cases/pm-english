# Fullscreen splash / PNG icons — 2026-11-20

- Ветка `fix/fullscreen-splash-png-icons`, база `aed4a43`. Реализованы cover, PNG apple-touch 180, manifest 192/512 и favicon 32; офлайн-снимок обновлён.
- Проверены структура/offline unit (4/4), offline browser, три размера экрана и декодирование PNG. Физический iPhone недоступен.
- Не завершена замена на последнее фото: картинка видна в сообщении, но новый файл не смонтирован в среду; `/tmp/codex-remote-attachments` содержит только два прежних JPEG. Требуется прикрепить последнее фото файлом. Пока остаётся прежний `launch.jpg`; не заявлять, что последнее фото заменено.

# Offline loading — 2026-11-20

- Ветка `feat/offline-loading`, база main `e004e8b`; открытый PR #10 содержит отдельное планирование, его файлы не менялись.
- Реализованы проверяемый полный кеш пяти треков, относительный scope Pages, manifest, статус в Progress и обновление после закрытия старых окон. Spark достаточен; push не входит в этот этап.
- Исправлено зависание следующих локальных сохранений на ожидании Firebase: облако пишет отдельно, последний снимок объединяется в очередь с uid.
- Проверки: npm test (9/9), check, format:check и diff --check прошли. Реальный Chromium: подкаталог Pages, полное скачивание, offline reload, выполнение Additional во всех пяти треках и сохранение, мобильная ширина, отдельные кеши обновления/активация после закрытия клиента, отказ установки при неверной SHA-256 и успешная повторная загрузка. Внешние сервисы заблокированы; page errors отсутствуют.
- Регрессия Additional прошла: 15 правильных и 15 ошибочных попыток, 44 шага, keyboard/touch, reload/старый прогресс/смена треков, шесть мобильных экранов.
- [PR #11](https://github.com/languages-with-cases/pm-english/pull/11) слит в main как b2221c3. Pages run 44726990338 успешно завершил deploy 2026-11-20 11:22:31 UTC. Проверка живого HTTPS-сайта: точный scope /pm-english/, 60 проверенных ресурсов, холодный offline reload, сохранённый XP, навигация career/Additional всех пяти треков, мобильная ширина; page errors нет. Физические телефоны и реальный аккаунт не проверялись.

# Five-track career case rewrite

## Baseline and scope — 2026-11-17

- Repository: `languages-with-cases/pm-english`; baseline `main` at `a55e1ced315c6e73e2bcb1aa6cde55fd4bd044b1`.
- Branch: `feat/five-track-case-rewrite`.
- PR #1 (15 additional practice exercises) is separate and remains outside this change. This branch addresses the original request to improve existing career cases.
- Original runtime inspected: five track snapshots, per-track saved state, shuffled case choices, point-based chapter gates, scenario meters, tone/build extras and existing local/cloud persistence.

## Content implementation

- All 470 existing cases have authored replacement replies and explanations: Developer 135 steps, Project Manager 136, Analytics 135, Business Analyst 135, Product Manager 137 (678 total).
- Every decision has three professionally phrased options with case-specific reasoning. Partial answers represent concrete trade-offs or errors rather than insults, apathy or obviously reckless joke options.
- Concise preferred replies and longer, reasoned alternatives reduce answer-length cues. Source option positions rotate; the existing attempt-time shuffle remains in use. Equivalent defensible plans receive full credit through an explicit reviewed rubric rather than being rejected for wording alone.
- Seven bilingual career chapters per track plus case-level bridges connect prior incidents, releases and decisions to subsequent responsibility. Product chapters follow its actual PLAN, whose case numbers are not sequential. Side scenarios are not misrepresented as completed campaign chapters.
- Explanations connect business reasoning with the existing professional vocabulary. Definitions corrected for p-values, confidence intervals, significance, idempotency, sunk cost, anonymization, revenue recognition and guardrails.
- Targeted tone/build extras corrected where they contradicted the new professional logic, including CI arithmetic, stopping rules, real outliers, unknown audit evidence, HTTP semantics, legal deadlines and unsupported staffing claims. Existing exercise types and voice/text mechanics remain.
- Old pre-scripted option-specific reactions described removed choices, so the existing feedback component now uses authored reasoning rather than those incompatible canned reactions. Scenario meters, alternate follow-up prompts, endings and state transitions remain.

## Implementation structure

- `content/*.tsv`: authored replies and reasoning; `*-best.tsv`: concise preferred replies for the two retained drafts.
- `content/storybook.json`: chapter narratives and cross-case bridges.
- `content/accuracy-fixes.json`: explicit factual/vocabulary/language-extra corrections.
- `content/rubric.json`: defensible alternative answers awarded full credit.
- `content/alternative-reasons.tsv`: case-specific benefits supporting selected alternatives, so comparison is a genuine trade-off rather than an obviously short distractor.
- `scripts/build-career.cjs`: reproducible content build from the immutable baseline and reviewed authoring files.
- `career-content.js`: generated, readable static data. The old four-track JSON payload is replaced rather than downloaded twice. Content is applied before track snapshots and state loading.
- Existing case IDs, step counts/order, campaign PLAN, level XP thresholds, step maximum points, storage keys, reset tag and authentication code are retained. Previously saved points remain interpretable; no forced reset or new backend is introduced.

## Verification

Completed:

- `CAREER_BASELINE=/tmp/career-baseline.html node tests/career-content.test.cjs`: PASS. All 470 cases / 678 steps have replacement replies. Keys, IDs, case/step order, PLAN, level thresholds, scenario meter shapes and every step maximum are checked against the original runtime. Regeneration is deterministic.
- All main-step option lengths have a longest/shortest word-count ratio at most 1.85. Positional explanations are rejected. Rotated source positions and the existing per-attempt UI shuffle avoid a fixed top answer.
- `node tests/career-browser.cjs`: PASS. Actual rendering and grading checked for all 2,034 career options and 1,410 tone options; all 470 sentence-build targets normalize correctly. The test clicks ten complete scenario paths (full-credit and weak branches in every track), validates cumulative points and feedback, checks existing saved-state navigation and a keyboard answer, and verifies stable order within the attempt.
- Legacy per-track XP, completion IDs, points and passed-chapter state survive reload. No storage key or reset tag changed. Original denominator and level-contract tests preserve old progress interpretation.
- Five 375×812 layouts pass without horizontal page/app overflow. Screenshots reviewed locally in `/tmp/pm-english-career-qa/`.
- `node tests/career-touch.cjs`: PASS in a touch-enabled 375px context. Product banking-metric and Developer CI cases pass through answer → updated wording → sentence building, including removing and re-adding blocks.
- JavaScript syntax checks and `git diff --check`: PASS.
- Manual accuracy review covers p-values versus effect size, stopping rules, valid outliers, subgroup selection, cash/bookings/revenue, no invented external audits, 80 aggregate build-hours versus lost time, payment atomicity, migration rollback windows, bank-specific value metrics and forward-looking budget decisions.
- 27 related language extras corrected; 22 contextual professional vocabulary entries added when actually used by a case; 40 steps explicitly accept an equivalent full-credit plan. Existing remaining tone/build tasks and their mechanics are retained.

## Verification limits

Browser checks block external fonts and the existing Firebase SDK for repeatability. Live account synchronization and microphone recognition were not exercised; storage payload compatibility and sentence/block mechanics were tested locally. Physical iOS/Android devices were not available. PR #1 remains a separate change; these tests cover this branch's original career app, not a combined deployment of the two PRs. No production merge or deployment was performed.


---

# Additional practice: first release

## Scope and baseline — 2026-11-16

- Baseline: `main` at `a55e1ced315c6e73e2bcb1aa6cde55fd4bd044b1`; no open PRs, no existing PROGRESS.md or AGENTS.md in the repository.
- Working branch: `feat/additional-practice-15`.
- Latest specification: 3 additional exercises per track (15 total), using selection, ordering and matching; no text input or new backend.
- Existing app: single HTML file, five track snapshots; shuffled case choices; per-track state packed by `packAll`, read by `merge`, saved locally and through existing cloud sync. Chapter thresholds use PLAN/FLAT and S.pts.
- New completion IDs will live in a separate `practiceDone` array inside each existing track state. No chapter points, XP, reset tag, storage key or authentication changes.
- Earlier unfinished editorial drafts are retained outside this checkout; they are not part of this PR.

## Implementation

Implemented:
- `practice-data.js`: 15 stable-ID exercises, 22 steps across all five tracks; supplied English materials/options and Russian instructions/feedback.
- `practice.js`: shared selection (including exact multi-select count), ordering with removal/reinsert, reusable-category matching; fixed shuffled option order per attempt; key-based checking, feedback, retry and completion.
- `practice.css`: existing tokens and touch-friendly native buttons, focus indicators, scrollable tables/code/Gantt, accessible chart data.
- Home entry per track; `practiceDone` round-trips through existing state merge/persist and unions across cloud snapshots. No PLAN/FLAT/points/XP changes.
- Original cases, authentication, reset tag and storage keys retained.

## Verification

Pending implementation.

## Verification completed — 2026-11-16

- `node tests/practice-data.test.cjs`: PASS. Exactly 3 exercises per track, 15 unique IDs, 22 steps; valid references/keys, correct and incorrect answers for every step, incomplete answers, alternative valid orders, reusable targets and completion union.
- `node tests/practice-browser.cjs`: PASS in Chromium. All 15 exercises completed through the interface with a correct and an incorrect attempt (44 step checks). Each step rejects incomplete answers; edits work; options remain in their attempt order; retries reset attempts and do not duplicate completions.
- Existing `xp`, `done`, `pts`, `pass` and chapter score snapshots are unchanged by practice. All 15 completions survive reload, scoped to their five tracks. Legacy states without `practiceDone` read correctly. Cloud snapshot merging keeps completions independently of which snapshot wins the existing XP rule.
- Keyboard: Tab reaches the scrollable code region and answer controls; Enter/Space select, remove/reinsert order cards, assign matching targets and check answers. Feedback receives focus. No input/textarea exists in any practice task.
- Mobile: six representative layouts at 375×812, no page/app horizontal overflow; wide artifacts scroll inside their own region. A separate touch-enabled phone context passes the bug-report exercise using taps, including reuse of Steps to reproduce. Static form mockups and screenshots reviewed.
- Existing case: Home → chapter/intro → existing word review/new words → original message → original answer works.
- Syntax checks on both new scripts and extracted inline script, plus `git diff --check`: PASS.
- Reproduction instructions: `tests/README.md`. Screenshots are local QA evidence in `/tmp/pm-english-qa/`, not production assets.

### Manual answer-key audit

| Exercise | Confirmed answer / evidence |
| --- | --- |
| Product funnel | Step conversions 60→55 (−5 pp), 50→40 (−10 pp), 60→70 (+10 pp); identity check is largest decline; relative decline is 20%, not 10%. Before/after does not establish causality. |
| Product priority | Available-score rule yields C(5), A(4), then unlocked B(6), then D(3); no ties. |
| Product A/B | CI −0.2…2.6 includes zero; crash increase 0.35−0.20=0.15 pp exceeds 0.10 pp. Neither launch condition passes. |
| Developer review | Line 4 uses > rather than >=; discounted total 100 must stay 100, not become 108. |
| Developer incident | 10:02 deployment, 10:04 alert, 10:06 rollback start, 10:09 recovery; cause/payment loss remain unknown. |
| Developer bug report | Two actions → Steps; clearing validation → Expected; persistent error → Actual. |
| Project Gantt | API ends June 9; frontend still June 7; integration test June 10–11; release June 12, not June 14. Only test and release shift downstream. |
| Project scope | 4 committed days − 3 animation + 3 blog = 4; adding both requires 7. Written scope-swap approval is required. |
| Project status | Finished work → Progress; future uncertainty → Risk; currently stopped → Blocker; explicit authorized choice → Decision needed. |
| Analytics reconciliation | 420 completed + 80 cancelled = 500; both dashboards have the same UTC day/currency. |
| Analytics SQL | Three joined rows (1,20,A), (1,20,B), (2,30,C); joined sum 70 vs order sum 50. DISTINCT amount is not general deduplication. |
| Analytics charts | Weekly line → time trend; equal-bin histogram → distribution; categorical bars → segment comparison (Referral highest at 10%). |
| BA clarification | Ask about exactly $500; prepared stakeholder reply confirms >500, with 499.99/500.00/500.01 boundary tests. |
| BA process | Submit → identity → eligibility → create → confirmation; either failed check creates no application. |
| BA acceptance | Repeated R1, including a double-click/retry, reuses the reference; new valid R2 creates one application; no consent creates none. |

### Limits

Live Firebase login/synchronization against a real account was not exercised: remote SDK/fonts were blocked during deterministic browser tests. The existing persistence payload and cloud-state merge were tested locally. Physical iOS/Android devices were not available; verification used desktop Chromium, a narrow viewport and a touch-enabled mobile context. Production deployment is not part of this change.


## Combined production release — 2026-11-17

The user authorized publishing both changes. PR #1 is merged into the career branch for a single reviewed production update. The duplicate old track payload is removed; career data and all three additional-practice scripts/styles are loaded together. The storage merge adds practiceDone without changing existing case state. Joint regression is in progress before merging to main.

### Combined-release verification

- Both content suites pass on the merged checkout: 470 career cases / 678 steps and 15 additional tasks / 22 steps.
- `node tests/career-browser.cjs`: PASS on the combined version, including 2,034 career grades, 1,410 tone choices, ten scenario paths, legacy state reload, keyboard and five phone layouts.
- `node tests/practice-browser.cjs`: PASS on the same combined version, including 15 correct and 15 incorrect attempts, partial/edit/retry handling, reload and track isolation, unchanged chapter scores and touch interaction.
- All career/practice scripts and the practice stylesheet are included once. JavaScript syntax and diff checks pass.
- GitHub Pages configuration confirmed: `main`, repository root; public URL `https://languages-with-cases.github.io/pm-english/`.
- The user explicitly authorized updating the live version. Combined release is ready for main and the existing Pages deployment; deployment success and served assets will be checked after merge.

## Background update — 2026-11-17

Changed the app background from light lavender `#E6E8FF` to light blue `#E6F3FF`, including the matching transparent gradients above navigation and word-screen actions. Verified computed html/body background on Home, Levels, Words, Progress and Additional practice in 375px Chromium; diff checks pass. User requested the change to the active application.

## Product career task-three pilot — 2026-11-17

Scope requested: only the first two Product Management chapters. Chapter-local levels 2, 4, 6, 8, 10 and 12 replace sentence building (task 3 of 3) with a contextual practical task. The case and tone stages remain first and second. Odd levels, chapter 3 onward, all other tracks, random practice and existing Additional practice retain their prior behavior.

| Chapter | Level | Case | Third-task variant |
| --- | --- | --- | --- |
| 1 | 2 | b03 | A/B: inconclusive primary result |
| 1 | 4 | b05 | Funnel: payment-start bottleneck |
| 1 | 6 | b07 | Priority: support readiness dependencies |
| 1 | 8 | b11 | Funnel: campaign activation vs retention counts |
| 1 | 10 | b16 | Priority: dark-theme prerequisites and alternatives |
| 1 | 12 | b52 | A/B: verified activation vs duplicate accounts |
| 2 | 2 | b09 | Priority: vendor-value work |
| 2 | 4 | b14 | Funnel: identity-verification objective |
| 2 | 6 | b23 | A/B: support counts versus exposure-normalized rate |
| 2 | 8 | b31 | Priority: export remediation |
| 2 | 10 | s01 | Funnel: payment incident |
| 2 | 12 | s03 | A/B: mature pricing economics and churn |

Implementation: 12 authored variants (four per existing Product format) in `career-practice-data.js`; an explicit slot/mode guard in `career-practice.js`; shared attempt creation and step renderer reused from Additional practice. The existing lesson header remains Task 3 of 3. Main case points, PLAN, chapter thresholds and the first two tasks are unchanged. Completion reuses the prior text-task award slot (+3 XP, existing retry rule); previous sentence XP is not awarded again. Embedded IDs use existing completion persistence/union. After three failed attempts, the stage can be skipped without XP, as with the previous sentence task. No new backend or free input.

Checks so far: independent data/key arithmetic passes for all 12 variants; runtime guard rejects every out-of-scope case/track/mode. Mobile/touch browser walkthroughs pass all 12 lessons from case through tone to embedded task, with incomplete/wrong answers, edits, retry, fixed attempt order, completion, return to levels and reload. Chapter points remain unchanged; legacy award flags prevent duplicate XP. Skip-after-three, keyboard ordering, ordinary sentence-task controls and zero-XP completion union also pass. Full regression also passes: all 15 Additional tasks (44 correct/incorrect step checks and touch/reload checks), 2,034 existing career choices, 1,410 tone choices and ten scenario paths. Original career content data, Additional content and styles remain unchanged.

## Product career expansion — 2026-11-17

Implementation stage: extend only Product Management to all seven chapters. Add 30 authored variants at chapter-local levels 2, 4, 6, 8, 10 and 12 in chapters 3–7; keep the published 12 pilot variants byte-equivalent as data. Each chapter now has six replacements, two per Product format in the new chapters; total 42 tasks, 14 per format. Odd levels, case/tone stages, other tracks, random practice, Additional, chapter score thresholds and XP rules are unchanged. Reuse the existing career-practice controller and shared click-only handlers; extend its explicit slot validation and version the changed data/controller URLs for returning users.

Difficulty progression:
- Chapter 3, area ownership: multiple prerequisites, confidence-adjusted value, a minimum commercial experiment hurdle and conditional funnel denominators.
- Chapter 4, cross-team initiatives: mandatory controls, two binding guardrails, scoped enterprise/sandbox evidence and explicit multi-team dependencies.
- Chapter 5, portfolio alignment: RICE with shared prerequisites, subgroup guardrails, package-versus-component attribution and aggregate/segment mix reversals.
- Chapter 6, organizational economics: net annual value after ongoing costs, six-item dependency chains, matched observation windows, validity gates and separately identified cash timing.
- Chapter 7, board stewardship: probability-weighted upside minus downside, contractual gates, non-inferiority versus superiority, multiple customer-risk constraints and consent/service obligations in acquisition integration.

Every answer has a fixed data key and feedback explaining the particular denominator, dependency, risk or inference mistake. English materials and messages remain in the existing bilingual presentation. Mathematical keys have passed independent table-based tests; browser/reload/keyboard verification is next.

New slots (level → existing case, all replacing only task three):

| Product chapter | 2 | 4 | 6 | 8 | 10 | 12 |
| --- | --- | --- | --- | --- | --- | --- |
| 3 · Product Manager | b18 · priority | b32 · A/B | b40 · funnel | b43 · priority | s04 · A/B | s06 · funnel |
| 4 · Senior PM | b26 · priority | b29 · A/B | b33 · funnel | b37 · priority | b53 · A/B | s08 · funnel |
| 5 · Group PM | b34 · priority | b46 · A/B | b51 · funnel | b58 · priority | b67 · A/B | s10 · funnel |
| 6 · Head of Product | b20 · priority | b47 · A/B | b54 · funnel | b64 · priority | b68 · A/B | s12 · funnel |
| 7 · CPO | b38 · priority | b57 · A/B | b61 · funnel | b66 · priority | b70 · A/B | s14 · funnel |

Verification stage: PASS.
- `node tests/career-practice.test.cjs`: all 42 actual even-level slots; independent table-based keys, unique priority orders, RICE/confidence/net/risk arithmetic, all experiment guardrails and maturity/validity gates, matched funnel denominators, aggregate-mix reconciliation, comparable English option lengths, untouched pilot data hash and full track/mode guards. Numerical explanations were also reviewed against the displayed tables.
- `node tests/career-practice-browser.cjs`: all 42 native case → tone → replacement flows, 42 failed and 42 successful attempts, incomplete inputs, edit/retry, fixed attempt order, phone/touch with no page overflow, unchanged chapter scores, reload and exactly-once XP. Legacy award flags, three-failure skip, cloud/local completion union, original sentence tasks at odd levels in every Product chapter and in other tracks/random practice, plus keyboard ordering of the CPO build-or-buy task all pass.
- `node tests/practice-browser.cjs`: all 15 existing Additional tasks, 44 correct/incorrect step checks, keyboard/touch, state reload, track isolation, legacy cases and cloud-merge logic pass.
- `node tests/practice-data.test.cjs` and `CAREER_BASELINE=/tmp/career-baseline.html node tests/career-content.test.cjs`: all original content contracts pass (470 career cases / 678 steps, 15 Additional tasks / 22 steps). Deterministic content regeneration leaves career-content.js unchanged.
- Active phone layouts inspected for all three CPO formats; JavaScript syntax and diff checks pass. Real Firebase login/sync and physical iOS/Android hardware were not exercised; deterministic tests block remote Firebase/fonts and cover local persistence plus merge logic.

Ready for the existing main → GitHub Pages publication. No backend, styling or other-track content changes.

## Project career task-three expansion — 2026-11-17

Implementation stage: add 42 distinct Project Management exercises in `project-career-practice-data.js`, at levels 2, 4, 6, 8, 10 and 12 of each of seven chapters. Levels 2/8 analyze a Gantt/dependency plan; 4/10 match status messages; 6/12 select a feasible scope-change email. Each of the three existing Project formats has 14 independent variants. Tasks use the current shared select/match handlers, feedback, retry, state-save and XP rules. Only a track-aware slot lookup and an optional day range/label on static Gantt charts extend the controller/renderer. Existing Additional charts retain their twelve-day June default. Changed/new script URLs are versioned.

Difficulty grows from single dependency chains, simple role limits and four clear status items to parallel joins and float, multiple role/spend/date constraints, six/seven status items with reusable categories, program-level dependencies, resource reservations, authorized release windows, contract/security controls, margin floors, protected cash and accountable executive decisions. Materials and answer options are English; instructions and explanations follow the existing bilingual pattern. Calendar conventions, approved windows, reserved starts, resource limits and permission constraints are explicit in each task.

Scope boundaries: all 42 published Product variants remain exactly unchanged; odd Project levels, the first two stages, unrelated tracks, random practice, the 15 Additional tasks, old progress, chapter thresholds and existing XP awards remain unchanged. Separate task IDs and the track-aware hook prevent collisions between shared case IDs. Legacy sentence-award flags still prevent duplicate XP.

Independent schedule and feasibility checks pass for all 42 tasks; all keys and status classifications have been reviewed against the case materials. Browser regression and persistence checks are running.

Verification stage: PASS.
- Independent data checks cover all 42 actual Project even-level slots, every correct/wrong/incomplete key, dependency propagation from the displayed Gantt baselines, reserved starts, every authorized release window, unique feasible plans under every role/date/spend/margin/cash/control limit, four status categories and reused categories in later chapters. All 42 Product task records retain their exact pre-change hash. Numerical explanations and status classifications were reviewed against the materials.
- `CAREER_TRACK=pm node tests/career-practice-browser.cjs`: all 42 lessons pass through their original case and tone stages into the replacement, then through incomplete/wrong/edit/retry/correct attempts, stable attempt order, exactly-once XP, unchanged chapter points, touch/phone width and reload. Legacy XP flags, three-failure skip, keyboard matching, odd Project levels in all seven chapters, other tracks and random practice controls pass.
- `node tests/career-practice-browser.cjs`: all 42 Product variants also pass on the combined application. `node tests/practice-browser.cjs`: all 15 Additional tasks pass, including 44 step checks, keyboard/touch, legacy cases, reload/track switching and cloud merge behavior.
- `node tests/project-career-ui.cjs`: Project/Product shared-case-ID isolation survives reload; extended Gantt charts support keyboard horizontal scrolling; too many selections are rejected until edited; three advanced phone layouts pass. Status categories remain visible beside long Project reports via a narrowly scoped sticky target column. Existing Additional June charts retain 12 days and other tracks keep their styling.
- Product/Project practice unit suites, Additional unit suite and the 470-case / 678-step career content contract suite pass. Generated career content is unchanged. JavaScript syntax and diff checks pass.
- Real signed-in Firebase round trips and physical mobile hardware were not tested. Browser tests cover local storage and merge behavior while blocking remote Firebase/fonts.

Ready for main and the existing GitHub Pages deployment. No new backend or input mechanism; the light-blue application background is preserved.

## Business Analyst career task-three expansion — 2026-11-17

Implementation stage: add 42 authored BA tasks at chapter-local levels 2, 4, 6, 8, 10 and 12 in all seven chapters. The 14 clarification questions include prepared stakeholder responses; 14 acceptance exercises map concrete boundary situations to Given / When / Then; 14 process exercises order the main path and then route observed exceptions. All use existing select/order/match handlers, stable per-attempt shuffling, feedback, retry, persistence and legacy XP rules. No new task mechanic, free input, API or backend.

Progression: trainee measurement and boundaries → junior recipient ambiguity, sources and inclusive rules → independent BA NFRs, baseline/test traceability and compliance → senior lifecycle impact, mapping priority, timestamp contracts and independent steps → lead synthetic-data coverage, financial reconciliation and compound performance conditions → head-level evidence quality, privacy, minimum sufficient artifacts and demonstrated succession → CDO control populations, regulated partnerships, delegated authority and evidence surviving leadership change.

Process order is checked against explicit prerequisite graphs; four later processes allow both orders of two independent steps. Exception routing uses stated first-failure priority with concrete observation tables. Acceptance policy facts and varied inputs are explicit; unvaried inputs remain valid. Clarification alternatives are useful professional questions but only one closes the stated gap. English materials/answers and Russian instructions/explanations follow the existing presentation.

Integration changes only the BA track allowlist, new data registration and an isolated BA matching column that keeps long criteria reachable with keyboard/touch in a bounded scroll area. Product and Project data remain byte-equivalent as records (84-task hash); odd BA levels, case/tone stages, unaffected tracks/random practice, Additional, chapter thresholds, background and previous XP are unchanged. New/changed assets have versioned URLs.

Independent checks pass for every key and all 126 actual track-scoped slots; browser, persistence and mobile verification is in progress.

Verification stage: PASS.
- `node tests/business-analyst-career.test.cjs`: all 42 BA slots, question/reply schema and comparable question lengths, every valid process topological order, first-failure exception routing, independent acceptance oracles for time/amount boundaries, ratios, load/sample adequacy, privacy, idempotency, migration priority and UTC delegation expiry. All 126 track/mode-scoped slots are checked; original 84 Product/Project records retain their exact hash. Questions and numerical/technical explanations were manually reviewed against their stated gaps and contracts.
- `CAREER_TRACK=ba node tests/career-practice-browser.cjs`: all 42 native case → tone → task-three paths, failed/incomplete/edited/retried/correct attempts, fixed attempt order, mobile/touch widths, keyboard matching, reload, unchanged chapter points and exactly-once XP. Legacy awards, three-failure skip, completion union and original sentence tasks at odd BA levels/other tracks/random practice pass.
- `node tests/business-analyst-career-ui.cjs`: all four alternative process orders pass; prepared stakeholder replies appear after checked questions; BA/Project/Product shared-ID completion stays isolated after reload. Three advanced phone layouts pass; all long criteria remain keyboard reachable in the bounded right-hand column, with a scrolling hint.
- Existing Project UI, Product/Project unit suites, Additional unit/browser suites (15 tasks, 44 step checks) and the 470-case / 678-step original content contract suite pass on the combined app. No original content or progress denominators changed. JavaScript syntax and diff checks pass.
- Remote Firebase/fonts are blocked in deterministic browser checks. Local save and merge logic were tested; real signed-in Firebase round trips and physical phone hardware were not exercised.

Ready for main and existing GitHub Pages publication. No backend, free-input or unrelated-track content changes.

## Shared architecture and change history — 2026-11-17 17:27:24 UTC

Documentation-only task: add `АРХИТЕКТУРА.md` as the current service/concept/file-map reference, `Изменения.md` as the dated change journal and root `AGENTS.md` as the Codex discovery/update instructions. Bootstrap the journal from verified main commits and previous implementation reports, preserving the distinction between commit time and deployment time. Future code/content/docs changes must carry a journal entry; architecture updates when contracts or composition change. Explicitly distinguish this agent workflow from a Git hook or CI-generated log.

Runtime, content, styles, storage, auth, progression and tests are unchanged. Documentation facts were checked against the current code and data inventory; Markdown links and diff are checked before commit. Full game/browser suites are not necessary for Markdown-only changes.

## Modular static application refactor — 2026-11-17 18:01:27 UTC

Implementation: replace the large HTML with a small shell; split the actual runtime into app/core/features/ui scripts, preserving classic global handler contracts and explicit defer order. Move CSS in original cascade order, extract three binary images, use canonical five-track career data instead of duplicate legacy rewrites. Preserve Product articles/reports/event/presentation as independent data. Update generator output, tests, reproducible npm tooling, AGENTS and an exhaustive architecture catalog (97 files).

Verification running: all unit/content/structure checks pass; initial five-track/40-screen exact parity passed. Full career/Additional/UI regression has passed, all 126 embedded flows and extended auxiliary-feature/visual parity are completing. No storage/auth/scoring/content changes intended.

Refactor verification complete: all 126 embedded flows, 2,034 original case grades, 1,410 tone choices, 470 build targets, 15 Additional exercises, legacy reload, keyboard/touch and prior UI checks pass. Extended differential test passes all five complete track snapshots, config, 45 exact phone screenshots, preparation continuation, article quiz, all ten reports, all five event levels/star and overscroll. Extracted binary assets match original bytes.

The content generator now reads a checksummed `content/baseline.json` captured from the immutable original revision rather than evaluating historical HTML; generated output remains deterministic and semantically unchanged. Architecture documents all 98 final repository files; a unit assertion prevents omissions. npm ci, structural/syntax checks, unit contracts, formatter and Markdown-link checks complete before release. Real signed-in Firebase, hardware microphone and physical phones remain outside the deterministic checks.

## Published modular release verification — 2026-11-17 18:13:19 UTC

PR #8 merged as 67c44220d9c0734fe20b7ae1a22fc098433d4487. Pages run 44144849542 succeeded; deploy job completed 2026-11-17T18:10:35Z. Live checks: all 57 HTML/JS/CSS/image resources match tested bytes, a pre-refactor-style progress payload loads, nine practice formats complete/persist, all 126 variants remain registered. Differential parity also passes against the actual published site: full five-track data/config, 45 exact phone frames and supplemental Product/scroll outcomes.

This follow-up only records verified deployment results and updates the architecture reference; application code/assets/data are unchanged. No unfinished implementation.
