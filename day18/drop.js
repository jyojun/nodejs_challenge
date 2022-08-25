import fs from "fs";

const re = /([a-zA-Z]+) +([a-zA-Z]+) +([a-zA-Z0-9_]+)/;

export class Drop_Table {
  constructor(command) {
    let temp = re.exec(command);
    this.name = temp[3];
  }
  drop() {
    if (!fs.existsSync(`./${this.name}.csv`)) {
      console.log("테이블이 존재하지 않습니다.");
      return;
    }

    fs.unlinkSync(`./${this.name}.csv`);
    console.log(`${this.name} 삭제 되었습니다.`);
  }
}

// const command = `DROP TABLE b`;
// const drop = new Drop_Table(command);

// drop.drop();
