const mysql = require('mysql');

// create an .env file with MYSQL_USER = ...\
// host = classmysql.engr.oregonstate.edu
// user = cs340_onid
// pass = db_pass
// database = cs340_onid
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.MYSQL_HOST,
    user            : process.env.MYSQL_USER,
    password        : process.env.MYSQL_PASS,
    database        : process.env.MYSQL_DB
});

module.exports.getIngredientsTable = (callback) => {
    // sql query for all rows from Ingredients table
    let query = "SELECT * FROM Ingredients;";

    // get pool connection
    pool.query(query, (err, result) => {
        if(err) {
            // query resulted in error
            console.log(err);
            callback(true);
        }
        else {
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

// Export it for use in our application
module.exports.getIngredientsTable;
