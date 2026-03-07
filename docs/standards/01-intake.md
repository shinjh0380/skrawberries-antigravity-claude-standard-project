# Standard 01: Intake Requirements

## Purpose

새로운 태스크 요청이 들어올 때 최소한의 정보 품질을 보장합니다. 불완전한 요청은 범위 크리프와 재작업의 주요 원인입니다.

## Rules

1. **INTAKE-01**: 모든 새 태스크 요청은 목표(Goal), 수락 기준(Acceptance Criteria), 범위 경계(Scope Boundary) 세 가지를 포함해야 한다.
2. **INTAKE-02**: 시각적 산출물(UI, 스크린샷, 목업)이 포함된 요청은 텍스트 설명을 함께 포함해야 한다.
3. **INTAKE-03**: 우선순위(low/normal/high/critical)를 명시해야 한다. 명시하지 않으면 `normal`로 기본 설정된다.
4. **INTAKE-04**: 의존성이 있는 경우 블로킹 태스크 ID 또는 설명을 명시해야 한다.
5. **INTAKE-05**: 불완전한 요청은 `/intake-refine` 스킬로 정제하기 전까지 구현을 시작할 수 없다.

## Owner

Shared (AG: 요청 작성 / CC: 검증 실행)

## Enforcement

- **Skill**: `/intake-refine` — 완전성 체크 및 보완 질문 생성
- **Manual**: 요청자가 템플릿(`templates/intake-request.md`) 사용

## Examples

### 불완전한 요청 (거부됨)
```
"로그인 버튼을 고쳐줘"
```

### 완전한 요청
```
Goal: 로그인 버튼 클릭 시 스피너가 표시되지 않는 버그 수정
Acceptance Criteria: 버튼 클릭 후 500ms 이내 스피너 노출, 응답 완료 시 소멸
Scope: src/components/LoginButton.tsx 파일만 수정
Priority: high
```

## Exceptions

- 핫픽스 (`priority: critical`): 간소화된 인테이크 허용, 단 Goal과 Scope는 필수
- 스파이크/탐색 태스크: Acceptance Criteria 대신 탐색 질문 허용
