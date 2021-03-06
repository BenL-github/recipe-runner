const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

router.get('/api/selectedrecipes', (req, res) => {
    db.getSelectedRecipesTable((err, results) => {
        if (err) {
            res.send(500, "Server Error")
        } else {
            res.send(results.rows)
        }
    })
})

router.post('/api/selectedrecipes', (req, res) => {
    db.addSelectedRecipe(req.body, (err, results) => {
        if (err) {
            res.send(500, "Server Error")
        } else {
            res.send(200)
        }
    })
})

router.put('/api/selectedrecipes', (req, res) => {
    db.updateSelectedRecipe(req.body, (err, results) => {
        if (err) {
            res.send(500, "Server Error")
        } else {
            res.send(200)
        }
    })
})

router.delete('/api/selectedrecipes', (req, res) => {
    db.deleteSelectedRecipe(req.body, (err, results) => {
        if (err) {
            res.send(500, "Server Error")
        } else {
            res.send(200)
        }
    })
})


module.exports = router;