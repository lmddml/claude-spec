/**
 * Customer Model
 * Data layer - handles storage and retrieval
 * Future: PostgreSQL integration
 */

import type { Customer, CustomerPopulated } from '../../types/index.ts';

// In-memory data store with example data
let customers: CustomerPopulated[] = [
  {
    "id": "cust-001",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1-555-123-4567",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  {
    "id": "cust-002",
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@example.com",
    "phone": "+1-555-987-6543",
    "createdAt": "2024-02-20T14:45:00Z"
  },
  {
    "id": "cust-003",
    "firstName": "Bob",
    "lastName": "Johnson",
    "email": "bob.johnson@example.com",
    "phone": "+1-555-456-7890",
    "createdAt": "2024-03-10T09:15:00Z"
  }
];

// Helper to generate ID
const generateId = (): string => `customer-${String(customers.length + 1).padStart(3, '0')}`;

/**
 * Get all customers
 */
export function findAll(): CustomerPopulated[] {
  return customers;
}

/**
 * Get customer by ID
 */
export function findById(id: string): CustomerPopulated | undefined {
  return customers.find(item => item.id === id);
}

/**
 * Create a new customer
 */
export function create(data: Partial<Customer>): CustomerPopulated {
  const newCustomer: CustomerPopulated = {
    id: generateId(),
    ...data,
  } as CustomerPopulated;

  customers.push(newCustomer);
  return newCustomer;
}

/**
 * Update a customer
 */
export function update(id: string, data: Partial<Customer>): CustomerPopulated | undefined {
  const index = customers.findIndex(item => item.id === id);

  if (index === -1) {
    return undefined;
  }

  const updatedCustomer: CustomerPopulated = {
    ...customers[index],
    ...data,
    id // Ensure ID cannot be changed
  } as CustomerPopulated;

  customers[index] = updatedCustomer;
  return updatedCustomer;
}

/**
 * Delete a customer
 */
export function remove(id: string): boolean {
  const index = customers.findIndex(item => item.id === id);

  if (index === -1) {
    return false;
  }

  customers.splice(index, 1);
  return true;
}

/**
 * Count total customers
 */
export function count(): number {
  return customers.length;
}
