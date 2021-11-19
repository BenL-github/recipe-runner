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
                 VALUES ('${recipe.title}', '${recipe.description}', ${recipe.serving});`

    pool.query(query, (err, result) => {
        if (err) {
            console.log(err)
            callback(true)
        } else {
            callback(false, result)
        }
    })
}

module.exports.searchRecipe = (keyword, callback) => {
    let query = `SELECT * FROM Recipes WHERE recipeTitle LIKE '%${keyword}%';`

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
                 VALUES ('${user.fname}', '${user.lname}', '${user.email}', ${user.zipCode});`

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
    let query = `SELECT * FROM ShoppingCarts;`

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
    let query = `INSERT INTO ShoppingCarts (cartID, cartOwner)
                 VALUES (${cart.cartID}, ${cart.cartOwner});`

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
    let query = `SELECT * FROM SelectedRecipes;`
    pool.query(query, (err, result) => {
        if (err) {
            console.log(err)
            callback(true)
        } else {
            callback(false, result)
        }
    })
}

module.exports.addSelectedRecipe = (data, callback) => {
    let query = `INSERT INTO SelectedRecipes (selectedCart, selectedRecipe, selectedQuantity)
                 VALUES (${data.selectedCart}, ${data.selectedRecipe}, ${data.selectedQuantity});`

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