# 시각적 피드백 루프 가이드

> Antigravity에서 제공하는 시각적 피드백을 Claude Code가 처리하는 방법과, 효과적인 피드백 작성 요령을 설명합니다.

## 시각적 피드백의 흐름

```
[AG] 시각적 피드백 작성 (스크린샷 + 텍스트)
       ↓
[CC] /ui-spec-normalize 실행
       ↓
[CC] 구조화된 텍스트 스펙 생성
       ↓
[CC] /scope-risk-pass → /implementation-guard → 구현
       ↓
[AG] 결과 브라우저 확인
```

## 효과적인 시각적 피드백 작성법

### 원칙

1. **텍스트 설명 필수**: 이미지만으로는 부족합니다. 항상 텍스트 설명 포함
2. **구체적인 값 제공**: "더 크게" 대신 "16px → 24px"
3. **변경 전후 명시**: 현재 상태와 목표 상태를 모두 기술
4. **컴포넌트 식별**: 어떤 컴포넌트/파일인지 명확히

### 피드백 품질 체크리스트

- [ ] 변경 대상 컴포넌트가 특정되어 있는가?
- [ ] 현재 상태가 설명되어 있는가?
- [ ] 목표 상태가 명확히 기술되어 있는가?
- [ ] 수치 값이 구체적인가? (색상 코드, 픽셀 값 등)
- [ ] 불명확한 부분은 "Ambiguities" 섹션에 별도 기술?

### 피드백 템플릿 사용

`templates/ui-feedback-request.md` 사용:

```markdown
## Specific Changes Required

| # | 요소 | 현재 값 | 목표 값 | 우선순위 |
|---|------|---------|---------|----------|
| 1 | LoginButton 배경색 | #4B5563 | #2563EB | high |
| 2 | LoginButton 패딩 | 8px 16px | 12px 24px | normal |
| 3 | 로딩 스피너 위치 | 없음 | 버튼 텍스트 좌측 | high |
```

## Claude Code의 처리 방식

CC는 시각적 피드백을 `/ui-spec-normalize`로 처리합니다:

1. 시각 자료에서 변경 항목 추출
2. 정확한 CSS/코드 값으로 변환
3. 모호한 부분 질문 생성
4. 구현 가능한 스펙 출력

## 피드백 루프 반복

수정이 여러 번 필요한 경우:

```
1회차: ui-feedback-request (피드백 1) → 구현 → 시각적 확인
2회차: ui-feedback-request (피드백 2) → 구현 → 시각적 확인
...
```

각 반복마다 새 핸드오프 파일을 생성합니다.
동일 `task-id`를 유지하되, 날짜가 변경됩니다.

## 반응형 피드백

반응형 디자인 변경 시:

```markdown
## Responsive Changes

| 브레이크포인트 | 현재 | 목표 |
|--------------|------|------|
| mobile (<640px) | 단일 컬럼 | 단일 컬럼 (변경 없음) |
| tablet (640-1024px) | 단일 컬럼 | 2컬럼 그리드 |
| desktop (>1024px) | 단일 컬럼 | 3컬럼 그리드 |
```

## 접근성 요구사항

시각적 변경에 접근성 요구가 있으면 명시:
- 색상 대비 비율: `WCAG AA (4.5:1)` 이상
- 포커스 인디케이터: 명시적 아웃라인 필요
- 스크린리더: `aria-label` 텍스트 명시

## 참조

- `templates/ui-feedback-request.md`
- `skills/ui-spec-normalize/SKILL.md`
- `docs/antigravity/browser-evidence-guide.md`
