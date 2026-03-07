# Agent Rule 06: Agent Team Escalation

> **Activation Mode**: Model Decision
> **Status**: [PROPOSED] — Antigravity 실제 동작 미검증 (uncertainty-register.md U-008 참조)
> **Applies To**: Antigravity

---

## Rule Overview

Antigravity가 태스크를 분석하여 agent team이 유리하다고 판단할 때, 사용자에게 팀 모드를 추천하고 Claude Code에 승인 결과를 전달합니다.

---

## When to Apply This Rule

다음 시그널이 2개 이상 감지될 때 팀 에스컬레이션을 고려합니다:

- 독립적인 workstream이 3개 이상 명확히 구분됨
- 각 workstream이 서로 다른 전문성(도메인)을 요구함
- 병렬 처리 시 시간 또는 품질이 유의미하게 개선될 것으로 예상됨
- 사용자가 팀 모드 또는 병렬 작업을 명시적으로 요청함

---

## Recommendation Behavior

### 팀 추천 시

1. 팀 추천 이유를 1-2문장으로 명확히 설명합니다
2. 제안 팀 구성(역할 + 담당 범위)을 구체적으로 제시합니다
3. 예상 토큰 비용 증가를 솔직히 고지합니다
4. 사용자에게 4가지 선택지를 제시합니다 (전체 승인 / 축소 승인 / 거부 / 상세 설명 요청)
5. `[EXPERIMENTAL: agent-teams]` 태그를 항상 포함합니다

### 팀 추천 금지 상황

다음 상황에서는 팀을 추천하지 않습니다:

- 태스크가 단일 파일 또는 단순 질의응답인 경우
- 사용자가 빠른 처리를 원하는 경우
- 이전 팀 거부 이력이 있고 태스크 성격이 유사한 경우
- 파일 충돌 위험이 높아 팀 이점이 상쇄되는 경우

---

## Handoff Behavior

사용자가 팀을 승인한 경우:
- `execution-mode: "agent-team"` 필드를 핸드오프 YAML에 포함
- `team-size: {N}` 필드 포함
- Claude Code가 `/team-charter-create`를 실행할 수 있도록 승인 결과를 명확히 기재

사용자가 팀을 거부한 경우:
- `execution-mode: "single-session"` 또는 `"subagents"` 필드 포함
- 거부 이유(있다면)를 Notes 섹션에 기재
- 팀 없이 정상적으로 태스크를 진행

---

## Communication Style

팀 추천 시 다음 톤을 유지합니다:

- **중립적**: "팀이 더 낫습니다"가 아닌 "팀이 도움이 될 수 있습니다"
- **투명함**: 비용과 실험적 상태를 숨기지 않음
- **선택 존중**: 거부를 자연스러운 선택으로 처리

---

## Notes

- 이 규칙은 Claude Code의 `/team-escalation-eval` 스킬과 대응합니다
- AG의 추천 → 사용자 승인 → CC의 charter 생성 순서는 변경 불가
- 사용자 승인 없이 팀 모드를 활성화하는 것은 TEAM-03 위반입니다
