/**
 * Order Routes
 * Express endpoints - handles HTTP requests
 * Zod validation enabled
 */

import { Router, type Request, type Response } from 'express';
import { z } from 'zod';
import * as orderService from './orderService.ts';
import { orderSchema } from './orderSchema.ts';
import { paginationSchema, idParamsSchema } from '../../common/validation.ts';

const router = Router();

/**
 * GET /orders
 * List all orders with pagination
 */
router.get('/', (req: Request, res: Response) => {
  try {
    const { page, limit } = paginationSchema.parse(req.query);
    const result = orderService.list(page, limit);
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
 * POST /orders
 * Create a new order
 */
router.post('/', (req: Request, res: Response) => {
  try {
    const validatedData = orderSchema.parse(req.body);
    const newOrder = orderService.create(validatedData);
    res.status(201).json(newOrder);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: error.errors });
    } else {
      throw error;
    }
  }
});

/**
 * GET /orders/:id
 * Get a order by ID
 */
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = idParamsSchema.parse(req.params);
    const order = orderService.getById(id);

    if (!order) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Order with id '${id}' not found`
      });
    }

    res.json(order);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: error.errors });
    } else {
      throw error;
    }
  }
});

/**
 * PUT /orders/:id
 * Update a order
 */
router.put('/:id', (req: Request, res: Response) => {
  try {
    const { id } = idParamsSchema.parse(req.params);
    const validatedData = orderSchema.partial().parse(req.body);
    
    const updatedOrder = orderService.update(id, validatedData);

    if (!updatedOrder) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Order with id '${id}' not found`
      });
    }

    res.json(updatedOrder);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: error.errors });
    } else {
      throw error;
    }
  }
});

/**
 * DELETE /orders/:id
 * Delete a order
 */
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const { id } = idParamsSchema.parse(req.params);
    const deleted = orderService.remove(id);

    if (!deleted) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Order with id '${id}' not found`
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

export { router as orderRoutes };
