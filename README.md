# Claude Spec

Code generators for API specifications and servers. Define your schemas once, generate both OpenAPI documentation and Express.js servers automatically.

## Features

- **JSON Schema as source of truth** - Define entities using standard JSON Schema
- **OpenAPI 3.1 Generator** - Generate complete API documentation with CRUD endpoints
- **Express.js v5 Generator** - Generate TypeScript servers with dummy data
- **Example data support** - Include examples in schemas for realistic mock data
- **Reference resolution** - `$ref` between schemas automatically converted

## Quick Start

### 1. Create JSON Schemas with Examples

Create schema files in a `schemas/` directory:

```json
// schemas/customer.schema.json
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Customer",
    "x-plural": "Customers",
    "x-camel": "customer",
    "x-camel-plural": "customers",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "description": "Unique identifier",
            "readOnly": true
        },
        "email": {
            "type": "string",
            "format": "email",
            "description": "Customer email"
        },
        "name": {
            "type": "string",
            "description": "Customer name"
        }
    },
    "required": ["id"],
    "examples": [
        {
            "id": "cust-001",
            "email": "john@example.com",
            "name": "John Doe"
        }
    ]
}
```

### 2. Create Configuration

```javascript
// examples/configs/openapi.config.js
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  title: 'My API',
  version: '1.0.0',
  description: 'REST API documentation',
  baseUrl: 'https://api.example.com/v1',
  schemasDir: path.join(__dirname, '..', 'schemas')
};
```

### 3. Generate

```bash
# Generate OpenAPI specification
npm run generate:openapi

# Generate Express.js server
npm run generate:expressjs

# Generate both
npm run generate:all
```

## Installation

```bash
git clone <repository-url>
cd claude-spec
```

## CLI Usage

### OpenAPI Generator

```bash
node generators/openapi/cli.js -c examples/configs/openapi.config.js -o output/specs/openapi.json
```

Options:
- `-c, --config <file>` - Configuration file (required)
- `-o, --output <file>` - Output file path
- `-h, --help` - Show help

### Express.js Generator

```bash
node generators/expressjs/cli.js -c examples/configs/expressjs.config.js -o output/server
```

Options:
- `-c, --config <file>` - Configuration file (required)
- `-o, --output <path>` - Output directory
- `-h, --help` - Show help

## npm Scripts

```bash
# Generate OpenAPI spec
npm run generate:openapi

# Generate Express.js server
npm run generate:expressjs

# Generate all
npm run generate:all

# Run OpenAPI example
npm run example:openapi

# Validate OpenAPI spec
npm run validate
```

## Project Structure

```
claude-spec/
├── generators/
│   ├── openapi/           # OpenAPI 3.1 generator
│   │   ├── generator.js
│   │   ├── index.js
│   │   └── cli.js
│   └── expressjs/         # Express.js v5 TypeScript generator
│       ├── generator.js
│       ├── index.js
│       └── cli.js
├── examples/
│   ├── schemas/           # Example JSON schemas with examples
│   └── configs/           # Example configurations
├── output/
│   ├── specs/             # Generated OpenAPI specs
│   ├── server/            # Generated Express.js server
│   └── client/            # Future client code
├── scripts/
│   └── validate.js        # OpenAPI validator
└── docs/                  # Documentation
```

## Schema Conventions

### Required Extensions

Each schema must include naming variants:

```json
{
    "title": "OrderItem",
    "x-plural": "OrderItems",
    "x-camel": "orderItem",
    "x-camel-plural": "orderItems"
}
```

These control:
- `title` - Schema name in components
- `x-plural` - Tag name
- `x-camel` - Singular in descriptions
- `x-camel-plural` - URL path (`/orderItems`)

### Example Data

Include examples for generated mock data:

```json
{
    "examples": [
        {
            "id": "item-001",
            "name": "Product Name",
            "price": 29.99
        }
    ]
}
```

### ReadOnly Fields

Mark fields that should not be in request bodies:

```json
{
    "id": {
        "type": "string",
        "readOnly": true
    },
    "createdAt": {
        "type": "string",
        "format": "date-time",
        "readOnly": true
    }
}
```

### Foreign Key Pattern

Reference related entities:

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

## Generated Output

### OpenAPI Generator

For each schema, generates:
- `GET /{resources}` - List with pagination
- `POST /{resources}` - Create new
- `GET /{resources}/{id}` - Get by ID
- `PUT /{resources}/{id}` - Update
- `DELETE /{resources}/{id}` - Delete

### Express.js Generator

Generates a complete TypeScript project:
- `src/app.ts` - Main Express application
- `src/types/index.ts` - TypeScript interfaces
- `src/routes/*.ts` - CRUD routers with in-memory data
- `package.json` - Dependencies (Express v5)
- `tsconfig.json` - TypeScript configuration

To run the generated server:
```bash
cd output/server
npm install
npm run dev
```

## Programmatic Usage

### OpenAPI Generator

```javascript
import { generateOpenAPI, generateAndSave } from './generators/openapi/index.js';

// Generate spec object
const spec = await generateOpenAPI({
  title: 'My API',
  version: '1.0.0',
  baseUrl: 'https://api.example.com',
  schemasDir: './schemas'
});

// Generate and save to file
await generateAndSave(config, 'output/specs/openapi.json');
```

### Express.js Generator

```javascript
import { generateExpress, generateAndSave } from './generators/expressjs/index.js';

// Generate files
const files = await generateExpress({
  title: 'My API',
  version: '1.0.0',
  port: 3000,
  schemasDir: './schemas'
});

// Generate and save to directory
await generateAndSave(config, 'output/server');
```

## Validation

Install the validator:

```bash
npm install --save-dev @apidevtools/swagger-parser
```

Validate output:

```bash
npm run validate
```

## License

MIT
