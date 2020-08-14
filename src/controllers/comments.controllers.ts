import { Response } from 'express';
import { validationResult } from 'express-validator';
import { BAD_REQUEST, OK, INTERNAL_SERVER_ERROR } from 'http-status-codes';

import { IRequest } from '../models/middleware.models';
import pool from '../database/poolConnection';

export async function CommentAPost(req: IRequest, res: Response): Promise<Response> {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.json({
            error: errors.array(),
            statusCode: BAD_REQUEST,
            data: null,
            message: 'Wrong data schema'
        });
    }

    const { postID } = req.params;
    const userID = req.user?.id;
    const { content, comments } = req.body;

    let postcommentsParsed = Number.parseInt(comments);
    postcommentsParsed++;
    
    const newComment = {
        content,
        createdAt: new Date(),
        userID,
        postID
    };

    try {
        await pool.query("INSERT INTO Comments SET ?", [newComment]);

        await pool.query("UPDATE Posts SET comments = ? WHERE ID = ?", [postcommentsParsed, postID]);

        return res.json({
            error: false,
            statusCode: OK,
            data: null,
            message: 'Comment created'
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