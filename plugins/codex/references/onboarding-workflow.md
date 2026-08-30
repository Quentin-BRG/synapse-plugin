# Guided onboarding workflow

This reference defines the first Synapse experience. The prepared Collection
is only a support for taking Synapse in hand; creating it is not the objective.
The tutorial succeeds when the new user understands the product concepts,
experiences one evidence-based review, and knows how to continue afterwards.

Follow the workflow progressively: one meaningful concept per turn, followed
by a short transition such as “C’est clair ?”, “On continue ?”, or “On passe à
la suite ?”. Wait, answer any question, and reformulate when needed before
advancing. Do not dump several concepts into one long message, but do not
reduce an explanation to a procedural sentence either.

For each concept, explain what it means in Synapse, ground it in the prepared
thunderstorm journey, and show how it relates to the user's learning. Avoid
abstract filler and internal implementation detail. Use the user's language
and the natural user-facing terminology defined in
[the learning model](./learning-model.md).

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
ready to start discovering Synapse. The thunderstorm journey is intentionally
simple and only supports this first experience; it does not represent the
limits of Synapse. Wait for the initial agreement. That agreement covers all
prepared tutorial mutations, so do not request it again for every object.

### 2. Create and explain the Collection

Teach that a **Collection** corresponds to one learning journey that the user
wants to follow over time. It brings together its supports and its related
Knowledge. Ground the explanation in the prepared Collection: it covers the
origin of thunder, the delay between light and sound, estimating lightning
distance, and the rolling sound of thunder. These things belong to the same
learning journey, while Synapse can follow each one separately.

Create the prepared Collection and description with the run-scoped
idempotency strategy below. Say that the user may follow its creation in the
mobile application, without asking them to open it or confirm that it appears.
End simply, for example: “C’est clair ? On continue ?” Wait and handle the
response before introducing the Document.

### 3. Create and explain the Document

Teach that a **Document** is a support kept in a Collection and used as a
starting point for learning. Here it is the short prepared support about
lightning and thunder. Explain that later the agent may generate Documents from
scratch or build them from sources the user supplies, such as a course, notes,
a PDF, an article, or a YouTube video. Do not imply that creating or reading a
Document proves learning.

Create the prepared Document with the run-scoped idempotency strategy below.
Say that the user may inspect it in the mobile application without making that
inspection a gate. End simply, for example: “C’est clair ? On passe à la
suite ?” Wait and handle the response before introducing Knowledge.

### 4. Create and explain the Knowledge

Teach that a learning journey can cover several ideas, mechanisms, or
abilities, so Synapse divides it into **Connaissances** or the natural
equivalent: coherent things that can be learned and assessed separately. A
Knowledge is not merely a sentence copied from a Document. Present all four
prepared items and explain the concrete consequence: the user might know how
to estimate lightning distance without yet knowing why thunder rolls, so
Synapse follows them separately inside the same Collection.

Create the four prepared items in one batch with the run-scoped idempotency
strategy below. Use `SECTION` source references whose locator identifies the
corresponding heading in the prepared Document. Do not use `KnowledgeUnit` in
the explanation. The mobile structure may be mentioned but never inspected as
a prerequisite.

End with the prepared short integration question: “Parmi ces quatre
Connaissances, laquelle vous semble demander une mise en pratique plutôt qu’une
simple explication ?” Wait, respond to the answer, and only then introduce
depth.

### 5. Explain the five depth levels

Before setting targets or starting the review, state that Synapse evaluates
every Knowledge separately on five depth levels. Give both the natural name and
the general one-sentence meaning of each level:

1. **Recognize** — identify the Knowledge when it is presented;
2. **Retrieve** — produce it without substantive help;
3. **Understand** — explain, connect, distinguish, or justify it;
4. **Apply** — select and use it in a representative situation;
5. **Transfer** — adapt it to a genuinely new situation and reason about its
   limits.

Translate the names naturally. In French use **Reconnaître**, **Retrouver**,
**Comprendre**, **Appliquer**, and **Transférer**. Then ground the scale with
**Estimer la distance d’un éclair**:

