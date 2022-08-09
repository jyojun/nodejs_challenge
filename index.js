export const menu = {
  1: ["라면", 3],
  2: ["떡볶이", 7],
  3: ["닭볶음탕", 15],
  4: ["갈비찜", 20],
};

let input = "1:2";

const food = input.split(":")[0];
const quantity = input.split(":")[1];

// console.log(`${menu[food][0]},${menu[food][1]}분 소요`);
// console.log(quantity);

export class Manager {
  constructor() {
    this.queue = {
      waiting: [],
      cooking: [],
      finished: [],
      delivering: [],
    };
  }
  start = new Promise((resolve) => {
    let cnt = 0;
    let tick = 0;
    const intervalId = setInterval(() => {
      // event looper
      console.clear();
      console.log(`======================메뉴=====================\n`);
      console.log(menu);
      console.log(`${tick} sec passed`);
      console.log(`====================주문 경과===================\n
      요리중 : /${this.queue["cooking"].join(",")}/\n
      대기중 : /${this.queue["waiting"].join(",")}/\n
      완성: /${this.queue["finished"].join(",")}`);
      if (
        this.queue["cooking"].length === 0 &&
        this.queue["waiting"].length > 0
      ) {
        // & cook.state = 'ready'
        let temp = this.queue["waiting"].shift();
        console.log(temp);
        this.queue["cooking"].push(temp); // 받은 주문 앞에 꺼 뽑아서 주문 대기큐에 집어넣음

        console.log(temp[0], "요리 시작!", `${temp[1]}분 소요 예상..`);
        cnt = 0;
      } else if (this.queue["cooking"].length > 0) {
        console.log(
          `${this.queue["cooking"][0][0]} 요리중~ 완성까지 ${this.queue["cooking"][0][1]}분 남음`
        );

        if (this.queue["cooking"][0][1] <= 0) {
          let temp = [...this.queue["cooking"].shift()];
          console.log(temp[0], "요리 완료!");
          this.queue["finished"].push(temp);
        } else {
          this.queue["cooking"][0][1]--;
        }
      } else {
        console.log(`종료까지 ${3 - cnt}초 남음, 주문하려면 입력하세요!`);
        cnt++;
      }

      if (cnt > 3) {
        clearInterval(intervalId);
        console.log("종료!");
        resolve();
      }

      tick++;
    }, 1000);
  });

  order(food, quantity) {
    for (let i = 0; i < quantity; i++) this.queue["waiting"].push([...food]);
  }
}
