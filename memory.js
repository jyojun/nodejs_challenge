class Memory {
  constructor() {
    this.stack = []; // 힙 주소를 담을 스택 : 힙의 주소를 갖고있다.
    this.stackPointer = 0; // 현재 가리키는 스택 포인터
    this.memoryHeap = [];
    this.heapAddress = 0; // 스택에 저장할 힙 주소
    this.size = new Map(); // type 별 size를 저장
  }

  // 스택영역 크기, 힙 영역 크기를 지정 -> 기본 주소를 리턴
  init(stackSize, heapSize) {
    this.stack.length = stackSize;
    this.memoryHeap.length = heapSize;
    return { stackAddress: 0, heapAddress: 0 }; // 기본 주소
  }

  // type 별로 고유한 사이즈를 가지도록 등록한다.
  setSize(type, length) {
    if (this.size.has(type)) {
      console.log("이미 등록한 Type은 변경할 수 없다.");
      return;
    }
    this.size.set(type, length);
  }

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
      // 스택에서 스택 포인터가 가리키는 값이 heap의 주소값 이다.
      this.stack[this.stackPointer] = { heapAddress: this.heapAddress }; // 현재 스택 포인터에 heap의 주소를 넣는다.
      heapAddresses.push(this.heapAddress);
      // 메모리 힙에 할당 해줄 떄 마다, 스택 포인터는 더 위를 가리키고, heapAddress도 증가한다.
      this.heapAddress += 1;
      this.stackPointer += 1;
    }

    return heapAddresses;
  }

  // malloc 할 때 할당한 스택 포인터를 입력으로 받고, 스택 주소값에 있는 힙영역 고유주소를 찾아 해제 하고 반환한다.
  free(pointer) {
    // 스택에서 stack pointer가 가르키는 것은 memory 주소 를 저장
    const result = this.stack[pointer];
    result.heapAddress = null; // 주소도 null
    this.memoryHeap[pointer] = null; // 메모리도 비워준다. null
    return pointer;
  }
  call(name, paramCount) {} // 스택 포인터에 포인터 변수를 paramCount만큼 반복하여 생성 -> 스택 포인터를 증가
  returnFrom(name) {} // 증가한 스택공간을 비우고 이전 호출 위치로 이동 ex) foo를 호출하면 foo를 name으로
  usage() {} // 스택 영역 (전체 크기, 사용중인 용량, 남은용량), 힙 영역 (전체크기, 사용 용량, 남은 용량) 배열로 리턴
  callstack() {} // 스택에 쌓인 호출 스택을 문자열로 리턴
  heapdump() {
    return this.memoryHeap;
  } // 힙영역에서 사용중인 상태를 문자열 배열로 리턴
  garbageCollect() {} // heap 영역에서 할당된 타입중 스택에 포인터 변수가 없는 경우를 해제
  reset() {} // stack, heap 공간을 비우고 init 상태
}

export default Memory;
