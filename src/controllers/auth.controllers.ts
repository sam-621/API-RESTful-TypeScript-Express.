import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { BAD_REQUEST, OK, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import pool from '../database/poolConnection';
import bcryptjs from 'bcryptjs';
import { IUser } from '../models/user.models';

export async function RegisterController(req: Request, res: Response, next: NextFunction) {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(BAD_REQUEST).json({
            error: errors.array(),
            statusCode: BAD_REQUEST,
            data: null,
            message: 'Wrong data schema'
        });
    }

    const { firstName, lastName, email, username, password }: IUser = req.body;

    try {
        const hashedPassword = await bcryptjs.hash(password, 10);

        const newUser = {
            firstName,
            lastName,
            email,
            username,
            password: hashedPassword
        };

        await pool.query("INSERT INTO Users SET ?", [newUser]);
        
        res.status(OK).json({
            error: false,
            statusCode: OK,
            data: null,
            message: 'You have been registered successfully'
        });

    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).json({
            error: err,
            statusCode: INTERNAL_SERVER_ERROR,
            data: null,
            message: 'Server error'
        });
    }
}