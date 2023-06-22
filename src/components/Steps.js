'use strict'

import { Flex, Icon } from "smbls"


const checkBoxWithCaptionLine = {
  tag: 'label',
  extend: Flex,
  props: {
    align: 'center flex-start',
    input: {
      display: 'none',
      ':checked + div': {
        background: '#0474F2',
        border: 'none'
      },
      ':checked + div > svg': { opacity: '1'},
      ':checked ~ span': {
        background: '#0474F2'
      },
    },
    checkbox: {
      boxSize: `B1`,
      border: '2px solid #313141',
      round: '100%',
      align: 'center center',
      cursor: 'pointer',
      icon: {
        fontSize: 'D',
        opacity: '0'
      }
    },
    caption: {
      fontSize: 'B',
      textTransform: 'capitalize',
      padding: '- Y2 - Z1'
    },
    line: {
      boxSize: '2px E',
      background: '#313141',
      round: 'Z'
    }
  },

  input: { attr: { type: 'checkbox'} },
  checkbox: {
    extend: Flex,
    icon: {
      extend: Icon,
      props: { name: 'check' }
    }
  },
  caption: { props: { text: 'label' } },
  line: { tag: 'span' }
}

export const Steps = {
  extend: Flex,
  props: {
    gap: 'Y2',
    '& > label:last-child > span': { display: 'none' }
  },
  childExtend: checkBoxWithCaptionLine,
  ...[{}, {}, {}, {}]
}