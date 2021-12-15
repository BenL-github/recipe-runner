const express = require('express');
const db = require('../database/db-connector');
const router = express.Router();


router.get('/ingredients', (req, res) => {
    db.getIngredientsTable((err, results) => {
        if (err) {
            res.send(500, "Server Error");
        } else {
            res.send(results);
        }
    });
})

router.post('/ingredients', (req, res) => {
    db.addIngredient(req.body, function (err, results) {
        if (err) {
            res.send(500, "Server Error")
        } else {
            res.send(200)
        }
    });
})

router.put('/ingredients', (req, res) => {
    db.updateIngredient(req.body, function (err, results) {
        if (err) {
            res.send(500, "Server Error")
        } else {
            res.send(200)
        }
    });
})

router.delete('/ingredients', (req, res) => {
    db.deleteIngredient(req.body, (err, results) => {
        if (err) {
            res.send(500, "Server Error")
        } else {
            res.send(200)
        }
    });
})

module.exports = router;