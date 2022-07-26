import { file, rank } from "./enum.js";

import Pawn from "./Pawn.js";
import Knight from "./Knight.js";
import Bishop from "./Bishop.js";
import Rook from "./Rook.js";
import Queen from "./Queen.js";

import { possible_piece } from "./common.js";

const black_pawn = "\u265f";
const black_knight = "\u265e";
const black_bishop = "\u265d";
const black_rook = "\u265d";
const black_queen = "\u265c";

const white_pawn = "\u2659";
const white_knight = "\u2658";
const white_bishop = "\u2657";
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
    this.types = {
      white: { pawn: 0, knight: 0, bishop: 0, rook: 0, queen: 0 },
      black: { pawn: 0, knight: 0, bishop: 0, rook: 0, queen: 0 },
    };
  }
  // 체스판 출력
  display() {
    console.log("  A B C D E F G H\t");
    for (let i = 0; i < 8; i++) {
      let row = `${i + 1} `;
      for (let j = 0; j < 8; j++) {
        if (this.board[i][j] === ".") {
          row += ". ";
        } else {
          const type = this.board[i][j].type;
          const color = this.board[i][j].color;

          if (type === "pawn") {
            if (color === "white") {
              row += white_pawn + " ";
            } else {
              row += black_pawn + " ";
            }
          } else if (type === "knight") {
            if (color === "white") {
              row += white_knight + " ";
            } else {
              row += black_knight + " ";
            }
          } else if (type === "bishop") {
            if (color === "white") {
              row += white_bishop + " ";
            } else {
              row += black_bishop + " ";
            }
          } else if (type === "rook") {
            if (color === "white") {
              row += white_rook + " ";
            } else {
              row += black_rook + " ";
            }
          } else if (type === "queen") {
            if (color === "white") {
              row += white_queen + " ";
            } else {
              row += black_queen + " ";
            }
          }
        }
      }
      console.log(row);
    }
    console.log("  A B C D E F G H\t");
  }
  // 체스판 초기화
  init() {
    console.log("체스판 초기화");
    // 검은 폰 A2 ~ H2
    this.initPiece("pawn", "A2");
    this.initPiece("pawn", "B2");
    this.initPiece("pawn", "C2");
    this.initPiece("pawn", "D2");
    this.initPiece("pawn", "E2");
    this.initPiece("pawn", "F2");
    this.initPiece("pawn", "G2");
    this.initPiece("pawn", "H2");

    // 검은 나이트 B1, G1
    this.initPiece("knight", "B1");
    this.initPiece("knight", "G1");

    // 검은 비숍 C1, F1
    this.initPiece("bishop", "C1");
    this.initPiece("bishop", "F1");

    // 검은 룩 A1, H1
    this.initPiece("rook", "A1");
    this.initPiece("rook", "H1");

    // 검은 퀸 E1
    this.initPiece("queen", "E1");

    // 하얀 폰 A7 ~ H7
    this.initPiece("pawn", "A7");
    this.initPiece("pawn", "B7");
    this.initPiece("pawn", "C7");
    this.initPiece("pawn", "D7");
    this.initPiece("pawn", "E7");
    this.initPiece("pawn", "F7");
    this.initPiece("pawn", "G7");
    this.initPiece("pawn", "H7");

    // 하얀 나이트 B8, G8
    this.initPiece("knight", "B8");
    this.initPiece("knight", "G8");

    // 하얀 비숍 C8, F8
    this.initPiece("bishop", "C8");
    this.initPiece("bishop", "F8");

    // 하얀 룩 A8, H8
    this.initPiece("rook", "A8");
    this.initPiece("rook", "H8");

    // 하얀 퀸 E8
    this.initPiece("queen", "E8");
  }

  initPiece(type, position) {
    let row = rank[position[1]];
    let col = file[position[0]];
    let p;
    let color;
    if (position[1] === "1" || position[1] === "2") {
      color = "black";
    } else {
      color = "white";
    }

    // console.log(color, row, col);
    // console.log(possible_piece(color, type, row, col));
    if (possible_piece(color, type, row, col)) {
      if (type === "pawn") p = new Pawn(type, position, color);
      if (type === "knight") p = new Knight(type, position, color);
      if (type === "bishop") p = new Bishop(type, position, color);
      if (type === "rook") p = new Rook(type, position, color);
      if (type === "queen") p = new Queen(type, position, color);
    } else {
      console.log(type, "여기에 배치할 수 없습니다.");
      return;
    }

    this.types[color][type]++;
    this.board[row][col] = p;
  }
  setPiece(type, position) {}
  move(from, to) {}
}

const board = new Board();

board.init();
board.display();
