const express = require('express');
const cors = require('cors')
const userRouter = require('./routes/users')
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require('cookie-parser')
const app = express();
const port = process.env.EXPRESS_PORT;

app.use(cookieParser())
app.use(express.json()) //jsonのリクエスト/レスポンスを正しく受け取る為に必要

const corsOptions = {
    // origin: 'http://localhost:5173',  // フロントエンドのURLを指定
    origin: process.env.NODE_ENV === 'production' ? 'http://54.199.1.39:3000' : 'http://localhost:5173',  // 本番環境ではEC2 IP、開発環境ではlocalhost
    credentials: true,  // クッキーを含める設定
};
app.use(cors(corsOptions)) // corsを有効にする
app.use(express.urlencoded({ extended: true })); //postデータを受け取るのに必要

app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello from Express for Express!!!!!!!!!!');
});

const path = require('path');

// 本番環境（EC2）のみ静的ファイルをサーブ
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend/dist')));

    // どのURLでも index.html を返す
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend/dist/index.html'), (err) => {
            if (err) {
                res.status(500).send('Error loading index.html');
            }
        });
    });
} else {
    // 開発環境の場合は、npm run devで動かす
    // ここでVue.jsの開発サーバーをプロキシする設定などを追加できます
    console.log('Development environment: Running Vue.js with npm run dev');
}

app.use("/users", userRouter);
