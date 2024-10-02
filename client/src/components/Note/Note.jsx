import "../Note.css";

const yellow = "#F4D799";
const pink = "#FFF0EE";
export default function Note({ note, refresh }) {
  function handleDelete(id) {
    const confirmDelete = window.confirm("Are you sure");
    if (!confirmDelete) return;
    try {
      fetch("/notes/" + id, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          refresh((r) => !r);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div
      className="noteContainer"
      style={{ backgroundColor: note.bgColor ? pink : yellow }}>
      <h2 className="noteHeader">{note.title}</h2>
      <p className="noteBody">{note.content}</p>
      <span className="creationDate">🗓️{note.creationDate.slice(0, 7)}</span>
      <button className="btn" onClick={() => handleDelete(note._id)}>
        ⛔
      </button>
    </div>
  );
}
