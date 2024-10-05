import { useState } from "react";
import "./Form.css";
import Snackbar from "@mui/material/Snackbar";

export default function ({ noteProp, refresh }) {
  const [note, setNote] = useState(noteProp);
  const [open, setOpen] = useState(false);

  function handleSubmit(Event) {
    Event.preventDefault();
    const updateNote = async () => {
      try {
        const response = await fetch("/notes/" + note._id, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(note),
        });
        if (!response.ok) {
          setOpen(true);
          throw new Error("Error updating note ");
        }
        refresh((r) => !r);
        alert("updated note !");
      } catch (error) {
        console.log(error);
      }
    };
    updateNote();
  }

  return (
    <div className="UpdateContainer">
      <Snackbar
        open={open}
        autoHideDuration={6000}
        message="Error:Note is not added"
      />
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
