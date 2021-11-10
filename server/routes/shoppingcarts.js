const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

router.get('/shoppingcarts', (req, res) => {
    db.getShoppingCartsTable((err, results) => {
        if (err) {
            res.send(500, "Server Error")
        } else {
            res.send(results)
        }
    })
})

router.post('/shoppingcarts', (req, res) => {
    db.addShoppingCart((err, results) => {
        if (err) {
            res.send(500, "Server Error")
        } else {
            res.send(200)
        }
    })
})

module.exports = router;