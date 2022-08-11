import readline from "readline";
import { Create_Table } from "./create.js";
import { Insert_Into } from "./insert.js";
import { Delete_From } from "./delete.js";
import { Update } from "./update.js";
import { Select_From } from "./select.js";
import { Drop_Table } from "./drop.js";
import { Report_Table } from "./report.js";
import { Export_Table } from "./export.js";
import { Import_Table } from "./import.js";

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
    } else if (temp.toUpperCase() === "SELECT") {
      let select = new Select_From(input);
      select.select();
    } else if (temp.toUpperCase() === "DROP") {
      let drop = new Drop_Table(input);
      drop.drop();
    } else if (temp.toUpperCase() === "REPORT") {
      let report = new Report_Table(input);
      report.report();
    } else if (temp.toUpperCase() === "EXPORT") {
      let exp = new Export_Table(input);
      exp.export();
    } else if (temp.toUpperCase() === "IMPORT") {
      let imp = new Import_Table(input);
      imp.import();
    }
  }
});
