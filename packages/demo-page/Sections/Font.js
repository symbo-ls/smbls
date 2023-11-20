'use stric'

import { DemoSection } from './Section'

export const font = {
  extend: DemoSection,
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
      flow: 'column',
      gap: '0',
      round: 'V2',
      lineHeight: '1.1em',
      childProps: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        maxWidth: '100%',
        whiteSpace: 'nowrap',
        minWidth: '0',
        text: 'Today is a big day for our tribe. The year ends.',
        ':first-child': { fontWeight: '900' },
        ':nth-child(2)': { fontWeight: '700' },
        ':nth-child(3)': { fontWeight: '500' },
        ':nth-child(4)': { fontWeight: '400' },
        ':last-child': { fontWeight: '100' }
      }
    },
    ...[
      { },
      {},
      {},
      {},
      {}
    ]
  }
}
