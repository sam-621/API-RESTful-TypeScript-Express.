const { Router } = require('express');
const authJWT = Router();
const jwt = require('jsonwebtoken');
const { secret_key } = require('../config');
const pool = require('../database/connection');

authJWT.use(async (req, res, next) => {

    const token = req.headers.authorization
    
    if(!token) {
        res.json({
            error: true,
            message: 'no token provided' 
        });
        return
    }

    try {
        const decoded = await jwt.verify(token, secret_key);

        const [user] = await pool.query("SELECT * FROM Users WHERE ID = ?",[decoded.id]);

        if(!user.length) {
            res.json({
                error: true,
                message: 'What are you trying'
            });
            return
        }

        req.user = decoded;
        next();
    } catch (error) {
        res.json({
            error: error,
            message: 'An error has occurred'
        })
    }
}); 

module.exports = authJWT;