---
name: final-walkthrough
description: Use when claiming work is complete, before the final commit, user says 'walkthrough', '최종 검토', '완료 확인', or before creating a cc-to-ag handoff. Audits evidence, checks deviations, verifies all gates pass, and generates a completion report.
---

# Final Walkthrough

완료 주장 전 모든 게이트를 점검하고 완료 보고서를 생성합니다.

## Steps

### 1. Load Task Reference

현재 태스크의 기준 문서를 로드합니다:
- 인테이크 스펙 (수락 기준)
- 핸드오프 문서 (기대 결과)
- `scope-risk-pass` 출력 (확정 범위)

### 2. Evidence Audit

`evidence/{date}-{task-id}/` 번들을 감사합니다:

| 항목 | 필요 여부 | 존재 | 유효 |
|------|----------|------|------|
| `evidence-bundle-index.md` | 항상 | [ ] | [ ] |
| `git-diff.txt` | 항상 | [ ] | [ ] |
| `test-results.txt` | 테스트 있으면 | [ ] | [ ] |
| `manual-verify.md` | 자동 테스트 없으면 | [ ] | [ ] |

증거 번들이 없으면:
```
증거 번들이 없습니다. /verification-bundle을 먼저 실행하세요.
```

### 3. Acceptance Criteria Check

각 수락 기준을 검증합니다:

```
## Acceptance Criteria — Final Status

[ ] → [x] or [FAIL]

[x] 기준 1: {내용}
    증거: test-results.txt 라인 42
[x] 기준 2: {내용}
    증거: manual-verify.md 섹션 3
[FAIL] 기준 3: {내용}
    사유: {왜 달성되지 않았는지}
```

미충족 기준이 있으면:
- 치명적인지 평가
- 치명적이면 구현으로 돌아감
- 치명적이지 않으면 `deviation-report` 작성

### 4. Scope Deviation Check

```bash
git diff HEAD --name-only
```

변경된 파일이 확정 범위와 일치하는지 확인:
- 범위 외 파일 발견 → 편차 보고서 작성 (`templates/deviation-report.md`)

### 5. Self-Review Checklist

`docs/standards/09-review-requirements.md`의 체크리스트 실행:

- [ ] 수락 기준 모두 충족
- [ ] Minimal diff 원칙 준수 (범위 외 변경 없음)
- [ ] 보안 취약점 없음
- [ ] 테스트 통과 (또는 실패 사유 문서화)
- [ ] 커밋 컨벤션 준수 예정

### 6. Generate Completion Report

`templates/completion-report.md`를 작성합니다.

파일 저장: `handoffs/completion-{task-id}-{YYYYMMDD}.md` (선택 사항)

### 7. Final Gate

모든 체크가 PASS이면:

```
## Final Walkthrough: PASS

모든 게이트를 통과했습니다.

다음 단계:
1. git commit (커밋 컨벤션 준수)
2. /handoff-create (cc-to-ag 완료 보고, 필요 시)
```

실패가 있으면:

```
## Final Walkthrough: BLOCKED

{N}개 항목이 미완료입니다:
- {미완료 항목 목록}

해결 후 /final-walkthrough를 다시 실행하세요.
```

## Notes

- 이 스킬은 블로킹 게이트 — PASS 전까지 커밋/핸드오프 금지
- 편차가 있어도 문서화가 완전하면 PASS 가능
- 문서 전용 변경은 간소화된 체크리스트 적용
