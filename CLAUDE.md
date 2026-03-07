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

## Agent Team Policy

- 실행 모드 선호 순서: single-session > subagents > agent-team
- Agent team은 실험적 기능 (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` 필요)
- 팀 구성 전 `/team-escalation-eval` 필수 실행
- 모델 정책: root는 opusplan 권장, teammate는 sonnet 권장 (네이티브 핀 미지원)

### Cost Discipline

- 브로드캐스트 기본 금지 (진행률/통합에만 허용)
- 완료된 팀원 즉시 종료 (유휴 팀원 = 토큰 낭비)
- 동일 작업 재시도 3회 한도, 초과 시 사용자 승인 필요
- spawn 프롬프트는 tight & focused 유지
- 10명 이상 팀은 강력한 안티패턴 — 예외적 근거 없이 금지

## Protected Paths (enforced by hook — do not modify without override tag)

- `.claude-plugin/**`
- `hooks/hooks.json`
- `docs/governance/rule-manifest.md`
- `docs/governance/enforcement-matrix.md`

To override: include `[override:PROTECTED-PATH]` tag in your request.
