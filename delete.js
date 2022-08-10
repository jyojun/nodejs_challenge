import fs from "fs";

const re = / +/g;

export class Delete_From {
  constructor(command) {
    let temp = command.toUpperCase().indexOf("WHERE");

    this.name = command.slice(0, temp).split(re)[2];
    this.condition = command.slice(temp + 5).replaceAll(" ", "");
  }

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

    head.split(",").map((h, idx) => {
      if (h.slice(1) === conds[Object.keys(conds)[0]][0]) cond_idx = idx;
    });

    let result = head + "\n";
    let cnt = 0;
    let deleted_data = [];

    data = data.splice(0, data.length - 1);
    if (Object.keys(conds)[0] === "=") {
      data = data.splice(1).forEach((d) => {
        console.log(d.split(",")[cond_idx], conds["="][1]);
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

    if (cnt <= 0) {
      console.log("조건에 맞는 데이터가 존재하지 않습니다.");
      return;
    }
    fs.writeFileSync(`./${this.name}.csv`, result, {
      encoding: "utf-8",
    });

    deleted_data.forEach((d) => console.log(`${d} 삭제됨.`));
  }
}
