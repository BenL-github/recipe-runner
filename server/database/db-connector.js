const mysql = require('mysql');

// create an .env file with MYSQL_USER = ...\
// host = classmysql.engr.oregonstate.edu
// user = cs340_onid
// pass = db_pass
// database = cs340_onid
// const pool = mysql.createPool({
//     connectionLimit: 10,
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASS,
//     database: process.env.MYSQL_DB
// });

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "classmysql.engr.oregonstate.edu",
    user: "cs340_jant",
    password: "2989",
    database: "cs340_jant"
})

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

module.exports.addIngredient = (ingredient, callback) => {
    let query = `INSERT INTO Ingredients (ingredientName, price)
                 VALUES ('${ingredient.name}', ${ingredient.price});`

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

module.exports.updateIngredient = (ingredient, callback) => {
    let query = `UPDATE Ingredients
                 SET ingredientName='${ingredient.name}', price=${ingredient.price}
                 WHERE ingredientID=${ingredient.id};`

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

module.exports.addUser = (user, callback) => {
    let query = `INSERT INTO Users (fName, lName, email, zipCode)
                 VALUES (${user.fname}, ${user.lname}, ${user.email}, ${user.email}, ${user.zipCode});`

    pool.query(query, (err, result) => {
        if (err) {
            console.log(err)
            callback(true)
        } else {
            callback(false, result)
        }
    })
}

module.exports.updateUser = (user, callback) => {
    let query = `UPDATE Users
                 SET fName=${user.fname}, lName=${user.lname}, email=${user.email}, zipCode=${user.zipCode}
                 WHERE customerID=${user.id};`

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

module.exports.addShoppingCart = (cart, callback) => {
    let query = `INSERT INTO ShoppingCarts (cartID, customerID)
                 VALUES (${cart.id}, ${cart.userID});`

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

module.exports.addSelectedRecipe = (selectedRecipe, callback) => {
    let query = `INSERT INTO SelectedRecipes (selectedCart, selectedRecipe, selectedQuantity)
                 VALUES (${selectedRecipe.cartID}, ${selectedRecipe.recipeID}, ${selectedRecipe.quantity});`

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
    let query = `SELECT Recipes.recipeID, recipeTitle, Ingredients.ingredientID, ingredientName, ingredientQuantity, uOm FROM RecipeIngredients
                 JOIN Ingredients ON Ingredients.ingredientID = RecipeIngredients.ingredientID
                 JOIN Recipes ON Recipes.recipeID = RecipeIngredients.recipeID;`

    pool.query(query, (err, result) => {
        if (err) {
            console.log(err)
            callback(true)
        } else {
            callback(false, result)
        }
    })
}

module.exports.addRecipeIngredient = (recipeIngredient, callback) => {
    let query = `INSERT INTO RecipeIngredients (recipeID, ingredientID, uOm, ingredientQuantity)
                 VALUES (${recipeIngredient.recipeID}, ${recipeIngredient.ingredientID}, '${recipeIngredient.uOm}', ${recipeIngredient.quantity});`

    pool.query(query, (err, result) => {
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
module.exports.addIngredient
module.exports.updateIngredient

module.exports.getUsersTable;
module.exports.addUser
module.exports.updateUser

module.exports.getShoppingCartsTable;
module.exports.addShoppingCart

module.exports.getSelectedRecipesTable;
module.exports.addSelectedRecipe

module.exports.getRecipeIngredientsTable;
module.exports.addRecipeIngredient