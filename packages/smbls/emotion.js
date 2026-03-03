'use strict'

import createInstance from '@emotion/css/create-instance'

export const createEmotion = (key = 'smbls', container) => {
  const cleanKey = key.replaceAll(/\./g, '-')
  return createInstance({ key: cleanKey, container })
}

export const emotion = createEmotion()
