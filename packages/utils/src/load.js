'use strict'

export const loadJavascriptFile = (
  FILE_URL,
  async = false,
  doc = document,
  type = 'text/javascript'
) => {
  return new Promise((resolve, reject) => {
    try {
      const scriptEle = doc.createElement('script')
      scriptEle.type = type
      scriptEle.async = async
      scriptEle.src = FILE_URL

      scriptEle.addEventListener('load', ev => {
        resolve({
          status: true
        })
      })

      scriptEle.addEventListener('error', ev => {
        reject(
          new Error({
            status: false,
            message: `Failed to load the script ${FILE_URL}`
          })
        )
      })

      doc.body.appendChild(scriptEle)
    } catch (error) {
      reject(error)
    }
  })
}

export const loadJavascriptFileSync = (
  fileUrl,
  doc = document,
  type = 'text/javascript'
) => {
  return new Promise((resolve, reject) => {
    const scriptEle = doc.createElement('script')
    scriptEle.type = type
    scriptEle.src = fileUrl

    // Create a blocking overlay
    const blocker = doc.createElement('div')
    blocker.style.cssText =
      'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(255,255,255,0.8);z-index:9999;'
    doc.body.appendChild(blocker)

    scriptEle.onload = () => {
      console.log(`Successfully loaded: ${fileUrl}`)
      doc.body.removeChild(blocker)
      resolve()
    }

    scriptEle.onerror = () => {
      doc.body.removeChild(blocker)
      reject(new Error(`Failed to load: ${fileUrl}`))
    }

    doc.body.appendChild(scriptEle)
  })
}

export const loadJavascriptFileEmbedSync = (
  FILE_URL,
  doc = document,
  fallback,
  type = 'text/javascript'
) => {
  const xhr = new window.XMLHttpRequest()
  xhr.open('GET', FILE_URL, false) // false makes the request synchronous
  xhr.send()

  if (xhr.status === 200) {
    const scriptEle = doc.createElement('script')
    scriptEle.type = type
    scriptEle.text = xhr.responseText
    doc.body.appendChild(scriptEle)
    if (typeof fallback === 'function') fallback()
  } else {
    throw new Error(`Failed to load the script ${FILE_URL}`)
  }
}

export const loadCssFile = (
  FILE_URL,
  async = false,
  doc = document,
  type = 'text/javascript'
) => {
  return new Promise((resolve, reject) => {
    try {
      const linkElem = doc.createElement('link')
      linkElem.rel = 'stylesheet'
      linkElem.href = FILE_URL

      linkElem.addEventListener('load', ev => {
        resolve({
          status: true
        })
      })

      doc.head.appendChild(linkElem)
    } catch (error) {
      reject(error)
    }
  })
}

export const loadJavascript = (
  body,
  async = false,
  doc = document,
  type = 'text/javascript',
  id = 'smbls-script'
) => {
  try {
    const scriptEle = doc.createElement('script')
    scriptEle.type = type
    scriptEle.async = async
    scriptEle.id = id
    scriptEle.innerHTML = body

    doc.body.appendChild(scriptEle)
  } catch (error) {
    console.warn(error)
  }
}

/**
 * Dynamically loads a remote JavaScript file and returns a Promise
 * that resolves when the script has completely loaded or rejects on error.
 *
 * @param {string} url - The URL of the remote JavaScript file to load
 * @param {Object} [options] - Optional configuration
 * @param {string} [options.id] - Optional ID to assign to the script element
 * @param {boolean} [options.async=true] - Whether to load the script asynchronously
 * @param {string} [options.type='text/javascript'] - The type attribute for the script
 * @param {string} [options.integrity] - Optional integrity hash for SRI
 * @param {string} [options.crossOrigin] - Optional crossorigin attribute
 * @return {Promise} A promise that resolves when the script loads or rejects on error
 */
export function loadRemoteScript (url, options = {}) {
  const { window = globalThis } = options
  const { document = window.document } = options

  return new Promise((resolve, reject) => {
    // Check if script is already loaded
    const existingScript = document.querySelector(`script[src="${url}"]`)
    if (existingScript) {
      return resolve(existingScript)
    }

    // Create script element
    const script = document.createElement('script')
    script.src = url
    script.async = options.async === true
    script.type = options.type || 'text/javascript'

    // Add optional attributes
    if (options.id) script.id = options.id
    if (options.integrity) script.integrity = options.integrity
    if (options.crossOrigin) script.crossOrigin = options.crossOrigin

    // Setup load and error handlers
    script.onload = () => {
      script.onerror = script.onload = null
      resolve(script)
    }

    script.onerror = () => {
      script.onerror = script.onload = null
      reject(new Error(`Failed to load script: ${url}`))
    }

    // Append the script to the document head
    document.head.appendChild(script)
  })
}

/**
 * Dynamically loads a remote CSS file and returns a Promise
 * that resolves when the stylesheet has completely loaded or rejects on error.
 *
 * @param {string} url - The URL of the remote CSS file to load
 * @param {Object} [options] - Optional configuration
 * @param {string} [options.id] - Optional ID to assign to the link element
 * @param {string} [options.rel='stylesheet'] - The rel attribute for the link
 * @param {string} [options.media='all'] - The media attribute
 * @param {string} [options.integrity] - Optional integrity hash for SRI
 * @param {string} [options.crossOrigin] - Optional crossorigin attribute
 * @return {Promise} A promise that resolves when the stylesheet loads or rejects on error
 */
export async function loadRemoteCSS (url, options = {}) {
  const { window = globalThis } = options
  const { document = window.document } = options

  return new Promise((resolve, reject) => {
    // Check if stylesheet is already loaded
    const existingLink = document.querySelector(`link[href="${url}"]`)
    if (existingLink) {
      return resolve(existingLink)
    }

    // Create link element
    const link = document.createElement('link')
    link.href = url
    link.rel = options.rel || 'stylesheet'
    link.type = 'text/css'
    link.media = options.media || 'all'

    // Add optional attributes
    if (options.id) link.id = options.id
    if (options.integrity) link.integrity = options.integrity
    if (options.crossOrigin) link.crossOrigin = options.crossOrigin

    // Setup load and error handlers
    link.onload = () => {
      link.onerror = link.onload = null
      resolve(link)
    }

    link.onerror = () => {
      link.onerror = link.onload = null
      reject(new Error(`Failed to load stylesheet: ${url}`))
    }

    // Append the link to the document head
    document.head.appendChild(link)
  })
}
