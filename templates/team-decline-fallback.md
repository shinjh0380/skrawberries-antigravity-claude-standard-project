---
template: team-decline-fallback
version: "1.0"
task-id: "{task-id}"
timestamp: "{ISO8601}"
declined-by: "user" | "cc"
fallback-mode: "single-session" | "subagents"
original-net-score: {number}
---

# Team Decline Fallback: {task-id}

## Decline Record

- **태스크**: {task-id}
- **거부 시점**: {ISO8601}
- **거부 주체**: {user / cc}
- **원래 추천**: agent-team ({N}명 — {역할 목록})
- **원래 Net Score**: {score}

## Decline Reason

{사용자 또는 CC가 팀을 거부한 이유 요약. 없으면 "사용자 명시 없음" 기재.}

## Fallback Plan

- **대안 모드**: `{fallback-mode}`
- **전환 근거**: {왜 이 대안 모드가 적합한지}

### single-session 전환 시
- 구현 순서: {순차 실행 계획}
- 예상 소요: {단일 세션 기준 접근 방식}

### subagents 전환 시
- 위임 작업: {독립적으로 위임할 작업 목록}
- 주 인스턴스 담당: {CC 직접 수행 범위}

## Trade-offs

| 항목 | Agent Team | {fallback-mode} |
|------|------------|----------------|
| 병렬성 | 높음 | {수준} |
| 토큰 비용 | ~{N}x | ~1x |
| 조율 복잡도 | 높음 | {수준} |
| 실험적 위험 | 있음 | 없음 |

## Notes

{추가 주의사항, 제약사항, 향후 재평가 시점 등}
