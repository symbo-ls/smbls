'use strict'

import { isObject } from '@domql/utils'

const META_TAGS = {
  title: document.querySelector('title'),
  description: document.querySelector('meta[name="description"]'),
  keywords: document.querySelector('meta[name="keywords"]'),
  image: document.querySelector('meta[property="og:image"]'),
  url: document.querySelector('meta[property="og:url"]'),
  siteName: document.querySelector('meta[property="og:site_name"]'),
  type: document.querySelector('meta[property="og:type"]'),
  locale: document.querySelector('meta[property="og:locale"]')
}

export const Helmet = {
  define: {
    $helmet: (param, el, state) => {
      if (!isObject(param)) return
      for (const key in param) {
        const metaElement = META_TAGS[key]
        if (key === 'title') {
          metaElement.textContent = param[key]
        } else {
          metaElement.setAttribute('content', param[key])
        }
      }
    }
  }
}
