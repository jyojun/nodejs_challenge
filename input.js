import readline from "readline";
import { ls, init, commit } from "./mit.js";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt("/>");
rl.prompt();
rl.on("line", function (line) {
  let order = line.split(" ");

  if (order[0] === "ls") {
    console.log(ls(order[1]));
  } else if (order[0] === "mit" && order[1] === "init") {
    let newRepo = order[2];
    init(newRepo);
  } else if (order[0] === "mit" && order[1] === "commit") {
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
