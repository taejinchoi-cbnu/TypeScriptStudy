# TypeScript 프로젝트 초기 설정 가이드

## 1. 프로젝트 초기화

```bash
# 프로젝트 폴더 생성 및 이동
mkdir my-typescript-project
cd my-typescript-project

# npm 초기화
npm init -y
```

## 2. TypeScript 및 개발 도구 설치

```bash
# TypeScript 컴파일러 설치
npm install --save-dev typescript

# ts-node: TypeScript 파일을 직접 실행
# @types/node: Node.js 타입 정의
npm install --save-dev ts-node @types/node
```

## 3. TypeScript 설정 파일 생성 (tsconfig.json)

### Node.js 환경용 설정
```json
{
  "include": ["**/*.ts"],
  "compilerOptions": {
    "outDir": "build",
    "target": "ES6",
    "lib": ["ES6"],
    "strict": true,
    "esModuleInterop": true,
    "module": "CommonJS"
  }
}
```

### 브라우저 환경용 설정
```json
{
  "include": ["**/*.ts"],
  "compilerOptions": {
    "outDir": "build",
    "target": "ES6",
    "lib": ["ES6", "DOM"], // DOM 라이브러리 추가
    "strict": true,
    "esModuleInterop": true,
    "module": "CommonJS"
  }
}
```

### tsconfig.json 주요 옵션 설명
- `include`: TypeScript가 컴파일할 파일 지정
- `outDir`: 컴파일된 JavaScript 파일이 저장될 폴더
- `target`: 컴파일될 JavaScript 버전
- `lib`: 사용할 JavaScript API 및 실행 환경
- `strict`: 엄격한 타입 검사 활성화
- `esModuleInterop`: import/export 구문 호환성
- `module`: 모듈 시스템 설정

## 4. package.json 스크립트 설정

```json
{
  "scripts": {
    "build": "tsc",
    "start": "node build/index.js",
    "dev": "ts-node index.ts",
    "watch": "tsc --watch"
  }
}
```

### 스크립트 설명
- `npm run build`: TypeScript를 JavaScript로 컴파일
- `npm run start`: 컴파일된 JavaScript 실행
- `npm run dev`: TypeScript 파일 직접 실행 (개발용)
- `npm run watch`: 파일 변경 감지 및 자동 컴파일

## 5. 첫 번째 TypeScript 파일 작성

**index.ts**
```typescript
const hello = () => "hello!";
console.log(hello());
```

## 6. 실행 테스트

```bash
# 빌드 및 실행
npm run build
npm run start

# 또는 개발 모드로 직접 실행
npm run dev
```

## 7. 폴더 구조

```
my-typescript-project/
├── node_modules/
├── build/            # 컴파일된 JS 파일
│   └── index.js
├── index.ts          # TypeScript 소스 파일
├── tsconfig.json     # TypeScript 설정
├── package.json      # 프로젝트 설정
└── package-lock.json
```

## 8. WSL 환경 주의사항

WSL에서 작업할 경우, tsconfig.json의 경로 설정에 주의:
- ❌ 절대 경로 사용 금지: `"include": ["c:/Users/..."]`
- ✅ 상대 경로 사용: `"include": ["**/*.ts"]`

## 9. 선택적 추가 도구

필요에 따라 설치:

### ESLint (코드 품질 검사)
```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### Prettier (코드 포맷팅)
```bash
npm install --save-dev prettier
```

### Nodemon (파일 변경 감지 및 자동 재시작)
```bash
npm install --save-dev nodemon
```

**nodemon.json** 설정:
```json
{
  "watch": ["src"],
  "ext": "ts",
  "exec": "ts-node",
  "env": {
    "NODE_ENV": "development"
  }
}
```

## 10. 브라우저 환경에서 TypeScript 사용하기

### 10.1 실제 웹 애플리케이션 예제 - 가격 계산기

**index.ts** (VAT 19% 가격 계산기)
```typescript
function deriveFinalPrice(inputPrice: number) {
  const finalPrice = inputPrice + inputPrice * 0.19;
  const outputEl = document.getElementById('final-price')!;
  outputEl.textContent = 'Final Price: ' + finalPrice + ' €';
}

const formEl = document.querySelector('form');

formEl?.addEventListener('submit', function (event: SubmitEvent) {
  event.preventDefault();
  const fd = new FormData(event.target as HTMLFormElement);
  const inputPrice = fd.get('price');
  deriveFinalPrice(Number(inputPrice));
});
```

### 10.2 HTML 파일 생성

**index.html**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TypeScript Price Calculator</title>
</head>
<body>
    <h1>Price Calculator (19% VAT)</h1>
    
    <form>
        <p>
            <label>Price</label>
            <input type="text" name="price" />
        </p>
        <p>
            <button>Calculate Final Price</button>
        </p>
    </form>
    
    <p id="final-price">Price not calculated yet</p>
    
    <!-- 컴파일된 JS 파일 연결 -->
    <script src="build/index.js" defer></script>
</body>
</html>
```

### 10.3 빌드 및 테스트 과정

```bash
# 1. TypeScript를 JavaScript로 컴파일
npm run build

# 2. VS Code에서 Live Server 실행
# - VS Code Extensions에서 "Live Server" 설치
# - index.html 우클릭 → "Open with Live Server"
# - 또는 하단 상태바의 "Go Live" 클릭

# 3. 브라우저에서 자동으로 열림
# - 가격 입력 후 버튼 클릭
# - VAT 적용된 최종 가격 확인
```

## 11. 일반적인 타입 에러 해결 방법

### DOM 요소 타입 처리

```typescript
// 1. Non-null assertion operator (!)
// 요소가 확실히 존재할 때
const element = document.getElementById('my-id')!;

// 2. Optional chaining (?.)
// 요소가 없을 수도 있을 때
const formEl = document.querySelector('form');
formEl?.addEventListener('submit', handler);

// 3. Type assertion (as)
// 특정 타입으로 캐스팅
const target = event.target as HTMLFormElement;
```

### Event 타입 지정

```typescript
// 이벤트 타입 명시
element.addEventListener('click', (event: MouseEvent) => {
    // ...
});

form.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault();
    // ...
});
```

### FormData 처리

```typescript
const fd = new FormData(event.target as HTMLFormElement);
const value = fd.get('fieldName');
const numberValue = Number(value); // 숫자로 변환
```

## 12. 개발 워크플로우 정리

1. **초기 설정**
   - npm init → TypeScript 설치 → tsconfig.json 생성

2. **코드 작성**
   - .ts 파일에 TypeScript 코드 작성
   - 타입 안정성 확보 (!, ?, as 활용)

3. **빌드**
   - `npm run build` 실행
   - build/ 폴더에 .js 파일 생성 확인

4. **HTML 연결**
   - `<script src="build/index.js">` 추가

5. **테스트**
   - Live Server로 실시간 확인
   - 브라우저 개발자 도구에서 디버깅

6. **개발 중 자동 컴파일**
   - `npm run watch` 실행 (별도 터미널)
   - 파일 저장 시 자동 재컴파일

## 13. Git 설정

**.gitignore** 파일 생성:
```
node_modules/
build/
dist/
*.log
.env
.DS_Store
```

---

이 가이드를 따라하면 TypeScript 프로젝트를 빠르게 시작하고 브라우저 환경에서도 효과적으로 사용할 수 있습니다!