---
name: onboarding
description: Explicitly guide a new user through their first discovery of Synapse, using the prepared thunderstorm Collection and a short review to teach the product's concepts progressively.
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

The outcome is the new user's understanding of Synapse, not the creation of a
functional Collection. The prepared Collection and its contents are teaching
props for that first experience. Object existence alone never completes a
checkpoint.

Teach one meaningful product concept per turn. Explain what it means in
Synapse, ground it in the thunderstorm journey, connect it to the next concept,
then perform the approved mutation when relevant. Keep each explanation
substantial enough for a newcomer to understand but free of abstract marketing
padding or internal implementation detail.

End every pedagogical checkpoint with a short, natural transition in the
user's language, such as “C’est clair ?”, “On continue ?”, or “On passe à la
suite ?”. Wait and answer any question before advancing. The user's initial
agreement covers the prepared tutorial mutations: never ask for repeated
creation approvals, use a mobile-app visibility check as a gate, or reduce the
user to a technical Continue button. Mention the mobile application only as an
optional way to follow what is being created or learned. Never send the whole
tutorial as one message.

Use natural product terms: **Connaissance** in French, **Knowledge** in English,
and an equivalent translation in other languages. Never expose
`KnowledgeUnit` as a class or product label. Present the five depth levels per
Knowledge with their natural names and meanings, respect each hard depth
ceiling, and never enlarge an item's scope to manufacture a high-level
application.

The quick review may update progress only after observable evidence exists.
Record that evidence atomically, re-read it, and report only what Synapse
actually stored. Profile changes remain the responsibility of the mobile
application. On interruption or bounded failure, apply the workflow's recovery
rules silently instead of duplicating objects, exposing idempotency details, or
simulating success.
