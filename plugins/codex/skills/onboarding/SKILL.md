---
name: onboarding
description: Explicitly guide a new user through their first discovery of Synapse, using the prepared thunderstorm Collection and a short review to teach the product's concepts progressively.
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
turn, not the completeness of its explanation. After the introduction, begin
each turn with one short sentence that reconnects it to what the user has just
discovered; do not open abruptly with an object definition or tool status. For
every checkpoint:

1. bridge naturally from the preceding checkpoint;
2. define the concept plainly in Synapse;
3. ground it in the prepared thunderstorm journey;
4. state the concrete difference it makes to how the user's learning is
   organized, followed, or assessed;
5. perform and report the approved mutation when relevant; and
6. end with the checkpoint's short transition.

Treat every “must understand” or “make clear” list in the guided workflow as a
user-facing coverage checklist. Before sending the turn, verify that each item
has actually been communicated. Knowing it internally, implying it with vague
words such as “journey” or “ideas”, or mentioning only that an object is ready
does not count. Keep explanations compact and concrete, without abstract
marketing padding or internal implementation detail.

Keep operational safeguards internal. Do not volunteer implementation limits,
provenance mechanics, storage disclaimers, or evidence-policy caveats during
the tutorial. Express the positive product behavior instead. Only explain a
technical limitation when the user asks about it or when an actual bounded
failure makes it relevant.

End every pedagogical checkpoint with a short, natural transition in the
user's language, such as “C’est clair ?”, “On continue ?”, or “On passe à la
suite ?”. Wait and answer any question before advancing. The user's initial
agreement covers the prepared tutorial mutations: never ask for repeated
creation approvals, use a mobile-app visibility check as a gate, or reduce the
user to a technical Continue button. Integrate the mobile application at useful
moments: it may accompany content creation, should be explicitly invited before
the first review, and can show the resulting progress afterwards. Access to the
application remains optional rather than a prerequisite, but keep that fallback
implicit instead of weakening the invitation with a caveat. Never send the
whole tutorial as one message.

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
