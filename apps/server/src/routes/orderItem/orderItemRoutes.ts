/**
 * OrderItem Routes
 * Express endpoints - handles HTTP requests
 * Zod validation enabled
 */

import { Router, type Request, type Response } from 'express';
import { z } from 'zod';
import * as orderItemService from './orderItemService.ts';
import { orderItemSchema } from './orderItemSchema.ts';
import { paginationSchema, idParamsSchema } from '../../common/validation.ts';

const router = Router();

/**
 * GET /orderItems
 * List all orderItems with pagination
 */
router.get('/', (req: Request, res: Response) => {
  try {
    const { page, limit } = paginationSchema.parse(req.query);
    const result = orderItemService.list(page, limit);
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
 * POST /orderItems
 * Create a new orderItem
 */
router.post('/', (req: Request, res: Response) => {
  try {
    const validatedData = orderItemSchema.parse(req.body);
    const newOrderItem = orderItemService.create(validatedData);
    res.status(201).json(newOrderItem);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: error.errors });
    } else {
      throw error;
    }
  }
});

/**
 * GET /orderItems/:id
 * Get a orderItem by ID
 */
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = idParamsSchema.parse(req.params);
    const orderItem = orderItemService.getById(id);

    if (!orderItem) {
      return res.status(404).json({
        error: 'Not Found',
        message: `OrderItem with id '${id}' not found`
      });
    }

    res.json(orderItem);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: error.errors });
    } else {
      throw error;
    }
  }
});

/**
 * PUT /orderItems/:id
 * Update a orderItem
 */
router.put('/:id', (req: Request, res: Response) => {
  try {
    const { id } = idParamsSchema.parse(req.params);
    const validatedData = orderItemSchema.partial().parse(req.body);
    
    const updatedOrderItem = orderItemService.update(id, validatedData);

    if (!updatedOrderItem) {
      return res.status(404).json({
        error: 'Not Found',
        message: `OrderItem with id '${id}' not found`
      });
    }

    res.json(updatedOrderItem);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: error.errors });
    } else {
      throw error;
    }
  }
});

/**
 * DELETE /orderItems/:id
 * Delete a orderItem
 */
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const { id } = idParamsSchema.parse(req.params);
    const deleted = orderItemService.remove(id);

    if (!deleted) {
      return res.status(404).json({
        error: 'Not Found',
        message: `OrderItem with id '${id}' not found`
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

export { router as orderItemRoutes };
