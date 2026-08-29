# Synapse learning workflows

Use these rules when revising or validating work against stored Synapse
knowledge. Read [the learning model](./learning-model.md) for the rubric,
terminology, and hard scope boundaries.

## Context and evidence

- `get_learning_context` loads KnowledgeUnits, the authenticated user's private
  LearningStates, recent private events, semantic revisions, and optional source
  references.
- `list_due_knowledge_units` loads bounded due or stale work.
- `get_document` and `get_document_download` retrieve a source only when it is
  needed for the current interaction. Never expose its signed URL.

Load context before teaching or writing state. Reading, explanation, agreement,
exposure, content creation, and a target are not assessment evidence.

## Revision and validation are distinct

A revision session helps the user retrieve, understand, practise, or apply
knowledge using the method they choose. It does not silently update progress.
When the user finishes, offer to evaluate the evidence and update Synapse. If
they accept, or if they directly ask for evaluation, follow the validation
workflow.

Validation may use anything the active agent can genuinely inspect: answers in
the conversation, a review completed together, a photo of a paper exercise, a
file, a production, or another observable result. A statement such as “I
revised” or “I understood” is not enough. Map evidence to each relevant
Knowledge independently and never infer progress for neighboring items.

## Atomic learning writes

`record_learning_event` appends one private event and applies its state patch in
one transaction. For `ASSESSMENT` and `REVIEW`, include concise observed
evidence, the current `expectedSemanticRevision`, rubric version
`synapse-depth-v1`, a client name identifying the active host, and a stable
idempotency key.

`record_learning_events` accepts at most 100 independently atomic events and
returns one success or failure per input item in order. Use it for multi-unit
review sessions. Inspect every result, report partial failures, and retry only
failed items with their unchanged idempotency keys.

The agent chooses evidence, depth, retrievability, and `nextReviewAt`. The
server validates permissions, revisions, bounds, consistency, transactions,
and idempotency. A failed retrieval may change retrievability or scheduling
without automatically lowering depth.

Re-read the context after a write. Keep depth, retrievability, due status, and
semantic staleness distinct internally. In the user-facing summary, explain the
observed depth and next useful step plainly; do not expose retrievability as a
product concept unless the user asks for technical detail.

Synapse's **To review** list is derived from each user's private schedule. The
mobile application shows items when they become due.
Never say that the passage of time lowered their assessed depth. A shared
Collection keeps this schedule, evidence, and progress private to each learner.

LearningState, targets, schedules, evidence, and LearningEvents are private to
the authenticated user, including in shared Collections. Never reveal or infer
another user's state.

If a required tool is missing or the server returns `INSUFFICIENT_SCOPE`,
`FORBIDDEN`, `NOT_FOUND`, `STALE_REVISION`, or `IDEMPOTENCY_CONFLICT`, explain
the bounded failure and do not simulate a successful write.
