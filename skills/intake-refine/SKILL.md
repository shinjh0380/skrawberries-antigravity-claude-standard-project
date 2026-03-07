---
name: intake-refine
description: Use when receiving a new task request, user says 'new task', '새 태스크', '인테이크', or an intake document needs validation. Validates intake completeness against Standard 01, asks clarifying questions, and outputs a structured task spec.
---

# Intake Refine

새 태스크 요청을 검증하고 구현 준비 상태로 정제합니다.

## Steps

### 1. Collect Request

사용자의 요청 내용을 수집합니다. 입력 형식:
- 자유 형식 텍스트
- `templates/intake-request.md` 형식의 문서
- Antigravity `handoffs/ag-to-cc-*.md` 파일

### 2. Validate Against Standard 01

`docs/standards/01-intake.md`의 필수 항목을 체크합니다:

| 항목 | 체크 | 비고 |
|------|------|------|
| Goal (목표) | [ ] | 명확한 완료 조건 포함? |
| Acceptance Criteria (수락 기준) | [ ] | 검증 가능한 항목들? |
| Scope Boundary (범위 경계) | [ ] | 포함/제외 명시? |
| Priority | [ ] | 없으면 `normal` 기본값 적용 |
| Visual artifacts with text | [ ] | 시각 자료 있으면 텍스트 설명 포함? |

### 3. Generate Clarifying Questions

누락된 항목과 모호한 부분에 대해 구체적인 질문을 생성합니다.

**질문 형식 (선택지 제시):**
```
질문 1: {모호한 항목}
  A) {선택지 A}
  B) {선택지 B}
  C) 직접 명시: ___
```

`docs/standards/07-ambiguity-resolution.md`의 Decision Tree를 따릅니다.

### 4. Output Structured Task Spec

모든 정보가 수집되면 구조화된 태스크 스펙을 출력합니다:

```yaml
task-id: task-{YYYY}-{NNN}
title: {태스크 제목}
priority: low|normal|high|critical
risk-estimate: low|medium|high|critical

goal: |
  {목표 기술}

acceptance-criteria:
  - {기준 1}
  - {기준 2}

scope:
  include:
    - {포함 항목}
  exclude:
    - {제외 항목}

dependencies:
  - {의존성 또는 "없음"}

notes: |
  {추가 주의사항}
```

### 5. Recommended Next Step

```
다음 단계: /scope-risk-pass 로 리스크를 분류하세요.
```

## Validation Rules

- Goal이 없으면 → 질문 생성 후 답변 대기, 구현 시작 금지
- Acceptance Criteria가 검증 불가능하면 → 검증 방법 질문
- Scope가 모호하면 → 경계 확인 질문
- Priority가 `critical`이면 → 즉시 사용자에게 긴급도 재확인
