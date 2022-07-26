import { file, rank } from "./enum.js";
import Piece from "./Piece.js";
import { in_range } from "./common.js";

class Rook extends Piece {
  possiblePosition() {
    let row = this.position.row;
    let col = this.position.col;
    let result = [];

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

    return result;
  }
}

const rook = new Rook("rook", "A1", "black");
const rook2 = new Rook("rook", "H8", "white");

console.log(rook.possiblePosition());
console.log(rook2.possiblePosition());