1. **Reconnaître** — identifier la règle des trois secondes lorsqu’elle est
   présentée ;
2. **Retrouver** — restituer cette règle sans aide ;
3. **Comprendre** — expliquer pourquoi la différence de vitesse rend
   l’estimation possible ;
4. **Appliquer** — utiliser la règle avec un délai représentatif, par exemple
   neuf secondes.

Say explicitly that this Knowledge stops at level 4: forcing a level-5 task
would exceed its scope. Other Knowledge can genuinely support level 5 when
their own scope includes novel transfer and reasoning about limits. Do not
introduce retrievability. End simply, for example: “C’est clair ? On continue ?”
Wait and handle the response before explaining targets and progress.

### 6. Explain targets and observable progress

Explain that every Knowledge has a hard maximum depth following its actual
scope, a target describing what the user aims to be able to do, and observed
progress based only on evidence from their work. Set the four prepared targets
with the run-scoped idempotency strategy below. Targets express an aim and do
not claim progress.

Explain that Synapse may evaluate evidence visible during exchanges and reviews
with the agent, photos of paper exercises, files, productions, or any other
work the agent can actually inspect. A self-report alone is insufficient. End
simply: “C’est clair ? On essaie une première révision ?” Wait.

### 7. Offer one frictionless review

Explain that a review can use any method the user chooses. If the user accepts,
ask: “Vous voyez un éclair, puis entendez le tonnerre neuf secondes plus tard.
À quelle distance approximative se trouve l’éclair ? Expliquez brièvement votre
calcul.” Translate naturally and wait for the answer.

### 8. Validate observable evidence

Give useful but focused feedback. Only after the user has answered may the
review change progress.

If the answer provides evidence, record one private `REVIEW` event for
**Estimer la distance d’un éclair**, bounded by its ceiling and following the
learning model, using the run-scoped idempotency strategy below. For example,
an independent correct estimate of roughly three kilometres with a sound
explanation supports level 4; weaker evidence supports only the demonstrated
level. Re-read the context and describe exactly what was recorded. Do not
introduce retrievability.

Explain why the observable answer supports the recorded level and how that
differs from the target. End simply, for example: “C’est clair ? On continue ?”
Wait and handle the response.

### 9. Explain continuity and sharing

Explain progressively that Synapse uses the private schedule to place Knowledge
in **À revoir** in the mobile application when a review becomes due. Time does
not erase what they demonstrated. Explain that the mobile application may send
a notification when a review becomes relevant. Then explain that Collections
can be shared from the mobile application while each person's progress and
review history remain private. The user remains free to revise with the agent,
alone, on paper, or with any method they prefer.

Do not require a mobile check. End simply, for example: “C’est OK ? On termine
la prise en main ?” Wait and handle the response.

### 10. Finish with the four recurring moments

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

Treat idempotency as an internal recovery mechanism, never a user-facing part
of the tutorial. At the start of a new onboarding run, choose one opaque run
token and derive distinct keys for the Collection, Document, Knowledge batch,
targets, and first review. Keep those keys stable for retries inside that run;
never reuse one lifelong fixed key for every onboarding.

Before every write, re-read enough context to detect whether the prepared
active object already exists. Reuse a valid active object silently, without
saying that it was “already present”, “reused”, or protected from duplication.
Object state never proves that the user understood a checkpoint and must not
determine the pedagogical position in the tutorial.

If a key conflicts, or a replayed response points to an inaccessible or
archived object, silently re-read the current state. If no equivalent active
object exists, derive a fresh run-scoped key and retry the write. Use at most
two fresh-key retries for one mutation. Never mention keys, idempotency,
conflicts, duplicates, or internal recovery to the user.

On resumption inside an existing conversation, continue from the last concept
the user's responses show they completed. In a new conversation, teach the
workflow from the beginning even when prepared objects already exist; silently
reuse them when their mutation checkpoint is reached. If a mutation still
cannot be completed after bounded recovery, explain only that Synapse could not
complete the current step, stop without narrating later steps as completed, and
keep the technical details out of the onboarding conversation.
