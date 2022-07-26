const black_pawn = "\u265f";
const black_knight = "\u265e";
const black_bishop = "\u265d";
const black_rook = "\u265d";
const black_queeen = "\u265c";

const white_pawn = "\u2659";
const white_knight = "\u2658";
const white_biship = "\u2657";
const white_rook = "\u2656";
const white_queen = "\u2655";

class Board {
  constructor() {
    this.board = [
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "."],
    ];
  }
  // 체스판 출력
  display() {
    console.log("  A B C D E F G H\t");
    for (let i = 0; i < 8; i++) {
      let row = `${i + 1} `;
      for (let j = 0; j < 8; j++) {
        if (this.board[i][j] === ".") {
          row += ". ";
        }
      }
      console.log(row);
    }
    console.log("  A B C D E F G H\t");
  }
  // 체스판 초기화
  initPiece(type, position) {
    // if (type === "pawn") {
    //   p = new Pawn();
    // }
  }
  setPiece(type, position) {}
}

const board = new Board();

board.display();
