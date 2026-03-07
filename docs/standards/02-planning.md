# Standard 02: Planning Depth & Handoff

## Purpose

구현 시작 전 충분한 계획 품질을 보장하고, AG와 CC 간 핸드오프 시 맥락 손실을 방지합니다.

## Rules

1. **PLAN-01**: 구현 전 반드시 `/scope-risk-pass`를 실행하여 리스크를 분류해야 한다.
2. **PLAN-02**: 리스크 레벨 `high` 이상인 경우, 구현 전 고수준 계획을 핸드오프 문서에 기술해야 한다.
3. **PLAN-03**: 계획은 단계(step), 예상 변경 파일, 검증 방법을 포함해야 한다.
4. **PLAN-04**: 계획 중 발견된 모호한 요구사항은 `/intake-refine`으로 되돌아가 해소해야 한다. 추측으로 진행 금지.
5. **PLAN-05**: 계획 변경이 필요한 경우, 변경 사유를 편차 보고서(`templates/deviation-report.md`)에 기록해야 한다.
6. **PLAN-06**: 계획은 핸드오프 형식(YAML frontmatter + Markdown)을 따라야 한다.

## Owner

Shared (AG: 고수준 계획 / CC: 상세 기술 계획)

## Enforcement

- **Skill**: `/scope-risk-pass` — 리스크 레벨 분류 및 계획 검토
- **Manual**: 핸드오프 문서 작성 시 템플릿 사용

## Examples

### 최소 계획 (low risk)
```markdown
## Plan
1. src/utils/format.ts의 formatDate 함수 수정
2. 기존 테스트 확인 및 엣지케이스 추가
3. 변경사항: formatDate 함수 1개
```

### 상세 계획 (high risk)
```markdown
## Plan
### Phase 1: Schema Migration
- 파일: prisma/schema.prisma
- 검증: npx prisma migrate dev --dry-run

### Phase 2: API Update
- 파일: src/api/users.ts, src/types/user.ts
- 검증: npm test src/api/users.test.ts

### Rollback
- DB: prisma migrate rollback
- Code: git revert HEAD
```

## Exceptions

- 문서 수정 (`chore`, `docs` 타입): 계획 문서 불필요
- 단일 파일의 명백한 버그 수정: 계획 단계 생략 가능 (단, `/implementation-guard` 준수)
