import { check, ValidationChain } from 'express-validator';

export const CreatePostValidator: ValidationChain[] = [
    check('description', 'Is not an string').notEmpty().isString(),
    // check('createdAt', 'Must be a Date').isDate()
]