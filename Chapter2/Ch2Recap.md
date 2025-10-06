# Chapter 2: TypeScript Basics & Basic Types

https://learning.oreilly.com/course/understanding-typescript/9781789951905/

위 강의 정하는 문서

## Working with Types & Exploring Built-in Types

TypeScript의 기본 타입들을 살펴보겠습니다.

### 기본 타입 (Primitive Types)

string, number, boolean 이렇게 일단 3개의 타입 지정 가능이고 소문자로 써야함. (나중에 다른 타입도 학습 예정)

사용 방식은:

```ts
let userName: string;
userName = 'Taejin';

let isTrue: boolean;
isTrue = true;

let degits: number;
degits = 10;

// 변수 선언 + 타입 선언 + 변수 할당 동시에도 가능
let youCanDothis: string = 'I can do this!!';
```

이런식으로 변수 명 뒤에 `: typeName;` 으로 붙여주면 된다.

> **주의**: TypeScript의 타입은 모두 **소문자**로 작성. (string ⭕, String ❌)

---

## Vanilla JavaScript Has Types, Too!

JavaScript도 실제로는 타입을 가지고 있고, 이는 `typeof` 연산자로 확인 가능하다.

```js
// JavaScript에서도 타입 체크가 가능
console.log(typeof 'Hello'); // "string"
console.log(typeof 42); // "number"
console.log(typeof true); // "boolean"
```

(TypeScript는 이러한 JavaScript의 동적 타입을 정적 타입으로 미리 체크할 수 있게 해준다.)

---

## Type Inference vs Type Assignment

### 타입 추론 (Type Inference)

변수 선언과 동시에 할당하면 자동으로 타입 감지해서 안해도 되긴함 (unnecessary)

```ts
let hello = 'hello'; // TypeScript가 자동으로 string 타입으로 추론
hello = 123; // ❌ error 표시됨 - Type 'number' is not assignable to type 'string'
```

### 명시적 타입 지정 (Type Assignment)

```ts
let userName: string; // 명시적으로 타입 지정
userName = 'Taejin'; // ✅ 정상
userName = 123; // ❌ error
```

> **Best Practice**: 초기값이 명확한 경우 타입 추론(자동생성)을 활용하고, 나중에 값을 할당하는 경우 명시적으로 타입을 지정한다.

---

## Assigning Types to Function Parameters

함수 파라미터에도 타입 사용이 가능하다.

### 기본 함수 (타입 없음)

```ts
function add(a, b) {
  return a + b;
}
```

### 타입이 지정된 함수

여기에서 파라미터인 a와 b에 type을 선언할 수 있고 또는 파라미터 초기화를 통해 위에서 설명한 것처럼 타입 설정도 가능하다.

```ts
function add(a: number, b = 3) {
  // b는 기본값 3으로 number 타입 추론
  return a + b;
}
```

그리고 이와 같은 add함수에 아래의 파라미터를 넣고 호출하려고 하면 error 표시가 나온다.

```ts
add('1', 2); // ❌ error - Argument of type 'string' is not assignable to parameter of type 'number'
add(1, '2'); // ❌ error - b가 number 3으로 초기화 되어있어서 자동으로 type 감지!
```

### 함수 반환 타입

```ts
function add(a: number, b: number): number {
  // 반환 타입도 명시 가능
  return a + b;
}
```

---

## The "any" Type

하지만 이런 하나의 타입 보다 여러개의 유연한 타입이 필요한 변수, 파라미터 등이 있을 수 있다.
(나중에 다룰 union type으로 여러 type을 묶어도 되지만 일단은 유연한 타입이 필요하다고 가정)
그럴 때 사용하는 것이 `any`이다.

```ts
let user: any = 'taejin';

user = 25;
user = true;
user = {};
user = [];
```

이렇게 어떤 타입이든 가능해진다.

### any 타입의 문제점

하지만 이렇게 any를 사용하면 any 타입이 바인딩된 변수가 그 이후에 로직에서 사용될 때, 컴파일러는 **어떤 타입 검사**도 요구하지 않고 컴파일링한다.

그러면 결과를 예상하기 어려운 코드가 되고 이는 버그 가능성을 높인다.

> **경고**: `any` 타입은 TypeScript의 타입 체킹을 완전히 무력화시키기 때문에 가능한 한 사용을 피하는게 좋다.

### 대안: unknown 타입

`unknown`은 `any`보다 안전한 대안으로 사용하기 전에 타입 체크가 필요하다.
(Ch2 마지막 쯤에 다룸)

```ts
let userInput: unknown;
userInput = 5;
userInput = 'Max';

let userName: string;
// userName = userInput;  // ❌ Error: Type 'unknown' is not assignable to type 'string'

// 타입 체크 후 사용
if (typeof userInput === 'string') {
  userName = userInput; // ✅ OK
}
```

