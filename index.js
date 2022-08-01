import { Path } from "./path.js";

const path = new Path("/data/result/test/aaa");
console.log(path.relative("/data/result/source/bbb"));
const path2 = new Path("/first/second/last/param");
console.log(path2.relative("/second/most/jk"));
