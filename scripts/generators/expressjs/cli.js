#!/usr/bin/env node

/**
 * Express.js CRUD Generator CLI
 */

import { generateAndSave, loadConfig } from './index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function showHelp() {
  console.log(`
Express.js CRUD Generator

Usage:
  node scripts/generators/expressjs/cli.js [options]

Options:
  -c, --config <path>   Path to configuration file (JS or JSON)
  -o, --output <path>   Output directory (default: ./apps/server)
  -h, --help            Show this help message

Examples:
  node scripts/generators/expressjs/cli.js -c examples/configs/expressjs.config.js
  node scripts/generators/expressjs/cli.js -c config.json -o ./my-server
`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('-h') || args.includes('--help')) {
    showHelp();
    process.exit(0);
  }

  let configPath = null;
  let outputDir = path.join(__dirname, '..', '..', '..', 'apps', 'server');

  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '-c' || args[i] === '--config') {
      configPath = args[++i];
    } else if (args[i] === '-o' || args[i] === '--output') {
      outputDir = args[++i];
    }
  }

  if (!configPath) {
    console.error('Error: Configuration file is required');
    console.error('Use -c or --config to specify a configuration file');
    showHelp();
    process.exit(1);
  }

  try {
    // Resolve config path
    const resolvedConfigPath = path.isAbsolute(configPath)
      ? configPath
      : path.resolve(process.cwd(), configPath);

    console.log(`Loading configuration from: ${resolvedConfigPath}`);
    const config = await loadConfig(resolvedConfigPath);

    console.log(`Generating Express.js server...`);
    console.log(`Output directory: ${outputDir}\n`);

    await generateAndSave(config, outputDir);

    console.log('\nGeneration complete!');
    console.log('\nTo run the server:');
    console.log(`  cd ${outputDir}`);
    console.log('  npm install');
    console.log('  npm run dev');

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
