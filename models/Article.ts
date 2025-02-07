import { QueryResult } from 'pg';
import pool from '../config/db';

interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  abstract: string;
  author_id: number;
  thumbnail_url: string;
  likes: number;
  views: number;
  category_id: number;
}

class ArticleModel {
  static async create(article: Omit<Article, 'id'>): Promise<QueryResult> {
    return pool.query(
      'INSERT INTO articles (title, slug, content, abstract, author_id, thumbnail_url, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [article.title, article.slug, article.content, article.abstract, article.author_id, article.thumbnail_url, article.category_id]
    );
  }

  static async findBySlug(slug: string): Promise<QueryResult> {
    return pool.query('SELECT * FROM articles WHERE slug = $1', [slug]);
  }

  static async incrementViews(slug: string): Promise<QueryResult> {
    return pool.query('UPDATE articles SET views = views + 1 WHERE slug = $1 RETURNING *', [slug]);
  }

  static async getPopular(): Promise<QueryResult> {
    return pool.query('SELECT * FROM articles ORDER BY likes DESC, views DESC LIMIT 10');
  }
}

export default ArticleModel;
