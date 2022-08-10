import readline from "readline";
import { Create_Table } from "./create.js";
import { Insert_Into } from "./insert.js";
import { Delete_From } from "./delete.js";
import { Update } from "./update.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
  if (input === "quit") {
    rl.close();
  } else {
    let temp = input.split(" ")[0];
    if (temp.toUpperCase() === "CREATE") {
      let create = new Create_Table(input);
      create.create();
    } else if (temp.toUpperCase() === "INSERT") {
      let insert = new Insert_Into(input);
      insert.insert();
    } else if (temp.toUpperCase() === "DELETE") {
      let del = new Delete_From(input);
      del.delete();
    } else if (temp.toUpperCase() === "UPDATE") {
      let update = new Update(input);
      update.update();
    }
  }
});
