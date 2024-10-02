import "./App.css";
import { useEffect, useState } from "react";
import Note from "./components/Note/Note";
import AddNote from "./components/AddNote/AddNote";
// import { Title } from "chart.js";

function App() {
  const [notes, setNotes] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [refresh, setRefresh] = useState(false);
  let bgColor = false;

  useEffect(() => {
    const getNotes = async () => {
      const response = await fetch("/notes");
      if (!response.ok) {
        throw new Error("could not fetch notes");
      }
      const notes = await response.json();
      console.log(notes);
      setNotes(notes.reverse());
    };
    getNotes();
  }, [refresh]);

  //search implementation
  const handleSearch = (Event) => {
    let searchValue = Event.target.value.trim();
    console.log(searchValue);

    if (searchValue === "") {
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const searchResult = notes.map((note) => {
      const text = note.content + " " + note.title;
      if (text.includes(searchValue.toLowerCase()))
        return { ...note, isSearch: true };
      return { ...note, isSearch: false };
    });
    setNotes(searchResult);
  };
  return (
    <>
      <h1 className="heading">My Notes Keeper</h1>
      <div className="searchContainer">
        <input
          type="text"
          placeholder="🔍Search"
          className="search"
          onChange={handleSearch}
        />
      </div>
      <div className="notesContainer">
        <AddNote refresh={setRefresh}></AddNote>
        {notes.length > 0 &&
          notes.map((note) => {
            bgColor = !bgColor;
            const noteComponent = (
              <Note
                note={{ ...note, bgColor }}
                refresh={setRefresh}
                key={note._id}></Note>
            );
            if (isSearching) {
              return note.isSearch ? noteComponent : "";
            }
            return noteComponent;
          })}
      </div>
    </>
  );
}

export default App;
