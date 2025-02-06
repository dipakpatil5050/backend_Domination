const { isUtf8 } = require("buffer");
const { log } = require("console");
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
    console.log("Files : ", files);
    if (err) return res.status(500, err.message);
    res.render("index", { files: files });
  });
});
app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/createhisaab", (req, res) => {
  let currentDate = new Date();

  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();

  let date = `${day}-${month}-${year}`;

  fs.writeFile(`./hisaab/${date}`, req.body.content, (err, data) => {
    if (err) return res.status(500, err);
    res.redirect("/");
  });
});

app.get("/edit/:filename", (req, res) => {
  fs.readFile(`./hisaab/${req.params.filename}`, "utf-8", (err, filedata) => {
    if (err) return res.status(500).send(err);
    res.render("edit", { filedata, filename: req.params.filename });
  });
});

app.post("/update/:filename", (req, res) => {
  fs.writeFile(`./hisaab/${req.params.filename}`, req.body.content, (err) => {
    if (err) return res.status(500).send(err);
    res.redirect("/");
  });
});

app.get("/hisaab/:filename", (req, res) => {
  fs.readFile(`./hisaab/${req.params.filename}`, "utf-8", (err, filedata) => {
    if (err) return res.status(500).send(err);
    res.render("hisaab", { filedata, filename: req.params.filename });
  });
});

app.get("/delete/:filename", (req, res) => {
  fs.unlink(`./hisaab/${req.params.filename}`, function (err) {
    if (err) console.log(err);
    res.redirect("/");
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Khatabook app is running on http://localhost:${PORT}`);
});
