const { Pool } = require('pg');
require('dotenv').config();

if (process.env.DATABASE_URL) {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
} else {
    // if on local
    pool = new Pool({
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,
        ssl: {
            rejectUnauthorized: false
        }
    });
}

pool.connect();

// RECIPES
module.exports.getRecipesTable = (callback) => {
    let query = "SELECT * FROM Recipes ORDER BY recipeid ASC;";

    pool.query(query, (err, result) => {
        if (err) {
            console.log(err);
            callback(true);
        } else {
            callback(false, result)
        }
    })
}

module.exports.addRecipe = (data, callback) => {
    let query = `INSERT INTO Recipes (recipeTitle, recipeDescription, recipeServing)
                 VALUES ($1, $2, $3);`
    
    let values = [data.recipetitle, data.recipedescription, data.recipeserving]

    pool.query(query, values, (err, result) => {
        if (err) {
            console.log(err)
            callback(true)
        } else {
            callback(false, result)
        }
    })
}

module.exports.searchRecipe = (keyword, callback) => {
    console.log(keyword);
    let query = `SELECT * FROM Recipes WHERE recipeTitle ILIKE ($1);`

    let values = ["%" + keyword + "%"]

    pool.query(query, values, (err, result) => {
        if (err) {
            console.log(err)
            callback(true)
        } else {
            callback(false, result)
        }
    })
}

module.exports.deleteRecipe = (data, callback) => {
    let query = `DELETE FROM Recipes WHERE recipeID = $1;`

    let values = [data.recipeid]

    pool.query(query, values, (err, result) => {
        if (err) {
            console.log(err)
            callback(true)
        } else {
            callback(false, result)
        }
    })
}

