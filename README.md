# OpenAPI CRUD Generator

Generate OpenAPI 3.1 specifications from JSON Schema files. Define your schemas once, get complete CRUD API documentation automatically.

## Features

- **JSON Schema as source of truth** - Define entities using standard JSON Schema
- **Automatic CRUD generation** - LIST, GET, CREATE, UPDATE, DELETE endpoints
- **Reference resolution** - `$ref` between schemas automatically converted
- **Single schema approach** - Uses `readOnly` for input/output distinction
- **OpenAPI 3.1** - Modern spec with full JSON Schema compatibility

## Quick Start

### 1. Create JSON Schemas

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
    "required": ["id"]
}
```

### 2. Create Configuration

```javascript
// config.js
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  title: 'My API',
  version: '1.0.0',
  description: 'REST API documentation',
  baseUrl: 'https://api.example.com/v1',
  schemasDir: path.join(__dirname, 'schemas')
};
```

### 3. Generate

```bash
node src/cli.js config.js -o openapi.json
```

## Installation

```bash
git clone <repository-url>
cd claude-spec
npm install
```

## CLI Usage

```
openapi-crud-gen [options] <config-file>

Options:
  -c, --config <file>   Configuration file (required)
  -o, --output <file>   Output file path (default: output/openapi.json)
  -h, --help            Show help
```

### Examples

```bash
# Generate with default output
node src/cli.js config.js

# Custom output path
node src/cli.js -c config.js -o api-spec.json

# Run example
npm run example
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
- `x-camel` - Singular in descriptions ("Create a new orderItem")
- `x-camel-plural` - URL path (`/orderItems`)

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

### Nullable Fields

```json
{
    "middleName": {
        "type": ["string", "null"],
        "description": "Optional middle name"
    }
}
```

## Generated Output

For each schema, the generator creates:

### Endpoints

- `GET /{resources}` - List with pagination
- `POST /{resources}` - Create new
- `GET /{resources}/{id}` - Get by ID
- `PUT /{resources}/{id}` - Update
- `DELETE /{resources}/{id}` - Delete

### Components

Schemas are copied directly to `components/schemas` with:
- `$ref` paths converted to OpenAPI format
- `$schema` removed
- All other properties preserved

## Validation

Install the validator:

```bash
npm install --save-dev @apidevtools/swagger-parser
```

Validate output:

```bash
npm run validate
# or
npm run validate output/openapi.json
```

## Project Structure

```
claude-spec/
├── src/
│   ├── generator.js    # Core generation logic
│   ├── index.js        # Main exports
│   └── cli.js          # CLI tool
├── examples/
│   ├── config.js       # Example configuration
│   └── schemas/        # Example JSON schemas
├── scripts/
│   └── validate.js     # OpenAPI validator
├── docs/
│   ├── SCHEMA-CONVENTIONS.md
│   ├── YAML-OUTPUT-RESTORATION.md
│   └── ROADMAP.md
└── output/             # Generated specs
```

## Programmatic Usage

```javascript
import { generateOpenAPI, generateAndSave } from './src/index.js';

// Generate spec object
const spec = await generateOpenAPI({
  title: 'My API',
  version: '1.0.0',
  baseUrl: 'https://api.example.com',
  schemasDir: './schemas'
});

// Generate and save to file
await generateAndSave(config, 'output/openapi.json');
```

## License

MIT
