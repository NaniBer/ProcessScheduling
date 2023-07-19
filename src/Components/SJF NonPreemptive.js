import { BinaryTree } from "./binaryTree";

let seconds = 0;
let intervalID;
let processes = [];
let currentProcess;
let isThereACurrentProces = false;

const stopInterval = (intervalID) => {
  clearInterval(intervalID);
  intervalID = null;
};
const insertion = (p, seconds, type) => {
  for (let i = 0; i < processes.length; i++) {
    if (processes[i].arrivalTime == seconds) {
      p.insertion(processes[i], type);
      processes.splice(i, 1);
    }
  }
};
const getCurrentProcess = (p, type) => {
  currentProcess = p.deletion(type);
  if (currentProcess !== null) isThereACurrentProces = true;
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
    currentProcess.burstTime--;
    console.log(currentProcess);
    addList(currentProcess);

    if (currentProcess.burstTime == 0) isThereACurrentProces = false;
  }
  if (p.n == 0 && processes.length == 0 && isThereACurrentProces == false) {
    stopInterval(intervalID);
  }
};

const SJF = (process, type, addList, addSecond) => {
  let p = new BinaryTree();
  for (let i = 0; i < process.process.length; i++) {
    processes.push(process.process[i]);
  }
  if (!intervalID) {
    intervalID = setInterval(stopwatch, 1000, p, type, addList, addSecond);
  }
};
export default SJF;
