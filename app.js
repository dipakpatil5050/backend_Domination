const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  fs.readdir("./index", (err, files) => {
    res.send(files);
    console.log("date in files with folder name", files);
  });
});

app.get("/create", (req, res) => {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = String(currentDate.getFullYear());
  const date = `${day}-${month}-${year}`;
  console.log({ date });

  fs.writeFile(`./files/${date}`, "daal chini", (err, data) => {
    if (err) return res.send("Something went wrong");
    else res.send("Done");
  });
});

app.get("*", (req, res) => {
  res.send("Page Not Found");
});

app.listen(3000);
