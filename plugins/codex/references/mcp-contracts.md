# Synapse MCP workflow contract

The canonical remote resource is `/mcp` over stateless Streamable HTTP. Treat
all server responses as bounded records and keep idempotency keys unique and
stable across retries. Never put file bytes, base64, credentials, or access
tokens in prompts or tool JSON. Signed URLs appear only in the structured
upload/download response that needs them; never echo, summarize, or log them.

## Available tools

- `get_me` verifies the authenticated profile and enabled scopes.
- `list_collections`, `get_collection`, and `get_collection_contents` resolve
  existing content.
- `get_learning_context` loads KnowledgeUnits, the current user's private
  LearningStates, recent private events, and optional source references.
- `list_due_knowledge_units` loads bounded due/stale work.
- `create_collection` creates one Collection with an idempotency key.
- `create_knowledge_units` creates independently assessable free-text units in
  bounded, idempotent batches, optionally with source references. Creation does
  not create assessed progress.
- `get_document` reads metadata, tags, source links, and preview capability.
- `get_document_download` returns a short-lived authorized download URL.
- `create_document_upload` creates a pending Document and a short-lived direct
  PUT destination. `complete_document_upload` verifies the stored bytes before
  making it available.
- `create_text_document` stores UTF-8 plain text or Markdown up to 1 MiB.
- `set_document_tags` replaces system and normalized free tags.
- `replace_source_references` replaces the complete reference set with
  KnowledgeUnit revision protection.
- `archive_document` and `restore_document` soft-archive or restore metadata;
  archive is destructive and never deletes stored bytes.
- `set_learning_targets` sets private targets and appends target-change events.
  It does not assess learning.
- `record_learning_event` atomically appends one private event and applies its
  state patch. Use `expectedSemanticRevision`, `synapse-depth-v1`, an
  idempotency key, and the shared client name `synapse-plugin`.

Load context before writing state. The agent chooses evidence, depth,
retrievability, and `nextReviewAt`; the server validates permissions,
revisions, bounds, consistency, transactions, and idempotency. A scope check
never replaces Collection, KnowledgeUnit, or user authorization.

## Direct file flow

For a local binary or text file larger than 1 MiB:

1. inspect it locally and collect the exact byte size and declared MIME type;
2. call `create_document_upload` after user approval;
3. pass its structured output on standard input to
   `scripts/upload-document.mjs <local-path>`;
4. do not print or repeat the signed destination;
5. call the `nextTool` returned by the helper, which is
   `complete_document_upload` with the computed SHA-256 and a deterministic
   idempotency key;
6. re-read the Document before claiming it was stored.

The helper performs only the direct byte transfer. The authenticated agent
performs the completion tool call so OAuth credentials never leave the MCP
client. If local file access or helper execution is unavailable, fail clearly.
Never send the bytes through MCP and never claim an original was stored until
completion returns `AVAILABLE`.

Use `ORIGINAL` only for user-provided source material and `GENERATED` only for
agent-created artifacts. Provenance is not a free tag. PDF and images can be
previewed inline; text formats receive safe text previews; DOCX and PPTX are
download-only in this milestone. Never execute active embedded content.

If a required tool is missing or the server returns `INSUFFICIENT_SCOPE`,
`FORBIDDEN`, `NOT_FOUND`, `STALE_REVISION`, or `IDEMPOTENCY_CONFLICT`, explain
the bounded failure and do not simulate a successful write.
