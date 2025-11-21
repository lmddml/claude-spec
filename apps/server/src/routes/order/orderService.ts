/**
 * Order Service
 * Business logic layer - connects Model with Routes
 * Future: Complex business logic, cross-entity operations
 */

import { Order } from '../../types';
import * as orderModel from './orderModel';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

/**
 * List orders with pagination
 */
export function list(page: number = 1, limit: number = 10): PaginatedResult<Order> {
  const allOrders = orderModel.findAll();
  const offset = (page - 1) * limit;
  const paginatedData = allOrders.slice(offset, offset + limit);

  return {
    data: paginatedData,
    total: orderModel.count(),
    page,
    limit
  };
}

/**
 * Get order by ID
 */
export function getById(id: string): Order | undefined {
  return orderModel.findById(id);
}

/**
 * Create a new order
 */
export function create(data: Partial<Order>): Order {
  // Future: Add business logic validation here
  return orderModel.create(data);
}

/**
 * Update a order
 */
export function update(id: string, data: Partial<Order>): Order | undefined {
  // Future: Add business logic validation here
  return orderModel.update(id, data);
}

/**
 * Delete a order
 */
export function remove(id: string): boolean {
  // Future: Add cascade delete logic, check dependencies
  return orderModel.remove(id);
}
