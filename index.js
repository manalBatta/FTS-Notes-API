const express = require("express");
const mongoose = require("mongoose");
const Note = require("./models/Note"); //table or collection
const cors = require("cors");

mongoose
  .connect(
    "mongodb+srv://manalbatta1234:1234@cluster0.uobcq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3333, () => {
  console.log("listen on port 3333");
});

// Secure POST endpoint to add a new note
app.post("/addNewNote", async (req, res) => {
  try {
    const { title, content } = req.body;

    // Check if required fields are provided
    if (!title || !content) {
      return res.status(400).send("Title and content are required");
    }

    const newNote = new Note({
      title,
      content,
      creationDate: new Date(),
    });

    await newNote.save();
    res.status(201).send("Note added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding note");
  }
});

// Secure GET endpoint to retrieve all notes
app.get("/getNotes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching notes");
  }
});

// Secure GET endpoint to retrieve a note by ID
app.get("/getNoteById", async (req, res) => {
  try {
    const id = req.query.id;

    if (!id) {
      return res.status(400).send("Note ID is required");
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).send("Note not found");
    }

    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching note");
  }
});

// Secure DELETE endpoint to delete a note
app.delete("/deleteNote", async (req, res) => {
  try {
    const id = req.query.id;

    if (!id) {
      return res.status(400).send("Note ID is required");
    }

    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).send("Note not found");
    }

    res.status(200).send("Note deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting note");
  }
});

// Secure PUT endpoint to update a note
app.put("/updateNote", async (req, res) => {
  try {
    const { id, title, content } = req.body;

    if (!id || !title || !content) {
      return res.status(400).send("ID, title, and content are required");
    }

    const note = await Note.findByIdAndUpdate(
      id,
      { title, content, creationDate: new Date() },
      { new: true }
    );

    if (!note) {
      return res.status(404).send("Note not found");
    }

    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating note");
  }
});
