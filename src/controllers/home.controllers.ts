import { Response } from 'express';
import { IRequest } from '../models/middleware.models';
import pool from '../database/poolConnection';
import { RowDataPacket } from 'mysql2';
import { OK, INTERNAL_SERVER_ERROR } from 'http-status-codes';

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