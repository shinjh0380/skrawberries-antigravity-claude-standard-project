# Enforcement Matrix

> 각 규칙과 enforcement 메커니즘의 교차 매핑입니다.
> 이 파일은 보호된 경로입니다. 수정 시 `[override:PROTECTED-PATH]` 태그 필요.

## 메커니즘 정의

| 메커니즘 | 강도 | 설명 |
|---------|------|------|
| **Hook (block)** | Hard | 자동 차단, 진행 불가 |
| **Hook (advisory)** | Soft | 알림만, 계속 가능 |
| **Skill** | Medium | 실행 시 강제, 건너뛸 수 있음 |
| **Template** | Soft | 구조 제공, 준수 여부는 수동 |
| **Agent** | Medium | 독립 에이전트 검토 |
| **Manual** | Advisory | 문서화된 기대, 자동 강제 없음 |

## Matrix

| 규칙 ID | Hook:block | Hook:advisory | Skill | Template | Agent | Manual |
|---------|-----------|--------------|-------|----------|-------|--------|
| INTAKE-01 | | | `/intake-refine` | `intake-request.md` | | |
| INTAKE-02 | | | `/intake-refine` | | | |
| INTAKE-05 | | | `/intake-refine` | | | |
| PLAN-01 | | | `/scope-risk-pass` | | | |
| PLAN-02 | | | `/scope-risk-pass` | `ag-high-level-plan.md` | | |
| PLAN-05 | | | | `deviation-report.md` | | |
| IMPL-01 | | | `/implementation-guard` | | `scope-keeper` | |
| IMPL-02 | | | `/implementation-guard` | | `scope-keeper` | |
| IMPL-03 | | | `/implementation-guard` | | `scope-keeper` | |
| IMPL-04 | | | `/implementation-guard` | | | |
| IMPL-06 | `protected-path-guard` | | | | | |
| HAND-01 | | | `/handoff-review`, `/handoff-create` | `handoff-*.md` | | |
| HAND-02 | | | `/handoff-review` | | | |
| HAND-04 | | | `/handoff-review` | | | |
| HAND-05 | | | `/handoff-create` | | | |
| VERIF-01 | | `evidence-reminder` | `/verification-bundle` | | | |
| VERIF-02 | | | `/verification-bundle` | `verification-evidence-bundle.md` | | |
| VERIF-03 | | | `/verification-bundle` | | `evidence-auditor` | |
| VERIF-05 | | | `/verification-bundle` | | `evidence-auditor` | |
| VERIF-06 | | | `/final-walkthrough` | `completion-report.md` | | |
| VERIF-07 | | `evidence-reminder` | | | | |
| RISK-01 | | | `/scope-risk-pass` | | | |
| RISK-04 | | | `/scope-risk-pass` | `risk-escalation-note.md` | | |
| NAME-01 | `commit-convention-check` | | | | | |
| NAME-02 | | | | | | Manual |
| OVER-01 | `*-guard` (tag parse) | | | | | |
| OVER-02 | `protected-path-guard` | | | | | |
| OVER-03 | `dangerous-command-guard` | | | | | |
| OVER-04 | `commit-convention-check` | | | | | |
| OVER-05 | | | | `deviation-report.md` | | |
| OVER-06 | Hard invariant (no override) | | | | | |

## Coverage Gaps

다음 규칙은 현재 자동 강제 메커니즘이 없습니다 (Manual/Advisory):

| 규칙 ID | 강화 방법 제안 |
|---------|--------------|
| PLAN-06 | `/handoff-review` 실행 시 YAML 검증으로 커버 가능 |
| IMPL-05 | 코드 리뷰 단계에서 수동 확인 |
| HAND-06 | status 이전 이력 추적 Hook 추가 가능 (향후 확장) |
| HAND-08 | Session completion Hook 추가 가능 (향후 확장) |
| NAME-02~05 | CI/CD 린터로 커버 가능 (프로젝트별) |

## Hook Coverage Summary

| Hook 스크립트 | 담당 규칙 |
|-------------|---------|
| `protected-path-guard.js` | IMPL-06, OVER-02 |
| `dangerous-command-guard.js` | OVER-03 |
| `commit-convention-check.js` | NAME-01, OVER-04 |
| `evidence-reminder.js` | VERIF-01, VERIF-07 |
| `session-context-loader.js` | (informational — HAND-04 보조) |
