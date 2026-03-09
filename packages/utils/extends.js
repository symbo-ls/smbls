'use strict'

import { joinArrays, removeDuplicatesInArray } from './array.js'
import { matchesComponentNaming } from './component.js'
import { deepClone, exec } from './object.js'
import { isArray, isObject, isString } from './types.js'
const ENV = process.env.NODE_ENV
const isSourcemapEnabled = (options) => options.sourcemap !== false && ENV !== 'production'

export const createExtendsFromKeys = key => {
  if (key.includes('+')) {
    return key.split('+').filter(matchesComponentNaming)
  }

  if (key.includes('_')) {
    const [first] = key.split('_')
    return [first]
  }

  if (key.includes('.') && !matchesComponentNaming(key.split('.')[1])) {
    const [first] = key.split('.')
    return [first]
  }

  return [key]
}

// Initial extend creation
export const createExtends = (element, parent, key) => {
  let __extends = []
  const keyExtends = createExtendsFromKeys(key)
  if (keyExtends) __extends = [...keyExtends]
  const elementExtends = element.extends
  if (elementExtends) {
    __extends = isArray(elementExtends)
      ? [...__extends, ...elementExtends]
      : [...__extends, elementExtends]
  }
  return __extends
}

export const addExtends = (newExtends, element) => {
  const { __ref: ref } = element
  let { __extends } = ref

  if (!newExtends) return __extends

  // Check if the first extend has a variant in components
  const variant = element.props?.variant
  const context = element.context
  if (
    variant &&
    context?.components &&
    !Array.isArray(newExtends) &&
    typeof newExtends === 'string'
  ) {
    const variantKey = `${newExtends}.${variant}`
    if (context.components[variantKey]) {
      newExtends = variantKey
    }
  }

  if (!__extends.includes(newExtends)) {
    __extends = Array.isArray(newExtends)
      ? [...__extends, ...newExtends]
      : [...__extends, newExtends]
    ref.__extends = __extends
  }
  return __extends
}

export const concatAddExtends = (newExtend, element) => {
  if (!newExtend) return element
  const { extends: elementExtend } = element
  const originalArray = isArray(elementExtend) ? elementExtend : [elementExtend]
  const receivedArray = isArray(newExtend) ? newExtend : [newExtend]
  return {
    ...element,
    extends: joinArrays(receivedArray, originalArray)
  }
}

export const generateHash = () => Math.random().toString(36).substring(2)

// hashing
export const extendStackRegistry = {}
export const extendCachedRegistry = {}

export const getHashedExtend = extend => {
  return extendStackRegistry[extend.__hash]
}

export const setHashedExtend = (extend, stack) => {
  const hash = generateHash()
  if (!isString(extend)) {
    extend.__hash = hash
  }
  if (hash !== '__proto__' && hash !== 'constructor' && hash !== 'prototype') {
    extendStackRegistry[hash] = stack
  }
  return stack
}

export const getExtendsStackRegistry = (extend, stack) => {
  if (extend.__hash) {
    return stack.concat(getHashedExtend(extend))
  }
  return setHashedExtend(extend, stack) // stack .concat(hashedExtend)
}

// stacking
export const extractArrayExtend = (
  extend,
  stack,
  context,
  processed = new Set(),
  nameStack,
  componentNameMap
) => {
  for (const each of extend) {
    if (isArray(each)) {
      extractArrayExtend(each, stack, context, processed, nameStack, componentNameMap)
    } else {
      flattenExtend(each, stack, context, processed, nameStack, undefined, componentNameMap)
    }
  }
  return stack
}

export const deepExtend = (extend, stack, context, processed = new Set(), nameStack, currentName, componentNameMap) => {
  const extendOflattenExtend = extend.extends || extend.extend
  // Remove extends/extend properties before adding to stack
  const cleanExtend = { ...extend }
  delete cleanExtend.extends
  delete cleanExtend.extend
  let hasKeys = false
  for (const _k in cleanExtend) { hasKeys = true; break } // eslint-disable-line
  if (hasKeys) {
    stack.push(cleanExtend)
    if (nameStack) nameStack.push(currentName)
  }
  if (extendOflattenExtend) {
    flattenExtend(extendOflattenExtend, stack, context, processed, nameStack, currentName, componentNameMap)
  }
  return stack
}

