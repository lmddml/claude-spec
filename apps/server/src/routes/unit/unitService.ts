/**
 * Unit Service
 * Business logic layer - connects Model with Routes
 * Future: Complex business logic, cross-entity operations
 */

import type { Unit, UnitPopulated } from '../../types/index.ts';
import * as unitModel from './unitModel.ts';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

/**
 * List units with pagination
 */
export function list(page: number, limit: number): PaginatedResult<UnitPopulated> {
  const allUnits = unitModel.findAll();
  const offset = (page - 1) * limit;
  const paginatedData = allUnits.slice(offset, offset + limit);

  return {
    data: paginatedData,
    total: unitModel.count(),
    page,
    limit
  };
}

/**
 * Get unit by ID
 */
export function getById(id: string): UnitPopulated | undefined {
  return unitModel.findById(id);
}

/**
 * Create a new unit
 */
export function create(data: Partial<Unit>): UnitPopulated {
  // Future: Add business logic validation here
  return unitModel.create(data);
}

/**
 * Update a unit
 */
export function update(id: string, data: Partial<Unit>): UnitPopulated | undefined {
  // Future: Add business logic validation here
  return unitModel.update(id, data);
}

/**
 * Delete a unit
 */
export function remove(id: string): boolean {
  // Future: Add cascade delete logic, check dependencies
  return unitModel.remove(id);
}
