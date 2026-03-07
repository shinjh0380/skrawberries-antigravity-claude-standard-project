---
direction: "cc-to-ag"
source-tool: "claude-code"
target-tool: "antigravity"
timestamp: "{ISO8601}"
task-id: "{task-id}"
status: "pending"
priority: "high"
risk-level: "high"
evidence-path: ""
---

# Risk Escalation: {태스크 제목}

**에스컬레이션 시각**: {ISO8601}
**태스크 ID**: {task-id}
**리스크 레벨 변경**: {이전 레벨} → {새 레벨}

## What Was Discovered

(어떤 상황이 발견되었는지)

## Why This is a Risk

(리스크인 이유, 잠재적 영향)

## Escalation Trigger

(어떤 규칙에 의해 에스컬레이션되었는지)

참고: `docs/standards/06-risk-classification.md` — Risk Escalation Triggers

## Current State

(현재 구현 진행 상태 — 중단 시점)

## Options

### Option A: 진행 (권장)
(진행 방법, 필요한 추가 조치)
**리스크 완화**: (완화 방법)

### Option B: 범위 축소
(범위를 줄여서 리스크를 낮추는 방법)

### Option C: 중단
(이 태스크를 취소하고 재계획하는 이유)

## Required Action

**사용자 결정 필요**: 위 옵션 중 선택 후 Claude Code에 알려주세요.

구현은 결정을 받을 때까지 일시 중단합니다.
