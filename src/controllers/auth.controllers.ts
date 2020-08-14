import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { BAD_REQUEST, OK, INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHORIZED } from 'http-status-codes';
import { RowDataPacket } from 'mysql2';
import bcryptjs from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import pool from '../database/poolConnection';
import { IUser, ILoginUser } from '../models/user.models';
import { IPayload } from '../models/token.models';
import { secret_token, expires_in } from '../config/index.config';

export async function RegisterController(req: Request, res: Response): Promise<Response> {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.json({
            error: errors.array(),
            statusCode: BAD_REQUEST,
            data: null,
            message: 'Wrong data schema'
        });
    }

    const { firstName, lastName, email, username, password }: IUser = req.body;

    try {
        const [user] = await pool.query<RowDataPacket[]>("SELECT email FROM Users WHERE email = ?", [email]);

        if(user.length) {
            return res.json({
                error: true,
                statusCode: BAD_REQUEST,
                data: null,
                message: 'There is already someone registered with that email'
            });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);

        const newUser = {
            firstName,
            lastName,
            email,
            username,
            password: hashedPassword
        };

        await pool.query("INSERT INTO Users SET ?", [newUser]);
        
        return res.json({
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
            message: 'INTERNAL SERVER ERROR'
        });
    }
}

export async function LogInController(req: Request, res: Response): Promise<Response> {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.json({
            error: errors.array(),
            statusCode: BAD_REQUEST,
            data: null,
            message: 'Wrong data schema'
        });
    }

    const { email, password }: ILoginUser = req.body;

    try {
        const [user] = await pool.query<RowDataPacket[]>(`SELECT 
                                                            ID, 
                                                            password, 
                                                            rol 
                                                         FROM Users WHERE email = ?`, [email]);

        if(!user.length) {
            return res.json({
                error: true,
                statusCode: NOT_FOUND,
                data: null,
                message: 'Wrong credentials'
            });
        }

        if(! await bcryptjs.compare(password, user[0].password)) {
            return res.json({
                error: true,
                statusCode: UNAUTHORIZED,
                data: null,
                message: 'Wrong credentials'
            });
        }

        delete user[0].password;

        const payload: IPayload = {
            id: user[0].ID,
            rol: user[0].rol
        }

        const token = sign(payload, secret_token, { expiresIn: expires_in } );

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