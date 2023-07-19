
import React,{ useState } from "react";
import AddProcess from "./AddProcess";
import Buttons from "./Buttons"

const MainPage=()=>{

  const [process, setProcess] = useState([]);

  const submitHandler=(burstTime,arrivalTime,name,priority,quantum)=>{
       

    let newProcess= {
      burstTime: burstTime,
      arrivalTime: arrivalTime,
      name :name,
      priority: priority,
      quantum:quantum
    }


    setProcess((process)=>[...process,newProcess]);

  }

  return (
    <div>
   
      <AddProcess handleClick={submitHandler}/>
      
      <div>


        {process.map((processes) => 
          <div key={Math.random()}>{processes.name}</div>
        )}
      </div>
      <Buttons process={process}/>
      
      


    
      
    </div>
  )

}
export default MainPage;