module.exports.updateRecipe = (data, callback) => {
    
    let query = `UPDATE Recipes 
                SET recipeTitle=$1, 
                recipeDescription=$2,
                recipeServing=$3
                WHERE recipeID=$4;`;
    
    let values = [data.recipetitle, data.recipedescription, data.recipeserving, data.recipeid]
    console.log(values)
    pool.query(query, values, (err, result) => {
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
    let query = "SELECT * FROM Ingredients ORDER BY ingredientid ASC;";

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

module.exports.addIngredient = (data, callback) => {
    let query = `INSERT INTO Ingredients (ingredientName, price)
                 VALUES ($1, $2);`

    let values = [data.ingredientname, data.ingredientprice]

    pool.query(query, values, (err, result) => {
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

module.exports.updateIngredient = (data, callback) => {
    let query = `UPDATE Ingredients
                 SET ingredientName=$1, price=$2
                 WHERE ingredientID=$3;`

    let values = [data.ingredientname, data.ingredientprice, data.ingredientid]
    pool.query(query, values, (err, result) => {
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

module.exports.deleteIngredient = (data, callback) => {
    let query = `DELETE FROM Ingredients WHERE ingredientID=$1;`;
    let values = [data.ingredientid]
    pool.query(query, values, (err, result) => {
        if (err) {
            // query resulted in error
            console.log(err);
            callback(true);
        } else {
            // query success
            callback(false, result)
        }
    });
}

module.exports.searchIngredient = (keyword, callback) => {
    let query = `SELECT * FROM Ingredients WHERE ingredientname ILIKE $1;`;
    let values = ["%" + keyword + "%"]
    pool.query(query, values, (err, result) => {
        if (err) {
            // query resulted in error
            console.log(err);
            callback(true);
        } else {
            // query success
            callback(false, result)
        }
    });
}

// USERS
module.exports.getUsersTable = (callback) => {
    let query = "SELECT * FROM Users ORDER BY customerID ASC;"

    pool.query(query, (err, result) => {
        if (err) {
            console.log(err)
            callback(true)
        } else {
            callback(false, result)
        }
    })
}

module.exports.addUser = (data, callback) => {
    let query = `INSERT INTO Users (fName, lName, email, zipCode)
                 VALUES ($1, $2, $3, $4);`

    let values = [data.fname, data.lname, data.email, data.zipcode]

    pool.query(query, values, (err, result) => {
        if (err) {
            console.log(err)
            callback(true)
        } else {
            callback(false, result)
        }
    })
}

module.exports.updateUser = (data, callback) => {
    let query = `UPDATE Users
                 SET fName=$1, lName=$2, email=$3, zipCode=$4
                 WHERE customerID=$5;`

    let values = [data.fname, data.lname, data.email, data.zipcode, data.customerid]

    pool.query(query, values, (err, result) => {
        if (err) {
            console.log(err)
            callback(true)
        } else {
            callback(false, result)
        }
    })
}

module.exports.deleteUser = (data, callback) => {
    let query = `DELETE FROM Users WHERE customerID=$1;`
    let values = [data.customerid]
    pool.query(query, values, (err, result) => {
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
                 JOIN Users ON Users.customerID = ShoppingCarts.customerID
                 ORDER BY ShoppingCarts.cartID ASC;`

    pool.query(query, (err, result) => {
        if (err) {
            console.log(err)
            callback(true)
        } else {
            callback(false, result)
        }
    })
}

module.exports.addShoppingCart = (data, callback) => {
    let query = `INSERT INTO ShoppingCarts (customerID)
                 VALUES ($1);`
    
    let values = [data.customerid]

    pool.query(query, values, (err, result) => {
        if (err) {
            console.log(err)
            callback(true)
        } else {
            callback(false, result)
        }
    })
}

module.exports.deleteShoppingCart = (data, callback) => {
    let query = `DELETE FROM ShoppingCarts 
                WHERE customerID=$1 AND cartID=$2;`
    
    let values = [data.customerid, data.cartid]
                
    pool.query(query, values, (err, result) => {
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
                 JOIN Users ON Users.customerID = ShoppingCarts.customerID
                 ORDER by ShoppingCarts.customerID ASC;`
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
                 VALUES ($1, $2, $3);`

    let values = [data.cartid, data.recipeid, data.quantity]

    pool.query(query, values, (err, result) => {
        if (err) {
            console.log(err)
            callback(true)
        } else {
            callback(false, result)
        }
    })
}

module.exports.updateSelectedRecipe = (data, callback) => {
    let query = `UPDATE SelectedRecipes 
                 SET quantity=$1
                 WHERE cartid=$2 AND recipeid=$3;`
    let values = [data.quantity, data.cartid, data.recipeid]
    pool.query(query, values, (err, result) => {
        if (err) {
            console.log(err)
            callback(true)
        } else {
            callback(false, result)
        }
    })
}

module.exports.deleteSelectedRecipe = (data, callback) => {
    let query = `DELETE FROM SelectedRecipes
                WHERE recipeID=$1 AND cartID=$2;`
    let values = [data.recipeid, data.cartid]
    pool.query(query, values, (err, result) => {
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
                 LEFT JOIN Recipes ON Recipes.recipeID = RecipeIngredients.recipeID
                 ORDER BY Recipes.recipeID ASC;`

    pool.query(query, (err, result) => {
        if (err) {
            console.log(err)
            callback(true)
        } else {
            callback(false, result)
        }
    })
}

module.exports.searchRecipeIngredients = (keyword, callback) => {
    let query = `SELECT Recipes.recipeID, recipeTitle, Ingredients.ingredientID, ingredientName, quantity, uOm FROM RecipeIngredients
                 JOIN Ingredients ON Ingredients.ingredientID = RecipeIngredients.ingredientID
                 LEFT JOIN Recipes ON Recipes.recipeID = RecipeIngredients.recipeID
                 WHERE Recipes.recipetitle ILIKE $1
                 ORDER BY Recipes.recipeID ASC;`

    let values = ["%" + keyword + "%"]
    pool.query(query, values, (err, result) => {
        if (err) {
            console.log(err)
            callback(true)
        } else {
            callback(false, result)
        }
    })
}

module.exports.addRecipeIngredient = (data, callback) => {
    let query = `INSERT INTO RecipeIngredients (recipeid, ingredientid, uom, quantity)
                 VALUES ($1, $2, $3, $4);`
    let values = [data.recipeid, data.ingredientid, data.uom, data.quantity]
    pool.query(query, values, (err, result) => {
        if (err) {
            console.log(err)
            callback(true)
        } else {
            callback(false, result)
        }
    })
}

module.exports.updateRecipeIngredient = (data, callback) => {
    let query = `UPDATE RecipeIngredients
                 SET uom= $1, quantity= $2
                 WHERE recipeID= $3 AND ingredientID= $4;`
    let values = [data.uom, data.quantity, data.recipeid, data.ingredientid]
    pool.query(query, values, (err, result) => {
        if (err) {
            console.log(err)
            callback(true)
        } else {
            callback(false, result)
        }
    })
}

module.exports.deleteRecipeIngredient = (data, callback) => {
    let query = `DELETE FROM RecipeIngredients
                WHERE recipeID= $1 AND ingredientID= $2;`
    let values = [data.recipeid, data.ingredientid]
    pool.query(query, values, (err, result) => {
        if (err) {
            console.log(err)
            callback(true)
        } else {
            callback(false, result)
        }
    })
}

// DEMO 
// retrieves grocery list of a specific user 
module.exports.getUserGroceryList = (customerID, callback) => {
    let query = `SELECT i.ingredientID, i.ingredientName, SUM(ri.quantity * sr.quantity) as quantity, ri.uOm
                FROM Users AS u 
                JOIN ShoppingCarts as sc ON sc.customerID = u.customerID 
                JOIN SelectedRecipes as sr ON sr.cartID = sc.cartID 
                JOIN Recipes as r ON sr.recipeID = r.recipeID 
                JOIN RecipeIngredients as ri ON r.recipeID = ri.recipeID 
                JOIN Ingredients as i ON ri.ingredientID = i.ingredientID 
                WHERE u.customerID = ${customerID}
                GROUP BY i.ingredientID, ri.uom
                ORDER BY i.ingredientID ASC;`
    pool.query(query, (err, result) => {
        if (err) {
            console.log(err)
            callback(true)
        } else {
            console.log(result)
            callback(false, result)
        }
    })
}