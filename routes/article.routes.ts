import express from 'express';
import { createArticle, getArticle } from '../controllers/article.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', authMiddleware, createArticle);
router.get('/:slug', getArticle);

export default router;
