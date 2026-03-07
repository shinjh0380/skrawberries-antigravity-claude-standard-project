# Uncertainty Register

> 이 프레임워크에서 가정하거나 직접 검증하지 못한 사항을 추적합니다.
> 새 불확실성 발견 시 여기에 등록하고, 해소 시 상태를 업데이트합니다.

## Active Uncertainties

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

### U-004: Antigravity 브라우저 서브에이전트 캡처 형식
- **상태**: Unresolved
- **가정**: 브라우저 캡처가 파일로 저장되어 핸드오프에 포함 가능
- **실제 확인 필요**: Antigravity 브라우저 에이전트 출력 형식
- **리스크**: 캡처가 파일이 아닌 다른 형식(URL, 메모리 객체)일 수 있음
- **완화**: `docs/antigravity/browser-evidence-guide.md`에 일반적 접근 방식 가이드

### U-005: Hook `prompt` 타입 세부 동작
- **상태**: Partially Resolved
- **가정**: `command` 타입을 우선 사용하여 회피
- **결정**: 모든 Hook을 `command` 타입으로 구현 — `prompt` 타입은 사용하지 않음
- **리스크 (잔여)**: 향후 `prompt` 타입이 필요한 사용 케이스 발생 시 재검토 필요

### U-006: `${CLAUDE_PLUGIN_ROOT}` 환경변수 가용성
- **상태**: Assumed Available
- **가정**: `hooks/hooks.json`에서 `${CLAUDE_PLUGIN_ROOT}`가 Hook 실행 시 설정됨
- **실제 확인 필요**: Claude Code 문서에서 Plugin root 환경변수 확인
- **리스크**: 환경변수가 설정되지 않으면 Hook 스크립트 경로가 잘못될 수 있음
- **완화**: 스크립트 내에서 `process.cwd()` fallback 사용 가능

## Resolved Uncertainties

| ID | 내용 | 해소 방법 | 해소일 |
|----|------|----------|--------|
| | | | |

## How to Update

새 불확실성 발견 시:
1. `U-{NNN}` 형식으로 ID 부여
2. 상태: Unresolved / Partially Resolved / Assumed Available
3. 가정, 실제 확인 필요 내용, 리스크, 완화 방법 기술

불확실성 해소 시:
1. "Resolved Uncertainties" 섹션으로 이동
2. 해소 방법과 날짜 기록
3. 관련 파일의 `[PROPOSED]` 마킹 업데이트
