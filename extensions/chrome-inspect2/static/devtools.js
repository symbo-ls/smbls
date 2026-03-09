chrome.devtools.panels.create('Symbols', null, 'panel.html', panel => {
  let panelWindow = null
  let pendingSelection = null

  panel.onShown.addListener(win => {
    panelWindow = win
    win.panelShown()

    // Apply any queued selection from editor/preview
    if (pendingSelection && win.handleExternalSelection) {
      win.handleExternalSelection(pendingSelection.path, pendingSelection.info)
      pendingSelection = null
    }
  })

  panel.onHidden.addListener(() => {
    panelWindow = null
  })

  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    const inspectedTabId = chrome.devtools.inspectedWindow.tabId

    // Forward editor-element-selected to panel window (or queue it)
    if (msg.type === 'editor-element-selected' || msg.type === 'show-symbols-panel') {
      if (!msg.tabId || msg.tabId === inspectedTabId) {
        if (msg.info) {
          if (panelWindow && panelWindow.handleExternalSelection) {
            panelWindow.handleExternalSelection(msg.path, msg.info)
          } else {
            // Panel not visible yet — queue for when user opens it
            pendingSelection = { path: msg.path, info: msg.info }
          }
        }
      }
      sendResponse({ ok: true })
    }

    return true
  })
})
