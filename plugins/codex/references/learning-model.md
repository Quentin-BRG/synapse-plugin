# Synapse learning model

Use rubric version `synapse-depth-v1` for every assessment.

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

An assessment may raise or lower depth when evidence supports the change. One
failed retrieval can lower retrievability and schedule a near review without
automatically lowering depth. Never exceed the KnowledgeUnit's `depthCeiling`.
Record a concise evidence summary whenever assessment changes depth.

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
the authenticated user, including inside a shared Collection.

Use the user's language. Support natural French and English, without
translating user-authored learning content unless asked.
