import fs from "fs";

const re = / +/g;

export class Delete_From {
  constructor(command) {
    let temp = command.toUpperCase().indexOf("WHERE");

    this.name = command.slice(0, temp).split(re)[2];
    this.condition = command.slice(temp + 5).replaceAll(" ", "");
  }

  // condition이 = > < 인지 check
  check_condition() {
    if (this.condition.includes("=")) {
      return { "=": this.condition.split("=") };
    } else if (this.condition.includes(">")) {
      return { ">": this.condition.split(">") };
    } else if (this.condition.includes("<")) {
      return { "<": this.condition.split("<") };
    }
  }

  delete() {
    if (!fs.existsSync(`./${this.name}.csv`)) {
      console.log("테이블이 존재하지 않습니다.");
      return;
    }

    let conds = this.check_condition();

    let data = fs
      .readFileSync(`./${this.name}.csv`, { encoding: "utf-8" })
      .split("\n");

    let head = data[0];

    let cond_idx;

    // condition 에서 비교할 columns의 index 번호를 저장.
    head.split(",").map((h, idx) => {
      if (h.slice(1) === conds[Object.keys(conds)[0]][0]) cond_idx = idx;
    });

    let result = head + "\n";
    let cnt = 0;
    let deleted_data = [];

    // 마지막 띄어쓰기 제거
    data = data.splice(0, data.length - 1);

    // 부등호별로 처리
    if (Object.keys(conds)[0] === "=") {
      data = data.splice(1).forEach((d) => {
        if (d.split(",")[cond_idx] !== conds["="][1]) result += d + "\n";
        else {
          deleted_data.push(d);
          cnt++;
        }
      });
    } else if (Object.keys(conds)[0] === ">") {
      data = data.splice(1).forEach((d) => {
        if (parseInt(d.split(",")[cond_idx]) <= parseInt(conds[">"][1]))
          result += d + "\n";
        else {
          deleted_data.push(d);
          cnt++;
        }
      });
    } else if (Object.keys(conds)[0] === "<") {
      data = data.splice(1).forEach((d) => {
        if (parseInt(d.split(",")[cond_idx]) >= parseInt(conds["<"][1]))
          result += d + "\n";
        else {
          deleted_data.push(d);
          cnt++;
        }
      });
    }
    // 지워진 값 overwrite

    // 지워준 값의 count가 0보다 작은경우 return
    if (cnt <= 0) {
      console.log("조건에 맞는 데이터가 존재하지 않습니다.");
      return;
    }

    // delete 한 값을 제외한 값을 새로 저장하여 기존 file에 overwrite 해준다.
    fs.writeFileSync(`./${this.name}.csv`, result, {
      encoding: "utf-8",
    });

    deleted_data.forEach((d) => console.log(`${d} 삭제됨.`));
  }
}
