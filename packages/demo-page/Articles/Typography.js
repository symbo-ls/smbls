'use strict'

import { Flex } from '@symbo.ls/atoms'
// import { font } from '../Sections'
import { Banner } from '@symbo.ls/banner'
import { font } from '../Sections'

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
            props: { text: 'Brant font' }
          }, {
            props: { text: 'Functional font' }
          }]
        }
      }
    }
  },

  Section: {
    extend: font

    // Title: {},
    // Paragraph: {
    //   props: ({ state }) => ({
    //     font: `"${state.name}", sans-serif`,
    //     theme: 'dialog',
    //     padding: 'B2 -',
    //     wordWrap: 'break-word',
    //     flex: 5,
    //     overflow: 'hidden',
    //     color: 'white',
    //     flow: 'column',
    //     text: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    //     fontSize: 'G2',
    //     fontWeight: '900',
    //     lineHeight: '1em',
    //     maxWidth: 'F2'
    //   })
    // }
  }

  // Section: {
  //   extend: font,
  //   Title: {
  //     props: { text: 'Sans Serif' }
  //   },
  //   Paragraph: {
  //     letters: {
  //       H1: { text: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
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
