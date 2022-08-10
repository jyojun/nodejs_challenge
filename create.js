import fs from "fs";

const re = / +/g;
export class Create_Table {
  constructor(command) {
    let temp = command
      .replace("(", "")
      .replace(")", "")
      .replaceAll(",", "")
      .split(re);
    let table_name = temp[2];
    let headers = temp.splice(3, temp.length - 1);
    let columns = headers.filter((h, idx) => idx % 2 === 0);
    let types = headers.filter((h, idx) => idx % 2 !== 0);

    if (columns.length > 9) {
      console.log("칼럼수는 9개 미만!");
      return;
    }
    this.name = table_name;
    this.columns = columns;
    this.types = types;
    this.result = "";
  }

  // 테이블을 만들기 위해 헤더를 scv string 형태로 만든다.
  stringify() {
    this.columns = this.columns.map((c, idx) => {
      if (this.types[idx] === "String") return "+" + c;
      else if (this.types[idx] === "Numeric") return "-" + c;
      else throw Error("Only Numeric or String datatype allowed");
    });
    this.result = "-id," + this.columns.join(",") + "\n";
  }

  // csv style string 을 만들고 write
  create() {
    this.stringify();
    if (fs.existsSync(`./${this.name}.csv`)) {
      console.log("이미 테이블이 존재합니다.");
      return;
    } else {
      fs.writeFileSync(`./${this.name}.csv`, this.result, {
        encoding: "utf-8",
      });
      console.log(`${this.name} table created!`);
    }
  }
}

// const create_table = new Create_Table(
//   "CREATE TABLE test (name String, year Numeric, song String)"
// );

// const create_table2 = new Create_Table(
//   "CREATE TABLE test (nick_name String, year Numeric, song String)"
// );

// create_table.create();
// create_table2.create();
