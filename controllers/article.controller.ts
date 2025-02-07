import { Request, Response } from 'express';
import ArticleModel from '../models/Article';
import generateSlug from '../utils/generateSlug';

export const createArticle = async (req: Request, res: Response) => {
  try {
    const { title, content, abstract, thumbnail_url, category_id } = req.body;
    const slug = generateSlug(title);
    const article = await ArticleModel.create({
      title,
      slug,
      content,
      abstract,
      author_id: (req as any).user.id,
      thumbnail_url,
      category_id
    });
    res.status(201).json(article.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error creating article' });
  }
};

export const getArticle = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const article = await ArticleModel.findBySlug(slug);
    if (!article.rows.length) return res.status(404).json({ message: 'Article not found' });
    
    await ArticleModel.incrementViews(slug);
    res.json(article.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching article' });
  }
};
