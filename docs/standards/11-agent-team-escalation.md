# Standard 11: Agent Team Escalation

## Purpose

Agent team이 유리한 태스크에서 사용자에게 팀 모드를 추천하고, 승인 시 팀을 구성하며, 거부 시 단일 세션 또는 subagent로 자연스럽게 전환하는 표준을 정의합니다.

**실험적 기능 알림**: Claude Code agent teams는 `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` 환경 변수로 활성화되는 실험적 기능입니다. 모든 관련 규칙은 이 실험적 상태를 반영합니다.

---

## Rules

### TEAM-01: Evaluate execution mode before planning

태스크 접수 후, 플래닝 전에 반드시 실행 모드를 평가해야 한다.

- **Owner**: CC
- **Trigger**: 새 태스크 플래닝 시작 전
- **Enforcement**: Skill `/team-escalation-eval`
- **Note**: 단순 태스크(파일 3개 이하 + 단일 관심사)는 fast-track으로 single-session 결정 가능

### TEAM-02: Prefer simplest execution mode

동일한 결과를 달성할 수 있다면 더 단순한 실행 모드를 우선 선택해야 한다.

- **Owner**: CC
- **Trigger**: 실행 모드 결정 시
- **Enforcement**: Skill `/team-escalation-eval` (negative factor 1.5× 가중)
- **Mode priority**: single-session → subagents → agent-team

### TEAM-03: Agent team requires user approval

Agent team 모드는 사용자의 명시적 승인 없이 활성화할 수 없다.

- **Owner**: Shared
- **Trigger**: agent-team-possible 또는 agent-team-recommended 결정 시
- **Enforcement**: Manual (사용자 승인 게이트)
- **Template**: `templates/agent-team-recommendation.md`

### TEAM-04: Record execution mode decision

실행 모드 결정 결과(근거 포함)를 반드시 기록해야 한다.

- **Owner**: CC
- **Trigger**: 실행 모드 결정 직후
- **Enforcement**: Skill `/team-escalation-eval` + Template `execution-mode-decision.md`

### TEAM-05: Create team charter after approval

팀 구성이 승인되면 작업 시작 전에 team charter를 생성해야 한다.

- **Owner**: CC
- **Trigger**: 사용자 팀 승인 직후
- **Enforcement**: Skill `/team-charter-create` + Template `agent-team-charter.md`

### TEAM-06: Define teammate roles with role cards

팀원 각각의 역할을 role card로 정의해야 한다.

- **Owner**: CC
- **Trigger**: Team charter 생성 시
- **Enforcement**: Skill `/team-charter-create` + Template `teammate-role-card.md`

### TEAM-07: Minimum viable team size

팀 크기는 태스크 수행에 필요한 최소한으로 유지해야 한다. 불필요한 팀원 추가를 금지한다.

- **Owner**: CC
- **Trigger**: Team charter 초안 작성 시
- **Enforcement**: Skill `/team-charter-create` + Agent `team-coordinator`

### TEAM-08: Decline without penalty

사용자가 팀 구성을 거부해도 태스크 진행에 페널티가 없어야 한다. 거부는 valid한 선택이다.

- **Owner**: Shared
- **Trigger**: 사용자 팀 거부 시
- **Enforcement**: Manual
- **Note**: 거부 후 fallback 모드(single-session 또는 subagents)로 자연스럽게 전환

### TEAM-09: Record decline with fallback plan

팀 구성 거부 시 거부 이유와 대안 실행 계획을 기록해야 한다.

- **Owner**: CC
- **Trigger**: 사용자 팀 거부 직후
- **Enforcement**: Template `team-decline-fallback.md`

### TEAM-10: Mark experimental status

Agent team 관련 모든 문서와 결정 기록에 실험적 기능임을 명시해야 한다.

- **Owner**: CC
- **Trigger**: Agent team 관련 문서 생성 시
- **Enforcement**: Advisory
- **Note**: `[EXPERIMENTAL: agent-teams]` 태그 사용

### TEAM-11: File overlap risk assessment

팀 구성 시 팀원 간 파일 충돌 위험을 사전에 평가해야 한다.

- **Owner**: CC
- **Trigger**: Team charter 검토 시
- **Enforcement**: Skill `/team-charter-create` + Agent `team-coordinator`
- **Note**: F7(file overlap risk) 점수가 2 이상이면 파일 경계를 명시적으로 정의

### TEAM-12: Team handoff includes charter reference

Agent team 모드로 실행된 태스크의 핸드오프는 charter 경로를 포함해야 한다.

- **Owner**: Shared
- **Trigger**: Agent team 태스크 핸드오프 생성 시
- **Enforcement**: Skill `/handoff-create` (charter-path YAML 필드)

---

## Decision Rubric

`/team-escalation-eval` 스킬이 이 rubric을 사용하여 실행 모드를 결정합니다.

### Scoring Factors

**Positive factors** (높을수록 팀이 유리):

