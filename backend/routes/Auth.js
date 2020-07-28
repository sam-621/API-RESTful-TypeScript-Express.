const { Router } = require('express')
const router = Router();
const { Register, Login } = require('../services/Auth');
const { registerValidator, logInValidator } = require('../middlewares/validator')
const { validationResult } = require('express-validator');

router.post('/register',registerValidator, (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({
            error: errors.errors,
            message: 'Wrong data schema'
        });
        return
    } 

    const userData = req.body;
    Register(userData, (err, message) => {
        res.json({
            error: err,
            message: message
        });
    });
});

router.post('/login', logInValidator, (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.json({
            err: errors.array(),
            token: null,
            message: 'wrong data schema'
        });
    }

    const userData = req.body;
    Login(userData, (err, token, message) => {
        res.json({
            error: err,
            token: token,
            message: message
        });
    });
});

module.exports = router