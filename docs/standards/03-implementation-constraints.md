# Standard 03: Implementation Constraints

## Purpose

구현 시 범위 크리프, 불필요한 변경, 보안 취약점 도입을 방지합니다.

## Rules

1. **IMPL-01**: **Minimal diff** 원칙: 요구사항을 충족하는 가장 작고 안전한 변경만 수행한다.
2. **IMPL-02**: 요청되지 않은 리팩터링, 스타일 정리, 코드 개선을 구현 중에 수행 금지.
3. **IMPL-03**: 변경 경계(Scope Boundary)를 준수해야 한다. 경계 외 파일 수정은 `/scope-risk-pass` 재실행 후 승인 필요.
4. **IMPL-04**: 보안 취약점 도입 금지: SQL 인젝션, XSS, 명령어 인젝션, OWASP Top 10에 포함된 패턴.
5. **IMPL-05**: 기존 패턴과 컨벤션을 보존해야 한다. 패턴 변경은 명시적 요청 시에만.
6. **IMPL-06**: 보호된 경로(`CLAUDE.md` 참조)는 수정 금지. 수정 시 `[override:PROTECTED-PATH]` 태그 명시 필요.
7. **IMPL-07**: 테스트 없이 프로덕션 코드를 수정하는 경우, 수동 검증 증거를 수집해야 한다.
8. **IMPL-08**: `TODO`, `FIXME`, `HACK` 주석을 새로 추가하는 경우 태스크 ID를 포함해야 한다.

## Owner

CC (Claude Code)

## Enforcement

- **Hook (PreToolUse)**: `protected-path-guard.js` — 보호된 경로 쓰기 차단
- **Hook (PreToolUse)**: `dangerous-command-guard.js` — 위험한 명령어 차단
- **Skill**: `/implementation-guard` — 구현 중 제약 준수 확인

## Examples

### 위반 (거부됨)
```
// 요청: 버튼 색상 변경
// 실제 변경: 버튼 색상 + ESLint 에러 수정 + 컴포넌트 리팩터링
```

### 준수
```
// 요청: 버튼 색상 변경
// 실제 변경: Button.tsx의 className 한 줄만 변경
// 관련 없는 ESLint 에러는 별도 태스크로 추적
```

## Exceptions

- 변경 대상 코드에 명백한 보안 취약점이 있는 경우: 즉시 수정 후 사용자에게 알림
- 요청된 변경이 기존 패턴을 따라야 하는데 패턴 자체에 오류가 있는 경우: 사용자에게 알리고 진행 방식 결정 요청
