/**
 * Unit Model
 * Data layer - handles storage and retrieval
 * Future: PostgreSQL integration
 */

import { Unit } from '../../types';

// In-memory data store with example data
let units: Unit[] = [
  {
    "id": "unit-001",
    "unitNumber": "pcs",
    "description": "Pieces"
  },
  {
    "id": "unit-002",
    "unitNumber": "kg",
    "description": "Kilograms"
  },
  {
    "id": "unit-003",
    "unitNumber": "ltr",
    "description": "Liters"
  },
  {
    "id": "unit-004",
    "unitNumber": "box",
    "description": "Box"
  }
];

// Helper to generate ID
const generateId = (): string => `unit-${String(units.length + 1).padStart(3, '0')}`;

/**
 * Get all units
 */
export function findAll(): Unit[] {
  return units;
}

/**
 * Get unit by ID
 */
export function findById(id: string): Unit | undefined {
  return units.find(item => item.id === id);
}

/**
 * Create a new unit
 */
export function create(data: Partial<Unit>): Unit {
  const newUnit: Unit = {
    id: generateId(),
    ...data,
  } as Unit;

  units.push(newUnit);
  return newUnit;
}

/**
 * Update a unit
 */
export function update(id: string, data: Partial<Unit>): Unit | undefined {
  const index = units.findIndex(item => item.id === id);

  if (index === -1) {
    return undefined;
  }

  const updatedUnit: Unit = {
    ...units[index],
    ...data,
    id // Ensure ID cannot be changed
  };

  units[index] = updatedUnit;
  return updatedUnit;
}

/**
 * Delete a unit
 */
export function remove(id: string): boolean {
  const index = units.findIndex(item => item.id === id);

  if (index === -1) {
    return false;
  }

  units.splice(index, 1);
  return true;
}

/**
 * Count total units
 */
export function count(): number {
  return units.length;
}
