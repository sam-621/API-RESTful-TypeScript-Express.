import { Request, Response } from 'express'; 
import pool from '../database/poolConnection';
import { RowDataPacket } from 'mysql2';
import { IRequest } from '../models/middleware.models';
import { BAD_REQUEST, OK, INTERNAL_SERVER_ERROR } from 'http-status-codes';

export async function GetUserInfo(req: IRequest, res: Response): Promise<Response> {
    
    const requestData = 'firstName, lastName, email, username, followers';
    const userID = req.user?.id;
    try {
        const [userInfo] = await pool.query<RowDataPacket[]>(`SELECT ${requestData} FROM Users WHERE ID = ?`, [userID]);

        if(!userInfo.length) {
            return res.status(BAD_REQUEST).json({
                error: true,
                statusCode: BAD_REQUEST,
                data: null,
                message: 'NO USER FOUNDED'
            });
        }

        return res.status(OK).json({
            error: false,
            statusCode: OK,
            data: userInfo,
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