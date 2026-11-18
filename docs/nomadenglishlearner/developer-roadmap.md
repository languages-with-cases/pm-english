# NomadEnglishLearner — Developer roadmap

Status: proposed delivery plan; no learner session or learning result is claimed.
Scope: application development, from the first observed Developer lesson to a limited usable Developer release. Public relations and commercial launch are outside this plan.
Working codename: **NomadEnglishLearner**. The existing repository and prototype retain their current names.

Execution: [Linear application project](https://linear.app/nomadenglishlearner/project/pm-english-59b507a3e682/overview), milestone **M1 — First observed Developer lesson**, issues **NOM-8–NOM-13** (linked in section 5).

## 1. Product decision

Build the first program around one complete, observable workflow:

**Reproduce a small bug → ask a useful technical question in English → interpret English help → apply and verify a fix → explain the result in English.**

Start with familiar vanilla JavaScript in the learner's existing editor and browser. Use Python instead if the familiarity check demonstrates a materially better fit. Do not require both languages in the first release.

The first deliverable is a tested lesson, with a facilitator if necessary. The first software deliverable implements that lesson from beginning to end. Building a large catalogue, a placement engine or an AI tutor before observing the workflow would leave the central product question unanswered.

The public prototype's five tracks are reference material and an optional observation surface. No decision has been made to retain its code, content, progression rules or data contracts. A separate Product Management experiment may proceed independently; its recruitment and findings do not block Developer.

The first release is deliberately bounded: a small Developer program for learners who already know the selected programming basics, can navigate their usual tools, and want help using English technical assistance. It is not an A2–C1 course, a general programming course or a five-program relaunch.

## 2. Evidence available now

The repository was reviewed at [e004e8b](https://github.com/languages-with-cases/pm-english/commit/e004e8bf525391d3cf85ca0a5aaa6d095360a05d). These are source findings, not new live-browser or production-account tests.

| Verified source finding | Consequence for this plan |
| --- | --- |
| The app is static, with content/data/src/assets separated and classic deferred scripts sharing browser globals. | A new backend or framework is not a prerequisite for observing a lesson. A modular-looking file layout does not by itself establish which implementation to retain. |
| The case controller scores authored choices; the Developer language stage selects tone and reproduces a target sentence. | Existing completion and XP cannot be used as the main evidence of independently asking, understanding or explaining. |
| Sentence assessment compares normalized token sequences with an authored target. | This is not semantic evaluation of an original technical question or explanation. |
| Progress chiefly stores XP, completed IDs and activity state; the cloud reconciliation selects the higher-XP snapshot, then more completed items, with a separate merge for practice completions. | Independently authored drafts, attempt revisions and feedback need their own data design. Adding them to the old snapshot without reviewing reconciliation risks losing evidence. |
| Word translation, code/material rendering, authored content and testing helpers already exist. | They are candidates for a focused review. Reuse must be justified by the new workflow. |
| Browser tests deliberately exclude external Firebase calls; the repository does not define deployed Firestore rules or authorized domains. | Existing tests do not verify real-account operation, external configuration or a new learning workflow. |

Sources: [current architecture](../../АРХИТЕКТУРА.md), [case controller](../../src/features/cases/controller.js), [lesson controller](../../src/features/lesson/controller.js), [state](../../src/app/state.js), [storage](../../src/core/storage.js), [account reconciliation](../../src/features/account.js), [translation UI](../../src/features/translations.js), [test boundaries](../../tests/README.md).

The current Linear proposals were read in full: [NOM-5: placement and adaptation](https://linear.app/nomadenglishlearner/issue/NOM-5), [NOM-6: professional theory cards](https://linear.app/nomadenglishlearner/issue/NOM-6), and [NOM-7: Voice Meeting Simulator](https://linear.app/nomadenglishlearner/issue/NOM-7). Subscription exploration appears in the project description and user brief; this plan does not assume an approved billing specification.

## 3. Outcomes and evidence rules

Assess four outcomes separately: **question, interpretation, verification, explanation**. Keep the code change and its technical correctness as evidence too. A working patch does not prove understanding; understandable English does not prove the patch is correct.

For an elicited, attempted outcome use 0 = absent/materially incorrect, 1 = incomplete in a consequential way, 2 = functional for this task. Use NE = not elicited and NO = not observed separately. The natural baseline does not require an English question or explanation: missing English output is not a measured inability. Grammar is relevant only when it obscures the necessary meaning.

Record assistance independently. The standard reviewed English answer or source is lesson input, not facilitator rescue: it may identify the technical mechanism. Grade whether the learner interprets and applies it. S2–S3 describe extra help that performs the learner’s remaining work, such as translating the explanation wholesale or choosing/applying the patch for them:

- **S0:** no support.
- **S1:** optional generic question checklist, small glossary or individual-word lookup, reread/highlight cue, or generic reminder to show evidence.
- **S2:** sentence-level translation, repeated reformulation, or a task-specific technical hint.
- **S3:** another person supplies the diagnosis, patch, full question or explanation.

S0–S1 is the proposed meaning of *light scaffolding*. A response earns a quality score even after substantial help, but that combination must not be reported as independent performance.

For Russian switches, record the stage, preceding difficulty, the learner's stated reason where available, the purpose, and the outcome. A productive word lookup followed by independent use of English is compatible with success. The primary metric is successful communication and verification with bounded assistance, not English-only compliance or a low switch count.

Counts below are practical team decision thresholds, proposed in advance. They are not validated educational standards or statistical evidence of effectiveness. Preserve unsuccessful, interrupted and technically invalid attempts, explaining exclusions instead of counting only completions.

## 4. Phased roadmap

### M1 — Observe and test the first complete Developer lesson

**Outcome:** the team can describe where this learner's normal workflow breaks, whether light support helps, and what the next lesson iteration must change.

**Deliverables**

- Reviewed baseline task A and fresh comparable supported task B; optional unseen mini-probe C; a separate full task D reserved for follow-up, with independent starter states. Never reuse an exposed probe as an unseen task.
- A facilitator script, reviewed English help, a small optional support pack, and the four-outcome rubric.
- A normal-workflow baseline followed by a supported full lesson, with actual question drafts, interpretation, code change, verification and explanation.
- A short fresh probe if the learner has capacity; an explicitly recorded deferral or partial result otherwise.
- An observation log and restricted evidence references; a redacted decision memo.
- A focused prototype review and a bounded proposal for M2.

**Dependencies:** access to the first learner and their familiar tools; one facilitator; technical and language/content review responsibilities; a suitable way to keep participant evidence restricted. No application build or second program is needed.

**Evidence to move forward:** the tasks are technically appropriate; the baseline exposes a meaningful opportunity; task B yields functional question, interpretation, verification and explanation with S0–S1 at each essential stage; the facilitator has not supplied the solution. The team can identify a specific useful scaffold and explain competing causes such as better help quality or an easier task.

Proceed to M2 to check repeatability. A partial or deferred C is explicitly unresolved and cannot support a transfer claim. If a stage requires S2–S3, revise and rerun that part on a fresh task. If setup or unfamiliar programming dominates, replace the task. If the baseline already meets the target and the learner sees little value, reconsider the communication demand or learner segment.

**Detailed execution:** [first lesson protocol](first-lesson-protocol.md). The six issues in section 5 form this milestone.

### M2 — Make the lesson repeatable and choose the implementation boundary

**Outcome:** there is a stable enough lesson specification to implement, with initial evidence that the process is usable beyond the first taught example.

**Deliverables**

- A revised lesson and support pack based on M1.
- Full task D, kept unexposed during M1, on a later available occasion, with the question template initially hidden and optional aids available on request. Replace D with another fresh variant if it has been exposed.
- A second review of the actual artifacts using the same rubric; resolve consequential disagreement.
- A small versioned lesson specification and a separate attempt/evidence record.
- An explicit disposition for each reviewed prototype component and for existing learner data.
- An effort breakdown, ownership and capacity estimate for M3.

**Dependencies:** interpretable M1 evidence and a learner follow-up; the focused reuse review; technical/content reviewers. Product Management is not a dependency.

**Evidence to move forward:** another full task produces functional outcomes with S0–S1, without memorizing the earlier patch; the reduced-support result and any remaining dependence are documented. Instructions and artifacts are clear enough that another reviewer can assess them. The team has decided the first slice's runtime, persistence and feedback approach for concrete reasons.

If the fresh task fails, iterate on the identified gap. Do not expand the catalogue to compensate. A later successful task is a formative transfer signal for one person, not proof of durable learning or a general effect.

### M3 — Ship one complete Developer lesson in the application

**Outcome:** an invited learner can complete the observed workflow through a working application slice, using their existing tools for code execution.

**Deliverables**

- Task brief and expected behavior; free-text question draft and optional revision aids.
- Reviewed English answer or source excerpt, a clarification path, and interpretation before editing.
- Code-change and verification evidence capture; a short English cause/change/evidence explanation.
- Draft persistence, resume, retry and revision history; clear save failure and recovery.
- Feedback based on the rubric, initially human reviewed if needed, with “submitted” separate from “reviewed” and “outcome met.”
- Minimal event capture for stage entry, submission/revision, support use, feedback and save failures.
- One versioned lesson with starter/solution separation and reviewed technical checks.

**Dependencies:** M2 lesson and implementation decisions; named engineering and feedback owners; delivery capacity. If cloud accounts or live AI are selected, their verification and operating work are additional explicit dependencies.

**Evidence to move forward:** a learner completes the entire path without an engineer explaining navigation or repairing state. Every required artifact is recoverable after the supported interruption/reload flow. Missing evidence does not silently count as mastery. Text/code display is safe for learner-authored input, and the deployed slice matches the tested build. Human feedback requirements and turnaround are visible to the learner.

Verify the actual chosen device/browser and editor handoff. Do not claim mobile code editing, cross-device sync or automated assessment unless those paths were implemented and checked.

### M4 — Check the Developer program with additional learners

**Outcome:** the team knows which starting profile the lesson serves and which problems recur across people.

**Deliverables**

- Recruit a proposed **four additional Developer learners** with comparable practical programming familiarity, but varying English confidence, documentation habits and dependence on translation/AI.
- Run the same version with a consistent protocol; record revisions and retests separately.
- Expand only to a small path: a proposed three reviewed lessons addressing observed bottlenecks, plus an unseen checkpoint. Each lesson retains the whole workflow while changing emphasis. Reserve checkpoint variants from practice so later probes remain unseen.
- Obtain a later fresh task with reduced visible support; record invitations and actual returns separately.
- Summarize outcome-by-stage, support level, repeated blockers, authoring cost and feedback time.

**Dependencies:** usable M3 slice, recruitment and review capacity. If four additional learners are unavailable, continue formative use with the available people and state the narrower evidence; do not invent a cohort result.

**Proposed gate to a limited release:** at least 3 of the 4 new learners complete a full lesson with functional outcomes and S0–S1; at least 2 of the 4 complete a full fresh checkpoint with the same bounded support. Report the initial learner separately as longitudinal/repeat-use evidence: that learner has already seen several iterations. Count results for the same lesson version, resolve and retest repeated critical blockers, and report first attempts and retests separately. These are operational thresholds, not success-rate estimates.

These small counts expose repeated problems; they do not establish population success rates, CEFR coverage or causal learning gains. Change the gate openly if recruitment or the intended cohort changes, retaining the rationale.

### M5 — First usable Developer pilot release

**Outcome:** invited target learners can start, complete, return to and get feedback on a small useful Developer program under a sustainable support model.

**Deliverables**

- The reviewed three-lesson path and fresh checkpoint, with clear prerequisites and an example of the end result.
- A deployed entry point, tested start/resume/retry flow, explicit feedback status and a learner-visible support route.
- Versioned lesson content and attempts, release notes, rollback procedure, and a way to correct a flawed lesson without silently reinterpreting old attempts.
- A documented decision to keep the prototype separate or migrate selected content/data, with verification of any actual migration.
- Real-device checks for the supported environment; real-account and access-isolation checks if accounts/cloud are part of the release.
- An owner and measured allowance for technical maintenance, content review and learner feedback.

**Dependencies:** M4 evidence and resolved critical failures; an agreed audience/device/support boundary; capacity for ongoing delivery. Billing, public promotion, the other four tracks and a PM pilot are not dependencies.

**Evidence of release readiness:** at least two target learners can start and later resume/return through the deployed flow without navigation coaching; required evidence remains intact; feedback can be delivered within the declared service model at the proposed cohort size; critical save/recovery/assessment failures are closed or excluded by a clearly stated supported scope. Record actual delivery and return evidence.

A human-reviewed release can be usable. Describe it as a supported pilot while a human remains necessary. Wider self-service availability needs evidence that the support burden and failure handling remain acceptable. Do not infer retention from a scheduled follow-up.

## 5. First milestone: six actionable issues

All six are proposed backlog work, unassigned and undated. The documents provide drafts and source findings; they do not complete the learner-facing work.

### 1. [NOM-8 — Finalize the Developer session protocol and evidence rubric](https://linear.app/nomadenglishlearner/issue/NOM-8/finalize-the-developer-session-protocol-and-evidence-rubric)

**Acceptance criteria**

- Finalizes the workflow, baseline-before-support sequence, optional mini-probe and later full transfer plan.
- Defines functional criteria for question, interpretation, verification and explanation; keeps technical correctness and assistance separate.
- Adopts or explicitly revises 0–2 quality and S0–S3 assistance, with NE/NO for outcomes not elicited/observed; distinguishes standard English lesson input from additional rescue and includes ambiguous examples.
- Specifies language-switch logging, task-familiarity checks, stop/revise/reframe rules and how invalid attempts are retained.
- Identifies facilitator/reviewer responsibilities and a restricted location for participant evidence, with recording optional.
- Reviews the protocol with the person delivering it; estimates preparation and session capacity.

**Dependencies:** none; can overlap task preparation and preliminary prototype review.

### 2. [NOM-9 — Prepare matched debugging tasks and unseen checks](https://linear.app/nomadenglishlearner/issue/NOM-9/prepare-matched-debugging-tasks-and-unseen-checks)

**Acceptance criteria**

- Supplies separate A baseline, B supported and D full follow-up starter states with one principal defect each, expected behavior, reproduction, reviewed solution and at least an original and a boundary/regression check. If an immediate mini-probe is used, supplies a separate C that does not expose D.
- Uses the selected familiar JavaScript environment without a new framework, paid service, API credentials or deployment requirement.
- Reviews A/B comparability: code size, concept familiarity, debugging steps, reading demand and expected effort; B changes the scenario and mechanism rather than merely variable names.
- A technical reviewer demonstrates the seeded failure and successful checks without revealing the answer in learner materials.
- Documents a substitute task if preflight shows a concept is unfamiliar; Python is an alternative choice, not an additional first-release commitment.
- Tracks exposure: C is an optional mini-probe; D stays unseen for the later full check. A partially completed or exposed task is never relabeled unseen.

**Dependencies:** protocol agreement for final calibration; fixture preparation can start in parallel.

### 3. [NOM-10 — Prepare the minimal English help and support pack](https://linear.app/nomadenglishlearner/issue/NOM-10/prepare-the-minimal-english-help-and-support-pack)

**Acceptance criteria**

- Provides a task-specific reviewed English answer or accurate source excerpt, source/version attribution and a check of technical meaning.
- Includes optional question fields, a small relevant glossary, an interpretation prompt, and cause/change/evidence cues.
- Contains one prepared clarification for an underspecified question; does not silently repair the learner's request.
- Distinguishes standard English answer/source input from extra support; classifies extra aids as S1 or greater. Generic scaffolds do not reveal the defect or patch.
- Can be delivered manually with no AI integration, account or voice simulator.
- A reviewer confirms that the language and technical load fit the chosen tasks and that help quality is recorded as a potential comparison difference.

**Dependencies:** issues 1 and 2.

### 4. [NOM-11 — Run the baseline and fresh supported Developer session](https://linear.app/nomadenglishlearner/issue/NOM-11/run-the-baseline-and-fresh-supported-developer-session)

**Acceptance criteria**

- Confirms tool/technical familiarity, consent for evidence collection and chosen task variants.
- Observes A using normal tools and languages before revealing any English lesson template.
- Runs B through question, interpretation, code change, verification and explanation; captures first and revised outputs.
- Logs support and language switches with observed facts separated from the learner's report and the facilitator's interpretation.
- Runs C if feasible; otherwise records a partial/deferred check and the later full-check requirement.
- Scores or marks missing evidence for every stage; retains failures, setup problems and confounds.
- Captures a brief debrief about usefulness, burden and what the learner would use again.

**Dependencies:** issues 1, 2 and 3.

### 5. [NOM-12 — Review prototype reuse and migration for the observed lesson](https://linear.app/nomadenglishlearner/issue/NOM-12/review-prototype-reuse-and-migration-for-the-observed-lesson)

**Acceptance criteria**

- Reviews specific UI/translation, content, lesson, state/storage, account and test paths against the first-session workflow.
- Produces a table of reuse after verification / adapt / leave in prototype / unresolved, with reason, dependency and next check for every candidate.
- Checks a small sample of Developer content for technical fit; makes no commitment to port the whole catalogue.
- Documents whether existing accounts/progress need preservation and who can establish the relevant external Firebase configuration.
- Explains why authored-choice scores, target-sentence matching and XP-based reconciliation do not establish the new learning outcomes or preserve arbitrary new attempt histories.
- Identifies the smallest implementation boundary and any unresolved decision that would change it.

**Dependencies:** preliminary source review can run before the session; final recommendations incorporate issue 4 findings. It must not delay the first learner session.

### 6. [NOM-13 — Review M1 evidence and scope the repeatable lesson](https://linear.app/nomadenglishlearner/issue/NOM-13/review-m1-evidence-and-scope-the-repeatable-lesson)

**Acceptance criteria**

- Links restricted evidence and a redacted synthesis; separates observations, participant reports and hypotheses.
- Reviews all four outcomes with support levels and the technical checks, including negative/invalid results.
- Records proceed to M2 / revise and repeat / reframe, with reasons against the published gate.
- Documents fresh-probe status and remaining transfer uncertainty; creates a full follow-up task if necessary.
- Defines the smallest M2 lesson changes and the decisions deferred until more learners or a second program.
- Names responsibility roles, estimates required effort and compares it with actual available capacity before proposing dates.
- Keeps personally identifying details, raw transcripts and learner code out of public planning documents.

**Dependencies:** issues 4 and 5.

### Working order

Protocol, task preparation and preliminary reuse review can proceed in parallel. Task-specific support follows the task definition. The session precedes evidence synthesis. The synthesis selects the next repeatability trial and implementation scope.

## 6. Engineering sequence tied to learning

### First: establish the lesson and evidence

Use ordinary documents, prepared files and the learner's existing tools for M1. The investigator records artifacts manually. A small manual trial should answer whether an interface is needed at each step before that interface is designed.

In M2, define only the data needed to preserve what was actually observed:

- **Lesson definition:** stable lesson ID, content version, target workflow, technical prerequisites, fixture version, expected behavior, reviewed English source/help, allowed supports, required evidence and rubric version.
- **Attempt:** pseudonymous learner/session ID, lesson/content/rubric versions, question drafts and revisions, actual answer/source used, interpretation, code-change reference, verification before/after, explanation, assistance events and submission status.
- **Feedback:** reviewer/source, assessment per outcome, assistance context, requested revision and review status.

Keep lesson definitions separate from attempts and feedback. Preserve actual source/answer versions when help varies. Use a program identifier if needed for basic separation; do not create a universal professional ontology.

### Then: implement the full interaction, not isolated widgets

Build the smallest path through all required stages before adding a large vocabulary system or dashboard. Allow backtracking and revisions. Reveal useful English help after a meaningful request and any necessary clarification, not only after a cosmetically complete form.

Store drafts and recoverable attempts before adding cloud synchronization. A separate versioned local store is a reasonable pilot candidate if use stays on one device, provided the team reviews its limitations and evidence export. Choose cloud accounts only when the actual reviewer/learner workflow needs them; review authorization and reconciliation then.

For initial feedback, use reviewed examples, explicit check criteria and a human rubric. Track “submitted,” “review pending,” “revision requested” and “outcome met” separately. A rubric is not an automatic semantic grader.

Use the external editor/browser for execution first. Capture what was run and its result; do not treat pasted “tests passed” text as machine-verified evidence. In observed sessions the facilitator can witness it. If an unobserved release needs trustworthy execution verification, decide between explicit self-report, reviewable artifacts and a constrained execution mechanism.

Test the concrete risks introduced by this flow: text safely rendered, incomplete submission not accepted as mastery, drafts/revisions surviving reload, lesson-version traceability, clear saving errors, retry without overwriting the original, and recovery after interruption. Broaden testing only for integrations selected for release.

### Add complexity only for an observed constraint

- Live AI is justified if useful clarification or answer variation cannot be delivered well enough with reviewed material. Compare correctness, inappropriate solution disclosure, uncertainty handling, cost and fallback before selecting it.
- Integrated execution is justified by repeated editor/setup barriers or a concrete verification requirement. Do not begin with arbitrary remote code execution.
- Automated scoring is justified by measured reviewer load and a reviewed set of real valid/invalid responses. Accepting paraphrases and rejecting plausible wrong explanations must be demonstrated.
- Adaptation is justified by repeated differences in support needs and an action that reliably addresses them. A generic proficiency score is not required for manual support selection.

## 7. Focused reuse and migration decisions

| Candidate | Focus of the review | Provisional disposition |
| --- | --- | --- |
| Developer cases and explanations in content/dev.tsv and content/dev-best.tsv | Select a handful about clarification, expected/actual behavior and verification; review domain assumptions and language load. | Content reference or selective adaptation; no bulk migration. |
| Translation/vocabulary and readable code/material UI | Does the learner find and use a word aid without losing their question or code context? Does keyboard use work? | Reuse candidate, verified in the new flow. |
| Case/tone/build controllers and select/order/match practice | Can any view/control help while preserving genuinely authored input and explanation? | Reuse small rendering parts if useful; review/re-engineer the learning state and assessment. |
| Content generation and immutable baseline | Are deterministic authoring, stable IDs and provenance useful without the old case contract? | Reuse techniques; do not assume the frozen old baseline is the schema for new lessons. |
| State, track packaging, storage and Firebase reconciliation | Which existing user data actually matters? Can drafts and independent attempts be preserved? | Explicit keep-separate/migrate/archive decision; no silent reset or XP-based mastery mapping. |
| Firebase accounts and external configuration | Are cross-device use or private reviewer access required? Who controls rules/domains? | Decide after the first workflow; verify real integration if selected. |
| Tests, static delivery, styling and navigation | Which selected behaviors should survive? What new outcome and persistence risks must be tested? | Reuse relevant helpers and assets after focused checks; parity only for behavior deliberately retained. |

A separate pilot route/store can be the least expensive reversible choice, but it is a proposal pending the review. If existing users need their progress preserved in a replacement, require a documented mapping or archive plan, representative migration fixtures and rollback. Old XP or case completion must not be converted into demonstrated ask/read/verify/explain ability.

## 8. Decisions informed now versus later

**The first lesson can inform:** task difficulty and language; where the learner needs assistance; useful question fields; glossary granularity; answer length/chunking; clarification needs; external-tool handoff; evidence and feedback fields; whether written explanation is enough; the distinction between content, interface and programming blockers.

**Additional Developer learners must inform:** recurring entry profiles; support differences; self-directed usability; repeated use; evaluator consistency; feedback effort; realistic content breadth; whether the first lesson is representative.

**A tested second program should inform:** shared lesson abstractions, professional competency taxonomies, cross-program prerequisites and progress, generalized branching, shared adaptation, course/authoring administration and reusable instructor workflows. Fedor's PM exploration may produce that evidence independently. Developer can ship first.

Ordinary boundaries—versioned content, attempts, feedback and program IDs—are useful now. A common account/storage service can be chosen for immediate needs without pretending that the two programs share the same educational model.

## 9. Existing proposals: priority and trigger

| Proposal | Decision for the Developer pilot | Reconsider when |
| --- | --- | --- |
| NOM-5: A2–C1 placement | Defer the broad test. Use a short technical-familiarity and functional-English entry task. Do not assign a CEFR level from a reported exam total. | Multiple learners have distinct entry needs and the test result would change a specific next action; validate the assessment separately. |
| NOM-5: adaptation | Start with visible optional supports and manual selection, logging what helped. | Repeated learner evidence supports a useful routing rule and reviewers can identify wrong routing. |
| NOM-6: professional theory cards | At most a short optional reminder needed for the current task. Recalibrate if unfamiliar programming dominates. | A recurring concept gap can be addressed briefly without changing the program into programming instruction. |
| NOM-7: Voice Meeting Simulator | Defer beyond the written workflow. Existing speech repetition is not a validated meeting lesson. | Spoken clarification/meetings are an observed priority; test a human role-play before investing in ASR, intent models, dialogue branching or mobile model performance. |
| Subscriptions | Defer payment implementation and entitlement design. Commercial launch is outside this app roadmap. | A repeatable useful experience, operating/review cost and a concrete paid offer exist. Commercial research can run separately without blocking the lesson. |

These are sequencing recommendations. Existing proposal issues remain available; they are not declared invalid or silently closed.

## 10. Assumptions, capacity and open decisions

### Explicit assumptions

- **Staffing:** no capacity was supplied. Facilitation/product decisions, technical task review, English/content review and engineering/operations need owners. These are responsibilities, not an assumption of four hires. One person can cover several, but substantive review needs a second perspective.
- **Timing:** the first session is designed for roughly 60–75 minutes including debrief/breaks as needed, and a later full fresh check can be 15–25 minutes. These are protocol timeboxes, not project estimates. No release dates, due dates or fixed weekly sprint promises are made.
- **Learner level:** the first recruit already uses some English and familiar programming tools; task-level questioning, comprehension and explanation remain unmeasured. A reported IELTS score is background information, not a technical-English placement rule.
- **Implementation:** source inspection confirms a static modularized prototype, authored content and optional Firebase integration. Live deployment behavior, actual user volume, deployed rules, retention and learning effectiveness were not revalidated in this planning task.
- **Release model:** the recommended first release is an invited, desktop/laptop Developer pilot with external code execution and declared human feedback. If this assumption is rejected, scope must be re-estimated.

### Open decisions that materially change sequence

| Decision | Recommended starting assumption | Consequence if different |
| --- | --- | --- |
| What language/concepts does the first learner know well enough for the task? | One vanilla-JS task after preflight. | A Python-first program changes fixtures, sources and reviewer expertise; supporting both multiplies content work. |
| Is the release supported or fully self-service? | Human-reviewed feedback with clear status and capacity. | Fully automated feedback requires evaluator validation and more engineering before release. |
| Is same-device desktop use enough? | Familiar editor/browser, same-device resume. | Mobile coding, cross-device resume and offline requirements add UX, execution and persistence work. |
| Must existing prototype accounts/progress be preserved? | Keep the pilot distinct until actual data needs are established. | Replacement with migration requires data mapping, external configuration access and rollback checks. |
| Do dynamic AI responses or integrated execution solve an observed barrier? | Reviewed help and external tools first. | Adding either changes infrastructure, quality checks, costs and support responsibilities. |
| Who can recruit, facilitate, review and build, and for how many hours? | Allocate responsibilities before committing M2/M3 work. | Delivery order is constrained by the bottleneck; learner availability and feedback throughput are real dependencies. |

At the M1/M2 gates, estimate authoring/review, engineering and operations separately in person-hours or person-days, compare each with actual weekly availability, then add learner recruitment/follow-up dependencies. Record observed minutes per reviewed attempt and supported learner before choosing release cohort size. A calendar derived only from coding effort would omit the likely content and review bottlenecks.

## 11. Limits of the evidence

One learner can reveal unclear instructions, an ill-calibrated task, a missing scaffold, a broken handoff and whether one complete lesson is feasible. They can provide a first fresh-task signal and concrete implementation requirements.

One learner cannot establish a representative difficulty, a population success rate, broad English-level coverage, causal learning gains, durable retention, commercial demand or shared requirements with PM. A small additional cohort improves formative coverage but still does not establish those broader claims. A separate evaluation would be needed if the team later wants to make them.

No participant result is recorded in this roadmap. Use participant codes in public synthesis and keep identifying details, recordings and raw evidence in the restricted location chosen for the session.
