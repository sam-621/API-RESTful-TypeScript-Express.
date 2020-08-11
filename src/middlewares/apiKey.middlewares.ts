import { Router, Request, Response, NextFunction } from 'express';
import { UNAUTHORIZED } from 'http-status-codes';
import { api_key } from '../config/index.config';
const apiKey = Router();

apiKey.use((req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['api-key'];

    if(!apiKey || apiKey !== api_key) {
        return res.status(UNAUTHORIZED).json({
            error: true,
            statusCode: UNAUTHORIZED,
            data: null,
            message: 'API KEY IS REQUIRED'
        });
    }

    if(apiKey === api_key) {
        next();
    }
});

export default apiKey;