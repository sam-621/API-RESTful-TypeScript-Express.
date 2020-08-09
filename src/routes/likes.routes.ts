import { Router } from 'express';
import { LikeToPost } from '../controllers/likes.controllers';
import { LikesValidator } from '../validators/post.validators';
import authMiddleware from '../middlewares/auth.middlewares';
const router = Router();

router.post(
    '/:postID/like',
    authMiddleware,
    LikesValidator,
    LikeToPost
)

export default router;