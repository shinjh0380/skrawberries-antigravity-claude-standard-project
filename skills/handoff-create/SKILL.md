---
name: handoff-create
description: Use when creating a handoff to transfer work to Antigravity or another session, user says 'handoff', 'transfer', 'pass to AG', '핸드오프 생성', '핸드오프 작성'. Generates a properly formatted handoff document with YAML frontmatter.
---

# Handoff Create

작업 전달을 위한 핸드오프 문서를 생성합니다.

## Steps

### 1. Determine Direction

핸드오프 방향을 확인합니다:
- **ag-to-cc**: Antigravity → Claude Code (주로 새 작업 할당)
- **cc-to-ag**: Claude Code → Antigravity (완료 보고, 시각적 확인 요청)

### 2. Select Template

방향에 따라 적절한 템플릿을 사용합니다:

| 방향 | 템플릿 |
|------|--------|
| ag-to-cc | `templates/handoff-ag-to-cc.md` |
| cc-to-ag (완료 보고) | `templates/handoff-cc-to-ag.md` |
| cc-to-ag (UI 피드백 요청) | `templates/ui-feedback-request.md` |

### 3. Collect Required Information

필수 정보를 수집합니다:

**항상 필요:**
- `task-id` — `task-{YYYY}-{NNN}` 형식
- `priority` — low/normal/high/critical
- `risk-level` — low/medium/high/critical
- Summary (1-3문장)
- Context (배경 정보)
- Task/Goal (수행할 작업)
- Acceptance Criteria (완료 기준)

**cc-to-ag 추가 정보:**
- 변경된 파일 목록
- 커밋 해시 및 메시지
- 증거 번들 경로 (`evidence/{date}-{task-id}/`)
- 편차 사항 (있는 경우)

### 4. Generate Frontmatter

YAML frontmatter를 생성합니다:

```yaml
---
direction: "{direction}"
source-tool: "{source}"
target-tool: "{target}"
timestamp: "{현재 ISO8601}"
task-id: "{task-id}"
status: "pending"
priority: "{priority}"
risk-level: "{risk-level}"
evidence-path: "{path 또는 ""}"
---
```

`timestamp`는 현재 시각 ISO8601 형식으로 자동 생성합니다.

### 5. Write Handoff File

파일명 컨벤션: `{direction}-{task-id}-{YYYYMMDD}.md`

```bash
# 파일 저장 경로 예시
handoffs/ag-to-cc-task-2025-001-20250115.md
handoffs/cc-to-ag-task-2025-001-20250116.md
```

`handoffs/` 디렉토리가 없으면 생성합니다.

### 6. Completion

```
핸드오프 문서가 생성되었습니다.
파일: handoffs/{파일명}
Status: pending

{cc-to-ag인 경우}
Antigravity에 이 파일을 전달하고 확인을 요청하세요.
```

## Quality Checks

- `task-id`가 기존 핸드오프와 중복되지 않는지 확인
- `evidence-path`가 `cc-to-ag`인 경우 실제 경로 검증
- Acceptance Criteria가 검증 가능한 형태인지 확인
- 민감한 정보(패스워드, API 키 등)가 포함되지 않았는지 확인
