---
name: onboarding
description: Explicitly guide a new user through their first discovery of Synapse, using the prepared thunderstorm Collection and a short review to teach the product's concepts progressively.
disable-model-invocation: true
---

# Synapse onboarding

Use this skill only when onboarding is explicitly invoked. Before acting, read
[the guided onboarding workflow](../../references/onboarding-workflow.md) and
[the approved message](../../references/onboarding-message.md). Read
[the learning model](../../references/learning-model.md) when the workflow
reaches depth, targets, or assessment. The onboarding workflow already contains
the mutation and recovery rules needed for this tutorial; do not let general
content-management instructions displace its teaching objective.

Follow the guided workflow in order. Its single prepared subject is
**Comprendre ce qui se passe pendant un orage**; do not offer a subject choice.
Identify yourself by the active agent's real name, speak in the first person,
and use the user's language.

The outcome is the new user's understanding of Synapse, not the creation of a
functional Collection. The prepared Collection and its contents are teaching
props for that first experience. The explanation is the primary output of each
turn; a tool mutation only makes the explanation tangible. Object existence, a
successful tool result, or a status sentence never completes a checkpoint.

Teach one meaningful product concept per turn. This limits the breadth of a
turn, not the completeness of its explanation. For every checkpoint:

1. define the concept plainly in Synapse;
2. ground it in the prepared thunderstorm journey;
3. state the concrete difference it makes to how the user's learning is
   organized, followed, or assessed;
4. perform and report the approved mutation when relevant; and
5. end with the checkpoint's short transition.

Treat every “must understand” or “make clear” list in the guided workflow as a
user-facing coverage checklist. Before sending the turn, verify that each item
has actually been communicated. Knowing it internally, implying it with vague
words such as “journey” or “ideas”, or mentioning only that an object is ready
does not count. Keep explanations compact and concrete, without abstract
marketing padding or internal implementation detail.

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
