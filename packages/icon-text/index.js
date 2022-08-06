'use strict'

import { Icon } from '@symbo.ls/icon'

export const IconText = {
  props: {
    flexAlign: 'center center',
    display: 'flex',
    lineHeight: 1
  },

  icon: { extends: Icon, if: ({ props }, s) => props.icon },
  text: ({ props }) => props.text
}
