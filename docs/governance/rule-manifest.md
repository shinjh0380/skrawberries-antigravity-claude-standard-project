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

## Summary

| Enforcement Type | 규칙 수 |
|-----------------|--------|
| Hook (block) | 6 |
| Hook (advisory) | 2 |
| Hook (total) | **8** |
| Skill | 22 |
| Template | 4 |
| Agent | 3 |
| Manual/Advisory | 11 |
| **Total Rules** | **48** |
