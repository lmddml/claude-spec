/**
 * Customer Routes
 * Express endpoints - handles HTTP requests
 * Zod validation enabled
 */

import { Router, type Request, type Response } from 'express';
import { z } from 'zod';
import * as customerService from './customerService.ts';
import { customerSchema } from './customerSchema.ts';
import { paginationSchema, idParamsSchema } from '../../common/validation.ts';

const router = Router();

/**
 * GET /customers
 * List all customers with pagination
 */
router.get('/', (req: Request, res: Response) => {
  try {
    const { page, limit } = paginationSchema.parse(req.query);
    const result = customerService.list(page, limit);
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
 * POST /customers
 * Create a new customer
 */
router.post('/', (req: Request, res: Response) => {
  try {
    const validatedData = customerSchema.parse(req.body);
    const newCustomer = customerService.create(validatedData);
    res.status(201).json(newCustomer);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: error.errors });
    } else {
      throw error;
    }
  }
});

/**
 * GET /customers/:id
 * Get a customer by ID
 */
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = idParamsSchema.parse(req.params);
    const customer = customerService.getById(id);

    if (!customer) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Customer with id '${id}' not found`
      });
    }

    res.json(customer);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: error.errors });
    } else {
      throw error;
    }
  }
});

/**
 * PUT /customers/:id
 * Update a customer
 */
router.put('/:id', (req: Request, res: Response) => {
  try {
    const { id } = idParamsSchema.parse(req.params);
    const validatedData = customerSchema.partial().parse(req.body);
    
    const updatedCustomer = customerService.update(id, validatedData);

    if (!updatedCustomer) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Customer with id '${id}' not found`
      });
    }

    res.json(updatedCustomer);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation Error', details: error.errors });
    } else {
      throw error;
    }
  }
});

/**
 * DELETE /customers/:id
 * Delete a customer
 */
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const { id } = idParamsSchema.parse(req.params);
    const deleted = customerService.remove(id);

    if (!deleted) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Customer with id '${id}' not found`
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

export { router as customerRoutes };
