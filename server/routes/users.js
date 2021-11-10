const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

router.get('/users', (req, res) => {
    db.getUsersTable((err, results) => {
        if (err) {
            res.send(500, "Server Error")
        } else {
            res.send(results)
        }
    })
})

module.exports = router;