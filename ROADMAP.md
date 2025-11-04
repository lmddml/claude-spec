# Roadmap & Mögliche Erweiterungen

Diese Datei dokumentiert mögliche zukünftige Features und Erweiterungen für den OpenAPI CRUD Generator.

## Sicherheit & Authentifizierung

### Security Schemes
- **Bearer Tokens**: JWT-basierte Authentifizierung
- **API Keys**: Header, Query oder Cookie-basiert
- **OAuth2**: Authorization Code, Client Credentials, etc.
- **Basic Auth**: Username/Password
- **OpenID Connect**: Identity Layer on top of OAuth2

### Endpoint-spezifische Sicherheit
```javascript
{
  name: 'users',
  path: '/users',
  security: ['bearerAuth'], // Which security scheme to use
  operations: {
    list: { security: [] }, // Public
    create: { security: ['bearerAuth'] } // Requires auth
  }
}
```

### Scopes & Permissions
- Definition von OAuth2 Scopes
- Rollenbasierte Zugriffskontrolle (RBAC)
- Endpoint-spezifische Permissions

```javascript
security: {
  bearerAuth: {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT'
  },
  oauth2: {
    type: 'oauth2',
    flows: {
      authorizationCode: {
        authorizationUrl: 'https://auth.example.com/oauth/authorize',
        tokenUrl: 'https://auth.example.com/oauth/token',
        scopes: {
          'read:users': 'Read user data',
          'write:users': 'Modify user data'
        }
      }
    }
  }
}
```

---

## Erweiterte Query-Funktionen

### Filtering
```javascript
queryParameters: {
  filters: [
    { name: 'status', type: 'string', enum: ['active', 'inactive'] },
    { name: 'role', type: 'string' },
    { name: 'createdAfter', type: 'date' }
  ]
}
```

### Sorting
```javascript
queryParameters: {
  sort: {
    enabled: true,
    fields: ['name', 'createdAt', 'updatedAt'],
    defaultSort: 'createdAt:desc'
  }
}
```

### Search
```javascript
queryParameters: {
  search: {
    enabled: true,
    fields: ['name', 'email', 'description'],
    operator: 'contains' // or 'startsWith', 'exact'
  }
}
```

### Field Selection
```javascript
queryParameters: {
  fieldSelection: {
    enabled: true,
    parameter: 'fields' // ?fields=id,name,email
  }
}
```

### Pagination Strategien
- **Offset-based** (aktuell): `?page=1&limit=10`
- **Cursor-based**: `?cursor=xyz&limit=10` (bessere Performance bei großen Datensätzen)
- **Page-based with tokens**: `?pageToken=xyz`

---

## Validierung & Constraints

### String-Validierung
```javascript
{
  name: 'username',
  type: 'string',
  minLength: 3,
  maxLength: 20,
  pattern: '^[a-zA-Z0-9_]+$',
  example: 'john_doe'
}
```

### Zahlen-Validierung
```javascript
{
  name: 'age',
  type: 'integer',
  minimum: 0,
  maximum: 150,
  example: 25
},
{
  name: 'price',
  type: 'number',
  minimum: 0,
  exclusiveMinimum: true, // > 0, not >= 0
  multipleOf: 0.01, // Two decimal places
  example: 19.99
}
```

### Array-Validierung
```javascript
{
  name: 'tags',
  type: 'array',
  items: 'string',
  minItems: 1,
  maxItems: 10,
  uniqueItems: true,
  example: ['featured', 'sale']
}
```

### Default-Werte
```javascript
{
  name: 'status',
  type: 'string',
  enum: ['draft', 'published', 'archived'],
  default: 'draft'
}
```

### Nullable Fields
```javascript
{
  name: 'middleName',
  type: 'string',
  nullable: true,
  description: 'Optional middle name'
}
```

---

## Beziehungen & Struktur

