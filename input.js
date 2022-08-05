import readline from "readline";
import { get_link } from "./parser.js";
import { Counter } from "./counter.js";
import chalk from "chalk";
const regexp = /([^:\/\s]+)(:([^\/]*))?((\/[^\s/\/]+)*)?\/([^#\s\?]*)(\?([^#\s]*))?(#(\w*))?$/;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question("> https://", function (line) {
  // if (line.match(regexp)) {
  console.log(
    chalk.green.inverse(
      "=======================START HTTP PARSING====================="
    )
  );
  get_link("https://" + line);
  // } else {
  // console.log("please enter valide url");
  rl.close();
  // }
});
