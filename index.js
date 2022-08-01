import { Path } from "./path.js";

const path = new Path("/home/user/boost/camp/challenge/day17/problem.md");
console.log(path.stringify());
path.appendPathComponent("testDir");
console.log(path.stringify());

const path2 = new Path(
  "C:\\home\\user\\boost\\camp\\challenge\\day17\\problem.md"
);
console.log(path2.stringify());
path2.appendPathComponent("hello");
console.log(path2.stringify());
