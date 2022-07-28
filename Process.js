export class Process {
  constructor(name, time) {
    this.status = "ready"; // 프로세스 상태
    this.wait = 0; // 총 대기시간
    this.total_time = 0; // 누적 실행 시간
    this.name = name; // 프로세스 이름
    this.time = time;
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
