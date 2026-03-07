# Skill: /team-escalation-eval

## Purpose

태스크를 분석하여 최적 실행 모드(single-session / subagents / agent-team)를 결정하고 기록합니다.

관련 규칙: TEAM-01, TEAM-02, TEAM-04, TEAM-14

## When to Use

- 새 태스크 플래닝 시작 전 (TEAM-01)
- 복잡한 태스크에서 병렬 처리 가능성이 있을 때
- `/session-init` 또는 `/scope-risk-pass` 후 자연스럽게 연결

## Execution Steps

### Step 1: Fast-Track Check

다음 중 하나에 해당하면 rubric 계산 없이 즉시 결정:

**단계 1a — 즉시 single-session**:
- 변경 파일 3개 이하 + 단일 관심사?
- → `decided-mode: single-session`, fast-track 기록, **Step 4로 이동**

**단계 1b — 즉시 subagents**:
- 독립 읽기전용 조사 2개 이상 + 팀 통신 불필요?
- → `decided-mode: subagents`, fast-track 기록, **Step 4로 이동**

**단계 1c — 즉시 agent-team-recommended**:
- 독립 workstream 3개 이상 + 상호 통신 필요 + 긴급도 high 이상?
- → `decided-mode: agent-team-recommended`, fast-track 기록, **Step 3으로 이동**

fast-track 해당 없음 → **Step 2로 이동**

### Step 2: Rubric Scoring

각 factor를 0~3점으로 평가합니다.

**Positive factors** (docs/standards/11-agent-team-escalation.md의 scoring table 참조):
- F1: Distinct workstreams
- F2: Workstream independence
- F3: Parallel research/analysis need
- F4: Cross-functional perspective need
- F5: Peer communication need
- F6: Parallelizable nature
- F9: Token/cost tolerance
- F10: User urgency

**Negative factors** (1.5× 가중):
- F7: File overlap risk
- F8: Coordination overhead

```
net_score = (F1+F2+F3+F4+F5+F6+F9+F10) - (F7+F8)×1.5
```

**Mode selection**:
- net_score < 4 → `single-session`
- 4 ≤ net_score < 8 → `subagents`
- 8 ≤ net_score < 12 → `agent-team-possible`
- net_score ≥ 12 → `agent-team-recommended`

### Step 2.5: Cost Estimation (TEAM-14)

rubric 점수가 `agent-team-possible` 이상인 경우, 팀 구성 전에 비용을 추정합니다:

1. **팀원 수 × 예상 토큰 배수**: 팀원 N명 → 단일 세션 대비 ~N×배 토큰 예상
2. **브로드캐스트 필요 여부**: 진행률 보고 외 브로드캐스트가 필요한가? (금지)
3. **재시도 위험**: 팀원 중 동일 작업을 3회 이상 재시도할 가능성이 있는가?
4. **유휴 위험**: 팀원이 다른 팀원 완료를 기다리며 유휴 상태가 될 가능성은?

**비용 추정 결과를 recommendation에 포함**:
```
예상 추가 비용: ~{N}x 토큰 사용 (팀원 {N}명 기준)
비용 경고 임계값: 예상치의 150% 초과 시 사용자 알림
```

비용 위험이 높으면 (`재시도 위험 높음` + `유휴 위험 높음`) → net_score에서 2점 차감 후 재계산

### Step 3: Agent Team Path

mode가 `agent-team-possible` 또는 `agent-team-recommended`인 경우:

1. `templates/agent-team-recommendation.md`를 작성합니다
2. 사용자에게 팀 추천 메시지를 제시합니다 (Approval UX 형식)
3. 사용자 응답을 기다립니다 (TEAM-03: 승인 게이트)
4. 응답에 따라:
   - 승인 → `/team-charter-create` 스킬 실행
   - 거부 → `templates/team-decline-fallback.md` 작성 후 fallback 모드로 전환
   - 상세 설명 요청 → 추가 정보 제공 후 재확인

### Step 4: Record Decision

`templates/execution-mode-decision.md`를 작성합니다:
- 결정된 모드
- fast-track 여부
- rubric 점수 (fast-track이 아닌 경우)
- 결정 근거

### Step 5: Announce

사용자에게 결정 결과를 간략히 보고합니다:

```
실행 모드 결정: {mode}
근거: {1문장}
[agent-team인 경우] → 팀 추천 메시지를 확인해 주세요.
```

## Output

- `execution-mode-decision.md` (항상)
- `agent-team-recommendation.md` (agent-team-possible/recommended인 경우)

## Notes

- Agent team은 실험적 기능입니다 (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` 필요)
- 팀 추천은 권고일 뿐, 사용자 거부 시 페널티 없음 (TEAM-08)
- single-session 결정은 subagent 사용을 배제하지 않음 (단순 위임은 가능)
