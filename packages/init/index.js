'use strict'

import {
  set,
  getActiveConfig,
  getFontFaceString,
  appendSVGSprite,
  appendIconsSprite
} from '@symbo.ls/scratch'

import { isObject, deepMerge } from '@domql/utils'

import { emotion as defaultEmotion } from '@symbo.ls/emotion'
// import { setClassname } from 'css-in-props'

import DYNAMIC_JSON from './dynamic.json'

const CONFIG = getActiveConfig()

const mergeWithLocalFile = (config = CONFIG, RC_FILE) => {
  const rcfile = isObject(RC_FILE) ? RC_FILE : DYNAMIC_JSON || {}
  return deepMerge(config, rcfile)
}

const SET_OPTIONS = {
  emotion: defaultEmotion,
  useVariable: true,
  useReset: true,
  useFontImport: true,
  useIconSprite: true,
  useSvgSprite: true
}

export const init = (config, RC_FILE, options = SET_OPTIONS) => {
  const resultConfig = mergeWithLocalFile(config, RC_FILE)
  const emotion = options.emotion || defaultEmotion

  const conf = set({
    verbose: options.verbose,
    useReset: options.useReset,
    useFontImport: options.useFontImport,
    useVariable: options.useVariable,
    useSvgSprite: options.useSvgSprite,
    useIconSprite: options.useIconSprite,
    ...resultConfig
  }, { newConfig: options.newConfig })

  const FontFace = getFontFaceString(conf.FONT)

  const useReset = conf.useReset
  const useVariable = conf.useVariable
  const useFontImport = conf.useFontImport
  const useSvgSprite = conf.useSvgSprite
  const hasSvgs = config.svg || config.SVG
  const useIconSprite = conf.useIconSprite
  const hasIcons = config.icons || config.ICONS

  if (useFontImport) emotion.injectGlobal(FontFace)
  if (useVariable) emotion.injectGlobal({ ':root': conf.CSS_VARS })
  if (useReset) emotion.injectGlobal(conf.RESET)

  if (hasSvgs) appendSVGSprite(hasSvgs, { document: options.document })
  else if (useSvgSprite) appendSVGSprite(conf.SVG, { document: options.document })
  
  if (hasIcons) appendIconsSprite(hasIcons, { document: options.document })
  else if (useIconSprite) appendIconsSprite(conf.ICONS, { document: options.document })
  
  return conf
}

export const updateReset = (config, RC_FILE, options = { emotion: defaultEmotion }) => {
  const resultConfig = mergeWithLocalFile(config || {}, RC_FILE)
  const conf = set({
    verbose: false,
    ...resultConfig
  })
  options.emotion.injectGlobal({':root': conf.CSS_VARS })
  options.emotion.injectGlobal(conf.RESET)
}

export const setClass = (props, options = { emotion: defaultEmotion }) => {}// setClassname(props, options.emotion.css)

export { CONFIG, DYNAMIC_JSON }
