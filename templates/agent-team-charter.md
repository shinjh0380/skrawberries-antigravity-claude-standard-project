---
template: agent-team-charter
version: "1.0"
task-id: "{task-id}"
timestamp: "{ISO8601}"
approved-by: "user"
team-size: {number}
charter-path: "handoffs/charter-{task-id}-{YYYYMMDD}.md"
status: "active" | "completed" | "cancelled"
experimental: true
model-policy:
  root: "opusplan"
  teammate: "sonnet"
  note: "네이티브 핀 미지원 (U-011) — team-spawn 지시문으로만 전달"
---

# Agent Team Charter: {task-id}

> [EXPERIMENTAL: agent-teams] 이 charter는 실험적 기능(CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1)을 전제합니다.

## Mission Statement

{1-3문장으로 팀이 달성해야 할 목표 명시}

## Team Composition

| 팀원 ID | 역할 | Archetype | 담당 파일/범위 |
|---------|------|-----------|--------------|
| teammate-1 | {역할명} | {archetype} | {파일/디렉토리} |
| teammate-2 | {역할명} | {archetype} | {파일/디렉토리} |
| (추가 시) | | | |

> 각 팀원 상세 역할은 `teammate-role-card.md` 참조.

## File Boundary Map

> TEAM-11: 팀원 간 파일 충돌 방지를 위한 경계 정의

| 파일/디렉토리 | 소유 팀원 | 읽기 권한 | 쓰기 권한 |
|-------------|---------|---------|---------|
| {path} | teammate-{N} | 전체 | teammate-{N} 전용 |
| {path} | teammate-{N} | 전체 | teammate-{N} 전용 |

## Communication Protocol

- **결과 공유 방법**: {팀원 간 결과 전달 방식}
- **진행 상황 보고**: {주기 또는 조건}
- **충돌 해결**: {파일 충돌 또는 의견 불일치 시 처리 방법}

## Success Criteria

{완료 판단 기준 — 원래 태스크 acceptance criteria 참조}

## Cost Budget (TEAM-14)

- **예상 토큰 배수**: 단일 세션 대비 ~{N}× (팀원 {N}명 기준)
- **브로드캐스트**: 금지 — 진행률 보고 및 최종 통합에만 허용
- **재시도 한도**: 팀원당 동일 작업 최대 3회 (초과 시 CC lead에게 보고)
- **비용 경고 임계값**: 예상치의 150% 초과 시 사용자 알림
- **유휴 방지**: 작업 완료 팀원 즉시 종료 (TEAM-13)

## Constraints

- TEAM-07 준수: 이 팀 크기는 최소 필요 인원({N}명)으로 설정됨
- TEAM-11 준수: 파일 경계가 명시적으로 정의됨
- IMPL-01 준수: 각 팀원은 자신의 범위에서 minimal diff 원칙 적용

## Handoff Reference

- **원래 핸드오프**: `handoffs/{original-handoff-filename}`
- **이 charter 경로**: `handoffs/charter-{task-id}-{YYYYMMDD}.md`
- **완료 후**: cc-to-ag 핸드오프에 `charter-path` 필드 포함

## Status Log

| 시간 | 이벤트 |
|------|--------|
| {timestamp} | Charter 생성 — 팀 구성 승인됨 |
| | |
