'use strict'
import { Flex } from '@symbo.ls/atoms'
import { Icon } from '@symbo.ls/icon'

export const CheckBox = {
  tag: 'label',

  Input: { props: { type: 'checkbox' } },
  check: {
    extend: Flex,
    checkIcon: Icon,
    props: { Icon: { name: 'check' } }
  },

  props: {
    boxSize: 'fit-content fit-content',
    cursor: 'pointer',
    style: {
      'input:checked ~ div': {
        background: '#0474F2',
        border: 'none',
        '> svg': { opacity: '1' }
      }
    },
    Input: { display: 'none' },
    check: {
      align: 'center center',
      boxSize: 'A+X A+X',
      border: '1px solid #57575C',
      round: 'X',
      transition: 'background .15s ease-in-out',
      checkIcon: {
        opacity: '0',
        transition: 'opacity .15s ease-in-out'
      }
    }
  }
}

export const CheckboxWithLabel = {
  extend: Flex,
  CheckBox: {},
  H6: { text: 'Label' },
  props: {
    align: 'center flex-start',
    gap: 'Z+X',
    CheckBox: {
      check: { background: 'black' }
    },
    H6: { fontSize: 'A' }
  }
}

export const CheckBoxWithImgWithLabel = {
  extend: CheckboxWithLabel,
  CheckBox: {},
  Img: {},
  H6: { text: 'Label' },

  props: {
    Img: {
      boxSize: 'A+Y C',
      background: 'linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%)',
      round: 'X'
    }
  }
}
