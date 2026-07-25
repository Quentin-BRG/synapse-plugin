---
name: import-material
description: Import user-provided text, notes, or locally inspectable material into Synapse as independently assessable KnowledgeUnits without inventing progress.
---

# Import material

Read [the learning model](../../references/learning-model.md) and
[the MCP contract](../../references/mcp-contracts.md). Respond naturally in
French or English according to the user.

1. Resolve the target with `list_collections`/`get_collection`, or propose a
   new Collection.
2. Inspect the supplied material locally. For a file, apply the explicit
   Milestone 2 text-only boundary: disclose that the original cannot yet be
   stored and never imply `ORIGINAL` provenance was persisted.
3. Segment only independently assessable free-text KnowledgeUnits. Assign each
   a justified depth ceiling and propose private targets from the user's
   purpose.
4. Present one concise bulk preview covering Collection changes, units,
   ceilings, targets, and anything not stored. Ask for one approval.
5. After approval, use `create_collection` when needed,
   `create_knowledge_units` in bounded idempotent batches, and
   `set_learning_targets`.
6. Re-read and summarize the stored result. Creating units or targets never
   sets assessed depth, retrievability, or evidence.

Source references, preserved original files, and generated Documents remain
unavailable until Milestone 3. Fail clearly instead of inventing those writes.
