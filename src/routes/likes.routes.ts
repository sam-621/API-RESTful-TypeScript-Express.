import { Router } from 'express';
import { LikeToPost, LikeToAComment } from '../controllers/likes.controllers';
import { LikesValidator, likeToCommentValidator } from '../validators/post.validators';
import authMiddleware from '../middlewares/auth.middlewares';
const router = Router();

router.post(
    '/posts/:postID/like',
    authMiddleware,
    LikesValidator,
    LikeToPost
)

router.post(
    '/comments/:commentID/like',
    authMiddleware,
    likeToCommentValidator,
    LikeToAComment
)

export default router;