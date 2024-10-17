const deleteNote = async (id) =>
  await fetch("/notes/" + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
  });

const updateNote = async (note) => {
  console.log(note);
  return await fetch("/notes/" + note._id, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
};

const addNote = async (noteInfo) =>
  await fetch("/notes", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(noteInfo),
  });

const getNotesReq = async () => await fetch("/notes");

export { deleteNote, updateNote, addNote, getNotesReq };
