'use strict'

import createInstance from '@emotion/css/create-instance'
import { isObjectLike, isString, isNumber, isBoolean, exec } from '@domql/utils'
import { applyClassListOnNode } from './classList.js'

export * from './classList.js'

export const createEmotion = (key = 'smbls', container) => {
  const cleanKey = key.replaceAll(/\./g, '-')
  return createInstance({ key: cleanKey, container })
}

export const emotion = createEmotion()

export const transformEmotionStyle = emotion => {
  return (params, element, state) => {
    const execParams = exec(params, element)
    if (params) {
      const { __ref: ref } = element
      ref.__class.style = execParams
    }
    transformEmotionClass(emotion)(
      element.classlist,
      element,
      element.state,
      true
    )
  }
}

export const transformEmotionClass = emotion => {
  return (params, element, state, flag) => {
    if (element.style && !flag) return
    const { __ref } = element
    const { __class, __classNames } = __ref

    if (!isObjectLike(params)) return
    if (element.props.class) {
      __classNames.classProps = element.props.class
    }
    if (element.attr?.class) {
      __classNames.class = element.attr.class
    }

    for (const key in __class) {
      const prop = __class[key]
      if (!prop) {
        delete __classNames[key]
        continue
      }
      let className
      if (isString(prop) || isNumber(prop)) className = prop
      else if (isBoolean(prop)) className = element.key
      else className = emotion.css(prop)
      __classNames[key] = className
    }

    // Remove stale classNames that no longer exist in __class
    for (const key in __classNames) {
      if (key === 'classProps' || key === 'class') continue
      if (__class[key] === undefined) {
        delete __classNames[key]
      }
    }

    if (element.node) applyClassListOnNode(__classNames, element, element.node)
  }
}

export const transformDOMQLEmotion = (emotion, options) => {
  if (!emotion) emotion = createInstance(options || { key: 'smbls' })

  return {
    style: transformEmotionStyle(emotion),
    classlist: transformEmotionClass(emotion)
  }
}

// initEmotion is imported directly from '@symbo.ls/emotion/initEmotion.js' to avoid circular dependency
