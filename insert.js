import fs from "fs";

const command =
  "INSERT INTO test (singer, year, song) VALUES (BTS, 2020, Dynamite)";
const re = / +/g;
// let temp = command
//   .replaceAll("(", "")
//   .replaceAll(")", "")
//   .replaceAll(",", "")
//   .split(re);

// console.log(temp);
// let table_name = temp[2];
// temp = temp.splice(3, temp.length - 1);
// console.log(temp);
// let columns = temp.splice(0, temp.indexOf("VALUES"));
// let values = temp.splice(temp.indexOf("VALUES") + 1, temp.length - 1);
// console.log(columns, values);

// const data = fs.readFileSync("./test.csv", { encoding: "utf-8" });

// let lastId;
// if (data.split("\n").length <= 2) {
//   lastId = 0;
// } else {
//   lastId = parseInt(
//     data.split("\n")[data.split("\n").length - 2].split(",")[0]
//   );
// }
// console.log(lastId);

// const insertData = `${++lastId},` + values.join(",") + "\n";
// fs.appendFileSync("./test.csv", insertData, { encoding: "utf-8" });

class Insert_Into {
  constructor(command) {
    let temp = command
      .replaceAll("(", "")
      .replaceAll(")", "")
      .replaceAll(",", "")
      .split(re);
    let table_name = temp[2];
    temp = temp.splice(3, temp.length - 1);
    let columns = temp.splice(0, temp.indexOf("VALUES"));
    let values = temp.splice(temp.indexOf("VALUES") + 1, temp.length - 1);

    if (columns.length !== values.length)
      throw Error("Values shouldn't be null");
    this.name = table_name;
    this.columns = columns;
    this.values = values;
    this.lastId;
  }
  getLastId() {
    if (!fs.existsSync(`./${this.name}.csv`))
      throw Error("Table does not exists");
    let data = fs.readFileSync(`./${this.name}.csv`, { encoding: "utf-8" });
    if (data.split("\n").length <= 2) {
      this.lastId = 1;
    } else {
      this.lastId = parseInt(
        data.split("\n")[data.split("\n").length - 2].split(",")[0]
      );
    }
  }

  insert() {
    this.getLastId();
    const insertData = `${++this.lastId},` + this.values.join(",") + "\n";
    fs.appendFileSync("./test.csv", insertData, { encoding: "utf-8" });
  }
}

const insert = new Insert_Into(
  "INSERT INTO test (singer, year, song) VALUES (BTS, 2022, Dynamite)"
);

insert.insert();
