# Antigravity + Claude Code Standard Project

## Core Behavioral Rules (always-on)

- **Language**: Always respond in Korean
- **Commits**: Conventional prefix required (feat|fix|refactor|chore|docs|style|test|perf|ci|build). Title in English, body in Korean
- **Minimal diff**: Make the smallest, safest change that satisfies the requirement
- **Task sequencing**: Confirm current task is complete before starting a new one. Verify → commit → next task

## Standards Reference

- All standards: `docs/standards/`
- Governance: `docs/governance/`
- Templates: `templates/`
- Antigravity guides: `docs/antigravity/`

## Session Protocol

- Use `/session-init` at the start of every work session
- Use `/final-walkthrough` before claiming any task complete
- Check `handoffs/` directory for pending incoming work

## Evidence Protocol

- Use `/verification-bundle` for all features and bug fixes
- Evidence must exist in `evidence/` before the final commit
- Evidence is session-scoped and excluded from git (see .gitignore)

## Handoff Protocol

- Use `/handoff-create` when transferring work to Antigravity or another Claude Code session
- Use `/handoff-review` when receiving a handoff document
- Format: YAML frontmatter + Markdown per `docs/standards/04-handoff-protocol.md`

## Implementation Protocol

- Use `/scope-risk-pass` before starting any non-trivial implementation
- Use `/implementation-guard` during implementation to enforce constraints
- Use `/ui-spec-normalize` when processing visual/image feedback from Antigravity

## Protected Paths (enforced by hook — do not modify without override tag)

- `.claude-plugin/**`
- `hooks/hooks.json`
- `docs/governance/rule-manifest.md`
- `docs/governance/enforcement-matrix.md`

To override: include `[override:PROTECTED-PATH]` tag in your request.
