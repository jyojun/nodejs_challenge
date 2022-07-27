import BoostSet from "./boostSet.js";
import CountSet from "./countSet.js";

// A, B 집합 생성
const setA = new BoostSet([1, 2, 2, 3, 3, 3, 3, 5]);
const setB = new BoostSet([1, 3, 3, 4, 4]);

console.log("A 집합 = ", setA.resultAll());
console.log("A 집합 = ", setB.resultAll());

console.log("합집합 sum(A U B) = ", setA.sum(setB));
console.log("차집합 sum(A - B) =", setA.complement(setB));
console.log("교집합 sum(A n B) =", setA.intersect(setB));

// Count A, Count B 집합 생성
const countA = new CountSet([1, 1, 1, 1, 2, 2, 2, 3, 3]);
const countB = new CountSet([2, 2, 3, 4]);
console.log("A Count 집합 = ", countA.resultAll());
console.log("B Count 집합 = ", countB.resultAll());

console.log("A 집합에 5 추가 =>", countA.append(5).resultAll());
console.log("B 집합에 3 제거 =>", countB.remove(3).resultAll());
console.log("A 집합 3 요소 갯수 =", countA.countFor(3));
console.log("합집합 sum(A U B) = ", countA.sum(countB).resultAll());
console.log("차집합 sum(A - B) = ", countA.complement(countB).resultAll());
console.log("교집합 sum(A n B) = ", countA.intersect(countB).resultAll());
