'use strict'

import { Focusable, Flex, Icon, IconButton, Avatar } from '..'

export const Upload = {
  extend: [Focusable, Flex],
  tag: 'label',

  props: {
    position: 'relative',
    flow: 'column',
    align: 'center center',
    round: 'A',
    cursor: 'pointer',
    border: '1.6px, dashed, white 0.1',
    padding: 'B B2',
    input: {
      position: 'absolute',
      inset: '0 0 0 0',
      opacity: '0',
      visibility: 'hidden'
    }
  },
  input: { attr: { type: 'file' } },

  icon: {
    extend: Icon,
    props: {
      name: 'upload',
      fontSize: `${26 / 16}em`,
      opacity: '.2'
    }
  },
  p: {
    props: {
      text: ' or click and upload from your computer',
      flexFlow: 'column',
      flexAlign: 'center center',
      opacity: '.22',
      margin: '0'
    },
    span: {
      text: 'Drag and drop your font file',
      style: { display: 'block' }
    }
  }
}

export const DragNdropUser = {
  extend: Flex,

  props: ({ state }) => ({
    flow: 'column',
    align: 'center center',
    gap: 'A',
    round: 'A',

    img: { boxSize: 'C C', src: state.src },
    buttons: {
      gap: 'Y',
      childProps: {
        padding: '0',
        boxSize: 'B B',
        background: 'gray3',
        round: 'Y1',
        color: 'gray6',
        style: { '> svg': { fontSize: `${14 / 16}em` } }
      }
    }
  }),

  img: { extend: Avatar },

  buttons: {
    extend: Flex,
    childExtend: IconButton,
    ...[
      { props: { icon: 'reload' } },
      { props: { icon: 'trash' } }
    ]
  }
}
