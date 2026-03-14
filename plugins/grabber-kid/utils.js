/**  Helper function to check if all values in an array are equal
 * @param {Array} arr
 * @returns {boolean}
 */
export const allEqual = (arr) => arr.every((v) => v === arr[0])

// Capitalize function for the border properties
export const capitalize = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1)

// Convert kebab-case to camelCase
export const toCamelCase = (str) =>
  str.replace(/[_\- ]+(?<first>[a-z])/giu, (_, char, offSet) =>
    offSet > 0 ? char.toUpperCase() : char
  )

/**
 * Convert all keys in a style object to camelCase, separating out CSS variables
 * @param {Record<string, string>} styles
 * @returns {Record<string, string>}
 */
export function extractCssVars(styles) {
  const cssVariables = {}

  for (const key in styles) {
    if (Object.hasOwn(styles, key) && key.includes('--')) {
      cssVariables[key] = styles[key]
    }
  }

  return cssVariables
}

/**
 * Convert all keys in a style object to camelCase except CSS variables
 * @param {Record<string, string>} styles
 * @returns {Record<string, string>}
 */
export function convertKeysToCamelCase(styles) {
  const camelCased = {}

  for (const key in styles) {
    if (Object.hasOwn(styles, key) && !key.includes('--')) {
      camelCased[toCamelCase(key)] = styles[key]
    }
  }

  return camelCased
}

function findVarPattern(input) {
  // Regex to capture variable names with letters, numbers, and hyphens
  const regex = /var\(--(?<varName>[a-zA-Z0-9-]+)(?:,\s*[a-zA-Z0-9%-]+)?\)/gu
  const matches = []
  let match = regex.exec(input)

  // Find all matches in the input string
  while (match !== null) {
    const varName = `--${match.groups.varName}`
    matches.push(varName)

    match = regex.exec(input)
  }

  // Remove duplicates and return the result
  return [...new Set(matches)]
}

/**
 * @param {Record<string, string>} css
 * @param {CSSStyleDeclaration} globalStyles
 * @returns {Record<string, string>} extracted root variables
 */
export const extractRootVars = (css, globalStyles) => {
  const variables = extractCssVars(css)
  let rootVars = Object.values(css).reduce((acc, value) => {
    const vars = {}

    if (value.includes('var(')) {
      const varNames = findVarPattern(value)
      varNames.forEach((v) => {
        let val = variables[v]
        if (val || val === '') {
          vars[v] = val || ' '
        } else {
          val = globalStyles.getPropertyValue(v)
          if (val || val === '') {
            vars[v] = val || ' '
          }
        }
      })
    }

    return { ...acc, ...vars }
  }, {})

  // Check for nested root variables
  if (Object.keys(rootVars).length) {
    let checkingNested = true
    let nested = {}
    while (checkingNested) {
      const parsed = Object.values({
        ...rootVars,
        ...variables,
        ...nested
      }).reduce(
        /*  eslint-disable-next-line no-loop-func -- checking the contents of rootVars and nested is safe */
        (acc, value) => {
          const vars = {}
          if (value.includes('var(')) {
            const varNames = findVarPattern(value)
            varNames.forEach((v) => {
              if (v in rootVars || v in nested) {
                return // Skip if already in rootVars or nested to prevent infinite loop
              }
              let val = variables[v]
              if (val || val === '') {
                vars[v] = val || ' '
              } else {
                val = globalStyles.getPropertyValue(v)
                if (val || val === '') {
                  vars[v] = val || ' '
                }
              }
            })
          }

          return { ...acc, ...vars }
        },
        {}
      )

      // If no new variables found stop checking, otherwise merge them into nested
      if (Object.keys(parsed).length) {
        nested = { ...nested, ...parsed }
      } else {
        checkingNested = false
      }
    }

    rootVars = { ...rootVars, ...nested }
  }

  return rootVars
}

// Helper function to deep compare objects, with support for circular references
function isEqual(objA, objB, visited = new WeakSet()) {
  if (objA === objB) {
    return true
  } // Check for reference equality
  if (objA == null || objB == null) {
    return false
  } // Handle null or undefined

  if (typeof objA !== 'object' || typeof objB !== 'object') {
    return false // Both must be objects
  }

  // Handle circular references
  if (visited.has(objA) || visited.has(objB)) {
    return false
  }
  visited.add(objA)
  visited.add(objB)

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) {
    return false
  } // Different number of keys

  for (const key of keysA) {
    if (!keysB.includes(key) || !isEqual(objA[key], objB[key], visited)) {
      return false // Keys don't match or values are different
    }
  }

  return true // Objects are equal
}

// Function to find shared properties
export function cleanSharedProperties(children) {
  // Extract props from children
  const props = children.map((child) => child.props)
  const shared = {}

  // Get keys from the first style object
  const keys = Object.keys(props[0])

  for (const key of keys) {
    // Check if all style objects have the same value for this key
    const values = props.map((style) => style[key])

    if (values.every((value) => isEqual(value, values[0]))) {
      const [val] = values
      shared[key] = val // Add to shared properties
    }
  }

  return shared // Return the shared properties object
}

/**
 *  Converts an array of children objects into a single object with unique keys.
 * @param {Array<any>} children
 * @returns {Record<string, any>} reformatted children object
 */
export function reformatChildren(children) {
  const childrenObj = {}

  const keyCounts = {}

  children.forEach((child) => {
    let key = child.extend ?? 'Child' // Default key if `extend` is missing

    // Check for multiple `extends` in the array
    if (Array.isArray(key)) {
      key = child.extend.shift()
      if (!child.extend.length) {
        delete child.extend
      }
    }

    // Increment the key count to handle duplicates
    if (!(key in keyCounts)) {
      keyCounts[key] = 0
    }
    keyCounts[key]++

    const newKey = keyCounts[key] > 1 ? `${key}_${keyCounts[key]}` : key

    childrenObj[newKey] = { ...child }
  })

  return childrenObj
}
