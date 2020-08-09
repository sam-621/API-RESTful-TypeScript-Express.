import { Router } from 'express';
import { PostController, LikeToPost } from '../controllers/posts.controllers';
import { CreatePostValidator } from '../validators/post.validators';
import authMiddleware from '../middlewares/auth.middlewares';
import { LikesValidator } from '../validators/likes.validators';
const router = Router();

router.post(
    '/post',
    authMiddleware,
    CreatePostValidator,
    PostController
);

router.post(
    '/:postID/like',
    authMiddleware,
    LikesValidator,
    LikeToPost
)

export default router;