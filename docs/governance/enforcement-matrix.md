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
| INTAKE-03 | | | `/intake-refine` (auto-assign) | | | |
| INTAKE-04 | | | | | | Manual |
| INTAKE-05 | | | `/intake-refine` | | | |
| PLAN-01 | | | `/scope-risk-pass` | | | |
| PLAN-02 | | | `/scope-risk-pass` | `ag-high-level-plan.md` | | |
| PLAN-03 | | | | | | Manual |
| PLAN-04 | | | `/intake-refine` | | | |
| PLAN-05 | | | | `deviation-report.md` | | |
| PLAN-06 | | | `/handoff-create` | | | |
| IMPL-01 | | | `/implementation-guard` | | `scope-keeper` | |
| IMPL-02 | | | `/implementation-guard` | | `scope-keeper` | |
| IMPL-03 | | | `/implementation-guard` | | `scope-keeper` | |
| IMPL-04 | | | `/implementation-guard` | | | |
| IMPL-05 | | | | | `scope-keeper` | Advisory |
| IMPL-06 | `protected-path-guard` | | | | | |
| IMPL-07 | | | `/verification-bundle` | | | |
| IMPL-08 | | | | | | Advisory |
| HAND-01 | | | `/handoff-review`, `/handoff-create` | `handoff-*.md` | | |
| HAND-02 | | | `/handoff-review` | | | |
| HAND-03 | | | | | | Manual |
| HAND-04 | | | `/handoff-review` | | | |
| HAND-05 | | | `/handoff-create` | | | |
| HAND-06 | | | | | | Manual |
| HAND-07 | | | `/handoff-review` | | | |
| HAND-08 | | | | | | Manual |
| VERIF-01 | | `evidence-reminder` | `/verification-bundle` | | | |
| VERIF-02 | | | `/verification-bundle` | `verification-evidence-bundle.md` | | |
| VERIF-03 | | | `/verification-bundle` | | `evidence-auditor` | |
| VERIF-04 | | | | | | Manual |
| VERIF-05 | | | `/verification-bundle` | | `evidence-auditor` | |
| VERIF-06 | | | `/final-walkthrough` | `completion-report.md` | | |
| VERIF-07 | | `evidence-reminder` | | | | |
| RISK-01 | | | `/scope-risk-pass` | | | |
| RISK-02 | | | `/scope-risk-pass` | | | |
| RISK-03 | | | `/scope-risk-pass` | | | |
| RISK-04 | | | `/scope-risk-pass` | `risk-escalation-note.md` | | |
| NAME-01 | `commit-convention-check` | | | | | |
| NAME-02 | | | | | | Advisory |
| NAME-03 | | | | | | Manual |
| NAME-04 | | | | | | Manual |
| NAME-05 | | | | | | Manual |
| OVER-01 | `*-guard` (tag parse) | | | | | |
| OVER-02 | `protected-path-guard` | | | | | |
| OVER-03 | `dangerous-command-guard` | | | | | |
| OVER-04 | `commit-convention-check` | | | | | |
| OVER-05 | | | | `deviation-report.md` | | |
| OVER-06 | Hard invariant (no override) | | | | | |
| TEAM-01 | | | `/team-escalation-eval` | | | |
| TEAM-02 | | | `/team-escalation-eval` | | | |
| TEAM-03 | | | | | | Manual (사용자 승인) |
| TEAM-04 | | | `/team-escalation-eval` | `execution-mode-decision.md` | | |
| TEAM-05 | | | `/team-charter-create` | `agent-team-charter.md` | | |
| TEAM-06 | | | `/team-charter-create` | `teammate-role-card.md` | | |
| TEAM-07 | | | `/team-charter-create` | | `team-coordinator` | |
| TEAM-08 | | | | | | Manual |
| TEAM-09 | | | | `team-decline-fallback.md` | | |
| TEAM-10 | | | | | | Advisory |
| TEAM-11 | | | `/team-charter-create` | | `team-coordinator` | |
| TEAM-12 | | | `/handoff-create` | | | |

## Coverage Gaps

다음 규칙은 현재 자동 강제 메커니즘이 없습니다 (Manual/Advisory):

| 규칙 ID | 현재 방식 | 강화 방법 제안 |
|---------|----------|--------------|
| INTAKE-04 | Manual | 핸드오프 YAML `dependencies` 필드 검증 Hook 추가 가능 |
| PLAN-03 | Manual | 계획 문서 구조 검증 Skill 확장 가능 |
| IMPL-05 | Advisory | scope-keeper 에이전트 코드 리뷰 단계에서 보조 |
| IMPL-08 | Advisory | CI/CD 린터 또는 커밋 Hook 확장 가능 |
| HAND-03 | Manual | `/handoff-create` Skill이 파일명 자동 생성으로 커버 가능 |
| HAND-06 | Manual | status 이전 이력 추적 Hook 추가 가능 (향후 확장) |
| HAND-08 | Manual | Session completion Hook 추가 가능 (향후 확장) |
| VERIF-04 | Manual | AG 브라우저 에이전트 증거 첨부 가이드로 보완 |
| NAME-02~05 | Manual/Advisory | CI/CD 린터로 커버 가능 (프로젝트별) |
| TEAM-03 | Manual | `/team-escalation-eval` 결과 후 사용자 확인 단계 — 자동화 불가 (의도적) |
| TEAM-08 | Manual | 거부는 valid한 선택 — 강제 메커니즘 없음 (의도적) |
| TEAM-10 | Advisory | 실험적 태그 누락 검사 Hook 추가 가능 (향후 확장) |

## Hook Coverage Summary

| Hook 스크립트 | 담당 규칙 |
|-------------|---------|
| `protected-path-guard.js` | IMPL-06, OVER-02 |
| `dangerous-command-guard.js` | OVER-03 |
| `commit-convention-check.js` | NAME-01, OVER-04 |
| `evidence-reminder.js` | VERIF-01, VERIF-07 |
| `session-context-loader.js` | (informational — HAND-04 보조) |
