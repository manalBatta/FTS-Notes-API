import "../Note.css";

const yellow = "#F4D799";
const pink = "#FFF0EE";
export default function Note({ note, refresh, onClick }) {
  function handleDelete(Event, id) {
    Event.stopPropagation();
    const confirmDelete = window.confirm(
      "Are you sure You want to delete ",
      note.title
    );
    if (!confirmDelete) return;
    const deleteNote = async () => {
      try {
        const response = await fetch("/notes/" + id, {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          refresh((r) => !r);
        }
      } catch (error) {
        console.log(error);
      }
    };
    deleteNote();
  }
  return (
    <div
      onClick={() => onClick(note._id)}
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
    </div>
  );
}
