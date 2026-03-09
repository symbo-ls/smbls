import { parseElement } from './grabber/parse'

// ============================================================
// DOMQL Inspector: inject page-agent for DevTools panel access
// ============================================================
function injectPageAgent () {
  const script = document.createElement('script')
  script.src = chrome.runtime.getURL('page-agent.js')
  script.onload = () => script.remove()
  ;(document.head || document.documentElement).appendChild(script)
}

injectPageAgent()

// ============================================================
// Symbols Grabber: click-to-capture element mode
// ============================================================
async function addToLibrary (node) {
  const rootStyles = window.getComputedStyle(document.documentElement)
  const obj = await parseElement(node, rootStyles)

  const store = { domqlStr: JSON.stringify(obj) }
  console.log('%c[Symbols] saving domql', 'color: green', store)

  chrome.storage.local.set(store)
  chrome.runtime.sendMessage({ type: 'open_platform' })

  return obj
}

const focusNodeClass = 'symbols-grabber-hovered'
let isListenerActive = false
let focusedNode = null

document.body.addEventListener(
  'mouseover',
  (event) => {
    const { target } = event
    if (target && isListenerActive) {
      if (focusedNode && focusedNode !== target) {
        focusedNode.classList.remove(focusNodeClass)
      }
      focusedNode = target
      focusedNode.classList.add(focusNodeClass)
    }
  },
  true
)

chrome.runtime.onMessage.addListener((msg, sender, respond) => {
  if (sender.id === chrome.runtime.id) {
    const { type, state } = msg

    if (type === 'open-inspector') {
      // Enable the Symbols inspector UI overlay (same as editor preview)
      document.body.classList.add('symbols-inspector-active')
      console.log('%c[Symbols] inspector opened', 'color: green')
      respond({ ok: true })
      return true
    }

    if (type === 'personalize') {
      console.log('%c[Symbols] personalize mode', 'color: blue')
      respond({ ok: true })
      return true
    }

    if (type === 'toggle' && typeof state === 'number') {
      console.log(
        `%c[Symbols] grabber ${state ? 'enabled' : 'disabled'}`,
        `color: ${state ? 'green' : 'red'}`
      )

      isListenerActive = Boolean(state)
      document.body.classList.toggle('symbols-grabber-active', isListenerActive)

      if (!state) {
        document.querySelectorAll(`.${focusNodeClass}`).forEach((el) => {
          el.classList.remove(focusNodeClass)
        })
        focusedNode = null
      }

      document.body.addEventListener(
        'click',
        (event) => {
          const { target } = event
          if (target && isListenerActive) {
            event.preventDefault()
            event.stopImmediatePropagation()

            if (target.classList.contains(focusNodeClass)) {
              target.classList.remove(focusNodeClass)
            }

            addToLibrary(target).then(
              (domql) => {
                target.classList.add(focusNodeClass)
                respond({ success: true, domql })
              },
              (error) => {
                console.error('[Symbols] error adding to library', error)
                respond({ success: false, error: error.message || error })
              }
            )

            isListenerActive = false
          }
        },
        { capture: true, once: true }
      )
    }
  }

  return true
})

// Listen for element selections from the editor/preview inspector (via page-agent)
document.addEventListener('__symbols_inspect_pick__', (e) => {
  try {
    const detail = JSON.parse(e.detail)
    chrome.runtime.sendMessage({ type: 'editor-element-selected', ...detail })
  } catch (err) {
    // ignore
  }
})

console.log('[Symbols] Content script loaded (inspector + grabber)')
