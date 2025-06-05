// Inject a script to help access the ref
function injectScript () {
  const script = document.createElement('script')
  script.textContent = `
    window.getDOMQLData = (element) => {
      try {
        if (element && element.ref && element.ref.parseDeep) {
          return element.ref.parseDeep()
        }
      } catch (e) {
        console.error('Error getting DOMQL data:', e)
      }
      return null
    }
  `
  ;(document.head || document.documentElement).appendChild(script)
  script.remove()
}

function collectDOMInfo () {
  const info = {
    title: document.title,
    elements: document.getElementsByTagName('*').length,
    links: document.getElementsByTagName('a').length,
    images: document.getElementsByTagName('img').length
  }

  const platformDiv = document.querySelector('div[key="platform"]')
  console.log('Platform div found:', platformDiv)

  if (platformDiv) {
    // Create a temporary variable in the page context
    const script = document.createElement('script')
    script.textContent = `
      try {
        const data = window.getDOMQLData(document.querySelector('div[key="platform"]'))
        window.postMessage({ type: 'DOMQL_DATA', data }, '*')
      } catch (e) {
        console.error('Error accessing DOMQL data:', e)
      }
    `
    ;(document.head || document.documentElement).appendChild(script)
    script.remove()
  }

  chrome.runtime.sendMessage({ type: 'DOM_INFO', data: info })
}

// Listen for data from the page context
window.addEventListener('message', event => {
  if (event.data && event.data.type === 'DOMQL_DATA') {
    console.log('Received DOMQL data:', event.data.data)
    chrome.runtime.sendMessage({
      type: 'PLATFORM_UPDATE',
      data: event.data.data
    })
  }
})

// Set up observer for platform div changes
const observer = new MutationObserver(mutations => {
  mutations.forEach(() => {
    const platformDiv = document.querySelector('div[key="platform"]')
    if (platformDiv) {
      // Create a temporary variable in the page context
      const script = document.createElement('script')
      script.textContent = `
        try {
          const data = window.getDOMQLData(document.querySelector('div[key="platform"]'))
          window.postMessage({ type: 'DOMQL_DATA', data }, '*')
        } catch (e) {
          console.error('Error accessing DOMQL data:', e)
        }
      `
      ;(document.head || document.documentElement).appendChild(script)
      script.remove()
    }
  })
})

// Inject helper script first
injectScript()

// Start observing
observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
  attributes: true
})

console.log('Content script loaded and observer started')
// Initial collection
collectDOMInfo()
