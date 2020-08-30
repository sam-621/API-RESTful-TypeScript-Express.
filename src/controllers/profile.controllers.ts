import { Response } from "express";
import { IRequest } from "../models/middleware.models";
import pool from "../database/poolConnection";
import { RowDataPacket } from "mysql2";
import { OK, INTERNAL_SERVER_ERROR } from "http-status-codes";

export async function ProfileController(
  req: IRequest,
  res: Response
): Promise<Response> {
  const userID = req.user?.id;

  try {
    const [user] = await pool.query<RowDataPacket[]>(
      "SELECT firstName, username FROM Users where ID = ?",
      [userID]
    );
    const [posts] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM Posts WHERE userID = ?",
      [userID]
    );

    return res.json({
      error: false,
      statusCode: OK,
      data: {
        userInfo: user,
        userPosts: posts,
      },
      message: "OK",
    });
  } catch (err) {
    return res.json({
      error: err,
      statusCode: INTERNAL_SERVER_ERROR,
      data: null,
      message: "INTERNAL SERVER ERROR",
    });
  }
}
