const { Router } = require('express');
const express = require('express');
const app = express();

// set port 
const port = process.env.PORT || 34873;

const path = require("path");
app.use(express.static(path.join(__dirname, "..", "build")))
app.use(express.static("public"));

const db = require('./database/db-connector');


// app.use((req, res, next) => {
//     res.sendFile(path.join(__dirname, "..", "build", "index.html"));
//   });


app.get('/recipes', (req, res)=> {
  res.send()
});

app.listen(port, () => console.log(`Server started successfully.`));
