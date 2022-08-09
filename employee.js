export class Chef {
  constructor(name) {
    this.name = name;
    this.cooking_queue = [];
  }

  cooking() {
    let result = [];
    this.cooking_queue.map((food) => {
      food[2]--;
      console.log(
        `${this.name} 요리사 ${food[0]}고객의 ${food[1]} 요리중~ 완성까지 ${food[2]}분 남음`
      );
      if (food[2] <= 0) {
        result.push(food);
        this.cooking_queue.shift();
      }
    });

    return result;
  }
}

export class Deliverer {
  constructor(name) {
    this.name = name;
    this.deliverying_queue = [];
  }

  deliverying() {
    let result = [];
    this.deliverying_queue.map((food) => {
      food[2]--;
      console.log(
        `${this.name} 배달원 ${food[0]}고객의 ${food[1]} 배달중~ 도착까지 ${food[2]}분 남음`
      );
      if (food[2] <= 0) {
        result.push(food);
        this.deliverying_queue.shift();
      }
    });
    return result;
  }
}

// const chef1 = new Chef(String.fromCharCode(65 + 0));
// const chef2 = new Chef(String.fromCharCode(65 + 1));
// console.log(chef1.name);
// console.log(chef2.name);
