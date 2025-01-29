const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());

// Directory to store notes
const notesDir = path.join(__dirname, "notes");

// Ensure the notes directory exists
if (!fs.existsSync(notesDir)) {
  fs.mkdirSync(notesDir);
}

// Helper function to get the file path for today's note
const getTodayFilePath = () => {
  const today = new Date().toISOString().split("T")[0];
  return path.join(notesDir, `${today}.txt`);
};

// 1. Create a new note for today
app.post("/notes", (req, res) => {
  const filePath = getTodayFilePath();
  const content = req.body.content || "";

  if (fs.existsSync(filePath)) {
    return res.status(400).json({ message: "Note for today already exists." });
  }

  fs.writeFile(filePath, content, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error creating note.", error: err });
    }
    res.status(201).json({ message: "Note created successfully." });
  });
});

// 2. Get all notes (list all file names)
app.get("/notes", (req, res) => {
  fs.readdir(notesDir, (err, files) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error reading notes directory.", error: err });
    }
    res.json({ notes: files });
  });
});

// 3. Get details of a specific note

app.get("/notes/:filename", (req, res) => {
  const filePath = path.join(notesDir, req.params.filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "Note not found." });
  }

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error reading note.", error: err });
    }
    res.json({ content: data });
  });
});

// 4. Update a note
app.put("/notes/:filename", (req, res) => {
  const filePath = path.join(notesDir, req.params.filename);
  const newContent = req.body.content;

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "Note not found." });
  }

  fs.writeFile(filePath, newContent, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error updating note.", error: err });
    }
    res.json({ message: "Note updated successfully." });
  });
});

// 5. Delete a note
app.delete("/notes/:filename", (req, res) => {
  const filePath = path.join(notesDir, req.params.filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "Note not found." });
  }

  fs.unlink(filePath, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error deleting note.", error: err });
    }
    res.json({ message: "Note deleted successfully." });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Khatabook app is running on http://localhost:${PORT}`);
});
