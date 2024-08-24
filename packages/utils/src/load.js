'use strict'

export const loadJavascriptFile = (FILE_URL, async = false, doc = document, type = 'text/javascript') => {
  return new Promise((resolve, reject) => {
    try {
      const scriptEle = doc.createElement('script')
      scriptEle.type = type
      scriptEle.async = async
      scriptEle.src = FILE_URL

      scriptEle.addEventListener('load', (ev) => {
        resolve({
          status: true
        })
      })

      scriptEle.addEventListener('error', (ev) => {
        reject(new Error({
          status: false,
          message: `Failed to load the script ${FILE_URL}`
        }))
      })

      doc.body.appendChild(scriptEle)
    } catch (error) {
      reject(error)
    }
  })
}

export const loadJavascriptFileSync = (FILE_URL, doc = document, type = 'text/javascript') => {
  const xhr = new window.XMLHttpRequest()
  xhr.open('GET', FILE_URL, false) // false makes the request synchronous
  xhr.send()

  if (xhr.status === 200) {
    const scriptEle = doc.createElement('script')
    scriptEle.type = type
    scriptEle.text = xhr.responseText
    doc.body.appendChild(scriptEle)
  } else {
    throw new Error(`Failed to load the script ${FILE_URL}`)
  }
}

export const loadCssFile = (FILE_URL, async = false, doc = document, type = 'text/javascript') => {
  return new Promise((resolve, reject) => {
    try {
      const linkElem = doc.createElement('link')
      linkElem.rel = 'stylesheet'
      linkElem.href = FILE_URL

      linkElem.addEventListener('load', (ev) => {
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

export const loadJavascript = (body, async = false, doc = document, type = 'text/javascript', id = 'smbls-script') => {
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
