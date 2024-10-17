import "./App.css";
import { useEffect, useState } from "react";
import Note from "./components/Note/Note";
import AddNote from "./components/AddNote/AddNote";
import Snackbar from "@mui/material/Snackbar";
import { getNotesReq } from "./components/API";

function App() {
  const [notes, setNotes] = useState([]);
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  let bgColor = false;

  const getNotes = async () => {
    try {
      const response = await getNotesReq();
      if (!response.ok) {
        setIsSnackOpen(true);
        throw new Error("could not fetch notes!");
      }
      setIsSnackOpen(false);
      const notes = await response.json();
      setNotes(notes.reverse());
      // setUpdate({});
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNotes();
  }, []);

  const handleCloseSnackbar = (reason) => {
    // this condition will prevent dissapering Snackbar when clicking away
    if (reason === "clickaway") {
      return;
    }

    setIsSnackOpen(false);
  };
  //search implementation
  const handleSearch = (event) => {
    setSearchValue(event.target.value.trim());
  };

  const filteredNotes = notes.filter((note) => {
    const text = (note.content + " " + note.title).toLowerCase();
    return text.includes(searchValue.toLowerCase());
  });

  return (
    <>
      <Snackbar
        onClose={handleCloseSnackbar}
        open={isSnackOpen}
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
        <AddNote refreshPage={getNotes}></AddNote>
        {filteredNotes?.length > 0 &&
          filteredNotes.map((note) => {
            bgColor = !bgColor;
            return (
              <Note
                note={{ ...note, bgColor }}
                refreshPage={getNotes}
                key={note._id}
              />
            );
          })}
      </div>
    </>
  );
}

export default App;
