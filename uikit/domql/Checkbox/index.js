'use strict'
import { Flex } from '@symbo.ls/atoms'
import { Button } from '@symbo.ls/button'
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
    round: 'Y',
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

export const CheckBoxWithSet = {
  extend: Flex,

  arrowButton: {
    extend: Button,
    props: { icon: { name: 'chevronRight' } }
  },
  CheckBoxWithImgWithLabel: {},
  UnitValue: {
    value: { text: '5' },
    unit: { text: 'MB' }
  },
  threeDotButton: {
    extend: Button,
    props: { icon: { name: 'moreHorizontal' } }
  },

  props: {
    align: 'center flex-start',
    height: 'fit-content',
    maxWidth: 'G+D',
    background: '#1C1C1F',
    padding: 'Z A',
    round: 'Z',
    gap: 'A',
    '& > button': {
      boxSize: 'fit-content fit-content',
      padding: '0',
      color: '#A3A3A8',
      background: 'transparent',
      fontSize: 'C'
    },
    UnitValue: {
      gap: 'Y',
      margin: '- - - auto'
    }
  }
}
