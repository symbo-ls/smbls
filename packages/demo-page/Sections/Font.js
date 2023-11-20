'use stric'

import { Section } from './Section'

export const font = {
  extend: Section,
  props: {
    flex: '1',
    padding: 'D D D1 D'
    // padding: 'D2 D D2 A'
  },

  Title: {
    props: { text: 'Sans-Serif' }
  },
  Paragraph: {
    tag: 'p',
    props: {
      theme: 'dialog',
      fontSize: 'G2',
      maxWidth: '100%',
      boxSizing: 'border-box',
      padding: 'A',
      // padding: 'A1',
      // padding: 'D',
      // padding: 'A1 - A1 A1',
      flow: 'column',
      round: 'V2',
      lineHeight: '1.1em',
      // fontWeight: '900',
      childProps: {
        ':first-child': { fontWeight: '900' },
        ':nth-child(2)': { fontWeight: '700' },
        ':nth-child(3)': { fontWeight: '500' },
        ':nth-child(4)': { fontWeight: '400' },
        ':last-child': { fontWeight: '100' }
      }
    },
    ...[
      { text: 'ABCDEFGHIJKLMN' },
      { text: 'OPQRSTUVWXYZ' },
      { text: 'abcdefghijklm' },
      { text: 'nopqrstuv' },
      { text: 'wxyz' }
    ]
  }
}
