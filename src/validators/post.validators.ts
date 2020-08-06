import { check } from 'express-validator';

export const CreatePostValidator = [
    check('description', 'Is not an string').isString(),
    check('createdAt', 'Must be a Date').isDate()
]