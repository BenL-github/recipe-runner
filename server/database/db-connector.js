const mysql = require('mysql');

// create an .env file with MYSQL_USER = ...\
// host = classmysql.engr.oregonstate.edu
// user = cs340_onid
// pass = db_pass
// database = cs340_onid
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB
});


// RECIPES
module.exports.getRecipesTable = (callback) => {
    let query = "SELECT * FROM Recipes;";

    pool.query(query, (err, result) => {
        if (err) {
            console.log(err);
            callback(true);
        } else {
            callback(false, result)
        }
    })
}

module.exports.addRecipe = (recipe, callback) => {
    let query = `INSERT INTO Recipes (recipeTitle, recipeDescription, recipeServing)
                 VALUES (${recipe.title}, ${recipe.description}, ${recipe.serving});`

    pool.query(query, (err, result) => {
        if (err) {
            console.log(err)
            callback(true)
        } else {
            callback(false, result)
        }
    })
}

module.exports.searchRecipe = (recipe, callback) => {
    let query = `SELECT * FROM Recipes WHERE recipeTitle LIKE %${recipe.title}%;`

    pool.query(query, (err, result) => {
        if (err) {
            console.log(err)
            callback(true)
        } else {
            callback(false, result)
        }
    })
}

module.exports.deleteRecipe = (recipe, callback) => {
    let query = `DELETE FROM Recipes WHERE recipeID = ${recipe.id};`

    pool.query(query, (err, result) => {
        if (err) {
            console.log(err)
            callback(true)
        } else {
            callback(false, result)
        }
    })
}


// INGREDIENTS
module.exports.getIngredientsTable = (callback) => {
    // sql query for all rows from Ingredients table
    let query = "SELECT * FROM Ingredients;";

    // get pool connection
    pool.query(query, (err, result) => {
        if (err) {
            // query resulted in error
            console.log(err);
            callback(true);
        } else {
            // query success
            callback(false, result)
        }
    })
}

// start of insertion code

// module.exports.addIngredient = (ingredient, callback) => {
//     let query = `INSERT INTO Ingredients (ingredientName, price) \
//                 VALUES (${ingredient.name},${ingredient.price});`
//     pool.query(query, )
// }

// USERS
module.exports.getUsersTable = (callback) => {
    let query = "SELECT * FROM Users;"

    pool.query(query, (err, result) => {
        if (err) {
            console.log(err)
            callback(true)
        } else {
            callback(false, result)
        }
    })
}

// SHOPPING CARTS
module.exports.getShoppingCartsTable = (callback) => {
    let query = `SELECT cartID, cartOwner, fullName AS (fName, lName) FROM ShoppingCarts
                 JOIN Users ON Users.customerID = ShoppingCarts.cartOwner
                 GROUP BY cartID;`

    pool.query(query, (err, result) => {
        if (err) {
            console.log(err)
            callback(true)
        } else {
            callback(false, result)
        }
    })
}

// SELECTED RECIPES
module.exports.getSelectedRecipesTable = (callback) => {
    let query = `SELECT cartID, fullName AS (fName, lName), recipeID, recipeTitle, selectedQuantity FROM SelectedRecipes
                 JOIN ShoppingCarts ON ShoppingCarts.cartID = SelectedRecipes.cartID
                 JOIN Users ON Users.customerID = ShoppingCarts.cartOwner
                 JOIN Recipes ON Recipes.recipeID = SelectedRecipes.recipeID
                 GROUP BY cartID;`

    pool.query(query, (err, result) => {
        if (err) {
            console.log(err)
            callback(true)
        } else {
            callback(false, result)
        }
    })
}

// RECIPE INGREDIENTS
module.exports.getRecipeIngredientsTable = (callback) => {
    let query = `SELECT recipeID, recipeTitle, ingredientID, ingredientName, ingredientQuantity, uOm FROM RecipeIngredients
                 JOIN Ingredients ON Ingredients.ingredientID = RecipeIngredients.ingredientID
                 JOIN Recipes ON Recipes.recipeID = RecipeIngredients.recipeID
                 GROUP BY recipeID;`

    pool.query(query, (err, results) => {
        if (err) {
            console.log(err)
            callback(true)
        } else {
            callback(false, result)
        }
    })
}

// Export it for use in our application
module.exports.getRecipesTable;
module.exports.addRecipe
module.exports.searchRecipe
module.exports.deleteRecipe
module.exports.getIngredientsTable;
module.exports.getUsersTable;
module.exports.getShoppingCartsTable;
module.exports.getSelectedRecipesTable;
module.exports.getRecipeIngredientsTable;