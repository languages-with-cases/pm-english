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
