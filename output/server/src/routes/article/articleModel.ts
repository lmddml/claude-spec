/**
 * Article Model
 * Data layer - handles storage and retrieval
 * Future: PostgreSQL integration
 */

import type { Article } from '../../types/index.ts';

// In-memory data store with example data
let articles: Article[] = [
  {
    "id": "art-001",
    "name": "Wireless Mouse",
    "description": "Ergonomic wireless mouse with USB receiver",
    "price": 29.99,
    "unitId": "unit-001",
    "unit": {
      "id": "unit-001",
      "unitNumber": "pcs",
      "description": "Pieces"
    },
    "sku": "MOUSE-WL-001",
    "inStock": true
  },
  {
    "id": "art-002",
    "name": "USB-C Cable",
    "description": "1m USB-C to USB-C charging cable",
    "price": 12.99,
    "unitId": "unit-001",
    "unit": {
      "id": "unit-001",
      "unitNumber": "pcs",
      "description": "Pieces"
    },
    "sku": "CABLE-USBC-1M",
    "inStock": true
  },
  {
    "id": "art-003",
    "name": "Mechanical Keyboard",
    "description": "RGB mechanical keyboard with blue switches",
    "price": 89.99,
    "unitId": "unit-001",
    "unit": {
      "id": "unit-001",
      "unitNumber": "pcs",
      "description": "Pieces"
    },
    "sku": "KB-MECH-RGB",
    "inStock": false
  }
];

// Helper to generate ID
const generateId = (): string => `article-${String(articles.length + 1).padStart(3, '0')}`;

/**
 * Get all articles
 */
export function findAll(): Article[] {
  return articles;
}

/**
 * Get article by ID
 */
export function findById(id: string): Article | undefined {
  return articles.find(item => item.id === id);
}

/**
 * Create a new article
 */
export function create(data: Partial<Article>): Article {
  const newArticle: Article = {
    id: generateId(),
    ...data,
  } as Article;

  articles.push(newArticle);
  return newArticle;
}

/**
 * Update a article
 */
export function update(id: string, data: Partial<Article>): Article | undefined {
  const index = articles.findIndex(item => item.id === id);

  if (index === -1) {
    return undefined;
  }

  const updatedArticle: Article = {
    ...articles[index],
    ...data,
    id // Ensure ID cannot be changed
  };

  articles[index] = updatedArticle;
  return updatedArticle;
}

/**
 * Delete a article
 */
export function remove(id: string): boolean {
  const index = articles.findIndex(item => item.id === id);

  if (index === -1) {
    return false;
  }

  articles.splice(index, 1);
  return true;
}

/**
 * Count total articles
 */
export function count(): number {
  return articles.length;
}
