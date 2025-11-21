/**
 * OrderItem Model
 * Data layer - handles storage and retrieval
 * Future: PostgreSQL integration
 */

import type { OrderItem } from '../../types/index.ts';

// In-memory data store with example data
let orderItems: OrderItem[] = [
  {
    "id": "item-001",
    "orderId": "ord-001",
    "articleId": "art-001",
    "article": {
      "id": "art-001",
      "name": "Wireless Mouse",
      "description": "Ergonomic wireless mouse with USB receiver",
      "price": 29.99,
      "unitId": "unit-001",
      "sku": "MOUSE-WL-001",
      "inStock": true
    },
    "name": "Wireless Mouse",
    "price": 29.99,
    "unitId": "unit-001",
    "unit": {
      "id": "unit-001",
      "unitNumber": "pcs",
      "description": "Pieces"
    },
    "quantity": 2,
    "lineTotal": 59.98
  },
  {
    "id": "item-002",
    "orderId": "ord-001",
    "articleId": "art-003",
    "article": {
      "id": "art-003",
      "name": "Mechanical Keyboard",
      "description": "RGB mechanical keyboard with blue switches",
      "price": 89.99,
      "unitId": "unit-001",
      "sku": "KB-MECH-RGB",
      "inStock": false
    },
    "name": "Mechanical Keyboard",
    "price": 89.99,
    "unitId": "unit-001",
    "unit": {
      "id": "unit-001",
      "unitNumber": "pcs",
      "description": "Pieces"
    },
    "quantity": 1,
    "lineTotal": 89.99
  },
  {
    "id": "item-003",
    "orderId": "ord-003",
    "articleId": "art-002",
    "article": {
      "id": "art-002",
      "name": "USB-C Cable",
      "description": "1m USB-C to USB-C charging cable",
      "price": 12.99,
      "unitId": "unit-001",
      "sku": "CABLE-USBC-1M",
      "inStock": true
    },
    "name": "USB-C Cable",
    "price": 12.99,
    "unitId": "unit-001",
    "unit": {
      "id": "unit-001",
      "unitNumber": "pcs",
      "description": "Pieces"
    },
    "quantity": 2,
    "lineTotal": 25.98
  }
];

// Helper to generate ID
const generateId = (): string => `orderitem-${String(orderItems.length + 1).padStart(3, '0')}`;

/**
 * Get all orderItems
 */
export function findAll(): OrderItem[] {
  return orderItems;
}

/**
 * Get orderItem by ID
 */
export function findById(id: string): OrderItem | undefined {
  return orderItems.find(item => item.id === id);
}

/**
 * Create a new orderItem
 */
export function create(data: Partial<OrderItem>): OrderItem {
  const newOrderItem: OrderItem = {
    id: generateId(),
    ...data,
  } as OrderItem;

  orderItems.push(newOrderItem);
  return newOrderItem;
}

/**
 * Update a orderItem
 */
export function update(id: string, data: Partial<OrderItem>): OrderItem | undefined {
  const index = orderItems.findIndex(item => item.id === id);

  if (index === -1) {
    return undefined;
  }

  const updatedOrderItem: OrderItem = {
    ...orderItems[index],
    ...data,
    id // Ensure ID cannot be changed
  };

  orderItems[index] = updatedOrderItem;
  return updatedOrderItem;
}

/**
 * Delete a orderItem
 */
export function remove(id: string): boolean {
  const index = orderItems.findIndex(item => item.id === id);

  if (index === -1) {
    return false;
  }

  orderItems.splice(index, 1);
  return true;
}

/**
 * Count total orderItems
 */
export function count(): number {
  return orderItems.length;
}
