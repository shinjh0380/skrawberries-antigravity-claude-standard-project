# AG ↔ CC 워크플로우 가이드

> Antigravity와 Claude Code 간의 전체 워크플로우를 단계별로 설명합니다.

## 전체 플로우 다이어그램

```
[AG] 요구사항 정의
       ↓
[AG] intake-request.md 작성 → handoffs/ 저장
       ↓
[CC] /handoff-review → /intake-refine → /scope-risk-pass
       ↓
     risk-level?
     ├─ critical → [AG] 에스컬레이션 검토 → 승인
     ├─ high → 상세 계획 → [AG] 계획 검토 → 승인
     └─ low/medium → 구현 진행
       ↓
[CC] /implementation-guard → 코드 구현
       ↓
[CC] /verification-bundle → 증거 수집
       ↓
[CC] /final-walkthrough → 완료 확인
       ↓
[CC] cc-to-ag 핸드오프 생성 → git commit
       ↓
[AG] 브라우저 시각적 확인
       ↓
     확인 결과?
     ├─ 승인 → 완료
     └─ 수정 필요 → ui-feedback-request.md → [CC] 재작업
```

## 단계별 상세

### Step 1: 요구사항 수집 (AG)

Antigravity에서 요구사항을 수집하고 인테이크 문서를 작성합니다.

**산출물**: `handoffs/ag-to-cc-{task-id}-{date}.md`
**템플릿**: `templates/intake-request.md` 또는 `templates/handoff-ag-to-cc.md`

### Step 2: 핸드오프 수신 (CC)

Claude Code에서 핸드오프를 검증합니다.

```
/handoff-review
→ status: pending → received로 업데이트
→ YAML 스키마 검증
→ 완전성 확인
```

### Step 3: 리스크 평가 (CC)

```
/scope-risk-pass
→ 영향 파일 분석
→ 리스크 레벨 분류
→ 범위 경계 확정
```

**리스크별 분기:**
- `low`: 바로 구현
- `medium`: 간단한 계획 후 구현
- `high`: AG와 계획 검토 후 구현
- `critical`: AG 명시적 승인 필요

### Step 4: 구현 (CC)

```
/implementation-guard 준수하며 구현
→ 범위 내 파일만 수정
→ Minimal diff
→ 보안 패턴 확인
```

### Step 5: 검증 (CC)

```
/verification-bundle
→ 테스트 실행
→ 증거 번들 생성: evidence/{date}-{task-id}/
```

### Step 6: 완료 검토 (CC)

```
/final-walkthrough
→ 수락 기준 모두 충족 확인
→ 완료 보고서 생성
→ git commit
→ /handoff-create (cc-to-ag)
```

### Step 7: 시각적 확인 (AG)

Antigravity에서:
1. `handoffs/cc-to-ag-{task-id}-{date}.md` 수신
2. `evidence-path` 번들 확인
3. 브라우저에서 변경사항 직접 확인
4. 결과 응답:
   - 승인: 완료 처리
   - 수정 요청: `ui-feedback-request.md` 작성

## 핸드오프 상태 추적

| 상태 | 의미 | 다음 액션 |
|------|------|----------|
| `draft` | 작성 중 | 완성 후 `pending`으로 변경 |
| `pending` | 전달 완료, 수신 대기 | 수신 측 `/handoff-review` 실행 |
| `received` | 수신 확인, 작업 중 | 작업 완료 후 `completed` |
| `completed` | 완료 | 아카이브 |

## 빠른 참조

- 표준: `docs/standards/04-handoff-protocol.md`
- 템플릿: `templates/`
- AG 가이드: `docs/antigravity/`
