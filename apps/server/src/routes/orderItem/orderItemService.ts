/**
 * OrderItem Service
 * Business logic layer - connects Model with Routes
 * Future: Complex business logic, cross-entity operations
 */

import type { OrderItem } from '../../types/index.ts';
import * as orderItemModel from './orderItemModel.ts';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

/**
 * List orderItems with pagination
 */
export function list(page: number = 1, limit: number = 10): PaginatedResult<OrderItem> {
  const allOrderItems = orderItemModel.findAll();
  const offset = (page - 1) * limit;
  const paginatedData = allOrderItems.slice(offset, offset + limit);

  return {
    data: paginatedData,
    total: orderItemModel.count(),
    page,
    limit
  };
}

/**
 * Get orderItem by ID
 */
export function getById(id: string): OrderItem | undefined {
  return orderItemModel.findById(id);
}

/**
 * Create a new orderItem
 */
export function create(data: Partial<OrderItem>): OrderItem {
  // Future: Add business logic validation here
  return orderItemModel.create(data);
}

/**
 * Update a orderItem
 */
export function update(id: string, data: Partial<OrderItem>): OrderItem | undefined {
  // Future: Add business logic validation here
  return orderItemModel.update(id, data);
}

/**
 * Delete a orderItem
 */
export function remove(id: string): boolean {
  // Future: Add cascade delete logic, check dependencies
  return orderItemModel.remove(id);
}
