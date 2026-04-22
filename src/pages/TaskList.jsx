import { useContext, useMemo , useCallback} from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import TaskRow from "../components/TaskRow";
import { useState } from "react";

function TaskList() {
  const { tasks } = useContext(GlobalContext);

  // stato che rappresenta il cirterio di ordinamento (title,status,createdAt)
  const [sortBy, setSortBy] = useState("createdAt");

  //stato che rappresenta la direzione per l'ordinamento(1 crescente, -1 descrescente)
  const [sortOrder,setSortOrder] = useState(1); 

  //stato per la ricerca
  const [searchQuery, setSearchQuery] = useState(""); 


  //funzione che gestisce il cliclk sulle intestazioni 
  const handleSort = (column) => {
    if(sortBy === column) {
      setSortOrder(sortOrder * -1);
    }else {
      setSortBy(column);
      setSortOrder(1); 
    }
  }


    // funzione debounce generica
  const debounce = (callback, delay) => {
    let timer;

    return (value) => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        callback(value);
      }, delay);
    };
  };

    // funzione debounced memorizzata con useCallback
  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchQuery(value);
    }, 500),
    []
  );

  //array filtrato e ordinato calcolato con useMemo 
  const FilteredAndSortedTaks = useMemo(() => {

    //nell'array filtrato mi vado a prendere i titoli da task che includono la stringa presente nella searchQuery
    const filteredTasks = tasks.filter((task) => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()))

    const sortedArray = [...filteredTasks];

    sortedArray.sort((a,b) => {
      //ordinamento per title 
      if(sortBy === "title") {
        return a.title.localeCompare(b.title) * sortOrder;
      }

      //ordinamento per status
      if(sortBy === "status" ){
        const statusOrder = {
          "To do" :0,
          "Doing": 1,
          "Done" : 2,
        };
        return (statusOrder[a.status] - statusOrder[b.status]) * sortOrder; 
      }

      //ordinamento per createdAt
      if(sortBy === "createdAt") {
        return (
          (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) *
          sortOrder
        );
      }

      return 0; 
    });

    return sortedArray;
  } , [tasks,sortBy,sortOrder,searchQuery])

  return (
    <div className="task-list-page">
      <h1 className="task-list-title">Lista dei task</h1>

      {/**Input per la ricerca */}
      <input
      type ="text"
      placeholder="Cerca una task.."
      onChange={(e) => debouncedSearch(e.target.value)}
      />

      {tasks.length === 0 ? (
        <p className="empty-message">Nessun task presente</p>
      ) : (
        <div className="table-wrapper">
          <table className="task-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("title")}>Nome</th>
                <th onClick={() => handleSort("status")}>Stato</th>
                <th onClick={() => handleSort("createdAt")}>Data di Creazione</th>
              </tr>
            </thead>

            <tbody>
              {FilteredAndSortedTaks.map((task) => (
                <TaskRow key={task.id} task={task} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TaskList;