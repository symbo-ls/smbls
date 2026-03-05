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

async function saveHandle (name, handle) {
  const db = await openDB()
  const tx = db.transaction(DB_STORE, 'readwrite')
  tx.objectStore(DB_STORE).put({ handle, name, time: Date.now() }, name)
  return new Promise((resolve, reject) => {
    tx.oncomplete = resolve
    tx.onerror = () => reject(tx.error)
  })
}

async function saveFileCache (projectName, cache) {
  const db = await openDB()
  const tx = db.transaction(FILES_STORE, 'readwrite')
  tx.objectStore(FILES_STORE).put(cache, projectName)
  return new Promise((resolve, reject) => {
    tx.oncomplete = resolve
    tx.onerror = () => reject(tx.error)
  })
}

// Scan a directory and read all file contents
async function scanAndCache (dirHandle, basePath, depth) {
  if (depth > 6) return { tree: [], files: {} }
  const tree = []
  const files = {}

  for await (const entry of dirHandle.values()) {
    const entryPath = basePath ? basePath + '/' + entry.name : entry.name
    if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === 'dist') continue

    if (entry.kind === 'directory') {
      const sub = await scanAndCache(entry, entryPath, depth + 1)
      tree.push({ name: entry.name, path: entryPath, kind: 'dir', children: sub.tree })
      Object.assign(files, sub.files)
    } else {
      if (/\.(js|jsx|ts|tsx|json|css|html)$/i.test(entry.name)) {
        tree.push({ name: entry.name, path: entryPath, kind: 'file' })
        try {
          const file = await entry.getFile()
          files[entryPath] = await file.text()
        } catch (e) {
          files[entryPath] = null
        }
      }
    }
  }

  tree.sort((a, b) => {
    if (a.kind !== b.kind) return a.kind === 'dir' ? -1 : 1
    return a.name.localeCompare(b.name)
  })

  return { tree, files }
}

const statusEl = document.getElementById('status')
const innerEl = document.querySelector('.picker-inner')

function showSuccess (name) {
  innerEl.innerHTML = ''

  const checkmark = document.createElement('div')
  checkmark.className = 'picker-success-icon'
  checkmark.textContent = '\u2713'

  const title = document.createElement('h1')
  title.textContent = 'Connected'
  title.style.marginBottom = '8px'

  const nameEl = document.createElement('p')
  nameEl.style.cssText = 'color:#59AC56;font-size:16px;font-weight:500;margin-bottom:8px'
  nameEl.textContent = name

  const hint = document.createElement('p')
  hint.textContent = 'You can close this tab and return to DevTools.'
  hint.style.marginBottom = '24px'

  const anotherBtn = document.createElement('button')
  anotherBtn.textContent = 'Choose Another Folder'
  anotherBtn.className = 'picker-btn-secondary'
  anotherBtn.addEventListener('click', () => location.reload())

  innerEl.appendChild(checkmark)
  innerEl.appendChild(title)
  innerEl.appendChild(nameEl)
  innerEl.appendChild(hint)
  innerEl.appendChild(anotherBtn)
}

