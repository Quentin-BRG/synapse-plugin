---
name: review
description: Review due, stale, or selected Synapse knowledge through retrieval-first evidence and atomic private LearningEvents.
---

# Review

Read [the learning model](../../references/learning-model.md) and
[the MCP contract](../../references/mcp-contracts.md). Use natural French or
English matching the user.

1. Use `list_due_knowledge_units` for a due session, or
   `get_learning_context` for an explicit selection. Prioritize stale, due,
   inaccessible, and effortful items while respecting the user's scope.
2. Ask for retrieval or application before substantive cues. Match the target:
   recognition at level 1, free retrieval at level 2,
   explanation/distinction at level 3, representative application at level 4,
   and novel transfer/limitations at level 5.
3. Give feedback, then decide assessed depth, retrievability, and
   `nextReviewAt` from the observed evidence and prior history. A failed
   retrieval need not lower depth; time alone never changes depth or
   retrievability.
4. Record exactly one `REVIEW` event per assessed KnowledgeUnit through
   `record_learning_event`, including concise evidence, the current
   `expectedSemanticRevision`, `synapse-depth-v1`, a stable idempotency key,
   and client name `synapse-plugin`.
5. Re-read updated context and end with a concise session summary that keeps
   depth, retrievability, due status, and semantic staleness distinct.

Never reveal or infer another user's LearningState or LearningEvents.
