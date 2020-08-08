import { check } from 'express-validator';

export const CreatePostValidator = [
    check('description', 'Is not an string').notEmpty().isString(),
    // check('createdAt', 'Must be a Date').isDate()
]