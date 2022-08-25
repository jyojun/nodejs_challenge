import { Chef, Deliverer } from "./employee.js";

export const menu = {
  1: ["라면", 3],
  2: ["떡볶이", 7],
  3: ["닭볶음탕", 15],
  4: ["갈비찜", 20],
};

export class Manager {
  constructor(chef_count, deliverer_count) {
    this.chefs = [];
    this.deliverers = [];
    this.queue = {
      waiting: [],
      cooking: [],
      finished: [],
      // deliverying: [],
      done: [],
    };
    for (let i = 0; i < chef_count; i++) {
      let new_chef = new Chef(String.fromCharCode(65 + i));
      this.chefs.push(new_chef);
    }
    for (let i = 0; i < deliverer_count; i++) {
      let new_deliverer = new Deliverer(String.fromCharCode(65 + i));
      this.deliverers.push(new_deliverer);
    }
  }
  start = new Promise((resolve) => {
    let cnt = 0;
    let tick = 0;
    const intervalId = setInterval(() => {
      // event looper
      console.clear();
      console.log(this.chefs, this.deliverers);
      console.log(`======================메뉴=====================\n`);
      console.log(menu);
      console.log(`${tick} sec passed`);
      console.log(`====================주문 경과===================\n
      대기중 : /${this.queue["waiting"].join(",")}/\n
      배달 대기중: /${this.queue["finished"].join(",")}/\n
      배달 완료: /${this.queue["done"].join(",")}/\n`);

      let not_working_chefs = this.chefs.filter(
        (chef) => chef.cooking_queue.length === 0
      );
      let working_chefs = this.chefs.filter(
        (chef) => chef.cooking_queue.length !== 0
      );
      let one_food_chefs = this.chefs.filter(
        (chef) => chef.cooking_queue.length === 1
      );
      let not_working_deliverers = this.deliverers.filter(
        (deliverer) => deliverer.deliverying_queue.length === 0
      );
      let working_deliverers = this.deliverers.filter(
        (deliverer) => deliverer.deliverying_queue.length !== 0
      );

      // 노는 요리사가 있고, 대기중인 음식이 있을 경우
      if (not_working_chefs.length > 0 && this.queue["waiting"].length > 0) {
        let temp = this.queue["waiting"].shift();
        not_working_chefs[0].cooking_queue.push(temp);
        console.log(not_working_chefs[0].name, "요리사 요리 시작!", `-${temp}`);
        cnt = 0;
      } else if (
        one_food_chefs.length > 0 &&
        this.queue["waiting"].length > 0
      ) {
        let temp = this.queue["waiting"].shift();
        one_food_chefs[0].cooking_queue.push(temp);
        console.log(one_food_chefs[0].name, "요리사 요리 시작!", `-${temp}`);
        cnt = 0;
      }
      // 요리중인 음식이 있을 경우
      else if (working_chefs.length > 0) {
        working_chefs.map((chef) => {
          let finished_food = chef.cooking();
          if (finished_food.length > 0) {
            this.queue["finished"].push([
              finished_food[0][0], // customer
              finished_food[0][1], // food name
              finished_food[0][2] + 10, // food delivery time : 10분
            ]);
          }
        });
      }

      // 노는 배달원이 있고, 만들어진 음식이 있을 경우
      if (
        not_working_deliverers.length > 0 &&
        this.queue["finished"].length > 0
      ) {
        let temp = this.queue["finished"].shift();
        not_working_deliverers[0].deliverying_queue.push(temp);
        console.log(
          not_working_deliverers[0].name,
          "배달원 배달 시작!",
          `-${temp}`
        );
        cnt = 0;
      } else if (working_deliverers.length > 0) {
        working_deliverers.map((deliverer) => {
          let finished_food = deliverer.deliverying();
          if (finished_food.length > 0) {
            this.queue["done"].push(finished_food);
          }
        });
      }
      // 일하는 요리사, 배달원 모두 없을 경우 종료 대기
      if (working_chefs.length <= 0 && working_deliverers.length <= 0) {
        console.log(`종료까지 ${5 - cnt}초 남음, 주문하려면 입력하세요!`);
        cnt++;
      }

      // 종료대기 5초이후 종료
      if (cnt > 5) {
        clearInterval(intervalId);
        console.log("모든 배달을 마치고 영업종료! (input: 'quit')");
        resolve();
      }
      tick++;
    }, 1000);
  });

  // 주문한 요리가 대기 상태큐로 들어감
  order(customer, food, quantity) {
    for (let i = 0; i < quantity; i++)
      this.queue["waiting"].push([customer, ...food]);
    console.log([customer, ...food]);
  }
}
