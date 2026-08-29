# Guided onboarding workflow

This reference defines the first Synapse experience. Follow it progressively:
one meaningful concept per message, then a short question or explicit pause.
Do not dump the whole tutorial at once. Use the user's language and the natural
user-facing terminology defined in [the learning model](./learning-model.md).

## Prepared learning content

The tutorial has one subject. Do not present alternatives or describe it as a
preferred option.

- Collection: **Comprendre ce qui se passe pendant un orage**
- Description: **Une première Collection pour découvrir Synapse à travers
  l’éclair, le tonnerre et l’estimation de leur distance.**
- Purpose: introduce Synapse through a small but genuinely multi-knowledge
  learning journey.
- Scope: lightning, thunder, the difference between light and sound travel,
  approximate distance, and the rolling sound of thunder.

Use a natural translation outside French.

Create one `GENERATED` Markdown Document titled **L’éclair et le tonnerre**.
Use this canonical French content, translated naturally when the user uses
another language:

```markdown
# L’éclair et le tonnerre

## D’où vient le tonnerre ?

Un éclair chauffe l’air qui l’entoure de manière extrêmement rapide. L’air se
dilate alors brutalement et crée une onde de choc : c’est le tonnerre.

## Pourquoi voit-on l’éclair avant d’entendre le tonnerre ?

La lumière se propage si vite que, à l’échelle d’un orage, elle nous parvient
presque instantanément. Le son avance beaucoup moins vite dans l’air, autour de
340 mètres par seconde : il arrive donc après.

## Estimer la distance d’un éclair

Comptez les secondes entre l’éclair et le tonnerre, puis divisez ce nombre par
trois pour obtenir une distance approximative en kilomètres. Un délai de neuf
secondes correspond ainsi à environ trois kilomètres.

Cette estimation reste approximative, notamment parce que la vitesse du son
varie avec la température. Elle indique la distance jusqu’à l’éclair observé,
pas les limites exactes de l’orage.

## Pourquoi le tonnerre peut-il gronder ?

Un éclair s’étend le long d’un canal. Le son produit à différents endroits de
ce canal ne parcourt pas la même distance jusqu’à nous et arrive à des moments
différents, ce qui contribue au roulement du tonnerre.

## Sécurité

Ce calcul n’est pas une règle de sécurité. Si vous entendez le tonnerre,
mettez-vous à l’abri dans un bâtiment fermé ou un véhicule à toit rigide.

## Sources

- NOAA National Severe Storms Laboratory, *Severe Weather 101: Lightning Basics* : https://www.nssl.noaa.gov/education/svrwx101/lightning/
- US National Weather Service, *The Science of Thunder* : https://www.weather.gov/safety/lightning-science-thunder
```

Include short source links to
`https://www.nssl.noaa.gov/education/svrwx101/lightning/` and
`https://www.weather.gov/safety/lightning-science-thunder` in the Document.
Attach structured external provenance for the first URL with provider **NOAA
National Severe Storms Laboratory** and canonical title **Severe Weather 101:
Lightning Basics**. It is metadata only and Synapse must not claim to fetch or
preserve the remote page.

Create these four independently assessable items, translated naturally:

1. **Origine du tonnerre** — explain that lightning heats air abruptly and its
   rapid expansion produces thunder. `depthCeiling: 3`, target 3.
2. **Pourquoi l’éclair est vu avant que le tonnerre soit entendu** — relate the
   observation to the very different travel speeds of light and sound.
   `depthCeiling: 3`, target 3.
3. **Estimer la distance d’un éclair** — use the elapsed seconds divided by
   three to estimate kilometres and state that the result is approximate.
   `depthCeiling: 4`, target 4.
4. **Pourquoi le tonnerre gronde** — explain that sound from different parts of
   the lightning channel reaches the observer at different times.
   `depthCeiling: 3`, target 3.

Do not invent a level-5 transfer task. This tutorial deliberately shows that a
Knowledge's ceiling follows its intrinsic scope.

## Procedure and dialogue checkpoints

### 1. Connect and introduce

Call `get_me`. If authentication fails, help the user connect Synapse and stop.
Profile creation or editing belongs to the mobile application and authorization
flow. Determine the active agent's real product name, present
[the approved message](./onboarding-message.md), then ask whether the user is
ready to build this first Collection. Wait.

### 2. Create and explain the Collection

