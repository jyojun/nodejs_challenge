import { file, rank } from "./enum.js";
import { in_range } from "./common.js";
import Piece from "./Piece.js";

class Bishop extends Piece {
  possiblePosition() {
    let row = this.position.row;
    let col = this.position.col;

    // 대각선 4방향
    let dir1 = [];
    let dir2 = [];
    let dir3 = [];
    let dir4 = [];
    let result = [];
    for (let i = 1; i < 8; i++) {
      if (in_range(row + i, col + i))
        dir1.push(file[String(col + i)] + String(row + i + 1));
      if (in_range(row + i, col - i))
        dir2.push(file[String(col - i)] + String(row + i + 1));
      if (in_range(row - i, col - i))
        dir3.push(file[String(col - i)] + String(row - i + 1));
      if (in_range(row - i, col + i))
        dir4.push(file[String(col + i)] + String(row - i + 1));
    }
    result.push(dir1);
    result.push(dir2);
    result.push(dir3);
    result.push(dir4);
    return result;
  }
}

// const bishop = new Bishop("bishop", "C1", "black");
// const bishop2 = new Bishop("bishop", "F8", "white");

// console.log(bishop.possiblePosition());
// console.log(bishop2.possiblePosition());

export default Bishop;
