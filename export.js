import fs from "fs";

const re = /([a-zA-Z]+) +([a-zA-Z]+) +([a-zA-Z0-9_]+) +([a-zA-Z]+) +([a-zA-Z0-9_]+) +([a-zA-Z]+) +([a-zA-Z0-9_]+) +([>=<]) +([a-zA-Z0-9_"']+)/;

export class Export_Table {
  constructor(command) {
    let temp = re.exec(command);
    this.to_name = temp[3];
    this.from_name = temp[5];
    this.cond_column = temp[7];
    this.cond_sign = temp[8];
    this.cond_value = temp[9];
  }

  export() {
    if (!fs.existsSync(`./${this.from_name}.csv`)) {
      console.log("테이블이 존재하지 않습니다.");
      return;
    }

    let data = fs
      .readFileSync(`./${this.from_name}.csv`, { encoding: "utf-8" })
      .split("\n");

    let head = data[0];

    let cond_col_idx;

    // condition 에서 비교할 column의 index 번호를 저장.
    head.split(",").map((h, idx) => {
      if (h.slice(1) === this.cond_column) cond_col_idx = idx;
    });

    let cnt = 0;
    let result = "";

    // 맨뒤 공백
    data = data.slice(0, data.length - 1);
    data = data.splice(1).forEach((d) => {
      //   console.log(d.split(",")[cond_col_idx], this.cond_value);
      if (d.split(",")[cond_col_idx] === this.cond_value) {
        result += `${d}` + "\n";
        cnt++;
      }
    });

    if (cnt <= 0) {
      console.log("조건에 맞는 데이터가 없습니다.");
      return;
    }

    console.log(`EXPORT COUNT = ${cnt}`);
    console.log(result);

    fs.writeFileSync(`./${this.to_name}.csv`, result, { encoding: "utf-8" });

    console.log(`Exported to ${this.to_name} from ${this.from_name}`);
  }
}

// const command = `EXPORT TO y2022song FROM a WHERE year = 2022`;

// const exp = new Export_Table(command);
// exp.export();
