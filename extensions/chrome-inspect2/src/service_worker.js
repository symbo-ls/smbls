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
    if (pickerTabId) {
      chrome.tabs.sendMessage(pickerTabId, msg, sendResponse)
    } else {
      // No picker tab open — open one silently
      const pickerUrl = chrome.runtime.getURL('picker.html')
      chrome.tabs.create({ url: pickerUrl, active: false }, (tab) => {
        pickerTabId = tab.id
        // Wait a moment for the page to load
        setTimeout(() => {
          chrome.tabs.sendMessage(pickerTabId, msg, sendResponse)
        }, 500)
      })
    }
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
