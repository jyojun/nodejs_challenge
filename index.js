import { Path } from "./path.js";

const path = new Path("/home/user/boost/camp/challenge/day17/problem.md");
console.log(path.stringify());
path.appendComponent("base");
path.appendComponent("camp");
console.log(path.stringify());
path.deleteLastComponent();
console.log(path.stringify());
const path2 = new Path(
  "C:\\home\\user\\boost\\camp\\challenge\\day17\\problem.md"
);
console.log(path2.stringify());
path2.appendComponent("hello");
console.log(path2.stringify());
path2.deleteLastComponent();
console.log(path2.stringify());
