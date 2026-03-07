# Uncertainty Register

> 이 프레임워크에서 가정하거나 직접 검증하지 못한 사항을 추적합니다.
> 새 불확실성 발견 시 여기에 등록하고, 해소 시 상태를 업데이트합니다.

## 출처(Provenance) 카테고리 정의

| 카테고리 | 설명 | 신뢰도 |
|---------|------|--------|
| **Category A** | Verified Claude Code Native — 직접 검증된 Claude Code 기능 | 높음 |
| **Category B** | Verified Antigravity Behavior (Public) — 공개 문서/행동에서 확인된 AG 사항 | 높음 |
| **Category C** | Proposed Antigravity Adapter Conventions — 직접 검증 불가, 제안된 AG 연동 방식 | 낮음 (`[PROPOSED]`) |
| **Category D** | Unknowns (Must Remain Manual) — 검증까지 수동 운영 필요한 미지 사항 | 불확실 |

---

## Category A: Verified Claude Code Native

직접 검증된 Claude Code 기능 — 확실한 기반

| 항목 | 검증 내용 | 참조 |
|------|----------|------|
| Plugin structure | `.claude-plugin/plugin.json` + `skills/`, `agents/`, `hooks/` 디렉토리 구조 유효 | 플러그인 빌드 결과 |
| Hook `command` type | `hooks/hooks.json`의 `command` 타입 Hook이 올바르게 동작 | U-005 해소 |
| `${CLAUDE_PLUGIN_ROOT}` env var | Hook 실행 시 `${CLAUDE_PLUGIN_ROOT}` 환경변수 설정됨 (assumed available) | U-006 — 부분 검증 |
| Skill invocation | `/skill-name` 형식으로 스킬 호출 가능 | 프레임워크 사용 중 확인 |
| `settings.json` plugin path | `.claude/settings.json`의 `enabledPlugins` 경로 설정 방식 | Claude Code 문서 |

---

## Category B: Verified Antigravity Behavior (Public)

공개 문서/행동에서 확인된 AG 사항

현재 이 카테고리에 등록된 검증 항목이 없습니다.
AG 공개 문서 또는 실제 사용 경험을 통해 확인된 사항이 있으면 여기에 추가합니다.

---

## Category C: Proposed Antigravity Adapter Conventions

직접 검증 불가, 제안된 AG 연동 방식 — `[PROPOSED]` 마킹

### U-001: Antigravity `.agent/rules/` 활성화 방식
- **상태**: Unresolved
- **가정**: 파일이 존재하면 Antigravity가 자동 감지하여 적용
- **실제 확인 필요**: Antigravity 공식 문서 또는 IDE 내 설정
- **리스크**: 규칙 파일이 실제로 적용되지 않을 수 있음
- **완화**: 규칙 내용을 핸드오프에 수동으로 포함하는 fallback 사용
- **참조 파일**: `.agent/rules/*.md` (모두 `[PROPOSED]` 마킹)

### U-002: Always On vs Model Decision 활성화 모드
- **상태**: Unresolved
- **가정**: 파일 헤더에 모드를 표기하면 Antigravity가 인식
- **실제 확인 필요**: Antigravity rules 포맷 명세
- **리스크**: 모드 구분이 없으면 모든 규칙이 Always On 또는 전부 Model Decision으로 처리될 수 있음
- **완화**: 파일 헤더에 `[PROPOSED]` 명시, 실제 동작과 무관하게 내용은 유효

### U-003: `~/.gemini/GEMINI.md` 글로벌 규칙 충돌
- **상태**: Unresolved
- **가정**: 프로젝트 규칙이 글로벌 규칙보다 우선
- **실제 확인 필요**: Antigravity 설정 우선순위 확인
- **리스크**: 글로벌 규칙이 이 프로젝트 규칙을 재정의할 수 있음
- **완화**: 충돌 가능 항목을 `docs/antigravity/operator-guide.md`에 주의사항으로 문서화

### U-011: Agent Team 내 개별 Teammate 모델 핀 미지원
- **상태**: Unresolved
- **가정**: Claude Code는 agent team 내 개별 teammate의 모델을 프로그래밍 방식으로 pin하는 네이티브 설정을 지원하지 않음
- **실제 확인 필요**: Claude Code agent team 기능의 모델 선택 API 또는 설정 방법 공식 문서
- **리스크**: 모델 정책(opusplan/sonnet)이 지시문으로만 전달되어 실제 모델 선택을 보장할 수 없음
- **완화**: `agent-team-charter.md`의 `model-policy` YAML 필드에 권장 모델 명시; role card Notes에 모델 권장사항 기록; team-spawn 지시문으로만 전달
- **참조 파일**: `docs/standards/11-agent-team-escalation.md` (Model Policy 섹션), `templates/agent-team-charter.md`