- 참고 자료: [TypeScript 타입 - any, unknown, never](https://one-armed-boy.tistory.com/entry/TypeScript-%ED%83%80%EC%9E%85-any-unknown-never)

---

## Understanding Union Types

그러므로 any보다는 2개 이상의 type이 필요한 경우 union type을 사용하면 된다.

```ts
let user: number | string | boolean = 'taejin';

user = 25; // ✅ 정상
user = true; // ✅ 정상
user = {}; // ❌ error!
user = []; // ❌ error!
```

유니온 타입은 user라는 변수가 number 또는 string 또는 boolean 타입을 가진다는 뜻이다.

### 함수에서 Union Type 사용

```ts
function combine(input1: number | string, input2: number | string) {
  // 타입 가드를 사용한 처리
  if (typeof input1 === 'number' && typeof input2 === 'number') {
    return input1 + input2;
  } else {
    return input1.toString() + input2.toString();
  }
}

combine(30, 26); // 56
combine('Hello', 'World'); // 'HelloWorld'
```

---

## Arrays & Types

배열에도 타입 선언이 가능한다. 배열 생성과 동시에 초기화를 진행하면 변수와 마찬가지로 ts가 자동으로 타입을 감지하고 이를 적용해준다.

### 타입 추론을 통한 배열 타입

```ts
let fruits = ['apple', 'banana', 'grape']; // 이 배열의 type은 string[]로 추론!

fruits.push(true); // ❌ error
fruits.push('pineapple'); // ✅ good!
fruits.push(23); // ❌ error
```

### 혼합 타입 배열

그리고 배열 요소가 다양하다면 union type이 된다.

```ts
let fruits = ['apple', 'banana', 'grape', 10]; // type은 (string | number)[]로 추론

fruits.push(true); // ❌ error
fruits.push('pineapple'); // ✅ good!
fruits.push(23); // ✅ good!
```

---

## Advanced Array Types

또 advanced한 array type이 있는데 바로 변수에 type 선언 시 `:string[]` 이렇게 진행하는 것이다.

### 명시적 배열 타입 선언

```ts
let user: string[]; // 문자열 배열 타입

let user2: (string | number)[]; // union type이 필요하면 ()로 묶어버리면 된다.

// 그러면 이제
user = ['Tom', 'Jerry', 'Max']; // ✅ OK

user2 = ['Tom', 25]; // ✅ OK
user2 = [25, 24]; // ✅ OK
user2 = [true]; // ❌ Error
```

### 읽기 전용 배열

```ts
let numbers: readonly number[] = [1, 2, 3];
// numbers.push(4);  // ❌ Error: Property 'push' does not exist on type 'readonly number[]'
```

### 튜플 (Tuple)

고정된 길이와 타입을 가진 배열 (아래에서 자세히 다룸)

```ts
let person: [string, number] = ['Max', 30]; // 첫 번째는 string, 두 번째는 number
// person = [30, 'Max'];  // ❌ Error: 타입 순서가 맞지 않음
```

---

## A First Glimpse at Generic Types - Alternative Array Type Declaration

### 제네릭을 사용한 배열 선언

배열 타입을 선언하는 또 다른 방법으로 제네릭 타입을 사용할 수 있습니다.

```ts
// 기본 배열 선언 방식
let numbers1: number[] = [1, 2, 3];

// 제네릭을 사용한 배열 선언 (동일한 의미)
let numbers2: Array<number> = [1, 2, 3];

// Union 타입과 함께 사용
let mixed1: (string | number)[] = ['hello', 42];
let mixed2: Array<string | number> = ['hello', 42]; // 동일한 의미
```

제네릭 타입은 나중에 더 자세히 다룰 예정. 지금은 `Array<T>` 형식도 배열 타입을 선언하는 방법 중 하나라는 점만 학습하면 된다.

**참고 블로그**

- https://batcave.tistory.com/40
- https://inpa.tistory.com/entry/TS-%F0%9F%93%98-%EC%8B%A4%EC%A0%84-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EC%A0%9C%EB%84%A4%EB%A6%AD-%ED%83%80%EC%9E%85-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EA%B8%B0

## Making Sense of Tuples

### Tuple이란?

Tuple은 **고정된 길이**와 **각 위치별 타입이 정해진** 배열이다.
일반 배열과 달리 요소의 개수와 각 위치의 타입을 엄격하게 제한한다.

### 일반 배열 vs Tuple 비교

```ts
// 일반 배열 - 길이 제한 없음, 모든 요소가 같은 타입
let numbers: number[] = [1, 2, 3, 4, 5]; // ✅ 얼마든지 추가 가능

// Tuple - 길이와 각 위치별 타입 고정
let coordinate: [number, number] = [10, 20]; // ✅ 정확히 2개의 number
let userInfo: [string, number] = ['Max', 30]; // ✅ string, number 순서
```

### Tuple의 특징과 주의사항

```ts
let role: [number, string] = [2, 'author'];

// ✅ 정상: 인덱스로 접근
console.log(role[0]); // 2
console.log(role[1]); // 'author'

// ❌ 에러: 잘못된 타입
role = ['author', 2]; // Error: Type 'string' is not assignable to type 'number'

// ❌ 에러: 길이 초과
role = [1, 'admin', 'extra']; // Error: Source has 3 element(s) but target allows only 2

// ⚠️ 주의: push()는 허용됨 (TypeScript의 한계)
role.push('admin'); // 런타임에는 작동하지만 Tuple의 의도와 맞지 않음
```

### 실제 사용 사례

```ts
// HTTP 상태 코드와 메시지
type ApiResponse = [number, string];
let response: ApiResponse = [200, 'OK']; // ✅

// 좌표 (x, y)
type Point = [number, number];
let position: Point = [15, 25]; // ✅

// RGB 색상값
type Color = [number, number, number];
let red: Color = [255, 0, 0]; // ✅
```

> **Best Practice**: Tuple은 서로 관련된 데이터를 묶을 때 사용하고, 요소가 3개를 넘어가면 객체 사용을 고려해보세요.

## Object Types

### 객체 타입 정의의 기본

TypeScript에서는 객체의 구조(프로퍼티와 그 타입)를 정의할 수 있다. 이를 통해 객체의 형태를 엄격하게 제한하고 타입 안전성을 보장해준다.

### 타입 추론 vs 명시적 타입 선언

```ts
// 타입 추론: TypeScript가 자동으로 타입을 추론
let user = {
  name: 'Max', // string으로 추론
  age: 25, // number로 추론
}; // ✅ 타입이 자동으로 { name: string; age: number; }가 됨

// 명시적 타입 선언: 개발자가 직접 타입을 지정
let user2: {
  name: string;
  age: number;
} = {
  name: 'Max',
  age: 25,
}; // ✅ 동일한 결과, 하지만 타입을 명확히 정의
```

### Union Types와 배열을 포함한 객체

```ts
let user: {
  name: string;
  age: number | string; // Union type 사용 가능
  hobbies: string[]; // 배열 타입
  favoriteNumbers: [number, number]; // Tuple 타입도 가능
} = {
  name: 'Max',
  age: 25, // ✅ number 또는 string 가능
  hobbies: ['Sports', 'Cooking'], // ✅ string 배열
  favoriteNumbers: [7, 13], // ✅ 정확히 2개의 number
};

// 나중에 값 변경 가능
user.age = '30'; // ✅ string으로 변경 가능
user.hobbies.push('Reading'); // ✅ 배열에 요소 추가
```

### 중첩 객체 (Nested Objects)

```ts
let user: {
  name: string;
  age: number;
  role: {
    // 객체 안에 객체
    description: string;
    id: number;
    permissions: string[];
  };
} = {
  name: 'Max',
  age: 25,
  role: {
    // 모든 중첩 프로퍼티를 정의해야 함
    description: 'admin',
    id: 5,
    permissions: ['read', 'write', 'delete'],
  },
};

// 중첩 객체 접근
console.log(user.role.description); // ✅ 'admin'
console.log(user.role.permissions[0]); // ✅ 'read'
```

### Optional Properties (선택적 프로퍼티)

```ts
let user: {
  name: string;
  age: number;
  email?: string; // ? 표시로 선택적 프로퍼티 정의
  phone?: string;
} = {
  name: 'Max',
  age: 25,
  // email과 phone은 없어도 됨
}; // ✅ 정상

// 나중에 추가 가능
user.email = 'max@example.com'; // ✅ 추가 가능
```

### 주요 특징과 주의사항

```ts
let person: {
  name: string;
  age: number;
};

// ❌ 에러: 정의되지 않은 프로퍼티 접근
// console.log(person.height); // Error: Property 'height' does not exist

// ❌ 에러: 타입 불일치
// person = { name: 'John', age: '30' }; // Error: Type 'string' is not assignable to type 'number'

// ❌ 에러: 필수 프로퍼티 누락
// person = { name: 'John' }; // Error: Property 'age' is missing

// ✅ 정상: 모든 필수 프로퍼티 포함
person = { name: 'John', age: 30 };
```

### 실제 사용 예시

```ts
// API 응답 데이터 타입 정의
let apiResponse: {
  status: number;
  message: string;
  data: {
    users: string[];
    totalCount: number;
  };
} = {
  status: 200,
  message: 'Success',
  data: {
    users: ['Alice', 'Bob', 'Charlie'],
    totalCount: 3,
  },
};
```

> **Best Practice**:
>
> - 복잡한 객체 타입은 `type` 별칭이나 `interface`를 사용해 재사용성을 높이자
> - Optional properties (`?`)를 적절히 활용해 유연성을 제공하자
> - 중첩이 깊어지면 별도의 타입으로 분리하는 것을 고려하자

## Tricky: The "Must Not Be Null" Type

### 개념 설명

`{}` 타입은 null과 undefined를 제외한 모든 값을 허용하는 특수한 타입

### 코드 예제

```typescript
// {} 타입 사용 예시
let val: {} = true; // ✅ boolean 허용
val = 42; // ✅ number 허용
val = 'hello'; // ✅ string 허용
val = { name: 'Max' }; // ✅ object 허용
val = []; // ✅ array 허용
val = null; // ❌ Type 'null' is not assignable to type '{}'
val = undefined; // ❌ Type 'undefined' is not assignable to type '{}'
```

### any 타입과의 차이점

```typescript
let anyVal: any = null; // ✅ any는 null 허용
let objVal: {} = null; // ❌ {}는 null 불허
```

> **주의**: `{}` 타입은 예상치 못한 동작을 할 수 있으므로 명시적인 타입을 사용하는 것이 권장된다.

## Flexible Objects with the Record Type

### 개념 설명

`Record<K, V>` 타입은 유연한 key-value 페어 객체를 정의할 때 사용하는 제네릭 유틸리티 타입이다.
(동적으로 속성이 추가될 수 있는 객체에 적합하다.)

### 기본 사용법

```typescript
// JavaScript에서 객체 키의 다양성
const obj = {
  name: 'Max', // string key
  1: 'number key value', // number key (자동으로 string으로 변환)
};

// TypeScript에서 Record로 타입 정의
let data: Record<string, number | string>; // <key 타입, value 타입>

data = {
  entry1: 1, // ✅ value는 number
  entry2: 'string', // ✅ value는 string
  entry3: true, // ❌ Type 'boolean' is not assignable to type 'string | number'
};
```

### 실용적인 예제

```typescript
// API 응답 데이터 타입 정의
type ApiResponse = Record<string, unknown>;

// 사용자별 점수 관리
const userScores: Record<string, number> = {
  alice: 95,
  bob: 87,
  charlie: 92,
};

// 다국어 번역 데이터
const translations: Record<string, Record<string, string>> = {
  en: { hello: 'Hello', goodbye: 'Goodbye' },
  ko: { hello: '안녕하세요', goodbye: '안녕히 가세요' },
};
```

> **Best Practice**: Record는 키가 동적일 때 유용하지만, 고정된 키를 가진 객체는 interface나 type을 사용하는 것이 더 안전하다.

## Working with Enums

### 개념 설명

Enum은 명명된 상수들의 집합을 정의하는 방법입니다.
기본적으로 0부터 시작하는 숫자 값이 자동 할당되며, 원하는 값으로 재정의할 수 있다.
(마치 id 자동 생성? 하는 것과 비슷하다고 생각하면됨)

### 기본 사용법

```typescript
enum Role {
  Admin, // 0 (자동 할당)
  Editor, // 1 (자동 증가)
  Guest, // 2 (자동 증가)
  Manager = 10, // 10 (수동 할당)
  Developer, // 11 (10 다음부터 자동 증가)
}

let userRole = Role.Admin; // userRole = 0
userRole = Role.Editor; // userRole = 1
userRole = 1; // ✅ 숫자 직접 할당도 가능
```

### Enum의 JavaScript 컴파일 결과

```javascript
// TypeScript enum이 JavaScript로 컴파일되면:
var Role;
(function (Role) {
  Role[(Role['Admin'] = 0)] = 'Admin'; // 양방향 매핑 생성
  Role[(Role['Editor'] = 1)] = 'Editor'; // Role.Admin = 0, Role[0] = "Admin"
  Role[(Role['Guest'] = 2)] = 'Guest';
  Role[(Role['Manager'] = 10)] = 'Manager';
  Role[(Role['Developer'] = 11)] = 'Developer';
})(Role || (Role = {}));
```

### String Enum vs Number Enum

```typescript
// Number Enum (기본)
enum Status {
  Active = 1,
  Inactive = 0,
}

// String Enum (더 명확한 의미 전달)
enum UserStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Pending = 'PENDING',
}

const status: UserStatus = UserStatus.Active; // "ACTIVE"
```

> **Best Practice**: String enum이 디버깅 시 더 명확하고, 런타임에서 의미를 파악하기 쉽습니다. 하지만 최근에는 enum보다 literal type union을 더 선호하는 추세.

## Being Specific with Literal Types

### 개념 설명

Literal Types는 특정 값 자체를 타입으로 사용하는 방식으로 string, number, boolean의 특정 값만을 허용하여 더 엄격한 타입 체크를 제공한다.

### String Literal Types

```typescript
// Enum 대신 literal type union 사용 (현재 더 선호되는 방식)
let userRole: 'admin' | 'editor' | 'guest' = 'admin'; // ✅
userRole = 'editor'; // ✅ 허용된 값
userRole = 'viewer'; // ❌ Type '"viewer"' is not assignable to type '"admin" | "editor" | "guest"'

// Enum과 비교
enum Role {
  Admin, // 0
  Editor, // 1
  Guest, // 2
}
// Literal type이 더 간결하고 JavaScript로 컴파일 시 추가 코드가 생성되지 않음
```

### Number Literal Types

```typescript
// 일반 튜플
let tuple: [number, number];
tuple = [1, -1]; // ✅ 모든 숫자 허용
tuple = [100, -200]; // ✅ 모든 숫자 허용

// Literal type을 사용한 튜플
let direction: [1 | -1, 1 | -1]; // 방향을 나타내는 튜플
direction = [1, -1]; // ✅ 오른쪽 위
direction = [-1, 1]; // ✅ 왼쪽 아래
direction = [2, -1]; // ❌ Type '2' is not assignable to type '1 | -1'
```

### 실용적인 사용 사례

```typescript
// API 응답 상태 정의
type ApiStatus = 'loading' | 'success' | 'error';

// 설정 옵션 정의
interface Config {
  mode: 'development' | 'production' | 'test';
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}

// 함수 매개변수 제한
function setAlignment(align: 'left' | 'center' | 'right') {
  // align은 세 가지 값만 가능
}
```

> **Best Practice**: Literal types는 코드의 의도를 명확히 하고 타입 안정성을 높인다. 특히 union type과 결합하면 enum의 대체제로 효과적

## Type Aliases & Custom Types

### 개념 설명

Type Alias는 기존 타입이나 복잡한 타입 조합에 이름을 부여하여 재사용성과 가독성을 높이는 기능

### 기본 사용법

```typescript
// Literal type union을 type alias로 정의
type Role = 'admin' | 'editor' | 'guest';

// 타입 별칭 사용
let userRole: Role = 'admin'; // ✅ 깔끔하고 재사용 가능
userRole = 'editor'; // ✅
userRole = 'developer'; // ❌ Type '"developer"' is not assignable to type 'Role'
```

### 복잡한 타입 조합

```typescript
// 기본 타입 별칭
type ID = string | number;
type Status = 'active' | 'inactive' | 'pending';

// 객체 타입 별칭 - 재사용 가능한 구조
type User = {
  id: ID; // 다른 type alias 활용
  name: string;
  age: number;
  role: Role; // 위에서 정의한 Role 타입 사용
  permissions: string[];
  status: Status;
};

// User 타입 사용
const newUser: User = {
  id: 'user123',
  name: 'Alice',
  age: 30,
  role: 'admin',
  permissions: ['read', 'write', 'delete'],
  status: 'active',
};
```

### Type vs Interface

```typescript
// Type Alias - 유니온, 인터섹션, 프리미티브 등 모든 타입 가능
type StringOrNumber = string | number;
type Point = { x: number; y: number };

// Interface - 주로 객체 타입 정의, 확장 가능
interface IPoint {
  x: number;
  y: number;
}

// Interface 확장
interface IPoint3D extends IPoint {
  z: number;
}
```

> **Best Practice**:
>
> - 객체 타입은 interface 사용을 권장 (확장성)
> - 유니온, 튜플, 프리미티브 조합은 type alias 사용
> - 일관성 있게 하나의 방식을 선택하여 사용

## Function Return Value Types

### 개념 설명

함수의 반환 타입을 명시적으로 지정하여 타입 안정성을 보장한다.

### 기본 사용법

```typescript
// 반환 타입 명시 - : string
function add(a: number, b: number): string {
  return (a + b).toString(); // ✅ 숫자를 문자열로 변환하여 반환
}

function multiply(a: number, b: number): number {
  return a * b; // ✅ number 반환
  // return (a * b).toString();  // ❌ Type 'string' is not assignable to type 'number'
}

// 타입 추론 - 반환 타입을 명시하지 않아도 TypeScript가 추론
function subtract(a: number, b: number) {
  return a - b; // 반환 타입이 자동으로 number로 추론됨
}
```

## The "void" Type

### 개념 설명

`void`는 함수가 값을 반환하지 않음을 명시하는 타입으로 주로 부수 효과(side effect)만 있는 함수에 사용된다.

### 사용 예제

```typescript
// void 타입 - 반환값 없음
function log(message: string): void {
  console.log(message);
  // return undefined;  // ✅ undefined는 반환 가능
  // return null;       // ❌ Type 'null' is not assignable to type 'void'
}

// 타입 추론 - return문이 없으면 자동으로 void
function displayAlert(text: string) {
  // 반환 타입: void (추론)
  alert(text);
}

// 콜백 함수에서의 void
const onClick: () => void = () => {
  console.log('Button clicked');
};
```

## The "never" Type

### 개념 설명

`never`는 함수가 절대 정상적으로 종료되지 않음을 나타낸다.
예외를 던지거나 무한 루프에 빠지는 경우 사용

### 사용 예제

```typescript
// never 타입 - 예외를 던지는 함수
function throwError(errorMsg: string): never {
  console.log(errorMsg);
  throw new Error(errorMsg); // 함수가 여기서 종료 (예외 발생)
  // 이 아래 코드는 절대 실행되지 않음
}

// never 타입 - 무한 루프
function infiniteLoop(): never {
  while (true) {
    console.log('Running forever...');
  }
  // 이 코드는 도달 불가능
}
```

### void vs never 비교

| 특성           | void                       | never                |
| -------------- | -------------------------- | -------------------- |
| 의미           | 반환값 없음                | 절대 반환하지 않음   |
| 정상 종료      | ✅ 가능                    | ❌ 불가능            |
| undefined 반환 | ✅ 가능                    | ❌ 불가능            |
| 사용 사례      | console.log, 이벤트 핸들러 | 에러 처리, 무한 루프 |

```typescript
// 실제 사용 예시
function handleUserAction(action: string): void | never {
  switch (action) {
    case 'logout':
      console.log('Logging out...'); // void
      break;
    case 'invalid':
      throw new Error('Invalid action'); // never
    default:
      console.log('Unknown action'); // void
  }
}
```

> **Best Practice**:
>
> - 대부분의 경우 반환 타입은 TypeScript가 추론하도록 두는 것이 좋습니다
> - 공개 API나 라이브러리 함수는 명시적 반환 타입을 사용하여 의도를 명확히 하세요
> - never는 exhaustive check 패턴에서 유용합니다

## Functions as Types

JavaScript에서 함수는 값(value)으로 취급된다.
변수에 저장하거나 다른 함수에 인자로 전달할 수 있다.

### 1. Function 타입 (비추천)

```typescript
// ❌ 너무 광범위하고 타입 안정성이 낮음
function performJob(cb: Function) {
  cb(); // 매개변수, 반환값 타입을 알 수 없음
}
```

TypeScript는 내장 `Function` 타입을 제공하지만, 구체적이지 않아 실제로는 잘 사용하지 않는다.

### 2. 함수 시그니처 타입

```typescript
// ✅ 명확한 타입 정의
function performJob(cb: (msg: string) => void) {
  // 콜백 함수는 string 매개변수 1개를 받고 void를 반환
  cb('Job done!');
}

// 사용 예시
function logMessage(message: string) {
  console.log(message);
}

const log = (message: string) => {
  console.log(message);
};

performJob(logMessage); // OK
performJob(log); // OK
```

**중요 포인트:**

- `(msg: string) => void`는 함수 타입을 정의하는 구문
- 화살표 함수처럼 보이지만 **타입 정의**임 (실제 함수가 아님)
- 왼쪽: 매개변수와 타입
- 오른쪽: 반환 타입
- 매개변수 이름(msg)은 설명적이어야 하지만, 실제 함수의 매개변수 이름과 일치할 필요 없음

### 3. 여러 매개변수를 가진 함수 타입

```typescript
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (x, y) => x + y;
const multiply: MathOperation = (first, second) => first * second;

// 매개변수 이름(a, b vs x, y vs first, second)은 다를 수 있음
// 중요한 것은 타입과 개수!
```

### 4. 객체 내의 메서드 타입

```typescript
type User = {
  name: string;
  age: number;
  greet: () => string; // 메서드 타입 정의
};

// 구현 방법 1: 화살표 함수
const user1: User = {
  name: 'Taejin',
  age: 25,
  greet: () => {
    console.log('Hello there');
    return 'Taejin'; // this 사용 불가
  },
};

// 구현 방법 2: 메서드 구문 (권장)
const user2: User = {
  name: 'Taejin',
  age: 25,
  greet() {
    console.log('Hello there');
    return this.name; // this 사용 가능
  },
};

user2.greet(); // 메서드 호출
```

### 5. Type Alias로 함수 타입 재사용

```typescript
// 콜백 타입 정의
type Callback = (message: string) => void;
type AsyncCallback = (error: Error | null, data?: any) => void;

// HTTP 핸들러
type RequestHandler = (req: Request, res: Response) => void;

// 이벤트 핸들러
type ClickHandler = (event: MouseEvent) => void;

function addEventListener(event: string, handler: ClickHandler) {
  // ...
}
```

### 6. 실제 사용 예제

```typescript
// 배열 메서드와 함께 사용
const numbers = [1, 2, 3, 4, 5];

// map의 콜백 타입: (value: number, index: number, array: number[]) => any
const doubled = numbers.map((n) => n * 2);

// filter의 콜백 타입: (value: number, index: number, array: number[]) => boolean
const evens = numbers.filter((n) => n % 2 === 0);

// 커스텀 고차 함수
function createMultiplier(factor: number): (n: number) => number {
  return (n) => n * factor;
}

const double = createMultiplier(2);
console.log(double(5)); // 10
```

> **Best Practice**:
>
> - `Function` 타입은 사용하지 않기
> - 함수 시그니처로 명확한 타입을 정의
> - 복잡한 함수 타입은 Type Alias로 분리
> - 객체 메서드는 `this`를 사용해야 한다면 메서드 구문을 사용

## null & undefined - Special Types

### 개념 설명

`null`과 `undefined`는 TypeScript의 특별한 타입으로, 값이 없음을 나타낸다.

### null 타입

```typescript
// null 타입만 사용하는 경우 (거의 사용하지 않음)
let a: null;
a = null; // ✅ 가능
// a = 'hello'; // ❌ Type '"hello"' is not assignable to type 'null'
```

### undefined 타입

```typescript
// undefined 타입만 사용하는 경우 (거의 사용하지 않음)
let b: undefined;
b = undefined; // ✅ 가능
// b = 'hello'; // ❌ Type '"hello"' is not assignable to type 'undefined'
```

### Union Type과 함께 사용

null과 undefined는 주로 Union Type과 함께 사용됩니다:

```typescript
// null과의 union type - 값이 있거나 없을 수 있는 경우
let username: string | null = null;

// 초기값 설정
username = 'John'; // ✅ 문자열 할당

// 작업 후 재초기화
username = null; // ✅ null로 재설정 가능

// undefined와의 union type
let age: number | undefined;
console.log(age); // undefined (초기화하지 않은 변수)
age = 25; // ✅ 값 할당
age = undefined; // ✅ 명시적으로 undefined 설정
```

### null vs undefined 차이점

```typescript
// 함수 반환값에서의 차이
function findUser(id: string): User | null {
  // 검색했지만 찾지 못한 경우 - null 반환
  return null; // "검색했지만 없음"을 의미
}

function getConfig(): Config | undefined {
  // 아직 설정되지 않은 경우 - undefined 반환
  return undefined; // "아직 설정되지 않음"을 의미
}

// Optional 파라미터는 undefined를 포함
function greet(name?: string) {
  // name의 타입은 string | undefined
  if (name === undefined) {
    console.log('Hello, Guest!');
  } else {
    console.log(`Hello, ${name}!`);
  }
}
```

### 실용적인 사용 예제

```typescript
// API 응답 처리
interface ApiResponse<T> {
  data: T | null; // 데이터가 없을 수도 있음
  error: string | null; // 에러가 없을 수도 있음
}

function handleApiResponse<T>(response: ApiResponse<T>) {
  if (response.error !== null) {
    console.error('API Error:', response.error);
    return;
  }

  if (response.data === null) {
    console.log('No data available');
    return;
  }

  // 이 시점에서 data는 T 타입
  console.log('Data:', response.data);
}

// 상태 관리 예제
class UserManager {
  private currentUser: User | null = null;

  login(user: User) {
    this.currentUser = user;
  }

  logout() {
    this.currentUser = null; // null로 재설정
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
```

### strictNullChecks 설정

```typescript
// tsconfig.json에서 strictNullChecks: true인 경우
let str: string = 'hello';
// str = null; // ❌ 에러: strictNullChecks가 활성화되면 null 할당 불가

// strictNullChecks: false인 경우 (권장하지 않음)
// str = null; // ⚠️ 경고 없이 null 할당 가능 - 런타임 에러 위험
```

> **Best Practice**:
>
> - `strictNullChecks: true`를 항상 활성화
> - null은 "의도적으로 비어있음"을 표현할 때 사용
> - undefined는 "아직 할당되지 않음"을 표현할 때 사용
> - Optional 파라미터나 프로퍼티는 undefined를 사용

> **주의**: JavaScript에서 `null`과 `undefined`는 둘 다 falsy 값이지만, 엄격한 비교(`===`)에서는 서로 다르다.

## Inferred null & A First Look at Type Narrowing

### 개념 설명

TypeScript는 DOM API나 특정 함수들의 반환값이 `null`이 될 수 있음을 자동으로 추론한다.
Type Narrowing은 조건문 등을 통해 타입의 범위를 좁혀나가는 TypeScript의 기능이다.

### null 타입 추론

DOM 메서드는 요소를 찾지 못하면 `null`을 반환합니다:

```typescript
// TypeScript가 자동으로 HTMLElement | null 타입으로 추론
const inputEl = document.getElementById('username');

// ❌ 에러: Object is possibly 'null'
console.log(inputEl.value); // inputEl이 null일 수 있어서 에러 발생
```

### Type Narrowing (타입 좁히기)

조건문을 사용하여 null 체크를 하면 TypeScript가 타입을 자동으로 좁혀준다:

```typescript
const inputEl = document.getElementById('username'); //inputEl의 타입은 HTMLElement | null

// Type Guard를 통한 null 체크
if (!inputEl) {
  throw new Error('Element not found!'); // null인 경우 에러 발생
}

// 이 시점에서 TypeScript는 inputEl이 HTMLElement라고 확신
console.log(inputEl); // ✅ inputEl: HTMLElement (null이 아님)

// 하지만 여전히 value 속성 접근 시 에러 발생
// console.log(inputEl.value); // ❌ Property 'value' does not exist on type 'HTMLElement'
```

### 타입 단언을 통한 구체적인 타입 지정

```typescript
// as 키워드를 사용한 타입 단언
const inputEl = document.getElementById('username') as HTMLInputElement | null;

if (!inputEl) {
  throw new Error('Input element not found!');
}

// 이제 value 속성에 접근 가능
console.log(inputEl.value); // ✅ HTMLInputElement는 value 속성을 가짐
```

### typeof를 사용한 Type Narrowing

```typescript
function processValue(value: string | number | null) {
  // null 체크
  if (value === null) {
    console.log('Value is null');
    return;
  }

  // 이 시점에서 value는 string | number

  // typeof를 사용한 Type Narrowing
  if (typeof value === 'string') {
    console.log(value.toUpperCase()); // ✅ value는 string
  } else {
    console.log(value.toFixed(2)); // ✅ value는 number
  }
}
```

### 예제

```typescript
// 폼 요소 처리 예제
function handleFormSubmit() {
  const usernameInput = document.getElementById(
    'username'
  ) as HTMLInputElement | null;
  const emailInput = document.getElementById(
    'email'
  ) as HTMLInputElement | null;

  // 다중 null 체크
  if (!usernameInput || !emailInput) {
    alert('Required form elements not found');
    return;
  }

  // 이 시점에서 두 요소 모두 HTMLInputElement 타입
  const username = usernameInput.value; // ✅ 안전하게 접근
  const email = emailInput.value; // ✅ 안전하게 접근

  // 빈 값 체크
  if (!username || !email) {
    alert('Please fill in all fields');
    return;
  }

  // 폼 데이터 처리
  console.log(`Submitting: ${username}, ${email}`);
}
```

### instanceof를 사용한 Type Narrowing

```typescript
// 다양한 타입의 에러 처리
function handleError(error: unknown) {
  if (error instanceof Error) {
    // error는 Error 타입으로 좁혀짐
    console.error('Error message:', error.message); // ✅
    console.error('Stack trace:', error.stack); // ✅
  } else if (typeof error === 'string') {
    console.error('String error:', error); // ✅
  } else {
    console.error('Unknown error:', error);
  }
}
```

> **Best Practice**:
>
> - DOM 요소를 가져올 때는 항상 null 체크를 수행
> - 구체적인 HTML 요소 타입(HTMLInputElement, HTMLButtonElement 등)으로 타입 단언을 사용
> - Type Narrowing을 활용하여 런타임 에러를 방지

> **주의**:
>
> - 타입 단언(as)은 TypeScript에게 "나를 믿어"라고 말하는 것이므로 신중하게 사용
> - 잘못된 타입 단언은 런타임 에러를 발생시킬 수 있다.

## Forced "Not Null" and Optional Chaining

### 개념 설명

TypeScript는 `null` 또는 `undefined`가 될 수 있는 값에 접근할 때 에러를 발생시킨다.
하지만 개발자가 해당 값이 절대 `null`이 아니라고 확신하거나, `null`일 경우를 안전하게 처리하고 싶을 때 사용하는 두 가지 특별한 문법이 있다.

- **Non-null Assertion Operator (`!`)**: TypeScript에게 "이 값은 절대 `null`이나 `undefined`가 아니니 걱정하지 마!"라고 강제로 알려주는 문법
- **Optional Chaining (`?.`)**: "이 객체나 프로퍼티가 `null`이나 `undefined`가 아니라면 다음 프로퍼티에 접근해"라고 안전하게 요청하는 문법

---

### 1. Non-null Assertion Operator (`!`)

개발자가 TypeScript 컴파일러보다 값에 대해 더 잘 알고 있을 때, `null`이나 `undefined`가 아님을 단언하기 위해 사용한다.

#### 코드 예제

```ts
// DOM 요소는 찾지 못하면 null을 반환하므로, 타입은 HTMLElement | null 입니다.
const inputEl = document.getElementById('user-input');

// ❌ 에러: 'inputEl'은(는) 'null'일 수 있습니다.
// console.log(inputEl.value);

// ✅ 해결책 1: 타입 가드 (Best Practice)
if (inputEl) {
  console.log((inputEl as HTMLInputElement).value);
}

// ✅ 해결책 2: Non-null 단언 (!)
// "inputEl은 절대 null이 아니야!" 라고 TypeScript에게 확신을 줌
const guaranteedInputEl = document.getElementById(
  'user-input'
)! as HTMLInputElement;
console.log(guaranteedInputEl.value); // ✅ 정상: 컴파일러가 더 이상 에러를 발생시키지 않음

// 변수 사용 시에도 적용 가능
// console.log(inputEl!.value); // 이렇게도 사용 가능하지만, 보통 변수 선언 시점에 사용
```

> **⚠️ 경고**: `!` 연산자는 컴파일 타임에만 타입 검사를 비활성화할 뿐, 런타임 에러를 막아주지 않는다.
> 만약 `inputEl`이 실제로 `null`인데 `!`를 사용하면, `TypeError: Cannot read properties of null` 런타임 에러가 발생

---

### 2. Optional Chaining (`?.`)

객체의 프로퍼티에 접근할 때, 해당 객체나 체인의 일부가 `null` 또는 `undefined`이면 에러를 발생시키지 않고 `undefined`를 반환

#### 코드 예제

```ts
type User = {
  id: number;
  profile?: {
    // profile은 선택적 프로퍼티
    name: string;
    address?: {
      // address도 선택적 프로퍼티
      city: string;
    };
  };
};

const user1: User = { id: 1, profile: { name: 'Taejin' } };
const user2: User = { id: 2 };

// ❌ 런타임 에러 발생 가능성
// console.log(user2.profile.name); // TypeError: Cannot read properties of undefined

// ✅ 해결책: Optional Chaining (?.)
// user2.profile이 undefined이므로, 더 이상 진행하지 않고 undefined를 반환
const userName1 = user1.profile?.name; // ✅ 'Taejin'
const userName2 = user2.profile?.name; // ✅ undefined (에러 없음)

// 중첩된 객체에도 사용 가능
const city1 = user1.profile?.address?.city; // ✅ undefined
const city2 = user2.profile?.address?.city; // ✅ undefined
```

### `!` vs `?.` 비교

| 구분          | Non-null Assertion (`!`)             | Optional Chaining (`?.`)                        |
| :------------ | :----------------------------------- | :---------------------------------------------- |
| **목적**      | `null`/`undefined`가 **아님을 단언** | `null`/`undefined`일 **가능성을 안전하게 처리** |
| **컴파일러**  | 타입 검사를 통과시킴                 | `null`/`undefined` 가능성을 인정하고 처리       |
| **런타임**    | 값이 `null`이면 **에러 발생**        | 값이 `null`이면 `undefined`를 반환 (에러 없음)  |
| **사용 시점** | 개발자가 100% 확신할 때              | 객체 체인의 중간이 비어있을 수 있을 때          |

> **Best Practice**: 대부분의 경우, `if` 문을 사용한 **타입 가드**나 **Optional Chaining (`?.`)**을 사용하는 것이 훨씬 안전하다.
> `!` 연산자는 꼭 필요한 경우에만 제한적으로 사용

## Type Casting (타입 단언)

Optional Chaining (`?.`)이나 Non-null 단언(`!`)을 써도 에러가 해결되지 않는 경우가 있다.
예를들어:

```ts
const inputEl = document.getElementById('user-name');

console.log(inputEl?.value); // ❌ 에러: 'value' 속성이 'HTMLElement' 타입에 없습니다.
```

이 에러가 왜 발생하냐면, `getElementById`는 똑똑하긴 하지만 점쟁이는 아니기 때문이다.
'ID가 user-name인 HTML 요소를 가져왔다' 까지만 알지, 그게 `input`인지 `div`인지 `p` 태그인지는 모르는 것이다.
그래서 가장 포괄적인 타입인 `HTMLElement`로 추론하는데, 여기엔 `value` 속성이 없습니다. 범용 `HTMLElement`에 `value`가 있다고 보장할 순 없기 때문이다.

이럴 때 필요한 게 **타입 캐스팅 (Type Casting)**, 좀 더 정확히는 **타입 단언 (Type Assertion)** 이다.

`as` 키워드를 사용해서 타입을 단언해주면 간단하게 해결된다.

```ts
// as HTMLInputElement로 타입을 단언해줍니다.
const inputEl = document.getElementById('user-name') as HTMLInputElement;

console.log(inputEl.value); // ✅ 정상! 이제 value 속성을 사용할 수 있습니다.
```

그리고 여기에 union type을 적용할 수 있다.

```ts
const inputEl = document.getElementById('user-name') as HTMLInputElement | null;

if (inputEl) {
  console.log(inputEl.value); // ✅ 타입 가드와 함께 안전하게 사용
}
```

> **주의 사항**
> 타입 단언은 TypeScript의 타입 검사 기능을 꺼버리는 것과 같다.
> 만약 `as HTMLInputElement`라고 단언했는데, 실제로는 `div` 요소였다? 컴파일러는 아무 말도 안하지만, 런타임에서 `undefined`를 뱉거나 에러가 터지는 등 코드가 개같이 꼬일 수 있음

## The "unknown" Type

### 개념 설명

위에서 간단하게 설명했지만 `unknown` 타입은 `any`와 비슷해 보이지만, 훨씬 안전한 타입이다.
어떤 값이 들어올지 전혀 예상할 수 없을 때 사용한다.
예를 들어, 외부 API 응답, 파일 시스템에서 읽어온 데이터, 혹은 사용자가 어떤 값을 입력할지 모르는 라이브러리를 만들 때 유용하다.

`any`가 "나는 모든 타입 검사를 포기하겠다!" 선언하는 것과 같다면, `unknown`은 "이 값의 정체는 아직 모르지만, 사용하기 전에는 반드시 타입을 확인하겠다!"고 약속하는 것과 같다.
TypeScript는 `unknown` 타입의 값을 사용하려고 하면, "이봐, 이 값의 정체를 밝히기 전에는 함부로 사용할 수 없어!"라며 에러를 발생시킨다.

### any와의 차이점: 안전장치의 유무

`any`와 `unknown`의 가장 큰 차이점은 **안전성**이다.

```ts
let valueAny: any;
let valueUnknown: unknown;

valueAny = 'hello';
valueUnknown = 'world';

// any: 뭘 하든 그냥 통과시켜줍니다. 런타임 에러의 주범!
valueAny.toUpperCase(); // ✅ 컴파일 에러 없음
valueAny.foo.bar(); // ✅ 컴파일 에러 없음 (런타임에서는 터지겠죠?)

// unknown: 타입을 확인하기 전까지는 아무것도 못하게 막습니다.
// valueUnknown.toUpperCase(); // ❌ 에러: 'valueUnknown' is of type 'unknown'.

// ✅ 타입 가드(Type Guard)를 통해 타입을 좁혀주면 사용 가능
if (typeof valueUnknown === 'string') {
  console.log(valueUnknown.toUpperCase()); // 'WORLD'
}
```

`any`는 TypeScript의 타입 검사 기능을 완전히 꺼버려서, 마치 바닐라 JavaScript처럼 동작하게 만든다.
반면 `unknown`은 **타입을 먼저 확인하도록 강제**하여 타입 안전성을 유지한다.

### 코드 예제: 타입 좁히기 (Type Narrowing)

`unknown` 타입을 사용하려면 `if`문이나 `typeof` 연산자 등을 사용해 타입을 좁혀나가야 하고, 이걸 **타입 좁히기(Type Narrowing)**라고 부른다.

```ts
function processValue(value: unknown) {
  // ❌ 에러: 'value' is of type 'unknown'.
  // value.log();

  // 1. typeof로 타입 확인
  if (typeof value === 'string') {
    console.log(value.toUpperCase()); // ✅ 이제 value는 string 타입으로 확신!
    return;
  }

  // 2. 객체인지, 특정 프로퍼티가 있는지 확인
  if (
    typeof value === 'object' &&
    value !== null &&
    'log' in value &&
    typeof (value as any).log === 'function'
  ) {
    // 복잡한 검사를 통과하면 해당 메서드 호출 가능
    (value as any).log(); // ✅ value에 log 메서드가 있다고 확신!
  } else {
    console.log('알 수 없는 타입의 값입니다.');
  }
}

processValue('hello typescript'); // HELLO TYPESCRIPT
processValue({ log: () => console.log('This is a log.') }); // This is a log.
processValue(123); // 알 수 없는 타입의 값입니다.
```

이렇게 `unknown`은 개발자에게 "이 값이 안전한지 직접 확인해!"라고 요구함으로써, 런타임에 발생할 수 있는 예기치 않은 에러를 방지해준다.

> **Best Practice**:
>
> - 어떤 값이 들어올지 정말 모를 때는 `any` 대신 `unknown`을 사용
> - `unknown` 타입을 사용할 때는 반드시 `typeof`, `instanceof`, `in` 연산자 등을 사용한 타입 가드를 통해 타입을 확인한 후 사용
> - `unknown`은 특히 라이브러리나 범용 유틸리티 함수를 작성할 때 매우 유용

## Optional Values & TypeScript

### 개념 설명

TypeScript에서는 객체의 프로퍼티나 함수의 파라미터가 항상 필요한 것은 아닐 수 있다.
이럴 때 사용하는 것이 바로 **옵셔널(Optional)** 문법인 `?` 이다.
`?`를 사용하면 "이 값은 있을 수도 있고, 없을 수도 있다"고 명시하여 보다 유연한 코드를 작성할 수 있음

값이 없는 경우, 해당 프로퍼티나 파라미터는 `undefined` 값을 가지게 된다.

### 1. Optional Properties (선택적 프로퍼티)

객체를 정의할 때 프로퍼티 이름 뒤에 `?`를 붙이면, 해당 프로퍼티는 필수가 아닌 선택적 프로퍼티가 된다.

#### 코드 예제

```ts
type UserProfile = {
  username: string;
  email: string;
  bio?: string; // bio는 선택적 프로퍼티
  location?: string; // location도 선택적 프로퍼티
};

// ✅ bio와 location 없이도 객체 생성 가능
const user1: UserProfile = {
  username: 'Taejin',
  email: 'taejin@example.com',
};

// ✅ 모든 프로퍼티를 다 포함해도 물론 OK
const user2: UserProfile = {
  username: 'Max',
  email: 'max@example.com',
  bio: 'Developer from Germany.',
  location: 'Munich',
};

// ✅ 나중에 프로퍼티 추가도 가능
user1.bio = 'I love coding!';
```

### 2. Optional Parameters (선택적 파라미터)

함수의 파라미터 이름 뒤에 `?`를 붙이면, 해당 파라미터는 호출 시 생략할 수 있음

**주의:** 선택적 파라미터는 반드시 필수 파라미터 뒤에 와야 한다.

#### 코드 예제

```ts
// lastName은 선택적 파라미터
function greet(firstName: string, lastName?: string) {
  if (lastName) {
    // lastName이 제공된 경우 (undefined가 아닌 경우)
    console.log(`Hello, ${firstName} ${lastName}!`);
  } else {
    console.log(`Hello, ${firstName}!`);
  }
}

greet('Taejin'); // ✅ lastName 없이 호출 -> "Hello, Taejin!"
greet('Maximilian', 'Schwarzmüller'); // ✅ 둘 다 제공 -> "Hello, Maximilian Schwarzmüller!"

// ❌ 에러: 선택적 파라미터는 필수 파라미터 뒤에 와야 함
// function sayHello(firstName?: string, lastName: string) { ... }
// Error: A required parameter cannot follow an optional parameter.
```

> **Best Practice**:
>
> - API 응답 데이터처럼 특정 필드가 없을 수도 있는 객체를 모델링할 때 Optional Properties를 적극 활용
> - 함수에 기본 동작을 제공하면서 추가적인 정보를 선택적으로 받고 싶을 때 Optional Parameters를 사용하면 좋다.
> - Optional Chaining (`?.`)과 함께 사용하면 `null`이나 `undefined`일 수 있는 값에 안전하게 접근할 수 있어 시너지가 좋음

## Nullish Coalescing

### 개념 설명

**Nullish Coalescing Operator**(`??`)는 왼쪽 피연산자가 `null` 또는 `undefined`일 때만 오른쪽 피연산자를 반환하고, 그렇지 않으면 왼쪽 피연산자를 그대로 반환하는 논리 연산자이다.

이게 왜 필요하냐면, JavaScript에서는 `||` (OR) 연산자를 사용해서 기본값을 설정하는 경우가 많았는데, 한 가지 문제가 있었는데,
`||`는 `null`이나 `undefined` 뿐만 아니라, `0`, `''`(빈 문자열), `false` 같은 "falsy" 값들도 모두 걸러내 버리는 문제이다.

하지만 때로는 `0`이나 빈 문자열을 유효한 값으로 취급하고 싶을 때가 있고, 바로 그럴 때 `??` 연산자가 아주 유용하게 사용된다.

### `??` vs `||` 차이점 비교

`??`와 `||`의 가장 큰 차이점은 "falsy" 값을 어떻게 처리하느냐에 있다.

#### 코드 예제

```ts
//  기존의 || 연산자 문제점
const quantity = 0;
const finalQuantity = quantity || 5; // quantity가 0(falsy)이라서 5가 할당됨
console.log(finalQuantity); // 5 (결과가 0이 되길 원했는데!)

const message = '';
const finalMessage = message || '기본 메시지'; // message가 ''(falsy)라서 기본 메시지가 할당됨
console.log(finalMessage); // '기본 메시지'

//  Nullish Coalescing Operator (??) 사용
const nullishQuantity = 0;
const finalNullishQuantity = nullishQuantity ?? 5; // nullishQuantity가 null/undefined가 아니므로 0을 그대로 사용
console.log(finalNullishQuantity); // 0 (원하던 결과!)

const nullishMessage = '';
const finalNullishMessage = nullishMessage ?? '기본 메시지'; // nullishMessage가 null/undefined가 아니므로 ''을 그대로 사용
console.log(finalNullishMessage); // '' (빈 문자열도 유효한 값으로 인정!)

// null 또는 undefined일 때만 동작
const nullValue = null;
const undefinedValue = undefined;
const result1 = nullValue ?? '기본값'; // '기본값'
const result2 = undefinedValue ?? '기본값'; // '기본값'
```

### 실용적인 사용 사례

```ts
// API에서 받아온 데이터
const apiResponse = {
  title: 'TypeScript Study',
  author: '',
  viewCount: 0,
  likes: null,
};

// || 사용 시
const author_or = apiResponse.author || '익명'; // '익명'
const viewCount_or = apiResponse.viewCount || 100; // 100

// ?? 사용 시
const author_nullish = apiResponse.author ?? '익명'; // '' (빈 문자열도 이름일 수 있음)
const viewCount_nullish = apiResponse.viewCount ?? 100; // 0 (조회수가 0일 수 있음)
const likes_nullish = apiResponse.likes ?? 0; // 0 (좋아요가 null이면 0으로)

console.log(`Author: ${author_nullish}`); // Author:
console.log(`Views: ${viewCount_nullish}`); // Views: 0
console.log(`Likes: ${likes_nullish}`); // Likes: 0
```

> **Best Practice**:
>
> - `0`, `''`(빈 문자열), `false`를 유효한 값으로 처리하면서 `null` 또는 `undefined`에 대한 기본값을 설정하고 싶을 때 `??`를 사용
> - 단순히 "falsy" 값을 모두 걸러내고 싶을 때는 기존처럼 `||`를 사용해도 괜찮다.
> - 코드의 의도를 명확하게 하여 다른 개발자가 "왜 `||` 대신 `??`를 썼지?"라고 고민하지 않게 하는 것이 중요하다.

---
