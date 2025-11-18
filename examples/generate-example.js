/**
 * Example script showing how to use the generator programmatically
 */

import { generateAndSave } from '../generators/openapi/index.js';
import config from './configs/openapi.config.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log('Generating OpenAPI specification from example config...\n');

  const outputPath = path.join(__dirname, '..', 'output', 'specs', 'openapi.json');

  await generateAndSave(config, outputPath);

  console.log('\nSpecification generated at: output/specs/openapi.json');
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
