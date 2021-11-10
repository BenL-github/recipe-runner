const { Router } = require('express');
const express = require('express');
const app = express();
const path = require("path");
const ingredientsRoutes = require('./routes/ingredients');
app.use(express.static(path.join(__dirname, "..", "build")))
app.use(express.static("public"));
const port = process.env.PORT || 34876;

// app.use((req, res, next) => {
//     res.sendFile(path.join(__dirname, "..", "build", "index.html"));
//   });

app.use('/', ingredientsRoutes)

app.listen(port, () => console.log(`Server started successfully.`));
