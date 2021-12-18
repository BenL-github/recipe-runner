const mysql = require('mysql');

// create an .env file with MYSQL_USER = ...\
// host = classmysql.engr.oregonstate.edu
// user = cs340_onid
// pass = db_pass
// database = cs340_onid
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'ec2-52-54-38-229.compute-1.amazonaws.com',
    user: 'fxlbkmpoanhprf',
    password: 'ca08262ce4f3d70351c714cad9121e4205ebb62220e57eecfb3fd47fd41dff93',
    database: 'dac4etvf3ssr8l'
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

module.exports.updateRecipe = (recipe, callback) => {
    let query = `UPDATE Recipes 
                SET recipeTitle='${recipe.title}', 
                recipeDescription='${recipe.description}',
                recipeServing='${recipe.serving}'
                WHERE recipeID=${recipe.id};`;
    
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

module.exports.deleteIngredient = (ingredient, callback) => {
    let query = `DELETE FROM Ingredients WHERE ingredientID=${ingredient.id};`

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

module.exports.deleteUser = (user, callback) => {
    let query = `DELETE FROM User WHERE customerID=${user.id};`
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
    let query = `SELECT cartID, ShoppingCarts.customerID, fName, lName FROM ShoppingCarts
                 JOIN Users ON Users.customerID = ShoppingCarts.customerID;`

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
    let query = `INSERT INTO ShoppingCarts (customerID)
                 VALUES (${cart.customerID});`

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
    let query = `SELECT SelectedRecipes.cartID, SelectedRecipes.recipeID, quantity, fName, lName, recipeTitle FROM SelectedRecipes
                 JOIN Recipes ON Recipes.recipeID = SelectedRecipes.recipeID
                 JOIN ShoppingCarts ON ShoppingCarts.cartID = SelectedRecipes.cartID
                 JOIN Users ON Users.customerID = ShoppingCarts.customerID;`
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
    let query = `INSERT INTO SelectedRecipes (cartID, recipeID, quantity)
                 VALUES (${data.cartID}, ${data.recipeID}, ${data.quantity});`

    pool.query(query, (err, result) => {
        if (err) {
            console.log(err)
            callback(true)
        } else {
            callback(false, result)
        }
    })
}

module.exports.deleteSelectedRecipe = (data, callback) => {
    let query = `DELETE FROM SelectedRecipe 
                WHERE recipeID=${data.recipeID} AND cartID=${data.cartID};`
          
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
    let query = `SELECT Recipes.recipeID, recipeTitle, Ingredients.ingredientID, ingredientName, quantity, uOm FROM RecipeIngredients
                 JOIN Ingredients ON Ingredients.ingredientID = RecipeIngredients.ingredientID
                 LEFT JOIN Recipes ON Recipes.recipeID = RecipeIngredients.recipeID;`

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
    let query = `INSERT INTO RecipeIngredients (recipeID, ingredientID, uOm, quantity)
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

module.exports.deleteSelectedRecipe = (data, callback) => {
    let query = `DELETE FROM SelectedRecipe
                WHERE recipeID = ${data.recipeID} AND cartID= ${data.cartID};`
}

// DEMO 
// retrieves grocery list of a specific user 
module.exports.getUserGroceryList = (customerID, callback) => {
    let query = `SELECT i.ingredientID, i.ingredientName, SUM(ri.quantity * sr.quantity) AS quantity, ri.uOm
                    FROM Users AS u 
                    JOIN ShoppingCarts as sc ON sc.customerID = u.customerID 
                    JOIN SelectedRecipes as sr ON sr.cartID = sc.cartID 
                    JOIN Recipes as r ON sr.recipeID = r.recipeID 
                    JOIN RecipeIngredients as ri ON r.recipeID = ri.recipeID 
                    JOIN Ingredients as i ON ri.ingredientID = i.ingredientID 
                    WHERE u.customerID = ${customerID}
                    GROUP BY ri.ingredientID 
                    ORDER BY i.ingredientID ASC;`

    pool.query(query, (err, result) => {
        if (err) {
            console.log(err)
            callback(true)
        } else {
            callback(false, result)
        }
    })
}