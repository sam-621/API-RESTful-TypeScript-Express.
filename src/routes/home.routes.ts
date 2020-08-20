import { Router } from 'express';
import { HomeController, CreatePostController, Follow } from '../controllers/home.controllers';
import { CreatePostValidator } from '../validators/post.validators';
import { FollowValidator } from '../validators/otherUsers.validators';
import authMiddleware from '../middlewares/auth.middlewares';
const router = Router();

router.get(
    '/home',
    authMiddleware,
    HomeController
);

router.post(
    '/post',
    authMiddleware,
    CreatePostValidator,
    CreatePostController
)

router.post(
    '/users/:userID/follow',
    authMiddleware,
    FollowValidator,
    Follow
)

export default router;