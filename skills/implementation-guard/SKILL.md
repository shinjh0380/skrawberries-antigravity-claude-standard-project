---
name: implementation-guard
description: Use during implementation to enforce minimal-diff, change boundaries, and protected patterns. Use when starting to write code, when you want to verify you're staying in scope, or when implementation seems to be expanding beyond the original plan.
---

# Implementation Guard

구현 중 범위 준수 및 제약 조건을 강제합니다.

## Steps

### 1. Load Scope Reference

현재 태스크의 확정된 범위를 로드합니다:
- `scope-risk-pass` 출력 (있는 경우)
- 핸드오프 문서의 Scope Boundary
- 인테이크 스펙의 포함/제외 목록

### 2. Pre-Implementation Checklist

코드 작성 전 확인합니다:

- [ ] 변경 대상 파일이 확정된 범위 내에 있는가?
- [ ] 보호된 경로(`CLAUDE.md` 참조)를 수정하지 않는가?
- [ ] 기존 패턴과 컨벤션을 파악했는가?
- [ ] 보안 위험 패턴이 없는가?

### 3. During Implementation — Change Tracking

구현 중 변경 추적:

```bash
# 현재 변경 사항 확인
git diff --stat HEAD
git diff HEAD --name-only
```

**범위 내 파일만 수정해야 합니다.**

범위 외 파일 수정이 필요한 경우:
1. 즉시 중단
2. `templates/deviation-report.md` 작성
3. 사용자 확인 요청
4. 승인 후 재개

### 4. Minimal Diff Check

각 변경 후 자문합니다:
- "이 변경이 수락 기준을 달성하기 위한 최소한의 변경인가?"
- "요청되지 않은 개선이나 리팩터링을 했는가?"
- "주석, docstring, 타입 힌트를 요청 없이 추가했는가?"

위반 시: 해당 변경을 롤백하고 재작성합니다.

### 5. Security Pattern Check

보안 취약점 패턴을 확인합니다:

| 패턴 | 위험 |
|------|------|
| `eval(`, `exec(`, `Function(` | 코드 인젝션 |
| SQL 문자열 연결 | SQL 인젝션 |
| `innerHTML =` | XSS |
| `process.env` 직접 출력 | 비밀 노출 |
| `Math.random()` (보안 목적) | 예측 가능한 난수 |

위반 발견 시: 즉시 수정 후 사용자에게 알림.

### 6. Post-Implementation Checklist

구현 완료 후 확인합니다:

```
## Implementation Guard — Final Check

변경 파일:
  - {파일 목록}

범위 준수: PASS / FAIL
  포함 파일만 수정: {yes/no}

Minimal Diff: PASS / FAIL
  요청 외 변경 없음: {yes/no}

Security: PASS / FAIL
  취약점 패턴 없음: {yes/no}

다음 단계: /verification-bundle
```

## Escalation

범위 외 변경이 필요하다는 것이 명확한 경우:
```
이 구현은 원래 범위({파일 A, B})를 넘어 {파일 C}의 수정도 필요합니다.
계속 진행하려면 /scope-risk-pass를 다시 실행하여 범위를 조정해야 합니다.
진행할까요?
```
