import { generateDiffDisplay } from './diffUtils.js'

export const ALLOWED_FIELDS = [
  'designsystem',
  'functions',
  'files',
  'components',
  'dependencies',
  'pages',
  'snippets',
  'schema'
]

export function normalizeKeys(obj) {
  if (!obj || typeof obj !== 'object') return obj

  if (Array.isArray(obj)) {
    return obj.map(item => normalizeKeys(item))
  }

  return Object.entries(obj).reduce((acc, [key, value]) => {
    const normalizedKey = key.toLowerCase()
    acc[normalizedKey] = value
    return acc
  }, {})
}

export function generateChanges(oldData, newData) {
  const changes = []
  const diffs = []

  if (!oldData || !newData) {
    throw new Error('Both oldData and newData must be provided')
  }

  // Filter out non-allowed top-level fields before comparison
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

  compareObjects(filteredOldData, filteredNewData, [], changes, diffs)

  return { changes, diffs }
}

function isEqual(val1, val2) {
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

function compareObjects(oldObj, newObj, currentPath, changes, diffs) {
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

function handleDeletions(oldObj, newObj, currentPath, changes, diffs) {
  const oldKeys = Object.keys(oldObj)
  const newKeys = Object.keys(newObj)

  for (const key of oldKeys) {
    if (!newKeys.includes(key)) {
      changes.push(['delete', [...currentPath, key]])
      diffs.push(generateDiffDisplay('delete', [...currentPath, key], oldObj[key]))
    }
  }
}

function handleAdditionsAndUpdates(oldObj, newObj, currentPath, changes, diffs) {
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