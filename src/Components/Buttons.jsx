import Psjs from "./SJS Preemptive";
import SJF from "./SJF NonPreemptive";
import FirstComeFirstServe from "./FirstComeFirstServe";
import PriorityPreemptive from "./PriorityPreemptive";
import PriorityNonPreemptive from "./PriorityNonPreemptive";
import RoundRobin from "./RoundRobin";
import { useState } from "react";

const Buttons= (process)=>{
  const [list,setList]=useState([]);
  const [seconds,setSeconds]=useState(0);
  const addList=(process)=>{
    setList((list)=>[...list,process]);
  }
  const addSecond =(currentSecond)=>{
    setSeconds(currentSecond);
  }

    return(
    <div>
      <button
          onClick={() => {
            Psjs(process, "burstTime", addList,addSecond);
          }}
        >
          SJF Preemptive
        </button>

        <button onClick={()=>{
          SJF(process, "burstTime",addList,addSecond)
        }}>
          SJF Non Preemptive
      </button>
        <button onClick={()=>{
          FirstComeFirstServe(process, "arrivalTime",addList,addSecond)
        }}>
          First Come First Serve
      </button>
        <button onClick={()=>{
          PriorityPreemptive(process, "priority",addList,addSecond)
        }}>
          Priority Preemptive
      </button>
          <button onClick={()=>{
          PriorityNonPreemptive(process, "priority",addList,addSecond)
        }}>
          Priority Non Preemptive
      </button>
            <button onClick={()=>{
          RoundRobin(process, "roundRobin",addList,addSecond)
        }}>
          Round Robin
      </button>
      <div>
        
          {list.map((lists) => 
            <div key={Math.random()}>{lists.name}</div>
          )}
          {seconds}
          
        </div>
      </div>
  )

}
export default Buttons