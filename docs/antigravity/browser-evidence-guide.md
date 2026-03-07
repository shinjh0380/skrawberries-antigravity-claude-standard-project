# 브라우저 증거 활용 가이드

> Antigravity의 브라우저 서브에이전트를 활용하여 구현 결과를 시각적으로 검증하는 방법을 설명합니다.

> **참고**: Antigravity 브라우저 서브에이전트의 정확한 동작 방식은 Antigravity 공식 문서를 참조하세요. 이 가이드는 일반적인 접근 방식을 제안합니다.

## 브라우저 증거의 역할

Claude Code는 코드 수준의 증거(테스트 결과, git diff)를 수집합니다.
Antigravity는 시각적 증거(스크린샷, 브라우저 동작)를 추가합니다.

두 증거의 결합으로 완전한 검증이 이루어집니다.

## 증거 수집 시점

### 구현 완료 후 (CC→AG 핸드오프 수신 시)

1. CC의 증거 번들(`evidence-path`) 확인
2. 로컬 개발 서버 또는 스테이징 환경에서 직접 확인
3. 수락 기준의 시각적 항목 검증

### UI 변경 요청 전 (현재 상태 캡처)

변경 요청 전 현재 상태를 캡처하여 핸드오프에 포함:
- `screenshot-before.png`
- `current-behavior.md` (현재 동작 설명)

## 브라우저 증거 수집 절차

### 1. 스크린샷 캡처

변경 전후를 비교할 수 있도록:
```
before: screenshot-{component}-before.png
after:  screenshot-{component}-after.png
```

### 2. 인터랙션 시나리오 검증

수락 기준의 인터랙션 항목을 직접 테스트:
- 버튼 클릭 → 예상 동작 확인
- 폼 제출 → 유효성 검사 확인
- 에러 상태 → 에러 메시지 표시 확인

### 3. 콘솔 에러 확인

브라우저 개발자 도구에서:
- Console 탭: 자바스크립트 에러 없음 확인
- Network 탭: API 요청 성공 확인
- 발견된 에러는 `browser-errors.txt`에 기록

### 4. 결과 문서화

`evidence/{date}-{task-id}/browser-verify.md` 작성:

```markdown
# Browser Verification

수행자: Antigravity
시각: {ISO8601}

## 확인 항목

| 기준 | 확인 방법 | 결과 |
|------|----------|------|
| 스피너 표시 | 로그인 버튼 클릭 | PASS |
| 에러 메시지 | 잘못된 비밀번호 입력 | PASS |

## 캡처 파일
- screenshot-before.png
- screenshot-after.png

## 콘솔 에러
없음 (또는 에러 목록)
```

## 증거 전달

수집한 브라우저 증거는 두 가지 방법으로 CC에 전달:

1. **증거 번들에 직접 추가**: `evidence/{date}-{task-id}/`에 파일 추가
2. **핸드오프로 전달**: `ui-feedback-request.md`에 파일 경로 포함

## 수정 요청 시

시각적 확인 후 수정이 필요한 경우:
1. `templates/ui-feedback-request.md` 작성
2. 스크린샷 + 명확한 텍스트 스펙 포함
3. Claude Code에 전달 → CC가 `/ui-spec-normalize` 실행

## 참조

- `docs/antigravity/visual-feedback-guide.md` — 시각적 피드백 루프
- `templates/ui-feedback-request.md` — 피드백 요청 템플릿
