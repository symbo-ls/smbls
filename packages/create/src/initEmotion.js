'use strict'

import { transformDOMQLEmotion } from '@domql/emotion'
import { emotion as defaultEmotion } from '@symbo.ls/emotion'
import { init } from '@symbo.ls/init'
import { deepClone } from '@domql/utils'

import DEFAULT_CREATE_OPTIONS from './options'
import DEFAULT_CONFIG from '@symbo.ls/default-config'

export const initEmotion = (key, options = DEFAULT_CREATE_OPTIONS) => {
  const doc = options.parent || options.document || document
  const initOptions = options.initOptions || {}
  const emotion = initOptions.emotion || defaultEmotion
  if (!initOptions.emotion) initOptions.emotion = emotion
  const registry = options.registry || transformDOMQLEmotion(initOptions.emotion, options)

  const designSystem = options.designSystem || (options.defaultConfig ? deepClone(DEFAULT_CONFIG) : {})

  const scratchSystem = init(designSystem, {
    key,
    emotion,
    verbose: options.verbose,
    document: doc,
    ...DEFAULT_CREATE_OPTIONS.designSystem,
    ...initOptions
  })

  return [scratchSystem, emotion, registry]
}
