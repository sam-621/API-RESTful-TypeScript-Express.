import { Router } from 'express';
import { PostController, getPosts } from '../controllers/posts.controllers';
import { CreatePostValidator } from '../validators/post.validators';
import authMiddleware from '../middlewares/auth.middlewares';
const router = Router();

router.route('/post')
    .post(
        authMiddleware,
        CreatePostValidator,
        PostController
    )
    .get(
        getPosts
    )
export default router;