import { initSettings } from './settings/settings_utils'

// ============================================================
// Tab state helpers (for grabber toggle)
// ============================================================
const getTabState = (tabId) =>
  chrome.storage.session
    .get(String(tabId))
    .then((data) => parseInt(data[tabId] || 0, 10))

const setTabState = (tabId, state) =>
  chrome.storage.session.set({ [tabId]: state })

const getActiveTabs = () =>
  chrome.tabs.query({ active: true, currentWindow: true })

const messageActiveTabs = async (message, { condition, modifyMsg } = {}) => {
  let tabs = await getActiveTabs()
  tabs = tabs.filter(
    (tab) => /^https?:/u.test(tab.url) && (!condition || condition(tab))
  )

  return Promise.all(
    tabs.map((tab, index) => {
      const msg = modifyMsg ? modifyMsg(tab, message, index) : message
      return chrome.tabs
        .sendMessage(tab.id, msg)
        .then((response) => response)
        .catch((reason) => {
          console.log(`Failed to send msg to tab ${tab.id}`, { reason })
        })
    })
  )
}

const toggleActiveTabsState = async () => {
  const tabs = await getActiveTabs()
  let states = await Promise.all(tabs.map((tab) => getTabState(tab.id)))
  states = states.map((s) => (s ? 0 : 1))

  return messageActiveTabs(
    { type: 'toggle' },
    {
      modifyMsg: (tab, msg, index) => {
        const state = states[index]
        setTabState(tab.id, state)
        return { ...msg, state }
      }
    }
  )
}

// ============================================================
// Install / update
// ============================================================
chrome.runtime.onInstalled.addListener(({ previousVersion, reason }) => {
  const { name } = chrome.runtime.getManifest()
  chrome.action.setBadgeBackgroundColor({ color: '#099058ff' })
  console.log(`${name} ${reason}`, { id: chrome.runtime.id, previousVersion })

  if (['install', 'update'].includes(reason)) {
    initSettings()

    // Override Origin header on API requests to avoid CORS rejection
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [1, 2],
      addRules: [
        {
          id: 1,
          priority: 1,
          action: {
            type: 'modifyHeaders',
            requestHeaders: [
              { header: 'Origin', operation: 'set', value: 'https://symbols.app' }
            ]
          },
          condition: {
            urlFilter: 'https://api.symbols.app/*',
            resourceTypes: ['xmlhttprequest', 'other']
          }
        },
        {
          id: 2,
          priority: 1,
          action: {
            type: 'modifyHeaders',
            requestHeaders: [
              { header: 'Origin', operation: 'set', value: 'https://symbols.app' }
            ]
          },
          condition: {
            urlFilter: 'https://smart-assistant-production.up.railway.app/*',
            resourceTypes: ['xmlhttprequest', 'other']
          }
        }
      ]
    })
  }
})

// ============================================================
// Badge state
// ============================================================
chrome.storage.onChanged.addListener((changes, areas) => {
  if (
    areas === 'session' &&
    Object.values(changes).some((change) => parseInt(change.newValue, 10))
  ) {
    chrome.action.setBadgeText({ text: 'ON' })
  } else {
    chrome.action.setBadgeText({ text: null })
  }
})

chrome.tabs.onActivated.addListener(({ tabId }) => {
  chrome.action.setBadgeText({ text: null })
  setTabState(tabId, 0)
})

// ============================================================
// Keyboard shortcut (Ctrl+E / Cmd+E)
// ============================================================
chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'toggleGrabber') {
    await toggleActiveTabsState()
  }
})

// ============================================================
// Toolbar icon click -> toggle grabber
// ============================================================
chrome.action.onClicked.addListener(async () => {
  await toggleActiveTabsState()
})

// ============================================================
// Internal messaging (from devtools panel)
// ============================================================
let pickerTabId = null

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'open-picker') {
    const pickerUrl = chrome.runtime.getURL('picker.html')
    chrome.tabs.create({ url: pickerUrl, active: true }, (tab) => {
      pickerTabId = tab.id
    })
    sendResponse({ ok: true })
    return true
  }

  // Forward file operations to the picker tab
  if (msg.type === 'read-file' || msg.type === 'write-file' || msg.type === 'rescan-project') {
    const forwardToPickerTab = (tabId) => {
      chrome.tabs.sendMessage(tabId, msg, (response) => {
        if (chrome.runtime.lastError) {
          sendResponse({ error: 'Picker tab error: ' + chrome.runtime.lastError.message })
        } else {
          sendResponse(response)
        }
      })
    }

    const openNewPickerTab = () => {
      const pickerUrl = chrome.runtime.getURL('picker.html?bg')
      chrome.tabs.create({ url: pickerUrl, active: false }, (tab) => {
        pickerTabId = tab.id
        // Wait for the page to load before forwarding
        setTimeout(() => forwardToPickerTab(tab.id), 800)
      })
    }

    if (pickerTabId) {
      // Verify the tab still exists
      chrome.tabs.get(pickerTabId, (tab) => {
        if (chrome.runtime.lastError || !tab) {
          pickerTabId = null
          openNewPickerTab()
        } else {
          forwardToPickerTab(pickerTabId)
        }
      })
    } else {
      openNewPickerTab()
    }
    return true
  }

  // Proxy API requests — strip Origin to avoid CORS rejection on server
  if (msg.type === 'api-fetch') {
    const headers = new Headers(msg.headers || {})
    headers.delete('Origin')
    const fetchOpts = {
      method: msg.method || 'GET',
      headers
    }
    if (msg.body && msg.method && msg.method !== 'GET') {
      fetchOpts.body = msg.body
    }
    fetch(msg.url, fetchOpts)
      .then((res) => res.text().then((text) => ({ ok: res.ok, status: res.status, text })))
      .then(({ ok, status, text }) => {
        let json = null
        try { json = JSON.parse(text) } catch (e) {}
        sendResponse({ ok, status, data: json, text })
      })
      .catch((e) => {
        sendResponse({ ok: false, status: 0, error: e.message || String(e) })
      })
    return true
  }

  // Forward folder-picked to all extension pages
  if (msg.type === 'folder-picked') {
    // Already handled by chrome.runtime.onMessage in panel
  }

  return true
})

// ============================================================
// External messaging (from symbols.app / platform.symbo.ls)
// ============================================================
chrome.runtime.onMessageExternal.addListener(async (msg, sender, respond) => {
  switch (msg.type) {
    case 'toggle_platform_mode': {
      const responses = await toggleActiveTabsState()
      if (responses.some((res) => res && res.success)) {
        const domql = responses.find((res) => res && res.domql)?.domql || null
        setTabState(sender.tab.id, 0)
        respond({ success: true, domql })
      }
      break
    }
    case 'request_domql': {
      const data = await chrome.storage.local.get('domqlStr')
      const domql = JSON.parse(data.domqlStr)
      respond(domql)
      break
    }
    default: {
      console.error('Invalid message received', { msg, sender })
    }
  }

  return true
})
