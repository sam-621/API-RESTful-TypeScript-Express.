import { Router } from 'express';
import { getPost } from '../controllers/posts.controllers';
const router = Router();

router.get(
    '/post/:postID',
    getPost
)
export default router;