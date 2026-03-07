# Standard 05: Verification Policy

## Purpose

모든 구현 작업에 대해 재현 가능한 증거를 수집하여 완료 주장을 입증합니다.

## Rules

1. **VERIF-01**: 기능 구현 또는 버그 수정 완료 시, 최소 하나의 검증 증거를 수집해야 한다.
2. **VERIF-02**: 증거는 `evidence/{YYYYMMDD}-{task-id}/` 디렉토리에 저장한다.
3. **VERIF-03**: 자동화된 테스트가 존재하는 경우, 테스트 결과(pass/fail, 실행 로그)를 증거로 포함해야 한다.
4. **VERIF-04**: 시각적 검증이 필요한 경우(UI 변경), 스크린샷 또는 브라우저 녹화를 증거로 포함해야 한다.
5. **VERIF-05**: 증거 번들 인덱스 파일(`evidence-bundle-index.md`)이 번들 디렉토리에 존재해야 한다.
6. **VERIF-06**: 최종 커밋 전 `/final-walkthrough`를 실행하여 모든 증거가 완전한지 확인해야 한다.
7. **VERIF-07**: 증거 없이 "완료"를 주장할 수 없다. Stop Hook이 증거 부재를 리마인드한다.

## Evidence Types

| 유형 | 예시 | 필수 여부 |
|------|------|----------|
| 테스트 결과 | `npm test` 출력, pytest 결과 | 테스트 존재 시 필수 |
| 수동 검증 로그 | curl 응답, 콘솔 출력 | 자동 테스트 없을 시 필수 |
| 스크린샷/녹화 | UI 변경 전후 비교 | UI 변경 시 필수 |
| Git diff | 변경된 파일 목록 및 라인 수 | 항상 포함 권장 |
| 빌드 로그 | CI/CD 결과 | 빌드 파이프라인 있을 시 |

## Owner

CC (Claude Code)

## Enforcement

- **Hook (Stop)**: `evidence-reminder.js` — 세션 종료 시 증거 부재 알림 (advisory)
- **Skill**: `/verification-bundle` — 증거 수집 및 번들 생성
- **Skill**: `/final-walkthrough` — 번들 완전성 감사

## Examples

```
evidence/
└── 20250115-task-001/
    ├── evidence-bundle-index.md    # 필수 인덱스
    ├── test-results.txt            # npm test 출력
    ├── git-diff.txt               # git diff HEAD 출력
    └── manual-verify.md           # 수동 확인 메모
```

## Exceptions

- 문서 전용 변경 (`docs`, `chore` 타입): 증거 번들 불필요, 단 변경 내용 요약 기록
- 긴급 핫픽스: 증거 수집을 배포 후 24시간 내 소급 허용
