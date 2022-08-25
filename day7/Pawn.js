import { file, rank } from "./enum.js";
import Piece from "./Piece.js";

class Pawn extends Piece {
  possiblePosition() {
    let row = this.position.row;
    let col = this.position.col;
    let result = [];

    // white pawn은 위로 올라간다
    if (this.color === "white") {
      row--;
      if (row >= 0) result.push(file[String(col)] + String(row + 1));
    } else {
      // black pawn은 아래로 내려간다.
      row++;
      if (row < 8) result.push(file[String(col)] + String(row + 1));
    }
    return result;
  }
}

// const pawn = new Pawn("pawn", "A2", "black");
// const pawn2 = new Pawn("pawn", "F7", "white");

// console.log(pawn.possiblePosition());
// console.log(pawn2.possiblePosition());

export default Pawn;
