# Project Overlay Guide

> 새 프로젝트에서 이 프레임워크를 커스터마이징하는 방법을 설명합니다.
> 프레임워크 기본값을 변경하지 않고, 프로젝트별 설정으로 오버레이합니다.

---

## Override Model

### 3-Tier 계층 구조

```
Tier 1: Global Baseline (플러그인)
  └─ Tier 2: Project Overlay (CLAUDE.md + settings.json)
       └─ Tier 3: Local Developer Override (settings.local.json)
```

**Tier 1: Global Baseline (플러그인)**
플러그인 레포 자체(`~/.claude/plugins/antigravity-standard/`)가 정의하는 불변(invariant) 규칙과 기본 설정입니다.
- 프레임워크 업데이트로 유지됨
- 직접 수정 시 업데이트 시 덮어씌워짐
- Invariants(OVER-06)는 어떤 Tier에서도 변경 불가

**Tier 2: Project Overlay**
프로젝트 루트의 `CLAUDE.md`와 `.claude/settings.json`으로 재정의합니다.
- Git에 커밋하여 팀 전체에 적용
- Tier 1의 기본값을 확장하거나 좁힐 수 있음

**Tier 3: Local Developer Overrides**
`.claude/settings.local.json`으로 개인 환경을 재정의합니다.
- Git 추적에서 제외 (`.gitignore`에 추가)
- 개인 도구 경로, 로컬 테스트 설정 등에 사용
- 팀 전체 설정(Tier 2)을 오버라이드하므로 신중히 사용

---

### Override Permissions (MAY / MAY NOT)

| 항목 | MAY Override | MAY NOT Override |
|------|-------------|-----------------|
| 보호된 경로 목록 | Project overlay에서 경로 추가 가능 | 기본 4개 경로 제거 불가 |
| 커밋 타입 | 추가 커밋 타입 정의 가능 | 기본 10개 타입 제거 불가 |
| Hook 동작 | 예외 패턴 추가 가능 (`exceptions` 배열) | fail-open 원칙 변경 불가 |
| YAML 핸드오프 스키마 | 프로젝트 전용 필드 추가 가능 | 기본 9개 필드 제거/이름변경 불가 |
| Skill 동작 | 프로젝트 스킬로 기능 보강 가능 | 플러그인 스킬 파일 덮어쓰기 불가 |
| 언어 설정 | 모든 언어로 변경 가능 | — |
| 증거 세션 기간 | `SESSION_WINDOW_MS` 수정 가능 | — |
| Invariants (OVER-06) | — | **어떤 Tier에서도 변경 불가** |
| Hook 파일 자체 | 스크립트 로직 수정 가능 (프레임워크 fork 시) | Tier 2/3 설정으로는 불가 — 파일 직접 수정 필요 |

> **Note**: "MAY Override"의 전제는 반드시 Tier 2 또는 Tier 3 파일에서 수행해야 한다는 것입니다. Tier 1(플러그인 파일)을 직접 수정하는 것은 업데이트 시 손실됩니다.

---

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
