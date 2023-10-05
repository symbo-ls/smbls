'use strict'

import { transformDOMQLEmotion } from '@domql/emotion'
import { emotion as defaultEmotion } from '@symbo.ls/emotion'
import { init } from '@symbo.ls/init'
import { deepClone } from '@domql/utils'

import { DESIGN_SYSTEM_OPTIONS } from './options'
import DEFAULT_CONFIG from '@symbo.ls/default-config'

export const initEmotion = (key, options = DESIGN_SYSTEM_OPTIONS) => {
  const doc = options.parent || options.document || document
  const initOptions = options.initOptions || {}
  const emotion = initOptions.emotion

  if (!initOptions.emotion) initOptions.emotion = defaultEmotion

  const registry = options.registry || transformDOMQLEmotion(initOptions.emotion, options)
  const designSystem = options.designSystem || (options.defaultConfig ? deepClone(DEFAULT_CONFIG) : {})

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
