# NomadEnglishLearner — first Developer lesson protocol

Status: proposed protocol to finalize and dry-run under M1. No participant results have been collected.
Parent plan: [Developer roadmap](developer-roadmap.md).

## Purpose

Find out whether a small amount of support helps a learner who already knows the programming basics complete this workflow:

**Ask a useful question in English → interpret English help → apply and verify a fix → explain the result.**

Observe the learner's usual workflow first. The aim is useful English work with understandable reasoning, not perfect grammar or a ban on Russian.

Use a participant code such as P01 in the planning/evidence index. Do not put identity, exam scores, recordings or personal code into this public repository. The facilitator chooses a restricted evidence location and checks what the learner agrees to share. Notes are sufficient if recording is unwanted.

## 1. Preparation checklist

### People and environment

- Identify a facilitator, a technical task reviewer and a person able to review the English/help material. One person may hold several responsibilities, with a second perspective on the fixtures and assessment.
- Use the learner's usual editor, browser/devtools and computer where possible.
- Confirm which parts of vanilla JavaScript the learner actually uses. Choose Python only if it is demonstrably the better first-task fit.
- Prepare local files that work without package installation, unfamiliar framework, external API credentials, deployment or paid service.
- Check the runtime and expected behavior before the learner arrives. Do not treat setup time as language performance.

### Separate task states and exposure control

| Task | Purpose | Requirements |
| --- | --- | --- |
| A | Natural baseline | One small bug, familiar constructs, clear expected behavior; normal tools and languages allowed. |
| B | Fresh supported full lesson | Similar technical/reading load, different scenario and defect mechanism; a reviewed English help path and objective verification. |
| C | Optional immediate mini-probe | A fresh short task; supports initially hidden. It is separate from D. |
| D | Later full transfer task | Kept unexposed during M1; a fresh whole-loop task on a later available occasion. If exposed, replace with another fresh variant. |

For each task retain: starter, task brief, expected/actual behavior, reproduction input, principal defect, solution, original failing check, a boundary/regression check, reviewer notes and version. Keep facilitator solutions separate from learner starters.

A and B should be similar in code size, number of concepts, debugging steps, English reading demand and likely effort. The technical reviewer records why they are comparable; exact equivalence is not assumed.

Illustrative candidates are a local contact-search defect involving a return value and a small total-calculation defect involving form input. They are alternatives to review, not approved fixtures or a claim that they are equally difficult. Avoid unfamiliar database, authentication or deployment concepts merely because they appear in the prototype. Use a substitute if preflight shows a missing programming prerequisite.

### English support pack

Prepare only what is needed for B:

1. An optional question checklist.
2. A small glossary of task-relevant terms, with individual-word translations if useful.
3. A reviewed English answer or short source excerpt with attribution and version.
4. One prepared English clarification for missing context.
5. An interpretation prompt and a verification/explanation prompt.

Do not use a complete worked version of B as the generic language scaffold. The standard reviewed English answer/source is lesson input, not S2–S3 rescue: it may identify the technical mechanism. The learner must still interpret it and choose/apply/check the change. S2–S3 record extra assistance that performs this remaining learner work, including wholesale translation or a facilitator selecting/applying the patch. Record the actual answer and whether it already supplied code; a copied patch alone never demonstrates understanding.

Use a human-selected reviewed reply before integrating a live AI tutor. If the learner uses an external model during the baseline, record the actual answer and language used. Differences in answer source or quality are a comparison limit, not evidence that the scaffolding alone caused a result.

## 2. Run of session

Target roughly 60–75 minutes with a break or split session if needed. These are observation timeboxes, not a speed test. Stop for fatigue, distress, setup failures or loss of interpretability. The later full fresh task is a separate 15–25-minute design assumption to confirm with the learner.

### A. Familiarity and setup — around 5–10 minutes

Ask the learner to show how they normally run and inspect small code and describe their familiar work. Russian is acceptable.

Confirm that they can edit/run the starter, understand the expected behavior, and recognize the relevant constructs without teaching the defect. Ask about preferred help sources and current language choices.

If they cannot use the required concept even with a Russian explanation, choose another task. This experiment should not quietly become a test of new programming knowledge.

### B. Baseline task A — around 15 minutes

Suggested instruction:

> Fix this as you normally would. Use your usual tools and whichever language you normally use.

Observe without introducing the question template or asking for English output. Let searches, AI, documentation, translation and normal copying occur. Record any assistance the facilitator supplies; if it becomes substantial, mark the comparison accordingly.

Capture:

- How the learner identifies and reproduces the problem.
- The first search/help request, if any.
- Expected versus actual behavior and the context supplied to the helper.
- Help source, language and actual answer/excerpt.
- Language switches and preceding events.
- The chosen change, what the learner checks, and what they use as evidence of success.

