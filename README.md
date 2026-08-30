# Synapse plugins

**Make what you learn last.**

Synapse organizes your knowledge, keeps track of your progress, and helps you
see what deserves more attention or review. It works with the AI agent you
already use: the agent conducts learning conversations and assessments, while
Synapse preserves structured Collections, independently assessable Knowledge,
and your private learning history.

This repository distributes version `0.5.1` of the `synapse`
plugin for Codex and Claude Code. Both packages connect to
`https://synapse.quentin-berger.fr/mcp` through OAuth. No API key or plugin secret is required.

## Permissions

The plugin requests only the scopes used by its current workflows:

- `openid` and `profile` link the MCP authorization to the same Synapse
  identity used by the native application;
- `offline_access` lets the client rotate refresh tokens instead of asking you
  to sign in for every short-lived access token;
- `synapse:read` reads your profile, accessible Collections and Knowledge,
  brain summaries, and your private learning state and history;
- `synapse:organization:write` creates approved organizational Folders for
  root Collections;
- `synapse:content:write` creates and updates Collections and Knowledge, and
  manages same-Collection source references after your approval;
- `synapse:files:write` creates, verifies, tags, archives, and restores
  Documents through direct signed storage transfers;
- `synapse:learning:write` sets your private targets and records
  evidence-backed learning events and state.

The package does not request social or sharing write scopes. Scopes do not
replace server-side entity authorization: the Synapse service enforces access
and privacy for every request.

## Documents and local files

The plugin accepts PDF, plain text, Markdown, CSV, JSON, PNG, JPEG, WebP, DOCX,
and PPTX files up to 100 MiB. File bytes travel directly from your machine to
private S3-compatible storage through a short-lived signed URL; they are never
embedded in MCP JSON.

Both platform packages contain the same deterministic
`scripts/upload-document.mjs` helper. It reads the signed upload descriptor on
standard input, computes SHA-256, uploads the exact local file, and returns the
arguments for the authenticated agent to call `complete_document_upload`.
Signed URLs and OAuth tokens are never printed.

For an external page, podcast, or video that the agent can inspect, the plugin
can preserve approved derived notes with the source's HTTPS URL, provider, and
canonical title. Synapse stores that structured provenance but does not fetch,
download, verify, or archive the remote resource itself.

## Install with Codex

Add the public Git marketplace and install the plugin:

```bash
codex plugin marketplace add Quentin-BRG/synapse-plugin
codex plugin add synapse@synapse-plugin
codex plugin list --marketplace synapse-plugin
```

You can also open `/plugins` in Codex after adding the marketplace and choose
**Synapse**. Start a new Codex session after installation so it loads the MCP
server and the five skills: onboarding, Collection creation, Collection
updates, revision, and review validation.

Complete OAuth when Codex prompts you, or initiate it explicitly:

```bash
codex mcp login synapse
```

Your browser opens Synapse. Sign in with Google, review the requested
permissions, and approve or deny consent. Codex receives tokens through the
Authorization Code flow with PKCE; the plugin package never contains your
credentials.

To update:

```bash
codex plugin marketplace upgrade synapse-plugin
codex plugin add synapse@synapse-plugin
```

Then start a new session. To uninstall:

```bash
codex plugin remove synapse@synapse-plugin
codex plugin marketplace remove synapse-plugin
```

## Claude Code preview

The Claude Code package is generated from the same canonical workflows as the
Codex package and is statically validated for semantic parity. Interactive
Claude Code installation and OAuth have not yet been claimed as release
validation.

Install the marketplace and plugin with the official Claude Code commands:

```bash
claude plugin marketplace add Quentin-BRG/synapse-plugin
claude plugin install synapse@synapse-plugin
```

Run `/reload-plugins` or start a new Claude Code session, then use `/mcp` to
complete OAuth if prompted.

Update or uninstall with:

```bash
claude plugin marketplace update synapse-plugin
claude plugin update synapse@synapse-plugin
claude plugin uninstall synapse@synapse-plugin
claude plugin marketplace remove synapse-plugin
```

## Repository boundary

This public repository contains only inspectable client manifests, MCP
configuration, skills, shared skill references, marketplace catalogs, and
user documentation. The proprietary Synapse SaaS, native mobile application,
server, database schema, infrastructure adapters, and internal tests are not
included.
Security and authorization never depend on the editable skill instructions.

Report packaging, installation, or workflow issues at
<https://github.com/Quentin-BRG/synapse-plugin/issues>.

## License

Copyright 2026 Quentin Berger

The files distributed in this repository are licensed under the
[Apache License 2.0](./LICENSE). This license applies to this public plugin
distribution only. It does not license the proprietary Synapse SaaS, native
mobile application, server, or business logic, none of which is included here.
