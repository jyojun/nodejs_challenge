// const regex = new RegExp(
//   /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
// );

// const winRegex = new RegExp(
//   /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/
// );
// const path = "/home/user/boost/camp/challenge/jday17/problem.md";
// const winPath = "C:\\home\\user\\boost\\camp\\challenge\\day17\\problem.md";
// const result = regex.exec(path);
// const result2 = regex.exec(winPath);
// console.log(result);
// console.log(result2);

import { Path } from "./path.js";

const path = new Path("/home/user/boost/camp/challenge/day17/problem.md");
console.log(path.stringify());
const path2 = new Path(
  "C:\\home\\user\\boost\\camp\\challenge\\day17\\problem.md"
);
console.log(path2.stringify());
