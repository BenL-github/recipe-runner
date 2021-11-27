const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
const path = require("path");
const ingredientsRoutes = require('./routes/ingredients');
const recipesRoutes = require('./routes/recipes')
const usersRoutes = require('./routes/users')
const shoppingcartsRoutes = require('./routes/shoppingcarts')
const selectedrecipesRoutes = require('./routes/selectedrecipes')
const recipeingredientsRoutes = require('./routes/recipeingredients')
const demo = require('./routes/demo')
app.use(express.static(path.join(__dirname, "..", "build")))
app.use(express.static("public"));
app.use(cors())
const port = process.env.PORT || 34876;

// app.use((req, res, next) => {
//     res.sendFile(path.join(__dirname, "..", "build", "index.html"));
//   });

app.use('/', ingredientsRoutes)
app.use('/', recipesRoutes)
app.use('/', usersRoutes)
app.use('/', shoppingcartsRoutes)
app.use('/', selectedrecipesRoutes)
app.use('/', recipeingredientsRoutes)
app.use('/', demo)

app.listen(port, () => console.log(`Server started successfully.`));
