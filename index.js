class Process {
  constructor(name, time) {
    this.status = "ready"; // 프로세스 상태
    this.wait = 0; // 총 대기시간
    this.total_time = 0; // 누적 실행 시간
    this.name = name; // 프로세스 이름
    this.max_time = time; // 프로세스
  }
}

class RRScheduler {
  constructor() {
    this.queue = [];
    this.terminated = [];
  }

  enqueue(p) {
    this.queue.push(p);
  }
  update() {
    let run_p = this.queue.shift();
    if (run_p.total_time === run_p.max_time) {
      run_p.status = "terminated";
      this.terminated.push(run_p);

      if (!this.queue) {
        console.log("모두 종료");
        return;
      }
      run_p = this.queue.shift();
    }
    run_p.status = "running";
    run_p.total_time++;
    for (const p of this.queue) {
      p.status = "waiting";
      p.wait++;
    }
    this.queue.push(run_p);
    this.display();

    console.log("\n");
  }
  display() {
    let sorted_queue = [...this.terminated, ...this.queue];
    sorted_queue.sort((a, b) => {
      return a.max_time - b.max_time;
    });
    sorted_queue.forEach((p) => {
      console.log(
        `${p.name}(${p.status}), ${p.total_time} / ${p.max_time}, waiting ${p.wait} sec`
      );
    });
  }
}

const process1 = new Process("A", 3);
const process2 = new Process("B", 5);
const process3 = new Process("C", 7);

const RRS = new RRScheduler();
RRS.enqueue(process1);
RRS.enqueue(process2);
RRS.enqueue(process3);

let timerId = setInterval(() => RRS.update(), 1000);
