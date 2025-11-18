/**
 * Example configuration for Express.js CRUD Generator
 *
 * This file contains API metadata and points to the schemas directory.
 * JSON Schema files in the schemas directory define the API resources.
 */

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  // API metadata
  title: 'Order Management API',
  version: '1.0.0',
  description: 'RESTful API for managing customers, orders, and articles',
  port: 3000,

  // Package configuration
  packageName: 'order-management-api',

  // Path to JSON Schema files
  schemasDir: path.join(__dirname, '..', 'schemas')
};
