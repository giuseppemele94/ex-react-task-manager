import { useState, useRef, useMemo, useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";


function AddTask() {
    // titolo con input controllato
    const [title, setTitle] = useState("");
    

    // descrizione input non controllato useRef
    const descriptionRef = useRef();

    // stato con select non controllata
    const statusRef = useRef();

     // recupero la funzione addTask dal context
    const { addTask } = useContext(GlobalContext);

    const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/\\\`~`;

    //validazione del titolo calcolata con useMemo
    const titleError = useMemo(() => {

        const trimmedTitle = title.trim();

        // se non ha ancora scritto niente, non mostrare errore subito
        if (!title) return "";

        // controllo che la stringa titolo non sia vuota
        if (!trimmedTitle) {
            return "Il nome del task non può essere vuoto";
        }

        // controllo che la stringa titolo non contenga caratteri speciali
        for (let char of trimmedTitle) {
            if (symbols.includes(char)) {
                return "Il nome del task non può contenere simboli speciali";
            }
        }
    }, [title]);

    // funzione submit del form che stampa per il momento i dati in console
    const submit = async (e) => {
        e.preventDefault();

        const trimmedTitle = title.trim();

        // controllo finale al submit
        if (!trimmedTitle || titleError) return;

        // stampo i dati in console
        const newTask = {
            title: trimmedTitle,
            description: descriptionRef.current.value,
            status: statusRef.current.value,
        };

        try {
            await addTask(newTask);
            alert("Task creata con successo");

            //reset del form
            setTitle("");
            descriptionRef.current.value = "";
            statusRef.current.value = "To do";

        } catch(error) {
            alert(error.message);
        }
    };

    return (

        <div className="add-task-page">
            <div className="add-task-card">
                <h1 className="add-task-title">Aggiungi Task</h1>

                <form onSubmit={submit} className="add-task-form">

                    {/* nome Task * */}
                    <section className="form-group">
                        <label className="form-label">Nome task</label>
                        <input
                            className="form-input"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Nome del task"
                        />
                        {titleError && <p className="error-message">{titleError}</p>}
                    </section>

                    {/* descrizione Task * */}
                    <section className="form-group">
                        <label className="form-label">Descrizione</label>
                        <textarea
                            className="form-textarea"
                            ref={descriptionRef}
                            placeholder="Scrivi la descrizione del task"
                        ></textarea>
                    </section>

                    {/* Stato task * */}
                    <section className="form-group">
                        <label className="form-label">Stato</label>
                        <select className="form-select" ref={statusRef} defaultValue="To do">
                            <option value="To do">To Do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                    </section>

                    <button className="submit-btn" type="submit">Aggiungi task</button>
                </form>
            </div>
        </div>

    );
}

export default AddTask;