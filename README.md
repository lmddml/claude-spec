# OpenAPI CRUD Generator

Ein Node.js Generator, der aus einfachen Endpoint-Definitionen automatisch vollständige OpenAPI 3.0 Spezifikationen generiert.

## Features

- 🚀 **Einfache Definition**: Definiere deine Endpoints und Spalten an zentraler Stelle
- 📝 **Vollständige CRUD-Operationen**: Automatische Generierung von LIST, GET, CREATE, UPDATE, DELETE Endpunkten
- 🔄 **Flexible Ausgabe**: Unterstützt YAML und JSON Format
- 🎯 **Type-Safe**: Umfassende Type-Mappings für verschiedene Datentypen
- 📦 **CLI & Programmatisch**: Nutzbar als CLI-Tool oder als Modul in deinem Code
- ✨ **OpenAPI 3.0**: Generiert standardkonforme OpenAPI 3.0 Spezifikationen

## Installation

```bash
# Repository klonen
git clone <repository-url>
cd claude-spec

# Dependencies installieren
npm install
```

## Schnellstart

### 1. Erstelle eine Konfigurationsdatei

Erstelle eine `config.js` Datei mit deinen Endpoint-Definitionen:

```javascript
export default {
  title: 'My API',
  version: '1.0.0',
  description: 'My REST API',
  baseUrl: 'https://api.example.com',

  endpoints: [
    {
      name: 'users',
      path: '/users',
      operations: ['list', 'get', 'create', 'update', 'delete'],
      columns: [
        {
          name: 'id',
          type: 'uuid',
          required: true,
          readOnly: true,
          description: 'User ID'
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          description: 'User email'
        },
        {
          name: 'name',
          type: 'string',
          required: true,
          description: 'User name'
        }
      ]
    }
  ]
};
```

### 2. Generiere die OpenAPI Spezifikation

#### Mit CLI:

```bash
# YAML Output (Standard)
npm start -- -c config.js

# JSON Output
npm start -- -c config.js -f json

# Eigener Output-Pfad
npm start -- -c config.js -o my-api-spec.yaml
```

#### Programmatisch:

```javascript
import { generateAndSave } from './src/index.js';
import config from './config.js';

await generateAndSave(config, 'output/openapi.yaml', 'yaml');
```

## Beispiel ausführen

Das Projekt enthält ein vollständiges Beispiel:

```bash
npm run example
```

Dies generiert OpenAPI-Spezifikationen für eine API mit Users, Products und Orders.

## Konfigurations-Optionen

### API-Konfiguration

```javascript
{
  title: string,              // API Titel
  version: string,            // API Version
  description: string,        // API Beschreibung
  baseUrl: string,            // Base URL des Servers
  endpoints: Array            // Array von Endpoint-Definitionen
}
```

### Endpoint-Definition

```javascript
{
  name: string,               // Name der Ressource (z.B. 'users')
  path: string,               // API-Pfad (z.B. '/users')
  operations: Array,          // ['list', 'get', 'create', 'update', 'delete']
  columns: Array              // Array von Spalten-Definitionen
}
```

### Spalten-Definition

```javascript
{
  name: string,               // Spaltenname
  type: string,               // Datentyp (siehe unten)
  required: boolean,          // Pflichtfeld?
  readOnly: boolean,          // Nur-Lese (z.B. für IDs, Timestamps)?
  description: string,        // Beschreibung
  example: any,               // Beispielwert
  enum: Array,                // Erlaubte Werte (für Enums)
  format: string,             // Format-String (optional)
  items: string|object        // Für Arrays: Typ der Elemente
}
```

### Unterstützte Datentypen

- `string` - Textfeld
- `number` - Fließkommazahl
- `integer` - Ganzzahl
- `boolean` - Boolean
- `date` - Datum (YYYY-MM-DD)
- `datetime` - Datum mit Zeit (ISO 8601)
- `email` - Email-Adresse
- `uuid` - UUID
- `array` - Array (benötigt `items` Parameter)
- `object` - Objekt

## CRUD-Operationen

Der Generator erstellt automatisch folgende Operationen:

- **list** - `GET /resources` - Liste aller Ressourcen mit Pagination
- **get** - `GET /resources/{id}` - Einzelne Ressource abrufen
- **create** - `POST /resources` - Neue Ressource erstellen
- **update** - `PUT /resources/{id}` - Ressource aktualisieren
- **delete** - `DELETE /resources/{id}` - Ressource löschen

Du kannst wählen, welche Operationen für jeden Endpoint generiert werden sollen.

## Projektstruktur

```
claude-spec/
├── src/
│   ├── generator.js        # Kern-Generator Logik
│   ├── index.js            # Haupt-API Export
│   └── cli.js              # CLI-Tool
├── examples/
│   ├── config.js           # Beispiel-Konfiguration
│   └── generate-example.js # Beispiel-Script
├── output/                 # Generierte Spezifikationen
├── package.json
└── README.md
```

## CLI-Optionen

```
Usage: openapi-crud-gen [options] <config-file>

Options:
  -c, --config <file>   Konfigurationsdatei (erforderlich)
  -o, --output <file>   Output-Dateipfad (Standard: output/openapi.yaml)
  -f, --format <type>   Output-Format: json oder yaml (Standard: yaml)
  -h, --help           Hilfe anzeigen
```

## Beispiele

### Minimal-Beispiel

```javascript
export default {
  title: 'Simple API',
  version: '1.0.0',
  baseUrl: 'http://localhost:3000',
  endpoints: [
    {
      name: 'items',
      path: '/items',
      columns: [
        { name: 'id', type: 'uuid', required: true, readOnly: true },
        { name: 'title', type: 'string', required: true }
      ]
    }
  ]
};
```

### Erweitert mit Validierung

```javascript
{
  name: 'products',
  path: '/products',
  operations: ['list', 'get', 'create', 'update'],
  columns: [
    {
      name: 'id',
      type: 'uuid',
      required: true,
      readOnly: true
    },
    {
      name: 'name',
      type: 'string',
      required: true,
      example: 'Premium Widget'
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      example: 29.99
    },
    {
      name: 'category',
      type: 'string',
      enum: ['electronics', 'clothing', 'food'],
      required: true
    },
    {
      name: 'tags',
      type: 'array',
      items: 'string',
      example: ['sale', 'featured']
    }
  ]
}
```

## Features

### Automatische Schema-Generierung

Der Generator erstellt automatisch zwei Schemas pro Endpoint:

1. **Resource Schema** - Vollständiges Schema mit allen Feldern (inkl. readOnly)
2. **Input Schema** - Schema für POST/PUT ohne readOnly-Felder

### Pagination

List-Endpunkte unterstützen automatisch Pagination mit `page` und `limit` Query-Parametern.

### Standard-Responses

Vordefinierte Error-Responses:
- `404 Not Found` - Ressource nicht gefunden
- `400 Validation Error` - Validierungsfehler

## Roadmap

- [ ] Support für Query-Parameter und Filter
- [ ] Custom Response-Codes
- [ ] Authentication/Authorization Schemas
- [ ] Request/Response Beispiele aus Spalten-Definitionen
- [ ] PATCH Operation
- [ ] Relationships zwischen Endpoints
- [ ] TypeScript Support

## Lizenz

MIT
