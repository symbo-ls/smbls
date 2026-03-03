import { generateDiffDisplay } from './diffUtils.js'

export const ALLOWED_FIELDS = [
  'designSystem',
  'functions',
  'files',
  'components',
  'dependencies',
  'pages',
  'snippets'
]

export function generateDefaultSchema(key, type) {
  // Base schema for components and pages
  const baseSchema = {
    key,
    title: toTitleCase(key),
    description: '',
    type: type.slice(0, -1), // Convert plural to singular
    code: '',
    state: {},
    props: {},
    settings: {
      gridOptions: {
        x: 0,
        y: 0,
        w: 1,
        h: 1
      }
    }
  }

  // Type-specific schema generation
  switch (type.toLowerCase()) {
    case 'components':
      return {
        ...baseSchema,
        category: ['comp'],
        draft: false,
        highlighted: false,
        tags: [],
        dataTypes: [],
        interactivity: [],
        error: null,
        thumbnail: null,
        pdf: null,
        uses: {
          components: [],
          icons: [],
          themes: [],
          colors: [],
          dependencies: []
        }
      }

    case 'pages':
      return {
        ...baseSchema,
        key: key.startsWith('/') ? key : `/${key}`,
        type: 'page'
      }

    case 'functions':
    case 'snippets':
    case 'methods':
      return {
        key,
        title: toTitleCase(key),
        description: '',
        type: type.slice(0, -1),
        code: ''
      }

    case 'dependencies':
      return {
        key,
        type: 'dependency'
      }

    case 'secrets':
      return {
        key,
        type: 'secret'
      }

    case 'files':
      return {
        key,
        format: key.split('.').pop() || '',
        type: 'file'
      }

    case 'designsystem':
      // Design system items (colors, typography, etc) don't need schema entries
      return null

    default:
      return baseSchema
  }
}

export function generateChanges (oldData, newData) {
  const changes = []
  const diffs = []

  if (!oldData || !newData) {
    throw new Error('Both oldData and newData must be provided')
  }

  // Filter allowed fields
  const filteredOldData = Object.keys(oldData)
    .filter(key => ALLOWED_FIELDS.includes(key.toLowerCase()))
    .reduce((obj, key) => {
      obj[key] = oldData[key]
      return obj
    }, {})

  const filteredNewData = Object.keys(newData)
    .filter(key => ALLOWED_FIELDS.includes(key.toLowerCase()))
    .reduce((obj, key) => {
      obj[key] = newData[key]
      return obj
    }, {})

  // Compare and generate changes
  for (const type of ALLOWED_FIELDS) {
    const oldSection = filteredOldData[type] || {}
    const newSection = filteredNewData[type] || {}

    // Check for new items
    for (const key of Object.keys(newSection)) {
      if (!oldSection[key]) {
        // New item added - generate schema
        const defaultSchema = generateDefaultSchema(key, type)
        changes.push(
          ['update', [type, key], newSection[key]],
          ['update', ['schema', type, key], defaultSchema]
        )
        diffs.push(generateDiffDisplay('add', [type, key], null, newSection[key]))
      }
    }

    // Handle other changes
    compareObjects(oldSection, newSection, [type], changes, diffs)
  }

  return { changes, diffs }
}

function isEqual (val1, val2) {
  if (val1 === val2) return true
  if (!val1 && !val2) return true
  if (!val1 || !val2) return false

  if (typeof val1 === 'function' || typeof val2 === 'function') {
    const str1 = typeof val1 === 'function' ? val1.toString() : val1
    const str2 = typeof val2 === 'function' ? val2.toString() : val2
    return str1 === str2
  }

  if (Array.isArray(val1) && Array.isArray(val2)) {
    if (val1.length !== val2.length) return false
    return val1.every((item, index) => isEqual(item, val2[index]))
  }

  if (typeof val1 !== 'object' || val1 === null || val2 === null) {
    if (typeof val1 === 'number' && typeof val2 === 'number') {
      return val1.toString() === val2.toString()
    }
    return Object.is(val1, val2)
  }

  const keys1 = Object.keys(val1).sort()
  const keys2 = Object.keys(val2).sort()

  if (keys1.length !== keys2.length) return false
  if (!keys1.every((key, index) => key === keys2[index])) return false

  return keys1.every(key => isEqual(val1[key], val2[key]))
}

function compareObjects (oldObj, newObj, currentPath, changes, diffs) {
  oldObj = oldObj || {}
  newObj = newObj || {}

  if (isEqual(oldObj, newObj)) return

  if (
    typeof oldObj !== 'object' ||
    typeof newObj !== 'object' ||
    oldObj === null ||
    newObj === null
  ) {
    changes.push(['update', currentPath, typeof newObj === 'function' ? newObj.toString() : newObj])
    diffs.push(generateDiffDisplay('update', currentPath, oldObj, newObj))
    return
  }

  handleDeletions(oldObj, newObj, currentPath, changes, diffs)
  handleAdditionsAndUpdates(oldObj, newObj, currentPath, changes, diffs)
}

function handleDeletions (oldObj, newObj, currentPath, changes, diffs) {
  const oldKeys = Object.keys(oldObj)
  const newKeys = Object.keys(newObj)

  for (const key of oldKeys) {
    if (!newKeys.includes(key)) {
      changes.push(['delete', [...currentPath, key]])
      diffs.push(generateDiffDisplay('delete', [...currentPath, key], oldObj[key]))
    }
  }
}

function handleAdditionsAndUpdates (oldObj, newObj, currentPath, changes, diffs) {
  const oldKeys = Object.keys(oldObj)
  const newKeys = Object.keys(newObj)

  for (const key of newKeys) {
    const newValue = newObj[key]
    const oldValue = oldObj[key]

    if (!oldKeys.includes(key)) {
      changes.push(['update', [...currentPath, key], typeof newValue === 'function' ? newValue.toString() : newValue])
      diffs.push(generateDiffDisplay('add', [...currentPath, key], undefined, newValue))
    } else if (!isEqual(oldValue, newValue)) {
      compareObjects(oldValue, newValue, [...currentPath, key], changes, diffs)
    }
  }
}

/**
 * Converts a string to title case format
 * Examples:
 * - "myComponent" -> "My Component"
 * - "my-component" -> "My Component"
 * - "my_component" -> "My Component"
 * - "MyComponent" -> "My Component"
 */
export function toTitleCase(str) {
  if (!str) return ''

  // Handle kebab-case and snake_case
  str = str.replace(/[-_]/g, ' ')

  // Handle camelCase and PascalCase
  str = str.replace(/([a-z])([A-Z])/g, '$1 $2')

  // Capitalize first letter of each word
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
    .trim()
}
