'use strict'

import { Flex } from '@symbo.ls/atoms'
// import { font } from '../Sections'
import { Banner } from '@symbo.ls/banner'
import { font } from '../_Sections'

export const Typography = {
  tag: 'article',
  extend: Flex,

  Header: {
    tag: 'header',
    extend: Banner,
    Title: {
      props: {
        text: 'type',
        lineHeight: '1.15em'
      }
    },
    Paragraph: {
      P: {},
      Flex: {
        Title: {},
        Paragraph: {
          ...[{
            props: { text: 'Brand font' }
          }, {
            props: { text: 'Functional font' }
          }]
        }
      }
    }
  },

  Flex: {
    props: {
      flow: 'column',
      padding: 'B - C -',
      childProps: {
        ':not(:last-child)': {
          border: 'solid, white .15',
          borderWidth: '0 0 1px 0'
        }
      }
    },
    childExtend: font,
    ...[
      {},
      {}
    ]
  }
  // Section: {

  //   // Title: {},
  //   // Paragraph: {
  //   //   props: ({ state }) => ({
  //   //     font: `"${state.name}", sans-serif`,
  //   //     theme: 'dialog',
  //   //     padding: 'B2 -',
  //   //     wordWrap: 'break-word',
  //   //     flex: 5,
  //   //     overflow: 'hidden',
  //   //     color: 'white',
  //   //     flow: 'column',
  //   //     text: 'ABCDEFGHIJKLMNToday is a big day for our tribe. The year ends.abcdefghijklmnopqrstuvwxyz',
  //   //     fontSize: 'G2',
  //   //     fontWeight: '900',
  //   //     lineHeight: '1em',
  //   //     maxWidth: 'F2'
  //   //   })
  //   // }
  // }

  // Section: {
  //   extend: font,
  //   Title: {
  //     props: { text: 'Sans Serif' }
  //   },
  //   Paragraph: {
  //     letters: {
  //       H1: { text: 'ABCDEFGHIJKLMNToday is a big day for our tribe. The year ends.' },
  //       H3: { text: 'abcdefghijklmopqrstuvwxyz' },
  //       P: { text: 'Quick brown fox jumps over lazy frog' }
  //     }
  //   }
  // },

  // $setStateCollection: ({ context }) => {
  //   const { FONT } = context.designSystem
  //   return Object.keys(FONT).map(v => ({
  //     name: v
  //   }))
  // }
}
