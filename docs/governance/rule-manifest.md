# Rule Manifest

> 이 프레임워크의 모든 규칙을 Owner, Scope, Enforcement 메커니즘과 함께 정의합니다.
> 이 파일은 보호된 경로입니다. 수정 시 `[override:PROTECTED-PATH]` 태그 필요.

## A. Intake Rules

| ID | 내용 | Owner | Enforcement | 참조 |
|----|------|-------|-------------|------|
| INTAKE-01 | 새 태스크는 Goal/AC/Scope 포함 필수 | Shared | Skill: `/intake-refine` | standards/01 |
| INTAKE-02 | 시각 자료에 텍스트 설명 동반 | Shared | Skill: `/intake-refine` | standards/01 |
| INTAKE-03 | Priority 미명시 시 `normal` 기본값 | CC | Skill: `/intake-refine` | standards/01 |
| INTAKE-04 | 의존성 명시 의무 | Shared | Manual | standards/01 |
| INTAKE-05 | 불완전 요청은 `/intake-refine` 전까지 구현 금지 | CC | Skill | standards/01 |

## B. Planning Rules

| ID | 내용 | Owner | Enforcement | 참조 |
|----|------|-------|-------------|------|
| PLAN-01 | 구현 전 `/scope-risk-pass` 실행 | CC | Skill | standards/02 |
| PLAN-02 | High+ 리스크는 계획 문서 필수 | Shared | Skill | standards/02 |
| PLAN-03 | 계획에 단계/파일/검증 포함 | Shared | Manual | standards/02 |
| PLAN-04 | 모호성 발견 시 `/intake-refine` 복귀 | CC | Skill | standards/02 |
| PLAN-05 | 계획 변경은 deviation-report 작성 | CC | Template | standards/02 |
| PLAN-06 | 계획은 핸드오프 형식 준수 | Shared | Skill | standards/02 |

## C. Implementation Rules

| ID | 내용 | Owner | Enforcement | 참조 |
|----|------|-------|-------------|------|
| IMPL-01 | Minimal diff 원칙 | CC | Skill: `/implementation-guard` | standards/03 |
| IMPL-02 | 미요청 리팩터링 금지 | CC | Skill | standards/03 |
| IMPL-03 | 범위 경계 준수 | CC | Skill + Agent: scope-keeper | standards/03 |
| IMPL-04 | 보안 취약점 도입 금지 | CC | Skill | standards/03 |
| IMPL-05 | 기존 패턴 보존 | CC | Advisory | standards/03 |
| IMPL-06 | 보호된 경로 수정 금지 | CC | **Hook**: protected-path-guard | standards/03 |
| IMPL-07 | 테스트 없는 수동 검증 증거 수집 | CC | Skill: `/verification-bundle` | standards/03 |
| IMPL-08 | TODO/FIXME에 태스크 ID 포함 | CC | Advisory | standards/03 |

## D. Handoff Rules

| ID | 내용 | Owner | Enforcement | 참조 |
|----|------|-------|-------------|------|
| HAND-01 | YAML frontmatter + MD 형식 | Shared | Skill: `/handoff-review` | standards/04 |
| HAND-02 | YAML 9개 필드 모두 포함 | Shared | Skill | standards/04 |
| HAND-03 | handoffs/ 디렉토리 + 파일명 컨벤션 | Shared | Manual | standards/04 |
| HAND-04 | 수신 측 `/handoff-review` 먼저 실행 | CC | Skill | standards/04 |
| HAND-05 | `/handoff-create` 로 생성 | CC | Skill | standards/04 |
| HAND-06 | status 단방향 전진 | Shared | Manual | standards/04 |
| HAND-07 | evidence-path 실존 검증 | CC | Skill | standards/04 |
| HAND-08 | 완료 후 status 업데이트 | Shared | Manual | standards/04 |

## E. Verification Rules

| ID | 내용 | Owner | Enforcement | 참조 |
|----|------|-------|-------------|------|
| VERIF-01 | 기능/버그 수정 후 최소 1개 증거 | CC | **Hook**: evidence-reminder | standards/05 |
| VERIF-02 | evidence/{date}-{task-id}/ 저장 | CC | Skill: `/verification-bundle` | standards/05 |
| VERIF-03 | 테스트 결과 포함 | CC | Skill | standards/05 |
| VERIF-04 | UI 변경 시 스크린샷 포함 | AG | Manual | standards/05 |
| VERIF-05 | 번들 인덱스 파일 필수 | CC | Skill | standards/05 |
| VERIF-06 | 최종 커밋 전 `/final-walkthrough` | CC | Skill | standards/05 |
| VERIF-07 | 증거 없는 완료 주장 금지 | CC | **Hook**: evidence-reminder | standards/05 |

## F. Risk Rules

| ID | 내용 | Owner | Enforcement | 참조 |
|----|------|-------|-------------|------|
| RISK-01 | 구현 전 리스크 레벨 분류 | CC | Skill: `/scope-risk-pass` | standards/06 |
| RISK-02 | `/scope-risk-pass`로 분류 | CC | Skill | standards/06 |
| RISK-03 | 리스크 상향 조정 가능 | Shared | Skill | standards/06 |
| RISK-04 | Critical 리스크는 명시적 승인 | Shared | Template: risk-escalation-note | standards/06 |

## G. Naming Rules

| ID | 내용 | Owner | Enforcement | 참조 |
|----|------|-------|-------------|------|
| NAME-01 | Conventional Commits 형식 | CC | **Hook**: commit-convention-check | standards/08 |
| NAME-02 | 브랜치명 컨벤션 | Shared | Advisory | standards/08 |
| NAME-03 | 핸드오프 파일명 컨벤션 | Shared | Manual | standards/08 |
| NAME-04 | 증거 디렉토리명 컨벤션 | CC | Manual | standards/08 |
| NAME-05 | 태스크 ID 컨벤션 | Shared | Manual | standards/08 |

## H. Override Rules

| ID | 내용 | Owner | Enforcement | 참조 |
|----|------|-------|-------------|------|
| OVER-01 | Override는 명시적 태그 필수 | Shared | **Hook** | standards/10 |
| OVER-02 | 보호 경로: `[override:PROTECTED-PATH]` | CC | Hook | standards/10 |
| OVER-03 | 위험 명령: `[override:DANGEROUS-CMD]` | CC | Hook | standards/10 |
| OVER-04 | 커밋 형식: `[override:COMMIT-FORMAT]` | CC | Hook | standards/10 |
| OVER-05 | Override는 deviation-report 기록 | Shared | Template | standards/10 |
| OVER-06 | Invariants는 절대 Override 불가 | All | **Hook** (hard block) | standards/10 |

## Summary

| Enforcement Type | 규칙 수 |
|-----------------|--------|
| Hook (automatic) | 9 |
| Skill | 22 |
| Template | 4 |
| Manual/Advisory | 13 |
| **Total** | **48** |
