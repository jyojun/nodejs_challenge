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

rl.setPrompt("명령을 입력하세요> ");
rl.prompt(); // 입력 받기.
rl.on("line", (line) => {
  if (line.match(/[?][A-H][1-8]/)) {
    board.possible_move(line.slice(1));
  } else if (line.match(/[A-H][1-8]->[A-H][1-8]/)) {
    // console.log(line);
    board.move(line.substr(0, 2), line.substr(4, 6));
    board.display();
  } else if (line == "exit") {
    rl.close();
  } else {
    console.log("잘못된 형식입니다.");
  }
  rl.prompt();
});
