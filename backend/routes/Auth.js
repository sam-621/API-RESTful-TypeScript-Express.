const { Router } = require('express');
const router = Router();
const { Register, Login } = require('../controllers/Auth');
const { registerValidator, logInValidator } = require('../middlewares/userValidator'); //Validators schemas
const { validationResult } = require('express-validator');


//REGISTER AN USER
router.post('/register', registerValidator, async (req, res) => {

    const dataErrorSchema = validationResult(req);
    if(!dataErrorSchema.isEmpty()){
        res.json({
            error: dataErrorSchema.array(),
            message: 'Wrong data schema'
        });
        return
    } 

    const userData = req.body;
    const APIresponse = await Register(userData);

    res.json(APIresponse);
});


//LOGIN AN USER
router.post('/login', logInValidator, async (req, res) => {

    const dataErrorSchema = validationResult(req);
    if(!dataErrorSchema.isEmpty()) {
        res.json({
            err: dataErrorSchema.array(),
            token: null,
            message: 'wrong data schema'
        });
        return
    }

    const userData = req.body;

    const APIresponse = await Login(userData);
    res.json(APIresponse);
});

module.exports = router;