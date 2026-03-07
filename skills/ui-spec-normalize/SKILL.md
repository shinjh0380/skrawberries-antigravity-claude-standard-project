---
name: ui-spec-normalize
description: Use when visual/image feedback (screenshots, mockups, UI recordings, design files) needs to be converted to structured text requirements. Use when Antigravity provides visual artifacts that Claude Code needs to implement.
---

# UI Spec Normalize

시각적 피드백을 구현 가능한 텍스트 스펙으로 변환합니다.

## Steps

### 1. Collect Visual Artifacts

사용자 또는 핸드오프에서 시각적 자료를 수집합니다:
- 스크린샷 (현재 상태, 목표 상태)
- 목업 이미지 (Figma 내보내기, 스케치 등)
- 브라우저 녹화 / 화면 캡처
- Antigravity 브라우저 에이전트 캡처

### 2. Analyze Visual Differences

시각 자료에서 다음을 추출합니다:

**레이아웃 변경:**
- [ ] 컴포넌트 위치 변경
- [ ] 간격/마진/패딩 변경
- [ ] 그리드/플렉스 레이아웃 변경
- [ ] 반응형 브레이크포인트 영향

**스타일 변경:**
- [ ] 색상 변경 (헥스 코드 추출 시도)
- [ ] 타이포그래피 (폰트 크기, 굵기, 라인 높이)
- [ ] 테두리, 그림자, 라운딩
- [ ] 애니메이션/전환 효과

**동작 변경:**
- [ ] 클릭/호버 상태
- [ ] 로딩/에러 상태
- [ ] 폼 검증 피드백
- [ ] 인터랙션 흐름

### 3. Generate Structured Text Spec

추출된 정보를 구조화된 스펙으로 변환합니다:

```markdown
## UI Spec: {컴포넌트/페이지명}

### Changes Required

#### 1. {변경 항목명}
- **현재**: {현재 상태 설명}
- **목표**: {목표 상태 설명}
- **구현**: `{CSS 속성 또는 코드 힌트}`
- **파일**: `{관련 파일 경로 추정}`

#### 2. {변경 항목명}
...

### Acceptance Criteria (Visual)
- [ ] {시각적 완료 기준 1}
- [ ] {시각적 완료 기준 2}

### Ambiguities
- {불명확한 부분 1: 두 가지 해석 가능}
- → 질문: {명확화 필요 사항}
```

### 4. Identify Ambiguities

시각 자료에서 명확히 판단할 수 없는 부분:
- 정확한 색상값 (이미지 품질 문제)
- 폰트 패밀리 (기존 코드 확인 필요)
- 애니메이션 타이밍
- 접근성 요구사항

모호한 항목은 `/intake-refine`으로 위임하거나 가정 문서화.

### 5. Link to Implementation

```
## 구현 준비 완료

텍스트 스펙이 생성되었습니다.
다음 단계:
1. 위 스펙을 핸드오프 문서에 추가 → /handoff-review
2. 또는 바로 구현 시작 → /scope-risk-pass → /implementation-guard
```

## Notes

- 이미지에서 정확한 값을 읽을 수 없는 경우, 기존 코드베이스의 디자인 토큰/변수를 참조합니다
- Tailwind CSS, CSS Variables, Design System 토큰이 있으면 해당 클래스/변수명으로 변환합니다
- 반응형 동작은 별도 스펙으로 작성합니다
