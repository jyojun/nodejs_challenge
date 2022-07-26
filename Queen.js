import { file, rank } from "./enum.js";
import Piece from "./Piece.js";
import { in_range } from "./common.js";

class Queen extends Piece {
  possiblePosition() {
    let row = this.position.row;
    let col = this.position.col;
    let result = [];

    // Rook, Bishop이 움직이는 모든 칸을 갈 수 있다. (대각선, 직선)
    for (let i = 1; i < 8; i++) {
      if (in_range(row + i, col))
        result.push(file[String(col)] + String(row + i + 1));
      if (in_range(row - i, col))
        result.push(file[String(col)] + String(row - i + 1));
      if (in_range(row, col + i))
        result.push(file[String(col + i)] + String(row + 1));
      if (in_range(row, col - i))
        result.push(file[String(col - i)] + String(row + 1));
    }
    for (let i = 1; i < 8; i++) {
      if (in_range(row + i, col + i))
        result.push(file[String(col + i)] + String(row + i + 1));
      if (in_range(row + i, col - i))
        result.push(file[String(col - i)] + String(row + i + 1));
      if (in_range(row - i, col - i))
        result.push(file[String(col - i)] + String(row - i + 1));
      if (in_range(row - i, col + i))
        result.push(file[String(col + i)] + String(row - i + 1));
    }

    return result;
  }
}

// const queen = new Queen("queen", "E1", "black");
// const queen2 = new Queen("queen", "E8", "white");

// console.log(queen.possiblePosition());
// console.log(queen2.possiblePosition());

export default Queen;
