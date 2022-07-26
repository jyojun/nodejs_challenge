import { file, rank } from "./enum.js";
import { in_range } from "./common.js";
import Piece from "./Piece.js";

class Bishop extends Piece {
  possiblePosition() {
    let row = this.position.row;
    let col = this.position.col;
    let result = [];
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

// const bishop = new Bishop("bishop", "C1", "black");
// const bishop2 = new Bishop("bishop", "F8", "white");

// console.log(bishop.possiblePosition());
// console.log(bishop2.possiblePosition());

export default Bishop;
