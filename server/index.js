require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Note = require("../models/Note");
const cors = require("cors");

const dbPass = process.env.DB_PASS;
const dbUser = process.env.DB_KEY;
mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPass}@cluster0.uobcq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
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

// POST /notes - Add a new note
app.post("/notes", async (req, res) => {
  try {
    const { title, content } = req.body;
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

// GET /notes - Retrieve all notes
app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching notes");
  }
});

// GET /notes/:id - Retrieve a note by ID
app.get("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;

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

// DELETE /notes/:id - Delete a note by ID
app.delete("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;

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

// PUT /notes/:id - Update a note by ID
app.put("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).send("Title and content are required");
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

app.listen(3333, () => {
  console.log("listen on port 3333");
});
