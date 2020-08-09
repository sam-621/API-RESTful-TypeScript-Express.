import { check, ValidationChain } from 'express-validator';

export const LikesValidator: ValidationChain[] = [
    check('postLikes', 'Likes must be a number').isNumeric()
];