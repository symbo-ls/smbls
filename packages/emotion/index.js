'use strict'

import createInstance from '@emotion/css/create-instance'

export const createEmotion = (key = 'smbls', container) => {
  return createInstance({ key, container })
}

export const emotion = createEmotion()
