# Adoption Guide

> 새 프로젝트에서 이 프레임워크를 도입하는 방법을 단계별로 설명합니다.

## 전제 조건

- Claude Code CLI 설치
- Node.js 18+ (Hook 스크립트 실행)
- Antigravity IDE (AG↔CC 파이프라인 사용 시)

## 도입 방법 1: 로컬 플러그인으로 사용

### Step 1: 레포 클론

```bash
git clone {this-repo-url} ~/.claude/plugins/antigravity-standard
# 또는 원하는 위치에 클론
```

### Step 2: 플러그인 활성화

대상 프로젝트의 `.claude/settings.json`에 추가:

```json
{
  "enabledPlugins": {
    "antigravity-standard@local": {
      "path": "~/.claude/plugins/antigravity-standard"
    }
  }
}
```

또는 프로젝트 로컬 `.claude/settings.local.json`:

```json
{
  "enabledPlugins": {
    "antigravity-standard@local": true
  }
}
```

### Step 3: CLAUDE.md 설정

프로젝트 루트에 `CLAUDE.md`를 생성하거나, 이 레포의 `CLAUDE.md`를 복사 후 프로젝트에 맞게 수정합니다.

최소 설정:
```markdown
# {프로젝트명}

## Core Rules
- Respond in Korean
- Use Conventional Commits
- Minimal diff principle

## Standards Reference
- docs/standards/ (플러그인 내)

## Protected Paths
- {프로젝트별 보호 경로}
```

### Step 4: Antigravity 설정 (선택)

AG↔CC 파이프라인을 사용하는 경우:

```bash
# 이 레포의 .agent/rules/를 프로젝트 루트에 복사
cp -r ~/.claude/plugins/antigravity-standard/.agent /path/to/project/
```

`[PROPOSED]` 마킹된 규칙들의 활성화 방식은 Antigravity 문서를 확인하세요.

### Step 5: 디렉토리 초기화

```bash
cd /path/to/project
mkdir -p handoffs evidence
```

`.gitignore`에 추가 (이미 있지 않다면):
```gitignore
handoffs/
evidence/
```

### Step 6: 첫 세션 시작

Claude Code에서:
```
/session-init
```

---

## 도입 방법 2: 레포에 직접 복사

규모가 작은 프로젝트나 단일 레포 전용으로 사용하는 경우:

```bash
# 필요한 파일만 선택적으로 복사
cp -r skills/ agents/ hooks/ scripts/ docs/ templates/ /path/to/project/
cp .claude-plugin/plugin.json /path/to/project/.claude-plugin/
cp CLAUDE.md /path/to/project/CLAUDE.md  # 수정 후 사용
```

이 방식은 프레임워크 업데이트를 수동으로 관리해야 합니다.

---

## 프로젝트별 커스터마이징

도입 후 프로젝트에 맞게 조정해야 할 항목:

| 항목 | 방법 | 파일 |
|------|------|------|
| 보호된 경로 추가 | `protected-path-guard.js` 수정 | `scripts/protected-path-guard.js` |
| 커밋 타입 추가 | `commit-convention-check.js` 수정 | `scripts/commit-convention-check.js` |
| 언어 변경 | `CLAUDE.md` 수정 | `CLAUDE.md` |
| 증거 세션 기간 변경 | `evidence-reminder.js` 수정 | `scripts/evidence-reminder.js` |

자세한 내용: `project-overlay-guide.md`

---

## 검증

도입 후 다음을 확인합니다:

```bash
# 1. Hook 스크립트 실행 테스트
echo '{"tool_input":{"file_path":".claude-plugin/plugin.json"}}' | node scripts/protected-path-guard.js
# 예상: {"decision":"block","reason":"Protected path..."}

echo '{"tool_input":{"file_path":"src/app.ts"}}' | node scripts/protected-path-guard.js
# 예상: (빈 출력 — 허용)

# 2. YAML 파서 테스트
node scripts/lib/yaml-frontmatter.js
# 예상: "Self-test passed."

# 3. plugin.json 유효성
node -e "require('./.claude-plugin/plugin.json'); console.log('Valid JSON')"
# 예상: "Valid JSON"

# 4. hooks.json 유효성
node -e "require('./hooks/hooks.json'); console.log('Valid JSON')"
# 예상: "Valid JSON"
```

---

## 문제 해결

### Hook이 작동하지 않는 경우
1. `hooks/hooks.json`의 `${CLAUDE_PLUGIN_ROOT}` 경로가 올바른지 확인
2. Node.js 버전 확인: `node --version` (18+ 필요)
3. 스크립트 실행 권한 확인: `ls -la scripts/`

### 스킬이 보이지 않는 경우
1. `plugin.json`의 `skills` 경로 확인
2. `skills/` 디렉토리의 각 스킬 폴더에 `SKILL.md`가 있는지 확인
3. `SKILL.md`의 YAML frontmatter에 `name`과 `description` 필드 확인

### Antigravity 규칙이 적용되지 않는 경우
`.agent/rules/` 파일들은 `[PROPOSED]` 상태입니다.
Antigravity 공식 문서에서 규칙 파일 활성화 방법을 확인하세요.
