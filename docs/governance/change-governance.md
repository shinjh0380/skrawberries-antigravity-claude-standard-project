# Change Governance Policy

> 이 프레임워크 자체의 변경을 관리하는 정책입니다.

## 변경 분류

### Class A: Minor Change (낮은 영향)
- 문서 오타 수정, 설명 개선
- 예시 추가/수정
- Advisory 규칙 텍스트 변경

**절차**: 직접 수정 + 커밋 (`docs: ...`)

---

### Class B: Standard Change (중간 영향)
- 새 규칙 추가 (신규 표준)
- 기존 규칙 명확화
- 새 템플릿 추가
- 새 스킬 추가

**절차**:
1. `deviation-report.md` 작성 (변경 사유)
2. `rule-manifest.md` 업데이트
3. `enforcement-matrix.md` 업데이트
4. 변경 커밋 (`docs: ...` 또는 `feat: ...`)

---

### Class C: Major Change (높은 영향)
- Hook 스크립트 로직 변경
- `hooks/hooks.json` 이벤트 구조 변경
- 기존 규칙 삭제 또는 약화
- Plugin manifest 변경
- 보호된 경로 추가/제거

**절차**:
1. [override:PROTECTED-PATH] 태그 사용 (protected path인 경우)
2. 변경 사유 충분히 문서화
3. `rule-manifest.md` + `enforcement-matrix.md` 동시 업데이트
4. `uncertainty-register.md`에 새 불확실성 기록 (발생 시)
5. 변경 커밋 (`refactor: ...` 또는 `feat: ...`)
6. Adoption Guide 업데이트 (새 프로젝트에 영향 있는 경우)

---

### Class D: Breaking Change (가장 높은 영향)
- 핸드오프 YAML 스키마 변경
- Skill 이름/트리거 변경 (기존 사용자에게 영향)
- 프레임워크 디렉토리 구조 재편

**절차**:
1. Class C 절차 모두 포함
2. `adoption-guide.md`에 마이그레이션 가이드 추가
3. 기존 템플릿 파일에 deprecated 마킹
4. `CHANGELOG.md` 작성 (없으면 생성)

## Protected Files

다음 파일은 Class C 이상 변경만 허용:
- `hooks/hooks.json`
- `.claude-plugin/plugin.json`
- `docs/governance/rule-manifest.md`
- `docs/governance/enforcement-matrix.md`

## 1인 개발자 환경에서의 적용

1인 개발자이므로:
- **승인자 = 본인**
- **검토 = 셀프 리뷰** (`docs/standards/09-review-requirements.md`)
- **감사 = `/final-walkthrough`** 실행

단, 프레임워크 변경은 일반 기능 변경보다 신중하게 접근합니다.
변경 전 항상 "이 변경이 프레임워크를 더 좋게 만드는가, 아니면 단순히 지금 편리한가?"를 자문합니다.
