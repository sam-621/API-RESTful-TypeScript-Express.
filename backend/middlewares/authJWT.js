const { Router } = require('express');
const authJWT = Router();
const jwt = require('jsonwebtoken');
const { secret_key } = require('../config');
const { GetOne } = require('../lib/MySQL');

authJWT.use((req, res, next) => {

    const token = req.headers.authorization
    
    if(!token) {
        res.json({
            error: true,
            message: 'no token provided' 
        });
    }

    jwt.verify(token, secret_key, (err, decoded) => {
        if(err) {
            res.json({
                error: err,
                message: err.message 
            })
            return
        }
        GetOne('Users', 'ID', decoded.id, (err, user) => {
            if(err) {
                res.json({
                    error: err,
                    message: 'there was an error on the server'
                });
                return
            }
            if(!user.length) {
                res.json({
                    error: true,
                    message: 'What are you trying'
                });
                return
            }
            req.user = decoded;
            next();
        })
    });
}); 

module.exports = authJWT;