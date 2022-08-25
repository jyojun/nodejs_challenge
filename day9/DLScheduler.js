import { Process_D } from "./Process.js";
class DLScheduler {
  constructor() {
    this.queue = [];
    this.terminated = [];
    this.recent; // 가장 최근에 사용하던 프로세스를 저장.
    this.total_time = 0; // 스케줄링 시작 이후 시간;
  }

  start() {
    this.tick = setInterval(() => {
      this.update();
    }, 100);
  }
  stop() {
    clearInterval(this.tick);
  }
  update() {
    if (this.queue.length === 0) {
      this.stop();
      console.log("기한부 스케줄링 모두 종료");
      this.calculate();
      return;
    }

    if (this.queue[0] === this.recent) {
      let p = this.queue.shift();
      this.queue.push(p); // 맨뒤로 보내준다.
    }
    let run_p = this.queue.shift();
    this.recent = run_p;
    run_p.status = "running";
    run_p.total_time++;
    for (const p of this.queue) {
      if (p.status !== "terminated") {
        p.status = "waiting";
        p.wait++;
      }
    }
    this.total_time++;

    if (run_p.total_time === run_p.time) {
      run_p.status = "terminated";
      console.log(run_p.name, "프로세스 종료");
      this.terminated.push(run_p);
    } else if (run_p.deadline <= this.total_time) {
      run_p.status = `terminated(Deadline ${run_p.deadline} missed)`;
      this.terminated.push(run_p);
    } else {
      this.enqueue(run_p);
    }
    this.display();
    console.log("\n");
  }
  enqueue(p) {
    this.queue.push(p);

    this.queue.sort((a, b) => {
      return a.deadline - b.deadline;
    });
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
    console.log(`총 진행 시간 : ${this.total_time}`);
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

const process1 = new Process_D("P1", 50, 90);
const process2 = new Process_D("P2", 25, 50);
const process3 = new Process_D("P3", 7, 20);

const deadlineScheduler = new DLScheduler();

deadlineScheduler.enqueue(process1);
deadlineScheduler.enqueue(process2);
deadlineScheduler.enqueue(process3);

deadlineScheduler.start();
