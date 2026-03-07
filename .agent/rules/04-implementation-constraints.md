# Implementation Constraints for AG [PROPOSED — Always On]

> **[PROPOSED]**: 활성화 모드: Always On

## AG가 Claude Code에게 요청할 때의 제약

Antigravity는 Claude Code에 구현을 위임할 때 다음 제약을 존중해야 합니다:

### 1. Minimal Diff 원칙 존중

Claude Code는 요청된 변경만 수행합니다. 다음을 기대하지 마세요:
- 요청하지 않은 코드 정리
- 관련 없는 버그 수정
- 패턴 리팩터링

추가 변경이 필요하면 **별도 태스크**로 요청하세요.

### 2. 범위 경계 명시 의무

핸드오프의 `Scope Boundary` 섹션에 명확히 기술해야 합니다:
- **포함**: 변경해야 할 파일/컴포넌트
- **제외**: 건드리지 말아야 할 파일/영역

범위가 불명확하면 Claude Code가 `/intake-refine`으로 되돌려 보냅니다.

### 3. 리스크 레벨 정직 기술

실제 리스크에 맞는 레벨을 표기해야 합니다. 낮게 표기하면:
- Claude Code가 부족한 계획으로 구현 시작
- 구현 중 범위 확대 발견 → 중단 및 에스컬레이션 발생

### 4. 보안 관련 요청 금지

다음은 요청해도 Claude Code가 거부합니다:
- 의도적 보안 취약점 도입
- 인증 우회 코드
- 프로덕션 데이터 직접 조작

## 참조

`docs/standards/03-implementation-constraints.md` — Claude Code 측 상세 규칙
