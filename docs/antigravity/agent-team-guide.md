# Antigravity Agent Team 가이드

> 이 가이드는 Antigravity 운영자가 agent team escalation 기능을 사용하는 방법을 설명합니다.
> **실험적 기능**: `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` 환경 필요

---

## 개요

Agent team escalation은 복잡한 태스크에서 여러 Claude Code 인스턴스가 팀으로 협업하도록 하는 실험적 기능입니다.

### Subagent vs Agent Team

| 항목 | Subagent | Agent Team |
|------|----------|------------|
| 통신 방향 | 일방향 (주→서브) | 양방향 |
| 인스턴스 독립성 | 종속 | 독립 |
| 실험적 상태 | 아니오 | 예 |
| 토큰 비용 | ~1.x배 | ~N배 |
| 적합한 경우 | 읽기전용 조사 | 독립 workstream 협업 |

---

## AG 역할: 팀 추천

Antigravity는 태스크 분석 중 팀이 유리하다고 판단하면 사용자에게 추천합니다.

### 추천 조건

다음 시그널이 2개 이상 있을 때:
- 독립 workstream 3개 이상
- 도메인별 전문 역할 필요
- 병렬 처리로 유의미한 이점 예상
- 사용자의 명시적 팀 요청

### 추천 메시지 예시

```
## Agent Team 추천 [EXPERIMENTAL]

**태스크**: task-2026-042
**추천 사유**: 마케팅 전략, 기술 구현, 시장 조사가 독립적으로 진행 가능하며
              각각 전문화된 접근이 유리합니다.
**제안 팀 구성**: 3명 — Marketing Strategist, Implementation Lead, Market Researcher
**예상 추가 비용**: ~3x 토큰 사용
**예상 이점**: 병렬 처리로 70% 시간 단축, 도메인 전문성 향상

### 선택지
1. 전체 팀 승인 — 3명 구성으로 진행
2. 축소 팀 승인 — 일부 역할만 사용
3. 거부 — 단일 세션으로 진행
4. 상세 설명 요청
```

---

## 워크플로우

### 팀 승인 시

```
AG: 태스크 분석 → 팀 추천 메시지 제시
→ 사용자: 승인 선택
→ AG: execution-mode: "agent-team" 포함 핸드오프 생성
→ CC: /team-escalation-eval → /team-charter-create
→ CC: Charter + Role cards 생성
→ CC: 팀으로 태스크 실행
→ CC: cc-to-ag 핸드오프 (charter-path 포함)
→ AG: 최종 결과 확인
```

### 팀 거부 시

```
AG: 태스크 분석 → 팀 추천 메시지 제시
→ 사용자: 거부 선택
→ AG: execution-mode: "single-session" 포함 핸드오프 생성
→ CC: 기존 방식으로 태스크 실행 (페널티 없음)
```

---

## 핸드오프 YAML 예시

### 팀 승인 시

```yaml
---
direction: "ag-to-cc"
source-tool: "antigravity"
target-tool: "claude-code"
timestamp: "2026-03-08T10:00:00+09:00"
task-id: "task-2026-042"
status: "pending"
priority: "high"
risk-level: "medium"
evidence-path: ""
execution-mode: "agent-team"
team-size: 3
charter-path: ""
---
```

### 팀 거부 시

```yaml
---
direction: "ag-to-cc"
source-tool: "antigravity"
target-tool: "claude-code"
timestamp: "2026-03-08T10:00:00+09:00"
task-id: "task-2026-042"
status: "pending"
priority: "high"
risk-level: "medium"
evidence-path: ""
execution-mode: "single-session"
---
```

---

## 주의사항

### 실험적 기능 한계

- 모든 환경에서 동작을 보장할 수 없습니다
- 예기치 않은 동작 발견 시 즉시 단일 세션으로 전환하세요
- `uncertainty-register.md`의 U-007~U-010 항목을 확인하세요

### 팀 추천 빈도

- 팀 추천은 보수적으로 해야 합니다
- Rubric의 negative factor 1.5× 가중치가 과도한 팀 사용을 억제합니다
- 의심스러울 때는 단일 세션을 선택하세요

### 소유권 명확화

- AG: 팀 추천 (권고만, 강제 없음)
- 사용자: 최종 승인/거부 (TEAM-03)
- CC: 팀 구성 및 실행 (charter 생성, 팀 조율)

---

## 관련 파일

| 파일 | 용도 |
|------|------|
| `docs/standards/11-agent-team-escalation.md` | 전체 규칙 및 rubric |
| `templates/agent-team-recommendation.md` | 팀 추천 메시지 템플릿 |
| `templates/execution-mode-decision.md` | 모드 결정 기록 |
| `templates/team-decline-fallback.md` | 거부 기록 |
| `templates/agent-team-charter.md` | 팀 헌장 |
| `templates/teammate-role-card.md` | 팀원 역할 정의 |
| `skills/team-escalation-eval/SKILL.md` | CC 모드 평가 스킬 |
| `skills/team-charter-create/SKILL.md` | CC charter 생성 스킬 |
| `.agent/rules/06-agent-team-escalation.md` | 이 AG 규칙 [PROPOSED] |
| `docs/governance/uncertainty-register.md` | U-007~U-010 불확실성 |
