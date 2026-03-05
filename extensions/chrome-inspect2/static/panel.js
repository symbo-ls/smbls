;(function () {
  'use strict'

  // ============================================================
  // State
  // ============================================================
  let selectedPath = null
  let selectedInfo = null
  let treeData = null
  let connectionMode = null // 'local' | 'platform'
  let projectName = ''
  let symbolsConfig = null
  let symbolsDir = 'symbols'
  let symbolsTree = []
  let fileCache = {} // path -> content

  // ============================================================
  // IndexedDB
  // ============================================================
  const DB_NAME = 'symbols-connect'
  const DB_STORE = 'handles'
  const FILES_STORE = 'files'

  function openDB () {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 2)
      req.onupgradeneeded = (e) => {
        const db = e.target.result
        if (!db.objectStoreNames.contains(DB_STORE)) db.createObjectStore(DB_STORE)
        if (!db.objectStoreNames.contains(FILES_STORE)) db.createObjectStore(FILES_STORE)
      }
      req.onsuccess = () => resolve(req.result)
      req.onerror = () => reject(req.error)
    })
  }

  async function getRecentHandles () {
    const db = await openDB()
    const tx = db.transaction(DB_STORE, 'readonly')
    const store = tx.objectStore(DB_STORE)
    return new Promise((resolve, reject) => {
      const req = store.getAll()
      req.onsuccess = () => resolve(req.result.sort((a, b) => b.time - a.time).slice(0, 5))
      req.onerror = () => reject(req.error)
    })
  }

  async function removeHandle (name) {
    const db = await openDB()
    const tx = db.transaction(DB_STORE, 'readwrite')
    tx.objectStore(DB_STORE).delete(name)
  }

  async function getFileCache (name) {
    const db = await openDB()
    const tx = db.transaction(FILES_STORE, 'readonly')
    return new Promise((resolve, reject) => {
      const req = tx.objectStore(FILES_STORE).get(name)
      req.onsuccess = () => resolve(req.result || null)
      req.onerror = () => reject(req.error)
    })
  }

  // ============================================================
  // Eval helper
  // ============================================================
  function pageEval (expr) {
    return new Promise((resolve, reject) => {
      chrome.devtools.inspectedWindow.eval(expr, (result, error) => {
        if (error) reject(error)
        else resolve(result)
      })
    })
  }

  function setStatus (msg) {
    const el = document.getElementById('status')
    if (el) el.textContent = msg
  }

  async function ensureAgent () {
    const ready = await pageEval('typeof window.__DOMQL_INSPECTOR__ !== "undefined"')
    if (!ready) {
      setStatus('Page agent not loaded. Reload the page.')
      return false
    }
    return true
  }

  // ============================================================
  // Connect Screen
  // ============================================================
  async function showConnectScreen () {
    document.getElementById('connect-screen').style.display = 'flex'
    document.getElementById('inspector').style.display = 'none'
    document.getElementById('connect-error').style.display = 'none'
    connectionMode = null
    symbolsConfig = null
    symbolsTree = []
    fileCache = {}

    try {
      const recents = await getRecentHandles()
      const recentSection = document.getElementById('connect-recent')
      const recentList = document.getElementById('recent-list')
      recentList.innerHTML = ''

      if (recents.length > 0) {
        recentSection.style.display = 'block'
        for (const item of recents) {
          const row = document.createElement('div')
          row.className = 'recent-item'

          const name = document.createElement('span')
          name.className = 'recent-name'
          name.textContent = item.name

          const type = document.createElement('span')
          type.className = 'recent-type'
          type.textContent = 'local'

          row.appendChild(name)
          row.appendChild(type)

          row.addEventListener('click', async () => {
            try {
              // Try to load from file cache first
              const cache = await getFileCache(item.name)
              if (cache && cache.tree) {
                connectLocal(item.name, cache)
              } else {
                // No cache — need to re-pick
                chrome.runtime.sendMessage({ type: 'open-picker' })
                setStatus('Re-open the folder in the opened tab...')
              }
            } catch (e) {
              await removeHandle(item.name)
              showConnectScreen()
            }
          })

          recentList.appendChild(row)
        }
      } else {
        recentSection.style.display = 'none'
      }
    } catch (e) {
      // IndexedDB not available
    }
  }

  function connectLocal (name, cache) {
    projectName = cache.config?.key || name
    connectionMode = 'local'
    symbolsConfig = cache.config || {}
    symbolsDir = cache.symbolsDir || 'symbols'
    symbolsTree = cache.tree || []
    fileCache = cache.files || {}

    document.getElementById('connect-screen').style.display = 'none'
    document.getElementById('connect-error').style.display = 'none'
    document.getElementById('inspector').style.display = 'flex'
    document.getElementById('connection-badge').textContent = projectName

    // Show source tab
    document.querySelector('.tab[data-tab="source"]').style.display = ''

    renderSymbolsTree()
    loadTree()
  }

  function connectPlatform () {
    connectionMode = 'platform'
    projectName = 'symbols.app'

    document.getElementById('connect-screen').style.display = 'none'
    document.getElementById('connect-error').style.display = 'none'
    document.getElementById('inspector').style.display = 'flex'
    document.getElementById('connection-badge').textContent = 'symbols.app'

    document.querySelector('.tab[data-tab="source"]').style.display = 'none'
    document.getElementById('symbols-section').style.display = 'none'

    loadTree()
  }

  function disconnect () {
    connectionMode = null
    projectName = ''
    symbolsConfig = null
    symbolsTree = []
    fileCache = {}
    showConnectScreen()
  }

  // ============================================================
  // Symbols Tree (from cached data)
  // ============================================================
  function renderSymbolsTree () {
    const container = document.getElementById('symbols-container')
    container.innerHTML = ''
    document.getElementById('symbols-section').style.display = 'block'

    if (!symbolsTree.length) {
      container.innerHTML = '<div class="empty-message">No files in symbols folder</div>'
      return
    }

    for (const entry of symbolsTree) {
      container.appendChild(renderFileNode(entry, 0))
    }
  }

  function renderFileNode (entry, depth) {
    const container = document.createElement('div')

    const item = document.createElement('div')
    item.className = 'file-item'
    item.style.paddingLeft = (depth * 14 + 8) + 'px'

    const icon = document.createElement('span')
    icon.className = 'file-icon'

    const nameEl = document.createElement('span')
    nameEl.className = 'file-name'
    nameEl.textContent = entry.name

    if (entry.kind === 'dir') {
      icon.textContent = '\u25B6'
      nameEl.classList.add('dir')

      const childContainer = document.createElement('div')
      childContainer.className = 'file-children'

      if (entry.children) {
        for (const child of entry.children) {
          childContainer.appendChild(renderFileNode(child, depth + 1))
        }
      }

      item.addEventListener('click', (e) => {
        e.stopPropagation()
        const expanded = childContainer.classList.toggle('expanded')
        icon.textContent = expanded ? '\u25BC' : '\u25B6'
      })

      item.appendChild(icon)
      item.appendChild(nameEl)
      container.appendChild(item)
      container.appendChild(childContainer)
    } else {
      icon.textContent = '\u2022'
      item.appendChild(icon)
      item.appendChild(nameEl)

      item.addEventListener('click', (e) => {
        e.stopPropagation()
        openFileInSource(entry.path)
      })

      container.appendChild(item)
    }

    return container
  }

  // ============================================================
  // Source tab - read from cache, save via messaging
  // ============================================================
  let currentSourcePath = null

  function openFileInSource (path) {
    currentSourcePath = path

    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'))
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'))
    document.querySelector('.tab[data-tab="source"]').classList.add('active')
    document.getElementById('tab-source').classList.add('active')

    renderSourceTab(path)
  }

  function renderSourceTab (path) {
    const panel = document.getElementById('tab-source')
    panel.innerHTML = ''

    if (!path) {
      panel.innerHTML = '<div class="empty-message">Select a file from the symbols tree</div>'
      return
    }

    const content = fileCache[path]
    if (content === null || content === undefined) {
      panel.innerHTML = '<div class="empty-message">File not available: ' + path + '</div>'
      return
    }

    const pathEl = document.createElement('div')
    pathEl.className = 'source-path'
    pathEl.textContent = path

    const editor = document.createElement('textarea')
    editor.className = 'source-editor'
    editor.value = content
    editor.spellcheck = false

    const lineCount = content.split('\n').length
    editor.style.minHeight = Math.min(Math.max(lineCount * 18, 200), 600) + 'px'

    const actions = document.createElement('div')
    actions.className = 'source-actions'

    const saveBtn = document.createElement('button')
    saveBtn.className = 'source-save-btn'
    saveBtn.textContent = 'Save'

    const status = document.createElement('span')
    status.className = 'source-status'

    saveBtn.addEventListener('click', () => {
      chrome.runtime.sendMessage({
        type: 'write-file',
        project: projectName.includes('.') ? projectName : document.getElementById('connection-badge').textContent,
        symbolsDir: symbolsDir,
        path: path,
        content: editor.value
      }, (response) => {
        if (response && response.success) {
          fileCache[path] = editor.value
          status.textContent = 'Saved'
          status.style.color = 'var(--type-color)'
          setTimeout(() => { status.textContent = '' }, 2000)
        } else {
          status.textContent = 'Error: ' + (response?.error || 'unknown')
          status.style.color = 'var(--error-color)'
        }
      })
    })

    editor.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        saveBtn.click()
      }
      if (e.key === 'Tab') {
        e.preventDefault()
        const start = editor.selectionStart
        const end = editor.selectionEnd
        editor.value = editor.value.substring(0, start) + '  ' + editor.value.substring(end)
        editor.selectionStart = editor.selectionEnd = start + 2
      }
    })

    actions.appendChild(saveBtn)
    actions.appendChild(status)

    panel.appendChild(pathEl)
    panel.appendChild(editor)
    panel.appendChild(actions)
  }

  // ============================================================
  // Source mapping
  // ============================================================
  function findSourceForElement (elementKey) {
    if (!elementKey || !Object.keys(fileCache).length) return null

    // Direct file name match
    for (const path of Object.keys(fileCache)) {
      const filename = path.split('/').pop()
      const basename = filename.replace(/\.(js|jsx|ts|tsx)$/, '')
      const dir = path.split('/').slice(-2, -1)[0]

      if (basename === 'index' && dir === elementKey) return path
      if (basename === elementKey) return path
    }

    // Content search
    for (const [path, content] of Object.entries(fileCache)) {
      if (!content || !/\.(js|jsx|ts|tsx)$/i.test(path)) continue
      if (content.includes('export const ' + elementKey) ||
          new RegExp('\\b' + elementKey + '\\s*[:=]\\s*\\{').test(content)) {
        return path
      }
    }

    return null
  }

  function updateSourceForElement () {
    if (connectionMode !== 'local' || !selectedInfo) return

    const key = selectedInfo.key
    if (!key) return

    const path = findSourceForElement(key)
    if (path) {
      currentSourcePath = path
      const sourceTab = document.querySelector('.tab[data-tab="source"]')
      sourceTab.textContent = 'Source: ' + path.split('/').pop()
    }
  }

  // ============================================================
  // Tree rendering — active DOMQL nodes
  // ============================================================
  function renderTree (node, parentPath, depth) {
    const path = parentPath ? parentPath + '.' + node.key : node.key
    const container = document.createElement('div')

    const item = document.createElement('div')
    item.className = 'tree-item'
    item.style.paddingLeft = (depth * 16 + 4) + 'px'
    item.dataset.path = path

    const arrow = document.createElement('span')
    arrow.className = 'tree-arrow'
    if (node.children && node.children.length > 0) {
      arrow.className += ' has-children'
      arrow.textContent = '\u25B6'
    }

    const label = document.createElement('span')
    label.className = 'tree-label'
    label.textContent = node.key

    const tag = document.createElement('span')
    tag.className = 'tree-tag'
    tag.textContent = node.tag ? '<' + node.tag + '>' : ''

    item.appendChild(arrow)
    item.appendChild(label)
    item.appendChild(tag)
    container.appendChild(item)

    const childContainer = document.createElement('div')
    childContainer.className = 'tree-children'

    if (node.children) {
      for (const child of node.children) {
        childContainer.appendChild(renderTree(child, path, depth + 1))
      }
    }

    container.appendChild(childContainer)

    item.addEventListener('click', (e) => {
      e.stopPropagation()
      selectElement(path)
      highlightElement(path)
      pageEval('(function(){ var el = window.__DOMQL_INSPECTOR__.getElementByPath(' + JSON.stringify(path) + '); if(el && el.node) el.node.scrollIntoView({behavior:"smooth",block:"center"}) })()')
    })

    arrow.addEventListener('click', (e) => {
      e.stopPropagation()
      if (!node.children || node.children.length === 0) return
      const expanded = childContainer.classList.toggle('expanded')
      arrow.textContent = expanded ? '\u25BC' : '\u25B6'
    })

    item.addEventListener('mouseenter', () => highlightElement(path))
    item.addEventListener('mouseleave', () => {
      if (selectedPath === path) return
      if (selectedPath) highlightElement(selectedPath)
      else removeHighlight()
    })

    return container
  }

  async function loadTree () {
    if (!(await ensureAgent())) return

    try {
      treeData = await pageEval('JSON.stringify(window.__DOMQL_INSPECTOR__.getTree(12))')
      if (treeData) {
        treeData = JSON.parse(treeData)
        const container = document.getElementById('tree-container')
        container.innerHTML = ''
        container.appendChild(renderTree(treeData, '', 0))

        const firstChildren = container.querySelector('.tree-children')
        if (firstChildren) {
          firstChildren.classList.add('expanded')
          const firstArrow = container.querySelector('.tree-arrow.has-children')
          if (firstArrow) firstArrow.textContent = '\u25BC'
        }

        setStatus('Tree loaded')
      } else {
        setStatus('No DOMQL root found')
      }
    } catch (e) {
      setStatus('Error: ' + (e.message || e))
    }
  }

  // ============================================================
  // Element selection
  // ============================================================
  async function selectElement (path) {
    selectedPath = path

    document.querySelectorAll('.tree-item.selected').forEach(el => el.classList.remove('selected'))
    const item = document.querySelector(`.tree-item[data-path="${CSS.escape(path)}"]`)
    if (item) item.classList.add('selected')

    try {
      const raw = await pageEval(
        'JSON.stringify(window.__DOMQL_INSPECTOR__.navigatePath(' + JSON.stringify(path) + '))'
      )
      if (raw) {
        selectedInfo = JSON.parse(raw)
        renderDetail()
        updateSourceForElement()
      } else {
        selectedInfo = null
        document.getElementById('detail-key').textContent = 'Element not found'
        document.getElementById('detail-tag').textContent = ''
        document.getElementById('detail-path').textContent = ''
      }
    } catch (e) {
      setStatus('Error inspecting: ' + (e.message || e))
    }
  }

  async function inspectSelected () {
    if (!(await ensureAgent())) return

    try {
      const raw = await pageEval('JSON.stringify(window.__DOMQL_INSPECTOR__.inspectNode($0))')
      if (raw) {
        selectedInfo = JSON.parse(raw)
        selectedPath = selectedInfo._path || selectedInfo.key || '$0'
        renderDetail()
        setStatus('Inspecting: ' + selectedPath)
        expandAndSelectTreePath(selectedPath)
        updateSourceForElement()
      } else {
        setStatus('Selected element has no DOMQL ref')
      }
    } catch (e) {
      setStatus('Error: ' + (e.message || e))
    }
  }

  // ============================================================
  // Element picker
  // ============================================================
  let pickerPolling = null

  async function startPicker () {
    if (!(await ensureAgent())) return

    const btn = document.getElementById('btn-pick')
    btn.classList.add('active')
    setStatus('Click an element on the page...')

    await pageEval('window.__DOMQL_INSPECTOR__._lastPick = null')
    await pageEval('window.__DOMQL_INSPECTOR__.startPicker()')

    if (pickerPolling) clearInterval(pickerPolling)
    pickerPolling = setInterval(async () => {
      try {
        const raw = await pageEval('JSON.stringify(window.__DOMQL_INSPECTOR__.consumePick())')
        if (raw && raw !== 'null') {
          clearInterval(pickerPolling)
          pickerPolling = null
          btn.classList.remove('active')

          const pick = JSON.parse(raw)
          if (pick && pick.info) {
            selectedInfo = pick.info
            selectedPath = pick.path
            renderDetail()
            setStatus('Picked: ' + pick.path)
            expandAndSelectTreePath(pick.path)
            updateSourceForElement()
          }
        }

        const stillActive = await pageEval('window.__DOMQL_INSPECTOR__.isPickerActive()')
        if (!stillActive && pickerPolling) {
          clearInterval(pickerPolling)
          pickerPolling = null
          btn.classList.remove('active')
          setStatus('Picker cancelled')
        }
      } catch (e) { /* ignore */ }
    }, 150)
  }

  function expandAndSelectTreePath (path) {
    if (!path) return
    const parts = path.split('.')
    let currentPath = ''
    for (let i = 0; i < parts.length; i++) {
      currentPath = currentPath ? currentPath + '.' + parts[i] : parts[i]
      const item = document.querySelector(`.tree-item[data-path="${CSS.escape(currentPath)}"]`)
      if (item) {
        const container = item.parentElement
        if (container) {
          const children = container.querySelector('.tree-children')
          if (children && !children.classList.contains('expanded')) {
            children.classList.add('expanded')
            const arrow = item.querySelector('.tree-arrow.has-children')
            if (arrow) arrow.textContent = '\u25BC'
          }
        }
      }
    }

    document.querySelectorAll('.tree-item.selected').forEach(el => el.classList.remove('selected'))
    const finalItem = document.querySelector(`.tree-item[data-path="${CSS.escape(path)}"]`)
    if (finalItem) {
      finalItem.classList.add('selected')
      finalItem.scrollIntoView({ block: 'nearest' })
    }
  }

  // ============================================================
  // Detail rendering
  // ============================================================
  function renderDetail () {
    if (!selectedInfo) return

    document.getElementById('detail-key').textContent = selectedInfo.key || '(unknown)'
    document.getElementById('detail-tag').textContent = selectedInfo.tag ? '<' + selectedInfo.tag + '>' : ''
    document.getElementById('detail-path').textContent = selectedPath || ''

    renderStateTab()
    renderPropsTab()
    renderChildrenTab()
    renderMethodsTab()
    renderRefTab()

    if (connectionMode === 'local' && currentSourcePath &&
        document.querySelector('.tab[data-tab="source"]').classList.contains('active')) {
      renderSourceTab(currentSourcePath)
    }
  }

  function renderValue (val, depth) {
    if (depth === undefined) depth = 0
    if (depth > 5) return createSpan('...', 'v-null')

    if (val === null) return createSpan('null', 'v-null')
    if (val === undefined || (val && val.__type === 'undefined')) return createSpan('undefined', 'v-null')

    if (val && val.__type === 'function') return createSpan('f ' + val.name + '()', 'v-function')
    if (val && val.__type === 'circular') return createSpan('[Circular]', 'v-type')
    if (val && val.__type === 'truncated') return createSpan('[...]', 'v-null')
    if (val && val.__type === 'node') return createSpan('<' + val.tag + (val.key ? ' key="' + val.key + '"' : '') + '>', 'v-type')
    if (val && val.__type === 'error') return createSpan('Error: ' + val.message, 'v-error')

    const type = typeof val
    if (type === 'string') return createSpan('"' + val + '"', 'v-string')
    if (type === 'number') return createSpan(String(val), 'v-number')
    if (type === 'boolean') return createSpan(String(val), 'v-boolean')

    if (Array.isArray(val)) {
      if (val.length === 0) return createSpan('[]', 'v-null')
      return renderNestedObject(val, depth, true)
    }

    if (type === 'object') {
      const keys = Object.keys(val)
      if (keys.length === 0) return createSpan('{}', 'v-null')
      return renderNestedObject(val, depth, false)
    }

    return createSpan(String(val), 'v-null')
  }

  function renderNestedObject (obj, depth, isArray) {
    const container = document.createElement('div')

    const toggle = document.createElement('span')
    toggle.className = 'nested-toggle'
    const keys = Object.keys(obj)
    toggle.textContent = (isArray ? '[' : '{') + keys.length + (isArray ? ' items]' : ' keys}')
    container.appendChild(toggle)

    const inner = document.createElement('div')
    inner.className = 'nested-obj'
    inner.style.display = 'none'

    for (const k of keys) {
      const row = document.createElement('div')
      row.className = 'prop-row'

      const keyEl = document.createElement('span')
      keyEl.className = 'prop-key'
      keyEl.textContent = k

      const valEl = document.createElement('span')
      valEl.className = 'prop-value'
      valEl.appendChild(renderValue(obj[k], depth + 1))

      row.appendChild(keyEl)
      row.appendChild(valEl)
      inner.appendChild(row)
    }

    container.appendChild(inner)

    toggle.addEventListener('click', () => {
      const visible = inner.style.display !== 'none'
      inner.style.display = visible ? 'none' : 'block'
      toggle.textContent = visible
        ? (isArray ? '[' : '{')
        : (isArray ? '[' : '{') + keys.length + (isArray ? ' items]' : ' keys}')
    })

    return container
  }

  function createSpan (text, className) {
    const span = document.createElement('span')
    span.className = className || ''
    span.textContent = text
    return span
  }

  // ============================================================
  // Tabs
  // ============================================================
  function renderStateTab () {
    const panel = document.getElementById('tab-state')
    panel.innerHTML = ''

    if (!selectedInfo.state || Object.keys(selectedInfo.state).length === 0) {
      panel.innerHTML = '<div class="empty-message">No state</div>'
      return
    }

    if (selectedInfo.stateMethods && selectedInfo.stateMethods.length) {
      const header = document.createElement('div')
      header.className = 'section-header'
      header.textContent = 'State Methods'
      panel.appendChild(header)

      for (const method of selectedInfo.stateMethods) {
        panel.appendChild(createMethodRow(method, 'state'))
      }

      const valHeader = document.createElement('div')
      valHeader.className = 'section-header'
      valHeader.textContent = 'State Values'
      panel.appendChild(valHeader)
    }

    for (const [key, val] of Object.entries(selectedInfo.state)) {
      const row = document.createElement('div')
      row.className = 'prop-row'

      const keyEl = document.createElement('span')
      keyEl.className = 'prop-key'
      keyEl.textContent = key

      const valEl = document.createElement('span')
      valEl.className = 'prop-value'

      if (isPrimitive(val)) {
        valEl.classList.add('editable')
        valEl.appendChild(renderValue(val))
        valEl.addEventListener('dblclick', () => startEditing(valEl, key, val, 'state'))
      } else {
        valEl.appendChild(renderValue(val))
      }

      row.appendChild(keyEl)
      row.appendChild(valEl)
      panel.appendChild(row)
    }
  }

  function renderPropsTab () {
    const panel = document.getElementById('tab-props')
    panel.innerHTML = ''

    if (!selectedInfo.props || Object.keys(selectedInfo.props).length === 0) {
      panel.innerHTML = '<div class="empty-message">No props</div>'
      return
    }

    for (const [key, val] of Object.entries(selectedInfo.props)) {
      panel.appendChild(createPropRow(key, val, 'prop'))
    }
  }

  function createPropRow (key, val, type) {
    const row = document.createElement('div')
    row.className = 'prop-row'

    const keyEl = document.createElement('span')
    keyEl.className = 'prop-key'
    keyEl.textContent = key

    const valEl = document.createElement('span')
    valEl.className = 'prop-value'

    if (isPrimitive(val)) {
      valEl.classList.add('editable')
      valEl.appendChild(renderValue(val))
      valEl.addEventListener('dblclick', () => startEditing(valEl, key, val, type))
    } else {
      valEl.appendChild(renderValue(val))
    }

    row.appendChild(keyEl)
    row.appendChild(valEl)
    return row
  }

  function renderChildrenTab () {
    const panel = document.getElementById('tab-children')
    panel.innerHTML = ''

    if (!selectedInfo.children || selectedInfo.children.length === 0) {
      panel.innerHTML = '<div class="empty-message">No children</div>'
      return
    }

    for (const child of selectedInfo.children) {
      const item = document.createElement('div')
      item.className = 'child-item'

      const keyEl = document.createElement('span')
      keyEl.className = 'child-key'
      keyEl.textContent = child.key

      const tagEl = document.createElement('span')
      tagEl.className = 'child-tag'
      tagEl.textContent = child.tag ? '<' + child.tag + '>' : ''

      const arrow = document.createElement('span')
      arrow.className = 'child-arrow'
      arrow.textContent = child.hasChildren ? '\u25B6' : ''

      item.appendChild(keyEl)
      item.appendChild(tagEl)
      item.appendChild(arrow)

      item.addEventListener('click', () => {
        const childPath = selectedPath + '.' + child.key
        selectElement(childPath)
        highlightElement(childPath)

        const treeItem = document.querySelector(`.tree-item[data-path="${CSS.escape(childPath)}"]`)
        if (treeItem) {
          treeItem.click()
          treeItem.scrollIntoView({ block: 'nearest' })
        }
      })

      panel.appendChild(item)
    }
  }

  function renderMethodsTab () {
    const panel = document.getElementById('tab-methods')
    panel.innerHTML = ''

    if (!selectedInfo.methods || selectedInfo.methods.length === 0) {
      panel.innerHTML = '<div class="empty-message">No methods</div>'
      return
    }

    const header = document.createElement('div')
    header.className = 'section-header'
    header.textContent = 'Element Methods'
    panel.appendChild(header)

    for (const method of selectedInfo.methods) {
      panel.appendChild(createMethodRow(method, 'element'))
    }
  }

  function createMethodRow (method, type) {
    const item = document.createElement('div')
    item.className = 'method-item'

    const name = document.createElement('span')
    name.className = 'method-name'
    name.textContent = method + '()'

    const argsInput = document.createElement('input')
    argsInput.className = 'method-args'
    argsInput.placeholder = 'args (JSON)'

    const btn = document.createElement('button')
    btn.className = 'method-btn'
    btn.textContent = 'Run'

    const result = document.createElement('span')
    result.className = 'method-result'

    btn.addEventListener('click', async () => {
      let args = []
      if (argsInput.value.trim()) {
        try {
          args = JSON.parse('[' + argsInput.value + ']')
        } catch (e) {
          result.textContent = 'Invalid JSON args'
          result.style.color = 'var(--error-color)'
          return
        }
      }

      try {
        let expr
        if (type === 'state') {
          expr = 'JSON.stringify(window.__DOMQL_INSPECTOR__.callStateMethod(' +
            JSON.stringify(selectedPath) + ',' +
            JSON.stringify(method) + ',' +
            JSON.stringify(args) + '))'
        } else {
          expr = 'JSON.stringify(window.__DOMQL_INSPECTOR__.callMethod(' +
            JSON.stringify(selectedPath) + ',' +
            JSON.stringify(method) + ',' +
            JSON.stringify(args) + '))'
        }

        const raw = await pageEval(expr)
        const res = JSON.parse(raw)
        if (res.error) {
          result.textContent = 'Error: ' + res.error
          result.style.color = 'var(--error-color)'
        } else {
          result.textContent = res.result !== undefined ? JSON.stringify(res.result).slice(0, 100) : 'OK'
          result.style.color = 'var(--text-dim)'
          setTimeout(() => selectElement(selectedPath), 200)
        }
      } catch (e) {
        result.textContent = 'Error: ' + (e.message || e)
        result.style.color = 'var(--error-color)'
      }
    })

    item.appendChild(name)
    item.appendChild(argsInput)
    item.appendChild(btn)
    item.appendChild(result)
    return item
  }

  function renderRefTab () {
    const panel = document.getElementById('tab-ref')
    panel.innerHTML = ''

    if (!selectedInfo.ref || Object.keys(selectedInfo.ref).length === 0) {
      panel.innerHTML = '<div class="empty-message">No __ref data</div>'
      return
    }

    for (const [key, val] of Object.entries(selectedInfo.ref)) {
      const row = document.createElement('div')
      row.className = 'prop-row'

      const keyEl = document.createElement('span')
      keyEl.className = 'prop-key'
      keyEl.textContent = key

      const valEl = document.createElement('span')
      valEl.className = 'prop-value'
      valEl.appendChild(renderValue(val))

      row.appendChild(keyEl)
      row.appendChild(valEl)
      panel.appendChild(row)
    }
  }

  // ============================================================
  // Editing
  // ============================================================
  function isPrimitive (val) {
    return val === null || typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean'
  }

  function startEditing (el, key, currentValue, type) {
    el.innerHTML = ''
    el.classList.add('editing')

    const input = document.createElement('input')
    input.value = typeof currentValue === 'string' ? currentValue : JSON.stringify(currentValue)
    el.appendChild(input)
    input.focus()
    input.select()

    const commit = async () => {
      el.classList.remove('editing')
      let newValue = input.value

      try {
        newValue = JSON.parse(newValue)
      } catch (e) {
        // Keep as string
      }

      try {
        let expr
        if (type === 'state') {
          expr = 'JSON.stringify(window.__DOMQL_INSPECTOR__.updateState(' +
            JSON.stringify(selectedPath) + ',' +
            JSON.stringify(key) + ',' +
            JSON.stringify(newValue) + '))'
        } else {
          expr = 'JSON.stringify(window.__DOMQL_INSPECTOR__.updateProp(' +
            JSON.stringify(selectedPath) + ',' +
            JSON.stringify(key) + ',' +
            JSON.stringify(newValue) + '))'
        }

        const raw = await pageEval(expr)
        const res = JSON.parse(raw)
        if (res.error) {
          setStatus('Update failed: ' + res.error)
        } else {
          setStatus('Updated ' + key)
        }

        setTimeout(() => selectElement(selectedPath), 100)
      } catch (e) {
        setStatus('Error: ' + (e.message || e))
        el.innerHTML = ''
        el.appendChild(renderValue(currentValue))
      }
    }

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') commit()
      if (e.key === 'Escape') {
        el.classList.remove('editing')
        el.innerHTML = ''
        el.appendChild(renderValue(currentValue))
      }
    })

    input.addEventListener('blur', commit)
  }

  // ============================================================
  // Highlight
  // ============================================================
  function highlightElement (path) {
    pageEval('window.__DOMQL_INSPECTOR__.highlight(' + JSON.stringify(path) + ')')
  }

  function removeHighlight () {
    pageEval('window.__DOMQL_INSPECTOR__.removeHighlight()')
  }

  // ============================================================
  // AI Prompt
  // ============================================================
  async function handleAIPrompt (prompt) {
    const resultEl = document.getElementById('ai-result')
    resultEl.textContent = 'Thinking...'
    resultEl.style.color = 'var(--text-dim)'

    try {
      // Get current context from the page
      const ctxRaw = await pageEval(`JSON.stringify({
        route: window.location.pathname,
        selectedKey: ${JSON.stringify(selectedPath)},
        selectedInfo: ${selectedPath ? 'JSON.stringify(window.__DOMQL_INSPECTOR__.navigatePath(' + JSON.stringify(selectedPath) + '))' : 'null'}
      })`)
      const ctx = JSON.parse(ctxRaw)

      // Check for Chrome built-in AI (LanguageModel API)
      const hasAI = typeof LanguageModel !== 'undefined'
      if (hasAI) {
        const session = await LanguageModel.create({
          initialPrompts: [{
            role: 'system',
            content: 'You are a DOMQL component assistant. You help modify Symbols/DOMQL components. When asked to change something, respond with ONLY a JSON object containing the update. Use the format: {"action":"update","path":"Component.Child","changes":{"key":"value"}}. For state changes use: {"action":"updateState","path":"Component","changes":{"key":"value"}}.'
          }]
        })

        const contextPrompt = `Current element: ${ctx.selectedKey || 'none'}
Element info: ${ctx.selectedInfo || 'none'}
Route: ${ctx.route}

User request: ${prompt}`

        const response = await session.prompt(contextPrompt)

        try {
          const parsed = JSON.parse(response)
          if (parsed.action === 'update' && parsed.path && parsed.changes) {
            const expr = 'JSON.stringify(window.__DOMQL_INSPECTOR__.getElementByPath(' +
              JSON.stringify(parsed.path) + ').update(' + JSON.stringify(parsed.changes) + '))'
            await pageEval(expr)
            resultEl.textContent = 'Applied changes to ' + parsed.path
            resultEl.style.color = 'var(--type-color)'
            setTimeout(() => loadTree(), 300)
            if (selectedPath) setTimeout(() => selectElement(selectedPath), 500)
          } else if (parsed.action === 'updateState' && parsed.path && parsed.changes) {
            for (const [k, v] of Object.entries(parsed.changes)) {
              await pageEval('JSON.stringify(window.__DOMQL_INSPECTOR__.updateState(' +
                JSON.stringify(parsed.path) + ',' + JSON.stringify(k) + ',' + JSON.stringify(v) + '))')
            }
            resultEl.textContent = 'Updated state on ' + parsed.path
            resultEl.style.color = 'var(--type-color)'
            if (selectedPath) setTimeout(() => selectElement(selectedPath), 300)
          } else {
            resultEl.textContent = response
            resultEl.style.color = 'var(--text)'
          }
        } catch (e) {
          // AI returned text, not JSON
          resultEl.textContent = response
          resultEl.style.color = 'var(--text)'
        }

        session.destroy()
      } else {
        resultEl.textContent = 'Chrome AI not available. Enable chrome://flags/#optimization-guide-on-device-model and #prompt-api-for-gemini-nano'
        resultEl.style.color = 'var(--error-color)'
      }
    } catch (e) {
      resultEl.textContent = 'Error: ' + (e.message || e)
      resultEl.style.color = 'var(--error-color)'
    }
  }

  // ============================================================
  // Tabs, Resizer, Init
  // ============================================================
  function initTabs () {
    const tabs = document.querySelectorAll('.tab')
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'))
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'))
        tab.classList.add('active')
        document.getElementById('tab-' + tab.dataset.tab).classList.add('active')

        if (tab.dataset.tab === 'source' && currentSourcePath) {
          renderSourceTab(currentSourcePath)
        }
      })
    })
  }

  function initResizer () {
    const resizer = document.getElementById('resizer')
    const treePane = document.getElementById('tree-pane')
    let startX, startWidth

    resizer.addEventListener('mousedown', (e) => {
      startX = e.clientX
      startWidth = treePane.offsetWidth
      resizer.classList.add('active')

      const onMove = (e) => {
        treePane.style.width = (startWidth + e.clientX - startX) + 'px'
      }

      const onUp = () => {
        resizer.classList.remove('active')
        document.removeEventListener('mousemove', onMove)
        document.removeEventListener('mouseup', onUp)
      }

      document.addEventListener('mousemove', onMove)
      document.addEventListener('mouseup', onUp)
    })
  }

  function initElementsSync () {
    if (chrome.devtools.panels.elements) {
      chrome.devtools.panels.elements.onSelectionChanged.addListener(() => {
        inspectSelected()
      })
    }
  }

  function init () {
    initTabs()
    initResizer()
    initElementsSync()

    // Connect screen buttons
    document.getElementById('btn-connect-local').addEventListener('click', () => {
      chrome.runtime.sendMessage({ type: 'open-picker' })
      setStatus('Select a folder in the opened tab...')
    })

    // Listen for folder-picked from picker tab
    chrome.runtime.onMessage.addListener(async (msg) => {
      if (msg.type === 'folder-picked' && msg.name) {
        try {
          const cache = await getFileCache(msg.name)
          if (cache) {
            connectLocal(msg.name, cache)
          } else {
            setStatus('Cache not ready. Try clicking the project in Recent.')
          }
        } catch (e) {
          setStatus('Error connecting: ' + e.message)
        }
      }
    })

    document.getElementById('btn-connect-platform').addEventListener('click', () => {
      connectPlatform()
    })

    // Inspector toolbar
    document.getElementById('btn-pick').addEventListener('click', startPicker)
    document.getElementById('btn-refresh').addEventListener('click', loadTree)
    document.getElementById('btn-inspect').addEventListener('click', inspectSelected)
    document.getElementById('btn-disconnect').addEventListener('click', disconnect)

    // AI prompt
    const aiInput = document.getElementById('ai-input')
    const aiSend = document.getElementById('ai-send')
    if (aiInput && aiSend) {
      aiSend.addEventListener('click', () => {
        const prompt = aiInput.value.trim()
        if (prompt) handleAIPrompt(prompt)
      })
      aiInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault()
          const prompt = aiInput.value.trim()
          if (prompt) handleAIPrompt(prompt)
        }
      })
    }

    showConnectScreen()
  }

  window.panelShown = function () {
    if (connectionMode) loadTree()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
