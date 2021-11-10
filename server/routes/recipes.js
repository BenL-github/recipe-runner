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
    db.addRecipe((err, results) => {
        if (err) {
            res.send(500, "Server Error")
        } else {
            res.send(200)
        }
    })
})

router.search('/recipes', (req, res) => {
    db.searchRecipe((err, results) => {
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