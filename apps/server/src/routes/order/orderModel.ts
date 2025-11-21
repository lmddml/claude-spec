/**
 * Order Model
 * Data layer - handles storage and retrieval
 * Future: PostgreSQL integration
 */

import { Order } from '../../types';

// In-memory data store with example data
let orders: Order[] = [
  {
    "id": "ord-001",
    "customerId": "cust-001",
    "customer": {
      "id": "cust-001",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "+1-555-123-4567",
      "createdAt": "2024-01-15T10:30:00Z"
    },
    "orderDate": "2024-03-15T14:30:00Z",
    "status": "delivered",
    "totalAmount": 142.97,
    "shippingAddress": "123 Main St, New York, NY 10001"
  },
  {
    "id": "ord-002",
    "customerId": "cust-002",
    "customer": {
      "id": "cust-002",
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane.smith@example.com",
      "phone": "+1-555-987-6543",
      "createdAt": "2024-02-20T14:45:00Z"
    },
    "orderDate": "2024-03-20T09:15:00Z",
    "status": "processing",
    "totalAmount": 89.99,
    "shippingAddress": "456 Oak Ave, Los Angeles, CA 90001"
  },
  {
    "id": "ord-003",
    "customerId": "cust-001",
    "customer": {
      "id": "cust-001",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "+1-555-123-4567",
      "createdAt": "2024-01-15T10:30:00Z"
    },
    "orderDate": "2024-03-25T16:00:00Z",
    "status": "pending",
    "totalAmount": 25.98,
    "shippingAddress": "123 Main St, New York, NY 10001"
  }
];

// Helper to generate ID
const generateId = (): string => `order-${String(orders.length + 1).padStart(3, '0')}`;

/**
 * Get all orders
 */
export function findAll(): Order[] {
  return orders;
}

/**
 * Get order by ID
 */
export function findById(id: string): Order | undefined {
  return orders.find(item => item.id === id);
}

/**
 * Create a new order
 */
export function create(data: Partial<Order>): Order {
  const newOrder: Order = {
    id: generateId(),
    ...data,
  } as Order;

  orders.push(newOrder);
  return newOrder;
}

/**
 * Update a order
 */
export function update(id: string, data: Partial<Order>): Order | undefined {
  const index = orders.findIndex(item => item.id === id);

  if (index === -1) {
    return undefined;
  }

  const updatedOrder: Order = {
    ...orders[index],
    ...data,
    id // Ensure ID cannot be changed
  };

  orders[index] = updatedOrder;
  return updatedOrder;
}

/**
 * Delete a order
 */
export function remove(id: string): boolean {
  const index = orders.findIndex(item => item.id === id);

  if (index === -1) {
    return false;
  }

  orders.splice(index, 1);
  return true;
}

/**
 * Count total orders
 */
export function count(): number {
  return orders.length;
}
