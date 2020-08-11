import { Response } from 'express'; 
import { BAD_REQUEST, OK, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { RowDataPacket } from 'mysql2';
import { validationResult } from 'express-validator';
import bcryptjs from 'bcryptjs';

import pool from '../database/poolConnection';
import { IRequest } from '../models/middleware.models';

export async function GetUserInfo(req: IRequest, res: Response): Promise<Response> {
    
    const requestData = 'firstName, lastName, email, username, followers';
    const userID = req.user?.id;
    try {
        const [userInfo] = await pool.query<RowDataPacket[]>(`SELECT
                                                                firstName, 
                                                                lastName, 
                                                                email, 
                                                                username, 
                                                                followers      
                                                              FROM Users WHERE ID = ?`, [userID]);
                                                              
        const [userPosts] = await pool.query<RowDataPacket[]>("SELECT * FROM Posts WHERE userID = ?", [userID]);

        if(!userInfo.length) {
            return res.status(BAD_REQUEST).json({
                error: true,
                statusCode: BAD_REQUEST,
                data: null,
                message: 'NO USER FOUNDED'
            });
        }

        const responseData = {
            userInfo,
            userPosts
        }
        return res.status(OK).json({
            error: false,
            statusCode: OK,
            data: responseData,
            message: 'OK'
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

export async function UpdateUserInfo(req: IRequest, res: Response): Promise<Response> {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(BAD_REQUEST).json({
            error: errors.array(),
            statusCode: BAD_REQUEST,
            data: null,
            message: 'WRONG DATA SCHEMA'
        });
    }

    const userDataUpdated = req.body;
    const userID = req.user?.id;

    try {
        await pool.query("UPDATE Users SET ? WHERE ID = ?", [userDataUpdated, userID]);

        return res.status(OK).json({
            error: false,
            statusCode: OK,
            data: null,
            message: 'Changes saved'
        });

    } catch (err) {
        return res.status(INTERNAL_SERVER_ERROR).json({
            eror: err,
            statusCode: INTERNAL_SERVER_ERROR,
            data: null,
            message: 'INTERNAL SERVER ERROR'
        });
    }
}

export async function UpdatePasswordController(req: IRequest, res: Response): Promise<Response> {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(BAD_REQUEST).json({
            error: errors.array(),
            statusCode: BAD_REQUEST,
            data: null,
            message: 'WRONG DATA SCHEMA'
        });
    }
    
    const { newPassword, oldPassword } = req.body;
    const userID = req.user?.id;

    try {
        const [user] = await pool.query<RowDataPacket[]>("SELECT password FROM Users WHERE ID = ?", [userID]);

        if(! await bcryptjs.compare(oldPassword, user[0].password)) {
            return res.status(BAD_REQUEST).json({
                error: true,
                statusCode: BAD_REQUEST,
                data: null,
                message: 'Incorrect old password'
            });
        }

        const hashedUpdatedPassword = await bcryptjs.hash(newPassword, 10);

        await pool.query("UPDATE Users SET password = ? WHERE ID = ?", [hashedUpdatedPassword, userID]);

        return res.status(OK).json({
            error: false,
            statusCode: OK,
            data: null,
            message: 'Your password has been successfully updated'
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