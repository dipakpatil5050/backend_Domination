# backend_Domination

# Loops :

## forin, forEach, while loop, do-while loop, forof

### For Loop

```javascript
for (Starting; ending; change) {}

let data = [];

for (var i = 0; i < 12; i++) {
  data.push(i);
  console.log("I Value : " + i);
}
```

### For Each Loop : used for Array iteration

```javascript
var arr = [1, 2, 3, 4];

arr.forEach(function (val, index) {
  console.log("value = ", val + 2, "index = " + index);
});
```

### For in : for Objects

```javascript
var obj = { name: "Dipak", age: 22 };

for (var keys in obj) {
  console.log(keys + " === " + obj[keys]);
}
```

# Types Function

```js
// functional statement

function abcd(val) {
}

 function() {}

fat arrow function
() => {};

fat arrow function with one parameter
a => {};
function abcd(val) {
}

 function() {}

// fat arrow function
() => {};

// fat arrow function with one parameter
a => {};

```

# Callbacks Functions

```javascript
function getSongs() {
  setTimeout(() => {
    console.log("songs comes...");
  }, 2000);
}

const getMoreSongs = () => {
  setTimeout(() => {
    console.log("get more Songs...");
  }, 1200);
};

getSongs();
getMoreSongs();

const connectToServer = (cbfn) => {
  console.log("Connecting to server");
  cbfn();
  setTimeout(() => {
    console.log("server started");
  }, 2000);
};

function fetchCourses(cbfn) {
  console.log("fetching courses....");

  setTimeout(() => {
    cbfn(["course 1", "course2", "course3"]);
  }, 2000);
}

connectToServer(function () {
  fetchCourses(function (data) {
    console.log(data[0]);
  });
});
```

# Promises

```js
function connectToServer() {
  console.log("Connecting to server...");
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve("Connected..");
    }, 2000);
  });
}

const getCourses = () => {
  return new Promise((resolve, reject) => {
    resolve(["Course1, Course2, Course3"]);
  });
};

connectToServer()
  .then(function (resolve) {
    console.log(resolve);
    return getCourses();
  })
  .then((res) => {
    console.log(res);
  });
```

# Import / Export in Node.js

### Export

```javascript
var a = 12;
var b = 15;

module.exports = { a, b };
```

### Import

```js
const data = require("./script");
console.log(data);
```

# Dependencies and Dev Dependencies

## installation :

### Dependencies

```bash
npm i package_name


```

### Dev Dependencies

- which will only be installed till you are in dev mode
- it would not install in production

```bash

npm i package_name --save-dev

```

# File Handling in Node.js

Operations :

- write file
- read file
- update file
- append file
- delete file
- folder creation
- copy, rename, move

## Create a new File

### .WriteFile

```js
const fs = require("fs");

fs.writeFile("data.txt", "hey world!", function (err) {
  if (err) console.log(err);
  else console.log("File created successfully");
});
```

### .readFile

- 1st parameter is the path to the file
- 2nd parameter = Option to read the file
- 3rd parameter = callback function

```js
const fs = require("fs");

fs.readFile("data.txt", "utf8", function (err, data) {
  if (err) console.log(err);
  else console.log(data);
});
```

### .rename

- 1st parameter = old file path
- 2nd parameter = new file path
- 3rd parameter = callback function

```js
const fs = require("fs");

fs.rename("ram.txt", "me.txt", function (err) {
  if (err) console.log(err);
  else console.log("rename success");
});
```

### .unlink

- 1st parameter = file path
- 2rd parameter = callback function
- used to delete the file

```js
const fs = require("fs");

fs.unlink("data.txt", function (err) {
  if (err) console.log(err);
});
```

## create a directory

### .mkdir

```js
const fs = require("fs");

fs.mkdir("mojo", function (err) {
  if (err) console.log(err);
  else console.log("Created directory");
});
```

## read directory

### .readdir

```js
const fs = require("fs");

fs.readdir("mojo", { withFileTypes: true }, function (err, file) {
  if (err) console.log(err);
  else console.log(file);
});
```

# HTTP Module

## Http Server Setup

```js
const http = require("http");

const port = 3000;
const server = http.createServer((req, res) => {
  res.end("Yes server is Running....on Port " + port);
});

server.listen(port);
```

# Nodemon

install nodemon as a dev dependency

- to AutoRestart the server

```bash
npm i nodemon --save-dev
```

# HTTP Server and Routing

```js
const http = require("http");

const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("hey, you are at Route of the app");
  } else if (req.url === "/profile") {
    res.end("hey you come to my Profile");
  } else {
    res.end("Page Not Found");
  }
});

server.listen(port);
```

