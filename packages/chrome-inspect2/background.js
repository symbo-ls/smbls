chrome.action.onClicked.addListener(tab => {
  chrome.tabs.create({
    url: 'debug.html',
    type: 'popup'
  })
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'DOM_INFO') {
    chrome.storage.local.set({ domInfo: message.data })
  } else if (message.type === 'PLATFORM_UPDATE') {
    // Store the platform data
    chrome.storage.local.get('domInfo', ({ domInfo }) => {
      const updatedInfo = domInfo || {}
      updatedInfo.platformData = message.data
      chrome.storage.local.set({ domInfo: updatedInfo })
    })

    // Forward to any listening devtools panels
    chrome.runtime.sendMessage({
      type: 'PLATFORM_UPDATE',
      data: message.data
    })
  }
})
