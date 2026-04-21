import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import TaskRow from "../components/TaskRow";


function TaskList() {
  const { tasks } = useContext(GlobalContext);

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
                <th>Nome</th>
                <th>Stato</th>
                <th>Data di Creazione</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task) => (
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