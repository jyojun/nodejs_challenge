import { Worker } from "worker_threads";

export class Process {
  constructor(name, time) {
    this.status = "ready"; // 프로세스 상태
    this.wait = 0; // 총 대기시간
    this.total_time = 0; // 누적 실행 시간
    this.name = name; // 프로세스 이름
    this.time = time;

    this.threads = [];
  }

  initThreads() {
    let cnt = parseInt(this.time / 2);
    for (let i = 0; i < cnt; i++) {
      let thread = new Worker("./worker.js");
      console.log(`${this.name} process's thread ${i + 1}th thread start`);
      thread.postMessage([this.total_time, this.time]);

      thread.on("message", (value) => {
        this.total_time = value;
      });

      thread.on("close", () => {
        thread.terminate();
      });
      console.log(`${this.name} process's thread ${i + 1}th thread end`);
    }
  }
}

export class Process_P extends Process {
  constructor(name, time, priority) {
    super(name, time);
    this.status = "ready"; // 프로세스 상태
    this.wait = 0; // 총 대기시간
    this.total_time = 0; // 누적 실행 시간

    this.priority = priority; // 우선순위
  }
}

export class Process_D extends Process {
  constructor(name, time, deadline) {
    super(name, time);
    this.status = "ready"; // 프로세스 상태
    this.wait = 0; // 총 대기시간
    this.total_time = 0; // 누적 실행 시간

    this.deadline = deadline;
  }
}
