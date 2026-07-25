---
name: onboarding
description: Explicitly configure Synapse and create the user's first text-based learning Collection after one structure approval.
disable-model-invocation: true
---

# Synapse onboarding

Use this workflow only when the user explicitly invokes onboarding. Read
[the learning model](../../references/learning-model.md) and
[the MCP contract](../../references/mcp-contracts.md) before writing.

1. Call `get_me`. If authentication fails, help the user connect the plugin and
   stop. If required profile fields are absent, use only the allowed Synapse
   profile flow; do not invent identity data.
2. Use the user's language. For French, present this approved message exactly:

   > Bienvenue dans Synapse.
   >
   > Accéder à l’information ou obtenir une bonne explication n’a jamais été
   > aussi facile. Pourtant, comprendre quelque chose une fois ne signifie pas
   > nécessairement l’avoir appris. On peut lire, suivre un cours ou échanger
   > longtemps avec une IA sans savoir clairement ce que l’on pourra encore
   > retrouver, expliquer ou utiliser plus tard.
   >
   > Synapse donne de la continuité à votre apprentissage. Avec l’agent IA que
   > vous utilisez déjà — ChatGPT, Claude ou un autre — vous organisez vos
   > sources, identifiez les connaissances à acquérir et les travaillez à la
   > profondeur réellement utile pour votre objectif.
   >
   > Votre agent vous aide à comprendre, pratiquer et évaluer vos acquis.
   > Synapse conserve cette progression dans le temps, fait apparaître ce qui
   > mérite d’être revu et vous permet de visualiser rapidement où vous en êtes.
   >
   > Tout n’a pas besoin d’être appris de la même manière ni au même niveau.
   > L’objectif n’est pas de tout mémoriser parfaitement, mais de construire des
   > connaissances que vous pourrez retrouver et utiliser quand vous en aurez
   > besoin.
   >
   > Pour commencer, dites-moi ce que vous souhaitez apprendre, dans quel but, et
   > transmettez-moi vos premières sources si vous en avez.

   For English, use this natural equivalent:

   > Welcome to Synapse.
   >
   > Finding information or getting a clear explanation has never been easier.
   > But understanding something once does not mean it has been learned. You can
   > read, take a course, or talk with an AI at length without knowing what you
   > will still be able to recall, explain, or use later.
   >
   > Synapse gives your learning continuity. With the AI agent you already use,
   > you organize sources, identify what you need to know, and work each item to
   > the depth your goal actually requires.
   >
   > Your agent helps you understand, practise, and assess what you can do.
   > Synapse preserves that progress over time, surfaces what deserves review,
   > and makes your current position easy to see.
   >
   > Not everything needs to be learned in the same way or to the same level.
   > The goal is not perfect memorization of everything, but knowledge you can
   > retrieve and use when you need it.
   >
   > To begin, tell me what you want to learn, why you want to learn it, and
   > share any starting sources you already have.

3. Ask no more than these three initial questions: what the user wants to
   learn, for what purpose, and whether sources already exist. Do not ask for a
   learning style.
4. Inspect supplied text or locally available sources when possible. Apply the
   Milestone 2 file boundary from the shared MCP contract.
5. Propose one concise initial structure: Collection title and description,
   optional child Collections, independently assessable free-text
   KnowledgeUnits, each depth ceiling, and private target depths. Mention any
   source file that cannot yet be stored.
6. Ask once for approval of the whole structure. Revise the preview if the user
   declines; do not write before approval.
7. After approval, call `create_collection`, then
   `create_knowledge_units` in bounded idempotent batches, then
   `set_learning_targets`. Targets never set assessed depth or retrievability.
8. Re-read the created context, summarize exactly what was stored, identify any
   source that was not stored, and offer `study` or `review`.

Never fabricate assessed progress. Only a real assessment in the conversation
may justify a later atomic assessment event.
