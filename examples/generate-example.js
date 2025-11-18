/**
 * Example script showing how to use the generator programmatically
 */

import { generateAndSave } from '../src/index.js';
import config from './config.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log('Generating OpenAPI specification from example config...\n');

  const outputPath = path.join(__dirname, '..', 'output', 'openapi.json');

  await generateAndSave(config, outputPath);

  console.log('\nSpecification generated at: output/openapi.json');
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
