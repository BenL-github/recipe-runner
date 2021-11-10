const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

router.get('/selectedrecipes', (req, res) => {
    db.getSelectedRecipesTable((err, results) => {
        if (err) {
            res.send(500, "Server Error")
        } else {
            res.send(results)
        }
    })
})

module.exports = router;