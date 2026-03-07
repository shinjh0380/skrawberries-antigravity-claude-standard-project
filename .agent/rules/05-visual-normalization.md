# Visual Normalization [PROPOSED — Model Decision]

> **[PROPOSED]**: 활성화 모드: Model Decision (시각적 피드백 전달 시 적용)

## 시각적 피드백을 텍스트로 변환하는 규칙

Antigravity에서 Claude Code로 UI/시각적 피드백을 전달할 때, Claude Code가 처리할 수 있는 형태로 변환해야 합니다.

### 변환 규칙

#### 색상
```
❌ "버튼을 더 파란색으로"
✅ "버튼 배경색을 #2563EB (Tailwind: blue-600)으로 변경"
```

#### 크기/간격
```
❌ "조금 더 크게"
✅ "padding을 12px→16px (0.75rem→1rem), font-size 14px→16px"
```

#### 레이아웃
```
❌ "오른쪽으로 옮겨"
✅ "flex container에 justify-content: flex-end 추가"
```

#### 상태/인터랙션
```
❌ "클릭할 때 반응이 있어야 해"
✅ "호버 시 배경색 opacity 0.9, 클릭 시 scale(0.98) 트랜지션 150ms"
```

### 시각 자료 첨부 시

`templates/ui-feedback-request.md` 템플릿을 사용하여:
1. 시각 자료 파일 경로 명시
2. "Specific Changes Required" 테이블 작성
3. 정확한 값을 모를 경우 "Ambiguities" 섹션에 기술

### Claude Code의 처리

Claude Code는 수신한 시각적 피드백에 대해 `/ui-spec-normalize`를 실행하여 구현 가능한 스펙으로 변환합니다.

## 참조

`docs/antigravity/visual-feedback-guide.md` — 시각적 피드백 루프 상세 가이드
`docs/antigravity/browser-evidence-guide.md` — 브라우저 증거 수집 가이드
