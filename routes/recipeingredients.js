const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

router.get('/api/recipeingredients', (req, res) => {
    console.log("keyword " + req.query.keyword);
    if (req.query.keyword){
        db.searchRecipeIngredients(req.query.keyword, function (err, results){
            if (err) {
                res.send(500, "Server Error")
            } else {
                res.send(results.rows)
            }
        });
    } else {
        db.getRecipeIngredientsTable((err, results) => {
            if (err) {
                res.send(500, "Server Error")
            } else {
                res.send(results.rows)
            }
        });
    }
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

router.put('/api/recipeingredients', (req, res) => {
    db.updateRecipeIngredient(req.body, (err, results) => {
        if(err){
            res.send(500, "Server Error")
        } else {
            res.send(200)
        }
    })
})

router.delete('/api/recipeingredients', (req, res) => {
    db.deleteRecipeIngredient(req.body, (err, results) => {
        if(err){
            res.send(500, "Server Error")
        } else {
            res.send(200)
        }
    })
})

module.exports = router;