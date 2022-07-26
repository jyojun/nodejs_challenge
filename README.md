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
  ![image](https://user-images.githubusercontent.com/64758931/180969573-bb110bfa-9485-4cf3-9872-35cbee732279.png)

- [x] Knight class 생성
  1. possiblePosition()
     1. 왼쪽위, 오른쪽위, 왼쪽아래, 오른쪽아래 각각 2개씩 대각선으로 8가지 가능
     2. 판의 밖을 나가지 않는다면 result에 push하여 리턴
  2. 실행 결과
  ```javascript
  const knight = new Knight("knight", "B1", "black");
  const knight2 = new Knight("knight", "G8", "white");

  console.log(knight.possiblePosition());
  console.log(knight2.possiblePosition());
  ```
  ![image](https://user-images.githubusercontent.com/64758931/180969662-24af7bc7-0cb9-4997-b367-62c4e32552f5.png)

- [x] Bishop class 생성
  1.  possiblePosition()
      1. 대각선 왼쪽위, 오른쪽위, 왼쪽 아래, 오른쪽아래 방향을 체스판 바깥쪽으로 나가지 않으면 result에 push
  2.  실행 결과
    ```javascript
    const bishop = new Bishop("bishop", "C1", "black");
    const bishop2 = new Bishop("bishop", "F8", "white");

    console.log(bishop.possiblePosition());
    console.log(bishop2.possiblePosition());

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
