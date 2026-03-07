# Project Overlay Guide

> 새 프로젝트에서 이 프레임워크를 커스터마이징하는 방법을 설명합니다.
> 프레임워크 기본값을 변경하지 않고, 프로젝트별 설정으로 오버레이합니다.

## 오버레이 원칙

1. **프레임워크 파일 직접 수정 금지**: 업데이트 시 덮어쓰일 수 있음
2. **프로젝트별 설정 파일 사용**: `CLAUDE.md`, `.claude/settings.json`
3. **필요한 것만 재정의**: 기본값이 적합하면 그대로 사용

---

## CLAUDE.md 커스터마이징

프로젝트의 `CLAUDE.md`에서 다음 항목을 프로젝트에 맞게 수정합니다:

### 언어 설정

```markdown
## Core Rules
- Respond in English  # 기본값: 한국어
```

### 보호된 경로 추가

```markdown
## Protected Paths (enforced by hook)
- .claude-plugin/**
- hooks/hooks.json
- docs/governance/rule-manifest.md
- docs/governance/enforcement-matrix.md
# 프로젝트별 추가:
- config/production.json    # 프로덕션 설정 보호
- .env.production           # 환경 변수 보호
```

### 세션 프로토콜 조정

```markdown
## Session Protocol
- Use /session-init at session start
# 프로젝트별 추가:
- Always run 'npm run typecheck' before committing
- Check JIRA board for assigned tickets at session start
```

---

## Hook 스크립트 커스터마이징

### 보호된 경로 목록 변경

`scripts/protected-path-guard.js`의 `PROTECTED_PATTERNS` 배열 수정:

```javascript
const PROTECTED_PATTERNS = [
  // 기본 프레임워크 경로
  /^\.claude-plugin\//,
  /^hooks\/hooks\.json$/,
  /^docs\/governance\/rule-manifest\.md$/,
  /^docs\/governance\/enforcement-matrix\.md$/,
  // 프로젝트별 추가
  /^config\/production\./,
  /^\.env\.production$/,
  /^prisma\/migrations\//,  // DB 마이그레이션 보호
];
```

### 위험한 명령어 예외 추가

`scripts/dangerous-command-guard.js`의 exceptions 배열 수정:

```javascript
// 프로젝트별 안전한 삭제 대상 추가
exceptions: [
  /\brm\s+(-\w*[rf]\w*\s+){1,2}(node_modules|dist|build|\.next|coverage|\.cache|__pycache__|\.myproject-cache)\b/,
],
```

### 증거 세션 기간 변경

`scripts/evidence-reminder.js`의 `SESSION_WINDOW_MS` 수정:

```javascript
// 기본: 8시간
const SESSION_WINDOW_MS = 8 * 60 * 60 * 1000;

// 더 긴 세션 (12시간):
const SESSION_WINDOW_MS = 12 * 60 * 60 * 1000;
```

---

## 커밋 타입 확장

`scripts/commit-convention-check.js`의 정규식 수정:

```javascript
// 기본
const CONVENTIONAL_PREFIX = /^(feat|fix|refactor|chore|docs|style|test|perf|ci|build)(\(.+\))?!?:\s+\S/;

// 프로젝트별 타입 추가 (예: hotfix, release, revert)
const CONVENTIONAL_PREFIX = /^(feat|fix|refactor|chore|docs|style|test|perf|ci|build|hotfix|release|revert)(\(.+\))?!?:\s+\S/;
```

---

## 스킬 확장

프로젝트별 스킬 추가는 `docs/governance/extension-guide.md` 참조.

프로젝트 전용 스킬은 플러그인 레포가 아닌 **프로젝트 레포**의 `skills/` 디렉토리에 추가합니다:

```
your-project/
└── skills/
    └── deploy-to-staging/
        └── SKILL.md    # 프로젝트 전용 스킬
```

---

## 핸드오프 스키마 확장

표준 YAML 필드 외에 프로젝트별 필드를 추가할 수 있습니다:

```yaml
---
# 표준 필드 (9개 필수)
direction: "ag-to-cc"
...

# 프로젝트별 추가 필드
jira-ticket: "PROJ-123"
sprint: "2025-Q1-S3"
design-file: "figma://..."
---
```

단, 표준 9개 필드는 삭제하거나 이름을 변경하지 않습니다.
변경 시 `handoff-review` 스킬의 검증이 실패합니다.

---

## 설정 우선순위

Claude Code 설정 계층 (높은 → 낮은 우선순위):

1. 프로젝트 로컬: `.claude/settings.local.json`
2. 프로젝트: `.claude/settings.json`
3. 글로벌: `~/.claude/settings.json`
4. 플러그인 기본값

`CLAUDE.md` 계층:
1. 프로젝트 루트 `CLAUDE.md` (프로젝트별 규칙)
2. 서브디렉토리 `CLAUDE.md` (디렉토리별 규칙)
3. 플러그인 내 참조 문서 (`docs/standards/`)

---

## 커스터마이징 체크리스트

새 프로젝트 도입 시:

- [ ] `CLAUDE.md`에서 언어 설정 확인
- [ ] 보호된 경로 목록 프로젝트에 맞게 추가
- [ ] 위험한 명령어 예외 목록 확인
- [ ] 커밋 타입 목록 프로젝트에 맞게 조정
- [ ] `.gitignore`에 `handoffs/`, `evidence/` 추가
- [ ] Antigravity 사용 시 `.agent/rules/` 복사 및 활성화
