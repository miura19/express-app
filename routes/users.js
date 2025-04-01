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

router.post("/", (req, res) => {
    const con = getConnection()
    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    con.query(query, [req.body.name, req.body.email, req.body.password], (error) => {
        if (error) {
            console.error("Error insert values:", error);
            res.status(500).json(error);
            return;
        }
        res.status(201).json({ massage: "登録成功", data: req.body });
    });
});


module.exports = router;