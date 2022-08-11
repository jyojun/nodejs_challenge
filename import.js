import fs from "fs";

const re = /([a-zA-Z]+) +([a-zA-Z]+) +([a-zA-Z0-9_]+) +([a-zA-Z]+) +([a-zA-Z0-9_]+)/;

export class Import_Table {
  constructor(command) {
    let temp = re.exec(command);
    this.from_name = temp[3];
    this.to_name = temp[5];
  }

  import() {
    if (
      !fs.existsSync(`./${this.from_name}.csv`) ||
      !fs.existsSync(`./${this.to_name}.csv`)
    ) {
      console.log("둘 중 하나 이상의 테이블이 존재하지 않습니다.");
      return;
    }

    let from_data = fs
      .readFileSync(`./${this.from_name}.csv`, { encoding: "utf-8" })
      .split("\n");

    let to_data = fs
      .readFileSync(`./${this.to_name}.csv`, { encoding: "utf-8" })
      .split("\n");

    let head = to_data[0];
    to_data = to_data.slice(1, to_data.length - 1); // 헤드 제거, 맨 뒤 공백 제거
    from_data = from_data.slice(1, from_data.length - 1);

    let cnt = 0;
    // console.log(from_data, to_data);
    from_data.forEach((d) => {
      if (!to_data.includes(d)) {
        to_data.push(d);
        cnt++;
      }
    });

    if (cnt <= 0) {
      console.log("겹치치 않는 데이터가 없습니다.");
      return;
    }
    // console.log(to_data);

    let result = head + "\n" + to_data.join("\n") + "\n";

    fs.writeFileSync(`./${this.to_name}.csv`, result, { encoding: "utf-8" });

    console.log(`Import to ${this.to_name} from ${this.from_name}`);
  }
}
// const command = `IMPORT FROM y2022song to a`;

// const imp = new Import_Table(command);

// imp.import();
