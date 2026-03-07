# Evidence Gathering [PROPOSED — Model Decision]

> **[PROPOSED]**: 활성화 모드: Model Decision (시각적 검증이 필요한 상황에서 적용)

## Antigravity의 증거 수집 역할

Claude Code가 구현을 완료하면, Antigravity는 다음 시각적 증거를 수집합니다:

### 브라우저 에이전트 증거

Antigravity의 브라우저 서브에이전트를 활용하여 캡처:

1. **현재 상태 스크린샷**: 변경 전 화면
2. **변경 후 스크린샷**: 구현 결과 화면
3. **인터랙션 시나리오 녹화**: 사용자 흐름 테스트
4. **콘솔 에러 확인**: 브라우저 개발자 도구 Console 탭

### 증거 저장 규칙

브라우저 증거는 Claude Code의 증거 번들에 연결됩니다:

```
evidence/{YYYYMMDD}-{task-id}/
├── screenshot-before.png    # AG 캡처
├── screenshot-after.png     # AG 캡처
└── browser-verify.md        # AG 작성 확인 메모
```

캡처 파일은 Claude Code에게 전달하거나, `ui-feedback-request.md` 핸드오프로 전송합니다.

### 시각적 확인 절차

CC→AG 완료 보고 수신 후:

1. `evidence-path`의 번들 내용 확인
2. 브라우저에서 변경사항 직접 확인
3. 수락 기준의 시각적 항목 검증
4. 문제 발견 시 → `ui-feedback-request.md`로 수정 요청
5. 이상 없으면 → 완료 승인

## 참조

`docs/antigravity/browser-evidence-guide.md` — 브라우저 증거 활용 상세 가이드
