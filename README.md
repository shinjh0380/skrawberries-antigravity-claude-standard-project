# Antigravity + Claude Code Operating Framework

Antigravity(Google의 에이전트 우선 IDE)와 Claude Code 간의 **양방향 개발 파이프라인**을 위한 재사용 가능한 운영 프레임워크입니다.

## 개요

이 레포지토리는 Claude Code 플러그인으로 패키징되어 있으며, 새 프로젝트에서 즉시 활성화할 수 있습니다. Antigravity가 고수준 계획·UI 피드백·브라우저 증거를 담당하고, Claude Code가 실제 구현·테스트·커밋을 담당하는 역할 분리 모델을 채택합니다.

## 빠른 시작

### 1. 플러그인 활성화 (새 프로젝트에서)

```json
// .claude/settings.json
{
  "enabledPlugins": {
    "antigravity-standard@local": true
  }
}
```

자세한 내용은 `adoption-guide.md`를 참조하세요.

### 2. 세션 시작

```
/session-init
```

### 3. Antigravity에서 핸드오프 수신 시

```
/handoff-review
```

## 디렉토리 구조

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

## 핵심 워크플로우

| 단계 | Antigravity 역할 | Claude Code 역할 |
|------|-----------------|-----------------|
| 기획 | 요구사항 정의, 고수준 계획 작성 | `/intake-refine`으로 검증 |
| 설계 | UI 목업·시각적 피드백 제공 | `/ui-spec-normalize`으로 텍스트 스펙 변환 |
| 핸드오프 | `handoff-ag-to-cc.md` 생성 | `/handoff-review`로 수신 검증 |
| 구현 | 브라우저 증거 수집 모니터링 | `/implementation-guard`로 범위 준수 |
| 검증 | 결과물 시각적 확인 | `/verification-bundle`로 증거 번들링 |
| 완료 | 완료 보고서 수신 | `/final-walkthrough` → `/handoff-create` |

## 스킬 목록

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

## 보호된 경로

다음 경로는 Hook에 의해 쓰기가 차단됩니다:
- `.claude-plugin/**`
- `hooks/hooks.json`
- `docs/governance/rule-manifest.md`
- `docs/governance/enforcement-matrix.md`

## 라이선스

MIT
