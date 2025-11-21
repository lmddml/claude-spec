import { generateOpenAPI } from './generator.js';
import fs from 'fs';
import path from 'path';

/**
 * Generate and save OpenAPI specification
 * @param {Object} config - Configuration object
 * @param {string} outputPath - Path to save the generated spec
 * @returns {Object} Generated OpenAPI specification
 */
export async function generateAndSave(config, outputPath) {
  const spec = await generateOpenAPI(config);

  // Ensure output directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Write JSON output
  fs.writeFileSync(outputPath, JSON.stringify(spec, null, 2));

  console.log(`OpenAPI specification generated: ${outputPath}`);
  return spec;
}

/**
 * Load configuration from a JS/JSON file
 * @param {string} configPath - Path to configuration file
 * @returns {Object} Configuration object
 */
export async function loadConfig(configPath) {
  const absolutePath = path.resolve(configPath);

  if (configPath.endsWith('.json')) {
    const content = fs.readFileSync(absolutePath, 'utf-8');
    return JSON.parse(content);
  } else if (configPath.endsWith('.js')) {
    const module = await import(`file://${absolutePath}`);
    return module.default || module;
  } else {
    throw new Error('Configuration file must be .js or .json');
  }
}

export { generateOpenAPI };
export default { generateOpenAPI, generateAndSave, loadConfig };
