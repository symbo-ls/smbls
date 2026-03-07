// Page-agent: runs in page context, provides DOMQL inspection utilities
// Accessed from DevTools panel via chrome.devtools.inspectedWindow.eval()

;(function () {
  'use strict'

  const REGISTRY_KEYS = new Set([
    'attr', 'style', 'text', 'html', 'data', 'classlist', 'state', 'scope',
    'extend', 'extends', 'children', 'childExtend', 'childExtends', 'childExtendRecursive',
    'props', 'if', 'define', '__name', '__ref', '__hash', '__text',
    'key', 'tag', 'query', 'parent', 'node', 'variables', 'on', 'component', 'context',
    'update', 'set', 'reset', 'remove', 'setProps', 'lookup', 'lookdown',
    'lookdownAll', 'nextElement', 'previousElement', 'updateContent', 'removeContent',
    'getRootState', 'getRootData', 'getRoot', 'getContext', 'setNodeStyles',
    'call', 'parse', 'keys', 'verbose', 'getRef', 'getPath'
  ])

  const METHOD_NAMES = [
    'update', 'set', 'reset', 'remove', 'setProps',
    'lookup', 'lookdown', 'lookdownAll',
    'updateContent', 'removeContent',
    'getRootState', 'getRootData', 'getRoot', 'getContext',
    'setNodeStyles', 'call', 'parse', 'keys', 'verbose',
    'nextElement', 'previousElement', 'getRef', 'getPath'
  ]

  const STATE_METHOD_NAMES = [
    'update', 'set', 'reset', 'replace', 'quietUpdate',
    'toggle', 'remove', 'add', 'apply', 'setByPath',
    'parse', 'clean', 'destroy'
  ]

  // Get DOMQL element ref from a DOM node
  function getRef (node) {
    if (!node) return null
    if (node.ref) return node.ref
    // Walk up to find nearest DOMQL element
    let current = node
    while (current) {
      if (current.ref) return current.ref
      current = current.parentElement
    }
    return null
  }

  // Serialize a value safely (handle circular refs, functions, DOM nodes)
  function serialize (val, depth, maxDepth, seen) {
    if (depth > maxDepth) return { __type: 'truncated', value: '...' }
    if (val === null) return null
    if (val === undefined) return { __type: 'undefined' }

    const type = typeof val
    if (type === 'string' || type === 'number' || type === 'boolean') return val
    if (type === 'function') return { __type: 'function', name: val.name || 'anonymous' }
    if (val instanceof HTMLElement) return { __type: 'node', tag: val.tagName.toLowerCase(), key: val.getAttribute('key') }

    if (type === 'object') {
      if (seen.has(val)) return { __type: 'circular' }
      seen.add(val)

      if (Array.isArray(val)) {
        return val.slice(0, 100).map(item => serialize(item, depth + 1, maxDepth, seen))
      }

      const result = {}
      const keys = Object.keys(val)
      for (const k of keys.slice(0, 100)) {
        if (k === 'node' || k === 'parent' || k === 'context' || k === '__element') continue
        try {
          result[k] = serialize(val[k], depth + 1, maxDepth, seen)
        } catch (e) {
          result[k] = { __type: 'error', message: e.message }
        }
      }
      if (keys.length > 100) result.__truncated = keys.length + ' keys total'
      return result
    }

    return String(val)
  }

  // Trace which component each prop comes from
  function getPropsOrigin (el) {
    const origins = {}

    function traceExtend (def, depth) {
      if (!def || typeof def !== 'object' || depth > 10) return
      const name = def.__name || def.key || null

      if (def.props && typeof def.props === 'object') {
        for (const k of Object.keys(def.props)) {
          if (typeof def.props[k] === 'function' || k.startsWith('__')) continue
          if (!origins[k]) origins[k] = name
        }
      }

      // Check text
      if (def.text !== undefined && !origins.text) {
        origins.text = name
      }

      // Recurse into extend chain
      if (def.extend) traceExtend(def.extend, depth + 1)
      if (Array.isArray(def.extends)) {
        for (const ext of def.extends) traceExtend(ext, depth + 1)
      }
    }

    // Walk from the element itself
    if (el.__ref) {
      // The element's own component name
      const selfName = el.__ref.__name || el.component || el.key

      // Check if the element defines its own props
      if (el.__ref.__extend) traceExtend(el.__ref.__extend, 0)
      if (el.__ref.__extends && Array.isArray(el.__ref.__extends)) {
        for (const ext of el.__ref.__extends) traceExtend(ext, 0)
      }

      // Mark direct props (set on this instance) as "self"
      if (el.props && typeof el.props === 'object') {
        for (const k of Object.keys(el.props)) {
          if (typeof el.props[k] === 'function' || k.startsWith('__')) continue
          if (!origins[k]) origins[k] = selfName || 'self'
        }
      }
    }

    return origins
  }

  // Get serialized info about a DOMQL element
  function getElementInfo (el) {
    if (!el) return null

    const info = {
      key: el.key || null,
      tag: el.tag || (el.node && el.node.tagName ? el.node.tagName.toLowerCase() : null),
      path: el.__ref && el.__ref.path ? el.__ref.path : null
    }

    // State
    if (el.state && typeof el.state === 'object') {
      info.state = {}
      for (const k of Object.keys(el.state)) {
        if (STATE_METHOD_NAMES.includes(k) || k.startsWith('__') || k === 'parent' || k === 'root') continue
        try {
          info.state[k] = serialize(el.state[k], 0, 3, new WeakSet())
        } catch (e) {
          info.state[k] = { __type: 'error', message: e.message }
        }
      }
    }

    // Props — collect el.props if it exists as an object
    info.props = {}

    // Include text as a prop shortcut — el.text is a top-level DOMQL property
    // It can be a string, number, or function (getter). Always try to resolve it.
    var textVal = undefined
    if (el.text !== undefined && el.text !== null) {
      if (typeof el.text === 'function') {
        try { textVal = el.text.call(el, el, el.state, el.context) } catch (e) { /* skip */ }
      } else if (typeof el.text !== 'object') {
        textVal = el.text
      }
    }
    if ((textVal === undefined || textVal === null) && el.props && el.props.text != null && typeof el.props.text !== 'function') {
      textVal = el.props.text
    }
    if ((textVal === undefined || textVal === null) && el.node) {
      // Fallback: read direct text nodes from DOM
      var directText = ''
      for (var ci = 0; ci < el.node.childNodes.length; ci++) {
        if (el.node.childNodes[ci].nodeType === 3) directText += el.node.childNodes[ci].textContent
      }
      if (directText.trim()) textVal = directText.trim()
    }
    if (textVal !== undefined && textVal !== null) {
      info.props.text = serialize(textVal, 0, 3, new WeakSet())
    }

    if (el.props && typeof el.props === 'object') {
      for (const k of Object.keys(el.props)) {
        if (k === 'text' || k === 'parent' || k === 'root' || k === 'update' || k === 'set' || k === 'reset' || k.startsWith('__')) continue
        if (typeof el.props[k] === 'function') continue
        try {
          info.props[k] = serialize(el.props[k], 0, 3, new WeakSet())
        } catch (e) {
          info.props[k] = { __type: 'error', message: e.message }
        }
      }
    }

    // Prop origin mapping — trace which component defines each prop
    info.propsOrigin = getPropsOrigin(el)

    // Children (DOMQL child elements)
    info.children = []
    const childKeys = (el.__ref && el.__ref.__children) || []
    for (const ck of childKeys) {
      if (el[ck] && el[ck].node) {
        info.children.push({
          key: ck,
          tag: el[ck].tag || (el[ck].node ? el[ck].node.tagName.toLowerCase() : null),
          hasChildren: !!(el[ck].__ref && el[ck].__ref.__children && el[ck].__ref.__children.length)
        })
      }
    }

    // Also find children by walking own keys for DOMQL elements
    for (const k of Object.keys(el)) {
      if (REGISTRY_KEYS.has(k) || k.startsWith('__') || childKeys.includes(k)) continue
      const val = el[k]
      if (val && typeof val === 'object' && val.node instanceof HTMLElement && val.key) {
        info.children.push({
          key: k,
          tag: val.tag || (val.node ? val.node.tagName.toLowerCase() : null),
          hasChildren: !!(val.__ref && val.__ref.__children && val.__ref.__children.length)
        })
      }
    }

    // Original (definition) props — from __ref before function resolution
    info.originalProps = {}
    info.functionProps = {} // props whose original value is a function

    // Gather original definition values from __ref and extend chain
    function collectOriginal (def, depth) {
      if (!def || typeof def !== 'object' || depth > 10) return
      // Props from definition
      if (def.props && typeof def.props === 'object') {
        for (var pk of Object.keys(def.props)) {
          if (pk.startsWith('__')) continue
          if (!(pk in info.originalProps)) {
            if (typeof def.props[pk] === 'function') {
              info.functionProps[pk] = { name: def.props[pk].name || 'anonymous' }
              // Still store the computed value
              if (el.props && el.props[pk] !== undefined && typeof el.props[pk] !== 'function') {
                info.originalProps[pk] = serialize(el.props[pk], 0, 3, new WeakSet())
              }
            } else {
              info.originalProps[pk] = serialize(def.props[pk], 0, 3, new WeakSet())
            }
          }
        }
      }
      // Text from definition
      if (def.text !== undefined && !('text' in info.originalProps)) {
        if (typeof def.text === 'function') {
          info.functionProps.text = { name: def.text.name || 'anonymous' }
        } else {
          info.originalProps.text = serialize(def.text, 0, 3, new WeakSet())
        }
      }
      // Top-level DOMQL keys that are also "props" in the broad sense
      var domqlKeys = ['tag', 'theme', 'flow', 'wrap', 'display', 'position', 'cursor', 'opacity', 'overflow']
      for (var dk of domqlKeys) {
        if (def[dk] !== undefined && !(dk in info.originalProps)) {
          if (typeof def[dk] === 'function') {
            info.functionProps[dk] = { name: def[dk].name || 'anonymous' }
          } else {
            info.originalProps[dk] = serialize(def[dk], 0, 3, new WeakSet())
          }
        }
      }
      // Walk extends
      if (def.extend) collectOriginal(def.extend, depth + 1)
      if (Array.isArray(def.extends)) {
        for (var ext of def.extends) collectOriginal(ext, depth + 1)
      }
    }

    // Start from the element's own __ref
    if (el.__ref) {
      collectOriginal(el.__ref, 0)
      if (el.__ref.__extend) collectOriginal(el.__ref.__extend, 0)
      if (el.__ref.__extends && Array.isArray(el.__ref.__extends)) {
        for (var re of el.__ref.__extends) collectOriginal(re, 0)
      }
    }

    // Also check top-level element properties for functions
    var topFuncKeys = ['text', 'tag', 'if', 'data']
    for (var tfk of topFuncKeys) {
      if (typeof el[tfk] === 'function' && !(tfk in info.functionProps)) {
        info.functionProps[tfk] = { name: el[tfk].name || 'anonymous' }
      }
    }

    // Methods available
    info.methods = METHOD_NAMES.filter(m => typeof el[m] === 'function')

    // State methods
    if (el.state && typeof el.state === 'object') {
      info.stateMethods = STATE_METHOD_NAMES.filter(m => typeof el.state[m] === 'function')
    }

    // Scope
    if (el.scope && typeof el.scope === 'object') {
      info.scope = {}
      for (const k of Object.keys(el.scope)) {
        if (k === 'parent' || k === 'root' || k.startsWith('__')) continue
        try {
          info.scope[k] = serialize(el.scope[k], 0, 3, new WeakSet())
        } catch (e) {
          info.scope[k] = { __type: 'error', message: e.message }
        }
      }
    }

    // __ref info
    if (el.__ref) {
      info.ref = {}
      for (const k of Object.keys(el.__ref)) {
        if (k === 'root' || k === '__element') continue
        try {
          info.ref[k] = serialize(el.__ref[k], 0, 2, new WeakSet())
        } catch (e) {
          info.ref[k] = { __type: 'error', message: e.message }
        }
      }
    }

    return info
  }

  // Build a tree of DOMQL elements starting from root
  function buildTree (el, depth, maxDepth) {
    if (!el || depth > maxDepth) return null

    const node = {
      key: el.key || '(unknown)',
      tag: el.tag || (el.node && el.node.tagName ? el.node.tagName.toLowerCase() : null),
      children: []
    }

    // Collect children
    const childKeys = (el.__ref && el.__ref.__children) || []
    const seen = new Set(childKeys)

    for (const ck of childKeys) {
      if (ck === '__text' || ck.startsWith('__')) continue
      if (el[ck] && el[ck].node) {
        const child = buildTree(el[ck], depth + 1, maxDepth)
        if (child) node.children.push(child)
      }
    }

    // Also check own keys for child elements not in __children
    for (const k of Object.keys(el)) {
      if (REGISTRY_KEYS.has(k) || k.startsWith('__') || seen.has(k)) continue
      const val = el[k]
      if (val && typeof val === 'object' && val.node instanceof HTMLElement && val.key) {
        seen.add(k)
        const child = buildTree(val, depth + 1, maxDepth)
        if (child) node.children.push(child)
      }
    }

    return node
  }

  // Find the root DOMQL element
  function findRoot () {
    // Check document.body.ref first
    if (document.body && document.body.ref) return document.body.ref
    // Check common root selectors
    const candidates = document.querySelectorAll('[key]')
    for (const node of candidates) {
      if (node.ref) {
        // Walk up to find the topmost ref
        let root = node.ref
        while (root.parent && root.parent.node && root.parent.key) {
          root = root.parent
        }
        return root
      }
    }
    return null
  }

  // Build a key path from a DOMQL element back to the root
  function getPathToRoot (el) {
    const parts = []
    let current = el
    while (current) {
      if (current.key) parts.unshift(current.key)
      if (!current.parent || !current.parent.key) break
      current = current.parent
    }
    return parts.join('.')
  }

  // Highlight overlay management
  let _highlightedNode = null
  let _highlightColor = null
  let _scrollRaf = null

  function _updateOverlayPosition () {
    if (!_highlightedNode) return
    const overlay = document.getElementById('__domql-highlight__')
    if (!overlay || overlay.style.display === 'none') return
    const rect = _highlightedNode.getBoundingClientRect()
    overlay.style.top = rect.top + 'px'
    overlay.style.left = rect.left + 'px'
    overlay.style.width = rect.width + 'px'
    overlay.style.height = rect.height + 'px'
  }

  function _onScroll () {
    if (_scrollRaf) return
    _scrollRaf = requestAnimationFrame(() => {
      _scrollRaf = null
      _updateOverlayPosition()
    })
  }

  function showHighlight (node, color) {
    let overlay = document.getElementById('__domql-highlight__')
    if (!overlay) {
      overlay = document.createElement('div')
      overlay.id = '__domql-highlight__'
      overlay.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 999999;
        transition: top 0.08s, left 0.08s, width 0.08s, height 0.08s;
      `
      document.body.appendChild(overlay)
    }

    _highlightedNode = node
    _highlightColor = color || 'rgba(66, 133, 244, 0.6)'

    const rect = node.getBoundingClientRect()
    overlay.style.top = rect.top + 'px'
    overlay.style.left = rect.left + 'px'
    overlay.style.width = rect.width + 'px'
    overlay.style.height = rect.height + 'px'
    overlay.style.background = _highlightColor.replace('0.6', '0.12')
    overlay.style.border = '2px solid ' + _highlightColor
    overlay.style.display = 'block'

    window.removeEventListener('scroll', _onScroll, true)
    window.addEventListener('scroll', _onScroll, true)
  }

  function hideHighlight () {
    const overlay = document.getElementById('__domql-highlight__')
    if (overlay) overlay.style.display = 'none'
    _highlightedNode = null
    window.removeEventListener('scroll', _onScroll, true)
  }

  // --- Picker mode ---
  let pickerActive = false
  let pickerHoverHandler = null
  let pickerClickHandler = null
  let pickerKeyHandler = null

  function startPicker () {
    if (pickerActive) return
    pickerActive = true

    // Show a tooltip with the DOMQL key
    let tooltip = document.getElementById('__domql-picker-tooltip__')
    if (!tooltip) {
      tooltip = document.createElement('div')
      tooltip.id = '__domql-picker-tooltip__'
      tooltip.style.cssText = `
        position: fixed;
        background: #1e1e1e;
        color: #9cdcfe;
        font-family: 'SF Mono', Menlo, Monaco, monospace;
        font-size: 12px;
        padding: 4px 8px;
        border-radius: 4px;
        border: 1px solid #4285f4;
        pointer-events: none;
        z-index: 1000000;
        display: none;
        white-space: nowrap;
        box-shadow: 0 2px 8px rgba(0,0,0,0.4);
      `
      document.body.appendChild(tooltip)
    }

    document.body.style.cursor = 'crosshair'

    pickerHoverHandler = (e) => {
      const el = getRef(e.target)
      if (el && el.node) {
        showHighlight(el.node, 'rgba(66, 133, 244, 0.6)')
        const path = getPathToRoot(el)
        tooltip.textContent = (el.key || '?') + (el.tag ? ' <' + el.tag + '>' : '') + '  \u2014  ' + path
        tooltip.style.display = 'block'
        // Position tooltip near cursor
        const tx = Math.min(e.clientX + 12, window.innerWidth - tooltip.offsetWidth - 8)
        const ty = Math.min(e.clientY + 16, window.innerHeight - tooltip.offsetHeight - 8)
        tooltip.style.left = tx + 'px'
        tooltip.style.top = ty + 'px'
      } else {
        hideHighlight()
        tooltip.style.display = 'none'
      }
    }

    pickerClickHandler = (e) => {
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()

      const el = getRef(e.target)
      if (el) {
        const path = getPathToRoot(el)
        const info = getElementInfo(el)
        // Store the pick result for the panel to read
        window.__DOMQL_INSPECTOR__._lastPick = { path, info }
      }

      stopPicker()
    }

    pickerKeyHandler = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        stopPicker()
      }
    }

    document.addEventListener('mousemove', pickerHoverHandler, true)
    document.addEventListener('click', pickerClickHandler, true)
    document.addEventListener('keydown', pickerKeyHandler, true)
  }

  function stopPicker () {
    pickerActive = false
    document.body.style.cursor = ''
    hideHighlight()

    const tooltip = document.getElementById('__domql-picker-tooltip__')
    if (tooltip) tooltip.style.display = 'none'

    if (pickerHoverHandler) {
      document.removeEventListener('mousemove', pickerHoverHandler, true)
      pickerHoverHandler = null
    }
    if (pickerClickHandler) {
      document.removeEventListener('click', pickerClickHandler, true)
      pickerClickHandler = null
    }
    if (pickerKeyHandler) {
      document.removeEventListener('keydown', pickerKeyHandler, true)
      pickerKeyHandler = null
    }
  }

  // Expose global API for the DevTools panel
  window.__DOMQL_INSPECTOR__ = {
    getRef,
    getElementInfo,
    buildTree,
    findRoot,
    serialize,
    getPathToRoot,
    METHOD_NAMES,
    STATE_METHOD_NAMES,
    _lastPick: null,

    // Get tree from root
    getTree (maxDepth) {
      const root = findRoot()
      if (!root) return null
      return buildTree(root, 0, maxDepth || 8)
    },

    // Inspect a DOM node and return info + path
    inspectNode (node) {
      const el = getRef(node)
      if (!el) return null
      const info = getElementInfo(el)
      info._path = getPathToRoot(el)
      return info
    },

    // Navigate to child by key path (e.g., "App.Header.Nav.Link")
    // First part is the root element's own key, remaining parts are children
    navigatePath (path) {
      const root = findRoot()
      if (!root) return null
      const parts = path.split('.')
      let current = root
      // If first part matches root's key, skip it (it refers to root itself)
      var start = 0
      if (parts[0] === root.key) start = 1
      for (var i = start; i < parts.length; i++) {
        if (!current[parts[i]]) return null
        current = current[parts[i]]
      }
      return getElementInfo(current)
    },

    // Get element ref by path (returns the actual element, not serialized)
    getElementByPath (path) {
      const root = findRoot()
      if (!root) return null
      const parts = path.split('.')
      let current = root
      var start = 0
      if (parts[0] === root.key) start = 1
      for (var i = start; i < parts.length; i++) {
        if (!current[parts[i]]) return null
        current = current[parts[i]]
      }
      return current
    },

    // Update state value
    updateState (path, key, value) {
      const el = this.getElementByPath(path)
      if (!el || !el.state) return { error: 'Element or state not found' }
      try {
        el.state.update({ [key]: value })
        return { success: true }
      } catch (e) {
        return { error: e.message }
      }
    },

    // Update prop value — uses setProps to update and re-render
    // text is a top-level DOMQL property, not inside props
    updateProp (path, key, value) {
      const el = this.getElementByPath(path)
      if (!el) return { error: 'Element not found' }
      try {
        if (key === 'text') {
          el.update({ text: value })
        } else if (typeof el.setProps === 'function') {
          el.setProps({ [key]: value })
        } else {
          el.update({ props: { [key]: value } })
        }
        return { success: true }
      } catch (e) {
        return { error: e.message }
      }
    },

    // Call a method on element
    callMethod (path, method, args) {
      const el = this.getElementByPath(path)
      if (!el) return { error: 'Element not found' }
      if (typeof el[method] !== 'function') return { error: 'Method not found: ' + method }
      try {
        const result = el[method].apply(el, args || [])
        return { success: true, result: serialize(result, 0, 3, new WeakSet()) }
      } catch (e) {
        return { error: e.message }
      }
    },

    // Call a state method
    callStateMethod (path, method, args) {
      const el = this.getElementByPath(path)
      if (!el || !el.state) return { error: 'Element or state not found' }
      if (typeof el.state[method] !== 'function') return { error: 'State method not found: ' + method }
      try {
        const result = el.state[method].apply(el.state, args || [])
        return { success: true, result: serialize(result, 0, 3, new WeakSet()) }
      } catch (e) {
        return { error: e.message }
      }
    },

    // Highlight element by path
    highlight (path) {
      const el = this.getElementByPath(path)
      if (!el || !el.node) return
      showHighlight(el.node)
    },

    // Remove highlight
    removeHighlight () {
      hideHighlight()
    },

    // Picker mode
    startPicker () {
      startPicker()
    },

    stopPicker () {
      stopPicker()
    },

    isPickerActive () {
      return pickerActive
    },

    // Get design system from any element's context
    getDesignSystem (el) {
      const target = el || findRoot()
      if (!target) return null
      const ds = (target.context && target.context.designSystem) || target.designSystem
      if (!ds || typeof ds !== 'object') return null
      // Custom serializer that handles DS-specific structures
      const seen = new WeakSet()
      function ser (v, d) {
        if (d > 5) return { __type: 'truncated' }
        if (v === null) return null
        if (v === undefined) return { __type: 'undefined' }
        if (typeof v === 'function') return { __type: 'function', name: v.name || '' }
        if (typeof v !== 'object') return v
        if (v instanceof HTMLElement || v instanceof Node) return { __type: 'node' }
        if (seen.has(v)) return { __type: 'circular' }
        seen.add(v)
        if (Array.isArray(v)) return v.slice(0, 50).map(function (x) { return ser(x, d + 1) })
        var o = {}
        var keys = Object.keys(v)
        for (var i = 0; i < keys.length && i < 200; i++) {
          var k = keys[i]
          if (k === 'parent' || k === 'node' || k === '__element' || k === 'context') continue
          try { o[k] = ser(v[k], d + 1) } catch (e) { /* skip */ }
        }
        return o
      }
      return ser(ds, 0)
    },

    // Read and clear last pick result
    consumePick () {
      const result = this._lastPick
      this._lastPick = null
      return result
    }
  }

  console.log('[Symbols Connect] Page agent loaded')
})()
