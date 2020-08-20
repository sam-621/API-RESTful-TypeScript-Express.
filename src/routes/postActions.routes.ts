import { Router } from 'express';
import { CommentAPost, LikeToAComment, LikeToPost } from '../controllers/postActions.controllers'
import { LikesValidator, likeToCommentValidator } from '../validators/post.validators';
import { CommentsValidator } from '../validators/post.validators';
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

router.post(
    '/comments/:postID/comment',
    authMiddleware,
    CommentsValidator,
    CommentAPost
)

export default router;