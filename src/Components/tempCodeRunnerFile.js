import Process from "../Components/Process";
let seconds = 0;
let found = 0;
let currentProcessesArray = [];
let shortestJob;
let currentProcess;
let processesAtATime = [];
let intervalID;
let intervalID2;

let processes = [
  new Process(0, 7, "p1"),
  new Process(2, 4, "p2"),
  new Process(4, 1, "p3"),
  new Process(5, 4, "p4"),
];
const stopwatch = (processes) => {
  seconds++;
  whichCameFirst(seconds);
  let newProcess;
  if (currentProcess == null && currentProcessesArray.length > 0) {
    currentProcess = currentProcessesArray[0];
    for (let i = 0; i < currentProcessesArray.length; i++) {
      if (currentProcess.burstTime > currentProcessesArray[i].burstTime)
        currentProcess = currentProcessesArray[i];
    }
  }
  if (processesAtATime.length > 1) {
    // If more than one processes come at a given time
    newProcess = processesAtATime[0];
    for (let i = 1; i < processesAtATime.length; i++) {
      processes.splice(processes.indexOf(processesAtATime[i]));
      if (newProcess.burstTime > processesAtATime[i]) {
        currentProcessesArray.push(newProcess);
        newProcess = processesAtATime;
        processesAtATime.splice(processesAtATime.indexOf(newProcess));
      }
    }
  } else if (processesAtATime.length === 1) {
    newProcess = processesAtATime[0];
  } else newProcess = null;

  if (newProcess !== null) {
    //Compare the process with smallest burst time with the current process
    if (currentProcess.burstTime > newProcess.burstTime) {
      currentProcessesArray.push(currentProcess);
      currentProcess = newProcess;
      processesAtATime.splice(processesAtATime.indexOf(newProcess));
    } else {
      currentProcessesArray.push(newProcess);
    }
  }

  if (processes.length === 0) {
    stopInterval(intervalID);
  } else {
    currentProcess.burstTime--;
    document.getElementById("sample").innerHTML = currentProcess;
    console.log(seconds);
    console.log(currentProcess);
    if (currentProcess.burstTime === 0) {
      currentProcess = null;
    }
  }
};
const startSecondInterval = (processes) => {
  if (!intervalID2) {
    intervalID2 = setInterval(nonPreemptive, 1000, processes);
  }
};

const stopInterval = (intervalID, processes) => {
  clearInterval(intervalID);
  intervalID = null;
  startSecondInterval(processes);
};

const whichCameFirst = (seconds, processes) => {
  for (let i = 0; i < processes.length; i++) {
    if (processes[i].arrivalTIme === seconds) {
      processesAtATime.push(processes[i]);
      processes.splice(i, 1);
    }
  }

  return processesAtATime;
};

const getSmallestJob = (processes) => {
  shortestJob = currentProcessesArray[0];
  for (let i = 1; i < currentProcessesArray.length; i++) {
    if (shortestJob.burstTime > currentProcessesArray[i].burstTime)
      shortestJob = currentProcessesArray[i];
    else if (shortestJob.burstTime === currentProcessesArray[i].burstTime) {
      if (shortestJob.arrivalTime > currentProcessesArray[i].arrivalTIme)
        shortestJob = currentProcessesArray[i];
    }
  }

  currentProcessesArray.splice(currentProcessesArray.indexOf(shortestJob), 1);
};

const stopNonPreemptive = (intervalID2) => {
  clearInterval(intervalID2);
  intervalID2 = null;
};
const nonPreemptive = (processes) => {
  if (found === 0) {
    getSmallestJob(processes);
    found = 1;
  }

  shortestJob.burstTime--;
  console.log(seconds);
  console.log(shortestJob);
  document.getElementById("sample").innerHTML = shortestJob;
  if (shortestJob.burstTime === 0) {
    found = 0;
  }
  if (currentProcessesArray.length === 0 && shortestJob.burstTime === 0) {
    stopNonPreemptive(intervalID2);
  }
  seconds++;
};

const preemptive = (processes) => {
  whichCameFirst(seconds);
  if (processesAtATime.length === 1) {
    currentProcess = processesAtATime[0];
  } else {
    currentProcess = processesAtATime[0];
    for (let i = 1; i < processesAtATime.length; i++) {
      if (currentProcess.burstTime > processesAtATime[i].burstTime) {
        currentProcessesArray.push(currentProcess);
        currentProcess = processesAtATime[i];
      }
    }
  }
  processesAtATime.splice(processesAtATime.indexOf(currentProcess), 1);

  console.log(seconds);
  console.log(currentProcess);
  currentProcess.burstTime--;
  if (!intervalID) {
    intervalID = setInterval(stopwatch, 1000);
  }
};
const Psjs = (processes) => {
  console.log(processes);
  preemptive(processes);
};

export default Psjs;
