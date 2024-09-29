import "./App.css";
import { useEffect, useState } from "react";
import Note from "./components/Note";
import { Title } from "chart.js";

function App() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const getNotes = async () => {
      const response = await fetch("/notes");
      if (!response.ok) {
        throw new Error("could not fetch notes");
      }
      const notes = await response.json();
      console.log(notes);
      setNotes(notes);
    };
    getNotes();
  }, []);
  let bgColor = false;
  return (
    <>
      <h1 className="heading">My Notes Keeper</h1>
      <div className="searchContainer">
        <input type="text" placeholder="🔍Search" className="search" />
      </div>
      <div className="notesContainer">
        <Note
          note={{
            title: "Take a note..",
            creationDate: "",
            content: "The cake is delecious",
          }}></Note>
        {notes.length &&
          notes.map((note) => {
            bgColor = !bgColor;
            return <Note note={{ ...note, bgColor }}></Note>;
          })}
      </div>
    </>
    // <table>
    //   <thead>
    //     <tr>
    //       <th className="head">Notes</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {" "}
    //     <tr>
    //       {notes.length > 0 &&
    //         notes.map((note) => {
    //           return (
    //             <>
    //               <td className="title">{note.title}</td>
    //               <td>{note.content}</td>
    //               <td>{note.creationDate}</td>
    //               <td>
    //                 <button className="delete btn">🗑️</button>
    //               </td>
    //             </>
    //           );
    //         })}
    //     </tr>
    //     <tr>
    //       <td></td>
    //       <td></td>
    //       <td></td>
    //       <td>
    //         <button className="add btn">Add</button>
    //       </td>
    //     </tr>
    //   </tbody>
    // </table>
  );
}

export default App;
