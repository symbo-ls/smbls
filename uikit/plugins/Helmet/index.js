'use strict'

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
      if (!state.$helmet) return
      for (const key in state.$helmet) {
        const metaElement = META_TAGS[key]
        if (key === 'title') {
          metaElement.textContent = state.$helmet[key]
        } else {
          metaElement.setAttribute('content', state.$helmet[key])
        }
      }
    }
  }
}
