'use strict'

import {
  set,
  getActiveConfig,
  getFontFaceString,
  appendSVGSprite,
  appendSvgIconsSprite
} from '@symbo.ls/scratch'

import { isObject, deepMerge, deepClone } from '@domql/utils'

import { emotion as defaultEmotion } from '@symbo.ls/emotion'

const CONFIG = getActiveConfig()

const mergeWithLocalFile = (config = CONFIG, options) => {
  const rcfile = isObject(options.localFile)
    ? options.localFile
    : {}
  const clonedFile = deepClone(rcfile.designSystem || {})
  return deepMerge(config, clonedFile)
}

const SET_OPTIONS = {
  emotion: defaultEmotion,
  useVariable: true,
  useReset: true,
  useFontImport: true,
  useIconSprite: true,
  useDocumentTheme: true,
  useSvgSprite: true
}

export const init = (config, options = SET_OPTIONS) => {
  const emotion = options.emotion || defaultEmotion
  const resultConfig = mergeWithLocalFile(config || {}, options)

  const conf = set(
    {
      verbose: options.verbose,
      useReset: options.useReset,
      useFontImport: options.useFontImport,
      useVariable: options.useVariable,
      useSvgSprite: options.useSvgSprite,
      useDocumentTheme: options.useDocumentTheme,
      useIconSprite: options.useIconSprite,
      useDefaultConfig: options.useDefaultConfig,
      globalTheme: options.globalTheme,
      files: options.files,
      ...resultConfig
    },
    { newConfig: options.newConfig }
  )

  const FontFace = getFontFaceString(conf.font || conf.FONT, conf.files)

  const useReset = conf.useReset
  const useVariable = conf.useVariable
  const useFontImport = conf.useFontImport
  const useSvgSprite = conf.useSvgSprite
  const hasSvgs = config.svg || config.SVG
  const useIconSprite = conf.useIconSprite
  const hasIcons = config.icons || config.ICONS

  if (useFontImport) emotion.injectGlobal(FontFace)
  if (useVariable) {
    emotion.injectGlobal({ ':root': conf.CSS_VARS })
    // Inject theme-switching CSS vars (media queries + data-theme selectors)
    if (conf.CSS_MEDIA_VARS) {
      const themeStyles = {}
      for (const key in conf.CSS_MEDIA_VARS) {
        if (key.startsWith('@media')) {
          // Media query — only apply when no data-theme forces a theme
          themeStyles[key] = { ':root:not([data-theme])': conf.CSS_MEDIA_VARS[key] }
        } else {
          // Selector ([data-theme="..."]) — apply directly
          themeStyles[key] = conf.CSS_MEDIA_VARS[key]
        }
      }
      emotion.injectGlobal(themeStyles)
    }
  }
  if (useReset) emotion.injectGlobal(conf.reset || conf.RESET)

  // Register all ANIMATION entries as global @keyframes
  const animations = conf.animation || conf.ANIMATION
  if (animations) {
    const keyframesCSS = {}
    for (const name in animations) {
      keyframesCSS[`@keyframes ${name}`] = animations[name]
    }
    emotion.injectGlobal(keyframesCSS)
  }

  if (hasSvgs || useSvgSprite)
    appendSVGSprite(conf.svg || conf.SVG, { document: options.document })

  if (hasIcons || useIconSprite)
    appendSvgIconsSprite(conf.icons || conf.ICONS, { document: options.document })

  return conf
}

const UPDATE_OPTIONS = {
  emotion: defaultEmotion
}

export const reinit = (config, options = UPDATE_OPTIONS) => {
  const emotion = options.emotion || defaultEmotion
  const resultConfig = mergeWithLocalFile(config || {}, options)
  const conf = set({
    verbose: false,
    ...resultConfig
  })
  if (!options.preventInject) {
    emotion.injectGlobal({ ':root': conf.CSS_VARS })
    if (conf.CSS_MEDIA_VARS) {
      const themeStyles = {}
      for (const key in conf.CSS_MEDIA_VARS) {
        if (key.startsWith('@media')) {
          themeStyles[key] = { ':root:not([data-theme])': conf.CSS_MEDIA_VARS[key] }
        } else {
          themeStyles[key] = conf.CSS_MEDIA_VARS[key]
        }
      }
      emotion.injectGlobal(themeStyles)
    }
    emotion.injectGlobal(conf.RESET)
  }
  return conf
}

export const applyCSS = (styles, options = UPDATE_OPTIONS) => {
  const emotion = options.emotion || defaultEmotion
  emotion.injectGlobal(styles)
}

export const updateVars = (config, options = UPDATE_OPTIONS) => {
  const emotion = options.emotion || defaultEmotion
  emotion.injectGlobal({ ':root': config.CSS_VARS })
  if (config.CSS_MEDIA_VARS) {
    const themeStyles = {}
    for (const key in config.CSS_MEDIA_VARS) {
      if (key.startsWith('@media')) {
        themeStyles[key] = { ':root:not([data-theme])': config.CSS_MEDIA_VARS[key] }
      } else {
        themeStyles[key] = config.CSS_MEDIA_VARS[key]
      }
    }
    emotion.injectGlobal(themeStyles)
  }
}

export const setClass = (props, options = UPDATE_OPTIONS) => {} // setClassname(props, options.emotion.css)

