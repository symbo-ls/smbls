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
    if (el.props && typeof el.props === 'object') {
      for (const k of Object.keys(el.props)) {
        if (k === 'parent' || k === 'root' || k === 'update' || k === 'set' || k === 'reset' || k.startsWith('__')) continue
        if (typeof el.props[k] === 'function') continue
        try {
          info.props[k] = serialize(el.props[k], 0, 3, new WeakSet())
        } catch (e) {
          info.props[k] = { __type: 'error', message: e.message }
        }
      }
    }

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

    // Methods available
    info.methods = METHOD_NAMES.filter(m => typeof el[m] === 'function')

    // State methods
    if (el.state && typeof el.state === 'object') {
      info.stateMethods = STATE_METHOD_NAMES.filter(m => typeof el.state[m] === 'function')
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
    const rect = node.getBoundingClientRect()
    const c = color || 'rgba(66, 133, 244, 0.6)'
    overlay.style.top = rect.top + 'px'
    overlay.style.left = rect.left + 'px'
    overlay.style.width = rect.width + 'px'
    overlay.style.height = rect.height + 'px'
    overlay.style.background = c.replace('0.6', '0.12')
    overlay.style.border = '2px solid ' + c
    overlay.style.display = 'block'
  }

  function hideHighlight () {
    const overlay = document.getElementById('__domql-highlight__')
    if (overlay) overlay.style.display = 'none'
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

    // Navigate to child by key path (e.g., "Header.Nav.Link")
    navigatePath (path) {
      const root = findRoot()
      if (!root) return null
      const parts = path.split('.')
      let current = root
      for (const part of parts) {
        if (!current[part]) return null
        current = current[part]
      }
      return getElementInfo(current)
    },

    // Get element ref by path (returns the actual element, not serialized)
    getElementByPath (path) {
      const root = findRoot()
      if (!root) return null
      const parts = path.split('.')
      let current = root
      for (const part of parts) {
        if (!current[part]) return null
        current = current[part]
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

    // Update prop value
    updateProp (path, key, value) {
      const el = this.getElementByPath(path)
      if (!el) return { error: 'Element not found' }
      try {
        el.update({ [key]: value })
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

    // Read and clear last pick result
    consumePick () {
      const result = this._lastPick
      this._lastPick = null
      return result
    }
  }

  console.log('[Symbols Connect] Page agent loaded')
})()
