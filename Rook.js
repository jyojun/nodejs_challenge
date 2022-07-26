import { file, rank } from "./enum.js";
import Piece from "./Piece.js";
import { in_range } from "./common.js";

class Rook extends Piece {
  possiblePosition() {
    let row = this.position.row;
    let col = this.position.col;

    // 좌 우 위 아래 4방향
    let dir1 = [];
    let dir2 = [];
    let dir3 = [];
    let dir4 = [];
    let result = [];

    for (let i = 1; i < 8; i++) {
      if (in_range(row + i, col))
        dir1.push(file[String(col)] + String(row + i + 1));
      if (in_range(row - i, col))
        dir2.push(file[String(col)] + String(row - i + 1));
      if (in_range(row, col + i))
        dir3.push(file[String(col + i)] + String(row + 1));
      if (in_range(row, col - i))
        dir4.push(file[String(col - i)] + String(row + 1));
    }
    result.push(dir1);
    result.push(dir2);
    result.push(dir3);
    result.push(dir4);
    return result;
  }
}

// const rook = new Rook("rook", "A1", "black");
// const rook2 = new Rook("rook", "H8", "white");

// console.log(rook.possiblePosition());
// console.log(rook2.possiblePosition());

export default Rook;
