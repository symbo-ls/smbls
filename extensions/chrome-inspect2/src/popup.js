const menu = document.getElementById('menu')

const isMac = navigator.platform.includes('Mac')
const cmdKey = isMac ? '⌘' : 'Ctrl+'

function createMenuItem(label, shortcut, onClick) {
  const btn = document.createElement('button')
  btn.className = 'menu-item'

  const labelSpan = document.createElement('span')
  labelSpan.textContent = label
  btn.appendChild(labelSpan)

  if (shortcut) {
    const shortcutSpan = document.createElement('span')
    shortcutSpan.className = 'shortcut'
    shortcutSpan.textContent = shortcut
    btn.appendChild(shortcutSpan)
  }

  btn.addEventListener('click', () => {
    onClick()
    setTimeout(() => window.close(), 100)
  })

  return btn
}

function createSeparator() {
  const div = document.createElement('div')
  div.className = 'separator'
  return div
}

async function isSymbolsSite(tab) {
  const url = tab.url || ''
  if (/^https?:\/\/(.*\.)?symbo\.ls(\/|$)/i.test(url)) return true
  if (/^https?:\/\/(.*\.)?symbols\.app(\/|$)/i.test(url)) return true

  // Check DOM for Symbols markers (isolated world — can see DOM attributes but not JS globals)
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        // data-br: brender hydration keys (SSR-rendered Symbols sites)
        // key attribute: DOMQL element keys (dev/test mode)
        // data-theme on :root: Symbols theme system
        const hasBrenderKeys = !!document.querySelector('[data-br]')
        const hasKeyAttrs = !!document.querySelector('[key]')
        const hasThemeAttr = document.documentElement.hasAttribute('data-theme')
        return hasBrenderKeys || hasKeyAttrs || hasThemeAttr
      }
    })
    if (results && results[0] && results[0].result) return true
  } catch (e) {
    // Content script injection may fail on restricted pages
  }

  // Check for __DOMQL_INSPECTOR__ global (page-agent, runs in MAIN world)
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      world: 'MAIN',
      func: () => {
        return typeof window.__DOMQL_INSPECTOR__ !== 'undefined'
      }
    })
    if (results && results[0] && results[0].result) return true
  } catch (e) {
    // May fail on restricted pages
  }

  return false
}

async function init() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  if (!tab) return

  const symbolsSite = await isSymbolsSite(tab)

  if (symbolsSite) {
    menu.appendChild(
      createMenuItem('Edit in Symbols', `${cmdKey}⇧S`, () => {
        chrome.runtime.sendMessage({ type: 'open-inspector', tabId: tab.id })
        chrome.runtime.sendMessage({ type: 'show-symbols-panel', tabId: tab.id })
      })
    )
    menu.appendChild(createSeparator())
    menu.appendChild(
      createMenuItem('Send Feedback', null, () => {
        chrome.tabs.create({ url: 'https://symbols.app/feedback' })
      })
    )
  } else {
    menu.appendChild(
      createMenuItem('Inspect element', `${cmdKey}E`, () => {
        chrome.runtime.sendMessage({ type: 'toggle-grabber' })
      })
    )
    menu.appendChild(
      createMenuItem('Personalize', null, () => {
        chrome.runtime.sendMessage({ type: 'personalize', tabId: tab.id })
      })
    )
    menu.appendChild(
      createMenuItem('Export to Symbols', null, () => {
        chrome.runtime.sendMessage({ type: 'export-to-symbols', tabId: tab.id })
      })
    )
  }
}

init()
