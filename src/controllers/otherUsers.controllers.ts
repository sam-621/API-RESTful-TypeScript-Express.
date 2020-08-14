import { Response } from 'express';
import { IRequest } from '../models/middleware.models'
import { INTERNAL_SERVER_ERROR, OK, BAD_REQUEST } from 'http-status-codes';
import { validationResult } from 'express-validator';

import pool from '../database/poolConnection';

export async function Follow(req: IRequest, res: Response): Promise<Response> {

    const errors = validationResult(req);

    if(! errors.isEmpty()) {
        return res.json({
            error: errors.array(),
            statusCode: BAD_REQUEST,
            data: null,
            message: 'Wrong data schema'
        });
    }

    const followed = req.params.userID;
    const follower = req.user?.id;
    const { followers } = req.body;

    let followersParsed = Number.parseInt(followers);
    followersParsed++;

    const newFriends = {
        followed,
        follower
    }

    try {
        await pool.query('INSERT INTO Friends SET ?', [newFriends]);
        await pool.query('UPDATE Users SET followers = ? WHERE ID = ?', [followersParsed, followed]);

        return res.json({
            error: false,
            statusCode: OK,
            data: null,
            message: 'Now you are following' // + username
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