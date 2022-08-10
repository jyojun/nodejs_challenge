import readline from "readline";
import { Create_Table } from "./create.js";
import { Insert_Into } from "./insert.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
  if (input === "quit") {
    rl.close();
  } else {
    let temp = input.split(" ")[0];
    console.log(temp);
    if (temp.toUpperCase() === "CREATE") {
      let create = new Create_Table(input);
      create.create();
    } else if (temp.toUpperCase() === "INSERT") {
      console.log(input);
      let insert = new Insert_Into(input);
      insert.insert();
    }
  }
});
