const mysql = require('mysql2');
const dotenv = require("dotenv");
dotenv.config();

let con;

const getConnection = () => {
    if (!con) {
        con = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            port: process.env.RDS_PORT
        });

        con.connect((err) => {
            if (err) {
                console.error('❌ MySQL connection failed:', err);
                throw err;
            } else {
                console.log('✅ Connected to MySQL');
            }
        });
    }
    return con;
};

module.exports = { getConnection };