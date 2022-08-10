import fs from "fs";

// SELECT FROM table_name(영소문자, 숫자, _) WHERE 칼럼명 = 값
const re = /([a-zA-Z]+) +([a-zA-Z]+) +([a-zA-Z0-9_]+) +([a-zA-Z]+) +([a-zA-Z0-9_]+) +([>=<]) +([a-zA-Z0-9_"']+)/;

console.log(re.exec(command));
export class Select_From {
  constructor(command) {
    let result = re.exec(command);
    this.name = result[3];
    this.cond_column = result[5];
    this.cond_sign = result[6];
    this.cond_value = result[7];
  }

  select() {
    if (!fs.existsSync(`./${this.name}.csv`)) {
      console.log("테이블이 존재하지 않습니다.");
      return;
    }

    let data = fs
      .readFileSync(`./${this.name}.csv`, { encoding: "utf-8" })
      .split("\n");

    let head = data[0];

    let cond_col_idx;

    // condition 에서 비교할 column의 index 번호를 저장.
    head.split(",").map((h, idx) => {
      if (h.slice(1) === this.cond_column) cond_col_idx = idx;
    });

    let cnt = 0;
    let result = [];

    data = data.splice(1).forEach((d) => {
      //   console.log(d.split(",")[cond_col_idx], this.cond_value);
      if (d.split(",")[cond_col_idx] === this.cond_value) {
        result.push(d);
        cnt++;
      }
    });

    if (cnt <= 0) {
      console.log("조건에 맞는 데이터가 없습니다.");
      return;
    }

    // console.log(result, cnt);
    console.log(`SELECTED COUNT = ${cnt}`);
    result.forEach((item) => console.log(`(${item}) 선택됨!`));
  }
}

// const command = `SELECT FROM a WHERE song = "Dynamite"`;
// let select = new Select_From(command);

// select.select();
