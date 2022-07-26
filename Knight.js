import { file, rank } from "./enum.js";
import Piece from "./Piece.js";
class Knight extends Piece {
  possiblePosition() {
    let row = this.position.row;
    let col = this.position.col;
    let result = [];

    // 8가지
    let steps = [
      {
        row: row + 2,
        col: col + 1,
      },
      {
        row: row + 1,
        col: col + 2,
      },
      {
        row: row - 1,
        col: col + 2,
      },
      {
        row: row - 2,
        col: col + 1,
      },
      {
        row: row - 1,
        col: col - 2,
      },
      {
        row: row - 2,
        col: col - 1,
      },
      {
        row: row + 1,
        col: col - 2,
      },
      {
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
        result.push(file[String(steps[i].col)] + String(steps[i].row + 1));
      }
    }
    return result;
  }
}

const knight = new Knight("knight", "B1", "black");
const knight2 = new Knight("knight", "G8", "white");

console.log(knight.possiblePosition());
console.log(knight2.possiblePosition());
