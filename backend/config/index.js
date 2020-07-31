require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_host: process.env.DB_HOST,
    db_name: process.env.DB_NAME,
    token_secret_key: process.env.TOKEN_SECRET_KEY,
    token_expires_in: process.env.TOKEN_EXPIRE_IN
};

module.exports = config;