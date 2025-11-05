/**
 * Example configuration for OpenAPI CRUD Generator
 *
 * This file demonstrates how to define your API endpoints
 * with their columns/fields for automatic OpenAPI spec generation
 */

export default {
  // API metadata
  title: 'My Application API',
  version: '1.0.0',
  description: 'RESTful API for managing users, products, and orders',
  baseUrl: 'https://api.example.com/v1',

  // Define your endpoints here
  endpoints: [
    {
      // Endpoint name (used for tagging and schema naming)
      name: 'users',

      // API path
      path: '/users',

      // Define which CRUD operations to include
      // Options: 'list', 'get', 'create', 'update', 'delete'
      operations: ['list', 'get', 'create', 'update', 'delete'],

      // Define the columns/fields for this resource
      columns: [
        {
          name: 'id',
          type: 'uuid',
          required: true,
          readOnly: true,
          description: 'Unique identifier',
          example: '123e4567-e89b-12d3-a456-426614174000'
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          description: 'User email address',
          example: 'user@example.com'
        },
        {
          name: 'firstName',
          type: 'string',
          required: true,
          description: 'User first name',
          example: 'John'
        },
        {
          name: 'lastName',
          type: 'string',
          required: true,
          description: 'User last name',
          example: 'Doe'
        },
        {
          name: 'age',
          type: 'integer',
          required: false,
          description: 'User age',
          example: 30
        },
        {
          name: 'role',
          type: 'string',
          required: true,
          enum: ['admin', 'user', 'guest'],
          description: 'User role',
          example: 'user'
        },
        {
          name: 'isActive',
          type: 'boolean',
          required: false,
          description: 'Whether the user account is active',
          example: true
        },
        {
          name: 'createdAt',
          type: 'datetime',
          required: true,
          readOnly: true,
          description: 'Account creation timestamp',
          example: '2024-01-15T10:30:00Z'
        },
        {
          name: 'updatedAt',
          type: 'datetime',
          required: true,
          readOnly: true,
          description: 'Last update timestamp',
          example: '2024-01-20T14:45:00Z'
        }
      ]
    },

    {
      name: 'products',
      path: '/products',
      operations: ['list', 'get', 'create', 'update', 'delete'],
      columns: [
        {
          name: 'id',
          type: 'uuid',
          required: true,
          readOnly: true,
          description: 'Product ID',
          example: '987fcdeb-51a2-43f1-b456-123456789012'
        },
        {
          name: 'name',
          type: 'string',
          required: true,
          description: 'Product name',
          example: 'Premium Widget'
        },
        {
          name: 'description',
          type: 'string',
          required: false,
          description: 'Product description',
          example: 'A high-quality widget for all your needs'
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          description: 'Product price in USD',
          example: 29.99
        },
        {
          name: 'stock',
          type: 'integer',
          required: true,
          description: 'Available stock quantity',
          example: 100
        },
        {
          name: 'category',
          type: 'string',
          required: true,
          enum: ['electronics', 'clothing', 'food', 'books', 'other'],
          description: 'Product category',
          example: 'electronics'
        },
        {
          name: 'tags',
          type: 'array',
          items: 'string',
          required: false,
          description: 'Product tags',
          example: ['featured', 'sale', 'new']
        },
        {
          name: 'inStock',
          type: 'boolean',
          required: true,
          description: 'Whether product is in stock',
          example: true
        },
        {
          name: 'createdAt',
          type: 'datetime',
          required: true,
          readOnly: true,
          description: 'Product creation timestamp'
        }
      ]
    },

    {
      name: 'orders',
      path: '/orders',
      operations: ['list', 'get', 'create'],
      columns: [
        {
          name: 'id',
          type: 'uuid',
          required: true,
          readOnly: true,
          description: 'Order ID'
        },
        {
          name: 'userId',
          type: 'uuid',
          required: true,
          description: 'ID of the user who placed the order'
        },
        {
          name: 'productIds',
          type: 'array',
          items: 'string',
          required: true,
          description: 'Array of product IDs in this order'
        },
        {
          name: 'totalAmount',
          type: 'number',
          required: true,
          description: 'Total order amount',
          example: 149.97
        },
        {
          name: 'status',
          type: 'string',
          required: true,
          enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
          description: 'Order status',
          example: 'pending'
        },
        {
          name: 'shippingAddress',
          type: 'object',
          required: true,
          description: 'Shipping address details'
        },
        {
          name: 'orderDate',
          type: 'datetime',
          required: true,
          readOnly: true,
          description: 'Order placement date'
        }
      ]
    }
  ]
};
