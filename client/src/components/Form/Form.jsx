import { useState } from "react";
import "./Form.css";

export default function ({ noteProp, finishUpdate, refresh }) {
  const [note, setNote] = useState(noteProp);
  function handleSubmit(E) {
    E.preventDefault();
    try {
      fetch("/notes/" + note._id, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      }).then(() => {
        refresh((r) => !r);
        alert("updated note !");
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="UpdateContainer">
      <form className="updateForm">
        <input
          value={note.title}
          className="title"
          onChange={(E) => setNote({ ...note, title: E.target.value })}></input>
        <textarea
          name="noteContent"
          value={note.content}
          className="noteContent"
          onChange={(E) =>
            setNote({ ...note, content: E.target.value })
          }></textarea>
        <div>
          <input
            type="submit"
            value={"update"}
            className="submit"
            onClick={handleSubmit}
          />
          <button className="submit cancel">cancel</button>
        </div>
      </form>
    </div>
  );
}
