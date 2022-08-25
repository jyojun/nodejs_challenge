import { Worker } from "worker_threads";
import { Process } from "./Process.js";
import { RRScheduler } from "./RRScheduler.js";

const process1 = new Process("P1", 3);
const process2 = new Process("P2", 5);
const process3 = new Process("P3", 7);

const RRS = new RRScheduler();
RRS.enqueue(process1);
RRS.enqueue(process2);
RRS.enqueue(process3);

RRS.start2();
