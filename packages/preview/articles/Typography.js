'use strict'

import { FontsBlock } from '../blocks'

export const Typography = {
  tag: 'article',
  extends: 'Flex',

  Header: {
    tag: 'header',
    extends: 'Banner',
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
    childExtends: FontsBlock,
    ...[{}, {}]
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
  //   extends: font,
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

  // childrenAs: 'state',
  // children: ({ context }) => {
  //   const { FONT } = context.designSystem
  //   return Object.keys(FONT).map(v => ({
  //     name: v
  //   }))
  // }
}