After agreement, explain in two or three sentences that a Collection gives
continuity and a coherent boundary to a learning journey. Create the prepared
Collection and description with idempotency key
`onboarding-thunderstorm-collection-v1`. Tell the user they can already see it
appear in the mobile application. Wait before introducing the next object.

### 3. Create and explain the Document

Explain that a learning journey can be broad, so Synapse divides it into
several assessable pieces. A Document is the material from which those pieces
can be built. Create the prepared Document with idempotency key
`onboarding-thunderstorm-document-v1`, then explain that later Documents
may be generated from scratch or based on sources the user supplies, such as a
course, PDF, article, or YouTube video. Tell the user they can inspect the
Document in the mobile application. Wait.

### 4. Create and explain the Knowledge

Explain that each **Connaissance** or natural equivalent is one coherent thing
Synapse can assess independently. Show the four prepared items concisely, then
create them in one batch with idempotency key
`onboarding-thunderstorm-knowledge-v1`. Use `SECTION` source references whose
locator identifies the corresponding heading in the prepared Document. Do not
use `KnowledgeUnit` in the explanation. Invite the user to look at the
Collection's structure in the mobile application. Wait.

### 5. Explain the five depth levels

Before setting targets or starting the review, state that Synapse evaluates
every Knowledge separately on five depth levels. Give the five general
one-sentence meanings from the learning model. Then ground the scale with
**Estimer la distance d’un éclair**:

1. recognize the three-seconds-per-kilometre rule when shown it;
2. retrieve the rule without help;
3. explain why the speed difference makes the estimate possible;
4. apply it to a representative delay, such as nine seconds.

Say explicitly that this Knowledge stops at level 4: forcing a level-5 task
would exceed its scope. Other Knowledge can genuinely support level 5 when
their own scope includes novel transfer and reasoning about limits. Set the
four prepared targets with idempotency key
`onboarding-thunderstorm-targets-v1`; targets express an aim and do not claim
progress. Wait.

### 6. Offer one frictionless review

Explain that a review can use any method the user chooses. Offer one immediate
question: “Vous voyez un éclair, puis entendez le tonnerre neuf secondes plus
tard. À quelle distance approximative se trouve l’éclair ? Expliquez brièvement
votre calcul.” Translate naturally and wait for the answer.

### 7. Validate observable evidence

Give brief feedback. Only after the user has answered, explain that Synapse can
evaluate progress from what the agent can observe during exchanges and reviews,
from photos of paper exercises, files, productions, or other inspectable work.
A self-report alone is insufficient.

If the answer provides evidence, record one private `REVIEW` event for
**Estimer la distance d’un éclair**, bounded by its ceiling and following the
learning model, with stable idempotency key
`onboarding-thunderstorm-first-review-v1`. For example, an independent correct
estimate of roughly three kilometres with a sound explanation supports level
4; weaker evidence supports only the demonstrated level. Re-read the context
and describe exactly what was recorded. Do not introduce retrievability.

### 8. Explain continuity and sharing

Explain progressively that Synapse uses the private schedule to place Knowledge
in **À revoir** in the mobile application when a review becomes due. Time does
not erase what they demonstrated. Then explain that Collections can be shared
from the mobile application while each person's progress and review history
remain private. Invite one final mobile check. Wait.

### 9. Finish with the four recurring moments

State clearly that the tutorial is finished and the user has now handled the
main Synapse concepts. Express that you look forward to helping with a new
learning journey. Then teach these four moments with short examples:

- create: `@Synapse, je veux commencer à apprendre [sujet].`
- update: `@Synapse, j’aimerais ajouter [source, connaissances ou chapitre] à ma Collection [nom].`
- revise: `@Synapse, qu’est-ce que j’ai à revoir ?`
- validate: `@Synapse, voici mon exercice sur [sujet]. Évalue mon niveau et mets à jour ma progression dans [Collection].`

Tell the user these are examples, not phrases to reproduce character for
character. They should express the intended action, identify the topic or
Collection, and include the source or observable work when relevant. The user
may revise with the agent, alone, on paper, or with any method they prefer; the
validation request is what asks the agent to assess that work and update
Synapse.

## Recovery and idempotency

Before every write, re-read enough context to detect whether the prepared
object already exists. Reuse stable idempotency keys across retries and never
duplicate an object after an interrupted onboarding. On resumption, summarize
the last completed concept in one sentence and continue at the next checkpoint.
If a bounded MCP failure occurs, explain exactly what was not created or
updated and do not narrate later steps as completed.
