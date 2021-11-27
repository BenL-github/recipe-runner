const express = require('express');
const db = require('../database/db-connector');
const router = express.Router();


router.get('/demo', (req, res) => {
    if (req.query.customerID){
        db.getUserGroceryList(req.query.customerID, function (err, results){
            if (err) {
                res.send(500, "Server Error")
            } else {
                res.send(results)
            }
        });
    } else {
        db.getRecipesTable((err, results) => {
            if (err) {
                res.send(500, "Server Error")
            } else{
                res.send(results)
            }
        });
    }
})

module.exports = router;