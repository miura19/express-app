const express = require('express');
const mysql = require('mysql2');
const cors = require('cors')

const app = express();
const port = 3000;
app.use(express.json()) //jsonのリクエスト/レスポンスを正しく受け取る為に必要
app.use(cors()) // corsを有効にする

let con; // グローバル変数としてDB接続を保持



const connectionDb = () => {
    con = mysql.createConnection({
        host: 'mysql',
        user: 'user',
        password: 'password',
        database: 'express-db'
    });
    con.connect((err) => {
        if (err) {
            console.error('❌ MySQL connection failed. Retrying in 5 seconds...', err);
            setTimeout(connectionDb, 2000);
        } else {
            console.log('✅ Connected to MySQL');
            global.db = con; // グローバルでDB接続を保持
        }
    });
}
setTimeout(connectionDb, 2000);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello from Express for Express!!!!!!!!!!');
});

app.get("/users", (req , res) => {
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