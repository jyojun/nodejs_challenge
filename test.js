import { Path } from "./path.js";

const path1 = new Path("/home/user/boost/camp/challenge/day17/problem.md");
const path2 = new Path("/home/user/boost/camp/challenge/day17/problem");
const path3 = new Path(
  "C:\\home\\user\\boost\\camp\\challenge\\day17\\problem.md"
);
const path4 = new Path("/first/second/last/param");
const path5 = new Path("/first/second/most/jk");
const path6 = new Path("/second/most/jk");

test("path1's root => '/' ", () => {
  expect(path1.stringify().root).toBe("/");
});

test("path's absoluteString", () => {
  expect(path2.stringify().absoluteString).toBe(
    "/home/user/boost/camp/challenge/day17/problem"
  );
});

test("path3's lastDirectory", () => {
  expect(path3.stringify().lastDirectory).toBe("day17");
});

test("path3 root", () => {
  expect(path3.stringify().root).toBe("C:\\");
});

test("path4 root check", () => {
  expect(path4.stringify().root).toBe("/");
});

test("appendComponent check", () => {
  expect(path1.appendComponent("base")).toBe(
    "/home/user/boost/camp/challenge/day17/base/problem.md"
  );
});

test("appendComponent check", () => {
  expect(path1.appendComponent("camp")).toBe(
    "/home/user/boost/camp/challenge/day17/base/camp/problem.md"
  );
});

test("deleteLastComponent check", () => {
  expect(path1.deleteLastComponent()).toBe(
    "/home/user/boost/camp/challenge/day17/base/problem.md"
  );
});

test("relative check", () => {
  expect(path4.relative(path5.stringify().absoluteString)).toBe(
    "../../most/jk"
  );
});

test("relative check", () => {
  expect(path4.relative(path6.stringify().absoluteString)).toBe(
    "../../../../second/most/jk"
  );
});

test("Error check", () => {
  expect(() =>
    path4
      .relative(path3)
      .toThrow("서로 다른 OS style의 파일 경로는 비교할 수 없습니다.")
  );
});
