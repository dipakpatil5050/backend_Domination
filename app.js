const { isUtf8 } = require("buffer");
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  fs.readdir("./hisaab", (err, files) => {
    if (err) return res.status(500, err.message);
    res.render("index", { files: files });
  });
});
app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/createHisaab", (req, res) => {
  fs.writeFile(`./hissab/${req.body.title}`, req.body.content, (err, data) => {
    if (err) return res.status(500, err);
    res.redirect("/");
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Khatabook app is running on http://localhost:${PORT}`);
});
