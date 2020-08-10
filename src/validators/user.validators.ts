  
import { check, ValidationChain } from 'express-validator';

export const registerValidator: ValidationChain[] = [
    check('firstName', 'Insert a name').notEmpty().isString(),
    check('lastName', 'Insert a last name').notEmpty().isString(),
    check('email', 'insert a valid email').isEmail(),
    check('username', 'Insert a username').notEmpty().isString(),
    check('password', 'Insert at least 6 characters').notEmpty().isLength({ min: 6 })
]

export const loginValidator: ValidationChain[] = [
    check('email', 'Insert a valid email').isEmail(),
    check('password', 'Insert apassword').isLength({ min: 6 })
]

export const UpdateInfoValidator: ValidationChain[] = [
    check('firstName', 'Insert a name').notEmpty().isString(),
    check('lastName', 'Insert a last name').notEmpty().isString(),
    check('email', 'insert a valid email').isEmail(),
    check('username', 'Insert a username').notEmpty().isString(),
]