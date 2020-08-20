import { Response } from 'express';
import { validationResult } from 'express-validator';
import { BAD_REQUEST, OK, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { RowDataPacket } from 'mysql2';

import { IRequest } from '../models/middleware.models';
import pool from '../database/poolConnection';


export async function getPost(req: IRequest, res: Response) {

    const { postID } = req.params;

    try {
        const [post] = await pool.query<RowDataPacket[]>("SELECT * FROM Posts WHERE ID = ?", [postID])

        if(!post.length) {
            return res.json({
                error: true,
                statusCode: BAD_REQUEST,
                data: null,
                message: 'This posts doesnt exist'
            });
        }

        const [comments] = await pool.query<RowDataPacket[]>("SELECT * FROM Comments WHERE postID = ?", [postID]);

        const postData = {
            post,
            postComments: comments
        };

        return res.json({
            error: false,
            statusCode: OK,
            data: postData,
            message: 'POSTS'
        }); 
    } catch (err) {
        return res.status(INTERNAL_SERVER_ERROR).json({
            error: err,
            statusCode: INTERNAL_SERVER_ERROR,
            DATA: null,
            message: 'INTERNAL SERVER ERROR'
        });
    }
}