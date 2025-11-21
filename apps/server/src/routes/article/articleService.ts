/**
 * Article Service
 * Business logic layer - connects Model with Routes
 * Future: Complex business logic, cross-entity operations
 */

import { Article } from '../../types';
import * as articleModel from './articleModel';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

/**
 * List articles with pagination
 */
export function list(page: number = 1, limit: number = 10): PaginatedResult<Article> {
  const allArticles = articleModel.findAll();
  const offset = (page - 1) * limit;
  const paginatedData = allArticles.slice(offset, offset + limit);

  return {
    data: paginatedData,
    total: articleModel.count(),
    page,
    limit
  };
}

/**
 * Get article by ID
 */
export function getById(id: string): Article | undefined {
  return articleModel.findById(id);
}

/**
 * Create a new article
 */
export function create(data: Partial<Article>): Article {
  // Future: Add business logic validation here
  return articleModel.create(data);
}

/**
 * Update a article
 */
export function update(id: string, data: Partial<Article>): Article | undefined {
  // Future: Add business logic validation here
  return articleModel.update(id, data);
}

/**
 * Delete a article
 */
export function remove(id: string): boolean {
  // Future: Add cascade delete logic, check dependencies
  return articleModel.remove(id);
}
