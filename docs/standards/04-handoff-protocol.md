# Standard 04: Handoff Protocol

## Purpose

Antigravity와 Claude Code 간 작업 전달 시 맥락 손실 없이 완전한 정보를 전달하는 표준 형식을 정의합니다.

## Rules

1. **HAND-01**: 모든 핸드오프는 YAML frontmatter + Markdown body 형식을 사용해야 한다.
2. **HAND-02**: YAML frontmatter는 필수 필드 9개를 모두 포함해야 한다 (스키마 참조).
3. **HAND-03**: 핸드오프 파일은 `handoffs/` 디렉토리에 저장하고, 파일명은 `{direction}-{task-id}-{YYYYMMDD}.md` 형식을 따른다.
4. **HAND-04**: 수신 측은 `/handoff-review` 스킬로 핸드오프를 검증한 후 작업을 시작해야 한다.
5. **HAND-05**: 핸드오프 생성 시 `/handoff-create` 스킬을 사용해야 한다.
6. **HAND-06**: 핸드오프 상태는 `draft → pending → received → completed` 순서로만 전진한다.
7. **HAND-07**: 증거 경로(`evidence-path`)는 실제 존재하는 경로를 가리켜야 한다. 빈 경로는 `""` (빈 문자열)로 명시.
8. **HAND-08**: 핸드오프 완료 후 상태를 `completed`로 업데이트해야 한다.

## YAML Frontmatter Schema

```yaml
---
direction: "ag-to-cc" | "cc-to-ag"
source-tool: "antigravity" | "claude-code"
target-tool: "antigravity" | "claude-code"
timestamp: "{ISO8601}"           # 예: 2025-01-15T09:30:00+09:00
task-id: "{id}"                  # 예: task-2025-001
status: "draft" | "pending" | "received" | "completed"
priority: "low" | "normal" | "high" | "critical"
risk-level: "low" | "medium" | "high" | "critical"
evidence-path: "{path}"          # 예: evidence/20250115-task-001/ 또는 ""
---
```

## Markdown Body Sections

핸드오프 문서 본문은 다음 섹션을 포함해야 한다:

```markdown
## Summary
(1-3문장으로 전달 내용 요약)

## Context
(배경 정보, 의존성, 관련 파일)

## Task / Goal
(수신 측이 수행해야 할 구체적 작업)

## Acceptance Criteria
(완료 판단 기준)

## Notes / Constraints
(제약사항, 주의사항, 알려진 이슈)

## Evidence
(이전 단계의 증거 요약 — cc-to-ag의 경우)
```

## Owner

Shared

## Enforcement

- **Skill**: `/handoff-review` — YAML 스키마 및 완전성 검증
- **Skill**: `/handoff-create` — 표준 형식으로 핸드오프 생성
- **Manual**: 수신 측 확인 응답

## Examples

파일명 예시: `handoffs/ag-to-cc-task-2025-001-20250115.md`

## Exceptions

- 긴급 구두 핸드오프: `priority: critical` + 24시간 내 문서 보완 의무