### Nested Resources
```javascript
endpoints: [
  {
    name: 'user-posts',
    path: '/users/{userId}/posts',
    parentResource: 'users',
    columns: [...]
  },
  {
    name: 'post-comments',
    path: '/posts/{postId}/comments',
    parentResource: 'posts',
    columns: [...]
  }
]
```

### Relationships & Foreign Keys
```javascript
{
  name: 'userId',
  type: 'uuid',
  required: true,
  relationship: {
    resource: 'users',
    type: 'many-to-one'
  }
}
```

### Embedded/Expanded Resources
```javascript
queryParameters: {
  expand: {
    enabled: true,
    relations: ['user', 'comments', 'tags']
    // ?expand=user,comments
  }
}
```

### Polymorphismus
```javascript
{
  name: 'content',
  oneOf: [
    { $ref: '#/components/schemas/TextContent' },
    { $ref: '#/components/schemas/ImageContent' },
    { $ref: '#/components/schemas/VideoContent' }
  ],
  discriminator: {
    propertyName: 'contentType'
  }
}
```

### Schema Composition
```javascript
baseSchemas: {
  Timestamped: {
    columns: [
      { name: 'createdAt', type: 'datetime', readOnly: true },
      { name: 'updatedAt', type: 'datetime', readOnly: true }
    ]
  },
  Identifiable: {
    columns: [
      { name: 'id', type: 'uuid', readOnly: true, required: true }
    ]
  }
},
endpoints: [
  {
    name: 'users',
    extends: ['Identifiable', 'Timestamped'],
    columns: [
      { name: 'email', type: 'email', required: true }
      // id, createdAt, updatedAt werden automatisch hinzugefügt
    ]
  }
]
```

---

## Zusätzliche Operationen

### PATCH Operation
```javascript
operations: ['list', 'get', 'create', 'update', 'patch', 'delete']
// PATCH erlaubt partial updates
```

### Bulk Operations
```javascript
operations: {
  bulkCreate: true,  // POST /users/bulk
  bulkUpdate: true,  // PUT /users/bulk
  bulkDelete: true   // DELETE /users/bulk
}
```

### Custom Actions
```javascript
customActions: [
  {
    name: 'activate',
    method: 'POST',
    path: '/users/{id}/activate',
    description: 'Activate a user account'
  },
  {
    name: 'resetPassword',
    method: 'POST',
    path: '/users/{id}/reset-password',
    requestBody: {
      newPassword: { type: 'string', format: 'password' }
    }
  },
  {
    name: 'export',
    method: 'GET',
    path: '/users/export',
    produces: 'text/csv'
  }
]
```

---

## Response-Erweiterungen

### Erweiterte HTTP Status Codes
```javascript
responses: {
  200: 'Success',
  201: 'Created',
  204: 'No Content',
  400: 'Bad Request - Validation Error',
  401: 'Unauthorized - Authentication required',
  403: 'Forbidden - Insufficient permissions',
  404: 'Not Found',
  409: 'Conflict - Resource already exists',
  422: 'Unprocessable Entity - Business logic error',
  429: 'Too Many Requests - Rate limit exceeded',
  500: 'Internal Server Error',
  503: 'Service Unavailable'
}
```

### Custom Response Headers
```javascript
responseHeaders: {
  'X-Total-Count': {
    description: 'Total number of items',
    schema: { type: 'integer' }
  },
  'ETag': {
    description: 'Entity tag for caching',
    schema: { type: 'string' }
  },
  'Last-Modified': {
    description: 'Last modification date',
    schema: { type: 'string', format: 'date-time' }
  },
  'X-RateLimit-Limit': {
    description: 'Request limit per hour',
    schema: { type: 'integer' }
  },
  'X-RateLimit-Remaining': {
    description: 'Remaining requests',
    schema: { type: 'integer' }
  }
}
```

### Envelope Patterns
```javascript
responseFormat: {
  envelope: true,
  structure: {
    data: 'The actual response data',
    meta: {
      timestamp: 'datetime',
      requestId: 'string'
    },
    links: {
      self: 'string',
      next: 'string',
      prev: 'string'
    }
  }
}
```

