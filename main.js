import Memory from "./memory.js";

const memory = new Memory();

console.log(memory.init(14, 15));

memory.setSize("int", 8);
memory.setSize("int", 4); // 이미 등록한 type은
memory.setSize("boolean", 1);

console.log(memory.size);

// boolean 4번가 할당받은 주소들
const ids = memory.malloc("boolean", 4);
console.log(ids);

// foo, bar 를 call 한다.
memory.call("foo", 1);
memory.call("bar", 2);
memory.call("dap", 3);

memory.returnFrom("dap");

console.log(memory.callstack());
