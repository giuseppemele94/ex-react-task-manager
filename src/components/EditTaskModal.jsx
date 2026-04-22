import { useState,useRef , useEffect } from "react";
import Modal from './Modal'; 

function EditTaskModal({show,onClose,task,onSave}) {

     // ref al form per poter usare requestSubmit()
  const editFormRef = useRef();

  // stati controllati del form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To do");

   // quando cambia task, inizializzo i campi del form
  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setStatus(task.status || "To do");
    }
  }, [task]);

  // submit del form
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
    title="Modifica task"
    confirmText ="Salva"
    onConfirm={() => editFormRef.current.requestSubmit()}
    content ={
        <form ref={editFormRef} onSubmit={handleSubmit}>

            <section>
                <label>Nome</label>
                <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder=""/>
            </section>

            <section>
                <label>Descrizione</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </section>

            <section>
                <label>Stato</label>
                <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}>
                <option value="To do">To do</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>

                </select>
            </section>

        </form>
    }/>
  )
}

export default EditTaskModal; 