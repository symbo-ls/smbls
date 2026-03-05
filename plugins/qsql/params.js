const isObject = (v) => v !== null && typeof v === 'object' && v.constructor === Object

const applyStyle = (params, element, node) => {
  if (params && isObject(params)) {
    for (const prop in params) {
      node.style[prop] = params[prop]
    }
  }
}

const applyAttr = (params, element, node) => {
  if (params && isObject(params)) {
    for (const attr in params) {
      const val = params[attr]
      if (val !== false && val !== undefined && val !== null) {
        node.setAttribute(attr, val)
      } else {
        node.removeAttribute(attr)
      }
    }
  }
}

const applyClassList = (params, element, node) => {
  if (!params) return
  if (typeof params === 'string') {
    node.className = params
  } else if (isObject(params)) {
    let className = ''
    for (const item in params) {
      const val = params[item]
      if (val === true) className += ` ${item}`
      else if (typeof val === 'string') className += ` ${val}`
    }
    node.className = className.trim()
  }
}

const applyData = (params, element, node) => {
  if (params && isObject(params)) {
    for (const key in params) {
      node.dataset[key] = params[key]
    }
  }
}

const applyText = (param, element, node) => {
  node.textContent = param
}

const applyHtml = (param, element, node) => {
  node.innerHTML = param
}

export const params = {
  attr: applyAttr,
  class: applyClassList,
  data: applyData,
  style: applyStyle,
  text: applyText,
  html: applyHtml
}
