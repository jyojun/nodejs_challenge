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
  ![image](https://user-images.githubusercontent.com/64758931/181076410-a2a34647-2b95-4600-ae34-2ed6aa0a2449.png)

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
    ![image](https://user-images.githubusercontent.com/64758931/181076556-9ab8b8ad-da7c-46c8-a37b-bcce1f46d2e7.png)

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
    ![image](https://user-images.githubusercontent.com/64758931/181076711-ea6c5111-8b02-4a80-88f5-272ca7564250.png)
- [x] Queen class 생성
  -  possiblePosition() -> Rook + Bishop 합침. 
  -  실행 결과
    ```javascript
  const queen = new Queen("queen", "E1", "black");
  const queen2 = new Queen("queen", "E8", "white");

  console.log(queen.possiblePosition());
  console.log(queen2.possiblePosition());
    ```
    ![image](https://user-images.githubusercontent.com/64758931/181076853-7daadc55-b134-4e6d-88d4-c384bb9c528f.png)
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
![image](https://user-images.githubusercontent.com/64758931/181075965-aaa46d01-3604-4882-93ac-5e8a5643051b.png)

- A7->A6, A2->A3, B8->C6(나이트 앞쪽이 막혀있어서 이동할 수 없음.) 

![image](https://user-images.githubusercontent.com/64758931/181077550-583d93e1-f745-4bee-8279-1e8e1a5d36be.png)


- 예제 실행결과

![image](https://user-images.githubusercontent.com/64758931/181084969-28b08f06-495c-479e-8697-b37018d7dfdd.png)


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
