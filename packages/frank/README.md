# @symbo.ls/frank

Bidirectional transformation between Symbols project JSON and filesystem formats. Bundles a `symbols/` directory into a JSON object (`toJSON`), or converts a JSON project back into a filesystem structure (`toFS`).

## API

### `toJSON(projectDir, options?)`

Bundles a Symbols filesystem project into a JSON-serializable object. Uses esbuild to bundle all project modules into a single CJS file, loads it, and returns the resolved data with functions stringified.

```js
import { toJSON } from '@symbo.ls/frank'

const project = await toJSON('/path/to/symbols')

// project.components  -> all components
// project.pages       -> all pages
// project.designSystem -> design system config
// project.state       -> app state
// project.functions   -> all functions (stringified)
```

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entry` | `string` | auto-detected | Custom entry file (defaults to `context.js`) |
| `stringify` | `boolean` | `true` | Stringify functions for JSON transport |
| `tmpDir` | `string` | `.frank_tmp/` | Custom temp directory for bundled output |
| `external` | `string[]` | `[]` | Additional packages to externalize |

If no `context.js` exists, frank auto-generates one by discovering available project modules (state, components, pages, etc.).

### `toFS(data, distDir, options?)`

Converts a JSON project object into a Symbols filesystem structure with proper directory layout, index files, and a generated `context.js`.

```js
import { toFS } from '@symbo.ls/frank'

await toFS(projectData, '/path/to/output/symbols')
```

**Options:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `overwrite` | `boolean` | `false` | Overwrite existing files |

**Generated structure:**

```
symbols/
  index.js              # re-exports all modules
  context.js            # aggregated default export for bundling
  config.js             # design system config flags
  state.js              # app state
  dependencies.js       # project dependencies
  components/
    index.js            # export * from each component
    Button.js
    Card.js
  pages/
    index.js            # default export with route mapping
    main.js             # / route
    about.js            # /about route
  functions/
    index.js
    initApp.js
  methods/
    index.js
  snippets/
    index.js
  designSystem/
    index.js            # default export merging all sub-modules
    color.js
    theme.js
    typography.js
  files/
    index.js
```

### `stringifyFunctions(value)`

Recursively clones a value, converting all functions to their string representations for JSON serialization. Handles circular references via WeakMap and skips internal metadata keys (`__fn`, `__fnMeta`, `__handler`, `__meta`).

```js
import { stringifyFunctions } from '@symbo.ls/frank'

const serializable = stringifyFunctions({
  onClick: (el) => el.update({ active: true }),
  nested: { handler: function () { return 42 } }
})
// { onClick: '(el) => el.update({ active: true })', nested: { handler: 'function () { return 42 }' } }
```

## How bundling works

`toJSON` uses esbuild to bundle the project entry into a single CJS module:

1. Detects entry file (`context.js`, or generates one from discovered modules)
2. Bundles with esbuild — resolves all local imports, externalizes runtime packages (smbls, domql, emotion, etc.)
3. Injects browser API stubs (location, history, document, etc.) so modules that reference browser globals don't crash in Node.js
4. Loads the bundled CJS module, strips empty `default: {}` artifacts from CJS bundling
5. Optionally stringifies functions, returns the plain object
6. Cleans up temp files

## Project modules

Frank recognizes these standard project modules:

| Module | Path | Export style |
|--------|------|-------------|
| `state` | `./state.js` | default |
| `dependencies` | `./dependencies.js` | default |
| `sharedLibraries` | `./sharedLibraries.js` | default |
| `components` | `./components/index.js` | namespace |
| `snippets` | `./snippets/index.js` | namespace |
| `pages` | `./pages/index.js` | default |
| `functions` | `./functions/index.js` | namespace |
| `methods` | `./methods/index.js` | namespace |
| `designSystem` | `./designSystem/index.js` | default |
| `files` | `./files/index.js` | default |
| `config` | `./config.js` | default |
