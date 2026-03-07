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

# Completion Report: {태스크 제목}

**완료 시각**: {ISO8601}
**태스크 ID**: {task-id}
**소요 세션**: {세션 수}

## Summary

(완료된 작업 최종 요약)

## Acceptance Criteria — Final Status

| 기준 | 상태 | 비고 |
|------|------|------|
| (기준 1) | ✓ 완료 / ✗ 미완료 | |
| (기준 2) | ✓ 완료 / ✗ 미완료 | |

## Changes Made

### Files Modified
| 파일 | 변경 유형 | 변경 내용 |
|------|----------|----------|
| `{파일경로}` | added/modified/deleted | {설명} |

### Commits
```
{commit hash} {commit message}
{commit hash} {commit message}
```

## Deviations from Original Plan

| # | 계획 내용 | 실제 구현 | 사유 |
|---|----------|----------|------|
| 1 | | | |

(편차 없으면 "없음")

## Evidence Bundle

**경로**: `evidence/{YYYYMMDD}-{task-id}/`
**내용**: (포함된 증거 파일 목록)

## Self-Review Checklist

- [x] 수락 기준 모두 충족
- [x] Minimal diff 원칙 준수
- [x] 보안 취약점 없음
- [x] 테스트 통과
- [x] 증거 번들 완전
- [x] 커밋 컨벤션 준수
- [ ] (미완료 항목 사유)

## Known Issues / Follow-up Tasks

| 이슈 | 심각도 | 추적 방법 |
|------|-------|----------|
| (이슈 1) | low/medium/high | 새 태스크 / 백로그 |

(없으면 "없음")

## Next Steps for Antigravity

(AG에서 확인 또는 수행해야 할 후속 작업)