export const flattenExtend = (
  extend,
  stack,
  context,
  processed = new Set(),
  nameStack,
  parentName,
  componentNameMap
) => {
  if (!extend) return stack
  if (processed.has(extend)) return stack

  if (isArray(extend)) {
    return extractArrayExtend(extend, stack, context, processed, nameStack, componentNameMap)
  }

  let currentName = parentName
  if (isString(extend)) {
    currentName = extend
    extend = mapStringsWithContextComponents(extend, context)
  } else if (componentNameMap && isObject(extend) && componentNameMap.has(extend)) {
    // Resolve name from pre-built map (top-level resolved extends)
    currentName = componentNameMap.get(extend)
  }

  processed.add(extend)

  if (extend?.extends || extend?.extend) {
    deepExtend(extend, stack, context, processed, nameStack, currentName, componentNameMap)
  } else if (extend) {
    stack.push(extend)
    if (nameStack) nameStack.push(currentName)
  }

  return stack
}

const MERGE_EXTENDS_SKIP = new Set([
  'parent', 'node', '__ref', '__proto__', 'extend', 'childExtend', 'childExtendRecursive'
])

export const deepMergeExtends = (element, extend, sourcemap, sourceName, preBuiltSourcemap) => {
  // Clone extend to prevent mutations
  extend = deepClone(extend)

  for (const e in extend) {
    if (MERGE_EXTENDS_SKIP.has(e)) continue

    const elementProp = element[e]
    const extendProp = extend[e]

    // Skip if the property is undefined in the extend object
    if (extendProp === undefined) continue

    // Handle only properties that exist in the extend object
    if (
      Object.prototype.hasOwnProperty.call(extend, e) &&
      e !== '__proto__' && e !== 'constructor' && e !== 'prototype'
    ) {
      if (elementProp === undefined) {
        // For undefined properties in element, copy from extend
        element[e] = extendProp
        // Track sourcemap for this property
        if (sourcemap && sourceName) {
          if (isObject(extendProp) && !isArray(extendProp)) {
            sourcemap[e] = sourcemap[e] || {}
            trackSourcemapDeep(sourcemap[e], extendProp, sourceName)
          } else {
            sourcemap[e] = sourceName
          }
        } else if (sourcemap && preBuiltSourcemap?.[e]) {
          // Copy sourcemap entry from pre-built sourcemap (used in finalizeExtends)
          sourcemap[e] = preBuiltSourcemap[e]
        }
      } else if (isObject(elementProp) && isObject(extendProp)) {
        // For objects, merge based on type
        const nestedSourcemap = sourcemap ? (sourcemap[e] = sourcemap[e] || {}) : undefined
        const nestedPreBuilt = preBuiltSourcemap?.[e]
        if (matchesComponentNaming(e)) {
          // For components, override base properties with extended ones
          element[e] = deepMergeExtends(elementProp, extendProp, nestedSourcemap, sourceName, nestedPreBuilt)
        } else {
          // For other objects, merge normally
          deepMergeExtends(elementProp, extendProp, nestedSourcemap, sourceName, nestedPreBuilt)
        }
      }

      if (
        e === 'extends' ||
        e === 'childExtends' ||
        e === 'childExtendsRecursive'
      ) {
        if (isArray(elementProp) && isArray(extendProp)) {
          element[e] = elementProp.concat(extendProp)
        } else if (isArray(elementProp) && isObject(extendProp)) {
          const obj = deepMergeExtends({}, elementProp)
          element[e] = deepMergeExtends(obj, extendProp)
        }
      }
      // If elementProp is defined and not an object, keep it (don't override)
      // This preserves properties from earlier in the extend chain
    }
  }

  return element
}

const trackSourcemapDeep = (sourcemap, obj, sourceName) => {
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') continue
    const val = obj[key]
    if (isObject(val) && !isArray(val)) {
      sourcemap[key] = sourcemap[key] || {}
      trackSourcemapDeep(sourcemap[key], val, sourceName)
    } else {
      sourcemap[key] = sourceName
    }
  }
}

