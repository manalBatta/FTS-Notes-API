import { deleteNote } from "../API";
import "../Note.css";
import { useState } from "react";
import NoteEditForm from "../NoteEditForm/NoteEditForm";

const yellow = "#F4D799";
const pink = "#FFF0EE";
export default function Note({ note, refreshPage }) {
  const [update, setUpdate] = useState({});

  const finalizeUpdate = () => {
    setUpdate({});
    refreshPage();
  };
  const handleDelete = async (Event, id) => {
    Event.stopPropagation();
    const confirmDelete = window.confirm(
      "Are you sure You want to delete ",
      note.title
    );
    if (!confirmDelete) return;
    try {
      const response = await deleteNote(id);
      if (response.ok) {
        refreshPage();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      onClick={() => setUpdate(note)}
      className="noteContainer"
      style={{ backgroundColor: note.bgColor ? pink : yellow }}>
      <h2 className="noteHeader">{note.title}</h2>
      <p className="noteBody">{note.content}</p>
      <span className="creationDate">🗓️{note.creationDate.slice(0, 7)}</span>
      <button
        className="btn"
        onClick={(Event) => handleDelete(Event, note._id)}>
        ⛔
      </button>
      {Object.keys(update).length !== 0 && (
        <NoteEditForm
          noteProp={update}
          refreshPage={finalizeUpdate}></NoteEditForm>
      )}
    </div>
  );
}
