/**
 * Unit Routes
 * Express endpoints - handles HTTP requests
 * Future: Zod validation
 */

import { Router, type Request, type Response } from 'express';
import * as unitService from './unitService.ts';

const router = Router();

/**
 * GET /units
 * List all units with pagination
 */
router.get('/', (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const result = unitService.list(page, limit);
  res.json(result);
});

/**
 * POST /units
 * Create a new unit
 */
router.post('/', (req: Request, res: Response) => {
  // Future: Add Zod validation here
  const newUnit = unitService.create(req.body);
  res.status(201).json(newUnit);
});

/**
 * GET /units/:id
 * Get a unit by ID
 */
router.get('/:id', (req: Request, res: Response) => {
  const unit = unitService.getById(req.params.id as string);

  if (!unit) {
    return res.status(404).json({
      error: 'Not Found',
      message: `Unit with id '${req.params.id}' not found`
    });
  }

  res.json(unit);
});

/**
 * PUT /units/:id
 * Update a unit
 */
router.put('/:id', (req: Request, res: Response) => {
  // Future: Add Zod validation here
  const updatedUnit = unitService.update(req.params.id as string, req.body);

  if (!updatedUnit) {
    return res.status(404).json({
      error: 'Not Found',
      message: `Unit with id '${req.params.id}' not found`
    });
  }

  res.json(updatedUnit);
});

/**
 * DELETE /units/:id
 * Delete a unit
 */
router.delete('/:id', (req: Request, res: Response) => {
  const deleted = unitService.remove(req.params.id as string);

  if (!deleted) {
    return res.status(404).json({
      error: 'Not Found',
      message: `Unit with id '${req.params.id}' not found`
    });
  }

  res.status(204).send();
});

export { router as unitRoutes };
