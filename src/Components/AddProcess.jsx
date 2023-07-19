import React,{ useState } from "react";
const AddProcess=({handleClick})=>{
      const [burstTime, setBursttime] = useState("");
      const [arrivalTime, setArrivalTime] = useState("");
      const [name, setName] = useState("");
      const [priority,setPriority]=useState(0);
      const [quantum,setQuantum]=useState(0)
  
      return (
    <div>
   
     <div>
      <label >Arrival Time
        <input
          type="text"
          value={arrivalTime}
          onChange={(e) => setArrivalTime(e.target.value)}
        ></input>
        </label>
        <label >Burst Time
        <input
          type="text"
          value={burstTime}
          onChange={(e) => setBursttime(e.target.value)}
        ></input>
        </label>
        <label >Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        </label>
        <label>Priority
          <input
          type="text"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        ></input>
        </label>
        <label>Quantum
          <input
          type="text"
          value={quantum}
          onChange={(e) => setQuantum(e.target.value)}
        ></input>
        </label>
        <button
          onClick={() => {

            handleClick(burstTime,arrivalTime,name,priority,quantum);
            setArrivalTime("");
            setBursttime("");
            setName("");
            setPriority(0);
            setQuantum(0);
            
          }}
        >
          Submit
        </button>
        
      </div>
      </div>
      )
}
export default AddProcess