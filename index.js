const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let keyword = "";
rl.on("line", function (line) {
  keyword = line;
  rl.close();
}).on("close", function () {
  process.exit();
});

console.log(keyword);
