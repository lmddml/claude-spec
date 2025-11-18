/**
 * OrderItem Routes
 * Express endpoints - handles HTTP requests
 * Future: Zod validation
 */

import { Router, Request, Response } from 'express';
import * as orderItemService from './orderItemService';

const router = Router();

/**
 * GET /orderItems
 * List all orderItems with pagination
 */
router.get('/', (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const result = orderItemService.list(page, limit);
  res.json(result);
});

/**
 * POST /orderItems
 * Create a new orderItem
 */
router.post('/', (req: Request, res: Response) => {
  // Future: Add Zod validation here
  const newOrderItem = orderItemService.create(req.body);
  res.status(201).json(newOrderItem);
});

/**
 * GET /orderItems/:id
 * Get a orderItem by ID
 */
router.get('/:id', (req: Request, res: Response) => {
  const orderItem = orderItemService.getById(req.params.id);

  if (!orderItem) {
    return res.status(404).json({
      error: 'Not Found',
      message: `OrderItem with id '${req.params.id}' not found`
    });
  }

  res.json(orderItem);
});

/**
 * PUT /orderItems/:id
 * Update a orderItem
 */
router.put('/:id', (req: Request, res: Response) => {
  // Future: Add Zod validation here
  const updatedOrderItem = orderItemService.update(req.params.id, req.body);

  if (!updatedOrderItem) {
    return res.status(404).json({
      error: 'Not Found',
      message: `OrderItem with id '${req.params.id}' not found`
    });
  }

  res.json(updatedOrderItem);
});

/**
 * DELETE /orderItems/:id
 * Delete a orderItem
 */
router.delete('/:id', (req: Request, res: Response) => {
  const deleted = orderItemService.remove(req.params.id);

  if (!deleted) {
    return res.status(404).json({
      error: 'Not Found',
      message: `OrderItem with id '${req.params.id}' not found`
    });
  }

  res.status(204).send();
});

export { router as orderItemRoutes };
