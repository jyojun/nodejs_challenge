import { file, rank } from "./enum.js";
import Piece from "./Piece.js";
import { in_range } from "./common.js";

class Queen extends Piece {
  possiblePosition() {
    let row = this.position.row;
    let col = this.position.col;
    let result = [];

    // 8방향
    let dir1 = [];
    let dir2 = [];
    let dir3 = [];
    let dir4 = [];
    let dir5 = [];
    let dir6 = [];
    let dir7 = [];
    let dir8 = [];
    // Rook, Bishop이 움직이는 모든 칸을 갈 수 있다. (대각선, 직선)
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
    for (let i = 1; i < 8; i++) {
      if (in_range(row + i, col + i))
        dir5.push(file[String(col + i)] + String(row + i + 1));
      if (in_range(row + i, col - i))
        dir6.push(file[String(col - i)] + String(row + i + 1));
      if (in_range(row - i, col - i))
        dir7.push(file[String(col - i)] + String(row - i + 1));
      if (in_range(row - i, col + i))
        dir8.push(file[String(col + i)] + String(row - i + 1));
    }

    result.push(dir1);
    result.push(dir2);
    result.push(dir3);
    result.push(dir4);
    result.push(dir5);
    result.push(dir6);
    result.push(dir7);
    result.push(dir8);

    return result;
  }
}

// const queen = new Queen("queen", "E1", "black");
// const queen2 = new Queen("queen", "E8", "white");

// console.log(queen.possiblePosition());
// console.log(queen2.possiblePosition());

export default Queen;
