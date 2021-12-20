const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

router.get('/api/recipes', (req, res) => {
    if (req.query.keyword){
        db.searchRecipe(req.query.keyword, function (err, results){
            if (err) {
                res.send(500, "Server Error")
            } else {
                res.send(results.rows)
            }
        });
    } else {
        db.getRecipesTable((err, results) => {
            if (err) {
                res.send(500, "Server Error")
            } else{
                res.send(results.rows)
            }
        });
    }
})

router.post('/api/recipes', (req, res) => {
    db.addRecipe(req.body, function (err, results) {
        if (err) {
            res.send(500, "Server Error")
        } else {
            res.send(200)
        }
    })
})

router.delete('/api/recipes', (req, res) => {
    db.deleteRecipe(req.body, function (err, results) {
        if (err) {
            res.send(500, "Server Error")
        } else {
            res.send(200)
        }
    })
})

module.exports = router;