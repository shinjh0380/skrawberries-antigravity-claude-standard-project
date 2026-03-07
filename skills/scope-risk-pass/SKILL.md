---
name: scope-risk-pass
description: Use when a task needs scope assessment, risk classification, or before starting implementation. Classifies risk level (low/medium/high/critical), defines scope boundaries, and flags concerns per Standard 06.
---

# Scope & Risk Pass

구현 시작 전 범위를 확정하고 리스크를 분류합니다.

## Steps

### 1. Read Task Spec

인테이크 스펙 또는 핸드오프 문서에서 태스크 정보를 읽습니다.

필요한 정보:
- Goal / Acceptance Criteria
- Scope Boundary (포함/제외)
- 관련 파일 목록

### 2. Scope Impact Analysis

변경이 필요한 파일과 영향 범위를 분석합니다:

```bash
# 관련 파일 검색 (예시)
grep -r "{키워드}" src/ --include="*.ts" -l
```

영향받는 영역 목록:
- [ ] UI 컴포넌트
- [ ] API 엔드포인트
- [ ] 데이터베이스 스키마
- [ ] 외부 서비스 연동
- [ ] 인증/보안 코드
- [ ] 테스트 파일

### 3. Risk Classification

`docs/standards/06-risk-classification.md` 기준으로 분류합니다:

**분류 기준:**

| 레벨 | 해당 조건 |
|------|----------|
| Low | 단일 파일, 패턴 반복, DB/외부 API 무관 |
| Medium | 다중 파일, 비즈니스 로직, 내부 API |
| High | 아키텍처, DB 스키마, 인증, 퍼블릭 API |
| Critical | 프로덕션 데이터, 주요 의존성 교체 |

**상향 트리거 확인:**
- [ ] 예상보다 많은 파일 영향?
- [ ] 의존성 체인 발견?
- [ ] 보안 관련 패턴 포함?
- [ ] 기존 테스트 실패 가능성?

### 4. Scope Boundary Confirmation

확정된 범위를 명시합니다:

```
## Confirmed Scope

포함 (변경 대상):
- {파일/컴포넌트 1}
- {파일/컴포넌트 2}

제외 (명시적 Out-of-Scope):
- {제외 항목 1}
- {제외 항목 2}

경계 외 발견 시: deviation-report 작성 후 사용자 확인
```

### 5. Risk Pass Output

```yaml
risk-assessment:
  level: low|medium|high|critical
  rationale: |
    {분류 사유}
  scope-confirmed:
    include: [...]
    exclude: [...]
  concerns:
    - {우려사항 1}
    - {우려사항 2}
  recommended-planning-depth: minimal|standard|detailed
```

### 6. Escalation (Critical Risk)

리스크 레벨이 `critical`이면:
1. `templates/risk-escalation-note.md`를 작성합니다
2. `handoffs/` 디렉토리에 저장합니다
3. 구현을 일시 중단하고 사용자 승인을 요청합니다

### 7. Recommended Next Step

```
Low/Medium risk → 구현 시작 가능 (/implementation-guard 사용)
High risk → 상세 계획 작성 후 시작
Critical risk → 사용자 승인 필요
```
