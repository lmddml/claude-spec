/**
 * Express.js CRUD Generator - Public API
 */

import { generateExpress, loadSchemas } from './generator.js';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

/**
 * Generate Express.js server and save to output directory
 * @param {Object} config - Configuration object
 * @param {string} outputDir - Directory to save generated files
 */
export async function generateAndSave(config, outputDir) {
  const files = await generateExpress(config);

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write each file
  for (const [filePath, content] of Object.entries(files)) {
    const fullPath = path.join(outputDir, filePath);
    const dir = path.dirname(fullPath);

    // Create subdirectories if needed
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(fullPath, content);
    console.log(`Generated: ${filePath}`);
  }

  console.log(`\nGenerated ${Object.keys(files).length} files in ${outputDir}`);
}

/**
 * Load configuration from file
 * @param {string} configPath - Path to configuration file
 * @returns {Object} Configuration object
 */
export async function loadConfig(configPath) {
  const ext = path.extname(configPath);

  if (ext === '.json') {
    const content = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(content);
  } else if (ext === '.js') {
    const fileUrl = pathToFileURL(configPath).href;
    const module = await import(fileUrl);
    return module.default;
  } else {
    throw new Error(`Unsupported config format: ${ext}`);
  }
}

export { generateExpress, loadSchemas };
