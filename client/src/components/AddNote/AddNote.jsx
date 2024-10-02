import { useState } from "react";
import "../Note.css";

const styles = {
  header: {
    backgroundColor: "transparent",
    height: "33px",
    border: "none",
    width: "100%",
    borderBottom: "4px solid #33322e",
  },

  noteBody: {
    backgroundColor: "transparent",
    height: "50%",
    width: "82%",
    margin: "5px",
    border: "none",
    resize: "none",
    scrollbarWidth: "none",
  },
  calender: {
    top: "1%",
  },
  btn: {
    float: "right",
    margin: "5px",
    background: "red",
    border: "4px solid #33322e",
    borderRadius: "24px",
    marginRight: "10px",
    fontSize: "0.9rem",
    padding: "5px",
    boxShadow: "rgb(51, 50, 46) 3px 3px 0px",
  },
};

export default function AddNote({ refresh }) {
  const [isAdding, setIsAdding] = useState(false);
  const [noteInfo, setNotInfo] = useState({ title: "", content: "" });

  const today = new Date();
  const monthYear = today.getMonth() + "-" + today.getFullYear();

  function addNote() {
    try {
      fetch("/notes", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteInfo),
      }).then((res) => {
        if (res.ok) {
          alert("new note added");
          handleCancel();
          refresh((r) => !r);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  const handleExtend = () => {
    setIsAdding(true);
  };
  const handleShrink = () => {
    if (noteInfo.title.length == 0) {
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setNotInfo({ title: "", content: "" });
    setIsAdding(false);
  };

  return (
    <div
      className="noteContainer"
      style={{
        backgroundColor: "rgb(190 255 247)",
        height: isAdding ? "300px" : "66px",
      }}>
      <input
        value={noteInfo.title}
        onChange={(E) => setNotInfo({ ...noteInfo, title: E.target.value })}
        onFocus={handleExtend}
        onBlur={handleShrink}
        type="text"
        placeholder="Take a note.."
        className="noteHeader"
        style={{
          ...styles.header,
          borderBottom: isAdding ? "4px solid #33322e" : "none",
        }}
      />
      {isAdding && (
        <>
          <textarea
            value={noteInfo.content}
            onChange={(E) =>
              setNotInfo({ ...noteInfo, content: E.target.value })
            }
            id="NoteBody"
            placeholder="This cake is fantastic.."
            className="noteBody"
            style={styles.noteBody}
          />
          <span className="creationDate" style={styles.calender}>
            🗓️{monthYear}
          </span>
          <button style={styles.btn} onClick={handleCancel}>
            cancel
          </button>

          <button
            style={{ ...styles.btn, backgroundColor: "#9cd2ff" }}
            onClick={addNote}>
            Add
          </button>
        </>
      )}
    </div>
  );
}
