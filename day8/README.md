# Day8

## 체크 포인트

1. BoostSet class
   - [x] sum(other) : BoostSet에 다른 other boostset 요소들을 더해서 합집합을 리턴한다. 이미 같은 것이 있다면 추가하지 않는다s. 
   - [x] complement(other) : BoostSet에 다른 other BoostSet 요소를 빼서 여집합을 리턴한다.
   - [x] intersect(other) : BoostSet와 다른 BoostSet 값과 비교하여, 두 집합에 모두 있는 원소 - 교집합을 리턴한다.
   - [x] resultAll() : 모든 요소를 1차원 배열로 리턴한다.
2. CountSet class
   - [x] append(element): Count Set에 새로운 요소 추가
   - [x] remove(element): Count Set에 특정 요소 제거
   - [x] countFor(element): Count Set에 특정 요소 갯수
   - [x] sum(other): Count Set에 다른 Count Set 과의 합집합
   - [x] complement(other): Count Set에 다른 Count Set 과의 차집합
   - [x] intersect(other): Count Set에 다른 Count Set 과의 교집합 -> 겹치는 Count은 1로 맞춰준다.(BoostSet을 사용함)
   - [x] resultAll(): Count Set의 모든요소의 Count Object 리턴
   - [x] filter(): 클로저를 매개변수로 넘기는 메소드
   - [ ] map() 
   - [x] reduce()

3. 실행 결과
```javascript
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
```
![image](https://user-images.githubusercontent.com/64758931/181356004-114499b7-5647-4bda-94f6-51eabb0345c5.png)


## 학습 메모
- Set.has(), Array.includes() 의 시간 복잡도 https://velog.io/@sozero/TIL-220307-Set.has-%EC%99%80-Array.includes-%EC%8B%9C%EA%B0%84%EB%B3%B5%EC%9E%A1%EB%8F%84

- 불변 객체 만들기 https://spiderwebcoding.tistory.com/8
