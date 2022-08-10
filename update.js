import fs from "fs";

// UPDATE table_name(영소문자, 숫자) SET 칼럼명 = 값 WHERE id = 1
const re = /([a-zA-Z]+) *([a-zA-Z0-9_]+) *([a-zA-Z]+) *([a-zA-Z_]+) *([>=<]) *([a-zA-Z0-9_"']+) *([a-zA-Z]+) *([a-zA-Z_]+) *([>=<]) *([a-zA-Z0-9_"']+)/;

export class Update {
  constructor(command) {
    let result = re.exec(command);
    this.name = result[2];
    this.set_column = result[4];
    this.set_value = result[6];
    this.cond_column = result[8];
    this.cond_sign = result[9];
    this.cond_value = result[10];
  }

  update() {
    if (!fs.existsSync(`./${this.name}.csv`)) {
      console.log("테이블이 존재하지 않습니다.");
      return;
    }

    let data = fs
      .readFileSync(`./${this.name}.csv`, { encoding: "utf-8" })
      .split("\n");

    let head = data[0];

    let cond_col_idx;
    let set_col_idx;

    // condition 에서 비교할 column의 index 번호, update 해줄 column index 를 저장.
    head.split(",").map((h, idx) => {
      if (h.slice(1) === this.cond_column) cond_col_idx = idx;
      if (h.slice(1) === this.set_column) set_col_idx = idx;
    });

    let updated_data = [];
    let cnt = 0;
    let result = head + "\n";

    // condition column idx 와 일치하는 데이터에서 update 해줄 columns 을 변경하여 result 에 넣어준다.
    data = data.splice(1).forEach((d) => {
      if (d.split(",")[cond_col_idx] === this.cond_value) {
        d = d.split(",").map((item, idx) => {
          if (idx === set_col_idx) {
            if (head.split(",")[set_col_idx][0] === "+")
              return `"${this.set_value}"`;
            return this.set_value;
          } else return item;
        });
        updated_data.push(d.join(","));
        result += d.join(",") + "\n";
        cnt++;
      } else {
        result += d + "\n";
      }
    });

    if (cnt <= 0) {
      console.log("조건에 맞는 데이터가 없습니다.");
      return;
    }

    // delete 한 값을 제외한 값을 새로 저장하여 기존 file에 overwrite 해준다.
    fs.writeFileSync(`./${this.name}.csv`, result, {
      encoding: "utf-8",
    });

    updated_data.forEach((data) => console.log(`(${data}) 업데이트!`));
  }
}

// const command = `UPDATE a SET year = 2018 where song = "Dynamite"`;

// const update = new Update(command);
// update.update();
