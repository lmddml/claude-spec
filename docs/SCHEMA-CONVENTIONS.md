# JSON Schema Conventions

## File Naming

All schema files use the `.schema.json` extension:
```
entity.schema.json
```

## Naming Properties

Each schema includes four naming variants for code generation flexibility:

```json
{
    "title": "OrderItem",           // PascalCase singular (default)
    "x-plural": "OrderItems",       // PascalCase plural
    "x-camel": "orderItem",         // camelCase singular
    "x-camel-plural": "orderItems"  // camelCase plural
}
```

## Foreign Key Pattern

Foreign keys follow a dual-property pattern:

1. **ID property** - stores the foreign key value
2. **Object property** - references the related schema

```json
{
    "customerId": {
        "type": "string",
        "description": "Foreign key reference to Customer"
    },
    "customer": {
        "$ref": "customer.schema.json",
        "description": "The complete customer object",
        "readOnly": true
    }
}
```

The object property is marked `readOnly` as it's populated by the system, not user input.

## Standard Schema Structure

```json
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "EntityName",
    "x-plural": "EntityNames",
    "x-camel": "entityName",
    "x-camel-plural": "entityNames",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "description": "Unique identifier",
            "readOnly": true
        }
        // ... other properties
    },
    "required": ["id"]
}
```

## Property Conventions

- **id** - Always `readOnly: true`, always required
- **Foreign keys** - Named as `{entity}Id` (e.g., `customerId`, `orderId`)
- **Nullable fields** - Use `"type": ["string", "null"]`
- **Computed fields** - Mark with `readOnly: true`
