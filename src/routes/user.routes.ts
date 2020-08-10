import { Router } from 'express';
import { GetUserInfo, UpdateUserInfo } from '../controllers/user.controllers';
import { UpdateInfoValidator } from '../validators/user.validators';
import authMiddleware from '../middlewares/auth.middlewares';
const router = Router();

router.get(
    '/user/info',
    authMiddleware,
    GetUserInfo
)

router.put(
    '/user/update',
    authMiddleware,
    UpdateInfoValidator,
    UpdateUserInfo
);

export default router;