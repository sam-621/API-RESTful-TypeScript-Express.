import { Router, Request, Response } from 'express';
const NotFound = Router();

NotFound.use((req: Request, res: Response) => {

    return res.status(404).json({
        message: 'Not Found',
        path: req.url,
        statusCode: 404
    });
});

export default NotFound;