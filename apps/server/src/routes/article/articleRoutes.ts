/**
 * Article Routes
 * Express endpoints - handles HTTP requests
 * Zod validation enabled
 */

import { Router, type Request, type Response } from 'express';
import { z } from 'zod';
import * as articleService from './articleService.ts';
import { articleSchema } from './articleSchema.ts';
import { paginationSchema, idParamsSchema } from '../../common/validation.ts';

const router = Router();

/**
 * GET /articles
 * List all articles with pagination
 */
router.get('/', (req: Request, res: Response) => {
  try {
    const { page, limit } = paginationSchema.parse(req.query);
    const result = articleService.list(page, limit);
    res.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: error.errors });
    } else {
      throw error;
    }
  }
});

/**
 * POST /articles
 * Create a new article
 */
router.post('/', (req: Request, res: Response) => {
  try {
    const validatedData = articleSchema.parse(req.body);
    const newArticle = articleService.create(validatedData);
    res.status(201).json(newArticle);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: error.errors });
    } else {
      throw error;
    }
  }
});

/**
 * GET /articles/:id
 * Get a article by ID
 */
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = idParamsSchema.parse(req.params);
    const article = articleService.getById(id);

    if (!article) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Article with id '${id}' not found`
      });
    }

    res.json(article);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: error.errors });
    } else {
      throw error;
    }
  }
});

/**
 * PUT /articles/:id
 * Update a article
 */
router.put('/:id', (req: Request, res: Response) => {
  try {
    const { id } = idParamsSchema.parse(req.params);
    const validatedData = articleSchema.partial().parse(req.body);
    
    const updatedArticle = articleService.update(id, validatedData);

    if (!updatedArticle) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Article with id '${id}' not found`
      });
    }

    res.json(updatedArticle);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: error.errors });
    } else {
      throw error;
    }
  }
});

/**
 * DELETE /articles/:id
 * Delete a article
 */
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const { id } = idParamsSchema.parse(req.params);
    const deleted = articleService.remove(id);

    if (!deleted) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Article with id '${id}' not found`
      });
    }

    res.status(204).send();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: error.errors });
    } else {
      throw error;
    }
  }
});

export { router as articleRoutes };
