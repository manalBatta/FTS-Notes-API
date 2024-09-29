import "./Note.css";

const yellow = "#F4D799";
const pink = "#FFF0EE";
export default function Note({ note }) {
  return (
    <div
      className="noteContainer"
      style={{ backgroundColor: note.bgColor ? pink : yellow }}>
      <h2 className="noteHeader">{note.title}</h2>
      <p className="noteBody">{note.content}</p>
      <span className="creationDate">🗓️{note.creationDate.slice(0, 7)}</span>
    </div>
  );
}
