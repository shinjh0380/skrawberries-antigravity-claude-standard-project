# Contributor Onboarding Guide

> 이 프레임워크를 처음 사용하거나 기여하는 사람을 위한 가이드입니다.

## 5분 빠른 시작

### 1. 프레임워크 이해

이 프레임워크는 **Antigravity(AG)** 와 **Claude Code(CC)** 간의 체계적인 협업을 위한 것입니다.

- **AG 역할**: 계획, UI 피드백, 시각적 확인
- **CC 역할**: 구현, 테스트, 커밋

### 2. 핵심 파일 읽기

순서대로 읽으세요:
1. `README.md` — 전체 구조 개요
2. `CLAUDE.md` — CC에서 항상 활성화되는 규칙
3. `docs/standards/01-intake.md` — 태스크 시작 방법
4. `docs/standards/04-handoff-protocol.md` — 핸드오프 방법

### 3. 첫 세션 시작

CC에서:
```
/session-init
```

AG에서:
- `docs/antigravity/operator-guide.md` 읽기
- `.agent/rules/` 파일 활성화 설정

## 핵심 개념

### 핸드오프 (Handoff)
AG와 CC 간의 공식 작업 전달 방법입니다. YAML frontmatter + Markdown 형식을 사용합니다.
- AG→CC: 새 작업 할당
- CC→AG: 완료 보고, 시각적 확인 요청

### 증거 번들 (Evidence Bundle)
구현 완료를 입증하는 파일 모음입니다. `evidence/{date}-{task-id}/`에 저장됩니다.
git에 추적되지 않습니다 (`.gitignore`).

### 보호된 경로 (Protected Paths)
Hook이 자동으로 쓰기를 차단하는 파일들입니다.
수정하려면 `[override:PROTECTED-PATH]` 태그가 필요합니다.

## 스킬 참조

| 언제 | 스킬 |
|------|------|
| 세션 시작 | `/session-init` |
| 새 태스크 | `/intake-refine` |
| 구현 전 | `/scope-risk-pass` |
| 핸드오프 수신 | `/handoff-review` |
| 핸드오프 전송 | `/handoff-create` |
| 구현 중 | `/implementation-guard` |
| UI 피드백 처리 | `/ui-spec-normalize` |
| 증거 수집 | `/verification-bundle` |
| 완료 전 | `/final-walkthrough` |

## 자주 묻는 질문

### Q: 커밋 메시지가 Hook에 막혔어요
A: `feat: ...` / `fix: ...` 형식을 사용하세요. `docs/standards/08-naming-conventions.md` 참조.

### Q: 보호된 경로를 수정해야 해요
A: 요청에 `[override:PROTECTED-PATH] {사유}`를 포함하세요.

### Q: 리스크 레벨이 어느 것인지 모르겠어요
A: `/scope-risk-pass`를 실행하면 자동으로 분류됩니다.

### Q: 핸드오프 없이 작업하고 싶어요
A: 1인 작업이거나 CC에서만 작업한다면 핸드오프 없이 진행 가능합니다.
   AG와 협업할 때만 핸드오프가 필요합니다.

### Q: 증거 번들이 너무 번거로워요
A: 문서 변경(`docs`, `chore` 타입)은 번들 없이 진행 가능합니다.
   기능 구현과 버그 수정에만 필수입니다.

## 첫 기여

이 프레임워크에 기여하려면:
1. `docs/governance/change-governance.md` 읽기
2. 변경 클래스 결정 (A~D)
3. 해당 클래스 절차 따르기
4. `rule-manifest.md`, `enforcement-matrix.md` 업데이트 (필요 시)
