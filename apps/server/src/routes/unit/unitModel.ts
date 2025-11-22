/**
 * Unit Model
 * Data layer - handles storage and retrieval
 * Future: PostgreSQL integration
 */

import type { Unit, UnitPopulated } from '../../types/index.ts';

// In-memory data store with example data
let units: UnitPopulated[] = [
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
export function findAll(): UnitPopulated[] {
  return units;
}

/**
 * Get unit by ID
 */
export function findById(id: string): UnitPopulated | undefined {
  return units.find(item => item.id === id);
}

/**
 * Create a new unit
 */
export function create(data: Partial<Unit>): UnitPopulated {
  const newUnit: UnitPopulated = {
    id: generateId(),
    ...data,
  } as UnitPopulated;

  units.push(newUnit);
  return newUnit;
}

/**
 * Update a unit
 */
export function update(id: string, data: Partial<Unit>): UnitPopulated | undefined {
  const index = units.findIndex(item => item.id === id);

  if (index === -1) {
    return undefined;
  }

  const updatedUnit: UnitPopulated = {
    ...units[index],
    ...data,
    id // Ensure ID cannot be changed
  } as UnitPopulated;

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
