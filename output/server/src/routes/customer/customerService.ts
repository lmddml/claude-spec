/**
 * Customer Service
 * Business logic layer - connects Model with Routes
 * Future: Complex business logic, cross-entity operations
 */

import { Customer } from '../../types';
import * as customerModel from './customerModel';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

/**
 * List customers with pagination
 */
export function list(page: number = 1, limit: number = 10): PaginatedResult<Customer> {
  const allCustomers = customerModel.findAll();
  const offset = (page - 1) * limit;
  const paginatedData = allCustomers.slice(offset, offset + limit);

  return {
    data: paginatedData,
    total: customerModel.count(),
    page,
    limit
  };
}

/**
 * Get customer by ID
 */
export function getById(id: string): Customer | undefined {
  return customerModel.findById(id);
}

/**
 * Create a new customer
 */
export function create(data: Partial<Customer>): Customer {
  // Future: Add business logic validation here
  return customerModel.create(data);
}

/**
 * Update a customer
 */
export function update(id: string, data: Partial<Customer>): Customer | undefined {
  // Future: Add business logic validation here
  return customerModel.update(id, data);
}

/**
 * Delete a customer
 */
export function remove(id: string): boolean {
  // Future: Add cascade delete logic, check dependencies
  return customerModel.remove(id);
}