async function pickFolder () {
  try {
    const handle = await window.showDirectoryPicker({ mode: 'readwrite' })

    // Validate symbols.json
    let configHandle
    try {
      configHandle = await handle.getFileHandle('symbols.json')
    } catch (e) {
      statusEl.textContent = 'No symbols.json found. Please select a Symbols project folder.'
      statusEl.className = 'status error'
      return
    }

    statusEl.textContent = 'Reading symbols.json...'
    statusEl.className = 'status'

    const configFile = await configHandle.getFile()
    const configText = await configFile.text()
    let config
    try {
      config = JSON.parse(configText)
    } catch (e) {
      statusEl.textContent = 'Invalid symbols.json: ' + e.message
      statusEl.className = 'status error'
      return
    }

    // Resolve symbols directory
    let symbolsDir = (config.dir || './symbols').replace(/^\.\//, '')
    let symbolsDirHandle
    try {
      symbolsDirHandle = await handle.getDirectoryHandle(symbolsDir)
    } catch (e) {
      statusEl.textContent = 'Symbols directory "' + symbolsDir + '" not found.'
      statusEl.className = 'status error'
      return
    }

    statusEl.textContent = 'Scanning symbols folder...'

    // Scan and cache all file contents
    const { tree, files } = await scanAndCache(symbolsDirHandle, '', 0)

    statusEl.textContent = 'Saving...'

    // Save handle and file cache
    await saveHandle(handle.name, handle)
    await saveFileCache(handle.name, {
      config,
      symbolsDir,
      tree,
      files,
      time: Date.now()
    })

    showSuccess(handle.name)

    // Notify the devtools panel
    chrome.runtime.sendMessage({
      type: 'folder-picked',
      name: handle.name
    })
  } catch (e) {
    if (e.name !== 'AbortError') {
      statusEl.textContent = 'Error: ' + e.message
      statusEl.className = 'status error'
    }
  }
}

// Listen for file operation requests from the panel
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'read-file') {
    (async () => {
      try {
        const db = await openDB()
        const tx = db.transaction(FILES_STORE, 'readonly')
        const req = tx.objectStore(FILES_STORE).get(msg.project)
        req.onsuccess = () => {
          const cache = req.result
          if (cache && cache.files && msg.path in cache.files) {
            sendResponse({ content: cache.files[msg.path] })
          } else {
            sendResponse({ error: 'File not in cache' })
          }
        }
        req.onerror = () => sendResponse({ error: 'DB error' })
      } catch (e) {
        sendResponse({ error: e.message })
      }
    })()
    return true
  }

  if (msg.type === 'write-file') {
    (async () => {
      try {
        const db = await openDB()
        const tx = db.transaction(DB_STORE, 'readonly')
        const req = tx.objectStore(DB_STORE).get(msg.project)
        req.onsuccess = async () => {
          try {
            const item = req.result
            if (!item || !item.handle) {
              sendResponse({ error: 'Project handle not found' })
              return
            }

            let symbolsDir = msg.symbolsDir || 'symbols'
            let dirHandle = await item.handle.getDirectoryHandle(symbolsDir)

            // Navigate to file
            const parts = msg.path.split('/')
            for (let i = 0; i < parts.length - 1; i++) {
              dirHandle = await dirHandle.getDirectoryHandle(parts[i])
            }
            const fileHandle = await dirHandle.getFileHandle(parts[parts.length - 1])
            const writable = await fileHandle.createWritable()
            await writable.write(msg.content)
            await writable.close()

            // Update cache
            const db2 = await openDB()
            const tx2 = db2.transaction(FILES_STORE, 'readwrite')
            const req2 = tx2.objectStore(FILES_STORE).get(msg.project)
            req2.onsuccess = () => {
              const cache = req2.result
              if (cache) {
                cache.files[msg.path] = msg.content
                tx2.objectStore(FILES_STORE).put(cache, msg.project)
              }
            }

            sendResponse({ success: true })
          } catch (e) {
            sendResponse({ error: e.message })
          }
        }
        req.onerror = () => sendResponse({ error: 'DB error' })
      } catch (e) {
        sendResponse({ error: e.message })
      }
    })()
    return true
  }

  if (msg.type === 'rescan-project') {
    (async () => {
      try {
        const db = await openDB()
        const tx = db.transaction(DB_STORE, 'readonly')
        const req = tx.objectStore(DB_STORE).get(msg.project)
        req.onsuccess = async () => {
          try {
            const item = req.result
            if (!item || !item.handle) {
              sendResponse({ error: 'No handle' })
              return
            }

            const perm = await item.handle.queryPermission({ mode: 'readwrite' })
            if (perm !== 'granted') {
              sendResponse({ error: 'Permission denied. Re-open folder.' })
              return
            }

            let configHandle = await item.handle.getFileHandle('symbols.json')
            const configFile = await configHandle.getFile()
            const config = JSON.parse(await configFile.text())

            let symbolsDir = (config.dir || './symbols').replace(/^\.\//, '')
            let symbolsDirHandle = await item.handle.getDirectoryHandle(symbolsDir)
            const { tree, files } = await scanAndCache(symbolsDirHandle, '', 0)

            await saveFileCache(msg.project, { config, symbolsDir, tree, files, time: Date.now() })
            sendResponse({ success: true, config, symbolsDir, tree })
          } catch (e) {
            sendResponse({ error: e.message })
          }
        }
      } catch (e) {
        sendResponse({ error: e.message })
      }
    })()
    return true
  }
})

document.getElementById('btn-pick').addEventListener('click', pickFolder)

// Only auto-open picker if opened via user action (not for background file ops)
if (!new URLSearchParams(location.search).has('bg')) {
  pickFolder()
}
