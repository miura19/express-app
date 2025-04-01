const express = require('express');
const router = express.Router();
const { getConnection } = require('../db');

router.get("/", (req, res) => {
    const con = getConnection()
    const query = "SELECT * FROM users";
    con.query(query, (error, results) => {
        if (error) {
            console.error("Error select values:", error);
            res.status(500).json(error);
            return;
        }
        res.status(200).json(results);
    });
});

router.get("/check-email", (req, res) => {
    const con = getConnection()
    const email = req.query.email;
    const query = "SELECT * FROM users WHERE email = ?";
    con.query(query, [email], (error, results) => {
        if (error) {
            console.error("Error select values:", error);
            res.status(500).json(error);
            return;
        }
        res.status(200).json({duplicateFlag: results.length > 0});
    });
});


module.exports = router;