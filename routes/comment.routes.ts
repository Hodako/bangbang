import { Router } from 'express';
import { addComment, getComments } from '../controllers/comment.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = Router();

router.post('/', authMiddleware, addComment);
router.get('/:articleId', getComments);

export default router;
