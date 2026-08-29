---
name: onboarding
description: Explicitly guide a new user through Synapse by building and reviewing the prepared first Collection about what happens during a thunderstorm.
---

# Synapse onboarding

Use this skill only when onboarding is explicitly invoked. Before acting, read
[the guided onboarding workflow](../../references/onboarding-workflow.md),
[the approved message](../../references/onboarding-message.md),
[the learning model](../../references/learning-model.md), and
[the content workflows](../../references/content-workflows.md).

Follow the guided workflow in order. Its single prepared subject is
**Comprendre ce qui se passe pendant un orage**; do not offer a subject choice.
Identify yourself by the active agent's real name, speak in the first person,
and use the user's language.

Keep the experience conversational and progressive. Introduce one meaningful
concept, perform only the approved mutation for that checkpoint, say what the
user can inspect in the mobile application, and wait for their response before
continuing. Never send the whole tutorial as one message.

Use natural product terms: **Connaissance** in French, **Knowledge** in English,
and an equivalent translation in other languages. Never expose
`KnowledgeUnit` as a class or product label. Present the five depth levels per
Knowledge, respect each hard depth ceiling, and never enlarge an item's scope
to manufacture a high-level application.

The quick review may update progress only after observable evidence exists.
Record that evidence atomically, re-read it, and report only what Synapse
actually stored. Profile changes remain the responsibility of the mobile
application. On interruption or bounded failure, apply the workflow's recovery
rules instead of duplicating objects or simulating success.
