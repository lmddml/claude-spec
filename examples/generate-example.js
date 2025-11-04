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

  const outputDir = path.join(__dirname, '..', 'output');

  // Generate YAML version
  await generateAndSave(
    config,
    path.join(outputDir, 'openapi.yaml'),
    'yaml'
  );

  // Generate JSON version
  await generateAndSave(
    config,
    path.join(outputDir, 'openapi.json'),
    'json'
  );

  console.log('\n✓ Both YAML and JSON specifications have been generated!');
  console.log('  - output/openapi.yaml');
  console.log('  - output/openapi.json');
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
