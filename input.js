import readline from "readline";
import { POS, menu } from "./index.js";

const pos = new POS();
let temp = Array(...menu[1]);
pos.queue["waiting"].push(temp);
temp = Array(...menu[1]);
pos.queue["waiting"].push(temp);
console.log(pos.queue);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
  if (input) {
    let temp = input.split(":");
    pos.queue["waiting"].push(Array(...menu[temp[0]]));
    console.log(pos.queue);
  }
});
