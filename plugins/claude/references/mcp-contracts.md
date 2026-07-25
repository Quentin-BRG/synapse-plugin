# Synapse MCP workflow contract

The canonical remote resource is `/mcp` over stateless Streamable HTTP. Treat
all server responses as bounded records and keep idempotency keys unique and
stable across retries. Never put file bytes, base64, credentials, access
tokens, or signed URLs in prompts or tool JSON.

## Available Milestone 2 tools

- `get_me` verifies the authenticated profile and enabled scopes.
- `list_collections`, `get_collection`, and `get_collection_contents` resolve
  existing content.
- `get_learning_context` loads KnowledgeUnits, the current user's private
  LearningStates and recent private events.
- `list_due_knowledge_units` loads bounded due/stale work.
- `create_collection` creates one Collection with an idempotency key.
- `create_knowledge_units` creates independently assessable free-text units in
  bounded, idempotent batches. Creation does not create assessed progress.
- `set_learning_targets` sets private targets and appends target-change events.
  It does not assess learning.
- `record_learning_event` atomically appends one private event and applies its
  state patch. Use `expectedSemanticRevision`, `synapse-depth-v1`, an
  idempotency key, and the shared client name `synapse-plugin`.

Load context before writing state. The agent chooses evidence, depth,
retrievability, and `nextReviewAt`; the server validates permissions,
revisions, bounds, consistency, transactions, and idempotency. A scope check
never replaces Collection, KnowledgeUnit, or user authorization.

## Text-only boundary for Milestone 2

Document upload, download, source-reference, and generated-Document tools do
not exist yet. You may inspect a user-supplied local file when the agent
environment permits, but you must state that the original file will not be
stored in Synapse during this milestone. Offer to create text KnowledgeUnits
from inspected material only after approval. Never call a made-up upload tool,
claim a file was preserved, or send its bytes through MCP. Direct signed S3
transfer is reserved for Milestone 3.

If a required tool is missing or the server returns `INSUFFICIENT_SCOPE`,
`FORBIDDEN`, `NOT_FOUND`, `STALE_REVISION`, or `IDEMPOTENCY_CONFLICT`, explain
the bounded failure and do not simulate a successful write.
