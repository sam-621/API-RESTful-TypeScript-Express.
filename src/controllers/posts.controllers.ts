import { Response } from 'express';
import { validationResult } from 'express-validator';
import { BAD_REQUEST, OK, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { RowDataPacket } from 'mysql2';

import { IRequest } from '../models/middleware.models';
import pool from '../database/poolConnection';

export async function PostController(req: IRequest, res: Response): Promise<Response> {

    const errors = validationResult(req);

    if(! errors.isEmpty()) {
        return res.json({
            error: errors.array(),
            statusCode: BAD_REQUEST,
            data: null,
            message: 'Wrong data schema'
        });
    }

    const userID = req.user?.id;
    const { description } = req.body;

    const newPost = {
        description,
        createdAt: new Date(),
        userID: userID
    }

    try {

        await pool.query<RowDataPacket[]>("INSERT INTO Posts SET ?", [newPost]);

        return res.json({
            error: false,
            statusCode: OK,
            data: null,
            message: 'Your posts have been published successfully'
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

export async function getPosts(req: IRequest, res: Response): Promise<Response> {

    try {
        const [posts] = await pool.query<RowDataPacket[]>(`SELECT 
                                                            Users.ID, 
                                                            Users.firstName, 
                                                            Users.username, 
                                                            Posts.ID AS postID, 
                                                            Posts.description, 
                                                            Posts.createdAt, 
                                                            Posts.comments, 
                                                            Posts.likes 
                                                          FROM 
                                                            Users 
                                                          INNER JOIN 
                                                            Posts 
                                                          ON 
                                                            Users.ID = Posts.userID;`
                                                        );
        if(!posts.length) {
            return res.json({
                error: false,
                statusCode: OK,
                data: null,
                message: 'No posts recently created'
            });
        }

        return res.json({
            error: false,
            statusCode: OK,
            data: posts,
            message: 'POSTS FOUNDED'
        });
    } catch (err) {
        return res.status(INTERNAL_SERVER_ERROR).json({
            error: err,
            statusCode: INTERNAL_SERVER_ERROR,
            data: null,
            message: 'INTERNAL SERVER ERROR'
        })
    }
}

export async function getPost(req: IRequest, res: Response) {

    const { postID } = req.params;

    try {
        const [post] = await pool.query<RowDataPacket[]>("SELECT * FROM Posts WHERE ID = ?", [postID])
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