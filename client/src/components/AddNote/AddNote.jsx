import { memo, useState } from "react";
import "../Note.css";
import Snackbar from "@mui/material/Snackbar";
import { addNote } from "../API";
const styles = {
  header: {
    backgroundColor: "transparent",
    height: "33px",
    border: "none",
    width: "100%",
    borderBottom: "4px solid #33322e",
    fontSize: " 1.2rem",
    fontWeight: "700",
  },

  noteBody: {
    backgroundColor: "transparent",
    height: "50%",
    width: "82%",
    margin: "5px",
    border: "none",
    resize: "none",
    scrollbarWidth: "none",
    fontSize: " 1rem",
  },

  calender: {
    top: "1%",
  },
  btn: {
    float: "right",
    margin: "5px",
    background: "#ff8d8d",
    border: "4px solid #33322e",
    borderRadius: "24px",
    marginRight: "10px",
    marginBottom: "15px",
    fontSize: "0.9rem",
    padding: "5px",
    boxShadow: "rgb(51, 50, 46) 3px 3px 0px",
  },
};
const today = new Date();
const monthYear = today.getMonth() + 1 + "-" + today.getFullYear();

const AddNote = memo(({ refreshPage }) => {
  const [shouldShowContent, setShouldShowContent] = useState(false);
  const [noteInfo, setNotInfo] = useState({ title: "", content: "" });
  const [isSnackOpen, setIsSnackOpen] = useState(false);

  const addNoteClick = async () => {
    try {
      const res = await addNote(noteInfo);
      if (!res.ok) {
        setIsSnackOpen(true);
        throw new Error("Error post request ");
      }
      setIsSnackOpen(false);
      alert("new note added");
      handleCancel();
    } catch (error) {
      console.log(error);
    }
    refreshPage();
  };

  const handleShrink = () => {
    if (noteInfo.title.length === 0) {
      setShouldShowContent(false);
    }
  };

  const handleCancel = () => {
    setNotInfo({ title: "", content: "" });
    setShouldShowContent(false);
  };

  return (
    <div
      className="noteContainer"
      style={{
        backgroundColor: "rgb(190 255 247)",
        height: shouldShowContent ? "300px" : "66px",
      }}>
      <Snackbar
        open={isSnackOpen}
        onClose={() => setIsSnackOpen(false)}
        autoHideDuration={4000}
        message="Error:Note is not added"
      />
      <input
        value={noteInfo.title}
        onChange={(E) => setNotInfo({ ...noteInfo, title: E.target.value })}
        onFocus={() => setShouldShowContent(true)}
        onBlur={handleShrink}
        type="text"
        placeholder="Take a note.."
        className="noteHeader"
        style={{
          ...styles.header,
          borderBottom: shouldShowContent ? "4px solid #33322e" : "none",
        }}
      />
      {shouldShowContent && (
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
            onClick={addNoteClick}>
            Add
          </button>
        </>
      )}
    </div>
  );
});

export default AddNote;
