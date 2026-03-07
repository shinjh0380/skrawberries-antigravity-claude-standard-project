# Handoff Protocol [PROPOSED — Model Decision]

> **[PROPOSED]**: 활성화 모드: Model Decision (AG 모델이 상황에 따라 적용 판단)

## AG → CC 핸드오프 생성 시

### 필수 절차

1. `templates/handoff-ag-to-cc.md` 템플릿을 복사합니다
2. YAML frontmatter 9개 필드를 모두 채웁니다
3. `handoffs/ag-to-cc-{task-id}-{YYYYMMDD}.md`로 저장합니다
4. Claude Code에 파일 경로와 함께 알립니다

### YAML 필드 체크리스트

```yaml
direction: "ag-to-cc"           # 고정값
source-tool: "antigravity"      # 고정값
target-tool: "claude-code"      # 고정값
timestamp: "{ISO8601}"          # 현재 시각
task-id: "task-{YYYY}-{NNN}"   # 고유 ID
status: "pending"               # 초기값
priority: "{low|normal|high|critical}"
risk-level: "{low|medium|high|critical}"
evidence-path: ""               # AG→CC는 빈 문자열
```

### 본문 필수 섹션

- `## Summary` — 2-3문장 요약
- `## Context` — 배경 및 관련 파일
- `## Task / Goal` — 구체적 작업 내용
- `## Acceptance Criteria` — 검증 가능한 기준 목록

## CC → AG 핸드오프 수신 시

1. `status: pending` 파일을 `handoffs/` 에서 확인합니다
2. 완료 보고의 경우 증거 번들(`evidence-path`)을 확인합니다
3. 시각적 확인이 필요한 경우 브라우저에서 직접 검증합니다
4. 확인 완료 후 Claude Code에 결과를 알립니다

## 참조

`docs/standards/04-handoff-protocol.md` — 완전한 프로토콜 명세
