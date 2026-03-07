# Standard 09: Review Requirements

## Purpose

1인 개발자 환경에서도 코드 품질과 의도적 검토를 보장하는 셀프 리뷰 체계를 정의합니다.

## Rules

1. **REVIEW-01**: 최종 커밋 전 셀프 리뷰를 수행해야 한다.
2. **REVIEW-02**: `/final-walkthrough` 스킬이 셀프 리뷰의 구조화된 체크리스트를 제공한다.
3. **REVIEW-03**: `risk-level: high` 이상의 변경은 리뷰 체크리스트의 모든 항목을 명시적으로 확인해야 한다.
4. **REVIEW-04**: 리뷰 중 발견된 문제는 추가 태스크로 생성하거나 즉시 수정해야 한다. 무시 금지.
5. **REVIEW-05**: 리뷰 결과는 완료 보고서(`templates/completion-report.md`)에 기록해야 한다.

## Self-Review Checklist

### 기능 검토
- [ ] 수락 기준(Acceptance Criteria)을 모두 충족하는가?
- [ ] 엣지 케이스를 처리하는가?
- [ ] 요청되지 않은 변경이 없는가? (Minimal diff)

### 코드 품질
- [ ] 기존 패턴을 따르는가?
- [ ] 명백한 보안 취약점이 없는가?
- [ ] 에러 처리가 적절한가?

### 테스트 및 증거
- [ ] 관련 테스트가 통과하는가?
- [ ] 증거 번들이 완전한가?

### 문서 및 커밋
- [ ] 커밋 메시지가 컨벤션을 따르는가?
- [ ] 핸드오프 문서가 최신 상태인가?

## Owner

CC (실행) / Shared (기준)

## Enforcement

- **Skill**: `/final-walkthrough` — 체크리스트 기반 리뷰 진행
- **Manual**: 완료 보고서 작성

## Peer Review Policy (1인 개발자)

1인 개발자 환경이므로:
- **셀프 리뷰** = 이 표준의 리뷰 체크리스트 준수
- **Antigravity 리뷰** = AG의 시각적 확인 + `cc-to-ag` 핸드오프
- **추가 검토** = Claude Code의 `/requesting-code-review` 스킬 활용 가능

## Exceptions

- 문서 전용 변경: 간소화된 리뷰 허용 (기능 검토 항목 생략)
- 긴급 핫픽스: 배포 후 24시간 내 소급 리뷰 허용
