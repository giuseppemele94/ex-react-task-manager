import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { tasks } = useContext(GlobalContext);


  // recupero la funzione addTask dal context
  const { removeTask } = useContext(GlobalContext);

  //recupero la funzione updateTask dal context
  const { updateTask } = useContext(GlobalContext);

  const task = tasks.find((task) => task.id === Number(id));

  //useState della modale di eliminazione, inizialmente non viene mostrata la modale
  const [showModal, setShowModal] = useState(false);

  //useState della modale di modifica
  const [showEditModal, setShowEditModal] = useState(false);


  if (!task) {
    return <p>Task non trovata</p>;
  }

  const { title, description, status, createdAt } = task;

  //funzione di elimazione task 
  const handleDelete = async () => {
    try {
      await removeTask(task.id);
      alert("Task eliminata con successo");
      navigate("/");

    } catch (error) {
      alert(error.message);
    }
  }

  //funzione di modifica task 
  const handleUpdate= async (updatedTask) => {
    try {
      await updateTask(updatedTask);
      alert("Task modificata con successo");
      setShowEditModal(false);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="task-detail-page">
      <div className="task-detail-card">
        <h1>{title}</h1>
        <p><strong>Descrizione:</strong> {description}</p>
        <p><strong>Stato:</strong> {status}</p>
        <p><strong>Data di creazione:</strong> {new Date(createdAt).toLocaleDateString()}</p>

        {/* Bottone di visualizzazione della modale di  eliminazione del task * */}
        <button onClick={() => setShowModal(true)}>
          Elimina Task
        </button>

        {/* Bottone di visualizzazione della modale di  modifica task * */}
        <button onClick={() => setShowEditModal(true)}>
          Modifica Task
        </button>


        {/**Modale di conferma eliminazione del task  */}
        <Modal
          title="conferma eliminazione"
          content={<p>Sei sicuro di voler eliminare questa task?</p>}
          show={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleDelete}
          confirmText="Elimina"
        />

        {/** Modale di modifica task */}
        <EditTaskModal
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          task={task}
          onSave={handleUpdate}
        />

      </div>
    </div>
  );
}

export default TaskDetail;