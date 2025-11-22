/**
 * Order Service
 * Business logic layer - connects Model with Routes
 * Future: Complex business logic, cross-entity operations
 */

import type { Order, OrderPopulated } from '../../types/index.ts';
import * as orderModel from './orderModel.ts';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

/**
 * List orders with pagination
 */
export function list(page: number, limit: number): PaginatedResult<OrderPopulated> {
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
export function getById(id: string): OrderPopulated | undefined {
  return orderModel.findById(id);
}

/**
 * Create a new order
 */
export function create(data: Partial<Order>): OrderPopulated {
  // Future: Add business logic validation here
  return orderModel.create(data);
}

/**
 * Update a order
 */
export function update(id: string, data: Partial<Order>): OrderPopulated | undefined {
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
