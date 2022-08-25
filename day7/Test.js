import readline from "readline";
import Board from "./board.js";

console.log("(프로그램 실행)");

const board = new Board();
// 체스판 초기화
board.init();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt("명령을 입력하세요 (종료 : 공백입력)> ");
rl.prompt(); // 입력 받기.
rl.on("line", (line) => {
  if (line.match(/[?][A-Z][0-9]/)) {
    // ?A2 형태
    board.possible_move(line.slice(1));
  } else if (line.match(/[A-Z][0-9]->[A-Z][0-9]/)) {
    // A6->A7 형태
    board.move(line[0] + line[1], line[4] + line[5]);
    board.display();
  } else if (line === "") {
    rl.close();
    return;
  } else {
    console.log("ex) ?A2 또는 A7->A6 와 같은 형식으로 입력해주세요.");
  }
  rl.prompt();
});
