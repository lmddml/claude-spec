#!/usr/bin/env node

/**
 * OpenAPI Specification Validator
 *
 * Usage: node scripts/validate.js [path-to-spec]
 * Default: output/openapi.json
 *
 * Requires: npm install --save-dev @apidevtools/swagger-parser
 */

import SwaggerParser from '@apidevtools/swagger-parser';
import path from 'path';

const specPath = process.argv[2] || 'output/openapi.json';
const absolutePath = path.resolve(specPath);

console.log(`Validating: ${absolutePath}\n`);

try {
  const api = await SwaggerParser.validate(absolutePath);
  console.log('OpenAPI specification is valid!');
  console.log(`  Title: ${api.info.title}`);
  console.log(`  Version: ${api.info.version}`);
  console.log(`  Paths: ${Object.keys(api.paths).length}`);
  console.log(`  Schemas: ${Object.keys(api.components?.schemas || {}).length}`);
} catch (err) {
  console.error('Validation failed:');
  console.error(`  ${err.message}`);
  process.exit(1);
}
