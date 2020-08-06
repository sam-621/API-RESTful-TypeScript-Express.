import { createPool } from 'mysql2/promise';
import { db_host, db_name, db_password, db_user } from '../config/index.config';

const pool = createPool({
    user: db_user,
    password: db_password,
    host: db_host,
    database: db_name,
    connectionLimit: 5
});

export default pool;