export const cloneAndMergeArrayExtend = (stack, sourcemap, extendNames) => {
  return stack.reduce((acc, current, i) => {
    // Clone current extend to avoid mutations
    const cloned = deepClone(current)
    const sourceName = extendNames ? extendNames[i] : undefined
    // Merge into accumulator, giving priority to current extend
    return deepMergeExtends(acc, cloned, sourcemap, sourceName)
  }, {})
}

export const mapStringsWithContextComponents = (
  extend,
  context,
  options = {},
  variant
) => {
  const COMPONENTS = context?.components || options.components
  const PAGES = context?.pages || options.pages
  if (isString(extend)) {
    const componentExists =
      COMPONENTS &&
      (COMPONENTS[extend + '.' + variant] ||
        COMPONENTS[extend] ||
        COMPONENTS['smbls.' + extend])
    const pageExists = PAGES && extend.charCodeAt(0) === 47 && PAGES[extend]
    if (componentExists) return componentExists
    else if (pageExists) return pageExists
    else {
      if (options.verbose && (ENV === 'test' || ENV === 'development')) {
        console.warn('Extend is string but component was not found:', extend)
      }
      return
    }
  }
  return extend
}

// joint stacks
export const jointStacks = (extendStack, childExtendsStack) => {
  return []
    .concat(extendStack.slice(0, 1))
    .concat(childExtendsStack.slice(0, 1))
    .concat(extendStack.slice(1))
    .concat(childExtendsStack.slice(1))
}

// init
export const getExtendsStack = (extend, context, nameStack, componentNameMap) => {
  if (!extend) return []
  if (extend.__hash) return getHashedExtend(extend) || []
  const processed = new Set()
  const stack = flattenExtend(extend, [], context, processed, nameStack, undefined, componentNameMap)
  if (nameStack) return stack
  return getExtendsStackRegistry(extend, stack)
}

export const addExtend = (newExtends, elementExtends) => {
  if (!newExtends) return elementExtends
  const receivedArray = isArray(newExtends) ? newExtends : [newExtends]
  return joinArrays(receivedArray, elementExtends)
}

export const getExtendsInElement = obj => {
  let result = []

  function traverse (o) {
    for (const key in o) {
      if (Object.prototype.hasOwnProperty.call(o, key)) {
        // Check if the key starts with a capital letter and exclude keys like @mobileL, $propsCollection
        if (matchesComponentNaming(key)) {
          result.push(key)
        }

        // Check if the key is "extend" and it's either a string or an array
        if (key === 'extends') {
          // Add the value of the extend key to the result array
          if (typeof o[key] === 'string') {
            result.push(o[key])
          } else if (Array.isArray(o[key])) {
            result = result.concat(o[key])
          }
        }

        // If the property is an object, traverse it
        if (typeof o[key] === 'object' && o[key] !== null) {
          traverse(o[key])
        }
      }
    }
  }

  traverse(obj)
  return result
}

export const createElementExtends = (element, parent, options = {}) => {
  const { __ref: ref } = element
  const context = element.context || parent.context
  const variant = element.props?.variant

  // Add the extends property from element if it exists (supports v2 `extend` fallback)
  if (element.extend && !element.extends) element.extends = element.extend
  delete element.extend
  if (!element.extends && element.props?.extends) element.extends = element.props.extends
  if (element.extends) {
    if (Array.isArray(element.extends) && element.extends.length > 0) {
      // Handle first item in array specially for variant
      const [firstExtend, ...restExtends] = element.extends
      if (typeof firstExtend === 'string' && variant && context?.components) {
        const variantKey = `${firstExtend}.${variant}`
        if (context.components[variantKey]) {
          addExtends([variantKey, ...restExtends], element)
        } else {
          addExtends(element.extends, element)
        }
      } else {
        addExtends(element.extends, element)
      }
    } else if (
      typeof element.extends === 'string' &&
      variant &&
      context?.components
    ) {
      const variantKey = `${element.extends}.${variant}`
      if (context.components[variantKey]) {
        addExtends(variantKey, element)
      } else {
        addExtends(element.extends, element)
      }
    } else {
      addExtends(element.extends, element)
    }
  }

  inheritChildPropsExtends(element, parent, options)
  inheritChildExtends(element, parent, options)
  inheritRecursiveChildExtends(element, parent, options)

  if (element.component) {
    addExtends(exec(element.component, element), element)
  }

  if (context.defaultExtends) {
    addExtends(context.defaultExtends, element)
  }

  return removeDuplicatesInArray(ref.__extends)
}

