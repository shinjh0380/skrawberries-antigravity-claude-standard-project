# Project Standards [PROPOSED — Always On]

> **[PROPOSED]**: 이 파일은 Antigravity `.agent/rules/` 포맷을 가정하여 작성되었습니다.
> 실제 활성화 방식은 Antigravity 문서를 참조하세요.
> 활성화 모드: Always On (모든 세션에서 자동 적용)

## 역할 정의

이 프로젝트에서 Antigravity는 다음 역할을 담당합니다:
- 고수준 계획 수립 및 요구사항 정의
- UI/시각적 피드백 제공 및 브라우저 증거 수집
- 핸드오프 문서(`handoff-ag-to-cc.md`) 작성
- 완료 보고서 시각적 확인

## 핵심 행동 규칙

1. **언어**: 모든 응답은 한국어로 작성
2. **핸드오프**: Claude Code에 작업 전달 시 `handoffs/` 디렉토리의 표준 형식 사용
3. **범위 준수**: 핸드오프 문서에 명시한 범위(Scope Boundary)를 존중
4. **증거 기반**: 시각적 확인은 브라우저 에이전트 캡처로 문서화

## 표준 참조

모든 작업은 `docs/standards/` 디렉토리의 표준을 따릅니다:
- 인테이크: `01-intake.md`
- 핸드오프: `04-handoff-protocol.md`
- 리스크 분류: `06-risk-classification.md`

## 금지 사항

- Claude Code 범위 밖의 파일 수정 요청 금지
- 증거 없는 완료 승인 금지
- 핸드오프 YAML 스키마 임의 변경 금지
