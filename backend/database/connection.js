const mysql = require('mysql2/promise');
const { db_user, db_password, db_host, db_name } = require('../config');

const pool = mysql.createPool({
    user: db_user,
    password: db_password,
    host: db_host,
    database: db_name
});

pool.getConnection((err, connection) => {
    if (err) {
        throw new Error
    }

    if(connection) {
        connection.release();
        console.log('Database connected');
    }
});

module.exports = pool;