# Audit Checklist

> 태스크 완료 시 또는 주기적 감사 시 사용하는 체크리스트입니다.

## Per-Task Audit (태스크 완료 시)

### Intake & Planning
- [ ] 인테이크 문서가 완전한가? (Goal, AC, Scope, Priority)
- [ ] 리스크 레벨이 분류되었는가?
- [ ] High+ 리스크의 경우 계획 문서가 작성되었는가?

### Implementation
- [ ] 변경된 파일이 확정 범위 내에 있는가?
- [ ] Minimal diff 원칙이 준수되었는가? (요청 외 변경 없음)
- [ ] 보안 취약점이 없는가?
- [ ] 보호된 경로가 수정된 경우 Override 태그가 있는가?

### Verification
- [ ] 증거 번들이 생성되었는가? (`evidence/{date}-{task-id}/`)
- [ ] 테스트가 통과했는가? (또는 실패 사유가 문서화되었는가?)
- [ ] 모든 수락 기준이 증거로 뒷받침되는가?
- [ ] `/final-walkthrough`가 PASS를 반환했는가?

### Handoff & Commit
- [ ] 커밋 메시지가 Conventional Commits 형식을 따르는가?
- [ ] cc-to-ag 핸드오프가 생성되었는가? (Antigravity 확인 필요 시)
- [ ] 핸드오프 `evidence-path`가 실제 번들을 가리키는가?

### Deviations
- [ ] 계획과 다른 점이 있다면 deviation-report가 작성되었는가?
- [ ] Override를 사용했다면 이유가 문서화되었는가?

---

## Override Audit Log

Override가 발생할 때마다 이 섹션에 기록합니다:

| 날짜 | Override 유형 | 사유 | 결과 |
|------|--------------|------|------|
| | | | |

---

## Periodic Audit (주기적 감사)

### 프레임워크 무결성 확인
- [ ] `hooks/hooks.json`의 스크립트 경로가 유효한가?
- [ ] 모든 Hook 스크립트가 존재하고 실행 가능한가?
- [ ] `plugin.json`의 skills/agents/hooks 경로가 유효한가?

### Standards 일관성 확인
- [ ] `rule-manifest.md`가 모든 표준을 반영하는가?
- [ ] `enforcement-matrix.md`가 현재 Hook 스크립트와 일치하는가?
- [ ] 새로 추가된 규칙이 rule-manifest에 기록되었는가?

### Uncertainty 업데이트
- [ ] `uncertainty-register.md`의 미해결 항목이 해소되었는가?
- [ ] 새 불확실성이 발견되면 등록했는가?

---

## Framework Health Score

각 항목에 1점, 만점 100%:

```
Per-Task Audit: {완료 항목}/{전체 항목} = {%}
Periodic Audit: {완료 항목}/{전체 항목} = {%}
Override Rate: {이번 달 Override 수} / {총 규칙 위반 시도} = {%}
```
