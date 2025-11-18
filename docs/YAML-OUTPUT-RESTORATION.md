# Restoring YAML Output

The YAML output feature was removed to simplify the codebase. If you need YAML output, here's how to restore it.

## Option 1: Use js-yaml package (Recommended)

Install the `js-yaml` package for proper YAML serialization:

```bash
npm install js-yaml
```

Then modify `src/index.js`:

```javascript
import yaml from 'js-yaml';

export async function generateAndSave(config, outputPath, format = 'json') {
  const spec = await generateOpenAPI(config);

  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (format === 'yaml') {
    fs.writeFileSync(outputPath, yaml.dump(spec, { indent: 2, lineWidth: -1 }));
  } else {
    fs.writeFileSync(outputPath, JSON.stringify(spec, null, 2));
  }

  console.log(`OpenAPI specification generated: ${outputPath}`);
  return spec;
}
```

## Option 2: Custom YAML Serializer

If you prefer no dependencies, here's the original custom serializer:

```javascript
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
        const needsQuotes = value.includes(':') || value.includes('#') || value.includes('\n');
        yaml += `${spaces}${key}: ${needsQuotes ? JSON.stringify(value) : value}\n`;
      } else {
        yaml += `${spaces}${key}: ${value}\n`;
      }
    });
  }

  return yaml;
}
```

## CLI Changes

To re-add the format option to the CLI, update `src/cli.js`:

```javascript
// In parseArgs():
} else if (arg === '-f' || arg === '--format') {
  options.format = args[++i];
}

// In printHelp():
console.log('  -f, --format <type>   Output format: json or yaml (default: json)');

// In main():
if (!options.output) {
  options.output = path.join(process.cwd(), 'output', `openapi.${options.format === 'yaml' ? 'yaml' : 'json'}`);
}
```
