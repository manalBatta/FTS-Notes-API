import "./App.css";
import { useEffect, useState } from "react";
import Note from "./components/Note/Note";
import AddNote from "./components/AddNote/AddNote";
import Form from "./components/Form/Form";
import Snackbar from "@mui/material/Snackbar";

function App() {
  const [notes, setNotes] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [update, setUpdate] = useState({});
  const [open, setOpen] = useState(false);
  let bgColor = false;

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await fetch("/notes");
        if (!response.ok) {
          setOpen(true);
          throw new Error("could not fetch notes!");
        }
        setOpen(false);
        const notes = await response.json();
        setNotes(notes.reverse());
        setUpdate({});
      } catch (error) {
        console.log(error);
      }
    };
    getNotes();
  }, [refresh]);

  const handleClose = (event, reason) => {
    // this condition will prevent dissapering Snackbar when clicking away
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  //search implementation
  const handleSearch = (Event) => {
    let searchValue = Event.target.value.trim();
    if (searchValue === "") {
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    setNotes((prev) => {
      return prev.map((note) => {
        const text = (note.content + " " + note.title).toLowerCase();
        const isSearch = text.includes(searchValue.toLowerCase());
        return { ...note, isSearch: isSearch };
      });
    });
  };

  const handleClick = (id) => {
    //update form shows when a note is deleted
    //#solved : add a Event.preventPropagation on the delete button
    const clicked = notes.filter((note) => note._id == id)[0];
    setUpdate(clicked);
  };

  const filteredNotes = notes.filter((note) => note.isSearch);

  return (
    <>
      <Snackbar
        onClose={handleClose}
        open={open}
        autoHideDuration={6000}
        message="Server Error try again later"
      />
      <h1 className="heading">My Notes Keeper</h1>
      <div className="searchContainer">
        <input
          type="search"
          placeholder="🔍Search"
          className="search"
          onChange={handleSearch}
        />
      </div>
      <div className="notesContainer">
        <AddNote refresh={setRefresh}></AddNote>
        {(isSearching ? filteredNotes : notes)?.length > 0 &&
          (isSearching ? filteredNotes : notes).map((note) => {
            bgColor = !bgColor;
            return (
              <Note
                onClick={handleClick}
                note={{ ...note, bgColor }}
                refresh={setRefresh}
                key={note._id}
              />
            );
          })}
      </div>
      {Object.keys(update).length !== 0 && (
        <Form noteProp={update} refresh={setRefresh}></Form>
      )}
    </>
  );
}

export default App;
