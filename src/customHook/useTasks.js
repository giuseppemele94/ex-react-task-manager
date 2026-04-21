import { useState,useEffect } from "react";

function useTasks() {

    //variabili di stato che vogliamo condividere
    const [tasks,setTasks] = useState([]); 

    //effettuo la chiamata all'endpoint e salvo i dati nello stato 
    useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tasks`)
    .then((res) => res.json())
    .then((data) => {
        console.log("Task ricevuti:", data);
        setTasks(data);
    })
    .catch((error) => {
        console.error("Errore nel recupero dei task",error); 
    })
    },[]); 

    /**Definire le funzioni addTask, removeTask, updateTask all'interno di useTasks(), lasciandole vuote per ora. */
    const addTask = async newTask => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"},
      body: JSON.stringify(newTask)
    });

    const {success,message,task} = await response.json();
    if(!success) throw new Error(message); 

    setTasks(prev => [...prev,task]); 

}


    const removeTask = () => {};

    const updateTask = () => {}; 

    return {tasks, addTask, removeTask, updateTask}
}

export default useTasks ;