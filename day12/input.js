import readline from "readline";
import { ls, init, commit, makeFile } from "./mit.js";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt("/>");
rl.prompt();
rl.on("line", function (line) {
  let order = line.split(" ");

  if (order[0] === "ls") {
    // ls 경로
    console.log(ls(order[1]));
  } else if (order[0] === "touch") {
    // touch 디렉토리명 파일명 내용
    let repo = order[1];
    let fileName = order[2];
    let content = order.slice(3).join(" ");
    makeFile(repo + "/", fileName, content);
  } else if (order[0] === "mit" && order[1] === "init") {
    // mit init 디렉토리명
    let newRepo = order[2];
    init(newRepo);
  } else if (order[0] === "mit" && order[1] === "commit") {
    // mit commit 디렉토리명
    let repo = order[2];
    commit(repo);
  } else if (order[0] === "quit") {
    rl.close();
    process.exit();
  } else {
    console.log("해당 명령어는 존재하지 않습니다.");
  }
  rl.prompt();
});
