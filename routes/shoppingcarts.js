const express = require('express');
const router = express.Router();
const db = require('../database/db-connector');

router.get('/api/shoppingcarts', (req, res) => {
    db.getShoppingCartsTable((err, results) => {
        if (err) {
            res.send(500, "Server Error")
        } else {
            res.send(results)
        }
    })
})

router.post('/api/shoppingcarts', (req, res) => {
    db.addShoppingCart(req.body, (err, results) => {
        if (err) {
            res.send(500, "Server Error")
        } else {
            res.send(200)
        }
    })
})

module.exports = router;