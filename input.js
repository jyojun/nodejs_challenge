import readline from "readline";
import { Manager, menu } from "./index.js";

const manager = new Manager();
manager.queue["waiting"].push([...menu[1]]);
manager.queue["waiting"].push([...menu[2]]);
console.log(manager.queue);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
  if (input === "quit") {
    rl.close();
  } else {
    let temp = input.split(":");
    manager.order([...menu[temp[0]]], parseInt(temp[1]));
  }
});
