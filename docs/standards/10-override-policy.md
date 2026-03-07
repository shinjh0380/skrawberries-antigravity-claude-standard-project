# Standard 10: Override Policy

## Purpose

불가피한 예외 상황에서 표준 규칙을 Override할 수 있는 절차를 정의합니다. 무분별한 Override를 방지하고 모든 예외를 추적 가능하게 합니다.

## Rules

1. **OVER-01**: Override는 명시적 태그와 사유 없이 불가능하다.
2. **OVER-02**: 보호된 경로 Override: 요청에 `[override:PROTECTED-PATH]` 태그를 포함해야 한다.
3. **OVER-03**: 위험한 명령어 Override: `[override:DANGEROUS-CMD]` 태그와 사유를 명시해야 한다.
4. **OVER-04**: 커밋 컨벤션 Override: `[override:COMMIT-FORMAT]` 태그와 사유를 명시해야 한다.
5. **OVER-05**: 모든 Override는 편차 보고서(`templates/deviation-report.md`)에 기록되어야 한다.
6. **OVER-06**: **Invariants** (절대 Override 불가): 보안 취약점 도입, 사용자 데이터 파괴, 프로덕션 강제 푸시 (리뷰 없이).

## Override Tag Format

```
[override:{RULE-ID}] {사유}

예시:
[override:PROTECTED-PATH] hooks/hooks.json에 새 이벤트 추가 필요 - 신규 툴 지원
[override:DANGEROUS-CMD] 개발 환경 전체 초기화 필요 - rm -rf node_modules
[override:COMMIT-FORMAT] 외부 도구 자동 생성 커밋 메시지 - 변경 불가
```

## Invariants (절대 불가)

다음 행동은 어떠한 Override 태그로도 허용되지 않는다:

| 행동 | 이유 |
|------|------|
| SQL Injection, XSS 등 보안 취약점 의도적 도입 | 보안 |
| 프로덕션 데이터베이스 내용 파괴 | 복구 불가 |
| 사용자 인증 없는 강제 푸시 (팀 레포) | 협업 무결성 |
| 증거 없는 완료 주장 | 신뢰성 |

## Override Audit Trail

Override 발생 시 `docs/governance/audit-checklist.md`에 다음을 기록:
- 날짜, Override 유형, 사유, 결과

## Owner

CC (1인 개발자 = 본인이 승인자)

## Enforcement

- **Hook (PreToolUse)**: `[override:...]` 태그 파싱 후 차단 해제
- **Template**: `templates/deviation-report.md` — Override 사유 문서화

## Examples

### 정상 Override 요청
```
[override:PROTECTED-PATH] 새로운 Hook 이벤트 타입을 hooks/hooks.json에 추가해야 합니다.
기존 설정을 유지하면서 PostToolUse 이벤트를 추가해주세요.
```

### 무효한 Override 요청
```
"이거 그냥 수정해줘" (태그 없음 → Hook이 차단)
```
