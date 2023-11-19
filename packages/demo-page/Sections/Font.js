'use stric'

import { Section } from './Section'

export const font = {
  extend: Section,
  props: { padding: 'D2 0 D2 A', flex: '1' },

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
      padding: 'A1',
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