# Express js : Routing Setup

- It takes two parameters
- app.get(route, handler function);
- "\*" route should always return at the end of the all routes it will handle the non Exists routes in Express, eg. 404 Page Not Found

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to Express Backend Domination");
});

app.get("/api", (req, res) => {
  res.send("This is API endpoint of my first API");
});

app.get("/about", (req, res) => {
  res.send("This is my Personal Details page");
});

app.get("*", (req, res) => {
  res.send("404 ! Page Not Found");
});

app.listen(3000);
```

# Middleware

- request, response and, middleware
- we add app.use to the middleware and the actual middleware function.

```javascript
const express = require("express");
const app = express();

app.use(function (req, res, next) {
  console.log("Hello in Middleware function...");
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to Express Backend Domination");
});
```

# Express session

```js
const express = require("express");
const app = express();
var expressSession = require("express-session");

app.use(
  expressSession({
    secret: "random secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to Express Backend Domination");
});
app.get("/create", (req, res) => {
  res.send("crete page");
});
app.get("/check", (req, res) => {
  req.session.polo = true;
  res.send("check page");
});

app.listen(3000);
```

# CORS middleware

```javascript
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  res.send("hey hi");
});

app.listen(3000);
```

# Cookies

- how to set Cookies on the Browser

```js
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

// Cookies

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hey hi");
});

app.get("/check", (req, res) => {
  console.log(req.cookies.name);
  res.send("hey hi, i'm Checking!");
});

app.get("/banned", (req, res, next) => {
  res.cookie("banned", true);
  res.cookie("name", "dipak");
  res.send("banned");
});

app.listen(3000);
```

# Dynamic Routings

```js
const express = require("express");
const app = express();

// static Routing

app.get("/", (req, res) => {
  res.json(req.headers);
});

// app.get("/profile/dipak", (req, res) => {
//   res.send("Dipak's Profile Data");
// });

// dynamic routes

// static Routing

app.get("/", (req, res) => {
  // res.send("Body Send");
  console.log("data : ", req.ip);
  res.json(req.headers);
});

// Dynamic routing

app.get("/profile/:username/:age", (req, res) => {
  res.send(`${req.params.username}"\ns page and ${req.params.age}`);
});

app.listen(3000);

app.listen(3000);
```

# server side rendering

- Install ejs : npm i ejs
- app.set('view engine', "ejs");
- create a views Folder in Project and index.ejs file into views folder
- load the html in the ejs page
- and use res.render("ejs_fileName_from_views") in express code

```js
const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/users", (req, res) => {
  res.render("users");
});

app.listen(3000);
```

### views/index.ejs folder

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Route</title>
  </head>
  <body>
    <h1>Hello here you will find Calculation in Server side rendering</h1>
    <h2><%= 5+2%></h2>
  </body>
</html>
```

## Form Handeling with ejs

```javascript
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/check", (req, res) => {
  console.log(req.query);
  res.send("sending...");
});

app.get("*", (req, res) => {
  res.send("Page Not Found");
});

app.listen(3000);
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Docs</title>
  </head>
  <body>
    <form action="/check">
      <input type="text" placeholder="name" name="name" />
      <input type="text" placeholder="email" name="email" />
      <input type="submit" />
    </form>
  </body>
</html>
```

## From using POST Method

```js
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", (req, res) => {
  console.log(req.body);
});

app.listen(3000);
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Docs</title>
  </head>
  <body>
    <form action="/create" method="post">
      <input type="text" placeholder="name" name="name" />
      <input type="text" placeholder="email" name="email" />
      <input type="password" name="password" placeholder="password" />
      <input type="submit" />
    </form>
  </body>
</html>
```

## Important middleware to work with API requests and responses

```js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

# Error handling in API

## Types Of Error

1. Top Level Error
2. Reference Error

```js
const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
  try {
    res.send("hello");
  } catch (error) {
    next(error);
  }
});

app.get("/hey", (req, res) => {
  res.send("hey");
});

// Error handlers

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

app.listen(3000);
```

# Khatabook Project

## Need Following Feature into App

1. Create a new note everyday by the todays date.txt
2. All notes should be get on App's Main Screen
3. Note Details when open Particular note.
4. Update the notes and Save Again.
5. Delete the notes.
6.

## Create a new Note with Todays date

```js
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("hey this is route");
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
```

# Read File

```javascript
app.get("/", (req, res) => {
  res.send("hey this is route");
  fs.readdir("./files", (err, files) => {
    console.log(files);
  });
});
```
