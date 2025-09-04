[Understanding TypeScript](https://learning.oreilly.com/course/understanding-typescript/9781789951905/) O'Reilly 강의를 학습하면서 실습 코드와 내용을 정리

## 설정 (Setup)

### 필수 요구사항

- Node.js (v14 이상)
- npm 또는 yarn

### 설치

```bash
# 의존성 패키지 설치
npm install

# TypeScript 전역 설치 (선택사항)
npm install -g typescript
```

### TypeScript 초기화

```bash
# TypeScript 설정 파일 생성
tsc --init
```

### tsconfig.json 설정

프로젝트는 `tsconfig.json`으로 구성되어 있으며, 컴파일된 JavaScript 파일은 `build` 디렉토리에 생성됩니다.

**주요 설정 내용:**

```json
{
  "include": ["**/*.ts"], // 📌 사용자 설정: TypeScript 파일 경로 지정
  "compilerOptions": {
    "outDir": "build", // 📌 사용자 설정: 컴파일된 JS 파일이 저장될 디렉토리
    "target": "ES6", // JavaScript 버전 지정 (ES5, ES6, ES2020 등)
    "lib": ["ES6", "DOM"], // 사용할 API 및 실행 환경 지정
    "strict": true, // 엄격한 타입 검사 활성화 (권장)
    "esModuleInterop": true, // ES6 모듈 import 문법 사용 가능
    "module": "CommonJS" // 모듈 시스템 지정
  }
}
```

**설정 옵션 설명:**

- `include`: TypeScript 컴파일 대상 파일 패턴 (필요시 경로 수정)
- `outDir`: 컴파일된 JS 파일 출력 경로 (프로젝트 구조에 맞게 변경)
- `target`: 컴파일될 JavaScript 버전
- `lib`: TypeScript가 인식할 내장 API (DOM API 사용시 "DOM" 추가 필수)
- `strict`: 타입 안정성을 위한 핵심 옵션
- `esModuleInterop`: `import xx from "xxx"` 형태의 import 구문 사용 가능
- `module`: 사용할 모듈 시스템 (CommonJS, ES6 등)

### TypeScript 컴파일러 (tsc) 명령어

```bash
# 단일 TypeScript 파일을 JavaScript로 컴파일
tsc index.ts

# 특정 디렉토리의 모든 TypeScript 파일 컴파일
tsc

# 파일 변경 감지 모드 (자동 재컴파일)
tsc --watch
tsc -w

# 설정 파일 지정
tsc --project tsconfig.json

# 컴파일 없이 타입 체크만 수행
tsc --noEmit

# 소스맵 생성
tsc --sourceMap
```

## package.json 스크립트 설정

`package.json`에 다음 스크립트들을 추가하여 사용할 수 있습니다:

```json
{
  "scripts": {
    "build": "tsc",
    "watch": "tsc --watch",
    "dev": "ts-node index.ts",
    "start": "node build/index.js",
    "typecheck": "tsc --noEmit"
  }
}
```

## 사용 가능한 스크립트

```bash
# TypeScript 파일을 JavaScript로 컴파일
npm run build

# 파일 변경 감지 및 자동 컴파일
npm run watch

# ts-node로 TypeScript 파일 직접 실행
npm run dev

# 컴파일된 JavaScript 파일 실행
npm start
```

## 참고 자료

- **강의 관련 GitHub 저장소**

  - [Maximilian Schwarzmüller - Understanding TypeScript Resources](https://github.com/mschwarzmueller/understanding-typescript-resources/tree/main) - 강의 강사의 공식 리소스 저장소
  - [Packt Publishing - Understanding TypeScript 2025 Edition](https://github.com/PacktPublishing/Understanding-TypeScript-2025-Edition/tree/master) - Packt 출판사의 2025년 에디션 코드

- **공식 문서**

  - [Microsoft Visual Studio - JavaScript/TypeScript 문서 (한국어)](https://learn.microsoft.com/ko-kr/visualstudio/javascript/?view=vs-2022) - Visual Studio에서 TypeScript/JavaScript 개발 가이드

- **한국어 자료**
  - [인파 typescript 정리](https://inpa.tistory.com/category/Language/TypeScript)
