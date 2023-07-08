'use strict'

import { isObject } from '@domql/utils'

const META_TAGS = {
  title: {
    tag: 'title'
  },
  description: {
    tag: 'meta',
    attr: 'name',
    key: 'description'
  },
  keywords: {
    tag: 'meta',
    attr: 'name',
    key: 'keywords'
  },
  image: {
    tag: 'meta',
    attr: 'property',
    key: 'og:image'
  },
  url: {
    tag: 'meta',
    attr: 'property',
    key: 'og:url'
  },
  siteName: {
    tag: 'meta',
    attr: 'property',
    key: 'og:site_name'
  },
  type: {
    tag: 'meta',
    attr: 'property',
    key: 'og:type'
  },
  locale: {
    tag: 'meta',
    attr: 'property',
    key: 'og:locale'
  }
}

const createQuery = (obj) => {
  if (obj.tag && !obj.attr && !obj.key) {
    return obj.tag
  } else if (obj.tag && obj.attr && obj.key) {
    return `${obj.tag}[${obj.attr}="${obj.key}"]`
  } else {
    throw new Error('Invalid object format')
  }
}

const createMetaElement = (key, content) => {
  const metaObj = META_TAGS[key]
  if (!metaObj) return

  const domElement = document.createElement(metaObj.tag)

  if (metaObj.attr) {
    domElement.setAttribute(metaObj.attr, metaObj.key)
  }

  const head = document.head || document.querySelector('head')
  head.appendChild(domElement)

  return domElement
}

export const Helmet = {
  define: {
    $helmet: (param, el, state) => {
      if (!isObject(param)) return

      for (const key in param) {
        const metaObj = META_TAGS[key]
        if (!metaObj) continue

        const metaQuery = createQuery(metaObj)
        const domElement = el.querySelector(metaQuery) || createMetaElement(key, param[key])
        if (!domElement) continue

        if (isObject(state.__root)) state.__root.$helmet = param

        if (key === 'title') {
          domElement.textContent = param[key]
        } else {
          domElement.setAttribute('content', param[key])
        }
      }
    }
  }
}
