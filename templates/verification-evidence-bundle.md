---
direction: "cc-to-ag"
source-tool: "claude-code"
target-tool: "antigravity"
timestamp: "{ISO8601}"
task-id: "{task-id}"
status: "completed"
priority: "{priority}"
risk-level: "{risk-level}"
evidence-path: "evidence/{YYYYMMDD}-{task-id}/"
---

# Evidence Bundle Index: {태스크 제목}

**번들 경로**: `evidence/{YYYYMMDD}-{task-id}/`
**생성 시각**: {ISO8601}
**태스크 ID**: {task-id}

## Summary

(어떤 변경에 대한 증거인지 1-2문장 요약)

## Evidence Files

| 파일명 | 유형 | 설명 | 상태 |
|--------|------|------|------|
| `test-results.txt` | 자동화 테스트 | npm test 실행 결과 | pass / fail |
| `git-diff.txt` | Git diff | 변경 파일 및 라인 수 | - |
| `manual-verify.md` | 수동 검증 | 수동 확인 절차 및 결과 | pass / fail |
| `screenshot-before.png` | 스크린샷 | 변경 전 상태 | - |
| `screenshot-after.png` | 스크린샷 | 변경 후 상태 | - |

(해당하지 않는 항목은 삭제)

## Test Results Summary

```
{테스트 실행 결과 요약}
총: X개, 통과: X개, 실패: X개, 건너뜀: X개
```

## Git Diff Summary

```
변경 파일: X개
추가 라인: +X
삭제 라인: -X
```

## Manual Verification Steps

1. {수동 확인 단계 1} → 결과: {pass/fail}
2. {수동 확인 단계 2} → 결과: {pass/fail}

## Acceptance Criteria — Verification

| 기준 | 검증 방법 | 결과 |
|------|----------|------|
| (기준 1) | (방법) | pass/fail |
| (기준 2) | (방법) | pass/fail |

## Issues Found

(검증 중 발견된 이슈, 없으면 "없음")

## Auditor Sign-off

- [ ] 모든 수락 기준 검증 완료
- [ ] 테스트 결과 첨부 완료
- [ ] Git diff 첨부 완료
- [ ] 수동 검증 완료 (해당 시)
