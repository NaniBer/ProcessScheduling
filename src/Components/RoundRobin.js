import { BinaryTree } from "./binaryTree";

let seconds = 0;
let intervalID;
let processes = [];
let initialQuantum;
let quantum;
let currentProcess;
let isThereACurrentProces = false;

const stopInterval = (intervalID) => {
  clearInterval(intervalID);
  intervalID = null;
};
const getCurrentProcess = (p, type) => {
  quantum = initialQuantum;
  currentProcess = p.deletion(type);
  if (currentProcess !== null) isThereACurrentProces = true;
};
const insertion = (p, seconds, type) => {
  for (let i = 0; i < processes.length; i++) {
    if (processes[i].arrivalTime == seconds) {
      p.insertion(processes[i], type);
      processes.splice(i, 1);
    }
  }
};

const stopwatch = (p, type, addList, addSecond) => {
  insertion(p, seconds, type);
  seconds++;
  console.log(seconds);
  addSecond(seconds);
  if (isThereACurrentProces == false) {
    getCurrentProcess(p, type);
  }
  if (currentProcess !== null) {
    quantum--;
    currentProcess.burstTime--;
    console.log(currentProcess);
    addList(currentProcess);

    if (currentProcess.burstTime == 0 || quantum == 0)
      isThereACurrentProces = false;
  }
  if (isThereACurrentProces == false && currentProcess.burstTime > 0) {
    p.insertion(currentProcess);
  }
  if (p.n == 0 && processes.length == 0 && isThereACurrentProces == false) {
    stopInterval(intervalID);
  }
};
const RoundRobin = (process, type, addList, addSecond) => {
  let p = new BinaryTree();
  initialQuantum = process.process[0].quantum;
  for (let i = 0; i < process.process.length; i++) {
    processes.push(process.process[i]);
  }

  if (!intervalID) {
    intervalID = setInterval(stopwatch, 1000, p, type, addList, addSecond);
  }
};
export default RoundRobin;
