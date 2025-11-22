/**
 * Unit Routes
 * Express endpoints - handles HTTP requests
 * Zod validation enabled
 */

import { Router, type Request, type Response } from 'express';
import { z } from 'zod';
import * as unitService from './unitService.ts';
import { unitSchema } from './unitSchema.ts';
import { paginationSchema, idParamsSchema } from '../../common/validation.ts';

const router = Router();

/**
 * GET /units
 * List all units with pagination
 */
router.get('/', (req: Request, res: Response) => {
  try {
    const { page, limit } = paginationSchema.parse(req.query);
    const result = unitService.list(page, limit);
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
 * POST /units
 * Create a new unit
 */
router.post('/', (req: Request, res: Response) => {
  try {
    const validatedData = unitSchema.parse(req.body);
    const newUnit = unitService.create(validatedData);
    res.status(201).json(newUnit);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: error.errors });
    } else {
      throw error;
    }
  }
});

/**
 * GET /units/:id
 * Get a unit by ID
 */
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = idParamsSchema.parse(req.params);
    const unit = unitService.getById(id);

    if (!unit) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Unit with id '${id}' not found`
      });
    }

    res.json(unit);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: error.errors });
    } else {
      throw error;
    }
  }
});

/**
 * PUT /units/:id
 * Update a unit
 */
router.put('/:id', (req: Request, res: Response) => {
  try {
    const { id } = idParamsSchema.parse(req.params);
    const validatedData = unitSchema.partial().parse(req.body);
    
    const updatedUnit = unitService.update(id, validatedData);

    if (!updatedUnit) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Unit with id '${id}' not found`
      });
    }

    res.json(updatedUnit);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: error.errors });
    } else {
      throw error;
    }
  }
});

/**
 * DELETE /units/:id
 * Delete a unit
 */
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const { id } = idParamsSchema.parse(req.params);
    const deleted = unitService.remove(id);

    if (!deleted) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Unit with id '${id}' not found`
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

export { router as unitRoutes };
