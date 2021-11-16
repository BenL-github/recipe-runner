const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

router.get('/recipeingredients', (req, res) => {
    db.getRecipeIngredientsTable((err, results) => {
        if (err) {
            res.send(500, "Server Error")
        } else {
            res.send(results)
        }
    })
})

router.post('/recipeingredients', (req, res) => {
    db.addRecipeIngredient(req.body, function (err, results) {
        if (err) {
            res.send(500, "Server Error")
        } else {
            res.send(200)
        }
    })
})

module.exports = router;