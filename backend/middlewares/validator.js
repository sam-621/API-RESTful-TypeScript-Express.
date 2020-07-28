const { check } = require('express-validator');

const registerValidator = [
    check('firstName', 'Need to be a name').isString(),
    check('firstName', 'should not be empty').not().isEmpty(),

    check('lastName', 'need to be a last name').isString(),
    check('lastName', 'should not be empty').not().isEmpty(),

    check('username', 'username is required').not().isEmpty(),
    check('username', 'most be an username').isString(),

    check('email', 'insert a valid email').isEmail(),
    
    check('password', 'should be a password').isString(),
    check('password', 'write at least 6 characters').isLength({ min: 6 }),
    check('password', 'should not be empty').not().isEmpty()
]

const validators = {
    registerValidator
}

module.exports = validators