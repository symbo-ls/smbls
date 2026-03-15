#!/usr/bin/env node

import fs from 'fs'
import os from 'os'
import path from 'path'
import chalk from 'chalk'
import { pathToFileURL } from 'url'
import { build } from 'esbuild'
import { loadSymbolsConfig, resolveDistDir } from '../helpers/symbolsConfig.js'

const RESERVED_KEYS = new Set([
  'attr',
  'style',
  'text',
  'html',
  'content',
  'data',
  'class',
  'state',
  'scope',
  'deps',
  'extend',
  'extends',
  'childExtend',
  'childExtends',
  'childExtendsRecursive',
  'helmet',
  'metadata',
  'props',
  'path',
  'if',
  'define',
  'transform',
  'key',
  'tag',
  'query',
  'parent',
  'node',
  'set',
  'reset',
  'update',
  'error',
  'warn',
  'call',
  'setProps',
  'remove',
  'updateContent',
  'removeContent',
  'variables',
  'lookup',
  'lookdown',
  'getRef',
  'getPath',
  'lookdownAll',
  'setNodeStyles',
  'spotByPath',
  'append',
  'routes',
  'keys',
  'log',
  'parse',
  'parseDeep',
  'on',
  'component',
  'context',
  '$collection',
  '$stateCollection',
  '$propsCollection',
  '$setCollection',
  '$setStateCollection',
  '$setPropsCollection'
])

const STRUCTURAL_RESERVED_KEYS = new Set([
  'content',
  'childExtend',
  'childExtends',
  'extend',
  'extends',
  'routes'
])

const BUILTIN_COMPONENT_NAMES = [
  'Box',
  'Flex',
  'Grid',
  'Text',
  'Img',
  'Picture',
  'Video',
  'Iframe',
  'Form',
  'Svg',
  'Media',
  'Hgroup',
  'HgroupRows',
  'HgroupButton',
  'Hoverable',
  'Clickable',
  'Focusable',
  'FocusableComponent',
  'Circle',
  'Hr',
  'Br',
  'Div',
  'Span',
  'Li',
  'Ul',
  'Ol',
  'Gutter',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'P',
  'Caption',
  'Strong',
  'U',
  'Underline',
  'Italic',
  'I',
  'B',
  'Data',
  'Title',
  'Headline',
  'Subhead',
  'Footnote',
  'Avatar',
  'Button',
  'SquareButton',
  'CircleButton',
  'KangorooButton',
  'ButtonSet',
  'IconButton',
  'Dialog',
  'DialogHeader',
  'DialogFooter',
  'DropdownList',
  'DropdownParent',
  'DropdownParentFocus',
  'DropdownSiblingFocus',
  'Icon',
  'IconText',
  'FileIcon',
  'Input',
  'NumberInput',
  'Checkbox',
  'CheckboxHgroup',
  'Radio',
  'RadioHgroup',
  'Toggle',
  'ToggleHgroup',
  'Textarea',
  'TextareaWithButton',
  'Link',
  'A',
  'RouterLink',
  'RouteLink',
  'Notification',
  'Tooltip',
  'TooltipHidden',
  'TooltipParent',
  'Select',
  'Range'
]

function installMinimalDomGlobals () {
  globalThis.window = globalThis
  if (!globalThis.Window) globalThis.Window = class Window {}
  if (!globalThis.Node) globalThis.Node = class Node {}
  if (!globalThis.HTMLElement) {
    globalThis.HTMLElement = class HTMLElement extends globalThis.Node {}
  }
  if (!globalThis.Element) {
    globalThis.Element = class Element extends globalThis.HTMLElement {}
  }
  if (!globalThis.DocumentFragment) {
    globalThis.DocumentFragment = class DocumentFragment extends globalThis.Node {}
  }
  if (!globalThis.document) {
    globalThis.document = { body: {} }
  } else if (!globalThis.document.body) {
    globalThis.document.body = {}
  }
  if (!globalThis.window.location) {
    globalThis.window.location = { pathname: '/', search: '', hash: '' }
  }
}

function resolveTargetPath (inputTarget, symbolsConfig) {
  if (inputTarget) {
    return path.isAbsolute(inputTarget)
      ? inputTarget
      : path.resolve(process.cwd(), inputTarget)
  }

  return (
    resolveDistDir(symbolsConfig, { cwd: process.cwd() }) ||
    path.join(process.cwd(), 'smbls')
  )
}

