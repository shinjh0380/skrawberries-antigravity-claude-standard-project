# Standard 08: Naming Conventions

## Purpose

파일, 브랜치, 커밋 메시지의 일관된 명명 규칙을 정의합니다.

## Rules

1. **NAME-01**: 커밋 메시지는 Conventional Commits 형식을 따라야 한다. Hook이 강제한다.
2. **NAME-02**: 브랜치명은 `{type}/{task-id}-{short-description}` 형식을 따른다.
3. **NAME-03**: 핸드오프 파일명은 `{direction}-{task-id}-{YYYYMMDD}.md` 형식을 따른다.
4. **NAME-04**: 증거 디렉토리명은 `{YYYYMMDD}-{task-id}` 형식을 따른다.
5. **NAME-05**: 태스크 ID는 `task-{YYYY}-{NNN}` 형식을 따른다 (예: `task-2025-001`).

## Commit Message Format

```
{type}({scope}): {title in English}

{body in Korean}

{footer: 태스크 ID, 이슈 링크 등}
```

### Allowed Types

| Type | 용도 |
|------|------|
| `feat` | 새로운 기능 |
| `fix` | 버그 수정 |
| `refactor` | 기능 변경 없는 코드 개선 |
| `chore` | 빌드, 의존성, 설정 변경 |
| `docs` | 문서 변경 |
| `style` | 코드 스타일 (포맷, 세미콜론 등) |
| `test` | 테스트 추가/수정 |
| `perf` | 성능 개선 |
| `ci` | CI/CD 파이프라인 변경 |
| `build` | 빌드 시스템 변경 |

### Examples

```
feat(auth): add JWT refresh token rotation

리프레시 토큰 회전 기능 추가.
만료된 리프레시 토큰 재사용 시 즉시 폐기.

task-2025-001
```

```
fix(ui): correct button spinner timing

로그인 버튼 스피너 노출 타이밍 수정.
500ms 지연 없이 즉시 표시되도록 변경.
```

## Branch Naming

```
feat/task-2025-001-login-spinner
fix/task-2025-002-api-timeout
chore/task-2025-003-update-deps
```

## File Naming

### Handoffs
```
handoffs/ag-to-cc-task-2025-001-20250115.md
handoffs/cc-to-ag-task-2025-001-20250116.md
```

### Evidence
```
evidence/20250115-task-2025-001/
evidence/20250116-task-2025-002/
```

## Owner

Shared

## Enforcement

- **Hook (PreToolUse)**: `commit-convention-check.js` — 커밋 형식 강제
- **Manual**: 브랜치, 파일명 컨벤션 준수

## Exceptions

- WIP 커밋 (`wip: ...`): 개인 브랜치에서만 허용, 머지 전 squash 필수
- 긴급 핫픽스: `hotfix/` 브랜치 접두사 허용
