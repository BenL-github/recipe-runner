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

router.post('/users', (req,res) => {
    db.addUser((err, results) => {
        if (err) {
            res.send(500, "Server Error")
        } else {
            res.send(200)
        }
    })
})

router.put('/users', (req, res) => {
    db.updateUser((err, results) => {
        if (err) {
            res.send(500, "Server Error")
        } else {
            res.send(200)
        }
    })
})

module.exports = router;