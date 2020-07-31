const { Router } = require('express')
const router = Router();
const { Register, Login } = require('../controllers/Auth');
const { registerValidator, logInValidator } = require('../middlewares/userValidator')
const { validationResult } = require('express-validator');

router.post('/register',registerValidator, async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({
            error: errors.array(),
            message: 'Wrong data schema'
        });
        return
    } 

    const userData = req.body;
    const json = await Register(userData);

    res.json(json);
});

router.post('/login', logInValidator, async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.json({
            err: errors.array(),
            token: null,
            message: 'wrong data schema'
        });
    }

    const userData = req.body;

    const loginOrNot = await Login(userData);
    res.json(loginOrNot);
});

module.exports = router