| ID | Factor | 0점 | 1점 | 2점 | 3점 |
|----|--------|-----|-----|-----|-----|
| F1 | Distinct workstreams | 1개 | 2개 | 3개 | 4개 이상 |
| F2 | Workstream independence | 의존적 (순차 필요) | 약간 의존 | 대부분 독립 | 완전 독립 |
| F3 | Parallel research/analysis need | 없음 | 낮음 | 중간 | 높음 |
| F4 | Cross-functional perspective need | 없음 | 낮음 | 중간 | 높음 |
| F5 | Peer communication need | 없음 | 낮음 | 중간 | 높음 |
| F6 | Parallelizable nature | 완전 순차 | 주로 순차 | 혼합 | 주로 병렬 |
| F9 | Token/cost tolerance | 낮음 | 중간 | 높음 | 무제한 |
| F10 | User urgency | 낮음 | 중간 | 높음 | 긴급 |

**Negative factors** (높을수록 팀이 불리, **1.5× 가중**):

| ID | Factor | 0점 | 1점 | 2점 | 3점 |
|----|--------|-----|-----|-----|-----|
| F7 | File overlap risk | 없음 | 낮음 | 중간 | 높음 |
| F8 | Coordination overhead | 최소 | 낮음 | 중간 | 높음 |

### Net Score Formula

```
positive_sum = F1 + F2 + F3 + F4 + F5 + F6 + F9 + F10
negative_sum = (F7 + F8) × 1.5
net_score = positive_sum - negative_sum
```

### Mode Selection Policy

| Net Score | 결정 | 설명 |
|-----------|------|------|
| < 4 | `single-session` | 팀 불필요, 단일 세션으로 충분 |
| 4 ~ 7 | `subagents` | 병렬 처리 유리하나 팀 불필요 |
| 8 ~ 11 | `agent-team-possible` | 팀이 도움이 될 수 있음 (옵션 제시) |
| ≥ 12 | `agent-team-recommended` | 팀이 명확히 유리 (적극 권장) |

### Fast-Track Conditions

다음 조건에 해당하면 rubric 계산 없이 즉시 결정:

**즉시 single-session**:
- 변경 파일 3개 이하 + 단일 관심사

**즉시 subagents**:
- 독립 읽기전용 조사 2개 이상 + 팀 통신 불필요

**즉시 agent-team-recommended**:
- 독립 workstream 3개 이상 + 상호 통신 필요 + 긴급도 high 이상

---

## Mode Descriptions

### single-session
단일 Claude Code 인스턴스가 모든 작업을 순차/병렬로 처리. 기본 모드.

### subagents
주 인스턴스가 독립 읽기전용 작업을 서브에이전트에 위임. 일방향 보고, 통신 불가.

### agent-team
`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` 환경에서 여러 독립 CC 인스턴스가 양방향 통신으로 협업. 실험적.

---

## Role Card Archetypes (참조용 카탈로그)

role card 작성 시 이 카탈로그를 참조합니다. hardcoded가 아닌 참조용입니다.

### Engineering Archetypes

| Archetype | Mission |
|-----------|---------|
| Technical Planner | 아키텍처 설계, 파일 경계 정의, 구현 순서 계획 |
| Implementation Lead | 핵심 기능 구현, 코드 작성 |
| Evidence Verifier | 구현 결과 검증, 테스트 실행, 증거 번들 생성 |

### Business Archetypes

| Archetype | Mission |
|-----------|---------|
| Marketing Strategist | 마케팅 전략 수립, 메시지 개발 |
| Product Analyst | 제품 요구사항 분석, 기능 우선순위 결정 |
| Financial Reviewer | 비용/수익 분석, 재무 모델링 |
| Market Researcher | 시장 조사, 경쟁사 분석 |
| Competitive Intelligence Analyst | 경쟁사 심층 분석, 차별화 포인트 도출 |

---

## Approval UX

AG 또는 CC가 사용자에게 팀 구성을 제안할 때 사용하는 표준 메시지 구조:

```
## Agent Team 추천 [EXPERIMENTAL]

**태스크**: {task-id}
**추천 사유**: {1-2문장}
**제안 팀 구성**: {N}명 — {역할1}, {역할2}, ...
**예상 추가 비용**: ~{N}x 토큰 사용
**예상 이점**: {시간 절약/품질 향상 등}

### 선택지
1. **전체 팀 승인** — 위 구성대로 진행
2. **축소 팀 승인** — 일부 역할만 사용 (어떤 역할?)
3. **거부** — 팀 없이 진행 (단일 세션/subagent 대안 사용)
4. **상세 설명 요청** — 결정 전 추가 정보 필요
```

---

## Owner

Shared (CC가 평가/실행 주도, AG가 추천, 사용자가 최종 승인)

## Enforcement

- **Skill**: `/team-escalation-eval` — rubric 평가 및 모드 결정
- **Skill**: `/team-charter-create` — 승인 후 charter + role card 생성
- **Agent**: `team-coordinator` — 팀 구성 검토 (파일 충돌, 팀 크기)
- **Template**: `execution-mode-decision.md` — 결정 기록
- **Template**: `agent-team-recommendation.md` — 추천 메시지
- **Template**: `team-decline-fallback.md` — 거부 기록
- **Template**: `agent-team-charter.md` — 팀 헌장
- **Template**: `teammate-role-card.md` — 팀원 역할 정의

## Exceptions

- **항상 single-session**: 보호된 경로 수정, override 태그 사용, 증거 번들 생성
- **긴급 처리**: `priority: critical` 태스크에서 사용자 동의 없이 rubric만으로 진행 후 사후 기록 가능
