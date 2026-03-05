;(function () {
  'use strict'

  // ============================================================
  // State
  // ============================================================
  let selectedPath = null
  let selectedInfo = null
  let treeData = null
  let connectionMode = null // 'local' | 'platform' | 'runtime'
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
  let cachedDesignSystem = null // cached DS for autocomplete suggestions

  // ============================================================
  // IndexedDB
  // ============================================================
  const DB_NAME = 'symbols-connect'
  const DB_STORE = 'handles'
  const FILES_STORE = 'files'
  const THREADS_STORE = 'threads'

  function openDB () {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 3)
      req.onupgradeneeded = (e) => {
        const db = e.target.result
        if (!db.objectStoreNames.contains(DB_STORE)) db.createObjectStore(DB_STORE)
        if (!db.objectStoreNames.contains(FILES_STORE)) db.createObjectStore(FILES_STORE)
        if (!db.objectStoreNames.contains(THREADS_STORE)) {
          const store = db.createObjectStore(THREADS_STORE, { keyPath: 'id' })
          store.createIndex('project', 'project', { unique: false })
        }
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
  // Threads persistence
  // ============================================================
  let currentThreadId = null
  let threads = [] // loaded threads for current project

  function generateThreadId () {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
  }

  async function getThreadsForProject (project) {
    const db = await openDB()
    const tx = db.transaction(THREADS_STORE, 'readonly')
    const index = tx.objectStore(THREADS_STORE).index('project')
    return new Promise((resolve, reject) => {
      const req = index.getAll(project)
      req.onsuccess = () => resolve((req.result || []).sort((a, b) => b.updatedAt - a.updatedAt))
      req.onerror = () => reject(req.error)
    })
  }

  async function saveThread (thread) {
    const db = await openDB()
    const tx = db.transaction(THREADS_STORE, 'readwrite')
    tx.objectStore(THREADS_STORE).put(thread)
    return new Promise((resolve, reject) => {
      tx.oncomplete = resolve
      tx.onerror = () => reject(tx.error)
    })
  }

  async function deleteThread (id) {
    const db = await openDB()
    const tx = db.transaction(THREADS_STORE, 'readwrite')
    tx.objectStore(THREADS_STORE).delete(id)
    return new Promise((resolve, reject) => {
      tx.oncomplete = resolve
      tx.onerror = () => reject(tx.error)
    })
  }

  function createNewThread () {
    const thread = {
      id: generateThreadId(),
      project: projectName,
      title: 'New thread',
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
    threads.unshift(thread)
    currentThreadId = thread.id
    chatMessages = thread.messages
    saveThread(thread)
    renderThreadTabs()
    renderChatMessages()
    return thread
  }

  function switchThread (id) {
    const thread = threads.find(t => t.id === id)
    if (!thread) return
    currentThreadId = id
    chatMessages = thread.messages
    renderThreadTabs()
    renderChatMessages()
  }

  async function loadProjectThreads () {
    if (!projectName) return
    threads = await getThreadsForProject(projectName)
    if (threads.length > 0) {
      currentThreadId = threads[0].id
      chatMessages = threads[0].messages
    } else {
      createNewThread()
      return
    }
    renderThreadTabs()
  }

  async function persistCurrentThread () {
    if (!currentThreadId) return
    const thread = threads.find(t => t.id === currentThreadId)
    if (!thread) return
    thread.updatedAt = Date.now()
    // Auto-title from first user message
    if (thread.title === 'New thread' && thread.messages.length > 0) {
      const firstUser = thread.messages.find(m => m.role === 'user')
      if (firstUser) {
        thread.title = firstUser.content.slice(0, 40) + (firstUser.content.length > 40 ? '...' : '')
      }
    }
    await saveThread(thread)
    renderThreadTabs()
  }

  function renderThreadTabs () {
    const container = document.getElementById('chat-threads-list')
    if (!container) return
    container.innerHTML = ''
    for (const thread of threads) {
      const tab = document.createElement('button')
      tab.className = 'thread-tab' + (thread.id === currentThreadId ? ' active' : '')

      const title = document.createElement('span')
      title.className = 'thread-title'
      title.textContent = thread.title

      const close = document.createElement('span')
      close.className = 'thread-close'
      close.textContent = '\u00d7'
      close.addEventListener('click', async (e) => {
        e.stopPropagation()
        await deleteThread(thread.id)
        threads = threads.filter(t => t.id !== thread.id)
        if (currentThreadId === thread.id) {
          if (threads.length > 0) {
            switchThread(threads[0].id)
          } else {
            createNewThread()
          }
        } else {
          renderThreadTabs()
        }
      })

      tab.appendChild(title)
      tab.appendChild(close)
      tab.addEventListener('click', () => switchThread(thread.id))
      container.appendChild(tab)
    }
  }

  function renderThreadHistory () {
    const container = document.getElementById('chat-thread-history-list')
    if (!container) return
    container.innerHTML = ''

    for (const thread of threads) {
      const item = document.createElement('div')
      item.className = 'thread-history-item' + (thread.id === currentThreadId ? ' active' : '')

      const title = document.createElement('span')
      title.className = 'thread-history-title'
      title.textContent = thread.title

      const date = document.createElement('span')
      date.className = 'thread-history-date'
      const d = new Date(thread.updatedAt)
      date.textContent = d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

      const msgCount = document.createElement('span')
      msgCount.className = 'thread-history-date'
      msgCount.textContent = thread.messages.length + ' msg'

      const del = document.createElement('span')
      del.className = 'thread-history-delete'
      del.textContent = '\u00d7'
      del.addEventListener('click', async (e) => {
        e.stopPropagation()
        await deleteThread(thread.id)
        threads = threads.filter(t => t.id !== thread.id)
        if (currentThreadId === thread.id) {
          if (threads.length > 0) switchThread(threads[0].id)
          else createNewThread()
        }
        renderThreadHistory()
        renderThreadTabs()
      })

      item.appendChild(title)
      item.appendChild(msgCount)
      item.appendChild(date)
      item.appendChild(del)
      item.addEventListener('click', () => {
        switchThread(thread.id)
        renderThreadHistory()
        document.getElementById('chat-thread-history-panel').style.display = 'none'
      })
      container.appendChild(item)
    }
  }

  function toggleThreadHistory () {
    const panel = document.getElementById('chat-thread-history-panel')
    if (panel.style.display === 'none') {
      renderThreadHistory()
      panel.style.display = ''
    } else {
      panel.style.display = 'none'
    }
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
    document.getElementById('app').style.display = 'none'
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
    showApp(projectName)

    // Show source tab
    document.querySelector('.tab[data-tab="source"]').style.display = ''

    // Hide connect button now that we have a real connection
    updateConnectButton()

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
    showApp(projectName)

    // Hide source tab, show data tab for platform mode
    document.querySelector('.tab[data-tab="source"]').style.display = 'none'
    document.getElementById('symbols-section').style.display = 'none'

    // Hide connect button
    updateConnectButton()

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

  // Auto-connect to the page if it's a DOMQL/Symbols site
  async function tryAutoConnect () {
    try {
      const hasDomql = await pageEval('typeof window.__DOMQL_INSPECTOR__ !== "undefined"')
      if (!hasDomql) return false

      const hostname = await pageEval('window.location.hostname') || ''
      connectionMode = 'runtime'
      projectName = hostname || 'Page'

      document.getElementById('connect-screen').style.display = 'none'
      document.getElementById('connect-error').style.display = 'none'
      showApp(projectName)

      // Hide source tab in runtime mode (no files)
      document.querySelector('.tab[data-tab="source"]').style.display = 'none'

      // Show connect button in header
      updateConnectButton()

      loadTree()
      return true
    } catch (e) {
      return false
    }
  }

  function updateConnectButton () {
    let btn = document.getElementById('btn-header-connect')
    if (connectionMode === 'local' || connectionMode === 'platform') {
      if (btn) btn.style.display = 'none'
      return
    }
    if (!btn) {
      btn = document.createElement('button')
      btn.id = 'btn-header-connect'
      btn.className = 'btn-header-connect'
      btn.title = 'Connect local folder or platform to save changes'
      btn.textContent = 'Connect'
      btn.addEventListener('click', showConnectDialog)
      const spacer = document.querySelector('.mode-tab-spacer')
      if (spacer) spacer.parentNode.insertBefore(btn, spacer.nextSibling)
    }
    btn.style.display = ''
  }

  function showConnectDialog () {
    let dialog = document.getElementById('connect-dialog')
    if (dialog) { dialog.style.display = dialog.style.display === 'none' ? 'flex' : 'none'; return }

    dialog = document.createElement('div')
    dialog.id = 'connect-dialog'
    dialog.className = 'connect-dialog'

    const inner = document.createElement('div')
    inner.className = 'connect-dialog-inner'

    const title = document.createElement('div')
    title.className = 'connect-dialog-title'
    title.textContent = 'Save changes to:'

    const localBtn = document.createElement('button')
    localBtn.className = 'connect-dialog-btn'
    localBtn.textContent = 'Local Folder'
    localBtn.addEventListener('click', () => {
      dialog.style.display = 'none'
      chrome.runtime.sendMessage({ type: 'open-picker' })
      setStatus('Select a folder in the opened tab...')
    })

    const platformBtn = document.createElement('button')
    platformBtn.className = 'connect-dialog-btn'
    platformBtn.textContent = 'Platform (sign in)'
    platformBtn.addEventListener('click', () => {
      dialog.style.display = 'none'
      document.getElementById('connect-screen').style.display = 'flex'
      document.getElementById('app').style.display = 'none'
    })

    const closeBtn = document.createElement('button')
    closeBtn.className = 'connect-dialog-close'
    closeBtn.textContent = '\u00d7'
    closeBtn.addEventListener('click', () => { dialog.style.display = 'none' })

    inner.appendChild(title)
    inner.appendChild(localBtn)
    inner.appendChild(platformBtn)
    inner.appendChild(closeBtn)
    dialog.appendChild(inner)
    document.getElementById('app').appendChild(dialog)
  }

  function promptSaveConnection () {
    if (connectionMode === 'local' || connectionMode === 'platform') return false
    showConnectDialog()
    setStatus('Connect to save changes')
    return true
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
    const dropdown = document.getElementById('btn-sync-dropdown')
    if (!btn) return
    const count = pendingSyncOps.length
    if (count > 0) {
      btn.style.display = ''
      btn.textContent = 'Sync (' + count + ')'
      if (dropdown) dropdown.style.display = ''
    } else {
      btn.style.display = 'none'
      if (dropdown) dropdown.style.display = 'none'
      const panel = document.getElementById('sync-changes-panel')
      if (panel) panel.style.display = 'none'
    }
  }

  function toggleSyncChangesPanel () {
    const panel = document.getElementById('sync-changes-panel')
    if (!panel) return
    const visible = panel.style.display !== 'none'
    if (visible) {
      panel.style.display = 'none'
      return
    }
    panel.style.display = ''
    renderSyncChangesList()
  }

  function renderSyncChangesList () {
    const list = document.getElementById('sync-changes-list')
    if (!list) return
    list.innerHTML = ''

    if (pendingSyncOps.length === 0) {
      list.innerHTML = '<div class="empty-message">No pending changes</div>'
      return
    }

    for (let i = 0; i < pendingSyncOps.length; i++) {
      const op = pendingSyncOps[i]
      const row = document.createElement('div')
      row.className = 'sync-change-row'

      const path = document.createElement('span')
      path.className = 'sync-change-path'
      path.textContent = (op.elementPath || '') + '.' + op.key

      const val = document.createElement('span')
      val.className = 'sync-change-val'
      val.textContent = typeof op.value === 'string' ? op.value : JSON.stringify(op.value)

      const removeBtn = document.createElement('button')
      removeBtn.className = 'sync-change-remove'
      removeBtn.textContent = '\u00d7'
      removeBtn.title = 'Remove this change'
      removeBtn.addEventListener('click', () => {
        pendingSyncOps.splice(i, 1)
        updateSyncButton()
        renderSyncChangesList()
      })

      row.appendChild(path)
      row.appendChild(val)
      row.appendChild(removeBtn)
      list.appendChild(row)
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
        // Pre-cache design system for autocomplete
        if (!cachedDesignSystem) {
          fetchRuntimeDesignSystem().then(ds => {
            if (ds && Object.keys(ds).length > 0) cachedDesignSystem = ds
          })
        }
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
    updateChatContextLabel()

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

    // Update selected highlight in state tree without full re-render
    if (document.querySelector('.tree-pane-tab[data-tree="state"]')?.classList.contains('active')) {
      document.querySelectorAll('#state-tree-container .tree-item.selected').forEach(el => el.classList.remove('selected'))
      if (selectedPath) {
        document.querySelectorAll('#state-tree-container .tree-item').forEach(el => {
          if (el.dataset.statePath === selectedPath) el.classList.add('selected')
        })
      }
    }

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
      panel.appendChild(createAddButton('state'))
    } else {
      // State values first
      for (const [key, val] of Object.entries(selectedInfo.state)) {
        panel.appendChild(createPropRow(key, val, 'state'))
      }

      // Add new state button
      panel.appendChild(createAddButton('state'))
    }

    // State methods at bottom
    if (selectedInfo.stateMethods && selectedInfo.stateMethods.length) {
      const header = document.createElement('div')
      header.className = 'section-header'
      header.textContent = 'State Methods'
      header.style.marginTop = '8px'
      panel.appendChild(header)

      for (const method of selectedInfo.stateMethods) {
        panel.appendChild(createMethodRow(method, 'state'))
      }
    }
  }

  function renderPropsTab () {
    const panel = document.getElementById('tab-props')

    // Preserve sub-tabs structure
    const subtabs = panel.querySelector('#props-subtabs')
    const computedPanel = panel.querySelector('#props-computed')
    const originalPanel = panel.querySelector('#props-original')

    if (!subtabs || !computedPanel || !originalPanel) {
      // Fallback: rebuild structure
      panel.innerHTML = ''
      const st = document.createElement('div')
      st.id = 'props-subtabs'
      st.innerHTML = '<button class="props-subtab active" data-propview="computed">Computed</button>' +
        '<button class="props-subtab" data-propview="original">Original</button>'
      const cp = document.createElement('div')
      cp.id = 'props-computed'
      cp.className = 'props-subpanel active'
      const op = document.createElement('div')
      op.id = 'props-original'
      op.className = 'props-subpanel'
      panel.appendChild(st)
      panel.appendChild(cp)
      panel.appendChild(op)
      initPropsSubtabs()
      renderPropsTab()
      return
    }

    computedPanel.innerHTML = ''
    originalPanel.innerHTML = ''

    const funcProps = selectedInfo.functionProps || {}
    const hasProps = selectedInfo.props && Object.keys(selectedInfo.props).length > 0
    const hasOriginal = selectedInfo.originalProps && Object.keys(selectedInfo.originalProps).length > 0

    // --- Computed view ---
    if (!hasProps) {
      computedPanel.innerHTML = '<div class="empty-message">No computed props</div>'
    } else {
      const origins = selectedInfo.propsOrigin || {}
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
          computedPanel.appendChild(header)
        }

        for (const { key, val } of groups[source]) {
          const isFunc = key in funcProps
          const row = createPropRow(key, val, 'prop', source, filePath)
          if (isFunc) {
            row.classList.add('is-function')
            // Add function badge
            const badge = document.createElement('span')
            badge.className = 'prop-fn-badge'
            badge.textContent = 'f()'
            badge.title = 'Dynamic value from: ' + (funcProps[key].name || 'function')
            row.querySelector('.prop-key').appendChild(badge)

            // Replace click handler — show tooltip instead of editing
            const valEl = row.querySelector('.prop-value')
            if (valEl) {
              valEl.replaceWith(valEl.cloneNode(true))
              const newValEl = row.querySelector('.prop-value')
              newValEl.classList.remove('editable')
              newValEl.addEventListener('click', () => {
                // Remove existing tooltips
                row.parentElement?.querySelectorAll('.prop-fn-tooltip').forEach(t => t.remove())
                const tip = document.createElement('div')
                tip.className = 'prop-fn-tooltip'
                tip.textContent = 'This value is computed by a function (' + (funcProps[key].name || 'anonymous') +
                  '). Edit the source code to change it.'
                row.after(tip)
                setTimeout(() => tip.remove(), 4000)
              })
            }
          }
          computedPanel.appendChild(row)
        }
      }
    }
    computedPanel.appendChild(createAddButton('prop'))

    // Element methods at bottom of computed panel
    if (selectedInfo.methods && selectedInfo.methods.length > 0) {
      const methodsHeader = document.createElement('div')
      methodsHeader.className = 'section-header'
      methodsHeader.textContent = 'Methods'
      methodsHeader.style.marginTop = '8px'
      computedPanel.appendChild(methodsHeader)
      for (const method of selectedInfo.methods) {
        computedPanel.appendChild(createMethodRow(method, 'element'))
      }
    }

    // Save to files button
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
        computedPanel.appendChild(saveBar)
      }
    }

    // --- Original view ---
    if (!hasOriginal) {
      originalPanel.innerHTML = '<div class="empty-message">No original definition props found. Connect a local folder or platform to recognize original props.</div>'
    } else {
      for (const [key, val] of Object.entries(selectedInfo.originalProps)) {
        const isFunc = key in funcProps
        const row = createPropRow(key, val, 'prop')
        if (isFunc) {
          row.classList.add('is-function')
          const badge = document.createElement('span')
          badge.className = 'prop-fn-badge'
          badge.textContent = 'f() \u2192 ' + (funcProps[key].name || '')
          row.querySelector('.prop-key').appendChild(badge)
          // Original function props: clicking shows the computed result
          const valEl = row.querySelector('.prop-value')
          if (valEl) {
            valEl.replaceWith(valEl.cloneNode(true))
            const newValEl = row.querySelector('.prop-value')
            newValEl.classList.remove('editable')
            newValEl.addEventListener('click', () => {
              row.parentElement?.querySelectorAll('.prop-fn-tooltip').forEach(t => t.remove())
              const tip = document.createElement('div')
              tip.className = 'prop-fn-tooltip'
              const computedVal = selectedInfo.props && selectedInfo.props[key]
              tip.textContent = 'Rendered by function. Current value: ' +
                (computedVal !== undefined ? JSON.stringify(computedVal) : '(none)')
              row.after(tip)
              setTimeout(() => tip.remove(), 4000)
            })
          }
        }
        originalPanel.appendChild(row)
      }

      // Show function-only props (defined as functions but not in originalProps)
      for (const [key, fn] of Object.entries(funcProps)) {
        if (key in (selectedInfo.originalProps || {})) continue
        const computedVal = selectedInfo.props ? selectedInfo.props[key] : undefined
        const row = createPropRow(key, computedVal !== undefined ? computedVal : '(dynamic)', 'prop')
        row.classList.add('is-function')
        const badge = document.createElement('span')
        badge.className = 'prop-fn-badge'
        badge.textContent = 'f() ' + (fn.name || '')
        row.querySelector('.prop-key').appendChild(badge)
        const valEl = row.querySelector('.prop-value')
        if (valEl) {
          valEl.replaceWith(valEl.cloneNode(true))
          const newValEl = row.querySelector('.prop-value')
          newValEl.classList.remove('editable')
          newValEl.addEventListener('click', () => {
            row.parentElement?.querySelectorAll('.prop-fn-tooltip').forEach(t => t.remove())
            const tip = document.createElement('div')
            tip.className = 'prop-fn-tooltip'
            tip.textContent = 'Dynamic value from: ' + (fn.name || 'anonymous function') +
              '. Edit the source code to change this.'
            row.after(tip)
            setTimeout(() => tip.remove(), 4000)
          })
        }
        originalPanel.appendChild(row)
      }
    }
    originalPanel.appendChild(createAddButton('prop'))
  }

  function initPropsSubtabs () {
    document.querySelectorAll('.props-subtab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.props-subtab').forEach(b => b.classList.remove('active'))
        document.querySelectorAll('.props-subpanel').forEach(p => p.classList.remove('active'))
        btn.classList.add('active')
        const target = btn.dataset.propview === 'original' ? 'props-original' : 'props-computed'
        document.getElementById(target).classList.add('active')
      })
    })
  }

  function createPropRow (key, val, type, componentName, filePath) {
    const row = document.createElement('div')
    row.className = 'prop-row'
    row.dataset.propKey = key
    row.dataset.propType = type

    // Checkbox to disable/enable prop (like CSS DevTools)
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = true
    checkbox.className = 'prop-checkbox'
    checkbox.title = 'Toggle property'
    checkbox.addEventListener('change', async () => {
      row.classList.toggle('prop-disabled', !checkbox.checked)
      if (checkbox.checked) {
        // Re-enable: set value back
        const expr = type === 'state'
          ? 'JSON.stringify(window.__DOMQL_INSPECTOR__.updateState(' +
            JSON.stringify(selectedPath) + ',' + JSON.stringify(key) + ',' + JSON.stringify(val) + '))'
          : 'JSON.stringify(window.__DOMQL_INSPECTOR__.updateProp(' +
            JSON.stringify(selectedPath) + ',' + JSON.stringify(key) + ',' + JSON.stringify(val) + '))'
        await pageEval(expr).catch(() => {})
        setStatus('Enabled ' + key)
      } else {
        // Disable: set to undefined/remove
        const expr = type === 'state'
          ? 'JSON.stringify(window.__DOMQL_INSPECTOR__.updateState(' +
            JSON.stringify(selectedPath) + ',' + JSON.stringify(key) + ',undefined))'
          : 'JSON.stringify(window.__DOMQL_INSPECTOR__.updateProp(' +
            JSON.stringify(selectedPath) + ',' + JSON.stringify(key) + ',undefined))'
        await pageEval(expr).catch(() => {})
        setStatus('Disabled ' + key)
      }
    })
    row.appendChild(checkbox)

    const keyEl = document.createElement('span')
    keyEl.className = 'prop-key'
    keyEl.textContent = key

    if (filePath && connectionMode === 'local') {
      keyEl.classList.add('has-source')
      keyEl.title = filePath
      keyEl.addEventListener('click', (e) => {
        e.stopPropagation()
        showPropertySource(filePath, componentName, key)
      })
    }

    const colonEl = document.createElement('span')
    colonEl.className = 'prop-colon'
    colonEl.textContent = ':'

    const valEl = document.createElement('span')
    valEl.className = 'prop-value editable'
    valEl.dataset.propKey = key
    valEl.dataset.propType = type
    valEl.dataset.component = componentName || ''
    valEl.appendChild(renderValue(val))

    if (isComplex(val)) {
      // Object/array — use structured editor on click
      valEl.addEventListener('click', (e) => {
        e.stopPropagation()
        startObjectEditing(valEl, key, val, type, componentName)
      })
    } else {
      const editableVal = isEditableValue(val) ? val : stringifyForEdit(val)
      valEl.addEventListener('click', () => startEditing(valEl, key, editableVal, type, componentName))
    }

    // Number arrows (like CSS DevTools)
    const isNum = typeof val === 'number' || (typeof val === 'string' && /^-?\d+(\.\d+)?(px|em|rem|%|vh|vw|ms|s)?$/.test(val))
    if (isNum && !isComplex(val)) {
      const arrows = document.createElement('span')
      arrows.className = 'prop-num-arrows'
      const upBtn = document.createElement('button')
      upBtn.className = 'prop-num-arrow up'
      upBtn.textContent = '\u25B2'
      upBtn.title = 'Increment'
      const downBtn = document.createElement('button')
      downBtn.className = 'prop-num-arrow down'
      downBtn.textContent = '\u25BC'
      downBtn.title = 'Decrement'

      const nudge = async (delta) => {
        const current = typeof val === 'number' ? val : parseFloat(val)
        const unit = typeof val === 'string' ? val.replace(/^-?\d+(\.\d+)?/, '') : ''
        const newNum = current + delta
        const newVal = unit ? String(newNum) + unit : newNum
        val = newVal
        valEl.innerHTML = ''
        valEl.appendChild(renderValue(newVal))
        // Reattach click
        if (!isComplex(newVal)) {
          valEl.addEventListener('click', () => startEditing(valEl, key, newVal, type, componentName))
        }
        const expr = type === 'state'
          ? 'JSON.stringify(window.__DOMQL_INSPECTOR__.updateState(' +
            JSON.stringify(selectedPath) + ',' + JSON.stringify(key) + ',' + JSON.stringify(newVal) + '))'
          : 'JSON.stringify(window.__DOMQL_INSPECTOR__.updateProp(' +
            JSON.stringify(selectedPath) + ',' + JSON.stringify(key) + ',' + JSON.stringify(newVal) + '))'
        await pageEval(expr).catch(() => {})
      }
      upBtn.addEventListener('click', (e) => { e.stopPropagation(); nudge(1) })
      downBtn.addEventListener('click', (e) => { e.stopPropagation(); nudge(-1) })
      arrows.appendChild(upBtn)
      arrows.appendChild(downBtn)

      const semiEl = document.createElement('span')
      semiEl.className = 'prop-semi'
      semiEl.textContent = ';'

      row.appendChild(keyEl)
      row.appendChild(colonEl)
      row.appendChild(valEl)
      row.appendChild(arrows)
      row.appendChild(semiEl)
      return row
    }

    const semiEl = document.createElement('span')
    semiEl.className = 'prop-semi'
    semiEl.textContent = ';'

    row.appendChild(keyEl)
    row.appendChild(colonEl)
    row.appendChild(valEl)
    row.appendChild(semiEl)
    return row
  }

  // All known prop keys for autocomplete
  const KNOWN_PROP_KEYS = [
    // Layout
    'display', 'position', 'overflow', 'overflowX', 'overflowY', 'visibility',
    'flex', 'flexDirection', 'flexWrap', 'flexGrow', 'flexShrink', 'flexBasis',
    'alignItems', 'alignContent', 'alignSelf', 'justifyContent', 'justifyItems', 'justifySelf',
    'flow', 'wrap', 'order',
    // Spacing
    'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
    'paddingInline', 'paddingBlock',
    'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
    'marginInline', 'marginBlock',
    'gap', 'rowGap', 'columnGap',
    // Size
    'width', 'height', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight', 'boxSize',
    // Position
    'top', 'right', 'bottom', 'left', 'inset', 'zIndex',
    // Color
    'color', 'background', 'backgroundColor', 'borderColor', 'fill', 'stroke',
    'opacity',
    // Typography
    'fontSize', 'fontFamily', 'fontWeight', 'fontStyle', 'lineHeight', 'letterSpacing',
    'textAlign', 'textDecoration', 'textTransform', 'textOverflow', 'whiteSpace', 'wordBreak',
    // Border
    'border', 'borderWidth', 'borderStyle', 'borderRadius', 'round',
    'borderTop', 'borderRight', 'borderBottom', 'borderLeft',
    // Effects
    'boxShadow', 'transition', 'transform', 'animation', 'cursor', 'pointerEvents',
    'userSelect', 'outline', 'outlineColor', 'outlineWidth', 'outlineOffset',
    // Background
    'backgroundImage', 'backgroundSize', 'backgroundRepeat', 'backgroundPosition', 'backgroundClip',
    // Grid
    'gridTemplate', 'gridTemplateColumns', 'gridTemplateRows', 'gridColumn', 'gridRow',
    'gridArea', 'gridGap',
    // DOMQL specific
    'tag', 'text', 'html', 'theme', 'scope', 'if', 'content',
    'src', 'href', 'placeholder', 'type', 'value', 'title', 'alt',
    'childExtend', 'childProps', 'extend', 'props',
    // Other
    'objectFit', 'objectPosition', 'resize', 'appearance', 'boxSizing',
    'willChange', 'verticalAlign', 'mixBlendMode', 'backdropFilter', 'filter'
  ]

  function createAddButton (type) {
    const wrap = document.createElement('div')
    wrap.className = 'prop-add-row'
    const btn = document.createElement('button')
    btn.className = 'prop-add-btn'
    btn.textContent = '+ Add ' + (type === 'state' ? 'state' : 'property')
    btn.addEventListener('click', () => {
      // Replace button with inline key:value editor
      wrap.innerHTML = ''
      const row = document.createElement('div')
      row.className = 'prop-row prop-add-inline'

      const keyInput = document.createElement('input')
      keyInput.className = 'prop-edit-input'
      keyInput.placeholder = 'key'
      keyInput.style.width = '80px'
      keyInput.style.flexShrink = '0'

      const colonEl = document.createElement('span')
      colonEl.className = 'prop-colon'
      colonEl.textContent = ':'

      const valInput = document.createElement('input')
      valInput.className = 'prop-edit-input'
      valInput.placeholder = 'value'

      const semiEl = document.createElement('span')
      semiEl.className = 'prop-semi'
      semiEl.textContent = ';'

      row.appendChild(keyInput)
      row.appendChild(colonEl)
      row.appendChild(valInput)
      row.appendChild(semiEl)
      wrap.appendChild(row)

      // Key autocomplete dropdown
      const keyDropdown = document.createElement('div')
      keyDropdown.className = 'prop-dropdown'
      keyDropdown.style.display = 'none'
      row.appendChild(keyDropdown)

      // Value autocomplete dropdown
      const valDropdown = document.createElement('div')
      valDropdown.className = 'prop-dropdown'
      valDropdown.style.display = 'none'
      row.appendChild(valDropdown)

      let keyFiltered = []
      let keyActiveIdx = -1
      let valFiltered = []
      let valActiveIdx = -1
      let activeDropdown = null

      function showKeyDropdown () {
        activeDropdown = 'key'
        valDropdown.style.display = 'none'
        const text = keyInput.value.toLowerCase()
        // Exclude props that already exist
        const existing = selectedInfo ? Object.keys(selectedInfo.props || {}) : []
        keyFiltered = KNOWN_PROP_KEYS
          .filter(k => !existing.includes(k) && (text ? k.toLowerCase().includes(text) : true))
          .slice(0, 20)
          .map(k => ({ label: k }))
        keyActiveIdx = -1
        renderKeyDD()
      }

      function renderKeyDD () {
        keyDropdown.innerHTML = ''
        if (keyFiltered.length === 0) { keyDropdown.style.display = 'none'; return }
        keyDropdown.style.display = ''
        for (let i = 0; i < keyFiltered.length; i++) {
          const item = document.createElement('div')
          item.className = 'prop-dropdown-item' + (i === keyActiveIdx ? ' active' : '')
          item.textContent = keyFiltered[i].label
          item.addEventListener('mousedown', (e) => {
            e.preventDefault()
            keyInput.value = keyFiltered[i].label
            keyDropdown.style.display = 'none'
            valInput.focus()
            showValDropdown()
          })
          keyDropdown.appendChild(item)
        }
      }

      function showValDropdown () {
        activeDropdown = 'val'
        keyDropdown.style.display = 'none'
        const propName = keyInput.value.trim()
        const allSuggestions = getSuggestionsForProp(propName) || []
        const text = valInput.value.toLowerCase()
        valFiltered = text
          ? allSuggestions.filter(s => s.label.toLowerCase().includes(text)).slice(0, 20)
          : allSuggestions.slice(0, 20)
        valActiveIdx = -1
        renderValDD()
      }

      function renderValDD () {
        valDropdown.innerHTML = ''
        if (valFiltered.length === 0) { valDropdown.style.display = 'none'; return }
        valDropdown.style.display = ''
        for (let i = 0; i < valFiltered.length; i++) {
          const s = valFiltered[i]
          const item = document.createElement('div')
          item.className = 'prop-dropdown-item' + (i === valActiveIdx ? ' active' : '')
          if (s.hex !== undefined) {
            const sw = document.createElement('span')
            sw.className = 'dd-swatch'
            sw.style.background = s.hex || '#555'
            item.appendChild(sw)
          }
          const label = document.createElement('span')
          label.textContent = s.label
          item.appendChild(label)
          if (s.hint) {
            const hint = document.createElement('span')
            hint.className = 'dd-hint'
            hint.textContent = s.hint
            item.appendChild(hint)
          }
          item.addEventListener('mousedown', (e) => {
            e.preventDefault()
            valInput.value = s.label
            valDropdown.style.display = 'none'
          })
          valDropdown.appendChild(item)
        }
      }

      keyInput.addEventListener('input', showKeyDropdown)
      keyInput.addEventListener('focus', showKeyDropdown)
      keyInput.addEventListener('blur', () => setTimeout(() => { keyDropdown.style.display = 'none' }, 150))

      valInput.addEventListener('input', showValDropdown)
      valInput.addEventListener('focus', showValDropdown)
      valInput.addEventListener('blur', () => setTimeout(() => { valDropdown.style.display = 'none' }, 150))

      keyInput.focus()
      showKeyDropdown()

      const commit = async () => {
        const key = keyInput.value.trim()
        const rawVal = valInput.value.trim()
        if (!key || !rawVal) {
          renderDetail()
          return
        }
        let val = rawVal
        if (val === 'true') val = true
        else if (val === 'false') val = false
        else if (val === 'null') val = null
        else if (/^-?\d+(\.\d+)?$/.test(val)) val = parseFloat(val)
        else {
          try { val = JSON.parse(val) } catch (e) { /* keep as string */ }
        }

        if (type === 'state') {
          await pageEval('JSON.stringify(window.__DOMQL_INSPECTOR__.updateState(' +
            JSON.stringify(selectedPath) + ',' + JSON.stringify(key) + ',' + JSON.stringify(val) + '))')
        } else {
          await pageEval('JSON.stringify(window.__DOMQL_INSPECTOR__.updateProp(' +
            JSON.stringify(selectedPath) + ',' + JSON.stringify(key) + ',' + JSON.stringify(val) + '))')
        }
        await selectElement(selectedPath)
      }

      valInput.addEventListener('keydown', (e) => {
        if (activeDropdown === 'val' && valFiltered.length > 0) {
          if (e.key === 'ArrowDown') { e.preventDefault(); valActiveIdx = Math.min(valActiveIdx + 1, valFiltered.length - 1); renderValDD(); return }
          if (e.key === 'ArrowUp') { e.preventDefault(); valActiveIdx = Math.max(valActiveIdx - 1, 0); renderValDD(); return }
          if (e.key === 'Enter' && valActiveIdx >= 0) { e.preventDefault(); valInput.value = valFiltered[valActiveIdx].label; valDropdown.style.display = 'none'; commit(); return }
        }
        if (e.key === 'Enter') commit()
        if (e.key === 'Escape') renderDetail()
      })
      keyInput.addEventListener('keydown', (e) => {
        if (activeDropdown === 'key' && keyFiltered.length > 0) {
          if (e.key === 'ArrowDown') { e.preventDefault(); keyActiveIdx = Math.min(keyActiveIdx + 1, keyFiltered.length - 1); renderKeyDD(); return }
          if (e.key === 'ArrowUp') { e.preventDefault(); keyActiveIdx = Math.max(keyActiveIdx - 1, 0); renderKeyDD(); return }
          if ((e.key === 'Enter' || e.key === 'Tab') && keyActiveIdx >= 0) {
            e.preventDefault()
            keyInput.value = keyFiltered[keyActiveIdx].label
            keyDropdown.style.display = 'none'
            valInput.focus()
            showValDropdown()
            return
          }
        }
        if (e.key === 'Enter' || e.key === 'Tab') {
          e.preventDefault()
          valInput.focus()
          showValDropdown()
        }
        if (e.key === 'Escape') renderDetail()
      })
    })
    wrap.appendChild(btn)
    return wrap
  }

  // State tree in left pane — walks the actual DOMQL element tree
  // using findRoot(), showing each element's state with hierarchy
  async function renderStateTree () {
    const container = document.getElementById('state-tree-container')
    container.innerHTML = ''

    try {
      const raw = await pageEval(`(function(){
        var SKIP_STATE = {parent:1,root:1,update:1,set:1,reset:1,replace:1,
          toggle:1,remove:1,add:1,apply:1,setByPath:1,parse:1,clean:1,
          destroy:1,create:1,quietUpdate:1,__element:1,__depends:1,__ref:1};
        var SKIP_EL = {__ref:1,node:1,parent:1,context:1,__element:1,
          state:1,props:1,tag:1,text:1,key:1,extend:1,extends:1,
          childExtend:1,childExtends:1,childExtendRecursive:1,on:1,
          attr:1,style:1,html:1,data:1,classlist:1,scope:1,if:1,
          define:1,query:1,variables:1,component:1,update:1,set:1,
          reset:1,remove:1,setProps:1,lookup:1,lookdown:1,lookdownAll:1,
          nextElement:1,previousElement:1,updateContent:1,removeContent:1,
          getRootState:1,getRootData:1,getRoot:1,getContext:1,
          setNodeStyles:1,call:1,parse:1,keys:1,verbose:1,getRef:1,
          getPath:1,children:1};
        var seen = new WeakSet();

        function serializeVal(v, d) {
          if (d > 3) return {__type:'truncated'};
          if (v === null) return null;
          if (v === undefined) return {__type:'undefined'};
          if (typeof v === 'function') return {__type:'function',name:v.name||''};
          if (typeof v !== 'object') return v;
          if (v.node) return {__type:'node',key:v.key||'',tag:v.tag||''};
          if (seen.has(v)) return {__type:'circular'};
          seen.add(v);
          if (Array.isArray(v)) return v.slice(0,20).map(function(x){return serializeVal(x,d+1)});
          var o = {};
          var ks = Object.keys(v).slice(0,30);
          for (var i=0;i<ks.length;i++) {
            if (!SKIP_STATE[ks[i]] && !ks[i].startsWith('__'))
              o[ks[i]] = serializeVal(v[ks[i]],d+1);
          }
          return o;
        }

        function getStateData(state) {
          if (!state || typeof state !== 'object') return null;
          var data = {};
          var has = false;
          for (var k in state) {
            if (SKIP_STATE[k] || k.startsWith('__')) continue;
            if (typeof state[k] === 'function') continue;
            var v = state[k];
            if (v && typeof v === 'object' && v.node) continue;
            // Skip if it's a child state object (has parent ref)
            if (v && typeof v === 'object' && v.parent === state) continue;
            data[k] = serializeVal(v, 0);
            has = true;
          }
          return has ? data : null;
        }

        function walk(el, path, depth, parentState) {
          if (depth > 8 || !el || !el.node) return null;
          var key = el.key || path.split('.').pop() || 'root';
          var st = el.state;
          var hasOwnState = st && st !== parentState;

          // Collect children that have state boundaries
          var stateChildren = [];
          var childKeys = (el.__ref && el.__ref.__children) || [];
          var visited = {};
          for (var ci = 0; ci < childKeys.length; ci++) {
            var ck = childKeys[ci];
            if (ck.startsWith('__') || visited[ck]) continue;
            visited[ck] = true;
            if (el[ck] && el[ck].node) {
              var results = collectStateNodes(el[ck], path ? path+'.'+ck : ck, depth+1, st);
              for (var ri = 0; ri < results.length; ri++) stateChildren.push(results[ri]);
            }
          }
          for (var k in el) {
            if (SKIP_EL[k] || k.startsWith('__') || visited[k]) continue;
            if (typeof el[k] === 'object' && el[k] && el[k].node instanceof HTMLElement && el[k].key) {
              visited[k] = true;
              var results2 = collectStateNodes(el[k], path ? path+'.'+k : k, depth+1, st);
              for (var r2 = 0; r2 < results2.length; r2++) stateChildren.push(results2[r2]);
            }
          }

          // Only create a node if this element has its own state or is root
          if (hasOwnState || depth === 0) {
            var node = { key: key, path: path, hasOwnState: hasOwnState };
            node.state = hasOwnState && st ? getStateData(st) : null;
            node.children = stateChildren;
            return node;
          }
          return null;
        }

        // Collect nodes that have their own state (skip elements that just inherit)
        function collectStateNodes(el, path, depth, parentState) {
          if (depth > 8 || !el || !el.node) return [];
          var st = el.state;
          var hasOwnState = st && st !== parentState;
          var result = [];

          if (hasOwnState) {
            var node = walk(el, path, depth, parentState);
            if (node) result.push(node);
          } else {
            // This element inherits state — skip it but check its children
            var childKeys = (el.__ref && el.__ref.__children) || [];
            var visited = {};
            for (var ci = 0; ci < childKeys.length; ci++) {
              var ck = childKeys[ci];
              if (ck.startsWith('__') || visited[ck]) continue;
              visited[ck] = true;
              if (el[ck] && el[ck].node) {
                var sub = collectStateNodes(el[ck], path ? path+'.'+ck : ck, depth+1, st);
                for (var si = 0; si < sub.length; si++) result.push(sub[si]);
              }
            }
            for (var k in el) {
              if (SKIP_EL[k] || k.startsWith('__') || visited[k]) continue;
              if (typeof el[k] === 'object' && el[k] && el[k].node instanceof HTMLElement && el[k].key) {
                visited[k] = true;
                var sub2 = collectStateNodes(el[k], path ? path+'.'+k : k, depth+1, st);
                for (var s2 = 0; s2 < sub2.length; s2++) result.push(sub2[s2]);
              }
            }
          }
          return result;
        }

        try {
          var root = window.__DOMQL_INSPECTOR__.findRoot();
          if (!root) return 'null';
          // Also get root state summary
          var rootState = null;
          if (root.state) rootState = getStateData(root.state);
          var tree = walk(root, root.key || '', 0, null);
          if (tree) tree.rootState = rootState;
          return JSON.stringify(tree);
        } catch(e) { return JSON.stringify({error:e.message}) }
      })()`)

      if (!raw || raw === 'null') {
        container.innerHTML = '<div class="empty-message">No state tree available</div>'
        return
      }

      const stateTree = JSON.parse(raw)
      if (stateTree.error) {
        container.innerHTML = '<div class="empty-message">Error: ' + escapeHtml(stateTree.error) + '</div>'
        return
      }

      renderStateTreeNode(container, stateTree, 0)
    } catch (e) {
      container.innerHTML = '<div class="empty-message">Error loading state tree</div>'
    }
  }

  function renderStateTreeNode (container, node, depth) {
    if (!node || depth > 8) return

    const hasState = node.state && Object.keys(node.state).length > 0
    const hasChildren = node.children && node.children.length > 0
    const isSelected = selectedPath && node.path === selectedPath

    // Element row
    const item = document.createElement('div')
    item.className = 'tree-item' + (isSelected ? ' selected' : '')
    item.style.paddingLeft = (8 + depth * 14) + 'px'
    if (node.path) item.dataset.statePath = node.path

    const arrow = document.createElement('span')
    arrow.className = 'tree-arrow'
    arrow.textContent = (hasState || hasChildren) ? '\u25B6' : ' '

    const label = document.createElement('span')
    label.className = 'tree-label'
    label.innerHTML = '<span class="state-tree-key">' + escapeHtml(node.key) + '</span>'

    if (hasState) {
      const badge = document.createElement('span')
      badge.className = 'state-tree-badge'
      badge.textContent = Object.keys(node.state).length
      label.appendChild(badge)
    }

    item.appendChild(arrow)
    item.appendChild(label)

    // Click element name to select it in the main tree
    label.style.cursor = 'pointer'
    label.addEventListener('click', (e) => {
      e.stopPropagation()
      if (node.path) {
        // Update selected highlight locally without re-rendering tree
        document.querySelectorAll('#state-tree-container .tree-item.selected').forEach(el => el.classList.remove('selected'))
        item.classList.add('selected')
        selectElement(node.path)
        highlightElement(node.path)
      }
    })

    container.appendChild(item)

    // Expandable content: state values + children
    if (hasState || hasChildren) {
      let expanded = isSelected // auto-expand selected
      const inner = document.createElement('div')
      inner.style.display = expanded ? 'block' : 'none'

      if (expanded) arrow.textContent = '\u25BC'

      // Render own state values
      if (hasState) {
        for (const [key, val] of Object.entries(node.state)) {
          const row = document.createElement('div')
          row.className = 'tree-item state-tree-value'
          row.style.paddingLeft = (22 + depth * 14) + 'px'

          const valStr = formatStateValue(val)
          const valClass = getValueClass(val)
          row.innerHTML = '<span class="prop-key">' + escapeHtml(key) + '</span>' +
            '<span class="prop-colon">: </span>' +
            '<span class="' + valClass + '">' + escapeHtml(valStr) + '</span>'

          // Click to select element and show state tab
          row.style.cursor = 'pointer'
          row.addEventListener('click', (e) => {
            e.stopPropagation()
            if (node.path) {
              // Update selected highlight locally
              document.querySelectorAll('#state-tree-container .tree-item.selected').forEach(el => el.classList.remove('selected'))
              item.classList.add('selected')
              selectElement(node.path).then(() => switchToTab('state'))
            }
          })

          inner.appendChild(row)
        }
      }

      // Render children
      if (hasChildren) {
        for (const child of node.children) {
          renderStateTreeNode(inner, child, depth + 1)
        }
      }

      container.appendChild(inner)

      arrow.style.cursor = 'pointer'
      arrow.addEventListener('click', (e) => {
        e.stopPropagation()
        expanded = !expanded
        arrow.textContent = expanded ? '\u25BC' : '\u25B6'
        inner.style.display = expanded ? 'block' : 'none'
      })
    }
  }

  function formatStateValue (val) {
    if (val === null) return 'null'
    if (val === undefined || (val && val.__type === 'undefined')) return 'undefined'
    if (val && val.__type === 'function') return 'f ' + (val.name || '') + '()'
    if (val && val.__type === 'truncated') return '[...]'
    if (val && val.__type === 'node') return '<' + val.tag + (val.key ? ' ' + val.key : '') + '>'
    if (typeof val === 'string') return '"' + val + '"'
    if (typeof val === 'number' || typeof val === 'boolean') return String(val)
    if (Array.isArray(val)) return '[' + val.length + ' items]'
    if (typeof val === 'object') return '{' + Object.keys(val).length + ' keys}'
    return String(val)
  }

  function getValueClass (val) {
    if (typeof val === 'string') return 'v-string'
    if (typeof val === 'number') return 'v-number'
    if (typeof val === 'boolean') return 'v-boolean'
    return 'v-null'
  }

  // Check if value can be directly edited as text
  function isEditableValue (val) {
    return val === null || typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean'
  }

  // Check if value is a complex type (object/array) that needs structured editing
  function isComplex (val) {
    if (val === null || val === undefined) return false
    if (typeof val !== 'object') return false
    if (val.__type) return false // serialization markers
    return true
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

  // ============================================================
  // Design System tab
  // ============================================================
  async function fetchRuntimeDesignSystem () {
    try {
      const raw = await pageEval(`(function(){
        var I = window.__DOMQL_INSPECTOR__;
        if (!I) return 'null';
        var ds = I.getDesignSystem();
        if (ds) return JSON.stringify(ds);
        var root = I.findRoot();
        if (root) {
          function findDS(el, depth) {
            if (depth > 4 || !el) return null;
            if (el.context && el.context.designSystem) return el;
            for (var k in el) {
              if (k === 'parent' || k === 'node' || k === 'context' || k === 'state' || k.startsWith('__')) continue;
              if (el[k] && typeof el[k] === 'object' && el[k].node) {
                var found = findDS(el[k], depth + 1);
                if (found) return found;
              }
            }
            return null;
          }
          var elWithDS = findDS(root, 0);
          if (elWithDS) {
            ds = I.getDesignSystem(elWithDS);
            if (ds) return JSON.stringify(ds);
          }
        }
        return 'null';
      })()`)
      if (raw && raw !== 'null') return JSON.parse(raw)
    } catch (e) { /* ignore */ }
    return null
  }

  async function renderDesignSystem () {
    const container = document.getElementById('design-system-container')
    container.innerHTML = ''

    // Build sub-tabs: Original / Computed
    const subtabs = document.createElement('div')
    subtabs.id = 'ds-subtabs'
    subtabs.innerHTML = '<button class="props-subtab active" data-dsview="original">Original</button>' +
      '<button class="props-subtab" data-dsview="computed">Computed</button>'

    const originalPanel = document.createElement('div')
    originalPanel.id = 'ds-original'
    originalPanel.className = 'props-subpanel active'

    const computedPanel = document.createElement('div')
    computedPanel.id = 'ds-computed'
    computedPanel.className = 'props-subpanel'

    container.appendChild(subtabs)
    container.appendChild(originalPanel)
    container.appendChild(computedPanel)

    // Wire sub-tab switching
    subtabs.querySelectorAll('.props-subtab').forEach(btn => {
      btn.addEventListener('click', () => {
        subtabs.querySelectorAll('.props-subtab').forEach(b => b.classList.remove('active'))
        btn.classList.add('active')
        originalPanel.classList.toggle('active', btn.dataset.dsview === 'original')
        computedPanel.classList.toggle('active', btn.dataset.dsview === 'computed')
      })
    })

    // --- Original (from source files) ---
    const originalDS = buildDesignSystemFromFiles()
    if (originalDS && Object.keys(originalDS).length > 0) {
      cachedDesignSystem = originalDS
      renderDesignSystemContent(originalPanel, originalDS, true)
    } else {
      originalPanel.innerHTML = '<div class="empty-message">No source files found. Connect a local folder or platform to view original design system.</div>'
    }

    // --- Computed (from runtime) ---
    const runtimeDS = await fetchRuntimeDesignSystem()
    if (runtimeDS && Object.keys(runtimeDS).length > 0) {
      if (!cachedDesignSystem) cachedDesignSystem = runtimeDS
      renderDesignSystemContent(computedPanel, runtimeDS, false)
    } else {
      if (!renderDesignSystem._retried) {
        renderDesignSystem._retried = true
        computedPanel.innerHTML = '<div class="empty-message">Loading...</div>'
        setTimeout(async () => {
          const ds = await fetchRuntimeDesignSystem()
          renderDesignSystem._retried = false
          if (ds && Object.keys(ds).length > 0) {
            if (!cachedDesignSystem) cachedDesignSystem = ds
            computedPanel.innerHTML = ''
            renderDesignSystemContent(computedPanel, ds, false)
          } else {
            computedPanel.innerHTML = '<div class="empty-message">Design system is empty at runtime</div>'
          }
        }, 2000)
      } else {
        renderDesignSystem._retried = false
        computedPanel.innerHTML = '<div class="empty-message">Design system is empty at runtime</div>'
      }
    }

    // If no original but we have computed, default to computed tab
    if ((!originalDS || Object.keys(originalDS).length === 0) && runtimeDS && Object.keys(runtimeDS).length > 0) {
      subtabs.querySelectorAll('.props-subtab').forEach(b => b.classList.remove('active'))
      subtabs.querySelector('[data-dsview="computed"]').classList.add('active')
      originalPanel.classList.remove('active')
      computedPanel.classList.add('active')
    }
  }

  function renderDesignSystemContent (container, ds, isOriginal) {

    // Render known categories in order, then the rest
    const categoryOrder = ['color', 'COLOR', 'colors', 'gradient', 'GRADIENT', 'theme', 'THEME', 'themes', 'font', 'FONT', 'font_family', 'FONT_FAMILY', 'typography', 'TYPOGRAPHY', 'spacing', 'SPACING', 'space', 'timing', 'TIMING', 'class', 'CLASS', 'grid', 'GRID', 'icons', 'ICONS', 'shape', 'SHAPE', 'reset', 'RESET', 'animation', 'ANIMATION', 'media', 'MEDIA', 'cases', 'CASES', 'fontSize', 'fontFamily', 'fontWeight', 'lineHeight', 'letterSpacing', 'borderRadius', 'shadow', 'breakpoints', 'opacity', 'transition']
    const rendered = {}

    for (const cat of categoryOrder) {
      if (ds[cat] !== undefined) {
        renderDSCategory(container, cat, ds[cat], [cat], isOriginal)
        rendered[cat] = true
      }
    }

    // Remaining keys
    for (const key of Object.keys(ds)) {
      if (rendered[key]) continue
      if (key.startsWith('__') || typeof ds[key] === 'function') continue
      if (ds[key] && ds[key].__type === 'function') continue
      renderDSCategory(container, key, ds[key], [key], isOriginal)
    }
  }

  function buildDesignSystemFromFiles () {
    const ds = {}
    const dsFiles = []

    // Collect all DS-related files
    for (const [path, content] of Object.entries(fileCache)) {
      if (!content) continue
      const isDS = /designSystem/i.test(path) || /design.system/i.test(path) || /design-system/i.test(path)
      if (!isDS) continue
      dsFiles.push({ path, content })
    }

    if (dsFiles.length === 0) return ds

    // Sort: index files last (they aggregate), category files first
    dsFiles.sort((a, b) => {
      const aName = a.path.split('/').pop().replace(/\.(js|jsx|ts|tsx|json)$/i, '').toLowerCase()
      const bName = b.path.split('/').pop().replace(/\.(js|jsx|ts|tsx|json)$/i, '').toLowerCase()
      const aIsIndex = aName === 'index' || aName === 'designsystem'
      const bIsIndex = bName === 'index' || bName === 'designsystem'
      if (aIsIndex && !bIsIndex) return 1
      if (!aIsIndex && bIsIndex) return -1
      return 0
    })

    for (const { path, content } of dsFiles) {
      const name = path.split('/').pop().replace(/\.(js|jsx|ts|tsx|json)$/i, '')
      const nameLower = name.toLowerCase()
      try {
        if (path.endsWith('.json')) {
          const parsed = JSON.parse(content)
          if (nameLower === 'index' || nameLower === 'designsystem') {
            // Index only adds keys not already present from individual files
            for (const [k, v] of Object.entries(parsed)) {
              if (!ds[k] && !ds[k.toLowerCase()]) ds[k] = v
            }
          } else {
            ds[name] = parsed
          }
        } else {
          // Try to extract object literals from export default or module.exports
          const match = content.match(/(?:export\s+default|module\.exports\s*=)\s*(\{[\s\S]*?\})\s*;?\s*$/m)
          if (match) {
            try {
              const obj = (new Function('return ' + match[1]))()
              if (nameLower === 'index' || nameLower === 'designsystem') {
                for (const [k, v] of Object.entries(obj)) {
                  if (!ds[k] && !ds[k.toLowerCase()]) ds[k] = v
                }
              } else {
                ds[name] = obj
              }
            } catch (e) { /* not parseable as static object */ }
          }
        }
      } catch (e) { /* skip */ }
    }
    return ds
  }

  function renderDSCategory (container, name, value, path, isOriginal) {
    const section = document.createElement('div')
    section.className = 'ds-category'

    const header = document.createElement('div')
    header.className = 'ds-category-header'

    const arrow = document.createElement('span')
    arrow.className = 'tree-arrow'
    arrow.textContent = '\u25B6'

    const label = document.createElement('span')
    label.className = 'ds-category-name'
    label.textContent = name

    if (value && typeof value === 'object' && !Array.isArray(value) && !value.__type) {
      const count = document.createElement('span')
      count.className = 'ds-category-count'
      count.textContent = Object.keys(value).filter(k => !k.startsWith('__')).length
      label.appendChild(count)
    }

    header.appendChild(arrow)
    header.appendChild(label)
    section.appendChild(header)

    const body = document.createElement('div')
    body.className = 'ds-category-body'
    body.style.display = 'none'

    renderDSValue(body, value, path, 0, isOriginal)

    section.appendChild(body)
    container.appendChild(section)

    let expanded = false
    header.style.cursor = 'pointer'
    header.addEventListener('click', () => {
      expanded = !expanded
      arrow.textContent = expanded ? '\u25BC' : '\u25B6'
      body.style.display = expanded ? 'block' : 'none'
    })
  }

  function renderDSValue (container, value, path, depth, isOriginal) {
    if (depth > 6) return
    if (value === null || value === undefined) return
    if (value && value.__type === 'function') {
      const row = document.createElement('div')
      row.className = 'ds-value-row'
      row.style.paddingLeft = (depth * 14 + 8) + 'px'
      row.innerHTML = '<span class="v-null">f()</span>'
      container.appendChild(row)
      return
    }
    if (value && value.__type) return

    if (typeof value !== 'object' || Array.isArray(value)) {
      // Primitive or array — show inline
      const row = document.createElement('div')
      row.className = 'ds-value-row'
      row.style.paddingLeft = (depth * 14 + 8) + 'px'
      const display = Array.isArray(value) ? JSON.stringify(value) : String(value)
      row.innerHTML = '<span class="' + getValueClass(value) + '">' + escapeHtml(display) + '</span>'
      container.appendChild(row)
      return
    }

    // Object — render key-value pairs
    for (const [key, val] of Object.entries(value)) {
      if (key.startsWith('__')) continue
      if (val && val.__type === 'function') continue

      const row = document.createElement('div')
      row.className = 'ds-value-row'
      row.style.paddingLeft = (depth * 14 + 8) + 'px'

      if (val && typeof val === 'object' && !Array.isArray(val) && !val.__type) {
        // Nested object — collapsible
        const subArrow = document.createElement('span')
        subArrow.className = 'tree-arrow'
        subArrow.textContent = '\u25B6'

        const keySpan = document.createElement('span')
        keySpan.className = 'prop-key'
        keySpan.textContent = key

        row.appendChild(subArrow)
        row.appendChild(keySpan)
        container.appendChild(row)

        const subBody = document.createElement('div')
        subBody.style.display = 'none'
        renderDSValue(subBody, val, [...path, key], depth + 1, isOriginal)
        container.appendChild(subBody)

        let subExpanded = false
        row.style.cursor = 'pointer'
        row.addEventListener('click', (e) => {
          e.stopPropagation()
          subExpanded = !subExpanded
          subArrow.textContent = subExpanded ? '\u25BC' : '\u25B6'
          subBody.style.display = subExpanded ? 'block' : 'none'
        })
      } else {
        // Leaf value
        const keySpan = document.createElement('span')
        keySpan.className = 'prop-key'
        keySpan.textContent = key

        const colon = document.createElement('span')
        colon.className = 'prop-colon'
        colon.textContent = ': '

        const valStr = Array.isArray(val) ? JSON.stringify(val) : String(val ?? '')
        const valSpan = document.createElement('span')
        valSpan.className = getValueClass(val)
        valSpan.textContent = valStr

        // Color swatch for color-like values
        if (typeof val === 'string' && /^(#[0-9a-fA-F]{3,8}|rgba?\(|hsla?\()/.test(val)) {
          const swatch = document.createElement('span')
          swatch.className = 'ds-color-swatch'
          swatch.style.backgroundColor = val
          row.appendChild(swatch)
        }

        row.appendChild(keySpan)
        row.appendChild(colon)
        row.appendChild(valSpan)

        // Make editable on click — only for original, computed is read-only
        if (isOriginal) {
          row.style.cursor = 'pointer'
          row.addEventListener('click', (e) => {
            e.stopPropagation()
            editDSValue(row, path, key, val, valSpan, isOriginal)
          })
        } else {
          row.classList.add('ds-readonly')
        }

        container.appendChild(row)
      }
    }
  }

  function editDSValue (row, path, key, currentVal, valSpan, isOriginal) {
    if (row.querySelector('input')) return // already editing

    const input = document.createElement('input')
    input.type = 'text'
    input.className = 'prop-edit-input'
    input.value = typeof currentVal === 'string' ? currentVal : JSON.stringify(currentVal)
    input.style.width = '120px'

    // Build autocomplete for DS values
    const dsSuggestions = getDSSuggestionsForPath(path, key)
    let dropdown = null
    let filtered = []
    let activeIndex = -1

    valSpan.style.display = 'none'
    row.appendChild(input)

    if (dsSuggestions.length > 0) {
      dropdown = document.createElement('div')
      dropdown.className = 'prop-dropdown'
      row.appendChild(dropdown)
    }

    function filterSuggestions (text) {
      const lower = (text || '').toLowerCase()
      filtered = lower
        ? dsSuggestions.filter(s => s.label.toLowerCase().includes(lower))
        : dsSuggestions.slice()
      if (filtered.length > 30) filtered = filtered.slice(0, 30)
      activeIndex = -1
      renderDDItems()
    }

    function renderDDItems () {
      if (!dropdown) return
      dropdown.innerHTML = ''
      if (filtered.length === 0) { dropdown.style.display = 'none'; return }
      dropdown.style.display = ''
      for (let i = 0; i < filtered.length; i++) {
        const s = filtered[i]
        const item = document.createElement('div')
        item.className = 'prop-dropdown-item' + (i === activeIndex ? ' active' : '')
        if (s.hex !== undefined) {
          const sw = document.createElement('span')
          sw.className = 'dd-swatch'
          sw.style.background = s.hex || 'repeating-conic-gradient(#555 0% 25%, transparent 0% 50%) 50%/8px 8px'
          item.appendChild(sw)
        }
        const label = document.createElement('span')
        label.className = 'dd-label'
        label.textContent = s.label
        item.appendChild(label)
        if (s.hint) {
          const hint = document.createElement('span')
          hint.className = 'dd-hint'
          hint.textContent = s.hint
          item.appendChild(hint)
        }
        item.addEventListener('mousedown', (e) => {
          e.preventDefault()
          input.value = s.label
          commit()
        })
        dropdown.appendChild(item)
      }
    }

    input.addEventListener('input', () => filterSuggestions(input.value))
    input.addEventListener('keydown', (e) => {
      if (dropdown && filtered.length > 0) {
        if (e.key === 'ArrowDown') { e.preventDefault(); activeIndex = Math.min(activeIndex + 1, filtered.length - 1); renderDDItems() }
        else if (e.key === 'ArrowUp') { e.preventDefault(); activeIndex = Math.max(activeIndex - 1, 0); renderDDItems() }
        else if (e.key === 'Enter' && activeIndex >= 0) { e.preventDefault(); input.value = filtered[activeIndex].label; commit(); return }
      }
      if (e.key === 'Enter') { e.preventDefault(); commit() }
      if (e.key === 'Escape') { cleanup() }
    })

    input.focus()
    input.select()
    if (dsSuggestions.length > 0) filterSuggestions(input.value)

    function cleanup () {
      if (dropdown) dropdown.remove()
      input.remove()
      valSpan.style.display = ''
    }

    const commit = async () => {
      let newVal = input.value.trim()
      // Parse value
      if (newVal === 'true') newVal = true
      else if (newVal === 'false') newVal = false
      else if (newVal === 'null') newVal = null
      else if (!isNaN(Number(newVal)) && newVal !== '') newVal = Number(newVal)

      const fullPath = [...path, key]

      if (isOriginal) {
        // Update source file via updateDesignSystem pattern
        // Path: e.g. ['color', 'primary'] -> 'COLOR.primary'
        const dsKey = fullPath.length > 1
          ? fullPath[0].toUpperCase() + '.' + fullPath.slice(1).join('.')
          : fullPath[0]
        if (connectionMode === 'local') {
          // Find and update the source file
          const category = fullPath[0]
          const dsFilePath = findDSSourceFile(category)
          if (dsFilePath) {
            await updateDSSourceFile(dsFilePath, fullPath.slice(1), newVal)
            setStatus('Updated ' + dsKey + ' in source')
          } else {
            setStatus('Source file not found for ' + category)
          }
        } else {
          setStatus('Source editing requires local folder connection')
        }
      }

      // Always update runtime too
      const pathStr = fullPath.map(p => '["' + p.replace(/"/g, '\\"') + '"]').join('')
      const valExpr = typeof newVal === 'string' ? '"' + newVal.replace(/"/g, '\\"') + '"' : String(newVal)
      try {
        await pageEval(`(function(){
          var root = window.__DOMQL_INSPECTOR__.findRoot();
          if (!root || !root.context || !root.context.designSystem) return;
          root.context.designSystem${pathStr} = ${valExpr};
        })()`)
        if (!isOriginal) setStatus('Updated ' + key + ' (runtime)')
      } catch (e) {
        if (!isOriginal) setStatus('Error: ' + e.message)
      }

      // Update cached DS
      if (cachedDesignSystem) {
        let obj = cachedDesignSystem
        for (let i = 0; i < fullPath.length - 1; i++) {
          if (!obj[fullPath[i]]) obj[fullPath[i]] = {}
          obj = obj[fullPath[i]]
        }
        obj[fullPath[fullPath.length - 1]] = newVal
      }

      cleanup()
      valSpan.textContent = String(newVal ?? '')
    }

    input.addEventListener('blur', () => {
      setTimeout(() => { if (document.activeElement !== input) commit() }, 150)
    })
  }

  // Find the source file in fileCache for a DS category
  function findDSSourceFile (category) {
    const lc = category.toLowerCase()
    for (const path of Object.keys(fileCache)) {
      if (!/designSystem/i.test(path)) continue
      const filename = path.split('/').pop().replace(/\.(js|jsx|ts|tsx|json)$/i, '').toLowerCase()
      if (filename === lc || filename === category) return path
    }
    return null
  }

  // Update a value in a DS source file (basic string replacement)
  async function updateDSSourceFile (filePath, keyPath, newVal) {
    const content = fileCache[filePath]
    if (!content) return

    const key = keyPath[keyPath.length - 1]
    const valStr = typeof newVal === 'string' ? "'" + newVal.replace(/'/g, "\\'") + "'" : String(newVal)

    // Try to find and replace the key-value pair
    const patterns = [
      new RegExp("(\\b" + escapeRegExp(key) + "\\s*:\\s*)(['\"][^'\"]*['\"]|[\\d.]+|true|false|null)", 'm'),
      new RegExp("(['\"]" + escapeRegExp(key) + "['\"]\\s*:\\s*)(['\"][^'\"]*['\"]|[\\d.]+|true|false|null)", 'm')
    ]

    let updated = content
    let replaced = false
    for (const pat of patterns) {
      if (pat.test(updated)) {
        updated = updated.replace(pat, '$1' + valStr)
        replaced = true
        break
      }
    }

    if (replaced) {
      fileCache[filePath] = updated
      // Save to IndexedDB
      try {
        const db = await openDB()
        const tx = db.transaction(FILES_STORE, 'readwrite')
        tx.objectStore(FILES_STORE).put(fileCache, folderName)
      } catch (e) { /* ignore */ }
    }
  }

  function escapeRegExp (s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  // Get autocomplete suggestions based on DS path context
  function getDSSuggestionsForPath (path, key) {
    if (!cachedDesignSystem) return []
    const category = (path[0] || '').toLowerCase()

    // For color categories, suggest existing color values
    if (category === 'color' || category === 'colors') {
      return extractDSColorSuggestions()
    }
    // For theme categories, suggest theme names
    if (category === 'theme' || category === 'themes') {
      return extractDSKeys('theme').concat(extractDSKeys('THEME')).map(k => ({ label: k }))
    }
    return []
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

    const nameRow = document.createElement('div')
    nameRow.className = 'method-name-row'

    const name = document.createElement('span')
    name.className = 'method-name'
    name.textContent = method + '()'

    const toggleBtn = document.createElement('button')
    toggleBtn.className = 'method-toggle'
    toggleBtn.textContent = '\u25B6'
    toggleBtn.title = 'Show input'

    nameRow.appendChild(name)
    nameRow.appendChild(toggleBtn)
    item.appendChild(nameRow)

    // Collapsible input area
    const inputArea = document.createElement('div')
    inputArea.className = 'method-input-area'
    inputArea.style.display = 'none'

    const argsTextarea = document.createElement('textarea')
    argsTextarea.className = 'method-args-textarea'
    argsTextarea.placeholder = '// JSON or object literal\n{\n  "key": "value"\n}'
    argsTextarea.rows = 6
    argsTextarea.spellcheck = false
    argsTextarea.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault()
        const start = argsTextarea.selectionStart
        const end = argsTextarea.selectionEnd
        argsTextarea.value = argsTextarea.value.substring(0, start) + '  ' + argsTextarea.value.substring(end)
        argsTextarea.selectionStart = argsTextarea.selectionEnd = start + 2
      }
    })

    const btnRow = document.createElement('div')
    btnRow.className = 'method-btn-row'

    const btn = document.createElement('button')
    btn.className = 'method-btn'
    btn.textContent = 'Run'

    const result = document.createElement('span')
    result.className = 'method-result'

    btnRow.appendChild(btn)
    btnRow.appendChild(result)
    inputArea.appendChild(argsTextarea)
    inputArea.appendChild(btnRow)
    item.appendChild(inputArea)

    let expanded = false
    toggleBtn.addEventListener('click', () => {
      expanded = !expanded
      toggleBtn.textContent = expanded ? '\u25BC' : '\u25B6'
      inputArea.style.display = expanded ? 'block' : 'none'
    })

    // Also toggle on name click
    name.style.cursor = 'pointer'
    name.addEventListener('click', () => {
      expanded = !expanded
      toggleBtn.textContent = expanded ? '\u25BC' : '\u25B6'
      inputArea.style.display = expanded ? 'block' : 'none'
    })

    btn.addEventListener('click', async () => {
      let args = []
      const raw = argsTextarea.value.trim()
      if (raw) {
        try {
          // Try parsing as JSON array first, then as single arg
          if (raw.startsWith('[')) args = JSON.parse(raw)
          else args = [JSON.parse(raw)]
        } catch (e) {
          // Try wrapping in array
          try { args = JSON.parse('[' + raw + ']') }
          catch (e2) {
            result.textContent = 'Invalid JSON/object'
            result.style.color = 'var(--error-color)'
            return
          }
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

        const rawRes = await pageEval(expr)
        const res = JSON.parse(rawRes)
        if (res.error) {
          result.textContent = 'Error: ' + res.error
          result.style.color = 'var(--error-color)'
        } else {
          result.textContent = res.result !== undefined ? JSON.stringify(res.result).slice(0, 100) : 'OK'
          result.style.color = 'var(--type-color)'
          setTimeout(() => selectElement(selectedPath), 200)
        }
      } catch (e) {
        result.textContent = 'Error: ' + (e.message || e)
        result.style.color = 'var(--error-color)'
      }
    })

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
  // Inline editing — Chrome DevTools CSS panel style
  // ============================================================
  function applyLivePreview (key, value, type) {
    if (!selectedPath) return
    try {
      let parsed = value
      try { parsed = JSON.parse(value) } catch (e) {}
      const expr = type === 'state'
        ? 'JSON.stringify(window.__DOMQL_INSPECTOR__.updateState(' +
          JSON.stringify(selectedPath) + ',' + JSON.stringify(key) + ',' + JSON.stringify(parsed) + '))'
        : 'JSON.stringify(window.__DOMQL_INSPECTOR__.updateProp(' +
          JSON.stringify(selectedPath) + ',' + JSON.stringify(key) + ',' + JSON.stringify(parsed) + '))'
      pageEval(expr).catch(() => {})
    } catch (e) {}
  }

  // Structured editor for object/array prop values
  function startObjectEditing (el, propKey, currentValue, type, componentName) {
    if (el.classList.contains('editing')) return

    const existing = document.querySelector('.prop-value.editing')
    if (existing && existing !== el) {
      existing.dispatchEvent(new Event('commitEdit'))
    }

    const isArray = Array.isArray(currentValue)
    const originalJSON = JSON.stringify(currentValue)
    let workingCopy = JSON.parse(originalJSON)

    el.innerHTML = ''
    el.classList.add('editing')

    const editor = document.createElement('div')
    editor.className = 'obj-editor'

    // Recursively build editor for an object/array at any nesting depth
    function buildLevel (container, obj, depth, setParentValue) {
      container.innerHTML = ''
      const isArr = Array.isArray(obj)
      const entries = isArr
        ? obj.map((v, i) => [String(i), v])
        : Object.entries(obj)

      for (const [k, v] of entries) {
        const row = document.createElement('div')
        row.className = 'obj-editor-row'
        if (depth > 0) row.style.paddingLeft = (depth * 12) + 'px'

        // Key label
        if (!isArr) {
          const keyInput = document.createElement('input')
          keyInput.className = 'prop-edit-input obj-key-input'
          keyInput.value = k
          keyInput.readOnly = true
          keyInput.title = k
          row.appendChild(keyInput)
        } else {
          const idx = document.createElement('span')
          idx.className = 'prop-key'
          idx.textContent = k
          idx.style.minWidth = '20px'
          row.appendChild(idx)
        }

        const colon = document.createElement('span')
        colon.className = 'prop-colon'
        colon.textContent = ': '
        row.appendChild(colon)

        const isNested = v !== null && typeof v === 'object'

        if (isNested) {
          // Nested object/array — show toggle + nested editor
          const nestedIsArr = Array.isArray(v)
          const preview = document.createElement('span')
          preview.className = 'obj-nested-preview'
          preview.textContent = nestedIsArr ? '[' + v.length + ']' : '{' + Object.keys(v).length + '}'
          preview.style.cursor = 'pointer'
          preview.style.color = 'var(--text-dim)'
          preview.style.fontSize = '10px'
          row.appendChild(preview)

          // Delete button
          const delBtn = document.createElement('button')
          delBtn.className = 'obj-editor-del'
          delBtn.textContent = '\u00d7'
          delBtn.title = 'Remove'
          delBtn.addEventListener('click', (e) => {
            e.stopPropagation()
            if (isArr) obj.splice(parseInt(k), 1)
            else delete obj[k]
            if (setParentValue) setParentValue(obj)
            buildLevel(container, obj, depth, setParentValue)
          })
          row.appendChild(delBtn)
          container.appendChild(row)

          // Nested container (collapsed by default for depth > 0)
          const nestedContainer = document.createElement('div')
          nestedContainer.className = 'obj-editor-nested'
          let nestedExpanded = depth === 0
          if (!nestedExpanded) nestedContainer.style.display = 'none'
          else buildLevel(nestedContainer, v, depth + 1, (newVal) => {
            if (isArr) obj[parseInt(k)] = newVal
            else obj[k] = newVal
          })

          preview.addEventListener('click', () => {
            nestedExpanded = !nestedExpanded
            nestedContainer.style.display = nestedExpanded ? 'block' : 'none'
            if (nestedExpanded && nestedContainer.innerHTML === '') {
              buildLevel(nestedContainer, v, depth + 1, (newVal) => {
                if (isArr) obj[parseInt(k)] = newVal
                else obj[k] = newVal
              })
            }
          })
          container.appendChild(nestedContainer)
        } else {
          // Primitive value — editable input
          const valInput = document.createElement('input')
          valInput.className = 'prop-edit-input'
          valInput.value = v === null ? 'null' : String(v)
          valInput.dataset.origType = v === null ? 'null' : typeof v
          valInput.addEventListener('change', () => {
            const parsed = parsePreservingType(valInput.value, valInput.dataset.origType)
            if (isArr) obj[parseInt(k)] = parsed
            else obj[k] = parsed
          })
          row.appendChild(valInput)

          // Delete button
          const delBtn = document.createElement('button')
          delBtn.className = 'obj-editor-del'
          delBtn.textContent = '\u00d7'
          delBtn.title = 'Remove'
          delBtn.addEventListener('click', (e) => {
            e.stopPropagation()
            if (isArr) obj.splice(parseInt(k), 1)
            else delete obj[k]
            if (setParentValue) setParentValue(obj)
            buildLevel(container, obj, depth, setParentValue)
          })
          row.appendChild(delBtn)
          container.appendChild(row)
        }
      }

      // Add entry button
      const addRow = document.createElement('div')
      addRow.className = 'obj-editor-row obj-editor-add'
      if (depth > 0) addRow.style.paddingLeft = (depth * 12) + 'px'
      const addBtn = document.createElement('button')
      addBtn.className = 'prop-add-btn'
      addBtn.textContent = isArr ? '+ Add item' : '+ Add key'
      addBtn.style.fontSize = '10px'
      addBtn.style.padding = '2px 6px'
      addBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        if (isArr) { obj.push(''); buildLevel(container, obj, depth, setParentValue) }
        else {
          const keyRow = document.createElement('div')
          keyRow.className = 'obj-editor-row'
          if (depth > 0) keyRow.style.paddingLeft = (depth * 12) + 'px'
          const keyInput = document.createElement('input')
          keyInput.className = 'prop-edit-input'
          keyInput.placeholder = 'key name'
          keyInput.style.maxWidth = '120px'
          keyRow.appendChild(keyInput)
          addRow.before(keyRow)
          keyInput.focus()
          const finishAdd = () => {
            const newKey = keyInput.value.trim()
            if (newKey && !(newKey in obj)) { obj[newKey] = ''; buildLevel(container, obj, depth, setParentValue) }
            else keyRow.remove()
          }
          keyInput.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter') finishAdd()
            if (ev.key === 'Escape') keyRow.remove()
          })
          keyInput.addEventListener('blur', finishAdd)
        }
      })
      addRow.appendChild(addBtn)
      container.appendChild(addRow)
    }

    function rebuild () {
      editor.innerHTML = ''
      buildLevel(editor, workingCopy, 0, null)

      // Save / Cancel buttons (always at bottom of top-level editor)
      const actions = document.createElement('div')
      actions.className = 'obj-editor-actions'
      const saveBtn = document.createElement('button')
      saveBtn.className = 'obj-editor-save'
      saveBtn.textContent = 'Save'
      saveBtn.addEventListener('click', (e) => { e.stopPropagation(); commitObj() })
      const cancelBtn = document.createElement('button')
      cancelBtn.className = 'obj-editor-cancel'
      cancelBtn.textContent = 'Cancel'
      cancelBtn.addEventListener('click', (e) => { e.stopPropagation(); revertObj() })
      actions.appendChild(saveBtn)
      actions.appendChild(cancelBtn)
      editor.appendChild(actions)
    }

    rebuild()
    el.appendChild(editor)

    // Parse value preserving its original type
    function parsePreservingType (str, origType) {
      if (origType === 'null' && str === 'null') return null
      if (origType === 'number') { const n = Number(str); return isNaN(n) ? str : n }
      if (origType === 'boolean') return str === 'true'
      if (origType === 'json') { try { return JSON.parse(str) } catch (e) { return str } }
      if (origType === 'string') return str
      // Auto-detect
      if (str === 'null') return null
      if (str === 'true') return true
      if (str === 'false') return false
      if (!isNaN(Number(str)) && str !== '') return Number(str)
      try { return JSON.parse(str) } catch (e) { return str }
    }

    async function commitObj () {
      // workingCopy is already updated in-place by input change handlers and recursive buildLevel

      el.classList.remove('editing')
      el.innerHTML = ''
      el.appendChild(renderValue(workingCopy))

      if (selectedInfo && type !== 'state' && selectedInfo.props) selectedInfo.props[propKey] = workingCopy
      else if (selectedInfo && type === 'state' && selectedInfo.state) selectedInfo.state[propKey] = workingCopy

      try {
        const expr = type === 'state'
          ? 'JSON.stringify(window.__DOMQL_INSPECTOR__.updateState(' +
            JSON.stringify(selectedPath) + ',' + JSON.stringify(propKey) + ',' + JSON.stringify(workingCopy) + '))'
          : 'JSON.stringify(window.__DOMQL_INSPECTOR__.updateProp(' +
            JSON.stringify(selectedPath) + ',' + JSON.stringify(propKey) + ',' + JSON.stringify(workingCopy) + '))'
        const raw = await pageEval(expr)
        const res = JSON.parse(raw)
        if (res.error) {
          setStatus('Update failed: ' + res.error)
          el.innerHTML = ''
          el.appendChild(renderValue(currentValue))
        } else {
          setStatus('Updated ' + propKey)
          pushHistory(selectedPath, propKey, currentValue, workingCopy, type, componentName)
          trackPropChange(propKey, currentValue, workingCopy, componentName)
        }
      } catch (e) {
        setStatus('Error: ' + (e.message || e))
        el.innerHTML = ''
        el.appendChild(renderValue(currentValue))
      }
    }

    function revertObj () {
      el.classList.remove('editing')
      el.innerHTML = ''
      el.appendChild(renderValue(currentValue))
    }

    el.addEventListener('commitEdit', revertObj, { once: true })
  }

  function startEditing (el, key, currentValue, type, componentName) {
    if (el.classList.contains('editing')) return

    // Close any other open editor
    const existing = document.querySelector('.prop-value.editing')
    if (existing && existing !== el) {
      existing.dispatchEvent(new Event('commitEdit'))
    }

    el.innerHTML = ''
    el.classList.add('editing')

    const input = document.createElement('input')
    input.className = 'prop-edit-input'
    input.value = typeof currentValue === 'string' ? currentValue
      : currentValue === null ? 'null'
      : JSON.stringify(currentValue)
    el.appendChild(input)
    input.focus()
    input.select()

    // Build suggestion list
    const allSuggestions = getSuggestionsForProp(key) || []
    let filtered = []
    let activeIndex = -1
    let dropdown = null

    if (allSuggestions.length > 0) {
      dropdown = document.createElement('div')
      dropdown.className = 'prop-dropdown'
      el.appendChild(dropdown)
    }

    function filterSuggestions (text) {
      const lower = (text || '').toLowerCase()
      filtered = lower
        ? allSuggestions.filter(s => s.label.toLowerCase().startsWith(lower) || s.label.toLowerCase().includes(lower))
        : allSuggestions.slice()
      if (filtered.length > 30) filtered = filtered.slice(0, 30)
      activeIndex = -1
      renderDropdownItems()
    }

    function renderDropdownItems () {
      if (!dropdown) return
      dropdown.innerHTML = ''
      if (filtered.length === 0) { dropdown.style.display = 'none'; return }
      dropdown.style.display = ''
      for (let i = 0; i < filtered.length; i++) {
        const s = filtered[i]
        const item = document.createElement('div')
        item.className = 'prop-dropdown-item' + (i === activeIndex ? ' active' : '')
        if (s.hex !== undefined) {
          const swatch = document.createElement('span')
          swatch.className = 'dd-swatch'
          if (s.hex) swatch.style.background = s.hex
          else swatch.style.background = 'repeating-conic-gradient(#555 0% 25%, transparent 0% 50%) 50%/8px 8px'
          item.appendChild(swatch)
        }
        const label = document.createElement('span')
        label.className = 'dd-label'
        label.textContent = s.label
        item.appendChild(label)
        if (s.hint) {
          const hint = document.createElement('span')
          hint.className = 'dd-hint'
          hint.textContent = s.hint
          item.appendChild(hint)
        }
        item.addEventListener('mousedown', (e) => {
          e.preventDefault()
          input.value = s.label
          applyLivePreview(key, s.label, type)
          commit()
        })
        dropdown.appendChild(item)
      }
      // Scroll active item into view
      if (activeIndex >= 0 && dropdown.children[activeIndex]) {
        dropdown.children[activeIndex].scrollIntoView({ block: 'nearest' })
      }
    }

    function highlightIndex (idx) {
      activeIndex = idx
      if (!dropdown) return
      Array.from(dropdown.children).forEach((c, i) => c.classList.toggle('active', i === idx))
      if (idx >= 0 && dropdown.children[idx]) {
        dropdown.children[idx].scrollIntoView({ block: 'nearest' })
      }
    }

    filterSuggestions(input.value)

    let committed = false
    const originalValue = input.value

    function cleanup () {
      el.classList.remove('editing')
      if (dropdown) dropdown.remove()
      dropdown = null
    }

    async function commit (opts) {
      if (committed) return
      committed = true
      cleanup()

      let newValue = input.value
      try { newValue = JSON.parse(newValue) } catch (e) {}

      // Skip update if value hasn't changed
      const unchanged = newValue === currentValue ||
        (typeof newValue === 'string' && typeof currentValue === 'string' && newValue === currentValue) ||
        JSON.stringify(newValue) === JSON.stringify(currentValue)

      if (unchanged) {
        el.innerHTML = ''
        el.appendChild(renderValue(currentValue))
        if (opts && opts.tabNext) {
          setTimeout(() => {
            const allVals = Array.from(document.querySelectorAll('.prop-value.editable'))
            const idx = allVals.indexOf(el)
            const next = allVals[idx + (opts.tabBack ? -1 : 1)]
            if (next) next.click()
          }, 0)
        }
        return
      }

      el.innerHTML = ''
      el.appendChild(renderValue(newValue))

      if (selectedInfo && selectedInfo.props && type !== 'state') {
        selectedInfo.props[key] = newValue
      } else if (selectedInfo && selectedInfo.state && type === 'state') {
        selectedInfo.state[key] = newValue
      }

      // Apply final change (may already be previewed)
      try {
        const expr = type === 'state'
          ? 'JSON.stringify(window.__DOMQL_INSPECTOR__.updateState(' +
            JSON.stringify(selectedPath) + ',' + JSON.stringify(key) + ',' + JSON.stringify(newValue) + '))'
          : 'JSON.stringify(window.__DOMQL_INSPECTOR__.updateProp(' +
            JSON.stringify(selectedPath) + ',' + JSON.stringify(key) + ',' + JSON.stringify(newValue) + '))'
        const raw = await pageEval(expr)
        const res = JSON.parse(raw)
        if (res.error) {
          setStatus('Update failed: ' + res.error)
          el.innerHTML = ''
          el.appendChild(renderValue(currentValue))
          if (selectedInfo && selectedInfo.props && type !== 'state') selectedInfo.props[key] = currentValue
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

      // Tab → jump to next editable value
      if (opts && opts.tabNext) {
        setTimeout(() => {
          const allVals = Array.from(document.querySelectorAll('.prop-value.editable'))
          const idx = allVals.indexOf(el)
          const next = allVals[idx + (opts.tabBack ? -1 : 1)]
          if (next) next.click()
        }, 0)
      }
    }

    function revert () {
      committed = true
      cleanup()
      el.innerHTML = ''
      el.appendChild(renderValue(currentValue))
      // Revert live preview
      applyLivePreview(key, typeof currentValue === 'string' ? currentValue : JSON.stringify(currentValue), type)
    }

    // Allow external commit trigger
    el.addEventListener('commitEdit', () => { if (!committed) commit() }, { once: true })

    input.addEventListener('input', () => {
      filterSuggestions(input.value)
      // Live preview as you type
      applyLivePreview(key, input.value, type)
    })

    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (filtered.length > 0) {
          // Cycle through suggestions
          const next = activeIndex + 1 >= filtered.length ? 0 : activeIndex + 1
          highlightIndex(next)
          input.value = filtered[next].label
          applyLivePreview(key, input.value, type)
        } else if (typeof currentValue === 'number' || /^-?\d+(\.\d+)?$/.test(input.value)) {
          // Increment number
          const num = parseFloat(input.value) || 0
          input.value = String(num + (e.shiftKey ? 10 : e.altKey ? 0.1 : 1))
          applyLivePreview(key, input.value, type)
        }
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (filtered.length > 0) {
          const prev = activeIndex - 1 < 0 ? filtered.length - 1 : activeIndex - 1
          highlightIndex(prev)
          input.value = filtered[prev].label
          applyLivePreview(key, input.value, type)
        } else if (typeof currentValue === 'number' || /^-?\d+(\.\d+)?$/.test(input.value)) {
          const num = parseFloat(input.value) || 0
          input.value = String(num - (e.shiftKey ? 10 : e.altKey ? 0.1 : 1))
          applyLivePreview(key, input.value, type)
        }
        return
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        commit()
        return
      }
      if (e.key === 'Tab') {
        e.preventDefault()
        commit({ tabNext: true, tabBack: e.shiftKey })
        return
      }
      if (e.key === 'Escape') {
        e.preventDefault()
        revert()
        return
      }
    })

    input.addEventListener('blur', () => {
      setTimeout(() => { if (!committed) commit() }, 120)
    })
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
  // ============================================================
  // AI — Smart Assistant API + Chrome AI fallback
  // ============================================================

  // Service worker fetch proxy (avoids CORS)
  function swFetch (url, options) {
    return new Promise(function (resolve, reject) {
      try {
        chrome.runtime.sendMessage({
          type: 'api-fetch',
          url: url,
          method: (options && options.method) || 'GET',
          headers: (options && options.headers) || {},
          body: (options && options.body) || undefined
        }, function (resp) {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message))
            return
          }
          if (!resp) {
            reject(new Error('No response from service worker'))
            return
          }
          resolve(resp)
        })
      } catch (e) {
        reject(new Error('sendMessage failed: ' + (e.message || e)))
      }
    })
  }

  let aiSessionId = null

  const AI_SYSTEM_PROMPT = `You are a DOMQL/Symbols component assistant integrated into a Chrome DevTools inspector.
You modify Symbols/DOMQL components by returning actionable JSON.

Response format — respond ONLY with a valid JSON object:
- Prop changes: {"action":"setProps","changes":{"key":"value"}}
- State changes: {"action":"setState","changes":{"key":"value"}}
- Text changes: {"action":"setText","value":"new text"}
- Style changes: {"action":"setProps","changes":{"style":{"property":"value"}}}
- Multiple changes: {"action":"setProps","changes":{"padding":"B","color":"blue","theme":"primary"}}

Symbols design system values:
- Spacing tokens (golden ratio): W X Y Z A B C D E F G H (A=16px base)
- Font size tokens (major third): X Y Z A B C D E F G H (A=16px base)
- Colors: blue, green, red, yellow, orange, black, gray, white, title, caption, paragraph
- Color modifiers: blue.5 (opacity), blue+16 (lighten), blue-16 (darken), blue=50 (lightness)
- Themes: primary, secondary, tertiary, card, dialog, field, label, alert, warning, success
- Flow: row, column, x, y

Do NOT include any explanation, only valid JSON.`

  // ---- API key storage ----
  async function getApiKey (provider) {
    const data = await chrome.storage.local.get('ai_keys')
    return (data.ai_keys && data.ai_keys[provider]) || null
  }

  async function setApiKey (provider, key) {
    const data = await chrome.storage.local.get('ai_keys')
    const keys = data.ai_keys || {}
    if (key) {
      keys[provider] = key
    } else {
      delete keys[provider]
    }
    await chrome.storage.local.set({ ai_keys: keys })
  }

  // ---- Claude API (direct or via platform) ----
  async function callClaudeAPI (prompt, context) {
    const contextStr = 'Element path: ' + (context.elementPath || 'none') +
      '\nElement key: ' + (context.elementKey || 'none') +
      '\nCurrent props: ' + JSON.stringify(context.props) +
      '\nCurrent state: ' + JSON.stringify(context.state) +
      '\nTag: ' + (context.tag || 'unknown') +
      (context.scope === 'section' && context.children
        ? '\nChildren: ' + JSON.stringify(context.children)
        : '') +
      '\n\nUser request: ' + prompt

    // Try 1: own API key
    const apiKey = await getApiKey('anthropic')
    if (apiKey) {
      const resp = await swFetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          system: AI_SYSTEM_PROMPT,
          messages: [{ role: 'user', content: contextStr }]
        })
      })

      if (!resp.ok) {
        if (resp.status === 401) throw new Error('Invalid API key. Check your Anthropic key in AI Settings.')
        throw new Error('Claude API error: HTTP ' + resp.status + ' — ' + (resp.text || ''))
      }

      const data = resp.data
      if (data && data.content && data.content[0]) {
        return data.content[0].text
      }
      throw new Error('Unexpected Claude response format')
    }

    // Try 2: platform proxy (if signed in to symbols.app)
    if (window.SymbolsAuth && window.SymbolsAuth.getToken) {
      const token = await window.SymbolsAuth.getToken()
      if (token) {
        const resp = await swFetch('https://api.symbols.app/v1/ai/claude', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
            system: AI_SYSTEM_PROMPT,
            prompt: contextStr
          })
        })

        if (resp.ok && resp.data) {
          if (resp.data.content) return resp.data.content
          if (resp.data.response) return resp.data.response
          return JSON.stringify(resp.data)
        }
        // Platform proxy failed — fall through to error
      }
    }

    throw new Error('No Claude access. Enter your API key or sign in to symbols.app.')
  }

  // ---- AI settings dialog ----
  function openAISettings () {
    const dialog = document.getElementById('ai-settings-dialog')
    dialog.style.display = ''

    // Load saved key
    getApiKey('anthropic').then(key => {
      document.getElementById('ai-key-anthropic').value = key || ''
    })

    // Show auth status
    const statusEl = document.getElementById('ai-dialog-auth-status')
    if (window.SymbolsAuth && window.SymbolsAuth.getToken) {
      window.SymbolsAuth.getToken().then(token => {
        if (token) {
          statusEl.className = 'ai-dialog-auth-status signed-in'
          statusEl.textContent = 'Signed in to symbols.app — Claude available via platform'
        } else {
          statusEl.className = 'ai-dialog-auth-status signed-out'
          statusEl.textContent = 'Not signed in — sign in to symbols.app for free Claude access, or use your own API key below'
        }
      })
    } else {
      statusEl.className = 'ai-dialog-auth-status signed-out'
      statusEl.textContent = 'Sign in to symbols.app or enter your Anthropic API key below'
    }
  }

  function closeAISettings () {
    document.getElementById('ai-settings-dialog').style.display = 'none'
  }

  function saveAISettings () {
    const key = document.getElementById('ai-key-anthropic').value.trim()
    setApiKey('anthropic', key || null).then(() => {
      closeAISettings()
    })
  }

  function getActiveScope (containerId) {
    const container = containerId
      ? document.getElementById(containerId)
      : document.getElementById('ai-input-row') || document.getElementById('chat-input-row')
    if (!container) return 'element'
    const active = container.querySelector('.ai-scope-btn.active')
    return active ? active.dataset.scope : 'element'
  }

  function getElementContext (scope) {
    const ctx = {
      elementPath: selectedPath || null,
      elementKey: selectedInfo ? selectedInfo.key : null,
      props: selectedInfo ? selectedInfo.props : {},
      state: selectedInfo ? selectedInfo.state : {},
      tag: selectedInfo ? selectedInfo.tag : null,
      scope: scope || 'element'
    }
    if (scope === 'section' && selectedInfo && selectedInfo.children) {
      ctx.children = selectedInfo.children
    }
    return ctx
  }

  // ---- Starter (free) local AI — rule-based command parser ----
  function starterAI (query, context) {
    const q = query.toLowerCase().trim()
    const changes = {}

    // "set <prop> to <value>" / "change <prop> to <value>" / "make <prop> <value>"
    const setMatch = q.match(/(?:set|change|make)\s+(?:the\s+)?(\w+)\s+(?:to\s+)?(.+)/i)
    if (setMatch) {
      const prop = setMatch[1]
      let val = setMatch[2].replace(/["""]/g, '').trim()
      // Try numeric
      if (/^\d+(\.\d+)?$/.test(val)) val = parseFloat(val)
      return JSON.stringify({ action: 'setProps', changes: { [prop]: val } })
    }

    // "add padding B" / "add margin C"
    const addMatch = q.match(/add\s+(\w+)\s+(.+)/i)
    if (addMatch) {
      let val = addMatch[2].replace(/["""]/g, '').trim()
      if (/^\d+(\.\d+)?$/.test(val)) val = parseFloat(val)
      return JSON.stringify({ action: 'setProps', changes: { [addMatch[1]]: val } })
    }

    // "remove <prop>" / "delete <prop>"
    const removeMatch = q.match(/(?:remove|delete|clear)\s+(?:the\s+)?(\w+)/i)
    if (removeMatch) {
      return JSON.stringify({ action: 'setProps', changes: { [removeMatch[1]]: null } })
    }

    // Color shortcuts: "make it blue", "color red", "background green"
    const colorNames = ['blue', 'green', 'red', 'yellow', 'orange', 'black', 'gray', 'white', 'transparent']
    for (const c of colorNames) {
      if (q.includes(c)) {
        if (q.includes('background') || q.includes('bg')) {
          changes.background = c; break
        }
        if (q.includes('border')) {
          changes.borderColor = c; break
        }
        changes.color = c; break
      }
    }
    if (Object.keys(changes).length) return JSON.stringify({ action: 'setProps', changes })

    // Theme shortcuts: "theme primary", "make it primary"
    const themes = ['primary', 'secondary', 'tertiary', 'card', 'dialog', 'field', 'alert', 'warning', 'success']
    for (const t of themes) {
      if (q.includes(t)) {
        return JSON.stringify({ action: 'setProps', changes: { theme: t } })
      }
    }

    // Flow shortcuts: "make it row", "layout column"
    if (/\b(row|column)\b/.test(q)) {
      const flow = q.match(/\b(row|column)\b/)[1]
      return JSON.stringify({ action: 'setProps', changes: { flow } })
    }

    // Text change: "text ...", "change text to ..."
    const textMatch = q.match(/(?:text|write|say)\s+(?:to\s+)?["""']?(.+?)["""']?\s*$/i)
    if (textMatch) {
      return JSON.stringify({ action: 'setText', value: textMatch[1] })
    }

    // Spacing: "padding B", "margin C", "gap A"
    const spacingMatch = q.match(/\b(padding|margin|gap|width|height)\s+([A-H][12]?|\d+(?:px)?)/i)
    if (spacingMatch) {
      let val = spacingMatch[2]
      if (/^\d+$/.test(val)) val = parseInt(val)
      return JSON.stringify({ action: 'setProps', changes: { [spacingMatch[1]]: val } })
    }

    // Hide / show
    if (/\bhide\b/.test(q)) return JSON.stringify({ action: 'setProps', changes: { display: 'none' } })
    if (/\bshow\b/.test(q)) return JSON.stringify({ action: 'setProps', changes: { display: 'flex' } })

    return 'I couldn\'t understand that command. Try:\n• "set color to blue"\n• "change padding to B"\n• "make it primary" (theme)\n• "text Hello World"\n• "hide" / "show"\n• "add gap A"\n• "remove margin"'
  }

  async function handleAIPrompt (prompt) {
    const resultEl = document.getElementById('ai-result')
    resultEl.textContent = 'Thinking...'
    resultEl.style.color = 'var(--text-dim)'

    const scope = getActiveScope('ai-input-row')

    // Save user message to thread
    addChatMessage('user', (scope === 'section' ? '[Section] ' : '') + prompt)

    try {
      const context = getElementContext(scope)
      const model = document.getElementById('ai-model').value
      let response = null

      if (model === 'Starter') {
        response = starterAI(prompt, context)
      } else if (model === 'claude') {
        response = await callClaudeAPI(prompt, context)
      } else if (model === 'chrome') {
        response = await runChromeAI(prompt, context)
      }

      if (!response) {
        resultEl.textContent = 'No response from AI'
        resultEl.style.color = 'var(--error-color)'
        addChatMessage('system', 'No response from AI')
        return
      }

      // Save assistant response to thread
      addChatMessage('assistant', response)
      await applyAIResponse(response, resultEl, scope)
    } catch (e) {
      resultEl.textContent = 'Error: ' + (e.message || e)
      resultEl.style.color = 'var(--error-color)'
      addChatMessage('system', 'Error: ' + (e.message || e))
    }
  }

  async function runChromeAI (prompt, context) {
    const contextPrompt = 'Element path: ' + (context.elementPath || 'none') +
      '\nElement key: ' + (context.elementKey || 'none') +
      '\nCurrent props: ' + JSON.stringify(context.props) +
      '\nCurrent state: ' + JSON.stringify(context.state) +
      '\nTag: ' + (context.tag || 'unknown') +
      '\n\nUser request: ' + prompt

    const id = '__domql_ai_' + Date.now()
    const aiExpr = `(async function(){
      try {
        if(typeof LanguageModel==='undefined'){
          window.${id}={error:'Chrome AI not available. Select a different model.'};return
        }
        var s=await LanguageModel.create({initialPrompts:[{role:'system',content:${JSON.stringify(AI_SYSTEM_PROMPT)}}]})
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

  // Apply changes to a single element path
  async function applyToPath (parsed, targetPath) {
    if (parsed.action === 'setProps' && parsed.changes) {
      for (const [k, v] of Object.entries(parsed.changes)) {
        await pageEval('JSON.stringify(window.__DOMQL_INSPECTOR__.updateProp(' +
          JSON.stringify(targetPath) + ',' + JSON.stringify(k) + ',' + JSON.stringify(v) + '))')
        changeHistory.push({ elementPath: targetPath, key: k, oldValue: null, newValue: v, type: 'prop' })
      }
    } else if (parsed.action === 'setState' && parsed.changes) {
      for (const [k, v] of Object.entries(parsed.changes)) {
        await pageEval('JSON.stringify(window.__DOMQL_INSPECTOR__.updateState(' +
          JSON.stringify(targetPath) + ',' + JSON.stringify(k) + ',' + JSON.stringify(v) + '))')
      }
    } else if (parsed.action === 'setText' && parsed.value !== undefined) {
      await pageEval('JSON.stringify(window.__DOMQL_INSPECTOR__.updateProp(' +
        JSON.stringify(targetPath) + ',"text",' + JSON.stringify(parsed.value) + '))')
      changeHistory.push({ elementPath: targetPath, key: 'text', oldValue: null, newValue: parsed.value, type: 'prop' })
    } else if (parsed.action === 'update' && parsed.changes) {
      await pageEval('(function(){var el=window.__DOMQL_INSPECTOR__.getElementByPath(' +
        JSON.stringify(targetPath) + ');if(el)el.update(' + JSON.stringify(parsed.changes) + ')})()')
    } else {
      return false
    }
    return true
  }

  // Universal apply: updates DOM via pageEval AND refreshes the panel
  async function applyChanges (parsed, scope) {
    const path = selectedPath
    if (!path) throw new Error('Select an element first')

    let summary = ''
    const actionLabel = parsed.action === 'setProps' ? 'props: ' + Object.keys(parsed.changes || {}).join(', ')
      : parsed.action === 'setState' ? 'state: ' + Object.keys(parsed.changes || {}).join(', ')
      : parsed.action === 'setText' ? 'text'
      : parsed.action === 'update' ? 'update'
      : ''

    if (scope === 'section') {
      // Apply to current element + all children recursively
      const applied = await applyToPath(parsed, path)
      if (!applied) return null

      // Get children paths and apply to each
      const childPaths = await pageEval(
        '(function(){var paths=[];var el=window.__DOMQL_INSPECTOR__.getElementByPath(' +
        JSON.stringify(path) + ');if(!el)return "[]";' +
        'function walk(node,p){for(var k in node){if(k.startsWith("__")||k==="parent"||k==="node"||k==="state"||k==="props"||k==="context"||typeof node[k]!=="object"||!node[k]||!node[k].node)continue;' +
        'var cp=p+"."+k;paths.push(cp);walk(node[k],cp)}}' +
        'walk(el,' + JSON.stringify(path) + ');return JSON.stringify(paths)})()'
      )

      let paths = []
      try { paths = JSON.parse(childPaths || '[]') } catch (e) {}

      for (const childPath of paths) {
        await applyToPath(parsed, childPath)
      }

      redoStack = []
      updateUndoRedoButtons()
      summary = 'Updated section (' + (paths.length + 1) + ' elements) — ' + actionLabel
    } else {
      const applied = await applyToPath(parsed, path)
      if (!applied) return null
      redoStack = []
      updateUndoRedoButtons()
      summary = 'Updated ' + actionLabel
    }

    // Refresh panel to reflect DOM changes
    await selectElement(path)
    return summary
  }

  async function applyAIResponse (response, resultEl, scope) {
    try {
      const parsed = JSON.parse(response)
      const summary = await applyChanges(parsed, scope)
      if (summary) {
        resultEl.textContent = summary
        resultEl.style.color = 'var(--type-color)'
      } else {
        resultEl.textContent = response
        resultEl.style.color = 'var(--text)'
      }
    } catch (e) {
      if (e.message === 'Select an element first') {
        resultEl.textContent = e.message
        resultEl.style.color = 'var(--error-color)'
      } else {
        // Not JSON — show as text response
        resultEl.textContent = response
        resultEl.style.color = 'var(--text)'
      }
    }
  }

  // ============================================================
  // Tabs, Resizer, Init
  // ============================================================
  // ============================================================
  // Design system value suggestions (matches VSCode extension)
  // ============================================================

  // Sequence token generator (golden ratio for spacing, major third for typography)
  function generateTokens (base, ratio, unit, start, end) {
    const letters = { '-6': 'U', '-5': 'V', '-4': 'W', '-3': 'X', '-2': 'Y', '-1': 'Z', 0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H' }
    const tokens = []
    for (let k = start; k <= end; k++) {
      const letter = letters[k]
      if (!letter) continue
      const value = base * Math.pow(ratio, k)
      const approx = unit === 'ms' ? '~' + Math.round(value) + 'ms'
        : value >= 100 ? '~' + Math.round(value) + 'px'
        : value >= 10 ? '~' + (Math.round(value * 10) / 10) + 'px'
        : '~' + (Math.round(value * 100) / 100) + 'px'
      tokens.push({ label: letter, hint: approx })
      // Sub-steps
      const next = value * ratio
      const diff = next - value
      const subRatio = diff / 1.618
      const sub1 = next - subRatio
      const sub2 = value + subRatio
      const fmt = (v) => unit === 'ms' ? '~' + Math.round(v) + 'ms' : '~' + Math.round(v) + 'px'
      tokens.push({ label: letter + '1', hint: fmt(sub1) })
      tokens.push({ label: letter + '2', hint: fmt(sub2) })
    }
    return tokens
  }

  const SPACING_TOKENS = generateTokens(16, 1.618, 'px', -4, 7)
  const FONT_SIZE_TOKENS = generateTokens(16, 1.25, 'px', -3, 7)
  const TIMING_TOKENS = generateTokens(150, 1.333, 'ms', -3, 7)

  const COLOR_TOKENS = [
    { label: 'blue', hex: '#213eb0' }, { label: 'green', hex: '#389d34' },
    { label: 'red', hex: '#e15c55' }, { label: 'yellow', hex: '#EDCB38' },
    { label: 'orange', hex: '#e97c16' }, { label: 'transparent', hex: '' },
    { label: 'black', hex: '#000000' }, { label: 'gray', hex: '#4e4e50' },
    { label: 'white', hex: '#ffffff' },
    { label: 'title', hex: '', hint: 'text color' },
    { label: 'caption', hex: '', hint: 'secondary text' },
    { label: 'paragraph', hex: '', hint: 'body text' },
    { label: 'disabled', hex: '', hint: 'muted' },
    { label: 'line', hex: '', hint: 'border/divider' },
    { label: 'currentColor', hex: '', hint: 'inherit text' },
    { label: 'inherit', hex: '' }, { label: 'none', hex: '' }
  ]

  const GRADIENT_TOKENS = [
    'gradient-blue-light', 'gradient-blue-dark', 'gradient-dark',
    'gradient-dark-active', 'gradient-light', 'gradient-light-active', 'gradient-colorful'
  ]

  const THEME_TOKENS = [
    'document', 'primary', 'secondary', 'tertiary', 'quaternary', 'quinary',
    'alert', 'warning', 'success', 'field', 'label', 'card', 'dialog',
    'none', 'transparent'
  ]
  const THEME_MODIFIERS = ['.color-only', '.inactive', '.gradient', '.child', '.secondary', '.helper', '.light', '.dark', '.active']

  const CSS_ENUMS = {
    display: ['flex', 'grid', 'block', 'inline', 'inline-flex', 'inline-grid', 'inline-block', 'none', 'contents'],
    position: ['relative', 'absolute', 'fixed', 'sticky', 'static'],
    overflow: ['hidden', 'auto', 'scroll', 'visible', 'clip'],
    overflowX: ['hidden', 'auto', 'scroll', 'visible', 'clip'],
    overflowY: ['hidden', 'auto', 'scroll', 'visible', 'clip'],
    visibility: ['visible', 'hidden', 'collapse'],
    flexDirection: ['row', 'column', 'row-reverse', 'column-reverse'],
    flexWrap: ['wrap', 'nowrap', 'wrap-reverse'],
    alignItems: ['center', 'flex-start', 'flex-end', 'stretch', 'baseline'],
    alignContent: ['center', 'flex-start', 'flex-end', 'stretch', 'space-between', 'space-around', 'space-evenly'],
    alignSelf: ['center', 'flex-start', 'flex-end', 'stretch', 'baseline', 'auto'],
    justifyContent: ['center', 'flex-start', 'flex-end', 'space-between', 'space-around', 'space-evenly', 'stretch'],
    justifyItems: ['center', 'start', 'end', 'stretch', 'baseline'],
    justifySelf: ['center', 'start', 'end', 'stretch', 'baseline', 'auto'],
    textAlign: ['left', 'center', 'right', 'justify', 'start', 'end'],
    textDecoration: ['none', 'underline', 'line-through', 'overline'],
    textTransform: ['none', 'uppercase', 'lowercase', 'capitalize'],
    textOverflow: ['ellipsis', 'clip'],
    whiteSpace: ['nowrap', 'pre', 'pre-wrap', 'pre-line', 'normal', 'break-spaces'],
    wordBreak: ['break-word', 'break-all', 'keep-all', 'normal'],
    fontStyle: ['normal', 'italic', 'oblique'],
    fontWeight: ['100', '200', '300', '400', '500', '600', '700', '800', '900', 'normal', 'bold', 'lighter', 'bolder'],
    cursor: ['pointer', 'default', 'move', 'text', 'wait', 'help', 'crosshair', 'not-allowed', 'grab', 'grabbing', 'zoom-in', 'zoom-out', 'none'],
    pointerEvents: ['auto', 'none', 'all'],
    userSelect: ['none', 'auto', 'text', 'all'],
    objectFit: ['cover', 'contain', 'fill', 'none', 'scale-down'],
    objectPosition: ['center', 'top', 'bottom', 'left', 'right'],
    resize: ['none', 'both', 'horizontal', 'vertical'],
    borderStyle: ['solid', 'dashed', 'dotted', 'double', 'none', 'groove', 'ridge'],
    boxSizing: ['border-box', 'content-box'],
    backgroundSize: ['cover', 'contain', 'auto'],
    backgroundRepeat: ['no-repeat', 'repeat', 'repeat-x', 'repeat-y'],
    backgroundPosition: ['center', 'top', 'bottom', 'left', 'right'],
    backgroundClip: ['border-box', 'padding-box', 'content-box', 'text'],
    mixBlendMode: ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten'],
    appearance: ['none', 'auto'],
    verticalAlign: ['top', 'middle', 'bottom', 'baseline'],
    willChange: ['auto', 'transform', 'opacity', 'scroll-position'],
    // DOMQL shorthands
    flow: ['column', 'row', 'x', 'y', 'column-reverse', 'row-reverse'],
    wrap: ['wrap', 'nowrap', 'wrap-reverse'],
    scope: ['state', 'props']
  }

  const COLOR_PROPS = new Set([
    'color', 'background', 'backgroundColor', 'borderColor',
    'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor',
    'outlineColor', 'fill', 'stroke', 'caretColor', 'accentColor',
    'textDecorationColor', 'columnRuleColor'
  ])
  const SPACING_PROPS = new Set([
    'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
    'paddingInline', 'paddingBlock',
    'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
    'marginInline', 'marginBlock',
    'gap', 'rowGap', 'columnGap',
    'top', 'right', 'bottom', 'left', 'inset',
    'width', 'height', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight',
    'flexBasis', 'borderRadius', 'round', 'boxSize',
    'borderWidth', 'outlineOffset', 'outlineWidth',
    'borderTopLeftRadius', 'borderTopRightRadius',
    'borderBottomLeftRadius', 'borderBottomRightRadius'
  ])
  const FONT_SIZE_PROPS = new Set(['fontSize', 'lineHeight', 'letterSpacing'])

  const HTML_TAGS = [
    'div', 'span', 'p', 'a', 'button', 'input', 'textarea', 'select', 'option',
    'form', 'label', 'fieldset', 'legend',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li', 'dl', 'dt', 'dd',
    'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
    'section', 'article', 'aside', 'header', 'footer', 'nav', 'main',
    'figure', 'figcaption', 'blockquote', 'pre', 'code',
    'img', 'picture', 'source', 'video', 'audio', 'canvas',
    'svg', 'path', 'circle', 'rect', 'line', 'g',
    'iframe', 'embed', 'details', 'summary', 'dialog',
    'hr', 'br', 'strong', 'em', 'b', 'i', 'u', 'small', 'mark'
  ]

  // Extract DS token suggestions from cached design system
  function extractDSColorSuggestions () {
    if (!cachedDesignSystem) return []
    const colors = cachedDesignSystem.color || cachedDesignSystem.COLOR || cachedDesignSystem.colors || {}
    const items = []
    for (const [k, v] of Object.entries(colors)) {
      if (k.startsWith('__')) continue
      if (typeof v === 'string') {
        items.push({ label: k, hex: /^(#|rgb|hsl)/.test(v) ? v : '', hint: v })
      }
    }
    return items
  }

  function extractDSThemeSuggestions () {
    if (!cachedDesignSystem) return []
    const themes = cachedDesignSystem.theme || cachedDesignSystem.THEME || cachedDesignSystem.themes || {}
    const items = []
    for (const k of Object.keys(themes)) {
      if (k.startsWith('__')) continue
      items.push({ label: k, hint: 'theme' })
    }
    return items
  }

  function extractDSKeys (category) {
    if (!cachedDesignSystem) return []
    const obj = cachedDesignSystem[category]
    if (!obj || typeof obj !== 'object') return []
    return Object.keys(obj).filter(k => !k.startsWith('__'))
  }

  function extractDSSpacingSuggestions () {
    if (!cachedDesignSystem) return []
    const sp = cachedDesignSystem.spacing || cachedDesignSystem.SPACING || {}
    if (sp.base && sp.ratio) {
      // Generate tokens from base/ratio
      return generateTokens(sp.base, sp.ratio, 'px', -4, 7)
    }
    // Otherwise extract raw keys
    const items = []
    for (const [k, v] of Object.entries(sp)) {
      if (k.startsWith('__')) continue
      items.push({ label: k, hint: typeof v === 'number' ? v + 'px' : String(v) })
    }
    return items
  }

  function extractDSFontSuggestions () {
    if (!cachedDesignSystem) return []
    const typo = cachedDesignSystem.typography || cachedDesignSystem.TYPOGRAPHY || {}
    if (typo.base && typo.ratio) {
      return generateTokens(typo.base, typo.ratio, 'px', -3, 7)
    }
    const font = cachedDesignSystem.font || cachedDesignSystem.FONT || {}
    const items = []
    for (const [k, v] of Object.entries(font)) {
      if (k.startsWith('__')) continue
      items.push({ label: k, hint: String(v) })
    }
    return items
  }

  function extractDSGradientSuggestions () {
    if (!cachedDesignSystem) return []
    const gr = cachedDesignSystem.gradient || cachedDesignSystem.GRADIENT || {}
    return Object.keys(gr).filter(k => !k.startsWith('__')).map(k => ({ label: k, hint: 'gradient' }))
  }

  function getSuggestionsForProp (propName) {
    // CSS enum values (display, position, flexDirection, etc.)
    if (CSS_ENUMS[propName]) return CSS_ENUMS[propName].map(v => ({ label: v }))

    // Theme tokens — prefer DS tokens, fall back to defaults
    if (propName === 'theme') {
      const dsThemes = extractDSThemeSuggestions()
      if (dsThemes.length > 0) {
        // Add modifiers to DS themes
        for (const t of dsThemes.slice()) {
          for (const mod of THEME_MODIFIERS) {
            dsThemes.push({ label: t.label + ' ' + mod, hint: 'modifier' })
          }
        }
        return dsThemes
      }
      const items = THEME_TOKENS.map(v => ({ label: v, hint: 'theme' }))
      for (const t of ['primary', 'secondary', 'card', 'dialog', 'label']) {
        for (const mod of THEME_MODIFIERS) {
          items.push({ label: t + ' ' + mod, hint: 'modifier' })
        }
      }
      return items
    }

    // Color properties — prefer DS color tokens
    if (COLOR_PROPS.has(propName)) {
      const dsColors = extractDSColorSuggestions()
      if (dsColors.length > 0) {
        // Merge DS colors with gradients
        const dsGradients = extractDSGradientSuggestions()
        return [...dsColors, ...dsGradients, ...COLOR_TOKENS]
      }
      const items = COLOR_TOKENS.slice()
      for (const g of GRADIENT_TOKENS) items.push({ label: g, hint: 'gradient' })
      return items
    }

    // Spacing — prefer DS spacing tokens
    if (SPACING_PROPS.has(propName)) {
      const dsSpacing = extractDSSpacingSuggestions()
      return dsSpacing.length > 0 ? dsSpacing : SPACING_TOKENS
    }

    // Font size — prefer DS typography tokens
    if (FONT_SIZE_PROPS.has(propName)) {
      const dsFonts = extractDSFontSuggestions()
      return dsFonts.length > 0 ? dsFonts : FONT_SIZE_TOKENS
    }

    // Timing tokens
    if (propName === 'transition' || propName === 'transitionDuration' || propName === 'animationDuration') {
      const dsTiming = cachedDesignSystem && (cachedDesignSystem.timing || cachedDesignSystem.TIMING)
      if (dsTiming && typeof dsTiming === 'object') {
        const items = []
        for (const [k, v] of Object.entries(dsTiming)) {
          if (!k.startsWith('__')) items.push({ label: k, hint: String(v) })
        }
        if (items.length > 0) return items
      }
      return TIMING_TOKENS
    }

    // Font family — from DS
    if (propName === 'fontFamily') {
      const ff = cachedDesignSystem && (cachedDesignSystem.font_family || cachedDesignSystem.FONT_FAMILY)
      if (ff && typeof ff === 'object') {
        const items = []
        for (const [k, v] of Object.entries(ff)) {
          if (!k.startsWith('__')) items.push({ label: k, hint: typeof v === 'string' ? v : '' })
        }
        if (items.length > 0) return items
      }
    }

    // HTML tags
    if (propName === 'tag') return HTML_TAGS.map(v => ({ label: v }))
    return null
  }

  // ============================================================
  // Show app / mode switching
  // ============================================================
  let chatMessages = [] // { role: 'user'|'assistant'|'system', content }

  function showApp (name) {
    document.getElementById('app').style.display = 'flex'
    document.getElementById('app-connection-badge').textContent = name || projectName
    loadProjectThreads()
  }

  function switchMode (mode) {
    document.querySelectorAll('.mode-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.mode === mode)
    })
    document.querySelectorAll('.mode-panel').forEach(p => {
      p.classList.toggle('active', p.id === 'mode-' + mode)
    })
    if (mode === 'chat') updateChatContextLabel()
    if (mode === 'gallery') renderGallery()
    if (mode === 'content') renderContent()
  }

  // ============================================================
  // Chat mode
  // ============================================================
  function addChatMessage (role, content) {
    // Ensure we have an active thread
    if (!currentThreadId || !threads.find(t => t.id === currentThreadId)) {
      createNewThread()
    }
    chatMessages.push({ role, content, time: Date.now() })
    renderChatMessages()
    persistCurrentThread()
  }

  function renderChatMessages () {
    const container = document.getElementById('chat-messages')
    container.innerHTML = ''
    for (const msg of chatMessages) {
      const el = document.createElement('div')
      el.className = 'chat-msg ' + msg.role
      if (msg.role === 'assistant') {
        // Try to detect JSON action blocks
        let hasAction = false
        let actionSummary = ''
        try {
          const parsed = JSON.parse(msg.content)
          if (parsed.action) {
            hasAction = true
            if (parsed.action === 'setProps') actionSummary = 'Props: ' + Object.keys(parsed.changes || {}).join(', ')
            else if (parsed.action === 'setState') actionSummary = 'State: ' + Object.keys(parsed.changes || {}).join(', ')
            else if (parsed.action === 'setText') actionSummary = 'Text: ' + parsed.value
            else actionSummary = parsed.action
          }
        } catch (e) {}
        if (hasAction) {
          el.innerHTML = '<span class="chat-action-summary">' + escapeHtml(actionSummary) + '</span>'
          const actions = document.createElement('div')
          actions.className = 'chat-actions'
          const reapplyBtn = document.createElement('button')
          reapplyBtn.className = 'chat-apply-btn'
          reapplyBtn.textContent = 'Re-apply'
          reapplyBtn.addEventListener('click', async () => {
            try {
              const parsed = JSON.parse(msg.content)
              const summary = await applyChanges(parsed)
              if (summary) addChatMessage('system', summary)
            } catch (err) {
              addChatMessage('system', 'Error: ' + err.message)
            }
          })
          actions.appendChild(reapplyBtn)
          el.appendChild(actions)
        } else {
          el.innerHTML = escapeHtml(msg.content)
        }
      } else {
        el.textContent = msg.content
      }
      container.appendChild(el)
    }
    container.scrollTop = container.scrollHeight
  }

  function escapeHtml (str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }

  function updateChatContextLabel () {
    const label = document.getElementById('chat-context-label')
    if (!label) return
    if (selectedPath) {
      label.textContent = selectedPath
      label.className = 'chat-context-label has-element'
    } else {
      label.textContent = 'No element selected'
      label.className = 'chat-context-label'
    }
  }

  async function handleChatPrompt (prompt) {
    const scope = getActiveScope('chat-input-row')
    addChatMessage('user', (scope === 'section' ? '[Section] ' : '') + prompt)

    // Show thinking indicator
    const thinkingEl = document.createElement('div')
    thinkingEl.className = 'chat-msg assistant chat-thinking'
    thinkingEl.textContent = 'Thinking...'
    document.getElementById('chat-messages').appendChild(thinkingEl)

    try {
      let elementInfo = null
      if (selectedPath) {
        const raw = await pageEval(
          'JSON.stringify(window.__DOMQL_INSPECTOR__.navigatePath(' + JSON.stringify(selectedPath) + '))'
        )
        if (raw) elementInfo = JSON.parse(raw)
      }

      const context = getElementContext(scope)
      if (elementInfo) {
        context.elementKey = elementInfo.key
        context.props = elementInfo.props
        context.state = elementInfo.state
        context.tag = elementInfo.tag
      }

      const model = document.getElementById('chat-model').value
      let response = null

      if (model === 'Starter') {
        response = starterAI(prompt, context)
      } else if (model === 'claude') {
        response = await callClaudeAPI(prompt, context)
      } else if (model === 'chrome') {
        response = await runChromeAI(prompt, context)
      }

      thinkingEl.remove()
      addChatMessage('assistant', response || 'No response')

      // Auto-apply if response is an actionable JSON
      if (response) {
        try {
          const parsed = JSON.parse(response)
          if (parsed.action) {
            const summary = await applyChanges(parsed, scope)
            if (summary) addChatMessage('system', summary)
          }
        } catch (e) { /* not JSON, ignore */ }
      }
    } catch (e) {
      thinkingEl.remove()
      addChatMessage('system', 'Error: ' + (e.message || e))
    }
  }

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

  async function init () {
    initTabs()
    initPropsSubtabs()
    initResizer()
    initElementsSync()
    initAutoRefresh()

    // Mode tabs (Editor / Chat / Gallery / Content)
    document.querySelectorAll('.mode-tab').forEach(tab => {
      tab.addEventListener('click', () => switchMode(tab.dataset.mode))
    })

    // Gallery controls
    const gallerySearch = document.getElementById('gallery-search')
    if (gallerySearch) {
      gallerySearch.addEventListener('input', () => {
        const q = gallerySearch.value.toLowerCase()
        document.querySelectorAll('.gallery-card').forEach(card => {
          const name = card.querySelector('.gallery-card-name')?.textContent.toLowerCase() || ''
          card.style.display = name.includes(q) ? '' : 'none'
        })
      })
    }
    // Content controls
    const contentLang = document.getElementById('content-language')
    if (contentLang) {
      contentLang.addEventListener('change', () => {
        activeContentLang = contentLang.value
        renderContent()
      })
    }
    const addLangBtn = document.getElementById('content-add-lang')
    if (addLangBtn) {
      addLangBtn.addEventListener('click', () => {
        const code = window.prompt ? null : '' // prompt doesn't work in DevTools
        // Use inline input instead
        const toolbar = document.getElementById('content-toolbar')
        const inp = document.createElement('input')
        inp.className = 'content-lang-input'
        inp.placeholder = 'lang code (e.g. fr)'
        inp.style.width = '80px'
        toolbar.appendChild(inp)
        inp.focus()
        const add = () => {
          const code = inp.value.trim().toLowerCase()
          if (code && !contentLanguages.includes(code)) {
            contentLanguages.push(code)
            contentData[code] = {}
            const opt = document.createElement('option')
            opt.value = code
            opt.textContent = code.toUpperCase()
            contentLang.appendChild(opt)
            contentLang.value = code
            activeContentLang = code
            renderContent()
          }
          inp.remove()
        }
        inp.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') add()
          if (e.key === 'Escape') inp.remove()
        })
        inp.addEventListener('blur', add)
      })
    }
    document.getElementById('btn-app-disconnect').addEventListener('click', disconnect)

    // Tree pane tabs (Active Nodes / State Tree / Design System)
    document.querySelectorAll('.tree-pane-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.tree-pane-tab').forEach(t => t.classList.remove('active'))
        document.querySelectorAll('.tree-pane-panel').forEach(p => p.classList.remove('active'))
        tab.classList.add('active')
        const panelMap = {
          nodes: 'active-section',
          state: 'state-tree-section',
          designsystem: 'design-system-section'
        }
        const panel = document.getElementById(panelMap[tab.dataset.tree] || 'active-section')
        panel.classList.add('active')
        if (tab.dataset.tree === 'state') renderStateTree()
        if (tab.dataset.tree === 'designsystem') renderDesignSystem()
      })
    })

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
    document.getElementById('btn-sync').addEventListener('click', syncChanges)
    document.getElementById('btn-sync-dropdown').addEventListener('click', toggleSyncChangesPanel)
    document.getElementById('sync-changes-close').addEventListener('click', () => {
      document.getElementById('sync-changes-panel').style.display = 'none'
    })
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

    // AI settings dialog
    document.querySelectorAll('.ai-settings-btn').forEach(btn => {
      btn.addEventListener('click', openAISettings)
    })
    document.getElementById('ai-dialog-close').addEventListener('click', closeAISettings)
    document.getElementById('ai-dialog-save').addEventListener('click', saveAISettings)
    document.getElementById('ai-settings-dialog').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closeAISettings()
    })

    // Scope toggle buttons (Element / Section)
    document.querySelectorAll('.ai-scope-toggle').forEach(toggle => {
      toggle.querySelectorAll('.ai-scope-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          toggle.querySelectorAll('.ai-scope-btn').forEach(b => b.classList.remove('active'))
          btn.classList.add('active')
        })
      })
    })

    // Editor AI bar
    const aiInput = document.getElementById('ai-input')
    const aiSend = document.getElementById('ai-send')
    if (aiInput && aiSend) {
      aiSend.addEventListener('click', () => {
        const prompt = aiInput.value.trim()
        if (prompt) {
          handleAIPrompt(prompt)
          aiInput.value = ''
        }
      })
      aiInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault()
          const prompt = aiInput.value.trim()
          if (prompt) {
            handleAIPrompt(prompt)
            aiInput.value = ''
          }
        }
      })
    }

    // Chat mode
    const chatInput = document.getElementById('chat-input')
    const chatSend = document.getElementById('chat-send')
    if (chatInput && chatSend) {
      chatSend.addEventListener('click', () => {
        const prompt = chatInput.value.trim()
        if (prompt) {
          handleChatPrompt(prompt)
          chatInput.value = ''
        }
      })
      chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault()
          const prompt = chatInput.value.trim()
          if (prompt) {
            handleChatPrompt(prompt)
            chatInput.value = ''
          }
        }
      })
    }

    // Chat pick element button
    const chatPickBtn = document.getElementById('chat-pick-element')
    if (chatPickBtn) {
      chatPickBtn.addEventListener('click', () => {
        startPicker()
        switchMode('editor')
      })
    }

    // New thread button
    const newThreadBtn = document.getElementById('chat-new-thread')
    if (newThreadBtn) {
      newThreadBtn.addEventListener('click', () => createNewThread())
    }

    // Thread history toggle
    const historyBtn = document.getElementById('chat-thread-history')
    if (historyBtn) historyBtn.addEventListener('click', toggleThreadHistory)
    const historyClose = document.getElementById('chat-thread-history-close')
    if (historyClose) historyClose.addEventListener('click', () => {
      document.getElementById('chat-thread-history-panel').style.display = 'none'
    })

    // Try auto-connect if page is a DOMQL/Symbols site
    const autoConnected = await tryAutoConnect()
    if (!autoConnected) showConnectScreen()
  }

  window.panelShown = function () {
    if (connectionMode) loadTree()
  }

  // ============================================================
  // Gallery mode — display all components
  // ============================================================
  async function renderGallery () {
    const container = document.getElementById('gallery-container')
    const pagesRow = document.getElementById('gallery-pages')
    if (!container) return
    container.innerHTML = '<div class="empty-message">Loading...</div>'
    if (pagesRow) pagesRow.innerHTML = ''

    // Get components from element.context.components and pages from element.context.pages
    let result = { components: [], pages: [], debug: '' }
    try {
      const raw = await pageEval(`(function(){
        var I = window.__DOMQL_INSPECTOR__;
        if (!I) return JSON.stringify({components:[],pages:[],debug:'no inspector'});
        var el = I.findRoot();
        if (!el) return JSON.stringify({components:[],pages:[],debug:'no root'});

        // Find context - may be on root or on a child element
        var ctx = el.context;
        if (!ctx) {
          // Walk children to find an element with context
          function findCtx(e, d) {
            if (d > 4 || !e) return null;
            if (e.context) return e.context;
            for (var k in e) {
              if (k === 'parent' || k === 'node' || k === 'state' || k.startsWith('__')) continue;
              if (e[k] && typeof e[k] === 'object' && e[k].node) {
                var found = findCtx(e[k], d + 1);
                if (found) return found;
              }
            }
            return null;
          }
          ctx = findCtx(el, 0);
        }
        if (!ctx) return JSON.stringify({components:[],pages:[],debug:'no context on root or children. root key=' + (el.key||'?') + ' has keys: ' + Object.keys(el).slice(0,15).join(',')});

        var comps = [];
        var pages = [];

        // Count component usage in the live tree
        var usage = {};
        function countUsage(e, d) {
          if (d > 20 || !e || !e.node) return;
          var cname = (e.__ref && e.__ref.__name) || e.component || '';
          if (cname) usage[cname] = (usage[cname] || 0) + 1;
          // Also count by key if it's CapitalCase
          if (e.key && /^[A-Z]/.test(e.key) && e.key !== cname) {
            usage[e.key] = (usage[e.key] || 0) + 1;
          }
          for (var ck in e) {
            if (ck === 'parent' || ck === 'node' || ck === 'context' || ck === 'state' || ck.startsWith('__')) continue;
            if (e[ck] && typeof e[ck] === 'object' && e[ck].node) countUsage(e[ck], d + 1);
          }
        }
        countUsage(el, 0);

        // Extract context.components (CapitalCase keys)
        var src = ctx.components || {};
        for (var k in src) {
          if (k[0] === k[0].toUpperCase() && k[0] !== '_' && /^[A-Z]/.test(k)) {
            comps.push({ name: k, count: usage[k] || 0 });
          }
        }

        // Extract context.pages
        var pgs = ctx.pages || {};
        for (var k in pgs) {
          if (k.startsWith('__')) continue;
          try {
            pages.push({ name: k, path: pgs[k] && pgs[k].path ? pgs[k].path : '/' + k });
          } catch(e) {}
        }

        var debug = 'ctx keys: ' + Object.keys(ctx).slice(0,20).join(',') + '; components keys: ' + Object.keys(src).slice(0,10).join(',');
        return JSON.stringify({ components: comps, pages: pages, debug: debug });
      })()`)
      if (raw) result = JSON.parse(raw)
    } catch (e) { result.debug = 'parse error: ' + e.message }

    // Render pages row
    if (pagesRow && result.pages.length > 0) {
      const label = document.createElement('span')
      label.className = 'gallery-section-label'
      label.textContent = 'Pages'
      pagesRow.appendChild(label)

      for (const page of result.pages) {
        const chip = document.createElement('button')
        chip.className = 'gallery-page-chip'
        chip.textContent = page.name
        chip.title = page.path || ''
        chip.addEventListener('click', () => {
          // Navigate to page in the inspected tab
          const path = page.path.startsWith('/') ? page.path : '/' + page.path
          pageEval('window.location.pathname = ' + JSON.stringify(path)).catch(() => {})
        })
        pagesRow.appendChild(chip)
      }
    }

    // Render components grid
    container.innerHTML = ''

    if (result.components.length === 0) {
      container.innerHTML = '<div class="empty-message">No components found' + (result.debug ? '<br><small style="opacity:0.5">' + result.debug + '</small>' : '') + '</div>'
      return
    }

    for (const comp of result.components) {
      const card = document.createElement('div')
      card.className = 'gallery-card'

      const name = document.createElement('div')
      name.className = 'gallery-card-name'
      name.textContent = comp.name

      if (comp.count > 0) {
        const count = document.createElement('span')
        count.className = 'gallery-card-count'
        count.textContent = comp.count
        count.title = 'Used ' + comp.count + ' time' + (comp.count === 1 ? '' : 's')
        name.appendChild(count)
      }

      card.appendChild(name)

      card.addEventListener('click', () => {
        // Try to find this component in the tree and select it
        switchMode('editor')
        if (treeData) {
          const path = findComponentPath(comp.name)
          if (path) {
            selectElement(path)
            highlightElement(path)
            expandAndSelectTreePath(path)
          }
        }
      })

      container.appendChild(card)
    }
  }

  // Find the tree path of a component by its name (walks tree looking for matching __ref.__name or key)
  function findComponentPath (name) {
    if (!treeData) return null
    function walk (node, path) {
      if (!node || !node.children) return null
      for (const child of node.children) {
        const childPath = path ? path + '.' + child.key : child.key
        if (child.key === name || child.component === name) return childPath
        const found = walk(child, childPath)
        if (found) return found
      }
      return null
    }
    return walk(treeData, '')
  }

  // ============================================================
  // Content mode — CMS-like environment with languages
  // ============================================================
  let contentData = {} // { en: { key: value }, fr: { key: value } }
  let contentLanguages = ['en']
  let activeContentLang = 'en'

  let contentSelectedKey = null // currently selected sidebar key

  async function renderContent () {
    const sidebar = document.getElementById('content-sidebar')
    const main = document.getElementById('content-main')
    if (!sidebar || !main) return
    sidebar.innerHTML = '<div class="empty-message">Loading...</div>'
    main.innerHTML = ''

    // Extract root state (same data source as the State Tree tab)
    let rootState = {}
    let contentDebug = ''
    try {
      const raw = await pageEval(`(function(){
        var I = window.__DOMQL_INSPECTOR__;
        if (!I) return JSON.stringify({data:{},debug:'no inspector'});
        var el = I.findRoot();
        if (!el) return JSON.stringify({data:{},debug:'no root'});

        // Find state - may be on root or on a child element
        var st = el.state;
        if (!st || typeof st !== 'object' || !Object.keys(st).some(function(k){ return k !== 'parent' && k !== 'update' && !k.startsWith('__') && typeof st[k] !== 'function'; })) {
          // Walk children to find element with meaningful state
          function findState(e, d) {
            if (d > 4 || !e) return null;
            for (var k in e) {
              if (k === 'parent' || k === 'node' || k === 'context' || k.startsWith('__')) continue;
              if (e[k] && typeof e[k] === 'object' && e[k].node) {
                if (e[k].state && typeof e[k].state === 'object') {
                  var hasData = Object.keys(e[k].state).some(function(sk){ return sk !== 'parent' && sk !== 'update' && !sk.startsWith('__') && typeof e[k].state[sk] !== 'function'; });
                  if (hasData) return e[k].state;
                }
                var found = findState(e[k], d + 1);
                if (found) return found;
              }
            }
            return null;
          }
          var childState = findState(el, 0);
          if (childState) st = childState;
        }
        if (!st) return JSON.stringify({data:{},debug:'no state found on root or children'});
        var SKIP = {parent:1,root:1,update:1,set:1,reset:1,replace:1,toggle:1,
          remove:1,add:1,apply:1,setByPath:1,parse:1,clean:1,destroy:1,
          create:1,quietUpdate:1,__element:1,__depends:1,__ref:1};
        var result = {};
        var stKeys = [];
        var skipped = [];
        for (var k in st) {
          if (SKIP[k] || k.startsWith('__') || typeof st[k] === 'function') continue;
          stKeys.push(k);
          try {
            var v = st[k];
            var t = typeof v;
            if (v === null || t === 'string' || t === 'number' || t === 'boolean') {
              result[k] = { type: 'primitive', value: v };
            } else if (Array.isArray(v)) {
              result[k] = { type: 'array', length: v.length, value: JSON.parse(JSON.stringify(v.slice(0, 50))) };
            } else if (t === 'object') {
              if (v.node) { skipped.push(k + '(node)'); continue; }
              if (v.parent === st) { skipped.push(k + '(childState)'); continue; }
              var keys = Object.keys(v).filter(function(kk){ return !kk.startsWith('__') && typeof v[kk] !== 'function'; });
              var obj = {};
              keys.slice(0, 100).forEach(function(kk){ try { obj[kk] = JSON.parse(JSON.stringify(v[kk])); } catch(e){} });
              result[k] = { type: 'object', keys: keys.length, value: obj };
            }
          } catch(e) { skipped.push(k + '(err:' + e.message + ')'); }
        }
        return JSON.stringify({data:result, debug:'keys: ' + stKeys.join(',') + '; skipped: ' + skipped.join(',') + '; resultKeys: ' + Object.keys(result).join(',')});
      })()`)
      if (raw) {
        const parsed = JSON.parse(raw)
        rootState = parsed.data || {}
        contentDebug = parsed.debug || ''
      }
    } catch (e) { contentDebug = 'parse error: ' + e.message }

    sidebar.innerHTML = ''

    // Sidebar: show keys that have objects or arrays as values
    const sidebarKeys = []
    const primitiveKeys = []
    for (const [key, info] of Object.entries(rootState)) {
      if (info.type === 'object' || info.type === 'array') {
        sidebarKeys.push(key)
      } else {
        primitiveKeys.push(key)
      }
    }

    if (sidebarKeys.length === 0 && primitiveKeys.length === 0) {
      sidebar.innerHTML = '<div class="empty-message">No root state data' + (contentDebug ? '<br><small style="opacity:0.5">' + contentDebug + '</small>' : '') + '</div>'
      main.innerHTML = ''
      return
    }

    // Temporary debug
    if (contentDebug) {
      const dbg = document.createElement('div')
      dbg.style.cssText = 'font-size:9px;color:var(--text-dim);padding:4px 8px;opacity:0.5'
      dbg.textContent = contentDebug
      sidebar.appendChild(dbg)
    }

    // Render sidebar items
    for (const key of sidebarKeys) {
      const info = rootState[key]
      const item = document.createElement('div')
      item.className = 'content-sidebar-item'
      if (contentSelectedKey === key) item.classList.add('active')

      const label = document.createElement('span')
      label.className = 'content-sidebar-label'
      label.textContent = key

      const badge = document.createElement('span')
      badge.className = 'content-sidebar-badge'
      badge.textContent = info.type === 'array' ? '[' + info.length + ']' : '{' + info.keys + '}'

      item.appendChild(label)
      item.appendChild(badge)
      item.addEventListener('click', () => {
        contentSelectedKey = key
        renderContentMain(main, key, rootState[key])
        // Update active
        sidebar.querySelectorAll('.content-sidebar-item').forEach(i => i.classList.remove('active'))
        item.classList.add('active')
      })
      sidebar.appendChild(item)
    }

    // Auto-select first sidebar item, or show primitives
    if (contentSelectedKey && rootState[contentSelectedKey]) {
      renderContentMain(main, contentSelectedKey, rootState[contentSelectedKey])
    } else if (sidebarKeys.length > 0) {
      contentSelectedKey = sidebarKeys[0]
      sidebar.querySelector('.content-sidebar-item')?.classList.add('active')
      renderContentMain(main, sidebarKeys[0], rootState[sidebarKeys[0]])
    } else {
      renderContentPrimitives(main, primitiveKeys, rootState)
    }

    // Show primitives section at bottom of main if there are any
    if (primitiveKeys.length > 0 && sidebarKeys.length > 0) {
      const primSection = document.createElement('div')
      primSection.className = 'content-primitives-section'
      const primHeader = document.createElement('div')
      primHeader.className = 'section-header'
      primHeader.textContent = 'Root Values'
      primSection.appendChild(primHeader)
      renderContentPrimitives(primSection, primitiveKeys, rootState)
      main.appendChild(primSection)
    }
  }

  function renderContentMain (container, key, info) {
    // Clear previous content (keep primitives section if any)
    const primSection = container.querySelector('.content-primitives-section')
    container.innerHTML = ''

    const header = document.createElement('div')
    header.className = 'content-main-header'
    header.textContent = key + (info.type === 'array' ? ' [' + info.length + ' items]' : '')
    container.appendChild(header)

    const data = info.value
    if (info.type === 'array') {
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        if (item && typeof item === 'object') {
          renderContentObject(container, key, i, item)
        } else {
          renderContentField(container, key + '[' + i + ']', String(i), item, key, i)
        }
      }
    } else if (info.type === 'object') {
      for (const [subKey, val] of Object.entries(data)) {
        if (val && typeof val === 'object' && !Array.isArray(val)) {
          renderContentObject(container, key, subKey, val)
        } else {
          renderContentField(container, key + '.' + subKey, subKey, val, key, subKey)
        }
      }
    }

    if (primSection) container.appendChild(primSection)
  }

  function renderContentObject (container, stateKey, index, obj) {
    const card = document.createElement('div')
    card.className = 'content-object-card'

    const cardHeader = document.createElement('div')
    cardHeader.className = 'content-object-header'
    cardHeader.textContent = typeof index === 'number' ? '#' + index : index
    card.appendChild(cardHeader)

    for (const [k, v] of Object.entries(obj)) {
      if (k.startsWith('__') || typeof v === 'function') continue
      const row = document.createElement('div')
      row.className = 'content-field'

      const label = document.createElement('label')
      label.className = 'content-field-label'
      label.textContent = k

      const input = document.createElement(typeof v === 'string' && v.length > 60 ? 'textarea' : 'input')
      input.className = 'content-input'
      input.value = v === null ? '' : typeof v === 'object' ? JSON.stringify(v) : String(v)
      if (input.tagName === 'TEXTAREA') { input.rows = 2 }

      input.addEventListener('change', async () => {
        let newVal = input.value
        if (newVal === 'true') newVal = true
        else if (newVal === 'false') newVal = false
        else if (newVal === 'null') newVal = null
        else if (!isNaN(Number(newVal)) && newVal !== '') newVal = Number(newVal)
        try {
          await pageEval('(function(){ var root = window.__DOMQL_INSPECTOR__.findRoot(); if(!root || !root.state) return; var st = root.state; ' +
            'var target = st[' + JSON.stringify(stateKey) + ']; if(!target) return; ' +
            (typeof index === 'number'
              ? 'target = target[' + index + ']; '
              : 'target = target[' + JSON.stringify(index) + ']; ') +
            'if(target) target[' + JSON.stringify(k) + '] = ' + JSON.stringify(newVal) + '; if(st.update) st.update(); })()')
          setStatus('Updated ' + k)
        } catch (e) { setStatus('Error: ' + (e.message || e)) }
      })

      row.appendChild(label)
      row.appendChild(input)
      card.appendChild(row)
    }

    container.appendChild(card)
  }

  function renderContentField (container, fullPath, label, value, stateKey, subKey) {
    const row = document.createElement('div')
    row.className = 'content-field'

    const labelEl = document.createElement('label')
    labelEl.className = 'content-field-label'
    labelEl.textContent = label

    const input = document.createElement('input')
    input.className = 'content-input'
    input.value = value === null ? '' : typeof value === 'object' ? JSON.stringify(value) : String(value)

    input.addEventListener('change', async () => {
      let newVal = input.value
      if (newVal === 'true') newVal = true
      else if (newVal === 'false') newVal = false
      else if (newVal === 'null') newVal = null
      else if (!isNaN(Number(newVal)) && newVal !== '') newVal = Number(newVal)
      try {
        await pageEval('(function(){ var root = window.__DOMQL_INSPECTOR__.findRoot(); if(root && root.state) { root.state.' + stateKey +
          (typeof subKey === 'number' ? '[' + subKey + ']' : '["' + subKey + '"]') +
          ' = ' + JSON.stringify(newVal) + '; if(root.state.update) root.state.update(); } })()')
        setStatus('Updated ' + label)
      } catch (e) { setStatus('Error: ' + (e.message || e)) }
    })

    row.appendChild(labelEl)
    row.appendChild(input)
    container.appendChild(row)
  }

  function renderContentPrimitives (container, keys, rootState) {
    for (const key of keys) {
      const info = rootState[key]
      const row = document.createElement('div')
      row.className = 'content-field'

      const label = document.createElement('label')
      label.className = 'content-field-label'
      label.textContent = key

      const input = document.createElement('input')
      input.className = 'content-input'
      input.value = info.value === null ? '' : String(info.value)

      input.addEventListener('change', async () => {
        let newVal = input.value
        if (newVal === 'true') newVal = true
        else if (newVal === 'false') newVal = false
        else if (newVal === 'null') newVal = null
        else if (!isNaN(Number(newVal)) && newVal !== '') newVal = Number(newVal)
        try {
          await pageEval('(function(){ var root = window.__DOMQL_INSPECTOR__.findRoot(); if(root && root.state) { root.state["' + key + '"] = ' + JSON.stringify(newVal) + '; if(root.state.update) root.state.update(); } })()')
          setStatus('Updated ' + key)
        } catch (e) { setStatus('Error: ' + (e.message || e)) }
      })

      row.appendChild(label)
      row.appendChild(input)
      container.appendChild(row)
    }
  }

  // Auto-refresh: listen for page navigation and poll for DOM changes
  function initAutoRefresh () {
    // Refresh tree when user navigates to a new page
    if (chrome.devtools.network && chrome.devtools.network.onNavigated) {
      chrome.devtools.network.onNavigated.addListener(() => {
        if (connectionMode) {
          setStatus('Page navigated, refreshing...')
          setTimeout(() => {
            loadTree()
            if (selectedPath) selectElement(selectedPath)
          }, 500)
        }
      })
    }

    // Poll for DOM changes (check if tree structure changed)
    let lastTreeHash = ''
    setInterval(async () => {
      if (!connectionMode) return
      // Skip polling while an editor is active to avoid re-rendering mid-edit
      if (document.querySelector('.prop-value.editing') || document.querySelector('.obj-editor') || document.querySelector('.prop-add-inline')) return
      try {
        const ready = await pageEval('typeof window.__DOMQL_INSPECTOR__ !== "undefined"')
        if (!ready) return
        const hash = await pageEval(
          '(function(){try{var r=window.__DOMQL_INSPECTOR__.getTree();return JSON.stringify(r).length+"_"+Object.keys(r.children||{}).length}catch(e){return""}})()'
        )
        if (hash && hash !== lastTreeHash) {
          lastTreeHash = hash
          loadTree()
          if (selectedPath) {
            const raw = await pageEval(
              'JSON.stringify(window.__DOMQL_INSPECTOR__.navigatePath(' + JSON.stringify(selectedPath) + '))'
            )
            if (raw) {
              selectedInfo = JSON.parse(raw)
              renderDetail()
            }
          }
        }
      } catch (e) { /* ignore polling errors */ }
    }, 2000)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
