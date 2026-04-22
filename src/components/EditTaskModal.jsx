import { useState, useEffect, useRef } from "react";
import Modal from "./Modal";


function EditTaskModal({ show, onClose, task, onSave }) {
  const editFormRef = useRef();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To do");

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setStatus(task.status || "To do");
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...task,
      title,
      description,
      status,
    });
  };

  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Modifica Task"
      confirmText="Salva"
      onConfirm={() => editFormRef.current.requestSubmit()}
      content={
        <form ref={editFormRef} onSubmit={handleSubmit} className="edit-task-form">
          <section className="edit-form-group">
            <label className="edit-form-label">Nome</label>
            <input
              className="edit-form-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </section>

          <section className="edit-form-group">
            <label className="edit-form-label">Descrizione</label>
            <textarea
              className="edit-form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </section>

          <section className="edit-form-group">
            <label className="edit-form-label">Stato</label>
            <select
              className="edit-form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="To do">To do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </section>
        </form>
      }
    />
  );
}

export default EditTaskModal;