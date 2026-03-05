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
  let pendingChanges = {} // path -> { [propKey]: { oldVal, newVal, componentName } }
  let pendingSyncOps = [] // ops to sync: { elementPath, key, value, componentName }
  let platformSocket = null
  let folderName = '' // actual folder name used as IndexedDB key
  let changeHistory = [] // undo stack: { elementPath, key, oldValue, newValue, type }
  let redoStack = []
  let platformProjectData = null // project data from platform API
  let platformProjectId = null

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
  // Project / URL matching
  // ============================================================
  function isProjectMatch (projectKey, pageHost) {
    if (!projectKey || !pageHost) return false
    if (pageHost === projectKey) return true
    if (pageHost.includes(projectKey.replace(/\./g, ''))) return true
    if (projectKey.includes(pageHost.split('.')[0])) return true
    return false
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
    platformProjectData = null
    platformProjectId = null

    // Check auth state
    await updateAuthUI()

    try {
      const recents = await getRecentHandles()
      const recentSection = document.getElementById('connect-recent')
      const recentList = document.getElementById('recent-list')
      recentList.innerHTML = ''

      // Get inspected page hostname for matching
      let pageHost = null
      try {
        pageHost = await pageEval('window.location.hostname')
      } catch (e) {}

      if (recents.length > 0) {
        recentSection.style.display = 'block'

        // Load caches to get project keys for matching
        const recentsWithCache = await Promise.all(recents.map(async (item) => {
          let cache = null
          try { cache = await getFileCache(item.name) } catch (e) {}
          return { ...item, cache }
        }))

        // Sort: matching projects first
        recentsWithCache.sort((a, b) => {
          const aMatch = isProjectMatch(a.cache?.config?.key, pageHost) ? 1 : 0
          const bMatch = isProjectMatch(b.cache?.config?.key, pageHost) ? 1 : 0
          return bMatch - aMatch
        })

        for (const item of recentsWithCache) {
          const row = document.createElement('div')
          row.className = 'recent-item'

          const projectKey = item.cache?.config?.key || ''
          const match = pageHost && projectKey && isProjectMatch(projectKey, pageHost)
          if (match) row.classList.add('matching')

          const name = document.createElement('span')
          name.className = 'recent-name'
          name.textContent = item.name

          const type = document.createElement('span')
          type.className = 'recent-type'
          type.textContent = projectKey || 'local'

          row.appendChild(name)
          row.appendChild(type)

          if (match) {
            const badge = document.createElement('span')
            badge.className = 'project-match-badge'
            badge.textContent = 'match'
            row.appendChild(badge)
          }

          row.addEventListener('click', async () => {
            try {
              const cache = item.cache
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

  // ============================================================
  // Auth UI
  // ============================================================
  async function updateAuthUI () {
    const signedOutEl = document.getElementById('auth-signed-out')
    const signedInEl = document.getElementById('auth-signed-in')
    const platformBtn = document.getElementById('btn-connect-platform')
    const projectsSection = document.getElementById('platform-projects')

    if (!window.SymbolsAuth) return

    try {
      const auth = await window.SymbolsAuth.getStoredAuth()
      if (auth.accessToken) {
        // Verify token is still valid
        let user = auth.user
        try {
          user = await window.SymbolsAuth.getMe()
          // Update stored user
        } catch (e) {
          // Token expired, show sign-out state
          await window.SymbolsAuth.logout()
          signedOutEl.style.display = ''
          signedInEl.style.display = 'none'
          platformBtn.style.display = 'none'
          if (projectsSection) projectsSection.style.display = 'none'
          return
        }

        // Signed in
        signedOutEl.style.display = 'none'
        signedInEl.style.display = ''
        document.getElementById('auth-user-name').textContent = user.email || user.name || 'Signed in'
        platformBtn.style.display = ''

        // Load and show projects
        await loadPlatformProjects()
      } else {
        signedOutEl.style.display = ''
        signedInEl.style.display = 'none'
        platformBtn.style.display = 'none'
        if (projectsSection) projectsSection.style.display = 'none'
      }
    } catch (e) {
      // Auth check failed — show sign-in
      signedOutEl.style.display = ''
      signedInEl.style.display = 'none'
      platformBtn.style.display = 'none'
    }
  }

  async function handleSignIn () {
    const email = document.getElementById('auth-email').value.trim()
    const password = document.getElementById('auth-password').value
    const errorEl = document.getElementById('auth-error')
    const btn = document.getElementById('btn-sign-in')

    if (!email || !password) {
      errorEl.textContent = 'Enter email and password'
      errorEl.style.display = ''
      return
    }

    btn.disabled = true
    errorEl.style.display = 'none'

    try {
      await window.SymbolsAuth.login(email, password)
      await updateAuthUI()
    } catch (e) {
      errorEl.textContent = e.message || 'Sign in failed'
      errorEl.style.display = ''
    } finally {
      btn.disabled = false
    }
  }

  async function handleBrowserSignIn () {
    const btn = document.getElementById('btn-sign-in-browser')
    const statusEl = document.getElementById('auth-status')
    const errorEl = document.getElementById('auth-error')

    btn.disabled = true
    errorEl.style.display = 'none'
    statusEl.style.display = ''
    statusEl.className = 'auth-status waiting'
    statusEl.textContent = 'Opening symbols.app...'

    try {
      await window.SymbolsAuth.loginViaBrowser((msg) => {
        statusEl.textContent = msg
      })
      statusEl.style.display = 'none'
      await updateAuthUI()
    } catch (e) {
      statusEl.style.display = 'none'
      errorEl.textContent = e.message || 'Browser sign-in failed'
      errorEl.style.display = ''
    } finally {
      btn.disabled = false
    }
  }

  async function handleSignOut () {
    try {
      await window.SymbolsAuth.logout()
    } catch (e) { /* ignore */ }
    await updateAuthUI()
  }

  async function loadPlatformProjects () {
    const projectsSection = document.getElementById('platform-projects')
    const projectList = document.getElementById('project-list')
    if (!projectsSection || !projectList) return

    try {
      const projects = await window.SymbolsAuth.listProjects()
      if (!projects || !projects.length) {
        projectsSection.style.display = 'none'
        return
      }

      projectList.innerHTML = ''
      projectsSection.style.display = ''

      // Get the current page hostname to match against project keys
      let pageHost = null
      try {
        pageHost = await pageEval('window.location.hostname')
      } catch (e) {}

      for (const project of projects) {
        const item = document.createElement('div')
        item.className = 'project-item'

        const projectKey = project.key || ''
        const isMatch = isProjectMatch(projectKey, pageHost)

        if (isMatch) item.classList.add('matching')

        const nameEl = document.createElement('span')
        nameEl.className = 'project-name'
        nameEl.textContent = project.name || project.key

        const keyEl = document.createElement('span')
        keyEl.className = 'project-key'
        keyEl.textContent = projectKey

        item.appendChild(nameEl)
        item.appendChild(keyEl)

        if (isMatch) {
          const badge = document.createElement('span')
          badge.className = 'project-match-badge'
          badge.textContent = 'match'
          item.appendChild(badge)
        }

        item.addEventListener('click', () => connectPlatform(project))
        projectList.appendChild(item)
      }
    } catch (e) {
      projectsSection.style.display = 'none'
    }
  }

  function connectLocal (name, cache) {
    folderName = name // keep the actual folder name for IndexedDB lookups
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

    // Show AI bar if signed in
    if (window.SymbolsAuth) {
      window.SymbolsAuth.getStoredAuth().then(a => {
        if (a.accessToken) {
          const aiBar = document.getElementById('ai-bar')
          if (aiBar) aiBar.style.display = ''
        }
      })
    }

    renderSymbolsTree()
    loadTree()
  }

  async function connectPlatform (project) {
    connectionMode = 'platform'

    if (project) {
      projectName = project.key || project.name || 'symbols.app'
      platformProjectId = project._id || project.id || null
    } else {
      projectName = 'symbols.app'
      platformProjectId = null
    }

    document.getElementById('connect-screen').style.display = 'none'
    document.getElementById('connect-error').style.display = 'none'
    document.getElementById('inspector').style.display = 'flex'
    document.getElementById('connection-badge').textContent = projectName

    // Hide source tab, show data tab for platform mode
    document.querySelector('.tab[data-tab="source"]').style.display = 'none'
    document.getElementById('symbols-section').style.display = 'none'

    // Show AI bar for authenticated users
    const aiBar = document.getElementById('ai-bar')
    if (aiBar) aiBar.style.display = ''

    // Load project data if we have a project ID
    if (platformProjectId) {
      try {
        platformProjectData = await window.SymbolsAuth.getProjectData(platformProjectId, 'main')
        setStatus('Platform data loaded')
      } catch (e) {
        setStatus('Could not load project data: ' + (e.message || e))
      }
    }

    loadTree()
  }

  function disconnect () {
    connectionMode = null
    projectName = ''
    symbolsConfig = null
    symbolsTree = []
    fileCache = {}
    platformProjectData = null
    platformProjectId = null
    if (platformSocket) {
      try { platformSocket.disconnect() } catch (e) {}
      platformSocket = null
    }
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

      // Derive component key from filename (Button.js -> Button, index.js in Button/ -> Button)
      const basename = entry.name.replace(/\.(js|jsx|ts|tsx|json|css|html)$/i, '')
      const dirName = entry.path.split('/').slice(-2, -1)[0]
      const componentKey = basename === 'index' ? dirName : basename

      item.addEventListener('click', (e) => {
        e.stopPropagation()
        openFileInSource(entry.path)

        // Try to select the matching active node
        if (componentKey) {
          const matchingItem = findTreeItemByKey(componentKey)
          if (matchingItem) {
            selectElement(matchingItem)
            highlightElement(matchingItem)
            pageEval('(function(){ var el = window.__DOMQL_INSPECTOR__.getElementByPath(' + JSON.stringify(matchingItem) + '); if(el && el.node) el.node.scrollIntoView({behavior:"smooth",block:"center"}) })()')
          }
        }
      })

      item.addEventListener('mouseenter', () => {
        if (componentKey) {
          const matchingItem = findTreeItemByKey(componentKey)
          if (matchingItem) highlightElement(matchingItem)
        }
      })

      item.addEventListener('mouseleave', () => {
        if (selectedPath) highlightElement(selectedPath)
        else removeHighlight()
      })

      container.appendChild(item)
    }

    return container
  }

  // ============================================================
  // Find a tree item path by component key name
  // ============================================================
  function findTreeItemByKey (key) {
    // Search the active tree for a node matching the key
    const items = document.querySelectorAll('#tree-container .tree-item')
    for (const item of items) {
      const path = item.dataset.path
      if (!path) continue
      const lastPart = path.split('.').pop()
      if (lastPart === key) return path
    }
    return null
  }

  // ============================================================
  // Source tab — property source viewer
  // ============================================================
  let currentSourcePath = null

  function openFileInSource (path) {
    currentSourcePath = path
    showPropertySource(path)
  }

  // Show source file in the Source tab, optionally highlighting a component/property
  function showPropertySource (path, componentName, propKey) {
    currentSourcePath = path

    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'))
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'))
    document.querySelector('.tab[data-tab="source"]').classList.add('active')
    document.getElementById('tab-source').classList.add('active')

    renderSourceTab(path, componentName, propKey)
  }

  // ============================================================
  // Syntax highlighting (JS/CSS tokens)
  // ============================================================
  function highlightSyntax (text) {
    // Escape HTML first
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    // Strings (single, double, template)
    html = html.replace(/(&#39;(?:[^&#39;\\]|\\.)*&#39;|&quot;(?:[^&quot;\\]|\\.)*&quot;|`(?:[^`\\]|\\.)*`)/g,
      '<span class="sh-string">$1</span>')
    // Fallback for actual quote chars
    html = html.replace(/('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)/g,
      '<span class="sh-string">$1</span>')

    // Comments
    html = html.replace(/(\/\/.*$)/gm, '<span class="sh-comment">$1</span>')

    // Keywords
    html = html.replace(/\b(export|default|const|let|var|function|return|if|else|for|while|import|from|extends|class|new|this|typeof|instanceof|in|of|async|await|try|catch|throw|switch|case|break|continue)\b/g,
      '<span class="sh-keyword">$1</span>')

    // Numbers
    html = html.replace(/\b(\d+\.?\d*)\b/g, '<span class="sh-number">$1</span>')

    // Booleans / special
    html = html.replace(/\b(true|false|null|undefined|NaN|Infinity)\b/g, '<span class="sh-boolean">$1</span>')

    return html
  }

  function findHighlightLine (lines, componentName, propKey) {
    if (propKey && componentName) {
      let componentStart = -1
      let braceDepth = 0
      for (let i = 0; i < lines.length; i++) {
        if (componentStart === -1) {
          if (lines[i].includes(componentName) && /[:={]/.test(lines[i])) {
            componentStart = i
            for (const ch of lines[i]) {
              if (ch === '{') braceDepth++
              if (ch === '}') braceDepth--
            }
          }
        } else {
          if (new RegExp('\\b' + escapeRegex(propKey) + '\\s*[:=]').test(lines[i])) return i
          for (const ch of lines[i]) {
            if (ch === '{') braceDepth++
            if (ch === '}') braceDepth--
          }
          if (braceDepth <= 0) break
        }
      }
    }
    if (propKey) {
      for (let i = 0; i < lines.length; i++) {
        if (new RegExp('\\b' + escapeRegex(propKey) + '\\s*[:=]').test(lines[i])) return i
      }
    } else if (componentName) {
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(componentName) && /[:={]/.test(lines[i])) return i
      }
    }
    return -1
  }

  function renderSourceTab (path, componentName, propKey) {
    const panel = document.getElementById('tab-source')
    panel.innerHTML = ''

    if (!path) {
      panel.innerHTML = '<div class="empty-message">Click a property key to view its source</div>'
      return
    }

    const content = fileCache[path]
    if (content === null || content === undefined) {
      panel.innerHTML = '<div class="empty-message">File not available: ' + path + '</div>'
      return
    }

    // Header with file path and save status
    const header = document.createElement('div')
    header.className = 'ce-header'

    const pathEl = document.createElement('span')
    pathEl.className = 'ce-path'
    pathEl.textContent = path
    if (componentName) pathEl.textContent += ' → ' + componentName
    if (propKey) pathEl.textContent += '.' + propKey

    const statusEl = document.createElement('span')
    statusEl.className = 'ce-status'

    const saveBtn = document.createElement('button')
    saveBtn.className = 'ce-save'
    saveBtn.textContent = 'Save'
    saveBtn.disabled = true

    header.appendChild(pathEl)
    header.appendChild(statusEl)
    header.appendChild(saveBtn)

    // Editor container with line numbers + textarea + highlight overlay
    const editorWrap = document.createElement('div')
    editorWrap.className = 'ce-wrap'

    const gutterEl = document.createElement('div')
    gutterEl.className = 'ce-gutter'

    const highlightLayer = document.createElement('div')
    highlightLayer.className = 'ce-highlight'

    const textarea = document.createElement('textarea')
    textarea.className = 'ce-textarea'
    textarea.value = content
    textarea.spellcheck = false
    textarea.autocomplete = 'off'
    textarea.autocapitalize = 'off'

    editorWrap.appendChild(gutterEl)
    editorWrap.appendChild(highlightLayer)
    editorWrap.appendChild(textarea)

    panel.appendChild(header)
    panel.appendChild(editorWrap)

    // Render highlighted code + line numbers
    let dirty = false

    function renderOverlay () {
      const lines = textarea.value.split('\n')
      // Gutter
      gutterEl.innerHTML = lines.map((_, i) => '<div class="ce-ln">' + (i + 1) + '</div>').join('')
      // Highlighted code
      highlightLayer.innerHTML = lines.map(l => '<div class="ce-line">' + highlightSyntax(l || ' ') + '</div>').join('')
    }

    function syncScroll () {
      highlightLayer.scrollTop = textarea.scrollTop
      highlightLayer.scrollLeft = textarea.scrollLeft
      gutterEl.scrollTop = textarea.scrollTop
    }

    renderOverlay()

    // Find and scroll to target line
    const targetLine = findHighlightLine(content.split('\n'), componentName, propKey)
    if (targetLine >= 0) {
      setTimeout(() => {
        const lineEls = highlightLayer.querySelectorAll('.ce-line')
        if (lineEls[targetLine]) {
          lineEls[targetLine].classList.add('ce-active')
          // Scroll textarea to that line
          const lineH = textarea.scrollHeight / textarea.value.split('\n').length
          textarea.scrollTop = Math.max(0, targetLine * lineH - editorWrap.clientHeight / 2)
          syncScroll()
        }
      }, 30)
    }

    textarea.addEventListener('input', () => {
      renderOverlay()
      if (!dirty) {
        dirty = true
        saveBtn.disabled = false
        statusEl.textContent = 'Modified'
        statusEl.className = 'ce-status ce-modified'
      }
    })

    textarea.addEventListener('scroll', syncScroll)

    // Tab key support
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault()
        const s = textarea.selectionStart
        const end = textarea.selectionEnd
        if (e.shiftKey) {
          // Dedent: remove leading 2 spaces on current line
          const before = textarea.value.substring(0, s)
          const lineStart = before.lastIndexOf('\n') + 1
          const line = textarea.value.substring(lineStart)
          if (line.startsWith('  ')) {
            textarea.value = textarea.value.substring(0, lineStart) + textarea.value.substring(lineStart + 2)
            textarea.selectionStart = textarea.selectionEnd = Math.max(lineStart, s - 2)
            renderOverlay()
          }
        } else {
          textarea.value = textarea.value.substring(0, s) + '  ' + textarea.value.substring(end)
          textarea.selectionStart = textarea.selectionEnd = s + 2
          renderOverlay()
        }
        if (!dirty) {
          dirty = true
          saveBtn.disabled = false
          statusEl.textContent = 'Modified'
          statusEl.className = 'ce-status ce-modified'
        }
      }

      // Ctrl/Cmd+S to save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        saveBtn.click()
      }
    })

    // Auto-indent on Enter
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const s = textarea.selectionStart
        const before = textarea.value.substring(0, s)
        const currentLine = before.substring(before.lastIndexOf('\n') + 1)
        const indent = currentLine.match(/^\s*/)[0]
        // Add extra indent after {
        const extra = currentLine.trimEnd().endsWith('{') ? '  ' : ''
        e.preventDefault()
        const insertion = '\n' + indent + extra
        textarea.value = textarea.value.substring(0, s) + insertion + textarea.value.substring(textarea.selectionEnd)
        textarea.selectionStart = textarea.selectionEnd = s + insertion.length
        renderOverlay()
        if (!dirty) {
          dirty = true
          saveBtn.disabled = false
          statusEl.textContent = 'Modified'
          statusEl.className = 'ce-status ce-modified'
        }
      }
    })

    // Save
    saveBtn.addEventListener('click', () => {
      saveBtn.disabled = true
      statusEl.textContent = 'Saving...'
      statusEl.className = 'ce-status'
      writeFileToProject(path, textarea.value, (ok, err) => {
        if (ok) {
          fileCache[path] = textarea.value
          dirty = false
          statusEl.textContent = 'Saved'
          statusEl.className = 'ce-status ce-saved'
          setTimeout(() => {
            if (!dirty) {
              statusEl.textContent = ''
              statusEl.className = 'ce-status'
            }
          }, 2000)
        } else {
          saveBtn.disabled = false
          statusEl.textContent = 'Error: ' + err
          statusEl.className = 'ce-status ce-error'
        }
      })
    })
  }

  function escapeRegex (str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  // Write file via picker proxy — uses folderName which matches the IndexedDB key
  function writeFileToProject (path, content, cb) {
    if (!folderName) {
      cb(false, 'No folder connected — open a local folder first')
      return
    }
    chrome.runtime.sendMessage({
      type: 'write-file', project: folderName, symbolsDir, path, content
    }, (response) => {
      if (chrome.runtime.lastError) {
        cb(false, 'Picker tab lost — reopen folder via Connect screen. (' + chrome.runtime.lastError.message + ')')
        return
      }
      if (response && response.success) cb(true)
      else cb(false, response?.error || 'No response from picker tab')
    })
  }

  // ============================================================
  // Save pending prop changes back to source files
  // ============================================================
  async function saveChangesToFiles () {
    const paths = Object.keys(pendingChanges)
    if (!paths.length) {
      setStatus('No file changes tracked')
      return
    }

    let saved = 0
    let errors = []

    for (const filePath of paths) {
      let content = fileCache[filePath]
      if (!content) { errors.push(filePath + ': not in cache'); continue }

      const changes = pendingChanges[filePath]
      for (const [propKey, info] of Object.entries(changes)) {
        // Find and replace the property value in the file
        const newVal = typeof info.newVal === 'string' ? "'" + info.newVal.replace(/'/g, "\\'") + "'" : JSON.stringify(info.newVal)

        // Try to match: propKey: oldValue  or  propKey: 'oldValue'
        const patterns = [
          new RegExp('(\\b' + escapeRegex(propKey) + '\\s*:\\s*)' + escapeRegex(formatValueForMatch(info.oldVal))),
          new RegExp('(\\b' + escapeRegex(propKey) + '\\s*:\\s*)["\']' + escapeRegex(String(info.oldVal)) + '["\']'),
          new RegExp('(\\b' + escapeRegex(propKey) + '\\s*:\\s*)' + escapeRegex(String(info.oldVal)))
        ]

        let replaced = false
        for (const pattern of patterns) {
          if (pattern.test(content)) {
            content = content.replace(pattern, '$1' + newVal)
            replaced = true
            break
          }
        }

        if (!replaced) {
          errors.push(filePath + ': could not find ' + propKey)
        }
      }

      // Write back
      await new Promise((resolve) => {
        writeFileToProject(filePath, content, (ok, err) => {
          if (ok) {
            fileCache[filePath] = content
            saved++
            delete pendingChanges[filePath]
          } else {
            errors.push(filePath + ': ' + err)
          }
          resolve()
        })
      })
    }

    if (saved > 0) {
      setStatus('Saved ' + saved + ' file(s)' + (errors.length ? ', ' + errors.length + ' error(s)' : ''))
      renderPropsTab()
    } else if (errors.length) {
      setStatus('Save errors: ' + errors.join('; '))
    }
  }

  function formatValueForMatch (val) {
    if (typeof val === 'string') return "'" + val.replace(/'/g, "\\'") + "'"
    return JSON.stringify(val)
  }

  // Track a prop change for later save-to-file or sync
  function trackPropChange (propKey, oldVal, newVal, componentName) {
    // Resolve "self" or missing name to the actual element key
    const resolvedName = resolveComponentName(componentName)

    // Track sync ops for both modes
    pendingSyncOps.push({
      elementPath: selectedPath,
      key: propKey,
      value: newVal,
      componentName: resolvedName
    })
    updateSyncButton()

    // Also track file changes for local mode
    if (connectionMode !== 'local' || !resolvedName) return
    const filePath = findSourceForElement(resolvedName)
    if (!filePath) return

    if (!pendingChanges[filePath]) pendingChanges[filePath] = {}
    pendingChanges[filePath][propKey] = { oldVal, newVal, componentName: resolvedName }
  }

  // Resolve component name — "self" means the prop is on the element itself,
  // so use the element's key. Also walk up the ref chain for a named component.
  function resolveComponentName (name) {
    if (name && name !== 'self') return name
    if (!selectedInfo) return null
    // Use __ref.__name or component or the element key
    if (selectedInfo.ref && selectedInfo.ref.__name) return selectedInfo.ref.__name
    return selectedInfo.key || null
  }

  function updateSyncButton () {
    const btn = document.getElementById('btn-sync')
    if (!btn) return
    const count = pendingSyncOps.length
    if (count > 0) {
      btn.style.display = ''
      btn.textContent = 'Sync (' + count + ')'
    } else {
      btn.style.display = 'none'
    }
  }

  // ============================================================
  // Sync — write changes to source (local) or send to server (platform)
  // ============================================================
  async function syncChanges () {
    if (pendingSyncOps.length === 0) {
      setStatus('No changes to sync')
      return
    }

    setStatus('Syncing ' + pendingSyncOps.length + ' change(s)...')

    try {
      if (connectionMode === 'local') {
        await syncLocal()
      } else if (connectionMode === 'platform') {
        await syncRemote()
      } else {
        setStatus('Not connected — choose Local or Platform first')
      }
    } catch (e) {
      setStatus('Sync failed: ' + (e.message || e))
    }
  }

  // Build the top-level override object for a component change.
  // Given element path "Hero.Headline" and key "text" with value "Hello",
  // this produces: { Headline: { text: "Hello" } } — the override at the top-level component
  function buildOverrideObject (elementPath, key, value) {
    const parts = elementPath.split('.')
    // Skip the root element (first part) — we want the nested path within the component
    const nestedParts = parts.slice(1)

    // Build from inside out
    let obj = { [key]: value }
    for (let i = nestedParts.length - 1; i >= 0; i--) {
      obj = { [nestedParts[i]]: obj }
    }
    return { rootKey: parts[0], override: obj }
  }

  async function syncLocal () {
    // If we have pending file changes from trackPropChange, use saveChangesToFiles
    const fileChangeCount = Object.values(pendingChanges).reduce((n, c) => n + Object.keys(c).length, 0)

    if (fileChangeCount > 0) {
      await saveChangesToFiles()
    } else {
      // No file-mapped changes — try to write ops directly to source files
      let written = 0
      let errors = []

      for (const op of pendingSyncOps) {
        const componentName = op.componentName || selectedInfo?.key
        const filePath = componentName ? findSourceForElement(componentName) : null

        if (!filePath) {
          errors.push((componentName || op.elementPath) + ': source file not found')
          continue
        }

        let content = fileCache[filePath]
        if (!content) {
          errors.push(filePath + ': not in cache')
          continue
        }

        // Find and replace the prop in the file
        const newVal = typeof op.value === 'string'
          ? "'" + op.value.replace(/'/g, "\\'") + "'"
          : JSON.stringify(op.value)

        const propPattern = new RegExp('(\\b' + escapeRegex(op.key) + '\\s*:\\s*)[^\n,}]+')
        if (propPattern.test(content)) {
          content = content.replace(propPattern, '$1' + newVal)
          await new Promise((resolve) => {
            writeFileToProject(filePath, content, (ok, err) => {
              if (ok) {
                fileCache[filePath] = content
                written++
              } else {
                errors.push(filePath + ': ' + err)
              }
              resolve()
            })
          })
        } else {
          errors.push(filePath + ': could not find ' + op.key)
        }
      }

      if (written > 0) {
        setStatus('Saved ' + written + ' change(s)' + (errors.length ? ', ' + errors.length + ' error(s): ' + errors[0] : ''))
      } else if (errors.length) {
        setStatus('Sync errors: ' + errors.join('; '))
      }
    }

    pendingSyncOps = []
    pendingChanges = {}
    updateSyncButton()
  }

  function findPageFile () {
    // Look for the pages/index.js or pages file in the file cache
    for (const path of Object.keys(fileCache)) {
      if (/pages[/\\](index\.)?(js|jsx|ts|tsx)$/i.test(path)) return path
    }
    return null
  }

  async function syncToPageFile (filePath, componentChanges) {
    let content = fileCache[filePath]
    if (!content) {
      setStatus('Page file not in cache')
      return
    }

    // Get the current route from the inspected page
    let route = '/'
    try {
      route = await pageEval('window.location.pathname') || '/'
    } catch (e) { /* default to / */ }

    let modified = false

    for (const [componentKey, overrides] of Object.entries(componentChanges)) {
      // Find the component reference in the page file for the current route
      // Look for patterns like:  ComponentKey: { extends: ...
      // or the route definition that contains this component
      const propsStr = objectToJsProps(overrides, 3)

      // Try to find existing component definition in the page
      // Pattern: `ComponentKey: {` followed by content and `}`
      const componentPattern = new RegExp(
        '(\\b' + escapeRegex(componentKey) + '\\s*:\\s*\\{)'
      )

      if (componentPattern.test(content)) {
        // Insert/merge the overrides into the existing component block
        content = content.replace(componentPattern, '$1\n' + propsStr + ',')
        modified = true
      } else {
        // Component not found in page — try to add it to the route section
        const routePattern = new RegExp(
          "('" + escapeRegex(route) + "'\\s*:\\s*\\{[^]*?)(\\n\\s*\\})",
          'm'
        )
        const match = content.match(routePattern)
        if (match) {
          const indent = '    '
          content = content.replace(
            routePattern,
            '$1,\n' + indent + componentKey + ': {\n' + indent + '  ' + propsStr + '\n' + indent + '}$2'
          )
          modified = true
        }
      }
    }

    if (modified) {
      writeFileToProject(filePath, content, (ok, err) => {
        if (ok) {
          fileCache[filePath] = content
          pendingChanges = {}
          setStatus('Synced to ' + filePath.split('/').pop())
          renderPropsTab()
        } else {
          setStatus('Sync error: ' + err)
        }
      })
    } else {
      // Fallback to individual file saves
      await saveChangesToFiles()
    }
  }

  // Convert an override object to JS property string for embedding in source
  function objectToJsProps (obj, indent) {
    const pad = ' '.repeat(indent || 0)
    const lines = []
    for (const [k, v] of Object.entries(obj)) {
      if (v && typeof v === 'object' && !Array.isArray(v)) {
        lines.push(pad + k + ': {')
        lines.push(objectToJsProps(v, (indent || 0) + 2))
        lines.push(pad + '}')
      } else {
        const val = typeof v === 'string' ? "'" + v.replace(/'/g, "\\'") + "'" : JSON.stringify(v)
        lines.push(pad + k + ': ' + val)
      }
    }
    return lines.join(',\n')
  }

  async function syncRemote () {
    try {
      // Use stored project name or get from inspected page context
      let projectKey = projectName || null
      if (!projectKey || projectKey === 'symbols.app') {
        projectKey = await pageEval(
          '(function(){ var ctx = document.body && document.body.ref && document.body.ref.context; return ctx && ctx.key })()'
        )
      }

      if (!projectKey) {
        setStatus('No project key found — cannot sync to platform')
        return
      }

      // Build ops in the format the sync server expects: [action, path, change]
      const ops = []
      for (const op of pendingSyncOps) {
        const parts = op.elementPath.split('.')
        // Build the path: ['components', rootComponent, ...nestedParts, propKey]
        // Or for page-level: ['pages', route, ...parts, propKey]
        const opPath = ['components', ...parts, op.key]
        ops.push(['set', opPath, op.value])
      }

      // Send ops via the page's existing socket or create a direct connection
      const sent = await pageEval(
        '(function(){' +
        '  var ctx = document.body && document.body.ref && document.body.ref.context;' +
        '  if (!ctx || !ctx.__socket) return false;' +
        '  ctx.__socket.emit("ops", { changes: ' + JSON.stringify(ops) + ' });' +
        '  return true;' +
        '})()'
      )

      if (sent) {
        setStatus('Synced ' + pendingSyncOps.length + ' change(s) to platform')
      } else {
        // Fallback: send ops directly via the collab socket API
        await syncRemoteDirect(projectKey, ops)
      }

      pendingSyncOps = []
      pendingChanges = {}
      updateSyncButton()
    } catch (e) {
      setStatus('Sync error: ' + (e.message || e))
    }
  }

  async function syncRemoteDirect (projectKey, ops) {
    try {
      // Use auth token if signed in, otherwise service token
      let token = null
      if (window.SymbolsAuth) {
        token = await window.SymbolsAuth.getAccessToken()
        if (!token) token = await window.SymbolsAuth.getServiceToken()
      }

      if (!token) {
        // Fallback to direct service token fetch
        const apiBase = 'https://api.symbols.app'
        const tokenRes = await fetch(apiBase + '/service-token')
        const tokenData = await tokenRes.json().catch(() => null)
        token = tokenData?.token || (await tokenRes.text()).trim()
      }

      if (!token) {
        setStatus('Not authenticated — sign in to sync to platform')
        return
      }

      const res = await fetch('https://api.symbols.app/collab/ops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          projectKey,
          branch: 'main',
          changes: ops
        })
      })

      if (res.ok) {
        setStatus('Synced ' + ops.length + ' change(s) to platform')
      } else {
        setStatus('Platform sync failed: ' + res.status)
      }
    } catch (e) {
      setStatus('Platform sync error: ' + (e.message || e))
    }
  }

  function deepMerge (target, source) {
    for (const [k, v] of Object.entries(source)) {
      if (v && typeof v === 'object' && !Array.isArray(v) && target[k] && typeof target[k] === 'object') {
        deepMerge(target[k], v)
      } else {
        target[k] = v
      }
    }
    return target
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
      sourceTab.textContent = 'Source'
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

    // In platform mode, render project data context in the source tab area
    if (connectionMode === 'platform' && platformProjectData) {
      renderPlatformDataTab()
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
      valEl.className = 'prop-value editable'
      valEl.appendChild(renderValue(val))

      const editableVal = isEditableValue(val) ? val : stringifyForEdit(val)
      valEl.addEventListener('click', () => startEditing(valEl, key, editableVal, 'state'))

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

    const origins = selectedInfo.propsOrigin || {}

    // Group props by origin component
    const groups = {}
    for (const [key, val] of Object.entries(selectedInfo.props)) {
      const source = origins[key] || 'self'
      if (!groups[source]) groups[source] = []
      groups[source].push({ key, val })
    }

    const sourceNames = Object.keys(groups)
    for (const source of sourceNames) {
      const filePath = connectionMode === 'local' && source !== 'self'
        ? findSourceForElement(source) : null

      if (sourceNames.length > 1 || source !== 'self') {
        const header = document.createElement('div')
        header.className = 'section-header prop-source-header'

        const headerLabel = document.createElement('span')
        headerLabel.textContent = source === 'self' ? 'Own' : source

        header.appendChild(headerLabel)

        if (filePath) {
          const fileLink = document.createElement('span')
          fileLink.className = 'prop-source-file'
          fileLink.textContent = filePath
          fileLink.title = 'View source'
          fileLink.addEventListener('click', (e) => {
            e.stopPropagation()
            showPropertySource(filePath, source)
          })
          header.appendChild(fileLink)
        }

        panel.appendChild(header)
      }

      for (const { key, val } of groups[source]) {
        panel.appendChild(createPropRow(key, val, 'prop', source, filePath))
      }
    }

    // Save to files button (only when local + has pending changes)
    if (connectionMode === 'local') {
      const changeCount = Object.values(pendingChanges).reduce((n, c) => n + Object.keys(c).length, 0)
      if (changeCount > 0) {
        const saveBar = document.createElement('div')
        saveBar.className = 'prop-save-bar'

        const saveBtn = document.createElement('button')
        saveBtn.className = 'prop-save-btn'
        saveBtn.textContent = 'Save ' + changeCount + ' change' + (changeCount > 1 ? 's' : '') + ' to files'
        saveBtn.addEventListener('click', saveChangesToFiles)

        saveBar.appendChild(saveBtn)
        panel.appendChild(saveBar)
      }
    }
  }

  function createPropRow (key, val, type, componentName, filePath) {
    const row = document.createElement('div')
    row.className = 'prop-row'

    const keyEl = document.createElement('span')
    keyEl.className = 'prop-key'
    keyEl.textContent = key

    // Show source file badge if available and clicking navigates to that prop in source
    if (filePath && connectionMode === 'local') {
      keyEl.classList.add('has-source')
      keyEl.title = filePath
      keyEl.addEventListener('click', (e) => {
        e.stopPropagation()
        showPropertySource(filePath, componentName, key)
      })
    }

    const valEl = document.createElement('span')
    valEl.className = 'prop-value editable'
    valEl.appendChild(renderValue(val))

    const editableVal = isEditableValue(val) ? val : stringifyForEdit(val)
    valEl.addEventListener('click', () => startEditing(valEl, key, editableVal, type, componentName))

    row.appendChild(keyEl)
    row.appendChild(valEl)
    return row
  }

  // Check if value can be directly edited as text
  function isEditableValue (val) {
    return val === null || typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean'
  }

  // Convert complex values to an editable string representation
  function stringifyForEdit (val) {
    if (val && val.__type === 'function') return val.name ? 'f ' + val.name + '()' : ''
    if (val && val.__type === 'undefined') return ''
    if (val && val.__type === 'circular') return ''
    try { return JSON.stringify(val) } catch (e) { return '' }
  }

  function switchToTab (tabName) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'))
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'))
    const tab = document.querySelector('.tab[data-tab="' + tabName + '"]')
    if (tab) tab.classList.add('active')
    const panel = document.getElementById('tab-' + tabName)
    if (panel) panel.classList.add('active')
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
        expandAndSelectTreePath(childPath)
        switchToTab('props')
      })

      item.addEventListener('mouseenter', () => {
        const childPath = selectedPath + '.' + child.key
        highlightElement(childPath)
      })

      item.addEventListener('mouseleave', () => {
        if (selectedPath) highlightElement(selectedPath)
        else removeHighlight()
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
  function startEditing (el, key, currentValue, type, componentName) {
    if (el.classList.contains('editing')) return
    el.innerHTML = ''
    el.classList.add('editing')

    const input = document.createElement('input')
    input.value = typeof currentValue === 'string' ? currentValue : JSON.stringify(currentValue)
    el.appendChild(input)
    input.focus()
    input.select()

    let committed = false

    const commit = async () => {
      if (committed) return
      committed = true
      el.classList.remove('editing')

      let newValue = input.value
      try {
        newValue = JSON.parse(newValue)
      } catch (e) {
        // Keep as string
      }

      // Immediately update panel display
      el.innerHTML = ''
      el.appendChild(renderValue(newValue))

      // Update selectedInfo locally so panel stays in sync
      if (selectedInfo && selectedInfo.props && type !== 'state') {
        selectedInfo.props[key] = newValue
      } else if (selectedInfo && selectedInfo.state && type === 'state') {
        selectedInfo.state[key] = newValue
      }

      // Update DOM via setProps / update
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
          // Revert display
          el.innerHTML = ''
          el.appendChild(renderValue(currentValue))
          if (selectedInfo && selectedInfo.props && type !== 'state') {
            selectedInfo.props[key] = currentValue
          }
        } else {
          setStatus('Updated ' + key)
          pushHistory(selectedPath, key, currentValue, newValue, type, componentName)
          trackPropChange(key, currentValue, newValue, componentName)
        }
      } catch (e) {
        setStatus('Error: ' + (e.message || e))
        el.innerHTML = ''
        el.appendChild(renderValue(currentValue))
      }
    }

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); commit() }
      if (e.key === 'Escape') {
        committed = true
        el.classList.remove('editing')
        el.innerHTML = ''
        el.appendChild(renderValue(currentValue))
      }
    })

    input.addEventListener('blur', commit)
  }

  // ============================================================
  // History (undo / redo)
  // ============================================================
  function pushHistory (path, key, oldValue, newValue, type, componentName) {
    changeHistory.push({ path, key, oldValue, newValue, type, componentName })
    redoStack = []
    updateUndoRedoButtons()
  }

  async function applyChange (path, key, value, type) {
    let expr
    if (type === 'state') {
      expr = 'JSON.stringify(window.__DOMQL_INSPECTOR__.updateState(' +
        JSON.stringify(path) + ',' +
        JSON.stringify(key) + ',' +
        JSON.stringify(value) + '))'
    } else {
      expr = 'JSON.stringify(window.__DOMQL_INSPECTOR__.updateProp(' +
        JSON.stringify(path) + ',' +
        JSON.stringify(key) + ',' +
        JSON.stringify(value) + '))'
    }
    const raw = await pageEval(expr)
    return JSON.parse(raw)
  }

  async function undo () {
    if (changeHistory.length === 0) return
    const entry = changeHistory.pop()
    redoStack.push(entry)
    updateUndoRedoButtons()

    const res = await applyChange(entry.path, entry.key, entry.oldValue, entry.type)
    if (res.error) {
      setStatus('Undo failed: ' + res.error)
      return
    }

    setStatus('Undo: ' + entry.key)

    // If we're viewing the same element, refresh the panel
    if (selectedPath === entry.path) {
      await selectElement(entry.path)
    }
  }

  async function redo () {
    if (redoStack.length === 0) return
    const entry = redoStack.pop()
    changeHistory.push(entry)
    updateUndoRedoButtons()

    const res = await applyChange(entry.path, entry.key, entry.newValue, entry.type)
    if (res.error) {
      setStatus('Redo failed: ' + res.error)
      return
    }

    setStatus('Redo: ' + entry.key)

    if (selectedPath === entry.path) {
      await selectElement(entry.path)
    }
  }

  function updateUndoRedoButtons () {
    const undoBtn = document.getElementById('btn-undo')
    const redoBtn = document.getElementById('btn-redo')
    if (undoBtn) undoBtn.disabled = changeHistory.length === 0
    if (redoBtn) redoBtn.disabled = redoStack.length === 0
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
  // Platform Data Tab — JSON tree editor
  // ============================================================
  function renderPlatformDataTab () {
    const sourceTab = document.querySelector('.tab[data-tab="source"]')
    if (sourceTab) {
      sourceTab.style.display = ''
      sourceTab.textContent = 'Data'
    }

    // Only render if the tab is active
    if (!sourceTab || !sourceTab.classList.contains('active')) return

    const panel = document.getElementById('tab-source')
    panel.innerHTML = ''

    if (!platformProjectData) {
      panel.innerHTML = '<div class="empty-message">No project data loaded</div>'
      return
    }

    // Find relevant data for the selected element
    let data = platformProjectData
    if (selectedInfo && selectedInfo.key) {
      // Try to find the component in project data
      const key = selectedInfo.key
      if (data.components && data.components[key]) {
        data = { [key]: data.components[key] }
      } else if (data[key]) {
        data = { [key]: data[key] }
      }
    }

    const editor = document.createElement('div')
    editor.className = 'json-editor'
    editor.appendChild(renderJsonTree(data, '', 0))
    panel.appendChild(editor)
  }

  function renderJsonTree (obj, path, depth) {
    const container = document.createElement('div')

    if (obj === null || obj === undefined || typeof obj !== 'object') {
      const row = document.createElement('div')
      row.className = 'json-row'
      row.style.paddingLeft = (depth * 14) + 'px'

      const valEl = document.createElement('span')
      valEl.className = 'json-value editable'
      valEl.appendChild(renderValue(obj))
      valEl.addEventListener('click', () => {
        const editableVal = isEditableValue(obj) ? obj : stringifyForEdit(obj)
        startJsonEditing(valEl, path, editableVal)
      })

      row.appendChild(valEl)
      container.appendChild(row)
      return container
    }

    const keys = Object.keys(obj)
    for (const key of keys) {
      const val = obj[key]
      const fullPath = path ? path + '.' + key : key
      const isObject = val && typeof val === 'object' && !Array.isArray(val)
      const isArray = Array.isArray(val)

      const row = document.createElement('div')
      row.className = 'json-row'
      row.style.paddingLeft = (depth * 14) + 'px'

      if (isObject || isArray) {
        const toggle = document.createElement('span')
        toggle.className = 'json-toggle'
        toggle.textContent = '\u25B6'

        const keyEl = document.createElement('span')
        keyEl.className = 'json-key'
        keyEl.textContent = key

        const colon = document.createElement('span')
        colon.className = 'json-colon'
        colon.textContent = ':'

        const bracket = document.createElement('span')
        bracket.className = 'json-bracket'
        const childKeys = Object.keys(val)
        bracket.textContent = (isArray ? '[' : '{') + childKeys.length + (isArray ? ' items]' : ' keys}')

        row.appendChild(toggle)
        row.appendChild(keyEl)
        row.appendChild(colon)
        row.appendChild(bracket)

        const childContainer = document.createElement('div')
        childContainer.className = 'json-children'
        childContainer.appendChild(renderJsonTree(val, fullPath, depth + 1))

        toggle.addEventListener('click', () => {
          const expanded = childContainer.classList.toggle('expanded')
          toggle.textContent = expanded ? '\u25BC' : '\u25B6'
          bracket.textContent = expanded
            ? (isArray ? '[' : '{')
            : (isArray ? '[' : '{') + childKeys.length + (isArray ? ' items]' : ' keys}')
        })

        row.style.cursor = 'pointer'
        row.addEventListener('click', (e) => {
          if (e.target === toggle) return
          toggle.click()
        })

        container.appendChild(row)
        container.appendChild(childContainer)
      } else {
        const indent = document.createElement('span')
        indent.className = 'json-indent'
        indent.style.width = '14px'
        indent.style.display = 'inline-block'

        const keyEl = document.createElement('span')
        keyEl.className = 'json-key'
        keyEl.textContent = key

        const colon = document.createElement('span')
        colon.className = 'json-colon'
        colon.textContent = ':'

        const valEl = document.createElement('span')
        valEl.className = 'json-value editable'
        valEl.appendChild(renderValue(val))
        valEl.addEventListener('click', () => {
          const editableVal = isEditableValue(val) ? val : stringifyForEdit(val)
          startJsonEditing(valEl, fullPath, editableVal)
        })

        row.appendChild(indent)
        row.appendChild(keyEl)
        row.appendChild(colon)
        row.appendChild(valEl)
        container.appendChild(row)
      }
    }

    return container
  }

  function startJsonEditing (el, path, currentValue) {
    if (el.classList.contains('editing')) return
    el.innerHTML = ''
    el.classList.add('editing')

    const input = document.createElement('input')
    input.value = typeof currentValue === 'string' ? currentValue : JSON.stringify(currentValue)
    el.appendChild(input)
    input.focus()
    input.select()

    let committed = false

    const commit = async () => {
      if (committed) return
      committed = true
      el.classList.remove('editing')

      let newValue = input.value
      try { newValue = JSON.parse(newValue) } catch (e) { /* keep as string */ }

      el.innerHTML = ''
      el.appendChild(renderValue(newValue))

      // Update the platform project data in memory
      setNestedValue(platformProjectData, path, newValue)

      // Also update the DOM if we have a selected element
      if (selectedPath) {
        const parts = path.split('.')
        const propKey = parts[parts.length - 1]
        try {
          await pageEval('JSON.stringify(window.__DOMQL_INSPECTOR__.updateProp(' +
            JSON.stringify(selectedPath) + ',' +
            JSON.stringify(propKey) + ',' +
            JSON.stringify(newValue) + '))')
          setStatus('Updated ' + propKey)
        } catch (e) { /* best effort */ }

        trackPropChange(propKey, currentValue, newValue, selectedInfo?.key)
      }
    }

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); commit() }
      if (e.key === 'Escape') {
        committed = true
        el.classList.remove('editing')
        el.innerHTML = ''
        el.appendChild(renderValue(currentValue))
      }
    })
    input.addEventListener('blur', commit)
  }

  function setNestedValue (obj, path, value) {
    const parts = path.split('.')
    let current = obj
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]] || typeof current[parts[i]] !== 'object') {
        current[parts[i]] = {}
      }
      current = current[parts[i]]
    }
    current[parts[parts.length - 1]] = value
  }

  // ============================================================
  // AI Prompt
  // ============================================================
  async function handleAIPrompt (prompt) {
    const resultEl = document.getElementById('ai-result')
    resultEl.textContent = 'Thinking...'
    resultEl.style.color = 'var(--text-dim)'

    try {
      // Build context about the selected element
      let elementInfo = null
      if (selectedPath) {
        const raw = await pageEval(
          'JSON.stringify(window.__DOMQL_INSPECTOR__.navigatePath(' + JSON.stringify(selectedPath) + '))'
        )
        if (raw) elementInfo = JSON.parse(raw)
      }

      const context = {
        elementPath: selectedPath || null,
        elementKey: elementInfo ? elementInfo.key : null,
        props: elementInfo ? elementInfo.props : {},
        state: elementInfo ? elementInfo.state : {},
        tag: elementInfo ? elementInfo.tag : null,
        projectData: platformProjectData ? { hasData: true } : null
      }

      // Try platform AI first (if signed in), then fall back to Chrome AI
      const auth = window.SymbolsAuth ? await window.SymbolsAuth.getStoredAuth() : null
      let response = null

      if (auth && auth.accessToken) {
        // Use platform AI
        try {
          const messages = [
            { role: 'user', content: prompt }
          ]
          const aiRes = await window.SymbolsAuth.aiPrompt(messages, context)
          response = aiRes.response || aiRes.message || aiRes.content || JSON.stringify(aiRes)
        } catch (e) {
          resultEl.textContent = 'Platform AI error: ' + (e.message || e)
          resultEl.style.color = 'var(--error-color)'
          return
        }
      } else {
        // Fallback to Chrome AI
        response = await runChromeAI(prompt, context)
      }

      if (!response) {
        resultEl.textContent = 'No response from AI'
        resultEl.style.color = 'var(--error-color)'
        return
      }

      // Try to parse as actionable JSON
      await applyAIResponse(response, resultEl)
    } catch (e) {
      resultEl.textContent = 'Error: ' + (e.message || e)
      resultEl.style.color = 'var(--error-color)'
    }
  }

  async function runChromeAI (prompt, context) {
    const systemPrompt = `You are a DOMQL component assistant. You modify Symbols/DOMQL components.
Given an element's current props, state, and the user request, respond with ONLY a JSON object.
For prop changes: {"action":"setProps","changes":{"key":"value"}}
For state changes: {"action":"setState","changes":{"key":"value"}}
For text changes: {"action":"setText","value":"new text"}
For style changes: {"action":"update","changes":{"style":{"property":"value"}}}
Do NOT include any explanation, only valid JSON.`

    const contextPrompt = `Element path: ${context.elementPath || 'none'}
Element key: ${context.elementKey || 'none'}
Current props: ${JSON.stringify(context.props)}
Current state: ${JSON.stringify(context.state)}
Tag: ${context.tag || 'unknown'}

User request: ${prompt}`

    const id = '__domql_ai_' + Date.now()
    const aiExpr = `(async function(){
      try {
        if(typeof LanguageModel==='undefined'){
          window.${id}={error:'Chrome AI not available. Sign in to use platform AI.'};return
        }
        var s=await LanguageModel.create({initialPrompts:[{role:'system',content:${JSON.stringify(systemPrompt)}}]})
        var r=await s.prompt(${JSON.stringify(contextPrompt)})
        s.destroy()
        window.${id}={response:r}
      }catch(e){window.${id}={error:e.message||String(e)}}
    })()`
    await pageEval(aiExpr)

    for (let i = 0; i < 120; i++) {
      await new Promise(r => setTimeout(r, 500))
      const raw = await pageEval('JSON.stringify(window.' + id + ')')
      if (raw && raw !== 'null' && raw !== 'undefined') {
        const result = JSON.parse(raw)
        await pageEval('delete window.' + id)
        if (result.error) throw new Error(result.error)
        return result.response
      }
    }
    throw new Error('AI timed out')
  }

  async function applyAIResponse (response, resultEl) {
    try {
      const parsed = JSON.parse(response)
      const path = selectedPath

      if (!path) {
        resultEl.textContent = 'Select an element first'
        resultEl.style.color = 'var(--error-color)'
        return
      }

      if (parsed.action === 'setProps' && parsed.changes) {
        for (const [k, v] of Object.entries(parsed.changes)) {
          await pageEval('JSON.stringify(window.__DOMQL_INSPECTOR__.updateProp(' +
            JSON.stringify(path) + ',' + JSON.stringify(k) + ',' + JSON.stringify(v) + '))')
        }
        resultEl.textContent = 'Updated props: ' + Object.keys(parsed.changes).join(', ')
        resultEl.style.color = 'var(--type-color)'
      } else if (parsed.action === 'setState' && parsed.changes) {
        for (const [k, v] of Object.entries(parsed.changes)) {
          await pageEval('JSON.stringify(window.__DOMQL_INSPECTOR__.updateState(' +
            JSON.stringify(path) + ',' + JSON.stringify(k) + ',' + JSON.stringify(v) + '))')
        }
        resultEl.textContent = 'Updated state: ' + Object.keys(parsed.changes).join(', ')
        resultEl.style.color = 'var(--type-color)'
      } else if (parsed.action === 'setText' && parsed.value !== undefined) {
        await pageEval('JSON.stringify(window.__DOMQL_INSPECTOR__.updateProp(' +
          JSON.stringify(path) + ',"text",' + JSON.stringify(parsed.value) + '))')
        resultEl.textContent = 'Updated text'
        resultEl.style.color = 'var(--type-color)'
      } else if (parsed.action === 'update' && parsed.changes) {
        await pageEval('(function(){var el=window.__DOMQL_INSPECTOR__.getElementByPath(' +
          JSON.stringify(path) + ');if(el)el.update(' + JSON.stringify(parsed.changes) + ')})()')
        resultEl.textContent = 'Applied update'
        resultEl.style.color = 'var(--type-color)'
      } else {
        resultEl.textContent = response
        resultEl.style.color = 'var(--text)'
      }

      setTimeout(() => selectElement(path), 200)
    } catch (e) {
      // Not JSON — show as text response
      resultEl.textContent = response
      resultEl.style.color = 'var(--text)'
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

        if (tab.dataset.tab === 'source') {
          if (connectionMode === 'platform' && platformProjectData) {
            renderPlatformDataTab()
          } else if (currentSourcePath) {
            renderSourceTab(currentSourcePath)
          }
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
      connectPlatform(null)
    })

    // Auth buttons
    const signInBtn = document.getElementById('btn-sign-in')
    if (signInBtn) {
      signInBtn.addEventListener('click', handleSignIn)
      const passwordInput = document.getElementById('auth-password')
      if (passwordInput) {
        passwordInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') handleSignIn()
        })
      }
    }
    const signInBrowserBtn = document.getElementById('btn-sign-in-browser')
    if (signInBrowserBtn) signInBrowserBtn.addEventListener('click', handleBrowserSignIn)
    const signOutBtn = document.getElementById('btn-sign-out')
    if (signOutBtn) signOutBtn.addEventListener('click', handleSignOut)

    // Inspector toolbar
    document.getElementById('btn-pick').addEventListener('click', startPicker)
    document.getElementById('btn-refresh').addEventListener('click', loadTree)
    document.getElementById('btn-inspect').addEventListener('click', inspectSelected)
    document.getElementById('btn-disconnect').addEventListener('click', disconnect)
    document.getElementById('btn-sync').addEventListener('click', syncChanges)
    document.getElementById('btn-undo').addEventListener('click', undo)
    document.getElementById('btn-redo').addEventListener('click', redo)

    // Keyboard shortcuts for undo/redo
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        undo()
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) {
        e.preventDefault()
        redo()
      }
    })
    document.getElementById('btn-reload').addEventListener('click', () => location.reload())

    // AI prompt — show if signed in OR Chrome AI available
    const aiInput = document.getElementById('ai-input')
    const aiSend = document.getElementById('ai-send')
    const aiBar = document.getElementById('ai-bar')
    if (aiInput && aiSend) {
      // Check if user is signed in or Chrome AI is available
      Promise.all([
        window.SymbolsAuth ? window.SymbolsAuth.getStoredAuth().then(a => !!a.accessToken) : Promise.resolve(false),
        pageEval('typeof LanguageModel !== "undefined"').catch(() => false)
      ]).then(([signedIn, chromeAI]) => {
        if (signedIn || chromeAI) {
          aiBar.style.display = ''
          if (signedIn) {
            aiInput.placeholder = 'Ask AI to modify components...'
          } else {
            aiInput.placeholder = 'Ask Chrome AI (sign in for platform AI)...'
          }
        }
      })

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
