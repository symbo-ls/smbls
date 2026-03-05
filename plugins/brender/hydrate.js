/**
 * Client-side hydration — reconnects pre-rendered HTML (with data-br keys)
 * to a live DomQL element tree, attaches events, and fires lifecycle hooks.
 *
 * After hydration the DomQL tree owns every DOM node:
 * - el.node points to the real DOM element
 * - node.ref points back to the DomQL element
 * - CSS classes are generated via emotion and applied
 * - DOM events (click, input, etc.) are bound
 * - on.render / on.renderRouter callbacks fire
 */

/**
 * Collects all elements with data-br attributes from the document.
 * Returns a map of brKey -> DOM node.
 */
export const collectBrNodes = (root) => {
  const container = root || document
  const nodes = container.querySelectorAll('[data-br]')
  const map = {}
  nodes.forEach(node => {
    map[node.getAttribute('data-br')] = node
  })
  return map
}

/**
 * Walks a DomQL element tree that was created with onlyResolveExtends.
 * For each element with a __brKey, attaches the matching real DOM node,
 * renders CSS via emotion, binds DOM events, and fires lifecycle hooks.
 *
 * @param {object} element - Root DomQL element (from create with onlyResolveExtends)
 * @param {object} [options]
 * @param {Element} [options.root] - Root DOM element to scan for data-br nodes
 * @param {boolean} [options.events=true] - Attach DOM events (click, input, etc.)
 * @param {boolean} [options.renderEvents=true] - Fire on.render / on.renderRouter
 * @param {object} [options.emotion] - Emotion instance for CSS class generation
 * @param {object} [options.designSystem] - Design system with color/media/spacing definitions
 * @returns {{ element: object, linked: number, unlinked: number }}
 */
export const hydrate = (element, options = {}) => {
  const {
    root,
    events: attachEvents = true,
    renderEvents: fireRenderEvents = true,
    emotion,
    designSystem
  } = options

  const brNodes = collectBrNodes(root)
  const colorMap = designSystem?.color || {}
  const mediaMap = designSystem?.media || {}
  let linked = 0
  let unlinked = 0

  const walk = (el) => {
    if (!el || !el.__ref) return

    const brKey = el.__ref.__brKey
    if (brKey) {
      const node = brNodes[brKey]
      if (node) {
        el.node = node
        node.ref = el

        if (emotion) {
          renderCSS(el, emotion, colorMap, mediaMap)
        }

        if (attachEvents) {
          bindEvents(el)
        }

        linked++
      } else {
        unlinked++
      }
    }

    if (el.__ref.__children) {
      for (const childKey of el.__ref.__children) {
        const child = el[childKey]
        if (child && child.__ref) walk(child)
      }
    }
  }

  walk(element)

  if (fireRenderEvents) {
    fireLifecycle(element)
  }

  return { element, linked, unlinked }
}

/**
 * Renders CSS for an element: resolves props into a CSS object,
 * resolves design system values (colors, media queries, pseudo-classes),
 * generates emotion class name, and applies it to the DOM node.
 */
