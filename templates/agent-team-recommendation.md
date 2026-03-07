---
template: agent-team-recommendation
version: "1.0"
task-id: "{task-id}"
timestamp: "{ISO8601}"
recommended-by: "cc" | "ag"
proposed-team-size: {number}
net-score: {number}
status: "pending" | "approved-full" | "approved-partial" | "declined" | "more-info-requested"
---

# Agent Team 추천: {task-id}

> [EXPERIMENTAL: agent-teams] 이 추천은 실험적 기능(CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1)을 사용합니다.

## Agent Team 추천

**태스크**: {task-id}
**추천 사유**: {1-2문장으로 왜 팀이 유리한지 설명}
**제안 팀 구성**: {N}명 — {역할1}, {역할2}, ...
**예상 추가 비용**: ~{N}x 토큰 사용 (단일 세션 대비)
**예상 이점**: {시간 절약 / 품질 향상 / 병렬 처리 등 구체적 이점}

### 팀 구성 상세

| 팀원 | 역할 | 담당 범위 |
|------|------|----------|
| 팀원 1 | {역할명} | {담당 파일/기능} |
| 팀원 2 | {역할명} | {담당 파일/기능} |
| (추가 시) | | |

### Rubric Summary

- **Net Score**: {score} / 24 (agent-team-possible: 8+, agent-team-recommended: 12+)
- **주요 긍정 요소**: {F1~F6, F9, F10 중 높은 점수 요소}
- **주요 위험 요소**: {F7, F8 점수 및 완화 방안}

---

## 선택지

다음 중 하나를 선택해 주세요:

1. **전체 팀 승인** — 위 구성({N}명)대로 진행
2. **축소 팀 승인** — 일부 역할만 사용 (어떤 역할을 유지할까요?)
3. **거부** — 팀 없이 진행 (단일 세션 또는 subagent 대안 사용)
4. **상세 설명 요청** — 결정 전 추가 정보 필요

---

## 사용자 응답

> 사용자 응답 후 CC가 이 섹션을 채웁니다.

- **결정**: {approved-full / approved-partial / declined / more-info-requested}
- **응답 내용**: {사용자 발언 요약}
- **승인된 팀 구성**: {최종 팀원 목록, 거부 시 N/A}
- **다음 단계**: {charter 생성 / fallback 기록 / 추가 정보 제공}
