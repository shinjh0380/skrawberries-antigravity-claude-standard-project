# Rule Manifest

> 이 프레임워크의 모든 규칙을 Owner, Scope, Enforcement 메커니즘과 함께 정의합니다.
> 이 파일은 보호된 경로입니다. 수정 시 `[override:PROTECTED-PATH]` 태그 필요.

**컬럼 설명**

| 컬럼 | 설명 |
|------|------|
| ID | 규칙 식별자 |
| Title | 규칙 명칭 (영어) |
| Owner | 주체 — CC(Claude Code) / AG(Antigravity) / Shared / All |
| Scope | 적용 단계 |
| Applies To | 대상 도구/역할 |
| Trigger | 언제 평가되는가 |
| Enforcement | 강제 메커니즘 |
| Source File | 규칙 정의 표준 문서 |
| Override Policy | 재정의 가능 여부/방법 |
| Failure Mode | 위반 시 결과 |

---

## A. Intake Rules

| ID | Title | Owner | Scope | Applies To | Trigger | Enforcement | Source File | Override Policy | Failure Mode |
|----|-------|-------|-------|------------|---------|-------------|-------------|-----------------|--------------|
| INTAKE-01 | Require Goal/AC/Scope in new tasks | Shared | Intake | Both | New task arrives | Skill: `/intake-refine` + Template: `intake-request.md` | standards/01-intake-protocol.md | Not overridable | Task blocked until intake complete |
| INTAKE-02 | Require text description with visual materials | Shared | Intake | Both | Visual material submitted | Skill: `/intake-refine` | standards/01-intake-protocol.md | Not overridable | Task blocked until description added |
| INTAKE-03 | Default normal priority when unspecified | CC | Intake | Claude Code | Priority field missing | Skill: `/intake-refine` (auto-assign) | standards/01-intake-protocol.md | Project overlay: change default value | Priority auto-set to `normal` |
| INTAKE-04 | Require dependency declaration | Shared | Intake | Both | New task created | Manual review | standards/01-intake-protocol.md | Not overridable | Risk of incorrect execution order |
| INTAKE-05 | Block implementation without completed intake | CC | Intake | Claude Code | Implementation starts | Skill: `/intake-refine` | standards/01-intake-protocol.md | Not overridable | Implementation blocked |

---

## B. Planning Rules

| ID | Title | Owner | Scope | Applies To | Trigger | Enforcement | Source File | Override Policy | Failure Mode |
|----|-------|-------|-------|------------|---------|-------------|-------------|-----------------|--------------|
| PLAN-01 | Run /scope-risk-pass before implementation | CC | Planning | Claude Code | Implementation about to start | Skill: `/scope-risk-pass` | standards/02-planning-protocol.md | Not overridable | Implementation blocked |
| PLAN-02 | Require plan document for high+ risk | Shared | Planning | Both | Risk level assessed as high or critical | Skill: `/scope-risk-pass` + Template: `ag-high-level-plan.md` | standards/02-planning-protocol.md | Not overridable | Implementation blocked |
| PLAN-03 | Include steps/files/verification in plan | Shared | Planning | Both | Plan document created | Manual review | standards/02-planning-protocol.md | Project overlay: add required fields | Incomplete plan — missing structure |
| PLAN-04 | Return to /intake-refine on ambiguity | CC | Planning | Claude Code | Ambiguity detected during planning | Skill: `/intake-refine` | standards/02-planning-protocol.md | Not overridable | Return to intake phase |
| PLAN-05 | Write deviation report for plan changes | CC | Planning | Claude Code | Plan modified after approval | Template: `deviation-report.md` | standards/02-planning-protocol.md | Not overridable | Untracked deviation |
| PLAN-06 | Plan must comply with handoff format | Shared | Planning | Both | Plan document produced | Skill: `/handoff-create` | standards/02-planning-protocol.md | Project overlay: add YAML fields | Invalid handoff format |

---

## C. Implementation Rules