const renderCSS = (el, emotion, colorMap, mediaMap) => {
  const { node, props } = el
  if (!node || !props) return

  const css = {}
  let hasCss = false

  for (const key in props) {
    const val = props[key]

    // @media breakpoint objects: @mobile, @tablet, etc.
    if (key.charCodeAt(0) === 64) {
      const breakpoint = mediaMap[key.slice(1)]
      if (breakpoint && typeof val === 'object') {
        const mediaCss = resolvePropsToCSS(val, colorMap)
        if (Object.keys(mediaCss).length) {
          css[breakpoint] = mediaCss
          hasCss = true
        }
      }
      continue
    }

    // :pseudo-class objects: :hover, :focus, :active, etc.
    if (key.charCodeAt(0) === 58) {
      if (typeof val === 'object') {
        const pseudoCss = resolvePropsToCSS(val, colorMap)
        if (Object.keys(pseudoCss).length) {
          css['&' + key] = pseudoCss
          hasCss = true
        }
      }
      continue
    }

    // Resolve DomQL shorthands (flexAlign, round, boxSize, etc.)
    const expanded = resolveShorthand(key, val)
    if (expanded) {
      for (const ek in expanded) {
        css[ek] = resolveValue(ek, expanded[ek], colorMap)
      }
      hasCss = true
      continue
    }

    // Skip non-CSS props
    if (!isCSS(key)) continue

    // Resolve design system color values
    css[key] = resolveValue(key, val, colorMap)
    hasCss = true
  }

  // Handle element.style object
  if (el.style && typeof el.style === 'object') {
    Object.assign(css, el.style)
    hasCss = true
  }

  if (!hasCss) return

  // Generate emotion class
  const emotionClass = emotion.css(css)

  // Build final class string
  const classes = []
  if (emotionClass) classes.push(emotionClass)

  // Preserve key-based classname (keys starting with _ become class names)
  if (typeof el.key === 'string' && el.key.charCodeAt(0) === 95 && el.key.charCodeAt(1) !== 95) {
    classes.push(el.key.slice(1))
  }

  // Preserve explicit class from props/attr
  if (props.class) classes.push(props.class)
  if (el.attr?.class) classes.push(el.attr.class)

  // Handle classlist
  const classlist = el.classlist
  if (classlist) {
    if (typeof classlist === 'string') classes.push(classlist)
    else if (typeof classlist === 'object') {
      for (const k in classlist) {
        const v = classlist[k]
        if (typeof v === 'boolean' && v) classes.push(k)
        else if (typeof v === 'string') classes.push(v)
        else if (typeof v === 'object' && v) classes.push(emotion.css(v))
      }
    }
  }

  if (classes.length) {
    node.setAttribute('class', classes.join(' '))
  }

  // Clean up CSS prop attributes that leaked into HTML
  for (const key in props) {
    if (isCSS(key) && node.hasAttribute(key)) {
      node.removeAttribute(key)
    }
  }
}

const resolvePropsToCSS = (propsObj, colorMap) => {
  const css = {}
  for (const key in propsObj) {
    const expanded = resolveShorthand(key, propsObj[key])
    if (expanded) {
      for (const ek in expanded) css[ek] = resolveValue(ek, expanded[ek], colorMap)
      continue
    }
    if (!isCSS(key)) continue
    css[key] = resolveValue(key, propsObj[key], colorMap)
  }
  return css
}

const COLOR_PROPS = new Set([
  'color', 'background', 'backgroundColor', 'borderColor',
  'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor',
  'outlineColor', 'fill', 'stroke', 'caretColor', 'columnRuleColor',
  'textDecorationColor', 'boxShadow', 'textShadow'
])

const resolveValue = (key, val, colorMap) => {
  if (typeof val !== 'string') return val
  if (COLOR_PROPS.has(key) && colorMap[val]) return colorMap[val]
  return val
}

const NON_CSS_PROPS = new Set([
  'href', 'src', 'alt', 'title', 'id', 'name', 'type', 'value', 'placeholder',
  'target', 'rel', 'loading', 'srcset', 'sizes', 'media', 'role', 'tabindex',
  'for', 'action', 'method', 'enctype', 'autocomplete', 'autofocus',
  'theme', '__element', 'update'
])

// DomQL shorthand props that expand to multiple CSS properties
const resolveShorthand = (key, val) => {
  if (key === 'flexAlign' && typeof val === 'string') {
    const [alignItems, justifyContent] = val.split(' ')
    return { display: 'flex', alignItems, justifyContent }
  }
  if (key === 'gridAlign' && typeof val === 'string') {
    const [alignItems, justifyContent] = val.split(' ')
    return { display: 'grid', alignItems, justifyContent }
  }
  if (key === 'round' && val) {
    return { borderRadius: typeof val === 'number' ? val + 'px' : val }
  }
  if (key === 'boxSize' && val) {
    return { width: val, height: val }
  }
  return null
}

const isCSS = (key) => {
  const ch = key.charCodeAt(0)
  if (ch === 95 || ch === 64 || ch === 58) return false
  if (ch >= 65 && ch <= 90) return false
  if (NON_CSS_PROPS.has(key)) return false
  return CSS_PROPERTIES.has(key)
}

