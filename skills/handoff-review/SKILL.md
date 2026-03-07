---
name: handoff-review
description: Use when receiving a handoff document from Antigravity or another Claude Code session, user says 'review handoff', 'handoff 확인', or '핸드오프 검토'. Parses YAML schema, validates completeness, and confirms readiness to proceed.
---

# Handoff Review

수신된 핸드오프 문서를 검증하고 작업 수행 준비를 확인합니다.

## Steps

### 1. Locate Handoff Document

핸드오프 파일을 찾습니다:
- 사용자가 파일 경로를 제공한 경우 → 직접 읽기
- 제공하지 않은 경우 → `handoffs/` 디렉토리에서 `status: pending` 파일 스캔

```bash
# pending 핸드오프 목록
ls handoffs/*ag-to-cc*.md 2>/dev/null || echo "(없음)"
```

### 2. Parse YAML Frontmatter

YAML frontmatter를 파싱하고 필수 필드를 검증합니다:

`docs/standards/04-handoff-protocol.md` 스키마 기준:

| 필드 | 존재 | 유효값 |
|------|------|-------|
| direction | [ ] | ag-to-cc / cc-to-ag |
| source-tool | [ ] | antigravity / claude-code |
| target-tool | [ ] | antigravity / claude-code |
| timestamp | [ ] | ISO8601 형식 |
| task-id | [ ] | 비어있지 않음 |
| status | [ ] | draft/pending/received/completed |
| priority | [ ] | low/normal/high/critical |
| risk-level | [ ] | low/medium/high/critical |
| evidence-path | [ ] | 경로 존재하거나 빈 문자열 |

### 3. Validate Body Sections

Markdown 본문에 필수 섹션이 있는지 확인합니다:

- [ ] `## Summary` — 작업 요약
- [ ] `## Context` — 배경 정보
- [ ] `## Task / Goal` — 수행할 작업
- [ ] `## Acceptance Criteria` — 완료 기준

### 4. Evidence Path Check

`evidence-path`가 비어있지 않으면 해당 경로가 실제 존재하는지 확인합니다.

### 5. Update Status

검증 통과 시 핸드오프 파일의 `status`를 `received`로 업데이트합니다:

```
status: pending → received
```

### 6. Validation Report

검증 결과를 출력합니다:

```
## Handoff Review Result

파일: {파일명}
Task ID: {task-id}
Direction: {direction}
Priority: {priority} | Risk: {risk-level}

YAML Schema: PASS / FAIL
  ✓ direction: ag-to-cc
  ✓ task-id: task-2025-001
  ✗ evidence-path: 경로 없음 (무시 — 빈 문자열)

Body Sections: PASS / FAIL
  ✓ Summary
  ✓ Context
  ✓ Task / Goal
  ✗ Acceptance Criteria — 누락!

Status: {READY TO PROCEED / BLOCKED}
```

### 7. Next Steps

검증 통과 시:
```
핸드오프가 준비되었습니다.
다음 단계: /scope-risk-pass 실행 후 구현 시작
```

검증 실패 시:
```
핸드오프에 {N}개 문제가 있습니다.
Antigravity에 보완을 요청하거나, 누락 정보를 직접 수집하세요.
```

## Error Handling

- YAML 파싱 실패 → 파일 형식 오류 보고, 수동 확인 요청
- `status: completed` 파일 수신 → "이미 완료된 핸드오프" 알림
- `direction: cc-to-ag` 파일 수신 → "발신 핸드오프입니다. ag-to-cc 파일을 확인하세요" 알림
