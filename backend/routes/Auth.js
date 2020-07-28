const { Router } = require('express')
const router = Router();
const { Register } = require('../services/Auth');
const { registerValidator } = require('../middlewares/validator')
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

module.exports = router