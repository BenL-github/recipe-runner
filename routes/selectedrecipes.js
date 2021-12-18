const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

router.get('/api/selectedrecipes', (req, res) => {
    db.getSelectedRecipesTable((err, results) => {
        if (err) {
            res.send(500, "Server Error")
        } else {
            res.send(results)
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

module.exports = router;