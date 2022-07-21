# Day4

## 체크리스트
- [x] Memory 객체와 틀을 생성, 인스턴스 객체(stack, heap, stackPointer, 등등)
```javascript
class Memory {
  constructor() {
    this.stack = []; // 힙 주소를 담을 스택 : 힙의 주소를 갖고있다.
    this.stackPointer = 0; // 현재 가리키는 스택 포인터
    this.memoryHeap = [];
    this.heapAddress = 0; // 스택에 저장할 힙 주소
    this.size = new Map(); // type 별 size를 저장
  }
}
```
- [x] stack, heap 영역 크기를 지정 (init)

```javascript
  init(stackSize, heapSize) {
    this.stack.length = stackSize;
    this.memoryHeap.length = heapSize;
    return 0; // 기본 주소
  }
```
- [x] type 별 사이즈 지정 (setSize)

```javascript
  setSize(type, length) {
    this.size.set(type, length);
  }
```
- [x] 힙 메모리 할당 malloc(type, count)

- 할당에 성공 시, 8바이트로 정렬된 메모리의 주소를 가리키는 포인터를 반환한다. 
```javascript
  // 이미 등록된 type에 대해 count만큼 반복하여 메모리를 할당하고, 시작 위치 고유한 주소를 스택영역에 추가 -> 스택 주소값을 리턴
  malloc(type, count) {
    const type_length = this.size.get(type);
    let padding;
    // 타입크기가 8보다 작을 경우 padding으로 8바이트를 채워줌.
    if (type_length < 8) {
      padding = 8 - type_length;
    }

    // 할당 시, 메모리의 주소를 가리키는 스택 포인터가 가리키는 heap 주소를 반환
    let heapAddresses = [];

    for (let i = 0; i < count; i++) {
      this.memoryHeap[this.heapAddress] = {
        type: type,
        memory: type_length + padding,
        stackPointer: this.stackPointer,
      };
      this.stack[this.stackPointer] = { heapAddress: this.heapAddress }; // 현재 스택 포인터에 heap의 주소를 넣는다.
      heapAddresses.push(this.heapAddress);
      // 메모리 힙에 할당 해줄 떄 마다, 스택 포인터는 더 위를 가리키고, heapAddress도 증가한다.
      this.heapAddress += 1;
      this.stackPointer += 1;
    }
  }
```

## 학습 메모

# Day 4 학습 메모

[How JavaScript works: an overview of the engine, the runtime, and the call stack](https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf)

Node.js 에서 자바스크립트를 컴파일 할때 , c++ 로 만들어진 프로그램인 v8 엔진은 자바스크립트를 파싱해서 돌리기 때문에 

자바스크립트에서 변수를 선언할 때, 그 변수가 메모리에 할당이 된다. 중간 단계에 c++언어가 관여를 하기 때문에, 원본코드를 뒤지거나, f12를 눌러서 사용한 memory를 확인해야한다.

but, 이마저도 C++ 에서 보여지는 메모리주소도, 실제 물리적인 메모리 주소가 아님.. 

운영체제에서 할당한 메모리이기 떄문에, 가상메모리라고 볼 수 있음.

## 메모리 구조, 데이터 저장/참조 원리

<aside>
🧑‍💻 컴퓨터 메모린느 1Byte(8bit)크기의 메모리 셀 여러개로 구성된다. 각 메모리 셀은 본인만의 고유한 주소값을 가지며, 8개의 비트(2진수)로 데이터를 저장한다.

</aside>

```jsx
let number1 = 1;
let number2 = number1;

number1 = number1 + 1;
console.log(number2) // 1 or 2?
```

Q. 다음 콘솔에 나오게 될 결과는 무엇일까?

→ 1. number1이 선언될 때, js는 식별자를 생성하여 한 memory 주소에 할당한다. 그리고나서 value 값을 해당 주소에 저장한다. 

1. number2에 number1 값이 저장 될 때, number1의 value값을 저장하는 것이 아닌 주소를 저장한다.
2. 4번째 줄에서 number1이 값이 1이 더해질 때, js는 number1에 새로 주소를 할당하고, value값 2를 새로운 주소에 저장한다. 따라서 console.log 에 찍히는 답은 1이 된다.

### const, let

→ let, const 차이는 데이터 값이 변경될 가능성이 있을 떄는 let, 변경되지 않을 때는 const 를 사용한다고 알고있다. 

```jsx
const c = { id: 'yoy', pw: 1234 };
c.gender = 'F';
console.log(c);	// {id: 'yoy', pw: 1234, gender: 'F'}
```

위 코드를 실행하면 const 로 object가 선언 됐지만 에러가 발생하지 않고 정상적으로 작동한다. 왜 그럴까? 

![Untitled](Day%204%20%E1%84%92%E1%85%A1%E1%86%A8%E1%84%89%E1%85%B3%E1%86%B8%20%E1%84%86%E1%85%A6%E1%84%86%E1%85%A9%205236670e737f4ab08012255f26b2ad03/Untitled.png)

원시타입인 (string, number, boolean, null, undefiend)들은 콜스택에 주소와 값이 그대로 저장되지만 복잡한 객체와 같은 참조타입(Reference Type) 데이터는 힙 영역에 저장되고 콜스택에서 value는 참조타입의 데이터 값을 저장한 힙 영역의 주소를 가르키고 있기 때문이다. 

### 메모리 leak(메모리 누수)

메모리 힙은 콜스택 영역보다 훨씬 더 큰 공간을 갖고 있지만, 그 영역이 무한한 것은 아니다. 메모리 힙이 프로그램의 오류나 메모리 관리가 제대로 되지 않았을 경우 수동으로 메모리 해제가 되지 않아 힙영역의 메모리 공간의 범위를 넘어설 경우, 그것을 메모리 누수라고 한다. → 과거에 사용했지만 해제하고 반환 되지 않은 데이터들이 메모리 힙에 계속 차지하고 있는 현상