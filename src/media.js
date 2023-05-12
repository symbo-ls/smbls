'use strict'

import { create, Flex } from "smbls"

create({
  extend: Flex,
  state: {
    active: false
  },
  props: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    gap: 'X2',
    transform: 'translate(-50%, -50%)',
  },
  Box: {
    props: ({ state }) => console.log(state) || ({
      boxSize: 'A',
      background: 'blue',
      '.active': {
        background: 'red'
      }
    })
  },
  Button: {
    text: ({ state }) => 'make it ' + (state.active ? 'blue' : 'red'),
    on: {
      click: (ev, el, s) => {
        s.toggle('active')
        console.log(s.parse())
      }
    }
  }
}, {
})