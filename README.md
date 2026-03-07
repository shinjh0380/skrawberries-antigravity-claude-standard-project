# ⚡ Antigravity + Claude Code Operating Framework

> Antigravity(Google의 에이전트 우선 IDE)와 Claude Code 간의 **양방향 개발 파이프라인**을 위한 재사용 가능한 운영 프레임워크

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Plugin-blue)](https://claude.ai)
[![Antigravity](https://img.shields.io/badge/Antigravity-Compatible-green)](https://antigravity.dev)

---

## 📖 개요

이 레포지토리는 Claude Code 플러그인으로 패키징되어 있으며, 새 프로젝트에서 즉시 활성화할 수 있습니다.

| 역할 | 담당 에이전트 |
|------|-------------|
| 고수준 계획 · UI 피드백 · 브라우저 증거 수집 | **Antigravity** |
| 실제 구현 · 테스트 · 커밋 | **Claude Code** |

---

## 🚀 시작하기

### 방법 A — Fork해서 사용하기 (권장)

새 프로젝트의 기반으로 이 레포지토리를 복제합니다.

**1단계: Fork**

GitHub 우측 상단의 **Fork** 버튼을 클릭하거나 GitHub CLI를 사용합니다.

```bash
gh repo fork skrawberries/antigravity-claude-standard-project --clone
cd antigravity-claude-standard-project
```

**2단계: 로컬 설정**

```bash
# 원본 레포를 upstream으로 등록 (업데이트 수신용)
git remote add upstream https://github.com/skrawberries/antigravity-claude-standard-project.git

# 브랜치 확인
git remote -v
```

**3단계: 프로젝트별 커스터마이징**

```bash
# 프로젝트 오버레이 가이드 참고
cat project-overlay-guide.md
```

`CLAUDE.md`에 프로젝트 고유 규칙을 추가하고, `docs/standards/`의 표준은 그대로 유지합니다.

**4단계: Claude Code에서 플러그인 활성화**

```json
// .claude/settings.json
{
  "enabledPlugins": {
    "antigravity-standard@local": true
  }
}
```

자세한 내용은 [`adoption-guide.md`](adoption-guide.md)를 참조하세요.

---

### 방법 B — 기존 프로젝트에 플러그인으로 추가

```json
// .claude/settings.json
{
  "enabledPlugins": {
    "antigravity-standard@local": true
  }
}
```

---

## 🔄 세션 운영

```bash
# 매 세션 시작 시
/session-init

# Antigravity에서 핸드오프 수신 시
/handoff-review
```

---

## 📁 디렉토리 구조

```
.
├── .claude-plugin/          # Claude Code 플러그인 매니페스트
├── skills/                  # 9개 스킬 (workflow automation)
├── agents/                  # 3개 서브에이전트
├── hooks/                   # Hook 이벤트 설정
├── scripts/                 # Hook 스크립트 (Node.js)
├── docs/
│   ├── standards/           # 공통 표준 10개 (tool-agnostic)
│   ├── antigravity/         # Antigravity 운영 가이드 (한국어)
│   └── governance/          # 거버넌스 문서 7개
├── templates/               # 핸드오프·검증·보고서 템플릿 9개
├── .agent/rules/            # Antigravity 네이티브 규칙 [PROPOSED]
├── CLAUDE.md                # 프로젝트 레벨 Claude Code 규칙
├── adoption-guide.md        # 새 레포에서의 도입 방법
└── project-overlay-guide.md # 프로젝트별 커스터마이징 방법
```

---

## 🔁 핵심 워크플로우

| 단계 | Antigravity 역할 | Claude Code 역할 |
|------|-----------------|-----------------|
| 기획 | 요구사항 정의, 고수준 계획 작성 | `/intake-refine`으로 검증 |
| 설계 | UI 목업·시각적 피드백 제공 | `/ui-spec-normalize`으로 텍스트 스펙 변환 |
| 핸드오프 | `handoff-ag-to-cc.md` 생성 | `/handoff-review`로 수신 검증 |
| 구현 | 브라우저 증거 수집 모니터링 | `/implementation-guard`로 범위 준수 |
| 검증 | 결과물 시각적 확인 | `/verification-bundle`로 증거 번들링 |
| 완료 | 완료 보고서 수신 | `/final-walkthrough` → `/handoff-create` |

---

## 🛠 스킬 목록

| 스킬 | 용도 |
|------|------|
| `/session-init` | 세션 시작 의식 (브랜치 확인, 핸드오프 스캔) |
| `/intake-refine` | 새 태스크 요청 검증 및 구체화 |
| `/scope-risk-pass` | 범위·리스크 평가 |
| `/handoff-review` | 수신 핸드오프 문서 검증 |
| `/handoff-create` | 발신 핸드오프 문서 생성 |
| `/implementation-guard` | 구현 중 제약 준수 확인 |
| `/ui-spec-normalize` | 시각적 피드백 → 텍스트 스펙 변환 |
| `/verification-bundle` | 증거 수집 및 번들링 |
| `/final-walkthrough` | 완료 전 최종 감사 |

---

## 🔒 보호된 경로

다음 경로는 Hook에 의해 쓰기가 차단됩니다:

| 경로 | 설명 |
|------|------|
| `.claude-plugin/**` | 플러그인 매니페스트 |
| `hooks/hooks.json` | Hook 이벤트 설정 |
| `docs/governance/rule-manifest.md` | 거버넌스 규칙 목록 |
| `docs/governance/enforcement-matrix.md` | 적용 매트릭스 |

> 수정이 필요한 경우 요청에 `[override:PROTECTED-PATH]` 태그를 포함하세요.

---

## 📄 라이선스

[MIT](LICENSE)
