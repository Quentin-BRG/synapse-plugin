---
name: create-collection
description: Create a new Synapse Collection for a course, topic, project, curiosity, or other learning journey from the user's goal and optional sources.
---

# Create a Collection

Read [the content workflows](../../references/content-workflows.md) and
[the learning model](../../references/learning-model.md). Respond naturally in
the user's language.

1. Understand what the user wants to learn, why it matters to them, and which
   sources are available. Do not ask for or infer a fixed learning style. If a
   remote source cannot be inspected, ask for a transcript, file, or relevant
   extract rather than pretending to have read it.
2. Resolve organizational placement only when needed. A Folder organizes root
   Collections; a child Collection represents a genuine pedagogical
   decomposition. Choose a coherent Collection boundary: not one isolated fact
   and not an unbounded field.
3. Propose one concise structure: title and description, Documents, natural
   user-facing Knowledge, justified depth ceilings, source references, and
   private target levels. A broad learning scope should be divided into several
   independently assessable items. Never design high levels by widening an
   item's responsibility beyond its actual scope.
4. Ask for approval of the structure. After approval, create the Collection
   and any approved Documents, then use `create_knowledge_units` in bounded
   idempotent batches and `set_learning_targets`. Use the direct upload helper
   for supported local files. External provenance is structured metadata only;
   Synapse does not fetch or preserve the remote page or video.
5. Re-read the result and state exactly what was stored. Creating content or a
   target never proves that it has been learned, so do not fabricate assessed
   progress.

Say **Connaissance** in French, **Knowledge** in English, and translate
naturally in other languages. Never present `KnowledgeUnit` as the name of a
product object. Mention that the structure is visible in the mobile
application; sharing can be configured there, while every learner's progress
remains private.
