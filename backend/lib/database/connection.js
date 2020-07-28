const mysql = require('mysql');
const { db_user, db_password, db_host, db_name } = require('../../config');

const pool = mysql.createPool({
    user: db_user,
    password: db_password,
    host: db_host,
    database: db_name
});

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has to many connections');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused');
        }
        return
    }

    if(connection) {
        connection.release();
        console.log('Database connected');
    }
});

module.exports = pool;