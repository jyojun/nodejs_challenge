import { Path } from "./path.js";

let path1 = new Path("/home/user/boost/camp/challenge/day17/problem.md");
let path2 = new Path("/home/user/boost/camp/challenge/day17/problem");
let path3 = new Path(
  "C:\\home\\user\\boost\\camp\\challenge\\day17\\problem.md"
);
let path4 = new Path("/first/second/most/jk");

test("1 is 1", () => {
  expect(1).toBe(1);
});

test("path root", () => {
  expect(path1.stringify().root).toBe("/");
});

test("path root", () => {
  expect(path2.stringify().root).toBe("/");
});

test("");

test("path root", () => {
  expect(path3.stringify().root).toBe("C:\\");
});

test("path root", () => {
  expect(path4.stringify().root).toBe("/");
});