| ID | Title | Owner | Scope | Applies To | Trigger | Enforcement | Source File | Override Policy | Failure Mode |
|----|-------|-------|-------|------------|---------|-------------|-------------|-----------------|--------------|
| IMPL-01 | Minimal diff principle | CC | Implementation | Claude Code | Every code change | Skill: `/implementation-guard` + Agent: `scope-keeper` | standards/03-implementation-constraints.md | Not overridable | Change rejected — scope exceeded |
| IMPL-02 | No unrequested refactoring | CC | Implementation | Claude Code | Code change submitted | Skill: `/implementation-guard` + Agent: `scope-keeper` | standards/03-implementation-constraints.md | Not overridable | Change rejected |
| IMPL-03 | Respect scope boundaries | CC | Implementation | Claude Code | Every code change | Skill: `/implementation-guard` + Agent: `scope-keeper` | standards/03-implementation-constraints.md | Not overridable | Out-of-scope change blocked |
| IMPL-04 | No security vulnerabilities introduced | CC | Implementation | Claude Code | Code change submitted | Skill: `/implementation-guard` | standards/03-implementation-constraints.md | Not overridable | Security violation — change blocked |
| IMPL-05 | Preserve existing patterns | CC | Implementation | Claude Code | Code change submitted | Advisory (scope-keeper review) | standards/03-implementation-constraints.md | Project overlay: define exceptions | Advisory warning issued |
| IMPL-06 | No modification of protected paths | CC | Implementation | Claude Code | File write attempted on protected path | **Hook: `protected-path-guard`** (block) | standards/03-implementation-constraints.md | `[override:PROTECTED-PATH]` tag required | Write blocked immediately |
| IMPL-07 | Collect manual verification evidence without tests | CC | Implementation | Claude Code | Task completion without automated tests | Skill: `/verification-bundle` | standards/03-implementation-constraints.md | Not overridable | Evidence missing — completion blocked |
| IMPL-08 | Include task ID in TODO/FIXME comments | CC | Implementation | Claude Code | TODO/FIXME comment added | Advisory | standards/03-implementation-constraints.md | Project overlay: disable | Advisory warning issued |

---

## D. Handoff Rules

| ID | Title | Owner | Scope | Applies To | Trigger | Enforcement | Source File | Override Policy | Failure Mode |
|----|-------|-------|-------|------------|---------|-------------|-------------|-----------------|--------------|
| HAND-01 | YAML frontmatter + Markdown format | Shared | Handoff | Both | Handoff document created or received | Skill: `/handoff-review`, `/handoff-create` + Template: `handoff-*.md` | standards/04-handoff-protocol.md | Not overridable | Invalid format — handoff rejected |
| HAND-02 | Include all 9 required YAML fields | Shared | Handoff | Both | Handoff document created | Skill: `/handoff-review` (validation) | standards/04-handoff-protocol.md | Not overridable | Validation failure — missing fields |
| HAND-03 | Use handoffs/ directory + filename convention | Shared | Handoff | Both | Handoff file saved | Manual review | standards/04-handoff-protocol.md | Project overlay: adjust prefix pattern | Misplaced or non-standard filename |
| HAND-04 | Run /handoff-review before acting on received handoff | CC | Handoff receive | Claude Code | Handoff received | Skill: `/handoff-review` | standards/04-handoff-protocol.md | Not overridable | Implementation without full review |
| HAND-05 | Create handoffs with /handoff-create | CC | Handoff create | Claude Code | Handoff to be created | Skill: `/handoff-create` | standards/04-handoff-protocol.md | Not overridable | Non-standard handoff produced |
| HAND-06 | Status transitions are one-directional | Shared | Handoff | Both | Handoff status updated | Manual review | standards/04-handoff-protocol.md | Not overridable | Invalid status regression |
| HAND-07 | Verify evidence-path exists before accepting | CC | Handoff receive | Claude Code | Handoff received | Skill: `/handoff-review` (path check) | standards/04-handoff-protocol.md | Not overridable | Missing evidence — handoff rejected |
| HAND-08 | Update status after task completion | Shared | Handoff | Both | Task completed | Manual review | standards/04-handoff-protocol.md | Not overridable | Stale handoff status |

---

## E. Verification Rules

| ID | Title | Owner | Scope | Applies To | Trigger | Enforcement | Source File | Override Policy | Failure Mode |
|----|-------|-------|-------|------------|---------|-------------|-------------|-----------------|--------------|
| VERIF-01 | At least 1 evidence artifact after feature/fix | CC | Verification | Claude Code | Feature or bug fix completed | **Hook: `evidence-reminder`** (advisory) + Skill: `/verification-bundle` | standards/05-verification-protocol.md | Not overridable | Advisory prompt issued |
| VERIF-02 | Store evidence in evidence/{date}-{task-id}/ | CC | Verification | Claude Code | Evidence artifact created | Skill: `/verification-bundle` + Template: `verification-evidence-bundle.md` | standards/05-verification-protocol.md | Project overlay: adjust path format | Evidence in wrong location |
| VERIF-03 | Include test results in bundle | CC | Verification | Claude Code | Verification bundle assembled | Skill: `/verification-bundle` + Agent: `evidence-auditor` | standards/05-verification-protocol.md | Not overridable | Incomplete bundle — test results missing |
| VERIF-04 | Include screenshot for UI changes | AG | Verification | Antigravity | UI component changed | Manual | standards/05-verification-protocol.md | Project overlay: waive for non-visual | Missing screenshot — bundle incomplete |
| VERIF-05 | Require bundle index file | CC | Verification | Claude Code | Evidence bundle created | Skill: `/verification-bundle` + Agent: `evidence-auditor` | standards/05-verification-protocol.md | Not overridable | Bundle index missing — auditor fails |
| VERIF-06 | Run /final-walkthrough before final commit | CC | Verification | Claude Code | Final commit about to be made | Skill: `/final-walkthrough` + Template: `completion-report.md` | standards/05-verification-protocol.md | Not overridable | Walkthrough skipped — commit blocked |
| VERIF-07 | No completion claim without evidence | CC | Verification | Claude Code | Completion claimed | **Hook: `evidence-reminder`** (advisory) | standards/05-verification-protocol.md | Not overridable | Advisory prompt issued |

