import { useState } from "react";
import "./NoteEditForm.css";
import Snackbar from "@mui/material/Snackbar";
import { updateNote } from "../API";

export default function NoteEditForm({ noteProp, refreshPage }) {
  const [note, setNote] = useState(noteProp);
  const [isSnackOpen, setIsSnackOpen] = useState(false);

  const handleSubmitUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await updateNote(note);
      if (!response.ok) {
        setIsSnackOpen(true);
        throw new Error("Error updating note ");
      }
      refreshPage();
      alert("updated note !");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="UpdateContainer">
      <Snackbar
        open={isSnackOpen}
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
            onClick={handleSubmitUpdate}
          />
          <button
            className="submit cancel"
            onClick={() => {
              refreshPage();
            }}>
            cancel
          </button>
        </div>
      </form>
    </div>
  );
}
