const { Router } = require('express');
const express = require('express');
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "..", "build")))
app.use(express.static("public"));
const port = process.env.PORT || 34876;

// app.use((req, res, next) => {
//     res.sendFile(path.join(__dirname, "..", "build", "index.html"));
//   });

app.get("/api/ingredients", (req, res) => {
    const ingredients = [
      {id: 1, ingredientName: "brocolli", price:3},
      {id: 2, ingredientName: "chicken", price:6},
      {id: 3, ingredientName: 'Tikka Masala Sauce', price: 7.50 }
    ]
    res.json(ingredients)
  });

app.listen(port, () => console.log(`Server started successfully.`));
