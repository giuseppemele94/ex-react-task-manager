import { useContext, useMemo } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import TaskRow from "../components/TaskRow";
import { useState } from "react";

function TaskList() {
  const { tasks } = useContext(GlobalContext);

  // stato che rappresenta il cirterio di ordinamento (title,status,createdAt)
  const [sortBy, setSortBy] = useState("createdAt");

  //stato che rappresenta la direzione per l'ordinamento(1 crescente, -1 descrescente)
  const [sortOrder,setSortOrder] = useState(1); 

  //funzione che gestisce il cliclk sulle intestazioni 
  const handleSort = (column) => {
    if(sortBy === column) {
      setSortOrder(sortOrder * -1);
    }else {
      setSortBy(column);
      setSortOrder(1); 
    }
  }

  //array ordinato calcolato con useMemo 
  const sortedTaks = useMemo(() => {
    const sortedArray = [...tasks];

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
  } , [tasks,sortBy,sortOrder])

  return (
    <div className="task-list-page">
      <h1 className="task-list-title">Lista dei task</h1>

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
              {sortedTaks.map((task) => (
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