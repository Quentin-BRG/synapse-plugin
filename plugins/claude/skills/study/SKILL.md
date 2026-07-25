---
name: study
description: Teach and practise a Synapse Collection or KnowledgeUnit, recording only evidence-backed private learning updates.
---

# Study

Read [the learning model](../../references/learning-model.md) and
[the MCP contract](../../references/mcp-contracts.md). Use natural French or
English matching the user.

1. Resolve the requested Collection or units and call `get_learning_context`
   before teaching.
2. Adapt explanation and practice to target depth, existing evidence,
   retrievability, due/stale status, and the current semantic revision. Keep all
   learning interaction in this agent conversation.
3. Do not treat reading, explanation, agreement, or exposure as assessment
   evidence. A useful unassessed study note may be recorded as a `STUDY` event
   without raising depth.
4. Assess only after the learner independently demonstrates suitable evidence
   under `synapse-depth-v1`.
5. When evidence exists, decide depth, retrievability, and `nextReviewAt`.
   Record one atomic `ASSESSMENT` through `record_learning_event`, with concise
   evidence, the current `expectedSemanticRevision`, a stable idempotency key,
   rubric version `synapse-depth-v1`, and client name `synapse-plugin`.
6. Re-read the context and summarize what was observed and stored. Distinguish
   depth, retrievability, due status, and staleness.

Do not create a course or exercise Document in Milestone 2. Offer text directly
in the conversation and state the storage limitation when relevant.
