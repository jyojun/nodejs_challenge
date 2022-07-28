import { Process } from "./Process.js";

class RRScheduler {
  constructor() {
    this.queue = [];
    this.terminated = [];
    this.tick;
  }

  start() {
    this.tick = setInterval(() => {
      this.update();
    }, 100);
  }

  stop() {
    clearInterval(this.tick);
  }
  enqueue(p) {
    this.queue.push(p);
  }
  update() {
    if (this.queue.length == 0) {
      this.stop();
      console.log("라운드 로빈 스케줄링 모두 종료");
      this.calculate();
      return;
    }
    let run_p = this.queue.shift();
    run_p.status = "running";
    run_p.total_time++;
    for (const p of this.queue) {
      if (p.status !== "terminated") {
        p.status = "waiting";
        p.wait++;
      }
    }

    if (run_p.total_time === run_p.time) {
      run_p.status = "terminated";
      console.log(run_p.name, "프로세스 종료");
      this.terminated.push(run_p);
    } else {
      this.queue.push(run_p);
    }

    this.display();

    console.log("\n");
  }
  display() {
    let sorted_queue = [...this.terminated, ...this.queue];
    sorted_queue.sort((a, b) => {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
    sorted_queue.forEach((p) => {
      if (this.start === false) {
        console.log(
          `${p.name}(${p.status}), ${p.total_time} / ${p.time}, waiting ${p.wait} sec`
        );
        this.start = true;
      } else {
        console.log(
          `${p.name}(${p.status}), ${p.total_time} / ${p.time}, waiting ${p.wait} sec`
        );
      }
    });
  }
  calculate() {
    let total_wait_time = 0;
    let total_return_time = 0;
    let wait_str = [];
    let return_str = [];
    for (const p of this.terminated) {
      total_wait_time += p.wait;
      total_return_time += p.wait + p.total_time;
      wait_str.push(p.wait);
      return_str.push(p.wait + p.total_time);
    }

    console.log(
      `평균 대기시간 = (${wait_str.join(" + ")}) / ${
        this.terminated.length
      } = ${
        Math.round((total_wait_time / this.terminated.length) * 10) / 10
      } sec`
    );
    console.log(
      `평균 반환시간 = (${return_str.join(" + ")}) / ${
        this.terminated.length
      } = ${
        Math.round((total_return_time / this.terminated.length) * 10) / 10
      } sec`
    );
  }
}

const process1 = new Process("P1", 50);
const process2 = new Process("P2", 25);
const process3 = new Process("P3", 7);

const RRS = new RRScheduler();
RRS.enqueue(process1);
RRS.enqueue(process2);
RRS.enqueue(process3);

RRS.start();
