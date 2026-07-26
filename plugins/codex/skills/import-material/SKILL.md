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
2. Inspect the supplied material locally. For a supported file, collect its
   exact byte size and MIME type and plan to preserve it as an `ORIGINAL`
   Document through the shared direct-file flow. For pasted text that should
   be preserved, plan an `ORIGINAL` text Document.
3. Segment only independently assessable free-text KnowledgeUnits. Assign each
   a justified depth ceiling and propose private targets from the user's
   purpose.
4. Present one concise bulk preview covering Collection changes, Documents,
   tags, units, source links, ceilings, targets, and anything that cannot be
   stored. Ask for one approval.
5. After approval, use `create_collection` when needed. Store approved source
   material with `create_text_document` or the direct upload helper flow, and
   confirm `AVAILABLE` before claiming preservation.
6. Use `create_knowledge_units` in bounded idempotent batches with source
   references to same-Collection Documents, then `set_learning_targets`.
7. Re-read and summarize the stored result. Creating Documents, units, source
   references, or targets never sets assessed depth, retrievability, or
   evidence.

If file access, helper execution, MIME validation, or upload completion fails,
state exactly what was not stored. Never fabricate `ORIGINAL` provenance.
