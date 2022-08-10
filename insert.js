import fs from "fs";

const command =
  "INSERT INTO test (singer, year, song) VALUES (BTS, 2020, Dynamite)";
const re = / +/g;

export class Insert_Into {
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

    this.name = table_name;
    this.columns = columns;
    this.values = values;
    this.lastId;

    if (columns.length !== values.length) {
      console.log("칼럼과 값의 갯수가 다릅니다.");
      return;
      // throw Error("Values shouldn't be null");
    }
  }
  getLastId() {
    if (!fs.existsSync(`./${this.name}.csv`)) {
      console.log("테이블이 존재하지 않습니다.");
      return;
      //   throw Error("Table does not exists");
    }
    let data = fs.readFileSync(`./${this.name}.csv`, { encoding: "utf-8" });

    if (data.split("\n")[0].split(",").length - 1 !== this.columns.length) {
      console.log("컬럼 갯수가 일치하지 않습니다.");
      return;
    }

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
    if (this.lastId === undefined) return;
    let types = [];
    let data = fs.readFileSync(`./${this.name}.csv`, { encoding: "utf-8" });
    data
      .split("\n")[0]
      .split(",")
      .splice(1)
      .forEach((d) => {
        if (d[0] === "-") types.push("Numeric");
        else if (d[0] === "+") types.push("String");
      });

    this.values = this.values.map((v, idx) => {
      if (types[idx] === "String") return `"${v}"`;
      else return v;
    });

    const insertData = `${++this.lastId},` + this.values.join(",") + "\n";
    fs.appendFileSync(`./${this.name}.csv`, insertData, { encoding: "utf-8" });

    console.log(
      `Successfully INSERTED INTO ${this.name} (${this.values.join(", ")})`
    );
  }
}

// const insert = new Insert_Into(
//   "INSERT INTO test (singer, year, song) VALUES (BTS, 2022, butter)"
// );

// insert.insert();
