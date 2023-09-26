'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Button } from '@symbo.ls/button'

export const Checkbox = {
  tag: 'label',

  props: {
    boxSize: 'fit-content fit-content',
    cursor: 'pointer',
    round: 'Y'
  },

  Input: {
    type: 'checkbox',
    display: 'none',
    ':checked ~ div': {
      background: '#0474F2',
      border: 'none'
    },
    ':checked ~ div > svg': { opacity: '1' }
  },

  Check: {
    extend: Flex,
    props: {
      align: 'center center',
      boxSize: 'A+X A+X',
      border: '1px solid #57575C',
      round: 'X',
      transition: 'background .15s ease-in-out'
    },
    Icon: {
      props: {
        icon: 'check',
        opacity: '0',
        transition: 'opacity .15s ease-in-out'
      }
    }
  }
}

export const CheckboxWithLabel = {
  extend: Flex,
  props: {
    align: 'center flex-start',
    gap: 'Z+X'
  },

  Checkbox: {},
  Caption: {
    props: {
      text: 'Label',
      fontSize: 'A'
    }
  }
}

export const CheckboxWithTitleParagraph = {
  extend: Flex,

  props: {
    align: 'flex-start flex-start',
    gap: 'Z'
  },

  Checkbox: { check: { boxSize: 'A+Y A+Y' } },
  TitleParagraph: {}
}

export const CheckboxWithImgWithLabel = {
  extend: CheckboxWithLabel,

  Checkbox: {},
  Img: {
    boxSize: 'A+Y C',
    background: 'linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%)',
    round: 'X'
  },
  Caption: {}
}

export const CheckboxWithSet = {
  extend: Flex,
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
    }
  },

  Button: { icon: 'chevronRight' },

  CheckboxWithImgWithLabel: {},

  UnitValue: {
    gap: 'Y',
    margin: '- - - auto',
    value: { text: '5' },
    unit: { text: 'MB' }
  },

  Button2: {
    extend: Button,
    props: { icon: 'moreHorizontal' }
  }
}
