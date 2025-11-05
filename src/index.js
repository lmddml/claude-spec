import { generateOpenAPI } from './generator.js';
import fs from 'fs';
import path from 'path';

// Simple YAML serializer for OpenAPI spec
function toYAML(obj, indent = 0) {
  const spaces = '  '.repeat(indent);
  let yaml = '';

  if (Array.isArray(obj)) {
    obj.forEach(item => {
      if (typeof item === 'object' && item !== null) {
        yaml += `${spaces}-\n${toYAML(item, indent + 1)}`;
      } else {
        yaml += `${spaces}- ${JSON.stringify(item)}\n`;
      }
    });
  } else if (typeof obj === 'object' && obj !== null) {
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      if (value === undefined) return;

      if (Array.isArray(value)) {
        if (value.length === 0) {
          yaml += `${spaces}${key}: []\n`;
        } else {
          yaml += `${spaces}${key}:\n${toYAML(value, indent + 1)}`;
        }
      } else if (typeof value === 'object' && value !== null) {
        yaml += `${spaces}${key}:\n${toYAML(value, indent + 1)}`;
      } else if (typeof value === 'string') {
        // Escape strings that need quoting
        const needsQuotes = value.includes(':') || value.includes('#') || value.includes('\n');
        yaml += `${spaces}${key}: ${needsQuotes ? JSON.stringify(value) : value}\n`;
      } else {
        yaml += `${spaces}${key}: ${value}\n`;
      }
    });
  }

  return yaml;
}

/**
 * Generate and save OpenAPI specification
 * @param {Object} config - Configuration object
 * @param {string} outputPath - Path to save the generated spec
 * @param {string} format - Output format ('json' or 'yaml')
 * @returns {Object} Generated OpenAPI specification
 */
export async function generateAndSave(config, outputPath, format = 'yaml') {
  const spec = generateOpenAPI(config);

  // Ensure output directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Write the file
  if (format === 'json') {
    fs.writeFileSync(outputPath, JSON.stringify(spec, null, 2));
  } else {
    const yamlContent = toYAML(spec);
    fs.writeFileSync(outputPath, yamlContent);
  }

  console.log(`✓ OpenAPI specification generated: ${outputPath}`);
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
