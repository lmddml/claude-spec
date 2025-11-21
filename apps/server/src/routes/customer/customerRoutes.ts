/**
 * Customer Routes
 * Express endpoints - handles HTTP requests
 * Future: Zod validation
 */

import { Router, Request, Response } from 'express';
import * as customerService from './customerService';

const router = Router();

/**
 * GET /customers
 * List all customers with pagination
 */
router.get('/', (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const result = customerService.list(page, limit);
  res.json(result);
});

/**
 * POST /customers
 * Create a new customer
 */
router.post('/', (req: Request, res: Response) => {
  // Future: Add Zod validation here
  const newCustomer = customerService.create(req.body);
  res.status(201).json(newCustomer);
});

/**
 * GET /customers/:id
 * Get a customer by ID
 */
router.get('/:id', (req: Request, res: Response) => {
  const customer = customerService.getById(req.params.id);

  if (!customer) {
    return res.status(404).json({
      error: 'Not Found',
      message: `Customer with id '${req.params.id}' not found`
    });
  }

  res.json(customer);
});

/**
 * PUT /customers/:id
 * Update a customer
 */
router.put('/:id', (req: Request, res: Response) => {
  // Future: Add Zod validation here
  const updatedCustomer = customerService.update(req.params.id, req.body);

  if (!updatedCustomer) {
    return res.status(404).json({
      error: 'Not Found',
      message: `Customer with id '${req.params.id}' not found`
    });
  }

  res.json(updatedCustomer);
});

/**
 * DELETE /customers/:id
 * Delete a customer
 */
router.delete('/:id', (req: Request, res: Response) => {
  const deleted = customerService.remove(req.params.id);

  if (!deleted) {
    return res.status(404).json({
      error: 'Not Found',
      message: `Customer with id '${req.params.id}' not found`
    });
  }

  res.status(204).send();
});

export { router as customerRoutes };
