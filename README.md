# Day7

## 체크포인트
- [x] Board class 생성
    1. 체스판 출력 - display()
    2. enum (file, rank) 사용 -> A8(8번째 열 1번쨰 column)

- [x] Pawn class 생성
    1. 객체로 생성할 때, (type, position, color)를 파라미터로 받음
    2. possiblePosition()
       1. white일 때 rank를 1줄임(올라가기)
       2. black일 때 rank를 1늘림(내려가기) 
    3. 실행 결과
    ```javascript
    const pawn = new Pawn("pawn", "A2", "black");
    const pawn2 = new Pawn("pawn", "F7", "white");

    console.log(pawn.possiblePosition());
    console.log(pawn2.possiblePosition());
    ```
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
