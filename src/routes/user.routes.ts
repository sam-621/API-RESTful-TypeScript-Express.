import { Router } from 'express';
import { PostController } from '../controllers/user.controllers';
import { CreatePostValidator } from '../validators/post.validators';
import authMiddleware from '../middlewares/auth.middlewares';
const router = Router();

router.post(
    '/post',
    authMiddleware,
    CreatePostValidator,
    PostController
);

export default router;