---
template: teammate-role-card
version: "1.0"
task-id: "{task-id}"
teammate-id: "teammate-{N}"
role-name: "{역할명}"
archetype: "{archetype}"
charter-path: "handoffs/charter-{task-id}-{YYYYMMDD}.md"
---

# Role Card: {역할명} (teammate-{N})

> Task: {task-id} | Charter: `handoffs/charter-{task-id}-{YYYYMMDD}.md`

## Mission

{이 팀원이 이 태스크에서 달성해야 할 구체적 목표. 1-3문장.}

## Boundaries

### 담당 파일/범위

```
{담당 파일 또는 디렉토리 목록}
```

### 금지 사항

- 다른 팀원 담당 파일 수정 금지
- Charter에 정의되지 않은 범위 확장 금지
- IMPL-01 (minimal diff) 준수

## Expected Outputs

{이 팀원이 생성/수정해야 할 결과물 목록}

- [ ] {output-1}
- [ ] {output-2}
- [ ] (추가 시)

## Tools & Permissions

| 도구/권한 | 허용 여부 | 비고 |
|---------|---------|------|
| 파일 읽기 | 전체 허용 | |
| 파일 쓰기 | 담당 범위만 | |
| Bash 실행 | {예/아니오} | |
| 외부 API | {예/아니오} | {허용 API 목록} |

## Handoff Expectations

**이 팀원에게 전달되는 정보:**
- {input-1: 설명}
- {input-2: 설명}

**이 팀원이 전달하는 정보:**
- {output-1: 형식 및 전달 방법}
- {output-2: 형식 및 전달 방법}

## Success Criteria

- [ ] {완료 기준 1}
- [ ] {완료 기준 2}
- [ ] 담당 파일이 다른 팀원 범위와 충돌 없음
- [ ] 결과물이 charter의 mission statement에 기여함

## Notes

{역할 수행 시 주의사항, 알려진 제약, 의존성 등}
