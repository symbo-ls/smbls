'use strict'

import { Button, Icon, Img, Flex } from "smbls"

const props = {
  boxSize: 'fit-content',
  align: 'center flex-start',
  padding: 'Y2 A2',
  round: 'Y',
  background: '#1C1C1F',

  '& > button': {
    boxSize: 'fit-content fit-content',
    padding: '0',
    color: '#A3A3A8',
    background: 'transparent'
  },

  arrowButton: { margin: '- A2 - -' },

  label: {
    input: {
      display: 'none',
      '&:checked + div': { background: '#0474F2' },
      '&:checked + div > svg': { opacity: '1' }
    },
    checkbox: {
      boxSize: 'A1 A1',
      border: '1px solid #57575C',
      round: 'X',
      align: 'center center',
      cursor: 'pointer',
      transition: 'background .15s ease',
      icon: {
        fontSize: 'Y',
        opacity: '0',
        transition: 'opacity .15s ease',
      }
    }
  },

  image: {
    boxSize: 'B2 C',
    border: '.5px solid yellow',
    margin: '- A',
    round: 'X'
  },

  title: {
    fontSize: 'Z1',
    textTransform: 'capitalize',
    margin: '- D2 - -'
  },

  valueCaption: {
    fontSize: 'Z1',
    textTransform: 'uppercase',
    color: '#A3A3A8',
    margin: '- B - -'
  }
}

export const DropDownItem = {
  extend: Flex,
  props,

  arrowButton: {
    extend: Button,
    props: { icon: 'chevronRight' }
  },

  label: {
    input: { attr: { type: 'checkbox' } },
    checkbox: {
      extend: Flex,
      icon: {
        extend: Icon,
        props: { name: 'check' }
      }
    }
  },

  image: { extend: Img },

  title: { props: { text: 'label'} },

  valueCaption: { props: { text: '5 mb'}},

  dotButton: {
    extend: Button,
    props: { icon: 'moreHorizontal' }
  }
}