import { Router } from 'express';
import { CommentAPost } from '../controllers/comments.controllers';
import { CommentsValidator } from '../validators/post.validators';
import authMiddleware from '../middlewares/auth.middlewares';
const router = Router();

router.post(
    '/comments/:postID/comment',
    authMiddleware,
    CommentsValidator,
    CommentAPost
)

export default router;