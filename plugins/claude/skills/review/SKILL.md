---
name: review
description: Help the user revise due, stale, or selected Synapse knowledge with the method they choose, without silently assessing or updating progress.
---

# Review

Read [the learning model](../../references/learning-model.md) and
[the learning workflows](../../references/learning-workflows.md). Use natural
French or English matching the user.

1. Use `list_due_knowledge_units` when the user asks what is due, or
   `get_learning_context` for a selected scope. Explain that the **À revoir**
   list in the mobile application provides a starting point, while the user
   remains free to revise any Collection whenever they want.
2. Ask how they want to revise, or propose one low-friction method that fits the
   material: recall, explanation, questions, flashcards, exercises, discussion,
   or another method requested by the user. Do not impose a learning style.
3. Run the revision progressively. When an activity is assessment-like, ask for
   retrieval or application before substantive cues and keep every task within
   the selected Knowledge's depth ceiling. Use **Connaissance** in French,
   **Knowledge** in English, and never expose `KnowledgeUnit` as a product name.
4. Give useful feedback, but do not silently call `record_learning_event` or
   `record_learning_events`. Revision and validation are separate moments.
5. At the end, summarize what was worked on and offer a short validation step.
   If the user asks to assess the observable work and update progress, continue
   with the `validate-review` workflow. If they decline, nothing is recorded.

Never reveal or infer another user's private progress or history. Time alone
never lowers assessed depth.
