'use strict'

import emotion from '@emotion/css/create-instance'

export const createEmotion = (key = 'smbls') => {
  return emotion({ key: key })
}

export default createEmotion()
