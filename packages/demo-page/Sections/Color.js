'use strict'

import { DemoSection } from './Section'

export const color = {
  extend: DemoSection,

  Title: {
    props: {
      text: 'Primary color',
      padding: 'C1 - B1 -'
    }
  },
  Paragraph: {
    extend: 'Flex',
    props: {
      flow: 'row wrap',
      gap: 'D1',
      '@tabletM': {
      },
      childProps: {
        // border: '2px solid red',
        minWidth: 'G',
        aspectRatio: '1 / 1',
        theme: 'dialog',
        round: 'W'
      }
    }
  }
}
