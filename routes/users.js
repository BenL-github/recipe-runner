const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

router.get('/api/users', (req, res) => {
    db.getUsersTable((err, results) => {
        if (err) {
            res.send(500, "Server Error")
        } else {
            res.send(results.rows)
        }
    })
})

router.post('/api/users', (req,res) => {
    db.addUser(req.body, (err, results) => {
        if (err) {
            res.send(500, "Server Error")
        } else {
            res.send(200)
        }
    })
})

router.put('/api/users', (req, res) => {
    db.updateUser(req.body, (err, results) => {
        if (err) {
            res.send(500, "Server Error")
        } else {
            res.send(200)
        }
    })
})

router.delete('/api/users', (req, res) => {
    db.deleteUser(req.body, (err, results) => {
        if (err) {
            res.send(500, "Server Error")
        } else {
            res.send(200)
        }
    })
})

module.exports = router;