const CSS_PROPERTIES = new Set([
  'display', 'position', 'top', 'right', 'bottom', 'left',
  'width', 'height', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight',
  'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
  'marginBlock', 'marginInline',
  'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
  'paddingBlock', 'paddingInline',
  'border', 'borderTop', 'borderRight', 'borderBottom', 'borderLeft',
  'borderRadius', 'borderColor', 'borderWidth', 'borderStyle',
  'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth',
  'borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle',
  'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor',
  'borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomLeftRadius', 'borderBottomRightRadius',
  'background', 'backgroundColor', 'backgroundImage', 'backgroundSize', 'backgroundPosition',
  'backgroundRepeat', 'backgroundAttachment',
  'color', 'fontSize', 'fontWeight', 'fontFamily', 'fontStyle',
  'lineHeight', 'letterSpacing', 'textAlign', 'textDecoration', 'textTransform',
  'textIndent', 'textOverflow', 'textShadow',
  'opacity', 'overflow', 'overflowX', 'overflowY',
  'zIndex', 'cursor', 'pointerEvents', 'userSelect',
  'flex', 'flexDirection', 'flexWrap', 'flexFlow', 'flexGrow', 'flexShrink', 'flexBasis',
  'alignItems', 'alignContent', 'alignSelf',
  'justifyContent', 'justifyItems', 'justifySelf',
  'gap', 'rowGap', 'columnGap',
  'gridTemplateColumns', 'gridTemplateRows', 'gridColumn', 'gridRow',
  'gridArea', 'gridAutoFlow', 'gridAutoColumns', 'gridAutoRows',
  'transform', 'transformOrigin', 'transition', 'animation', 'animationDelay',
  'boxShadow', 'outline', 'outlineColor', 'outlineWidth', 'outlineStyle', 'outlineOffset',
  'whiteSpace', 'wordBreak', 'wordWrap', 'overflowWrap',
  'visibility', 'boxSizing', 'objectFit', 'objectPosition',
  'filter', 'backdropFilter', 'mixBlendMode',
  'fill', 'stroke', 'strokeWidth',
  'listStyle', 'listStyleType', 'listStylePosition',
  'counterReset', 'counterIncrement', 'content',
  'aspectRatio', 'resize', 'appearance',
  'scrollBehavior', 'scrollMargin', 'scrollPadding',
  'willChange', 'contain', 'isolation',
  'caretColor', 'accentColor',
  'columnCount', 'columnGap', 'columnRuleColor', 'columnRuleStyle', 'columnRuleWidth',
  'textDecorationColor', 'textDecorationStyle', 'textDecorationThickness',
  'clipPath', 'shapeOutside'
])

/**
 * Binds DOM events from element.on and element.props onto the real node.
 */
const DOMQL_LIFECYCLE = new Set([
  'render', 'create', 'init', 'start', 'complete', 'done',
  'beforeClassAssign', 'attachNode', 'stateInit', 'stateCreated',
  'renderRouter', 'lazyLoad', 'error'
])

const bindEvents = (el) => {
  const { node, on, props } = el
  if (!node) return

  const handled = new Set()

  if (on) {
    for (const param in on) {
      if (DOMQL_LIFECYCLE.has(param)) continue
      if (typeof on[param] !== 'function') continue
      handled.add(param)
      addListener(node, param, on[param], el)
    }
  }

  if (props) {
    for (const key in props) {
      if (key.length <= 2 || key[0] !== 'o' || key[1] !== 'n') continue
      if (typeof props[key] !== 'function') continue
      const third = key[2]
      if (third !== third.toUpperCase()) continue
      const eventName = third.toLowerCase() + key.slice(3)
      if (handled.has(eventName) || DOMQL_LIFECYCLE.has(eventName)) continue
      addListener(node, eventName, props[key], el)
    }
  }
}

const addListener = (node, eventName, handler, el) => {
  node.addEventListener(eventName, (event) => {
    const result = handler.call(el, event, el, el.state, el.context)
    if (result && typeof result.then === 'function') {
      result.catch(() => {})
    }
  })
}

/**
 * Walks the tree and fires on.render, on.renderRouter, on.done, on.create
 * lifecycle events — the same ones that fire during normal DomQL create.
 */
const fireLifecycle = (el) => {
  if (!el || !el.__ref || !el.node) return

  const on = el.on
  if (on) {
    fireEvent(on.render, el)
    fireEvent(on.renderRouter, el)
    fireEvent(on.done, el)
    fireEvent(on.create, el)
  }

  if (el.__ref.__children) {
    for (const childKey of el.__ref.__children) {
      const child = el[childKey]
      if (child && child.__ref) fireLifecycle(child)
    }
  }
}

const fireEvent = (fn, el) => {
  if (typeof fn !== 'function') return
  try {
    const result = fn.call(el, el, el.state, el.context)
    if (result && typeof result.then === 'function') {
      result.catch(() => {})
    }
  } catch (e) {
    console.warn('[brender hydrate]', el.key, e.message)
  }
}
