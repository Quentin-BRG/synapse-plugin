---
name: validate-review
description: Evaluate observable work from a Synapse review, exercise, photo, file, or production and update the user's private progress with evidence-backed events.
---

# Validate a review

Read [the learning model](../../references/learning-model.md) and
[the learning workflows](../../references/learning-workflows.md). Match the
user's language.

1. Resolve the Collection and relevant Knowledge with
   `get_learning_context`. Inspect the work available to the active agent:
   answers from a review together, a photo of a paper exercise, a file, a
   production, or another observable result. If the evidence is missing or
   unreadable, ask for it. A statement that revision happened is insufficient.
2. Map evidence separately to each Knowledge. Assess only what the work
   demonstrates under `synapse-depth-v1`; respect the current semantic revision
   and hard depth ceiling. Do not widen a Knowledge or borrow the Collection's
   broader scope to manufacture levels 4 or 5.
3. Decide the supported depth, internal retrievability, and `nextReviewAt`.
   Explain the proposed user-visible progress update concisely before writing
   when the mapping is not obvious.
4. Use `record_learning_event` for one item or `record_learning_events` for up
   to 100 independently atomic items. Include concise observed evidence, event
   type `REVIEW`, current `expectedSemanticRevision`, rubric version
   `synapse-depth-v1`, the active client name, and stable per-item idempotency
   keys. Inspect every batch result and retry only failed items with unchanged
   keys.
5. Re-read context and report exactly what changed, what could not be assessed,
   and what will appear in **À revoir**. Explain depth naturally and do not
   expose retrievability unless the user asks for technical detail.

Use **Connaissance** in French, **Knowledge** in English, and an equivalent
natural translation elsewhere. Never reveal another learner's private state,
schedule, evidence, or history, including in a shared Collection.
