# Skill: /team-charter-create

## Purpose

사용자 승인 후 agent team charter와 팀원 role card를 생성합니다.

관련 규칙: TEAM-05, TEAM-06, TEAM-07, TEAM-11

## Prerequisites

- 사용자의 팀 구성 승인 완료 (TEAM-03)
- `templates/agent-team-recommendation.md`의 `status` 필드가 `approved-full` 또는 `approved-partial`
- 실행 모드 결정 기록 (`execution-mode-decision.md`) 존재

## Execution Steps

### Step 1: Load Approval Context

`agent-team-recommendation.md`에서 다음을 확인합니다:
- 승인된 팀 구성 (역할 목록)
- 축소 팀 승인이면 최종 팀원 목록
- 태스크 범위 및 제약 사항

### Step 2: Draft Team Charter

`templates/agent-team-charter.md`를 기반으로 charter 초안을 작성합니다:

1. **Mission Statement**: 팀이 달성할 목표
2. **Team Composition**: 팀원 ID, 역할명, archetype, 담당 범위
3. **File Boundary Map**: 파일/디렉토리별 쓰기 소유권 명시
4. **Communication Protocol**: 팀원 간 결과 공유 방법

파일명: `handoffs/charter-{task-id}-{YYYYMMDD}.md`

### Step 3: Create Role Cards

각 팀원에 대해 `templates/teammate-role-card.md`를 기반으로 role card를 작성합니다:
- Mission, Boundaries, Expected Outputs, Tools & Permissions
- Handoff Expectations, Success Criteria

파일명: `handoffs/role-{task-id}-teammate-{N}-{YYYYMMDD}.md`

### Step 4: Team Coordinator Review

`agents/team-coordinator.md` 에이전트를 실행하여 다음을 검토합니다:
- TEAM-07: 팀 크기 최소화 확인
- TEAM-11: 파일 충돌 위험 평가

### Step 5: Apply Review Feedback

team-coordinator 권고사항을 반영합니다:
- 불필요 팀원 제거 권고 → charter 수정
- 파일 경계 재정의 필요 → File Boundary Map 수정
- F7 점수 2 이상 → 명시적 파일 경계 추가

### Step 6: Finalize

수정된 charter와 role card 경로를 사용자에게 보고합니다:

```
## Team Charter 생성 완료

[EXPERIMENTAL: agent-teams]

- Charter: handoffs/charter-{task-id}-{YYYYMMDD}.md
- Role cards: {N}개 생성
- Team size: {N}명 (TEAM-07: 최소 필요 인원 확인됨)
- File overlap risk: F7={score} ({수준})

팀 구성을 확인하고 작업을 시작하세요.
```

## Output

- `handoffs/charter-{task-id}-{YYYYMMDD}.md`
- `handoffs/role-{task-id}-teammate-{N}-{YYYYMMDD}.md` (팀원 수만큼)
- `execution-mode-decision.md` 업데이트 (charter-path 추가)

## Notes

- Charter는 TEAM-12에 따라 최종 핸드오프에 참조됩니다
- 팀원이 1명인 경우 → single-session으로 fallback (charter 불필요)
- 실험적 기능 상태는 모든 생성 파일에 `[EXPERIMENTAL: agent-teams]` 태그로 명시