function isPlainObject (value) {
  return !!value && typeof value === 'object' && !Array.isArray(value)
}

function deepCloneValue (value, seen = new Map()) {
  if (value === null || value === undefined) return value
  if (typeof value === 'function') return value
  if (typeof value !== 'object') return value
  if (seen.has(value)) return seen.get(value)

  if (Array.isArray(value)) {
    const clonedArray = []
    seen.set(value, clonedArray)
    for (const item of value) clonedArray.push(deepCloneValue(item, seen))
    return clonedArray
  }

  const clonedObject = {}
  seen.set(value, clonedObject)
  for (const [key, child] of Object.entries(value)) {
    clonedObject[key] = deepCloneValue(child, seen)
  }
  return clonedObject
}

function getPlaceholderTag (name) {
  const textTags = new Set([
    'H1',
    'H2',
    'H3',
    'H4',
    'H5',
    'H6',
    'P',
    'Span',
    'Text',
    'Caption',
    'Strong',
    'U',
    'Underline',
    'Italic',
    'I',
    'B',
    'Data',
    'Title',
    'Headline',
    'Subhead',
    'Footnote'
  ])
  if (textTags.has(name)) return name.toLowerCase() === 'text' ? 'span' : name.toLowerCase()

  switch (name) {
    case 'Button':
    case 'SquareButton':
    case 'CircleButton':
    case 'KangorooButton':
    case 'IconButton':
      return 'button'
    case 'Link':
    case 'A':
    case 'RouterLink':
    case 'RouteLink':
      return 'a'
    case 'Input':
    case 'NumberInput':
    case 'Checkbox':
    case 'Radio':
    case 'Toggle':
    case 'Range':
      return 'input'
    case 'Textarea':
    case 'TextareaWithButton':
      return 'textarea'
    case 'Select':
      return 'select'
    case 'Dialog':
      return 'dialog'
    case 'Img':
    case 'Avatar':
      return 'img'
    case 'Svg':
    case 'Icon':
      return 'svg'
    case 'Form':
      return 'form'
    case 'Video':
      return 'video'
    case 'Picture':
      return 'picture'
    case 'Iframe':
      return 'iframe'
    case 'Ul':
      return 'ul'
    case 'Ol':
      return 'ol'
    case 'Li':
      return 'li'
    case 'Hr':
      return 'hr'
    case 'Br':
      return 'br'
    default:
      return 'div'
  }
}

function buildBuiltinRegistry () {
  const registry = {}

  for (const name of BUILTIN_COMPONENT_NAMES) {
    const placeholder = { tag: getPlaceholderTag(name) }
    registry[name] = placeholder
    registry[`smbls.${name}`] = placeholder
  }

  return registry
}

function mergeSharedLibraries (sharedLibraries) {
  const merged = {
    pages: {},
    components: {},
    functions: {},
    methods: {},
    snippets: {}
  }

  const libs = Array.isArray(sharedLibraries) ? sharedLibraries : []
  for (const lib of libs) {
    if (isPlainObject(lib?.pages)) Object.assign(merged.pages, lib.pages)
    if (isPlainObject(lib?.components)) Object.assign(merged.components, lib.components)
    if (isPlainObject(lib?.functions)) Object.assign(merged.functions, lib.functions)
    if (isPlainObject(lib?.methods)) Object.assign(merged.methods, lib.methods)
    if (isPlainObject(lib?.snippets)) Object.assign(merged.snippets, lib.snippets)
  }

  return merged
}

function resolveReference (ref, registryNames, pageNames) {
  if (registryNames.has(ref)) return true
  if (pageNames.has(ref)) return true
  if (!ref.startsWith('smbls.') && registryNames.has(`smbls.${ref}`)) return true
  return false
}

function normalizeStringRefs (value) {
  if (typeof value === 'string') return [value]
  if (Array.isArray(value)) {
    return value.flatMap((item) => normalizeStringRefs(item))
  }
  return []
}

function isEmptyComponentShell (value) {
  if (!isPlainObject(value)) return false
  const keys = Object.keys(value).filter((key) => key !== '__order')
  return keys.length === 0
}

