---
name: verification-bundle
description: Use when collecting evidence, user says 'bundle evidence', '증거 수집', '번들', or before handoff or task completion. Runs tests, captures outputs, and organizes everything into an evidence bundle directory.
---

# Verification Bundle

테스트 실행, 결과 캡처, 증거 번들 생성을 수행합니다.

## Steps

### 1. Identify Task and Evidence Path

```
task-id: {현재 태스크 ID}
evidence-dir: evidence/{YYYYMMDD}-{task-id}/
```

디렉토리를 생성합니다 (없는 경우):
```bash
mkdir -p evidence/{YYYYMMDD}-{task-id}
```

### 2. Capture Git Diff

```bash
git diff HEAD --stat > evidence/{date}-{task-id}/git-diff.txt
git diff HEAD >> evidence/{date}-{task-id}/git-diff.txt
```

### 3. Run Automated Tests

프로젝트의 테스트 환경에 따라 실행합니다:

**감지 순서:**
```bash
# 1. package.json이 있으면
npm test 2>&1 | tee evidence/{date}-{task-id}/test-results.txt

# 2. pytest가 있으면
python -m pytest -v 2>&1 | tee evidence/{date}-{task-id}/test-results.txt

# 3. 그 외
# 사용자에게 테스트 명령 확인
```

테스트 실패 시:
- 실패 로그를 `test-failures.txt`에 저장
- 수락 기준에 영향을 미치는지 평가
- 영향이 있으면 구현으로 되돌아가 수정

### 4. Capture Manual Verification

자동 테스트가 없거나 UI 변경인 경우 수동 검증 로그 작성:

```markdown
# Manual Verification

## Acceptance Criteria Checks

### 기준 1: {내용}
- 검증 방법: {어떻게 확인했는지}
- 결과: PASS
- 증거: {curl 출력, 콘솔 로그, 스크린샷 설명}

### 기준 2: {내용}
- 검증 방법: ...
- 결과: PASS
```

`evidence/{date}-{task-id}/manual-verify.md`에 저장.

### 5. Create Bundle Index

`evidence/{date}-{task-id}/evidence-bundle-index.md` 생성:

`templates/verification-evidence-bundle.md` 템플릿을 사용하여 채웁니다.

### 6. Bundle Summary

```
## Evidence Bundle Created

경로: evidence/{date}-{task-id}/
파일:
  - evidence-bundle-index.md ✓
  - git-diff.txt ✓ (+X/-X lines, X files)
  - test-results.txt ✓ (X pass, X fail)
  - manual-verify.md ✓ (or N/A)

수락 기준 충족:
  - [x] 기준 1
  - [x] 기준 2

다음 단계: /final-walkthrough
```

## Notes

- `evidence/` 디렉토리는 `.gitignore`로 추적 제외됨 — 세션 로컬 파일
- 번들은 핸드오프 `evidence-path` 필드에 참조됨
- 실패한 테스트는 번들에 포함하되, 의도적 실패인지 사유를 기록
