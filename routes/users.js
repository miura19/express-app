const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const JWT = require("jsonwebtoken");
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "トークンがありません" });
    try {
        const decoded = JWT.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded; // あとで使いたければ
        next(); // 認証OK → 次の処理へ
    } catch (err) {
        return res.status(403).json({ message: "無効なトークンです" });
    }
};

router.get("/", verifyToken, async (req, res) => {
    try {
        const users = await prisma.users.findMany();
        if (users.length === 0) {
            return res.status(404).json({ message: "ユーザーが見つかりませんでした。" });
        }
        res.status(200).json(users);
    } catch (error) {
        console.error("Error select values:", error);
        res.status(500).json({ message: "サーバーエラーが発生しました。" });
        return;
    }
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
        const user = await prisma.users.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            },
        });
        res.status(201).json({ message: "登録成功", data: { name: user.name, email: user.email } });
    } catch (error) {
        console.error("Error insert values:", error);
        res.status(500).json({ error: "サーバーエラーが発生しました。しばらく時間をおいて再度お試しください。" });
    }
});

const generateAccessToken = (user) => {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
    };
    return JWT.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1d' });
};

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.users.findUnique({
            where: { email: email },
        });
        if (!user) {
            return res.status(401).json({ message: "そのユーザーは存在しません", errorFlg: 0 });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "パスワードに誤りがあります", errorFlg: 1 });
        }
        const token = generateAccessToken(user);
        res.status(200).json({ message: "ログイン成功", user: { name: user.name, email: user.email }, token });
    } catch (error) {
        console.error("❌サーバーエラー", error);
        res.status(500).json({ error: "サーバーエラーが発生しました。しばらく時間をおいて再度お試しください。" });
    }
})

router.get("/check-email", async (req, res) => {
    const email = req.query.email;
    try {
        const user = await prisma.users.findUnique({
            where: { email: email, },
        });
        if (user) {
            res.status(200).json({ duplicateFlag: true });
        } else {
            res.status(200).json({ duplicateFlag: false });
        }
    } catch (error) {
        console.error("Error select values:", error);
        res.status(500).json(error);
    }
});

module.exports = router;