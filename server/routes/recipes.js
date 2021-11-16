const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

router.get('/recipes', (req, res) => {
    db.getRecipesTable((err, results) => {
        if (err) {
            res.send(500, "Server Error")
        } else{
            res.send(results)
        }
    })
})

router.post('/recipes', (req, res) => {
    db.addRecipe(req.body, function (err, results) {
        if (err) {
            res.send(500, "Server Error")
        } else {
            res.send(200)
        }
    })
})

router.get('/recipes/:keyword', (req, res) => {
    db.searchRecipe(req.params.keyword, function (err, results) {
        if (err) {
            res.send(500, "Server Error")
        } else {
            res.send(results)
        }
    })
})

router.delete('/recipes', (req, res) => {
    db.deleteRecipe((err, results) => {
        if (err) {
            res.send(500, "Server Error")
        } else {
            res.send(200)
        }
    })
})

module.exports = router;