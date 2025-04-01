const mysql = require('mysql2');

let con;

const getConnection = () => {
    if (!con) {
        con = mysql.createConnection({
            host: 'mysql',
            user: 'user',
            password: 'password',
            database: 'express-db'
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