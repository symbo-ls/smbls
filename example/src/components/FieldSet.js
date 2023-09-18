'use strict'

import { Flex, Button } from "smbls"

import { Search } from "./Search"

const props = {
  dropDown: {
    padding: '0',
    height: 'calc(100% - 2px)',
    position: 'absolute',
    minWidth: `${95 / 16}em`,
    gap: 'A',
    round: 'A',
    background: '#141416',
    color: 'white',
    textTransform: 'capitalize',
    zIndex: '10',
    margin: '- - - 1px'
  },
  searchButton: {
    left: 'E'
  },
  input: {
    padding: `- - - ${140 / 16}em`
  }
}

export const FieldSet = {
  extend: Search,
  props,

  dropDown: {
    extend: Button,
    props: { icon: 'arrowDown', text: 'all' }
  }
}