export const inheritChildPropsExtends = (element, parent, options = {}) => {
  const { props, __ref: ref } = element
  const ignoreChildExtends =
    options.ignoreChildExtends || props?.ignoreChildExtends
  if (!ignoreChildExtends) {
    if (parent.props?.childProps?.extends) {
      addExtends(parent.props?.childProps.extends, element)
    }
  }
  return ref.__extends
}

export const inheritChildExtends = (element, parent, options = {}) => {
  const { props, __ref: ref } = element
  const ignoreChildExtends =
    options.ignoreChildExtends || props?.ignoreChildExtends

  // Supports v2 `childExtend` fallback
  const childExtends = parent.childExtends || parent.childExtend
  if (!ignoreChildExtends && childExtends) {
    addExtends(childExtends, element)
  }
  return ref.__extends
}

export const inheritRecursiveChildExtends = (element, parent, options = {}) => {
  const { props, __ref: ref } = element
  // Supports v2 `childExtendRecursive` fallback
  const childExtendsRecursive = parent.childExtendsRecursive || parent.childExtendRecursive
  const ignoreChildExtendsRecursive =
    options.ignoreChildExtendsRecursive || props?.ignoreChildExtendsRecursive
  const isText = element.key === '__text'
  if (childExtendsRecursive && !isText && !ignoreChildExtendsRecursive) {
    addExtends(childExtendsRecursive, element)
  }
  return ref.__extends
}

export const createExtendsStack = (element, parent, options = {}) => {
  const { props, __ref: ref } = element
  const context = element.context || parent.context

  const variant = element.variant || props?.variant

  // Keep original string names before resolution for sourcemap tracking
  const sourcemap = isSourcemapEnabled(options)
  const originalExtendNames = sourcemap ? [...ref.__extends] : null

  const __extends = removeDuplicatesInArray(
    ref.__extends.map((val, i) => {
      return mapStringsWithContextComponents(
        val,
        context,
        options,
        i === 0 && variant
      )
    })
  )

  if (sourcemap) {
    // Build a map from resolved component objects to their original string names
    const componentNameMap = new WeakMap()
    for (let i = 0; i < __extends.length; i++) {
      const resolved = __extends[i]
      const originalName = originalExtendNames[i]
      if (resolved && isObject(resolved) && isString(originalName)) {
        componentNameMap.set(resolved, originalName)
      }
    }
    const nameStack = []
    const stack = getExtendsStack(__extends, context, nameStack, componentNameMap)
    ref.__extendsStack = stack
    ref.__extendsNames = nameStack
  } else {
    const stack = getExtendsStack(__extends, context)
    ref.__extendsStack = stack
  }

  return ref.__extendsStack
}

export const finalizeExtends = (element, parent, options = {}) => {
  const { __ref: ref } = element
  const { __extendsStack } = ref

  if (isSourcemapEnabled(options)) {
    const sourcemapAcc = {}
    const extendNames = ref.__extendsNames || []
    const flattenExtends = cloneAndMergeArrayExtend(__extendsStack, sourcemapAcc, extendNames)
    // Only keep sourcemap entries for properties actually merged into element
    const appliedSourcemap = {}
    deepMergeExtends(element, flattenExtends, appliedSourcemap, undefined, sourcemapAcc)
    ref.__sourcemap = appliedSourcemap
  } else {
    const flattenExtends = cloneAndMergeArrayExtend(__extendsStack)
    deepMergeExtends(element, flattenExtends)
  }

  return element
}

export const applyExtends = (element, parent, options = {}) => {
  createElementExtends(element, parent, options)
  createExtendsStack(element, parent, options)
  finalizeExtends(element, parent, options)
  return element
}
