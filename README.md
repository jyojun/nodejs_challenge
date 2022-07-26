# Day7

## 체크포인트
- [x] Board class 생성
  - 체스판 출력 - display()
  - enum (file, rank) 사용 -> A8(8번째 열 1번쨰 column)

- [x] Pawn class 생성
  - 객체로 생성할 때, (type, position, color)를 파라미터로 받음
  - possiblePosition()
   - white일 때 rank를 1줄임(올라가기)
   - black일 때 rank를 1늘림(내려가기) 
  - 실행 결과
  ```javascript
  const pawn = new Pawn("pawn", "A2", "black");
  const pawn2 = new Pawn("pawn", "F7", "white");

  console.log(pawn.possiblePosition());
  console.log(pawn2.possiblePosition());
  ```
  ![image](https://user-images.githubusercontent.com/64758931/180969573-bb110bfa-9485-4cf3-9872-35cbee732279.png)

- [x] Knight class 생성
  - possiblePosition()
    - 왼쪽위, 오른쪽위, 왼쪽아래, 오른쪽아래 각각 2개씩 대각선으로 8가지 가능
    - 판의 밖을 나가지 않는다면 result에 push하여 리턴
  - 실행 결과
  ```javascript
  const knight = new Knight("knight", "B1", "black");
  const knight2 = new Knight("knight", "G8", "white");

  console.log(knight.possiblePosition());
  console.log(knight2.possiblePosition());
  ```
  ![image](https://user-images.githubusercontent.com/64758931/180969662-24af7bc7-0cb9-4997-b367-62c4e32552f5.png)

- [x] Bishop class 생성
  -  possiblePosition()
   - 대각선 왼쪽위, 오른쪽위, 왼쪽 아래, 오른쪽아래 방향을 체스판 바깥쪽으로 나가지 않으면 result에 push
  -  실행 결과
    ```javascript
    const bishop = new Bishop("bishop", "C1", "black");
    const bishop2 = new Bishop("bishop", "F8", "white");

    console.log(bishop.possiblePosition());
    console.log(bishop2.possiblePosition());

    ``` 
    ![스크린샷 2022-07-26 오후 7 26 37](https://user-images.githubusercontent.com/64758931/180984963-7295255b-4b82-45f9-a30e-b011947f6543.png)

- [x] Rook class 생성
  -  possiblePosition()
   -  row, col 값만 변경시켜주어 체스판 바깥쪽으로 나가지 않으면 result에 push
  -  실행 결과
    ```javascript
    const rook = new Rook("rook", "A1", "black");
    const rook2 = new Rook("rook", "H8", "white");

    console.log(rook.possiblePosition());
    console.log(rook2.possiblePosition());
    ```
    ![image](https://user-images.githubusercontent.com/64758931/180995495-48afabd6-31e3-47d2-b8f8-c3052418fc9d.png)
- [x] Queen class 생성
  -  possiblePosition() -> Rook + Bishop 합침. 
  -  실행 결과
    ```javascript
  const queen = new Queen("queen", "E1", "black");
  const queen2 = new Queen("queen", "E8", "white");

  console.log(queen.possiblePosition());
  console.log(queen2.possiblePosition());
    ```
    ![image](https://user-images.githubusercontent.com/64758931/180998006-4e0017f7-554e-4db4-b54d-9ee949b96120.png)

- [x] initPiece() 메소드 생성
  - 타입별로 검은말, 하얀말이 올 수 있는 위치인지 확인 한다.
  - 확인 후, board에 각 객체를 저장한다. 
  -  실행 결과
  ![image](https://user-images.githubusercontent.com/64758931/181013357-137d53a7-7a45-4f70-bacd-8592c9a9ec88.png)

- [x] possible_move 생성
  -  pawn, knight, bishop, rook, queen 종류 별로 보드에서 possiblePosition 중 갈 수 있는 곳만 따로 결정.

- [x] move 생성
  -   from, to 위치를 받아 type별로 possiblePosition 메소드를 사용해, 가능 한 위치라면 이동하여 board를 업데이트 해준다.

```javascript
// B7->B6(화이트 폰 이동) 이동, A2->A3(블랙 폰 이동), B8->C6(화이트 나이트 이동), A1->A2(블랙 룩 이동), C8->A6(화이트 비숍 이동)

const board = new Board();

board.init();

board.move("B7", "B6");
board.display();

board.move("A2", "A3");
board.display();

board.move("B8", "C6");
board.display();

board.move("A1", "A2");
board.display();

board.move("C8", "A6");
board.display();
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
