---
template: task-approval-artifact
version: "1.0"
task-id: "{task-id}"
teammate-id: "{teammate-id}"
plan-version: 1
approval-mode: "auto-approved" | "user-approved" | "user-rejected" | "revised"
approver: "cc-lead" | "user"
approval-timestamp: "{ISO8601}"
escalation-reason: ""
---

# Task Approval Artifact: {task-id} / {teammate-id}

> TEAM-15 준수: 팀원의 substantive 작업 시작 전 실행 계획 승인 기록

## Plan Summary

**목표**: {1문장으로 이 팀원이 달성해야 할 것}

**수정 대상 파일**:
- `{path/to/file1}`
- `{path/to/file2}`

**접근 방법**: {구체적 구현 방법 2-4줄}

**검증 방법**: {완료 후 어떻게 확인할 것인가}

**롤백 방법**: {문제 발생 시 어떻게 되돌릴 것인가}

## Approval Decision

**approval-mode**: `auto-approved` / `user-approved` / `user-rejected` / `revised`

**approval-reason**: {승인 또는 거부 이유}

**escalation-reason** (user-required인 경우):
{사용자 승인이 필요한 구체적 이유 — auto-approved인 경우 비워둠}

## Auto-Approval Checklist

다음 조건을 **모두** 충족해야 CC lead가 자동 승인 가능:

- [ ] 수정 파일 2개 이하
- [ ] 보호된 경로 미접근 (IMPL-06 해당 없음)
- [ ] 아키텍처/스키마/보안 결정 불포함
- [ ] 수락 기준(acceptance criteria)이 명확
- [ ] 검증 방법이 이미 알려져 있음
- [ ] 롤백이 단순함 (파일 복원만으로 가능)

**결과**: {모두 충족 → auto-approved / 하나라도 미충족 → user-required}

## Revision History

| plan-version | 변경 내용 | timestamp |
|-------------|----------|-----------|
| 1 | 초안 | {ISO8601} |
| | | |
