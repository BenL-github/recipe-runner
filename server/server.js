const { Router } = require('express');
const express = require('express');
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "..", "build")))
app.use(express.static("public"));
const port = process.env.PORT || 34873;

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
  });

// app.get("/", (req, res) => {
//     res.send("This is from express.js");
//   });

app.listen(port, () => console.log(`Server started successfully.`));
