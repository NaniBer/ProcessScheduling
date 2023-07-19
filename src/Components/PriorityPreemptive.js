import { BinaryTree } from "./binaryTree";

let seconds = 0;
let intervalID;
let processes = [];

const stopInterval = (intervalID) => {
  clearInterval(intervalID);
  intervalID = null;
};
const stopwatch = (p, type, addList, addSecond) => {
  for (let i = 0; i < processes.length; i++) {
    if (processes[i].arrivalTime == seconds) {
      p.insertion(processes[i], type);
      processes.splice(i, 1);
    }
  }
  seconds++;
  console.log(seconds);
  addSecond(seconds);

  let currentProcess = p.deletion(type);
  if (currentProcess !== null) {
    currentProcess.burstTime--;

    console.log(currentProcess);
    addList(currentProcess);
    if (currentProcess.burstTime > 0) p.insertion(currentProcess, type);
    else if (currentProcess.burstTime == 0) {
      currentProcess = null;
    }
  }

  if (p.n == 0 && processes.length == 0) stopInterval(intervalID);
};

const PriorityPreemptive = (process, type, addList, addSecond) => {
  let p = new BinaryTree();
  for (let i = 0; i < process.process.length; i++) {
    processes.push(process.process[i]);
  }

  if (!intervalID) {
    intervalID = setInterval(stopwatch, 1000, p, type, addList, addSecond);
  }
};
export default PriorityPreemptive;
