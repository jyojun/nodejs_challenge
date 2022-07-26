# Day7

## 체크포인트
- [ ] Board class 생성
    1. 체스판 출력 - display()
    2. enum (file, rank) 사용 -> A8(1번째 열 8번쨰 column)

## 학습 메모

- 유니코드 출력
  ```javascript
  console.log("\u265f") // U+265F (흑색 Pawn)을 출력
  ```

-  자바스크립트 enum ?
   - 자바스크립트에서 enum처럼 객체를 사용할 수 있도록 Object.freeze()를 사용한다. 
   - Object.freeze() 메서드를 사용하여, 한번 선언된 객체의 값을 변경하지 못하도록 한다. -> 불변성
```javascript
const Season = {
    SPRING: "spring",
    SUMMER: "summer",
    AUTUMN: "autumn",
    WINTER: "winter"
};

Object.freeze(Season);

Season.SPRING = "summer"; // 변하지 않는다.
```
