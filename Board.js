import { file, rank } from "./enum.js";

import Pawn from "./Pawn.js";
import Knight from "./Knight.js";
import Bishop from "./Bishop.js";
import Rook from "./Rook.js";
import Queen from "./Queen.js";

import { possible_piece, is_max_piece, move_possible } from "./common.js";

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
    this.turn = "white";
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
    this.score();
    console.log("\n");
    if (this.turn === "black") {
      console.log("블랙 체스말의 차례입니다.\n");
    } else {
      console.log("백색 체스말의 차례입니다.\n");
    }
  }

  score() {
    let black_score = 0;
    let white_score = 0;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.board[i][j] === ".") {
          continue;
        } else {
          const type = this.board[i][j].type;
          const color = this.board[i][j].color;

          if (type === "pawn") {
            if (color === "white") {
              white_score++;
            } else {
              black_score++;
            }
          } else if (type === "knight") {
            if (color === "white") {
              white_score += 3;
            } else {
              black_score += 3;
            }
          } else if (type === "bishop") {
            if (color === "white") {
              white_score += 3;
            } else {
              black_score += 3;
            }
          } else if (type === "rook") {
            if (color === "white") {
              white_score += 5;
            } else {
              black_score += 5;
            }
          } else if (type === "queen") {
            if (color === "white") {
              white_score += 9;
            } else {
              black_score += 9;
            }
          }
        }
      }
    }

    console.log(
      "White's score :",
      white_score,
      "Black's score:",
      black_score,
      "\n"
    );
  }
  // 체스판 초기화
  init() {
    console.log("체스보드를 초기화했습니다.\n");
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

    this.display();
  }

  initPiece(type, position) {
    let row = rank[position[1]];
    let col = file[position[0]];
    let board = this.board;
    let p;
    let color;
    if (position[1] === "1" || position[1] === "2") {
      color = "black";
    } else {
      color = "white";
    }

    // 색상별로 폰 8개, 나이트, 비숍, 룩 2개씩, 퀸은 1개
    if (is_max_piece(type, this.types[color][type])) {
      console.log(type, "더 이상 말을 둘 수 없습니다.");
      return;
    }

    // console.log(color, row, col);
    // console.log(possible_piece(color, type, row, col));
    if (possible_piece(board, color, type, row, col)) {
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
  possible_move(from) {
    let from_pos = { row: rank[from[1]], col: file[from[0]] };
    let p = this.board[from_pos.row][from_pos.col];

    if (p.color !== this.turn) {
      console.log(p.color, "의 차례가 아닙니다.");
      return;
    }
    let temp = move_possible(this.board, p.color, p.type, p.possiblePosition());

    console.log(temp.join(" "));
  }
  move(from, to) {
    let from_pos = { row: rank[from[1]], col: file[from[0]] };
    let to_pos = { row: rank[to[1]], col: file[to[0]] };
    let p = this.board[from_pos.row][from_pos.col];

    if (p === ".") {
      console.log("시작 자리가 비어있습니다.");
      return;
    }
    if (this.board[to_pos.row][to_pos.col] !== ".") {
      console.log("도착 자리가 비어있지 않습니다.");
      return;
    }

    if (this.turn !== p.color) {
      console.log(p.color, "차례가 아닙니다.");
    }

    if (p !== "." && this.turn === p.color) {
      let temp = move_possible(
        this.board,
        p.color,
        p.type,
        p.possiblePosition()
      );

      if (temp.includes(to)) {
        // 도착 방향을 포함 할 때,

        // 도착지가 빈칸이라면
        if (this.board[to_pos.row][to_pos.col] === ".") {
          this.board[from_pos.row][from_pos.col] = "."; // 출발점은 빈칸으로 바뀜
          this.board[to_pos.row][to_pos.col] = p;
        } else {
          // 상대편이 있었다면,
          this.board[from_pos.row][from_pos.col] = "."; // 출발점은 빈칸으로 바뀜
          this.board[to_pos.row][to_pos.col] = p;
          console.log("상대방을 잡았습니다.");
        }
      } else {
        console.log("이동할 수 없는 위치입니다.");
        return;
      }
    }

    // 차례를 변경
    if (this.turn === "white") {
      this.turn = "black";
    } else {
      this.turn = "white";
    }
  }
}

export default Board;
