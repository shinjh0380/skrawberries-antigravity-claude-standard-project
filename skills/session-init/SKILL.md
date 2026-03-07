---
name: session-init
description: Use when starting a work session, user says 'start session', 'init', '세션 시작', or at the beginning of a working day. Initializes session context by checking git state, scanning pending handoffs, and setting session goals.
---

# Session Init

세션 시작 시 컨텍스트를 로드하고 작업 방향을 설정합니다.

## Steps

### 1. Git State Check

다음을 확인하고 결과를 보고합니다:

```bash
git status --short
git log --oneline -5
git branch --show-current
```

- **uncommitted changes**: 있으면 사용자에게 알리고 처리 방법 결정 요청
- **current branch**: main/master라면 새 기능 작업 전 브랜치 분기 제안
- **recent commits**: 마지막 세션의 맥락 파악

### 2. Pending Handoffs Scan

`handoffs/` 디렉토리를 스캔합니다:

- `status: pending` — 수신 대기 중 (CC가 아직 받지 않음)
- `status: received` — 수신 완료, 작업 진행 중

각 핸드오프에 대해 다음을 출력:
```
[{status}] {파일명}
  Task: {task-id}
  Priority: {priority}
  Direction: {direction}
```

### 3. Evidence Directory Check

`evidence/` 디렉토리가 있으면 최근 번들 목록 표시.

### 4. Session Goals

사용자에게 오늘 세션의 목표를 확인합니다:

```
오늘 세션에서 진행할 작업을 알려주세요:
1. 새 태스크 시작 → /intake-refine 사용
2. 기존 핸드오프 처리 → /handoff-review 사용
3. 진행 중인 작업 계속
4. 기타
```

### 5. Session Summary Output

최종 세션 요약을 출력합니다:

```
## 세션 요약
- Branch: {branch}
- Uncommitted: {있음/없음}
- Pending handoffs: {수} 개
- 오늘 목표: {사용자 답변}
```

## Notes

- 이 스킬은 정보 수집 전용 — 코드를 변경하지 않습니다
- 핸드오프 처리는 `/handoff-review`로 위임합니다
- git 명령은 읽기 전용만 실행합니다
