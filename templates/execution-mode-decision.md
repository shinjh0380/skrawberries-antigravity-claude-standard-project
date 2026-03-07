---
template: execution-mode-decision
version: "1.0"
task-id: "{task-id}"
timestamp: "{ISO8601}"
decided-mode: "single-session" | "subagents" | "agent-team"
net-score: {number}        # rubric net score, fast-track이면 "fast-track"
fast-track: false          # true이면 rubric 계산 생략
experimental: false        # agent-team이면 true
---

# Execution Mode Decision: {task-id}

> [EXPERIMENTAL: agent-teams] — agent-team 모드 선택 시에만 이 태그 표시

## Task Summary

{1-2문장으로 태스크 요약}

## Fast-Track Result

> fast-track: true인 경우만 작성. false이면 이 섹션 생략.

- **조건**: {해당 fast-track 조건 명시}
- **결정**: `{mode}`

## Rubric Scores

> fast-track: false인 경우만 작성.

| Factor | Score (0-3) | 근거 |
|--------|-------------|------|
| F1: Distinct workstreams | | |
| F2: Workstream independence | | |
| F3: Parallel research/analysis need | | |
| F4: Cross-functional perspective need | | |
| F5: Peer communication need | | |
| F6: Parallelizable nature | | |
| F9: Token/cost tolerance | | |
| F10: User urgency | | |
| **Positive Sum** | | |
| F7: File overlap risk (×1.5) | | |
| F8: Coordination overhead (×1.5) | | |
| **Negative Sum (weighted)** | | |
| **Net Score** | | |

## Decision

- **Mode**: `{decided-mode}`
- **Policy threshold**: {해당 net score 범위}
- **Rationale**: {1-2문장 결정 근거}

## Next Steps

> decided-mode에 따라 해당 섹션만 작성.

### single-session
- 단일 세션으로 구현 시작
- 필요 시 subagent 위임 포함 가능

### subagents
- 위임할 독립 작업 목록: {list}
- 주 인스턴스 책임 범위: {description}

### agent-team (승인 필요)
- `templates/agent-team-recommendation.md` 작성 후 사용자 승인 요청
- 승인 전까지 구현 시작 금지
