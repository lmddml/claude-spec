/**
 * Article Routes
 * Express endpoints - handles HTTP requests
 * Future: Zod validation
 */

import { Router, type Request, type Response } from 'express';
import * as articleService from './articleService.ts';

const router = Router();

/**
 * GET /articles
 * List all articles with pagination
 */
router.get('/', (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const result = articleService.list(page, limit);
  res.json(result);
});

/**
 * POST /articles
 * Create a new article
 */
router.post('/', (req: Request, res: Response) => {
  // Future: Add Zod validation here
  const newArticle = articleService.create(req.body);
  res.status(201).json(newArticle);
});

/**
 * GET /articles/:id
 * Get a article by ID
 */
router.get('/:id', (req: Request, res: Response) => {
  const article = articleService.getById(req.params.id);

  if (!article) {
    return res.status(404).json({
      error: 'Not Found',
      message: `Article with id '${req.params.id}' not found`
    });
  }

  res.json(article);
});

/**
 * PUT /articles/:id
 * Update a article
 */
router.put('/:id', (req: Request, res: Response) => {
  // Future: Add Zod validation here
  const updatedArticle = articleService.update(req.params.id, req.body);

  if (!updatedArticle) {
    return res.status(404).json({
      error: 'Not Found',
      message: `Article with id '${req.params.id}' not found`
    });
  }

  res.json(updatedArticle);
});

/**
 * DELETE /articles/:id
 * Delete a article
 */
router.delete('/:id', (req: Request, res: Response) => {
  const deleted = articleService.remove(req.params.id);

  if (!deleted) {
    return res.status(404).json({
      error: 'Not Found',
      message: `Article with id '${req.params.id}' not found`
    });
  }

  res.status(204).send();
});

export { router as articleRoutes };
