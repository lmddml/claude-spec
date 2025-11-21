/**
 * Order Routes
 * Express endpoints - handles HTTP requests
 * Future: Zod validation
 */

import { Router, type Request, type Response } from 'express';
import * as orderService from './orderService.ts';

const router = Router();

/**
 * GET /orders
 * List all orders with pagination
 */
router.get('/', (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const result = orderService.list(page, limit);
  res.json(result);
});

/**
 * POST /orders
 * Create a new order
 */
router.post('/', (req: Request, res: Response) => {
  // Future: Add Zod validation here
  const newOrder = orderService.create(req.body);
  res.status(201).json(newOrder);
});

/**
 * GET /orders/:id
 * Get a order by ID
 */
router.get('/:id', (req: Request, res: Response) => {
  const order = orderService.getById(req.params.id as string);

  if (!order) {
    return res.status(404).json({
      error: 'Not Found',
      message: `Order with id '${req.params.id}' not found`
    });
  }

  res.json(order);
});

/**
 * PUT /orders/:id
 * Update a order
 */
router.put('/:id', (req: Request, res: Response) => {
  // Future: Add Zod validation here
  const updatedOrder = orderService.update(req.params.id as string, req.body);

  if (!updatedOrder) {
    return res.status(404).json({
      error: 'Not Found',
      message: `Order with id '${req.params.id}' not found`
    });
  }

  res.json(updatedOrder);
});

/**
 * DELETE /orders/:id
 * Delete a order
 */
router.delete('/:id', (req: Request, res: Response) => {
  const deleted = orderService.remove(req.params.id as string);

  if (!deleted) {
    return res.status(404).json({
      error: 'Not Found',
      message: `Order with id '${req.params.id}' not found`
    });
  }

  res.status(204).send();
});

export { router as orderRoutes };