---

## Medien & Uploads

### File Upload
```javascript
{
  name: 'avatar',
  type: 'file',
  accept: ['image/png', 'image/jpeg'],
  maxSize: '5MB',
  description: 'User avatar image'
}

// Generiert multipart/form-data request
```

### Multiple Content Types
```javascript
contentTypes: {
  request: ['application/json', 'application/xml'],
  response: ['application/json', 'application/xml', 'text/csv']
}
```

### Binary Data
```javascript
{
  name: 'document',
  type: 'binary',
  format: 'byte', // base64 encoded
  description: 'PDF document'
}
```

---

## Dokumentation & Metadata

### API-Level Metadata
```javascript
{
  title: 'My API',
  version: '1.0.0',
  description: 'Detailed API description with **markdown** support',
  contact: {
    name: 'API Support',
    email: 'support@example.com',
    url: 'https://support.example.com'
  },
  license: {
    name: 'Apache 2.0',
    url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
  },
  termsOfService: 'https://example.com/terms',
  externalDocs: {
    description: 'Find more info here',
    url: 'https://docs.example.com'
  }
}
```

### Endpoint-Beschreibungen
```javascript
{
  name: 'users',
  path: '/users',
  description: 'User management endpoints. Supports full CRUD operations.',
  externalDocs: {
    description: 'User API Documentation',
    url: 'https://docs.example.com/users'
  },
  operations: {
    list: {
      summary: 'List all users',
      description: 'Returns a paginated list of all users. Supports filtering and sorting.',
      operationId: 'listUsers'
    }
  }
}
```

### Tags mit Beschreibungen
```javascript
tags: [
  {
    name: 'users',
    description: 'User management operations',
    externalDocs: {
      description: 'Learn more about users',
      url: 'https://docs.example.com/users'
    }
  },
  {
    name: 'products',
    description: 'Product catalog operations'
  }
]
```

### Deprecation
```javascript
{
  name: 'oldEndpoint',
  path: '/old-endpoint',
  deprecated: true,
  deprecationMessage: 'Use /new-endpoint instead. Will be removed in v2.0.0',
  operations: [...]
}
```

### Code Examples
```javascript
examples: {
  createUser: {
    summary: 'Create new user example',
    value: {
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe'
    }
  },
  listUsersResponse: {
    summary: 'Successful response example',
    value: {
      data: [...],
      total: 100,
      page: 1
    }
  }
}
```

---

## Umgebung & Versioning

### Multiple Servers
```javascript
servers: [
  {
    url: 'https://api.example.com/v1',
    description: 'Production server'
  },
  {
    url: 'https://staging-api.example.com/v1',
    description: 'Staging server'
  },
  {
    url: 'http://localhost:3000/v1',
    description: 'Development server'
  }
]
```

### Server Variables
```javascript
servers: [
  {
    url: 'https://{environment}.example.com:{port}/{basePath}',
    description: 'Configurable server',
    variables: {
      environment: {
        default: 'api',
        enum: ['api', 'api-staging', 'api-dev']
      },
      port: {
        default: '443'
      },
      basePath: {
        default: 'v1'
      }
    }
  }
]
```

### API Versioning
```javascript
{
  versioning: {
    strategy: 'url', // or 'header', 'query'
    versions: ['v1', 'v2'],
    currentVersion: 'v1',
    deprecatedVersions: [],
    headerName: 'API-Version' // if strategy is 'header'
  }
}
```

---

## Fortgeschrittene Features

### Webhooks
```javascript
webhooks: {
  userCreated: {
    post: {
      summary: 'User created webhook',
      description: 'Called when a new user is created',
      requestBody: {
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/User' }
          }
        }
      }
    }
  }
}
```

