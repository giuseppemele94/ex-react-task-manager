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
    const addTask = () => {};

    const removeTask = () => {};

    const updateTask = () => {}; 

    return {tasks, addTask, removeTask, updateTask}
}

export default useTasks ;