### U-007: Agent Team 환경 변수 활성화 방식
- **상태**: Unresolved
- **가정**: `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` 환경 변수 설정 시 agent team 기능이 활성화됨
- **실제 확인 필요**: Claude Code 실험적 기능 공식 문서 또는 실제 환경 테스트
- **리스크**: 환경 변수명 또는 활성화 방식이 변경될 수 있음; 실험적 기능이 일반 배포에서 제거될 수 있음
- **완화**: 모든 agent team 관련 파일에 `[EXPERIMENTAL]` 마킹 및 fallback 경로 명시
- **참조 파일**: `docs/standards/11-agent-team-escalation.md`, `.agent/rules/06-agent-team-escalation.md`

### U-008: Antigravity의 Agent Team 추천 능력
- **상태**: Unresolved
- **가정**: Antigravity가 태스크 분석 중 팀 추천 로직을 실행할 수 있음 (`.agent/rules/06-agent-team-escalation.md`)
- **실제 확인 필요**: Antigravity의 Model Decision 규칙 처리 방식 및 복잡한 분석 수행 능력
- **리스크**: AG가 규칙을 읽어도 rubric 기반 추천을 실제로 수행하지 못할 수 있음
- **완화**: AG 추천 없이 CC의 `/team-escalation-eval` 스킬만으로도 전체 워크플로우 작동 가능
- **참조 파일**: `.agent/rules/06-agent-team-escalation.md` (모두 `[PROPOSED]` 마킹)

### U-004: Antigravity 브라우저 서브에이전트 캡처 형식
- **상태**: Unresolved
- **가정**: 브라우저 캡처가 파일로 저장되어 핸드오프에 포함 가능
- **실제 확인 필요**: Antigravity 브라우저 에이전트 출력 형식
- **리스크**: 캡처가 파일이 아닌 다른 형식(URL, 메모리 객체)일 수 있음
- **완화**: `docs/antigravity/browser-evidence-guide.md`에 일반적 접근 방식 가이드

---

## Category D: Unknowns (Must Remain Manual)

검증까지 수동 운영 필요한 미지 사항

### U-009: Agent Team 인스턴스 간 파일 쓰기 충돌 처리
- **상태**: Unresolved
- **가정**: 팀원이 서로 다른 파일을 담당하면 충돌이 발생하지 않음
- **실제 확인 필요**: Claude Code agent team에서 동시 파일 쓰기 시 운영체제 수준 잠금 또는 충돌 감지 여부
- **리스크**: 동일 파일에 두 인스턴스가 동시 쓰기 시 데이터 손실 가능
- **완화**: TEAM-11 규칙 및 File Boundary Map으로 파일 경계 사전 정의; team-coordinator 에이전트가 검토
- **현재 운영**: File Boundary Map을 수동으로 유지

### U-010: Agent Team 완료 후 컨텍스트 통합 방식
- **상태**: Unresolved
- **가정**: 팀원들이 작업 완료 후 결과를 하나의 최종 결과물로 통합할 수 있음
- **실제 확인 필요**: Agent team 환경에서 인스턴스 간 결과 통합 메커니즘
- **리스크**: 팀원 결과가 분산되어 최종 통합이 어려울 수 있음
- **완화**: Charter의 Communication Protocol에 통합 방법 명시; cc-to-ag 핸드오프를 팀 조율자가 작성
- **현재 운영**: 통합은 수동 조율 필요

### U-005: Hook `prompt` 타입 세부 동작
- **상태**: Partially Resolved
- **가정**: `command` 타입을 우선 사용하여 회피
- **결정**: 모든 Hook을 `command` 타입으로 구현 — `prompt` 타입은 사용하지 않음
- **리스크 (잔여)**: 향후 `prompt` 타입이 필요한 사용 케이스 발생 시 재검토 필요
- **현재 운영**: `command` 타입으로 수동 유지

### U-006: `${CLAUDE_PLUGIN_ROOT}` 환경변수 가용성
- **상태**: Assumed Available
- **가정**: `hooks/hooks.json`에서 `${CLAUDE_PLUGIN_ROOT}`가 Hook 실행 시 설정됨
- **실제 확인 필요**: Claude Code 문서에서 Plugin root 환경변수 확인
- **리스크**: 환경변수가 설정되지 않으면 Hook 스크립트 경로가 잘못될 수 있음
- **완화**: 스크립트 내에서 `process.cwd()` fallback 사용 가능
- **현재 운영**: 사용 전 수동으로 환경변수 설정 여부 확인 권장

---

## Resolved Uncertainties

| ID | 내용 | 해소 방법 | 해소일 |
|----|------|----------|--------|
| | | | |

---

## How to Update

**새 불확실성 발견 시:**
1. 적절한 카테고리(A~D) 판단
2. `U-{NNN}` 형식으로 ID 부여
3. 상태: Unresolved / Partially Resolved / Assumed Available
4. 가정, 실제 확인 필요 내용, 리스크, 완화 방법 기술

**불확실성 해소 시:**
1. "Resolved Uncertainties" 섹션으로 이동
2. 해소 방법과 날짜 기록
3. Category A 또는 B에 검증된 사항으로 추가
4. 관련 파일의 `[PROPOSED]` 마킹 업데이트

**카테고리 이동 기준:**
- Category C → Category B: Antigravity 공식 문서에서 확인된 경우
- Category D → Category A: 실제 Claude Code 동작에서 검증된 경우
