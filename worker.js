import { parentPort } from "worker_threads";

parentPort.on("message", (value) => {
  if (value[0] + 2 > value[1]) {
    // this.total_time , this.time
    parentPort.postMessage(value[1]);
  } else {
    parentPort.postMessage(value[0] + 2);
  }
  parentPort.close();
});
