'use strict'

import { transformDOMQLEmotion } from '@domql/emotion'
import { emotion as defaultEmotion } from '@symbo.ls/emotion'
import { init } from '@symbo.ls/init'
import { deepClone, deepMerge } from '@domql/utils'

import { DESIGN_SYSTEM_OPTIONS } from './options'
import DEFAULT_CONFIG from '@symbo.ls/default-config'

export const initEmotion = (key, options = {}) => {
  const doc = options.parent || options.document || document
  const initOptions = options.initOptions || {}
  const emotion = initOptions.emotion

  if (!initOptions.emotion) initOptions.emotion = defaultEmotion

  const registry = options.registry || transformDOMQLEmotion(initOptions.emotion, options)
  const designSystem = (initOptions.useDefaultConfig || options.designSystem?.useDefaultConfig)
    ? deepMerge(options.designSystem, deepClone(DEFAULT_CONFIG))
    : options.designSystem || deepClone(DEFAULT_CONFIG)

  const scratchSystem = init(designSystem, {
    key,
    emotion,
    verbose: options.verbose,
    document: doc,
    ...DESIGN_SYSTEM_OPTIONS,
    ...initOptions
  })

  return [scratchSystem, emotion, registry]
}
