import { useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";

function TaskDetail() {
  const { id } = useParams();
  const { tasks } = useContext(GlobalContext);

  const task = tasks.find((task) => task.id === Number(id));

  if (!task) {
    return <p>Task non trovata</p>;
  }

  const { title, description, status, createdAt } = task;

  return (
    <div className="task-detail-page">
      <div className="task-detail-card">
        <h1>{title}</h1>
        <p><strong>Descrizione:</strong> {description}</p>
        <p><strong>Stato:</strong> {status}</p>
        <p><strong>Data di creazione:</strong> {new Date(createdAt).toLocaleDateString()}</p>

        <button onClick={() => console.log("Elimino task")}>
          Elimina Task
        </button>
      </div>
    </div>
  );
}

export default TaskDetail;