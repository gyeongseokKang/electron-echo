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
│       ├── main.tsx           # React 애플리케이션 진입점
│       ├── index.css          # 글로벌 스타일
│       ├── routeTree.gen.ts   # TanStack Router 자동 생성 파일
│       └── routes/            # TanStack Router 라우트 정의
│           ├── __root.tsx     # 루트 레이아웃
│           ├── index.tsx      # 홈 페이지 라우트
│           └── about.tsx      # About 페이지 라우트
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

### TanStack Router

프로젝트는 [TanStack Router](https://tanstack.com/router/latest)를 사용하여 클라이언트 측 라우팅을 구현합니다. 이는 최신 React 애플리케이션을 위한 강력하고 타입 안전한 라우팅 솔루션을 제공합니다.

#### 주요 구성 요소

1. **라우트 디렉토리**: `src/app/routes`
   - 파일 기반 라우팅 시스템 사용
   - 각 파일이 해당 경로의 라우트 정의 (예: `about.tsx` -> `/about`)

2. **루트 레이아웃**: `src/app/routes/__root.tsx`
   - 모든 라우트의 공통 레이아웃 정의
   - 네비게이션 메뉴 및 공통 UI 요소 포함

3. **라우트 트리**: `src/app/routeTree.gen.ts`
   - TanStack Router 플러그인에 의해 자동 생성
   - 라우트 파일을 기반으로 전체 라우트 트리 구성

4. **라우터 인스턴스**: `src/app/main.tsx`
   - 라우트 트리를 사용하여 라우터 인스턴스 생성
   - 타입 안전성을 위한 등록

#### FSD와의 통합

일반적으로 TanStack Router는 `src/router` 에 구현됨.
하지만 FSD와의 관계를 위해 `src/app/router` 내부 구현
