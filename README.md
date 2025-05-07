# Project : echo

사내용 admin 툴을 일렉트론으로 말아보는 프로젝트

## Project Structure (Feature-Sliced Design)

```
Root/
├── electron/                  # Electron 메인 프로세스 관련 코드
│   ├── main.ts                # 메인 프로세스 진입점
│   ├── preload.cts            # 프리로드 스크립트
│   ├── resourceManager.ts     # 리소스 관리
│   ├── features/              # 메인 프로세스 기능들
│   │   └── tray/              # 시스템 트레이 기능
│   ├── preload/               # 프리로드 스크립트 관련 코드
│   └── utils/                 # 유틸리티 함수
│       ├── ipc-utils.ts       # IPC 통신 관련 유틸리티
│       ├── dev-utils.ts       # 개발 환경 관련 유틸리티
│       └── path-utils.ts      # 경로 관련 유틸리티
├── src/                       # 렌더러 프로세스 (React) 코드 - FSD 구조 적용
│   └── app/                   # 애플리케이션 설정, 진입점
├── shared/                    # 공유 모듈
├── e2e/                       # E2E 테스트
├── build/                     # 빌드 출력 디렉토리
├── index.html                 # HTML 템플릿
├── electron-builder.json      # Electron 빌더 설정
├── vite.config.ts            # Vite 설정
├── tsconfig.json             # TypeScript 설정
└── playwright.config.ts      # Playwright 설정
```

### 주요 특징

#### 1. Electron 구조(FSD 구조, 간략화 버전)

- **electron/** 디렉토리: 메인 프로세스 코드를 분리하여 관리
  - **main.ts**: Electron 애플리케이션의 진입점
  - **preload.cts**: 프리로드 스크립트
  - **resourceManager.ts**: 시스템 리소스 관리
  - **features/**: 메인 프로세스의 기능들을 모듈화 (트레이 등)
  - **utils/**: 유틸리티 함수들

#### 2. React 애플리케이션 (FSD 구조)

- **app/**: 애플리케이션 설정 및 진입점
- **processes/**: 큰 비즈니스 프로세스 (대시보드, 설정 등)
- **pages/**: 라우팅 가능한 페이지 컴포넌트
- **widgets/**: 독립적인 비즈니스 기능 블록
- **features/**: 사용자 상호작용 기능
- **entities/**: 비즈니스 엔티티 모델 및 로직
- **shared/**: 재사용 가능한 인프라 코드

### 모듈 간 의존성 규칙

FSD의 핵심 원칙을 따라 모듈 간 의존성은 단방향:

```
app → processes → pages → widgets → features → entities → shared
```

각 레이어는 자신보다 하위 레이어에만 의존할 수 있습니다. 예를 들어, `features`는 `entities`와 `shared`에 의존할 수 있지만, `widgets`나 `pages`에는 의존할 수 없습니다.
