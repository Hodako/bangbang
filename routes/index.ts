import { Router } from 'express';
import authRoutes from './auth.routes';
import articleRoutes from './article.routes';
import categoryRoutes from './category.routes';
import commentRoutes from './comment.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/articles', articleRoutes);
router.use('/categories', categoryRoutes);
router.use('/comments', commentRoutes);

export default router;
