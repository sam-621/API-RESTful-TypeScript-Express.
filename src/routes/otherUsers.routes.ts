import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middlewares';
import { Follow } from '../controllers/otherUsers.controllers';
import { FollowValidator } from '../validators/otherUsers.validators';
const router = Router();

router.post(
    '/users/:userID/follow',
    authMiddleware,
    FollowValidator,
    Follow
)

export default router;