Do not require continuous think-aloud: it can change the workflow. Take notes and ask short retrospective questions at natural pauses.

If the learner solves A unaided without any need for help, that is valid evidence. Do not force artificial confusion; select a relevant communication task for a later iteration.

### C. Baseline debrief — around 5 minutes

Use specific moments:

- What made you switch language here?
- What were you trying to understand or express?
- Which part of that answer did you trust, and why?
- How did you decide the fix was finished?
- Was the obstacle English, code knowledge, the tool, the answer, or simply convenience?

Keep observations distinct from the learner's explanation and your hypothesis. A switch to Russian can be efficient and deliberate. If the baseline already accomplishes the target, document the lack of an evident problem for this learner.

### D. Fresh supported task B — around 20–25 minutes

1. **Reproduce.** Open a clean B starter. Ask for expected and actual behavior.
2. **Draft.** Ask the learner to write their own English help request. Save it before offering support.
3. **Revise.** Offer the question checklist and glossary. Save the revision and the support used.
4. **Receive help.** Give the reviewed English reply or source once the request is answerable. If essential context is missing, use the prepared English clarification and let the learner supply it.
5. **Interpret before editing.** Ask which statement matters, what it means here, and what change they expect to try. Retain their words.
6. **Apply.** Let the learner edit the code in the normal environment. Keep the diff or before/after.
7. **Verify.** Have them reproduce the initial failure and rerun that check after the change, then select/run a relevant boundary or regression case.
8. **Explain.** Ask for a short English explanation covering cause, change and evidence.

A sensible question need not be long. A concise request with all necessary context is better than mechanically filling every field with irrelevant detail. A clarification question is an acceptable part of communication, not automatically a failed request.

The learner may look up words or ask for help. Record assistance instead of hiding it. If a full Russian explanation or a supplied patch is necessary, help them complete the activity if useful, but score the dependence honestly.

### E. Fresh mini-probe C — around 5–10 minutes if feasible

Start with the question template hidden. Use an unseen mini-task and ask for:

- An English help request in the learner's own words.
- The interpretation of a short English response.
- The checks they would run.

If there is enough time and energy, complete the actual change, tests and explanation too. Otherwise mark the probe **partial**: planned checks are not executed verification, and partial success is not full-loop transfer.

Do not squeeze it in if fatigue makes the result uninterpretable. Record a deferred check and use reserved full task D on a later available occasion before the M2 build gate. Never reuse C as an unseen follow-up, even if C was only partly attempted.

### F. Closing debrief

Ask what helped, what felt artificial, which support they would use again, and what they would remove. “Would you use this?” is a report of intention; do not count it as an actual return.

If the public prototype is shown for interface observation, do that after the baseline and supported comparison, or in a separate session, so it does not prime A. Keep observations of its navigation, vocabulary and cases separate from the new lesson outcome.

## 3. Ready-to-use generic prompts

### Question checklist

Offer after the first B draft:

- What are you trying to do?
- What should happen?
- What happens instead? Include the relevant error or output.
- What is the smallest useful piece of code and the input that reproduces it?
- What have you tried, if relevant?
- What exactly do you need explained or checked?

Optional sentence starters:

> I expected …, but … happens when …
>
> Here is the relevant code and input: …
>
> I tried …, and the result was …
>
> Could you explain why … and what I should check?

These are generic language aids. Do not fill them with B's diagnosis or expected patch.

### Clarification

> What input produces the problem, what output did you expect, and what output did you get?

Adapt only to genuinely missing context; record the exact clarification.

### Interpretation before editing

> Which sentence in the answer is relevant here? Explain what it means for this code. What will you try, and what result do you expect?

The learner may use imperfect English. If meaning is unclear, a short Russian diagnostic explanation can identify whether the problem is expression or understanding, but it is recorded as additional support and does not replace the English outcome.

### Verification and explanation

> Show the case that failed before. What happens after your change? What other input should you check?
>
> The cause was … I changed … I checked … The result was … I still have not checked …

An honest limit is better than claiming that a fix is universally correct.

## 4. Artifact rubric

Score each elicited, attempted outcome 0, 1 or 2, then separately record the highest assistance level and exact assistance event. Use NE = not elicited and NO = not observed for missing opportunities/evidence. A natural baseline that never requires an English question or explanation cannot establish a deficit in those skills. Do not turn the four scores into a pass percentage or reuse prototype XP.

