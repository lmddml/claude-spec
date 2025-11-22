/**
 * Article Service
 * Business logic layer - connects Model with Routes
 * Future: Complex business logic, cross-entity operations
 */

import type { Article, ArticlePopulated } from '../../types/index.ts';
import * as articleModel from './articleModel.ts';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

/**
 * List articles with pagination
 */
export function list(page: number, limit: number): PaginatedResult<ArticlePopulated> {
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
export function getById(id: string): ArticlePopulated | undefined {
  return articleModel.findById(id);
}

/**
 * Create a new article
 */
export function create(data: Partial<Article>): ArticlePopulated {
  // Future: Add business logic validation here
  return articleModel.create(data);
}

/**
 * Update a article
 */
export function update(id: string, data: Partial<Article>): ArticlePopulated | undefined {
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
