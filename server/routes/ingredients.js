const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

router.get('/ingredients', (req, res) => {
    db.getIngredientsTable((err, results) => {
        if (err) { 
            res.send(500, "Server Error");
        } else {
            res.send(results);
        }
    })
})

router.post('/ingredients', (req, res) => {
    db.addIngredient((err, results) => {
        if (err) {
            res.send(500, "Server Error")
        } else {
            res.send(200)
        }
    })
})

router.put('/ingredients', (req, res) => {
    db.updateIngredient((err, results) => {
        if (err) {
            res.send(500, "Server Error")
        } else {
            res.send(200)
        }
    })
})

module.exports = router;