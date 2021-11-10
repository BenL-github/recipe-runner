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

module.exports = router;