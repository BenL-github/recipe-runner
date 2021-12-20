const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

router.get('/api/recipeingredients', (req, res) => {
    db.getRecipeIngredientsTable((err, results) => {
        if (err) {
            res.send(500, "Server Error")
        } else {
            res.send(results.rows)
        }
    })
})

router.post('/api/recipeingredients', (req, res) => {
    db.addRecipeIngredient(req.body, function (err, results) {
        if (err) {
            res.send(500, "Server Error")
        } else {
            res.send(200)
        }
    })
})

module.exports = router;