function collectUnresolvedRefs (node, registryNames, pageNames, currentPath = []) {
  const findings = []

  const walk = (value, pathParts) => {
    if (Array.isArray(value)) {
      value.forEach((item, index) => walk(item, pathParts.concat(`[${index}]`)))
      return
    }
    if (!isPlainObject(value)) return

    for (const key of ['extend', 'extends']) {
      for (const ref of normalizeStringRefs(value[key])) {
        if (!resolveReference(ref, registryNames, pageNames)) {
          findings.push({
            type: 'extend',
            path: pathParts.concat(key).join('.'),
            ref
          })
        }
      }
    }

    for (const [key, child] of Object.entries(value)) {
      if (key === '__ref') continue

      if (STRUCTURAL_RESERVED_KEYS.has(key)) {
        walk(child, pathParts.concat(key))
        continue
      }

      if (RESERVED_KEYS.has(key)) continue

      if (
        /^[A-Z]/u.test(key) &&
        isEmptyComponentShell(child) &&
        !resolveReference(key, registryNames, pageNames)
      ) {
        findings.push({
          type: 'component-key',
          path: pathParts.concat(key).join('.'),
          ref: key
        })
      }

      walk(child, pathParts.concat(key))
    }
  }

  walk(node, currentPath)
  return findings
}

function collectSuites (projectModule, targetIndex) {
  const suites = []
  const localPages = isPlainObject(projectModule.pages) ? projectModule.pages : {}
  const localComponents = isPlainObject(projectModule.components) ? projectModule.components : {}
  const sharedLibraries = Array.isArray(projectModule.sharedLibraries)
    ? projectModule.sharedLibraries
    : []

  for (const [route, page] of Object.entries(localPages)) {
    suites.push({ kind: 'page', name: route, schema: page, origin: 'local' })
  }

  for (const [name, component] of Object.entries(localComponents)) {
    suites.push({ kind: 'component', name, schema: component, origin: 'local' })
  }

  for (const lib of sharedLibraries) {
    const libKey = lib?.key || lib?.name || 'shared-lib'
    if (isPlainObject(lib?.pages)) {
      for (const [route, page] of Object.entries(lib.pages)) {
        suites.push({
          kind: 'page',
          name: route,
          schema: page,
          origin: `shared:${libKey}`
        })
      }
    }
    if (isPlainObject(lib?.components)) {
      for (const [name, component] of Object.entries(lib.components)) {
        suites.push({
          kind: 'component',
          name,
          schema: component,
          origin: `shared:${libKey}`
        })
      }
    }
  }

  if (suites.length === 0 && isPlainObject(projectModule.default)) {
    suites.push({
      kind: 'schema',
      name: path.basename(targetIndex, path.extname(targetIndex)),
      schema: projectModule.default,
      origin: 'file'
    })
  }

  return suites
}

function summarizeError (error) {
  if (!error) return 'Unknown error'
  if (error.errors?.[0]?.text) return error.errors[0].text
  return error.message || String(error)
}

async function bundleProjectModule (targetIndex) {
  const tempDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'smbls-validate-domql-'))
  const outfile = path.join(tempDir, 'project-bundle.mjs')

  try {
    await build({
      entryPoints: [targetIndex],
      outfile,
      bundle: true,
      format: 'esm',
      platform: 'node',
      target: 'node18',
      logLevel: 'silent',
      write: true
    })
    return { tempDir, outfile }
  } catch (error) {
    const message = summarizeError(error)
    throw new Error(`Failed to bundle generated DOMQL module graph: ${message}`)
  }
}

