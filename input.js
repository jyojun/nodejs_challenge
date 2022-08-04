import readline from "readline";
import { get_link } from "./index.js";
import { Counter } from "./counter.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question("> ", function (line) {
  get_link(line);
  rl.close();
});
