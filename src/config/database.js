require('dotenv').config();

const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    database: process.env.DB_NAME,
    port: process.env.PORT,
    connectionLimit: 10
});

if (db) {
    console.log('Conexión exitosa a la base de datos');
}

module.exports = db;