### Custom Headers
```javascript
customHeaders: {
  request: [
    {
      name: 'X-Tenant-ID',
      required: true,
      schema: { type: 'string' },
      description: 'Tenant identifier for multi-tenant applications'
    },
    {
      name: 'Accept-Language',
      schema: { type: 'string', default: 'en' },
      description: 'Preferred language'
    }
  ],
  response: [
    {
      name: 'X-Request-ID',
      schema: { type: 'string' },
      description: 'Unique request identifier for tracing'
    }
  ]
}
```

### Conditional Fields
```javascript
{
  name: 'shippingAddress',
  type: 'object',
  required: false,
  conditionallyRequired: {
    when: { field: 'requiresShipping', equals: true }
  }
}
```

### Computed Fields
```javascript
{
  name: 'fullName',
  type: 'string',
  computed: true,
  readOnly: true,
  description: 'Computed from firstName and lastName',
  example: 'John Doe'
}
```

### Soft Delete
```javascript
{
  softDelete: {
    enabled: true,
    field: 'deletedAt',
    type: 'datetime',
    nullable: true
  },
  operations: {
    delete: 'soft', // or 'hard' or 'both'
    list: {
      includeDeleted: false, // option to include soft-deleted items
      parameter: 'includeDeleted'
    }
  }
}
```

### Audit Trail
```javascript
{
  auditTrail: {
    enabled: true,
    fields: {
      createdAt: { type: 'datetime', readOnly: true },
      createdBy: { type: 'uuid', readOnly: true },
      updatedAt: { type: 'datetime', readOnly: true },
      updatedBy: { type: 'uuid', readOnly: true }
    }
  }
}
```

---

## Schema-Wiederverwendung

### Shared Components
```javascript
sharedComponents: {
  parameters: {
    PageParam: {
      name: 'page',
      in: 'query',
      schema: { type: 'integer', minimum: 1, default: 1 }
    },
    LimitParam: {
      name: 'limit',
      in: 'query',
      schema: { type: 'integer', minimum: 1, maximum: 100, default: 10 }
    }
  },
  schemas: {
    Error: {
      type: 'object',
      properties: {
        code: { type: 'string' },
        message: { type: 'string' },
        details: { type: 'array' }
      }
    },
    PaginatedResponse: {
      type: 'object',
      properties: {
        data: { type: 'array' },
        total: { type: 'integer' },
        page: { type: 'integer' },
        limit: { type: 'integer' }
      }
    }
  },
  responses: {
    UnauthorizedError: {
      description: 'Authentication required',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/Error' }
        }
      }
    }
  }
}
```

### Response Templates
```javascript
responseTemplates: {
  paginated: {
    structure: {
      data: '${resource}[]',
      meta: {
        total: 'integer',
        page: 'integer',
        limit: 'integer',
        totalPages: 'integer'
      }
    }
  },
  single: {
    structure: {
      data: '${resource}'
    }
  }
}
```

---

## Testing & Quality

### Request/Response Examples
- Automatische Generierung von Beispielen aus Schema
- Custom Examples pro Endpoint
- Multiple Examples für verschiedene Szenarien

### Mock Data Generation
- Generierung von Mock-Daten basierend auf Schema
- Integration mit Mock-Servern (Prism, Mockoon)

### Validation
- Schema-Validierung bei Generation
- Lint-Regeln für OpenAPI-Specs
- Breaking-Change Detection zwischen Versionen

---

## Prioritäten für Implementation

### Phase 1 - Essentials
1. Validierung & Constraints (minLength, maxLength, pattern, etc.)
2. PATCH Operation
3. Custom Actions
4. Mehr HTTP Status Codes

### Phase 2 - Erweiterte Funktionen
1. Filtering & Sorting
2. Security Schemes (Bearer, API Key)
3. File Upload Support
4. Custom Headers

### Phase 3 - Enterprise Features
1. Nested Resources
2. Relationships
3. Multiple Servers & Versioning
4. Webhooks

### Phase 4 - Advanced
1. Schema Composition & Reuse
2. Polymorphismus
3. Advanced Pagination (Cursor-based)
4. Audit Trail & Soft Delete
