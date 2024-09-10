const mongoose = require("mongoose");

const Schema = mongoose.Schema; //class

const NoteSchema = new Schema({
  //fields in the note
  title: String,
  content: String,
  creationDate: Date,
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
