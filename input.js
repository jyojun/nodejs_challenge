const readline = require("readline");
const get_link = require("./index");
const { Counter } = require("./counter");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question("> ", function (line) {
  get_link(line);
  rl.close();
});

// get_link("https://m.naver.com");

const counter = new Counter();
counter.display();
