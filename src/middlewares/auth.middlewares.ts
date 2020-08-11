import { Router, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { BAD_REQUEST, UNAUTHORIZED, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { RowDataPacket } from 'mysql2';

import { secret_token } from '../config/index.config';
import { IRequest } from '../models/middleware.models';
import { IDecoded } from '../models/token.models';
import pool from '../database/poolConnection';

const authMiddleware = Router();

authMiddleware.use(async (req: IRequest, res: Response, next: NextFunction) => {

    const token = req.headers["authorization"];

    if(!token) {
        return res.status(BAD_REQUEST).json({
            error: true,
            statusCode: BAD_REQUEST,
            data: null,
            message: 'NO TOKEN PROVIDED'
        });
    }

    try {
        const decoded = jwt.verify(token, secret_token) as IDecoded;

        const [user] = await pool.query<RowDataPacket[]>("SELECT ID FROM Users WHERE ID = ?", [decoded.id]);

        if(!user.length) {
            return res.status(UNAUTHORIZED).json({
                error: true,
                statusCode: UNAUTHORIZED,
                data: null,
                message: 'UNAUTHORIZED'
            });
        }

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).json({
            error: error,
            statusCode: INTERNAL_SERVER_ERROR,
            data: null,
            message: 'INTERNAL SERVER ERROR'
        });
    }

});

export default authMiddleware;