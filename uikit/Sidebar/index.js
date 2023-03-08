'use strict'

import { Icon } from '@symbo.ls/icon'
import { Link } from '@symbo.ls/link'

const MenuItem = {
  extend: Link,
  props: { icon: '' },
  glyph: { extend: Icon }
}

export const Sidebar = {
  caption: '',
  nav: {
    style: {
      a: { cursor: 'pointer' }
    },
    childExtend: MenuItem
  }
}
