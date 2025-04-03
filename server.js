const express = require('express');
const cors = require('cors')
const userRouter = require('./routes/users')
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.EXPRESS_PORT;
app.use(express.json()) //jsonのリクエスト/レスポンスを正しく受け取る為に必要
app.use(cors()) // corsを有効にする
app.use(express.urlencoded({ extended: true })); //postデータを受け取るのに必要

app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello from Express for Express!!!!!!!!!!');
});

app.use("/users", userRouter);
