import { createContext,useState,useEffect } from "react";

export const GlobalContext = createContext(); 

function GlobalProvider ({children}) {

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
    },[])

    return(
    <GlobalContext.Provider value={{tasks, setTasks}}>
        {children}
    </GlobalContext.Provider>)
}

export default GlobalProvider