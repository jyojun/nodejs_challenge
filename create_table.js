import fs from "fs";

class Create_Table {
  constructor(command) {
    let temp = command
      .replace("(", "")
      .replace(")", "")
      .replaceAll(",", "")
      .split(" ");
    let table_name = temp[2];
    let headers = temp.splice(3, temp.length - 1);
    let columns = headers.filter((h, idx) => idx % 2 === 0);
    let types = headers.filter((h, idx) => idx % 2 !== 0);

    if (columns.length > 9) throw Error("columns should be not more than 9");

    this.name = table_name;
    this.columns = columns;
    this.types = types;
    this.result = "";
  }

  stringify() {
    this.columns = this.columns.map((c, idx) => {
      if (this.types[idx] === "String") return "+" + c;
      else if (this.types[idx] === "Numeric") return "-" + c;
      else throw Error("Only Numeric or String datatype allowed");
    });
    this.result = "-id," + this.columns.join(",") + "\n";
  }

  create() {
    this.stringify();
    if (fs.existsSync(`./${this.name}.csv`)) {
      throw Error("table already exists");
    } else {
      fs.writeFileSync("./test.csv", this.result, { encoding: "utf-8" });
    }
  }
}

const create_table = new Create_Table(
  "CREATE TABLE test (name String, year Numeric, song String)"
);

// const create_table2 = new Create_Table(
//   "CREATE TABLE test (nick_name String, year Numeric, song String)"
// );

create_table.create();
// create_table2.create();
