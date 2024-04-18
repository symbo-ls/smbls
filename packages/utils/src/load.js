'use strict'

export const loadJavascriptFile = (FILE_URL, async = true, doc = document, type = 'text/javascript') => {
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
