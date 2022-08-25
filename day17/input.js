import readline from "readline";
import { Manager, menu } from "./manager.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// console.log("요리사, 배달기사 수를 입력하세요 예) 2 3");

let deliverer_count;
let chef_count;
let manager;

rl.question("요리사, 배달기사 수를 입력하세요 예) 2 3 >", (input) => {
  console.log(input);
  chef_count = input.split(" ")[0];
  deliverer_count = input.split(" ")[1];
  manager = new Manager(chef_count, deliverer_count);
});

// manager.queue["waiting"].push([...menu[1]]);
// manager.queue["waiting"].push([...menu[2]]);
// console.log(manager.queue);

rl.on("line", (input) => {
  if (input === "quit") {
    rl.close();
  } else {
    let temp = input.split(",");
    let customer = temp[0];
    let food_num = parseInt(temp[1].split(":")[0]);
    let food_time = parseInt(temp[1].split(":")[1]);
    console.log(customer, food_num, food_time);
    manager.order(customer, [...menu[food_num]], food_time);
  }
});
