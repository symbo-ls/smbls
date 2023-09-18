'use strict'

import { Button, Img, Flex, Checkbox } from "smbls"

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
  checkbox: {
    ':hover': 'none',
    padding: '0',
    checkbox: {
      boxSize: 'A1 A1',
      round: 'X',
      border: '1px solid #57575C',
      cursor: 'pointer'
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
  checkbox: { extend: Checkbox },
  image: { extend: Img },
  title: { props: { text: 'label'} },
  valueCaption: { props: { text: '5 mb'}},
  dotButton: {
    extend: Button,
    props: { icon: 'moreHorizontal' }
  }
}