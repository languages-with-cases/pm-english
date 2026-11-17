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
