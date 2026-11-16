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