---

## F. Risk Rules

| ID | Title | Owner | Scope | Applies To | Trigger | Enforcement | Source File | Override Policy | Failure Mode |
|----|-------|-------|-------|------------|---------|-------------|-------------|-----------------|--------------|
| RISK-01 | Classify risk level before implementation | CC | Risk assessment | Claude Code | Implementation about to start | Skill: `/scope-risk-pass` | standards/06-risk-classification.md | Not overridable | Implementation blocked |
| RISK-02 | Use /scope-risk-pass for classification | CC | Risk assessment | Claude Code | Risk classification needed | Skill: `/scope-risk-pass` | standards/06-risk-classification.md | Not overridable | Unclassified risk — proceed blocked |
| RISK-03 | Risk level may be escalated upward | Shared | Risk assessment | Both | New information changes risk picture | Skill: `/scope-risk-pass` (re-run) | standards/06-risk-classification.md | Not overridable | Risk underestimated — plan invalidated |
| RISK-04 | Critical risk requires explicit approval | Shared | Risk assessment | Both | Risk level is critical | Template: `risk-escalation-note.md` + Skill: `/scope-risk-pass` | standards/06-risk-classification.md | Not overridable | Implementation blocked without approval |

---

## G. Naming Rules

| ID | Title | Owner | Scope | Applies To | Trigger | Enforcement | Source File | Override Policy | Failure Mode |
|----|-------|-------|-------|------------|---------|-------------|-------------|-----------------|--------------|
| NAME-01 | Conventional Commits format | CC | Naming | Claude Code | Commit created | **Hook: `commit-convention-check`** (block) | standards/08-naming-conventions.md | `[override:COMMIT-FORMAT]` tag required | Commit blocked |
| NAME-02 | Branch naming convention | Shared | Naming | Both | Branch created | Advisory | standards/08-naming-conventions.md | Project overlay: redefine pattern | Advisory warning issued |
| NAME-03 | Handoff filename convention | Shared | Naming | Both | Handoff file saved | Manual review | standards/08-naming-conventions.md | Project overlay: adjust prefix | Non-standard filename |
| NAME-04 | Evidence directory naming convention | CC | Naming | Claude Code | Evidence directory created | Manual review | standards/08-naming-conventions.md | Project overlay: adjust date format | Non-standard directory name |
| NAME-05 | Task ID convention | Shared | Naming | Both | Task created | Manual review | standards/08-naming-conventions.md | Project overlay: define format | Non-standard task ID |

---

## H. Override Rules

| ID | Title | Owner | Scope | Applies To | Trigger | Enforcement | Source File | Override Policy | Failure Mode |
|----|-------|-------|-------|------------|---------|-------------|-------------|-----------------|--------------|
| OVER-01 | Override requires explicit tag | Shared | Override | Both | Override attempted | **Hook** (tag parse — all guards) | standards/10-override-protocol.md | Not applicable | Override blocked — tag missing |
| OVER-02 | Protected path override tag: [override:PROTECTED-PATH] | CC | Override | Claude Code | Write to protected path | **Hook: `protected-path-guard`** (block) | standards/10-override-protocol.md | Tag must be present in request | Write blocked |
| OVER-03 | Dangerous command override tag: [override:DANGEROUS-CMD] | CC | Override | Claude Code | Dangerous command executed | **Hook: `dangerous-command-guard`** (block) | standards/10-override-protocol.md | Tag must be present in request | Command blocked |
| OVER-04 | Commit format override tag: [override:COMMIT-FORMAT] | CC | Override | Claude Code | Non-conventional commit | **Hook: `commit-convention-check`** (block) | standards/10-override-protocol.md | Tag must be present in request | Commit blocked |
| OVER-05 | Record override in deviation-report | Shared | Override | Both | Any override tag used | Template: `deviation-report.md` | standards/10-override-protocol.md | Not overridable | Untracked override — audit gap |
| OVER-06 | Invariants cannot be overridden by any tier | All | Override | Both | Override attempted on invariant | **Hook** (hard block — no tag bypass) | standards/10-override-protocol.md | Absolutely not overridable | Hard block — no exceptions |

---

---

## I. Team Escalation Rules

> [EXPERIMENTAL: agent-teams] — `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` 환경 필요

