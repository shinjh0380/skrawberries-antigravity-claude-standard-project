# Antigravity 운영 가이드

> 이 가이드는 Antigravity(Google의 에이전트 우선 IDE)를 이 프레임워크와 함께 사용하는 방법을 설명합니다.

## 역할 개요

이 파이프라인에서 **Antigravity**는:
- 고수준 기획자 및 시각적 확인자 역할
- 요구사항 정의, 고수준 계획 수립
- UI 목업 및 브라우저 피드백 제공
- 최종 결과물 시각적 승인

**Claude Code**는:
- 실제 구현자 역할
- 코드 작성, 테스트 실행, 커밋
- 증거 수집 및 완료 보고

## 세션 시작 절차

### 1. 새 태스크 시작 시

```
1. templates/intake-request.md 템플릿 작성
2. handoffs/ 디렉토리에 저장
3. Claude Code에 핸드오프 파일 경로 전달
```

### 2. 이어서 작업 시

```
1. handoffs/ 에서 status: pending 파일 확인
2. Claude Code에 /handoff-review 실행 요청
3. 결과 대기
```

## 핵심 워크플로우

### 새 기능 요청

```
AG: intake-request.md 작성
→ CC: /intake-refine → /scope-risk-pass
→ AG: 리스크 레벨 확인 및 승인
→ CC: 구현 (/implementation-guard)
→ CC: /verification-bundle → /final-walkthrough
→ CC: cc-to-ag 핸드오프 생성
→ AG: 시각적 확인 (브라우저)
→ AG: 완료 승인 또는 수정 요청
```

### UI 수정 요청

```
AG: ui-feedback-request.md 작성 (스크린샷 포함)
→ CC: /ui-spec-normalize
→ CC: 구현
→ AG: 브라우저에서 확인
```

## 주의사항

### Antigravity 규칙 파일 설정

`.agent/rules/` 디렉토리의 규칙 파일들은 `[PROPOSED]` 상태입니다.
실제 Antigravity IDE에서 활성화 방법은 Antigravity 공식 문서를 참조하세요.

- Always On 규칙: 모든 세션에서 자동 적용
- Model Decision 규칙: AG 모델이 상황에 따라 적용

### 잠재적 충돌

`~/.gemini/GEMINI.md` 글로벌 규칙이 있는 경우, 이 프로젝트의 규칙과 충돌할 수 있습니다.
프로젝트 규칙이 글로벌 규칙보다 우선해야 합니다.

## 파일 위치 참조

| 역할 | 파일 위치 |
|------|----------|
| 새 태스크 요청 | `handoffs/ag-to-cc-{task-id}-{date}.md` |
| UI 피드백 | `handoffs/ui-{task-id}-{date}.md` |
| 완료 보고 수신 | `handoffs/cc-to-ag-{task-id}-{date}.md` |
| 증거 번들 | `evidence/{date}-{task-id}/` |
| 표준 | `docs/standards/` |
