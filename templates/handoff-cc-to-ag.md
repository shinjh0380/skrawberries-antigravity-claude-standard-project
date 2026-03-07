---
direction: "cc-to-ag"
source-tool: "claude-code"
target-tool: "antigravity"
timestamp: "{ISO8601}"
task-id: "{task-id}"
status: "pending"
priority: "{priority}"
risk-level: "{risk-level}"
evidence-path: "{evidence-path}"
---

# Handoff: CC → AG | {태스크 제목} — 완료 보고

## Summary

(Claude Code에서 완료한 작업 요약)

## Context

(구현 과정에서 파악된 추가 맥락)

## Completed Work

### 변경 파일
- `{파일 경로}` — {변경 내용 요약}
- `{파일 경로}` — {변경 내용 요약}

### 커밋 정보
```
{commit hash}: {commit message}
```

## Acceptance Criteria — Status

- [x] (완료된 기준)
- [ ] (미완료 기준 — 사유 기술)

## Evidence

**증거 번들**: `{evidence-path}`

포함된 증거:
- `test-results.txt` — {테스트 결과 요약}
- `git-diff.txt` — {변경 라인 수}
- (기타 증거 파일)

## Deviations from Plan

(계획과 달라진 점, 없으면 "없음")

## Next Steps for Antigravity

(AG가 해야 할 후속 작업, 시각적 확인 요청 등)

## Known Issues / Follow-up

(알려진 이슈 또는 별도 태스크로 추적해야 할 사항)