| Outcome | 0 — absent/materially incorrect | 1 — incomplete | 2 — functional |
| --- | --- | --- | --- |
| Question | A helper cannot identify the problem or the request misstates it. | The intent is visible but a consequential input, symptom, context or question is missing. | An English-speaking helper can identify expected/actual behavior, inspect the necessary evidence and answer or ask a normal targeted clarification without invented context. |
| Interpretation | The learner cannot identify the relevant meaning or proposes an incompatible action. | Identifies part of the answer but cannot connect mechanism and action reliably. | Explains the relevant statement in their own words and maps it to a plausible change in this code, including a relevant limitation where applicable. |
| Verification | No relevant check, or a broken change is declared fixed. | Only a weak happy-path check, no baseline failure, or an important uncertainty is hidden. | Shows the original failure, the post-change result and an appropriate boundary/regression check; explains what the evidence establishes. |
| Explanation | Cannot communicate the cause/change/evidence, or materially misrepresents it. | Some necessary meaning remains ambiguous or unsupported. | Gives an intelligible English account of cause, change and observed verification, distinguishing remaining uncertainty. |

The implementation must satisfy the task's technical checks. Keep a separate note if the explanation is adequate but the patch is broken, or vice versa.

## 5. Assistance scale

| Level | Examples | Interpretation |
| --- | --- | --- |
| S0 | Learner independently drafts, reads, edits and checks. | Independent within the task/environment. |
| S1 | Optional generic checklist, small glossary/word lookup, reread/highlight cue, generic reminder to show evidence. | Light support; allowed by the proposed pilot gate. |
| S2 | Sentence-level translation, repeated rewriting, specific debugging hint, explanation of an unfamiliar concept. | Substantial support; useful diagnostic outcome, not a light-support success. |
| S3 | Facilitator supplies the diagnosis, patch, complete question or explanation. | Assisted completion; does not demonstrate the corresponding learner capability. |

Treat the standard answer/source as recorded lesson input, not as an assistance event merely because it explains the cause. Record additional support by stage. A glossary used while writing does not imply that verification was assisted. Mark use of AI or a copied answer and whether the learner independently interpreted and tested it. Tool use is context; supplying the missing learner work is the relevant distinction.

## 6. Observation log template

Use one record per meaningful event or assistance request:

| Field | What to record |
| --- | --- |
| Participant/session/task | Pseudonymous ID, A/B/C/D, fixture/material version and prior exposure. |
| Stage and relative time | Reproduction, question, help, interpretation, edit, verification, explanation. |
| Observed action | Factual action, artifact reference, relevant output. |
| Language/source | Language before/after, help tool or source, exact answer reference. |
| Trigger and purpose | What preceded the switch/support request; participant's own account when known. |
| Support | S0–S3, exact cue/help, who initiated it. |
| Outcome | What changed afterwards; unresolved obstacle. |
| Classification | Language, technical prerequisite, source quality, tool/UI, habit/preference, fatigue or unknown. |
| Evidence quality | Directly observed, learner report, observer interpretation, missing or invalid. |

Collect the first question and revisions, help/source, interpretation, code change, before/after check results, English explanation and support events. Keep a restricted index rather than scattering raw transcripts through project issues.

Record elapsed time as friction evidence, not a claim about language-learning speed or developer productivity. Log the facilitator's work and review minutes too: those become release-capacity inputs.

## 7. Gate memo template

### Session validity

- Familiarity confirmed or task changed:
- Fixture/material versions:
- Setup/fatigue/technical knowledge confounds:
- Differences between A and B:
- Missing evidence and reasons:

### Results

For each of question, interpretation, verification and explanation: baseline evidence; supported evidence; 0–2 score or NE/NO; assistance; exact artifact references. Mark C as full, partial or deferred. Reserve unexposed D for the later check; report repeated participation separately from new learners.

### Decision

Choose one:

- **Proceed to M2:** the core task was valid, a relevant baseline opportunity was observed, all four B outcomes were functional with S0–S1, and no facilitator supplied the missing solution/meaning. The next step checks repeatability and unresolved transfer.
- **Revise and repeat:** technical mismatch, bad help, interface failure, consequential missing evidence, solution-revealing scaffold, or S2–S3 at a core step. Name the cause and change one or a few relevant factors before using another fresh task.
- **Reframe:** the target workflow already works without useful added support, the learner sees no relevant need, or repeated appropriate trials do not support the proposed value.

### Next step and ownership

State the smallest lesson change, the later full fresh-task requirement, the component review needed, reviewer/facilitator/engineering responsibilities and capacity. List uncertainties that require more learners separately from questions that can be resolved by correcting the current task.

Do not label a within-session improvement a causal learning gain. Different tasks, help sources, order effects and practice all limit that conclusion. A later fresh task adds useful evidence, but one learner still cannot establish general effectiveness.
