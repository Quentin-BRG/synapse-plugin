---
name: update-collection
description: Update an existing Synapse Collection by changing its presentation, adding or editing learning content, or attaching new sources without inventing progress.
---

# Update a Collection

Read [the content workflows](../../references/content-workflows.md) and
[the learning model](../../references/learning-model.md). Use the user's
language and natural terminology.

1. Resolve the exact Collection and call `get_collection_contents` or
   `get_learning_context` as needed. Clarify whether the user wants to rename or
   redescribe, move, archive, or restore it; add, edit, move, archive, or
   restore Knowledge; add, update, move, archive, or restore Documents; or
   combine these changes. Use `list_documents` when Document discovery is the
   goal.
2. Inspect available material. Preserve user-provided sources as `ORIGINAL` and
   agent-authored derived notes as `GENERATED`. A URL is optional structured
   provenance only; the Synapse server does not fetch it.
3. Present a concise change preview. For every edited Knowledge, classify the
   change as `EDITORIAL` only when its meaning and assessment boundary are
   unchanged; otherwise use `SEMANTIC` and explain that existing progress will
   become stale until reassessed, without being erased.
4. After approval, use the narrow operation that matches the preview:
   `update_collection`, `move_collection`, `archive_collection`, or
   `restore_collection` for the Collection;
   `update_knowledge_unit`, `move_knowledge_unit`,
   `archive_knowledge_unit`, or `restore_knowledge_unit` for Knowledge; and
   `update_document`, `move_document`, `archive_document`, or
   `restore_document` for Documents. Use the creation and source tools for
   additions. Supply current expected revisions where required and stable
   idempotency keys.
   Never use a content edit to smuggle in a broader assessment responsibility;
   create separate Knowledge when the new capability deserves its own scope.
5. Re-read the Collection and summarize applied changes, semantic staleness,
   and any bounded failure. Content edits and additions do not themselves
   change assessed progress.

Say **Connaissance** in French and **Knowledge** in English; never expose
`KnowledgeUnit` as the product object's name. The user can follow changes and
manage Collection sharing in the mobile application, while learning progress
and history stay private to each learner.
