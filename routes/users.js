const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    const { getConnection } = require('../server'); // server.js から getConnection をインポート
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

module.exports = router;