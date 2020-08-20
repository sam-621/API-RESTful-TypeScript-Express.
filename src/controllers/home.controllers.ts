import { Response } from 'express';
import { IRequest } from '../models/middleware.models';
import pool from '../database/poolConnection';
import { RowDataPacket } from 'mysql2';
import { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } from 'http-status-codes';
import { validationResult } from 'express-validator';

export async function HomeController(req: IRequest, res: Response) {
    const userID = req.user?.id;

    try {
        const [userInfo] = await pool.query<RowDataPacket[]>("SELECT firstName, username FROM Users WHERE ID = ?", [userID]);
        const [users] = await pool.query<RowDataPacket[]>("SELECT ID, firstName, username FROM Users WHERE NOT ID = ? ", [userID]);
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

        const responseData = {
            userInfo,
            posts,
            users
        }

        return res.json({
            error: false,
            statusCode: OK,
            data: responseData,
            message: 'OK'
        });

    } catch (err) {
        return res.json({
            error: err,
            statusCode: INTERNAL_SERVER_ERROR,
            data: null,
            message: 'INTERNAL SERVER ERROR'
        });
    }
}

export async function CreatePostController(req: IRequest, res: Response): Promise<Response> {

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