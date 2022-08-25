import { file, rank } from "./enum.js";
import Piece from "./Piece.js";
class Knight extends Piece {
  possiblePosition() {
    let row = this.position.row;
    let col = this.position.col;
    let result = [];

    // 8가지 전진방향, 도착방향 동시에 저장
    let steps = [
      {
        front: { row: row + 1, col: col },
        row: row + 2,
        col: col + 1,
      },
      {
        front: { row: row, col: col + 1 },
        row: row + 1,
        col: col + 2,
      },
      {
        front: { row: row, col: col + 1 },
        row: row - 1,
        col: col + 2,
      },
      {
        front: { row: row - 1, col: col },
        row: row - 2,
        col: col + 1,
      },
      {
        front: { row: row, col: col - 1 },
        row: row - 1,
        col: col - 2,
      },
      {
        front: { row: row - 1, col: col },
        row: row - 2,
        col: col - 1,
      },
      {
        front: { row: row, col: col - 1 },
        row: row + 1,
        col: col - 2,
      },
      {
        front: { row: row + 1, col: col },
        row: row + 2,
        col: col - 1,
      },
    ];

    for (let i = 0; i < steps.length; i++) {
      if (
        steps[i].row >= 0 &&
        steps[i].row < 8 &&
        steps[i].col >= 0 &&
        steps[i].col < 8
      ) {
        result.push([
          file[String(steps[i].front.col)] + String(steps[i].front.row + 1),
          file[String(steps[i].col)] + String(steps[i].row + 1),
        ]);
      }
    }
    return result;
  }
}

// const knight = new Knight("knight", "B1", "black");
// const knight2 = new Knight("knight", "G8", "white");

// console.log(knight.possiblePosition());
// console.log(knight2.possiblePosition());

export default Knight;
