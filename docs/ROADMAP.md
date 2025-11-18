# Roadmap

Future features and enhancements for the OpenAPI CRUD Generator.

## Phase 1 - Core Enhancements

### Custom Operations
```json
{
    "x-operations": ["list", "get", "create"]
}
```
Allow schemas to specify which CRUD operations to generate.

### PATCH Support
Add partial update operation alongside PUT.

### Validation Constraints
Support JSON Schema validation keywords:
- `minLength`, `maxLength`, `pattern` for strings
- `minimum`, `maximum` for numbers
- `minItems`, `maxItems` for arrays

## Phase 2 - Security & Query

### Security Schemes
```javascript
{
  security: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    }
  }
}
```

### Query Parameters
- Filtering: `?status=active`
- Sorting: `?sort=createdAt:desc`
- Field selection: `?fields=id,name`
- Search: `?q=searchterm`

### Cursor-based Pagination
Better performance for large datasets.

## Phase 3 - Advanced Features

### Custom Actions
```json
{
    "x-actions": [
        {
            "name": "activate",
            "method": "POST",
            "path": "/{id}/activate"
        }
    ]
}
```

### Multiple Servers
```javascript
{
  servers: [
    { url: 'https://api.example.com', description: 'Production' },
    { url: 'https://staging-api.example.com', description: 'Staging' }
  ]
}
```

### Webhooks
Define webhook callbacks in the spec.

### Response Headers
Custom headers like `X-Total-Count`, `ETag`, rate limiting.

## Phase 4 - Enterprise

### Bulk Operations
- `POST /resources/bulk` - Bulk create
- `DELETE /resources/bulk` - Bulk delete

### Soft Delete
```json
{
    "x-soft-delete": {
        "field": "deletedAt",
        "type": "datetime"
    }
}
```

### Audit Trail
Automatic `createdAt`, `createdBy`, `updatedAt`, `updatedBy` fields.

### Schema Composition
Extend base schemas:
```json
{
    "x-extends": ["Timestamped", "Identifiable"]
}
```

## Contributing

Contributions welcome! Please open an issue to discuss new features before submitting PRs.
