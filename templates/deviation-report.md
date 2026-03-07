---
direction: "cc-to-ag"
source-tool: "claude-code"
target-tool: "antigravity"
timestamp: "{ISO8601}"
task-id: "{task-id}"
status: "pending"
priority: "{priority}"
risk-level: "{risk-level}"
evidence-path: ""
---

# Deviation Report: {태스크 제목}

**보고 시각**: {ISO8601}
**태스크 ID**: {task-id}
**편차 유형**: {scope-change|plan-change|override|risk-escalation}

## Summary

(무엇이 원래 계획과 달라졌는지 1-2문장 요약)

## Original Plan

(원래 계획에서 해당 부분)

## Actual / Proposed Change

(실제 발생했거나 제안하는 변경)

## Reason for Deviation

(편차가 발생한 이유)

## Impact Assessment

| 항목 | 영향 |
|------|------|
| 범위 | (범위에 미치는 영향) |
| 일정 | (일정에 미치는 영향) |
| 리스크 | (리스크 레벨 변화: {기존} → {변경 후}) |
| 의존성 | (다른 태스크에 미치는 영향) |

## Override Tag (해당 시)

```
[override:{RULE-ID}] {사유}
```

## Decision Required

(사용자/AG에게 결정을 요청하는 내용)

**선택지:**
- A) {선택지 A}
- B) {선택지 B}
- C) 원래 계획대로 진행

## Auditor Notes

(이 보고서 검토 시 확인해야 할 사항)