async function runValidateDomqlRuntime (target, options = {}) {
  installMinimalDomGlobals()

  const [{ default: DOMQLImport }] = await Promise.all([
    import('domql')
  ])
  const DOMQL = DOMQLImport.default || DOMQLImport

  const symbolsConfig = await loadSymbolsConfig({
    required: false,
    validateKey: false,
    silent: true
  })

  const targetPath = resolveTargetPath(target, symbolsConfig)
  const targetIndex = fs.existsSync(targetPath) && fs.statSync(targetPath).isDirectory()
    ? path.join(targetPath, 'index.js')
    : targetPath

  if (!fs.existsSync(targetIndex)) {
    console.error(chalk.red(`DOMQL target not found: ${targetIndex}`))
    process.exit(1)
  }

  const { tempDir, outfile } = await bundleProjectModule(targetIndex)
  let projectModule
  try {
    const moduleUrl = pathToFileURL(outfile)
    moduleUrl.searchParams.set('smbls_domql_validate', String(Date.now()))
    projectModule = await import(moduleUrl.href)
  } finally {
    await fs.promises.rm(tempDir, { recursive: true, force: true })
  }

  const sharedLibraries = Array.isArray(projectModule.sharedLibraries)
    ? projectModule.sharedLibraries
    : []
  const mergedShared = mergeSharedLibraries(sharedLibraries)
  const localPages = isPlainObject(projectModule.pages) ? projectModule.pages : {}
  const localComponents = isPlainObject(projectModule.components) ? projectModule.components : {}
  const localFunctions = isPlainObject(projectModule.functions) ? projectModule.functions : {}
  const localMethods = isPlainObject(projectModule.methods) ? projectModule.methods : {}
  const localSnippets = isPlainObject(projectModule.snippets) ? projectModule.snippets : {}

  const pages = { ...mergedShared.pages, ...localPages }
  const components = {
    ...buildBuiltinRegistry(),
    ...mergedShared.components,
    ...localComponents
  }
  const functions = { ...mergedShared.functions, ...localFunctions }
  const methods = { ...mergedShared.methods, ...localMethods }
  const snippets = { ...mergedShared.snippets, ...localSnippets }

  const registryNames = new Set(Object.keys(components))
  const pageNames = new Set(Object.keys(pages))
  const suites = collectSuites(projectModule, targetIndex)

  if (suites.length === 0) {
    console.log(chalk.yellow(`No pages or components found in ${targetIndex}`))
    return
  }

  console.log(chalk.cyan(`Running DOMQL behavior validation for ${suites.length} schema entr${suites.length === 1 ? 'y' : 'ies'}.`))

  const failures = []

  for (const suite of suites) {
    const suiteLabel = `${suite.kind}:${suite.name} (${suite.origin})`
    const unresolved = collectUnresolvedRefs(
      suite.schema,
      registryNames,
      pageNames,
      [suite.kind, suite.name]
    )

    if (unresolved.length > 0) {
      for (const finding of unresolved) {
        failures.push({
          suite: suiteLabel,
          message: `Unresolved ${finding.type} reference "${finding.ref}" at ${finding.path}`
        })
      }
      if (options.failFast) break
      continue
    }

    try {
      await DOMQL.create({
        validationProbe: deepCloneValue(suite.schema)
      }, null, 'validationRoot', {
        onlyResolveExtends: true,
        context: {
          key: `smbls.validate.${suite.kind}.${suite.name}`,
          window: globalThis.window,
          document: globalThis.document,
          router: false,
          pages: deepCloneValue(pages),
          components: deepCloneValue(components),
          functions: deepCloneValue(functions),
          methods: deepCloneValue(methods),
          snippets: deepCloneValue(snippets),
          state: deepCloneValue(projectModule.state || {}),
          files: deepCloneValue(projectModule.files || {}),
          designSystem: deepCloneValue(projectModule.designSystem || {}),
          sharedLibraries: deepCloneValue(sharedLibraries)
        }
      })
    } catch (error) {
      failures.push({
        suite: suiteLabel,
        message: summarizeError(error)
      })
      if (options.failFast) break
    }
  }

  if (failures.length > 0) {
    console.error(chalk.red(`\nDOMQL behavior validation failed in ${failures.length} case${failures.length === 1 ? '' : 's'}:`))
    for (const failure of failures) {
      console.error(chalk.yellow(`- ${failure.suite}`))
      console.error(chalk.gray(`  ${failure.message}`))
    }
    process.exit(1)
  }

  console.log(chalk.green(`DOMQL behavior validation passed for ${suites.length} schema entr${suites.length === 1 ? 'y' : 'ies'}.`))
}

function parseArgs (argv) {
  const args = argv.slice(2)
  let target
  let failFast = false

  for (const arg of args) {
    if (arg === '--fail-fast') {
      failFast = true
      continue
    }
    if (!target) {
      target = arg
    }
  }

  return { target, failFast }
}

async function main () {
  const { target, failFast } = parseArgs(process.argv)
  await runValidateDomqlRuntime(target, { failFast })
}

main().catch((error) => {
  console.error(chalk.red(summarizeError(error)))
  process.exit(1)
})
