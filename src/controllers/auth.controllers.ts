import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { BAD_REQUEST, OK, INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHORIZED } from 'http-status-codes';
import pool from '../database/poolConnection';
import { RowDataPacket } from 'mysql2';
import bcryptjs from 'bcryptjs';
import { IUser, ILoginUser } from '../models/user.models';
import { IPayload } from '../models/token.models';
import { sign } from 'jsonwebtoken';
import { secret_token } from '../config/index.config';

export async function RegisterController(req: Request, res: Response): Promise<Response> {

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
        
        return res.status(OK).json({
            error: false,
            statusCode: OK,
            data: null,
            message: 'You have been registered successfully'
        });

    } catch (err) {
        return res.status(INTERNAL_SERVER_ERROR).json({
            error: err,
            statusCode: INTERNAL_SERVER_ERROR,
            data: null,
            message: 'Server error'
        });
    }
}

export async function LogInController(req: Request, res: Response): Promise<Response> {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(BAD_REQUEST).json({
            error: errors.array(),
            statusCode: BAD_REQUEST,
            data: null,
            message: 'WRONG DATA SCHEMA'
        });
    }

    const { email, password }: ILoginUser = req.body;

    try {
        const [user] = await pool.query<RowDataPacket[]>("SELECT ID, password, rol from Users WHERE email = ?", [email]);

        if(!user.length) {
            return res.status(NOT_FOUND).json({
                error: true,
                statusCode: NOT_FOUND,
                data: null,
                message: 'NO USER FOUNDED'
            });
        }

        if(! await bcryptjs.compare(password, user[0].password)) {
            return res.status(UNAUTHORIZED).json({
                error: true,
                statusCode: UNAUTHORIZED,
                data: null,
                message: 'PASSWORDS DONT MATCH'
            });
        }

        delete user[0].password;

        const payload: IPayload = {
            id: user[0].ID,
            rol: user[0].rol
        }

        const token = sign(payload, secret_token, /*{ expiresIn: 1+'s' }*/ );

        return res.status(OK).json({
            error: false,
            statusCode: OK,
            data: token,
            message: 'SUCCESS'
        });

    } catch (err) {
        return res.status(INTERNAL_SERVER_ERROR).json({
            error: err,
            statusCode: INTERNAL_SERVER_ERROR,
            data: null,
            message: 'INTERNAL SERVER ERROR'
        });
    }
}