| ID | Title | Owner | Scope | Applies To | Trigger | Enforcement | Source File | Override Policy | Failure Mode |
|----|-------|-------|-------|------------|---------|-------------|-------------|-----------------|--------------|
| TEAM-01 | Evaluate execution mode before planning | CC | Planning | Claude Code | 새 태스크 플래닝 시작 전 | Skill: `/team-escalation-eval` | standards/11-agent-team-escalation.md | Not overridable | 모드 미결정 — 기본 single-session |
| TEAM-02 | Prefer simplest execution mode | CC | Planning | Claude Code | 실행 모드 결정 시 | Skill: `/team-escalation-eval` (negative 1.5× 가중) | standards/11-agent-team-escalation.md | Not overridable | 복잡도 과잉 — 불필요한 팀 구성 |
| TEAM-03 | Agent team requires user approval | Shared | Planning | Both | agent-team-possible/recommended 결정 시 | Manual (사용자 승인 게이트) | standards/11-agent-team-escalation.md | Not overridable | 미승인 팀 활성화 — 즉시 중단 |
| TEAM-04 | Record execution mode decision | CC | Planning | Claude Code | 실행 모드 결정 직후 | Skill: `/team-escalation-eval` + Template: `execution-mode-decision.md` | standards/11-agent-team-escalation.md | Not overridable | 결정 미기록 — 감사 불가 |
| TEAM-05 | Create team charter after approval | CC | Planning | Claude Code | 사용자 팀 승인 직후 | Skill: `/team-charter-create` + Template: `agent-team-charter.md` | standards/11-agent-team-escalation.md | Not overridable | Charter 없이 팀 시작 — 역할 혼선 |
| TEAM-06 | Define teammate roles with role cards | CC | Planning | Claude Code | Team charter 생성 시 | Skill: `/team-charter-create` + Template: `teammate-role-card.md` | standards/11-agent-team-escalation.md | Not overridable | 역할 미정의 — 파일 충돌 위험 |
| TEAM-07 | Minimum viable team size | CC | Planning | Claude Code | Team charter 초안 작성 시 | Skill: `/team-charter-create` + Agent: `team-coordinator` | standards/11-agent-team-escalation.md | Not overridable | 과잉 팀원 — 비용 낭비 |
| TEAM-08 | Decline without penalty | Shared | Planning | Both | 사용자 팀 거부 시 | Manual | standards/11-agent-team-escalation.md | Not applicable | N/A — 거부는 항상 유효 |
| TEAM-09 | Record decline with fallback plan | CC | Planning | Claude Code | 사용자 팀 거부 직후 | Template: `team-decline-fallback.md` | standards/11-agent-team-escalation.md | Not overridable | 거부 미기록 — fallback 불명확 |
| TEAM-10 | Mark experimental status | CC | All | Claude Code | Agent team 관련 문서 생성 시 | Advisory | standards/11-agent-team-escalation.md | Project overlay: waive | 실험적 상태 누락 — 오해 위험 |
| TEAM-11 | File overlap risk assessment | CC | Planning | Claude Code | Team charter 검토 시 | Skill: `/team-charter-create` + Agent: `team-coordinator` | standards/11-agent-team-escalation.md | Not overridable | 파일 충돌 — 팀 작업 실패 |
| TEAM-12 | Team handoff includes charter reference | Shared | Handoff | Both | Agent team 태스크 핸드오프 생성 시 | Skill: `/handoff-create` (charter-path YAML 필드) | standards/11-agent-team-escalation.md | Not overridable | Charter 참조 누락 — 맥락 손실 |
| TEAM-13 | Immediate teammate teardown after completion | CC | Execution | Claude Code | 팀원의 Expected Outputs 완료 시 | Agent: `team-coordinator` + Hook: `team-stop-check` (advisory) | standards/11-agent-team-escalation.md | Not overridable | 유휴 팀원 — 토큰 낭비 지속 |
| TEAM-14 | Cost discipline for team operations | CC | Execution | Claude Code | 팀 운영 중 지속적 | Advisory + CLAUDE.md 정책 | standards/11-agent-team-escalation.md | Not overridable | 브로드캐스트/재시도 남용 — 비용 초과 |
| TEAM-15 | Per-teammate plan approval before implementation | CC | Planning | Claude Code | 팀원이 구현 시작 시 | Skill: `/team-charter-create` (Step 3.5) + Template: `task-approval-artifact.md` | standards/11-agent-team-escalation.md | Not overridable | 미승인 구현 — 범위 일탈 위험 |

---

## Summary

| Enforcement Type | 규칙 수 |
|-----------------|--------|
| Hook (block) | 6 |
| Hook (advisory) | 3 |
| Hook (total) | **9** |
| Skill | 31 |
| Template | 10 |
| Agent | 5 |
| Manual/Advisory | 14 |
| **Total Rules** | **63** |
