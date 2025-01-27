const fs = require("fs");

fs.readdir("mojo", { withFileTypes: true }, function (err, file) {
  if (err) console.log(err);
  else console.log(file);
});
