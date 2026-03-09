'use strict'

import { transformDOMQLEmotion, emotion as defaultEmotion } from './index.js'
import { init } from 'smbls/src/init.js'
import { DEFAULT_CONTEXT } from 'smbls/src/options.js'
import { deepClone, deepMerge } from '@domql/utils'

import { DEFAULT_CONFIG } from '@symbo.ls/default-config'

const OPTION_KEYS = [
  'useReset', 'useVariable', 'useFontImport', 'useIconSprite',
  'useSvgSprite', 'useDocumentTheme', 'useDefaultIcons', 'useDefaultConfig', 'verbose',
  'globalTheme'
]

export const initEmotion = (key, options = {}) => {
  const doc = options.parent || options.document || document
  const initOptions = options.initOptions || {}
  const emotion = initOptions.emotion

  if (!initOptions.emotion) initOptions.emotion = defaultEmotion

  const registry =
    options.registry || transformDOMQLEmotion(initOptions.emotion, options)
  const designSystem =
    initOptions.useDefaultConfig || options.useDefaultConfig || options.designSystem?.useDefaultConfig
      ? deepMerge(options.designSystem, deepClone(DEFAULT_CONFIG))
      : options.designSystem || deepClone(DEFAULT_CONFIG)

  // Pick context-level overrides (from user's config.js spread into context)
  const contextOverrides = {}
  for (const k of OPTION_KEYS) {
    if (options[k] !== undefined) contextOverrides[k] = options[k]
  }

  const scratchSystem = init(designSystem, {
    key,
    emotion,
    document: doc,
    files: options.files,
    ...DEFAULT_CONTEXT,
    ...contextOverrides,
    ...initOptions
  })

  return [scratchSystem, emotion, registry]
}
