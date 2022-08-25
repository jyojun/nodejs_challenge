import fs from "fs";

const re = /([a-zA-Z]+) +([a-zA-Z]+) +([a-zA-Z0-9_]+)/;
export class Report_Table {
  constructor(command) {
    let temp = re.exec(command);
    this.name = temp[3];
  }

  report() {
    if (!fs.existsSync(`./${this.name}.csv`)) {
      console.log("테이블이 존재하지 않습니다.");
      return;
    }

    let data = fs
      .readFileSync(`./${this.name}.csv`, { encoding: "utf-8" })
      .split("\n");

    let columns = [];
    let records = 0;
    data[0].split(",").forEach((d) => {
      columns.push(d.slice(1));
    });

    data = data.slice(1);

    console.log(`컬럼 종류 : ${columns.join(", ")}`);
    console.log(`전체 레코드 수 : ${data.length - 1}`);
    console.log(`최초 레코드 : (${data[0]})`);
    console.log(`마지막 레코드 : (${data[data.length - 2]})`);
  }
}
// const command = `REPORT TABLE a`;
// let report = new Report_Table(command);
// report.report();
