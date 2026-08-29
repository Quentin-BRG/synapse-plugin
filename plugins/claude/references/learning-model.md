# Synapse learning model

Use rubric version `synapse-depth-v1` for every assessment.

## User-facing terminology

Speak in the user's language and translate product concepts naturally. In
French, call one independently assessable item a **Connaissance**; in English,
call it **Knowledge**. `KnowledgeUnit` is an internal domain and tool name, not
a label to expose in conversation. Keep user-authored learning content in its
original language unless the user asks for a translation.

## Depth

Depth and retrievability are separate observations. A target is not an
assessment, and creating or importing content never proves learning.

| Value | Stable code | Meaning | Sufficient evidence |
| --- | --- | --- | --- |
| 0 | `UNASSESSED` | No sufficient evidence has been recorded. | None |
| 1 | `RECOGNIZED` | The learner identifies the knowledge when presented. | Correct recognition without independent recall |
| 2 | `RETRIEVABLE` | The learner produces the atomic knowledge without a substantive cue. | Free recall or independent execution |
| 3 | `UNDERSTOOD` | The learner explains, connects, distinguishes, or justifies it. | Explanation, comparison, causal account, or boundaries |
| 4 | `APPLICABLE` | The learner selects and uses it in a representative situation. | Correct application, diagnosis, implementation, or solution |
| 5 | `TRANSFERABLE` | The learner adapts it in a novel context and reasons about limits. | Novel transfer, synthesis, trade-offs, or justified strategy |

Synapse evaluates depth separately for every Knowledge. In user-facing
language, explain the levels this way:

1. recognize the knowledge when it is presented;
2. retrieve it without substantive help;
3. explain it, connect it, distinguish it, or justify it;
4. select and use it in a representative situation;
5. adapt it to a genuinely new situation and reason about its limits.

An assessment may raise or lower depth when evidence supports the change. One
failed retrieval can lower retrievability and schedule a near review without
automatically lowering depth. Never exceed the item's `depthCeiling`. Treat
that ceiling as a hard boundary, not a target to game: do not widen the
Knowledge, borrow responsibility from the Collection, or invent an artificial
application merely to justify level 4 or 5. Simple Knowledge often has a
ceiling of 2 or 3. If a broader capability is worth learning, create a separate
Knowledge with an explicit scope. Record a concise evidence summary whenever
assessment changes depth.

## Retrievability

| Stable code | Meaning |
| --- | --- |
| `UNKNOWN` | No useful recent observation |
| `INACCESSIBLE` | Substantial help or the answer was required |
| `EFFORTFUL` | Independent but slow, uncertain, or difficult |
| `ACCESSIBLE` | Independent with ordinary effort |
| `FLUENT` | Immediate and reliably automatic for the expected task |

`FLUENT` is not depth 5. `INACCESSIBLE` is not depth 0.

## Time, scheduling, and staleness

The agent decides `nextReviewAt`; Synapse stores it and derives `due` when the
date is reached. Passing time never mutates assessed depth or retrievability.
Semantic staleness is derived by comparing the assessed semantic revision with
the current KnowledgeUnit semantic revision. Staleness invites reassessment
but never erases depth.

LearningState, targets, schedules, evidence, and LearningEvents are private to
the authenticated user, including inside a shared Collection. Sharing a
Collection shares its learning content according to its permissions, never the
personal progress of its learners.

Retrievability is useful to agents for assessment and scheduling, but do not
introduce it during onboarding. The first experience teaches the five depth
levels progressively and keeps the internal scheduling model out of sight.
