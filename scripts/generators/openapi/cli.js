#!/usr/bin/env node

import { generateAndSave, loadConfig } from './index.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    config: null,
    output: null
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '-c' || arg === '--config') {
      options.config = args[++i];
    } else if (arg === '-o' || arg === '--output') {
      options.output = args[++i];
    } else if (arg === '-h' || arg === '--help') {
      printHelp();
      process.exit(0);
    } else if (!options.config) {
      options.config = arg;
    }
  }

  return options;
}

/**
 * Print help message
 */
function printHelp() {
  console.log(`
OpenAPI CRUD Generator

Usage: node scripts/generators/openapi/cli.js [options] <config-file>

Options:
  -c, --config <file>   Configuration file (required)
  -o, --output <file>   Output file path (default: docs/openapi.json)
  -h, --help           Show this help message

Examples:
  node scripts/generators/openapi/cli.js config.js
  node scripts/generators/openapi/cli.js -c config.js -o api-spec.json
  `);
}

/**
 * Main CLI function
 */
async function main() {
  try {
    const options = parseArgs();

    if (!options.config) {
      console.error('Error: Configuration file is required\n');
      printHelp();
      process.exit(1);
    }

    // Default output path
    if (!options.output) {
      options.output = path.join(process.cwd(), 'docs', 'openapi.json');
    }

    console.log('Loading configuration...');
    const config = await loadConfig(options.config);

    console.log('Generating OpenAPI specification...');
    await generateAndSave(config, options.output);

    console.log('\nDone!');
  } catch (error) {
    console.error('\nError:', error.message);
    process.exit(1);
  }
}

main();
