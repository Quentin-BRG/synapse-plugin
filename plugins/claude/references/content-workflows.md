# Synapse content workflows

Use these rules when onboarding, creating or updating a Collection, organizing
content, or preserving a source or generated artifact. Read
[the learning model](./learning-model.md) for user-facing terminology and depth
boundaries.

## Organization and content

Folders and child Collections are different. A Folder organizes root
Collections; a child Collection decomposes learning content. A Collection
never contains a Folder, and only a root Collection may have a `folderId`.

- `list_collections`, `get_collection`, `get_collection_contents`, and
  `list_documents` resolve existing learning content. Use `list_documents`
  when Document discovery, descendants, pagination, or archived Documents
  matter.
- `list_folders` and `get_folder_contents` resolve organizational placement
  without exposing inaccessible ancestors.
- `create_folder` creates an approved organizational Folder.
- `create_collection` creates a Collection with either a `folderId` or a
  `parentId`, never both.
- `update_collection` changes an editable Collection's title or description
  with revision protection.
- `move_collection` reparents pedagogical Collections; `archive_collection`
  and `restore_collection` manage recursive soft deletion.
- `create_knowledge_units` creates independently assessable free-text units in
  bounded, idempotent batches with optional same-Collection source references.
- `update_knowledge_unit` changes the content of one unit with revision
  protection and an explicit `EDITORIAL` or `SEMANTIC` impact. Use `EDITORIAL`
  only when meaning is unchanged. Use `SEMANTIC` whenever the knowledge itself,
  its boundaries, or what counts as a correct answer changes.
- `move_knowledge_unit`, `archive_knowledge_unit`, and
  `restore_knowledge_unit` reorganize or soft-delete one Knowledge item without
  inventing or erasing personal progress.
- `set_learning_targets` sets private targets. It never assesses learning.
- `get_document` reads metadata, tags, sources, and preview capability.
- `update_document` changes only title, display filename, or structured
  external provenance. `move_document` changes its Collection without
  replacing immutable bytes; `archive_document` and `restore_document` manage
  soft deletion.
- `replace_source_references` replaces a complete source set with KnowledgeUnit
  revision protection.

Creating or editing a Collection, Document, KnowledgeUnit, source reference,
or target never proves learning and must not set assessed depth or
retrievability. A semantic content change makes prior assessments stale without
erasing them; an editorial change does not.

Choose a Collection boundary that represents a coherent learning journey: more
than one isolated fact, but not an unbounded field. Divide a broad learning
scope into independently assessable Knowledge, and use child Collections only
for real pedagogical decomposition.

Present one concise preview of the intended structure and mutations. Write
only after approval, use stable idempotency keys across retries, then re-read
before claiming success. In user-facing messages, say **Connaissance** in
French and **Knowledge** in English; never present `KnowledgeUnit` as an object
name.

## Documents and provenance

Use `ORIGINAL` only for user-provided material and `GENERATED` only for
agent-created artifacts. Provenance is not a free tag.

An accessible external source may inform learning without being stored by
Synapse. When the user approves preservation, create a `GENERATED` text or
Markdown note containing the derived material and attach `externalSource` with
the source's HTTPS URL, provider, and optional canonical title. The metadata is
provenance only: Synapse does not fetch, download, verify, or preserve the
remote resource. If the agent cannot inspect the link, ask for a transcript,
file, or relevant extract. Never label agent-authored extraction as
`ORIGINAL`.

`create_text_document` stores UTF-8 plain text or Markdown up to 1 MiB. For a
local binary or larger text file:

1. inspect the file and collect its exact byte size and declared MIME type;
2. call `create_document_upload` after approval;
3. pass its structured output on standard input to
   `scripts/upload-document.mjs <local-path>`;
4. never print, repeat, summarize, or log the signed destination;
5. call the `nextTool` returned by the helper, using its
   `complete_document_upload` arguments and a deterministic idempotency key;
6. re-read the Document and require `AVAILABLE` before claiming preservation.

The helper transfers bytes directly. The authenticated agent performs the
completion call, so OAuth credentials never leave the MCP client. Never send
file bytes or base64 through MCP. If local file access, helper execution, MIME
validation, or completion is unavailable, state exactly what was not stored.

PDF and images can be previewed inline; safe text formats receive text
previews; DOCX and PPTX are download-only in this milestone. Never execute
active embedded content.

Source references remain same-Collection links. Before moving Knowledge or a
Document, inspect its references. If the server reports a conflict, preview a
safe multi-step reorganization—temporarily remove the references, move the
items, then restore valid references—and wait for approval before applying it.

## Bounded failures

If a required tool is missing or the server returns `INSUFFICIENT_SCOPE`,
`FORBIDDEN`, `NOT_FOUND`, `STALE_REVISION`, or `IDEMPOTENCY_CONFLICT`, explain
the bounded failure and do not simulate a successful write.

For a Folder, Collection, Knowledge, or Document move returning
`ACCESS_IMPACT_CONFIRMATION_REQUIRED`, show the gained, lost, and role-changed
counts. Retry only after explicit approval with the returned opaque token and
the same actor, target, destination, expected revision, and idempotency key.
Never reuse or retain the token.
