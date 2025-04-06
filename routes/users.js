const express = require('express');
const router = express.Router();
const { getConnection } = require('../db');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const JWT = require("jsonwebtoken");

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

const validator = [
    body('name').notEmpty().withMessage('名前は必須です'),
    body('email').isEmail().withMessage('正しいメールアドレスを入力してください'),
    body('password').isLength({ min: 8 }).withMessage('パスワードは8文字以上で入力してください')
]
router.post("/register", validator, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    try {
        const con = getConnection()
        const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";                
        con.query(query, [req.body.name, req.body.email, hashedPassword], (error) => {
            if (error) {
                console.error("Error insert values:", error);
                res.status(500).json(error);
                return;
            }
            res.status(201).json({ message: "登録成功", data: { name: req.body.name, email: req.body.email } });
        });
    } catch (error) {
        console.error("❌サーバーエラー", error);
        res.status(500).json({ error: "サーバーエラーが発生しました。しばらく時間をおいて再度お試しください。" });
    }
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    try {
        const con = getConnection();
        const query = "SELECT * FROM users WHERE email = ?";
        con.query(query, [email], async (error, results) => {
            if (error) {
                console.error("Error select values:", error);
                res.status(500).json(error);
                return;
            }
            if (!results[0]) {
                res.status(200).json({ message: "そのユーザーは存在しません" });
                return
            }
            const isMatch = await bcrypt.compare(password, results[0].password)
            console.log(isMatch);
            
            res.status(200).json({ results });
        });
    } catch (error) {
        console.error("❌サーバーエラー", error);
        res.status(500).json({ error: "サーバーエラーが発生しました。しばらく時間をおいて再度お試しください。" });
    }
})

router.get("/check-email", (req, res) => {
    const con = getConnection();
    const email = req.query.email;
    const query = "SELECT * FROM users WHERE email = ?";
    con.query(query, [email], (error, results) => {
        if (error) {
            console.error("Error select values:", error);
            res.status(500).json(error);
            return;
        }
        res.status(200).json({ duplicateFlag: results.length > 0 });
    });
});


module.exports = router;