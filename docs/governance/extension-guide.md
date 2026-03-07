# Extension Guide

> 이 프레임워크를 확장하는 방법을 설명합니다: 새 규칙, 스킬, Hook, 에이전트 추가.

## 새 규칙 추가

### Step 1: 표준 파일에 규칙 작성

`docs/standards/` 의 관련 표준에 규칙 추가:

```markdown
## Rules

{N+1}. **{RULE-ID}**: {규칙 내용}
```

### Step 2: rule-manifest.md 업데이트

`[override:PROTECTED-PATH]` 태그로 보호된 경로 수정:

```markdown
| {RULE-ID} | {내용} | {Owner} | {Enforcement} | {참조} |
```

### Step 3: enforcement-matrix.md 업데이트

규칙에 적합한 enforcement 메커니즘 추가.

### Step 4: Skill 또는 Hook 구현 (필요 시)

---

## 새 스킬 추가

### 파일 구조

```
skills/{skill-name}/SKILL.md
```

### SKILL.md 최소 형식

```yaml
---
name: {skill-name}
description: Use when {구체적인 트리거 상황}. {주요 기능 설명}
---
```

```markdown
# {Skill Title}

{한 문장 설명}

## Steps

### 1. {단계명}
{구체적인 행동 지침}

### 2. {단계명}
...

## Notes

{엣지케이스, 주의사항}
```

### 등록

`plugin.json`은 `skills/` 디렉토리를 자동 스캔하므로 파일 생성만으로 등록됩니다.

---

## 새 Hook 추가

### Step 1: 스크립트 작성

`scripts/{hook-name}.js`:

```javascript
#!/usr/bin/env node
/**
 * Hook: {Event} ({Matcher})
 * {설명}
 */
'use strict';

const { readStdinSync, blockWith } = require('./lib/fs-utils');

function main() {
  let input = {};
  try {
    const raw = readStdinSync();
    if (raw.trim()) input = JSON.parse(raw);
  } catch {
    process.exit(0); // Fail-open
  }

  // 로직 구현
  // 차단 시: blockWith('사유'); process.exit(0);
  // 허용 시: process.exit(0);

  process.exit(0);
}

main();
```

### Step 2: hooks.json에 등록

`[override:PROTECTED-PATH]` 태그 필요:

```json
{
  "event": "{PreToolUse|PostToolUse|Stop|SessionStart|...}",
  "matcher": "{exact|multiple|wildcard|regex}",
  "type": "command",
  "command": "node ${CLAUDE_PLUGIN_ROOT}/scripts/{hook-name}.js"
}
```

### Step 3: 문서화

- `rule-manifest.md`에 관련 규칙 추가
- `enforcement-matrix.md`에 Hook 항목 추가

---

## 새 에이전트 추가

### 파일 구조

```
agents/{agent-name}.md
```

### 최소 형식

```yaml
---
name: {agent-name}
description: {트리거 상황과 역할 설명}
model: inherit | claude-haiku-4-5-20251001 | claude-sonnet-4-6
color: {cyan|green|red|blue|yellow|purple}
tools:
  - Read
  - Glob
  - Grep
  # Bash, Write 등 필요한 경우만 추가
---
```

### 최소 권한 원칙

- 읽기 전용 에이전트: `Read, Glob, Grep`만
- 구현 에이전트: 필요한 도구만 추가
- `Bash`는 실행이 필요한 경우만

### 등록

`plugin.json`은 `agents/` 디렉토리를 자동 스캔합니다.

---

## 새 템플릿 추가

### YAML Frontmatter 필수 필드

`docs/standards/04-handoff-protocol.md` 스키마 준수:

```yaml
---
direction: "ag-to-cc" | "cc-to-ag"
source-tool: "antigravity" | "claude-code"
target-tool: "antigravity" | "claude-code"
timestamp: "{ISO8601}"
task-id: "{id}"
status: "draft"
priority: "{priority}"
risk-level: "{risk-level}"
evidence-path: "{path}"
---
```

### 등록

`templates/` 디렉토리에 파일 추가만으로 사용 가능합니다.
필요 시 관련 스킬(예: `/handoff-create`)에 템플릿 경로 언급 추가.

---

## 변경 후 검증

새 구성요소 추가 후 반드시 확인:

1. `node scripts/{new-script}.js` — 스크립트 실행 가능 여부
2. YAML frontmatter 파싱 — `node scripts/lib/yaml-frontmatter.js`
3. `plugin.json` 유효성 — JSON 문법 오류 없음
4. `hooks.json` 유효성 — JSON 문법 오류 없음
5. `rule-manifest.md` 업데이트 여부
6. `enforcement-matrix.md` 업데이트 여부
