# Common Rules → Antigravity 매핑

> `docs/standards/`의 공통 규칙이 Antigravity 측에서 어떻게 구현되는지 매핑합니다.

## 규칙 매핑 테이블

| 공통 규칙 | AG 구현 | 파일 위치 |
|----------|---------|----------|
| INTAKE-01~05 | AG가 핸드오프 문서 작성 시 준수 | `.agent/rules/01-project-standards.md` |
| PLAN-01~06 | AG가 고수준 계획을 핸드오프에 포함 | `.agent/rules/02-handoff-protocol.md` |
| IMPL-01~08 | CC에 요청 시 범위 명시 | `.agent/rules/04-implementation-constraints.md` |
| HAND-01~08 | AG 핸드오프 생성/수신 절차 | `.agent/rules/02-handoff-protocol.md` |
| VERIF-01~07 | AG 브라우저 증거 수집 | `.agent/rules/03-evidence-gathering.md` |
| RISK-01~04 | AG가 핸드오프에 risk-level 기술 | `.agent/rules/01-project-standards.md` |
| AMBIG-01~05 | AG가 모호성을 핸드오프에 명시 | `templates/handoff-ag-to-cc.md` |
| NAME-01~05 | AG가 파일명 컨벤션 준수 | `.agent/rules/02-handoff-protocol.md` |
| REVIEW-01~05 | AG 시각적 확인이 리뷰 역할 | `.agent/rules/03-evidence-gathering.md` |
| OVER-01~06 | AG Override 요청 시 태그 포함 | `.agent/rules/01-project-standards.md` |

## AG 전용 규칙

공통 표준에는 없지만 AG 운영에 필요한 규칙:

| 규칙 | 내용 | 파일 |
|------|------|------|
| AG-VIS-01 | 시각적 피드백은 텍스트 설명 동반 | `.agent/rules/05-visual-normalization.md` |
| AG-VIS-02 | 브라우저 확인은 브라우저 에이전트 활용 | `.agent/rules/03-evidence-gathering.md` |
| AG-HAND-01 | 핸드오프 완료 후 24시간 내 CC 응답 대기 | `.agent/rules/02-handoff-protocol.md` |

## CC 전용 규칙 (AG 참고용)

AG가 CC에게 기대할 수 있는 CC 전용 행동:

| 규칙 | 내용 | 참조 |
|------|------|------|
| IMPL-01 | Minimal diff 원칙 — 요청 외 변경 없음 | `docs/standards/03-implementation-constraints.md` |
| IMPL-06 | 보호된 경로 수정 불가 (Override 없이) | `CLAUDE.md` |
| NAME-01 | Conventional Commits 강제 (Hook) | `scripts/commit-convention-check.js` |
| VERIF-07 | 증거 없는 완료 주장 불가 (Hook) | `scripts/evidence-reminder.js` |

## 불확실성 항목

다음 사항은 실제 Antigravity 동작으로 검증이 필요합니다:

| 항목 | 가정 | 검증 방법 |
|------|------|----------|
| `.agent/rules/` 활성화 방식 | 파일 존재 시 자동 감지 | Antigravity 문서 확인 |
| `Always On` vs `Model Decision` 모드 | 파일 헤더에서 설정 | Antigravity IDE에서 테스트 |
| 글로벌 GEMINI.md와의 우선순위 | 프로젝트 규칙 우선 | 실제 실행 확인 |

자세한 불확실성 목록: `docs/governance/uncertainty-register.md`
