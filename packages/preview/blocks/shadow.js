'use strict'

import { DefaultBlock } from './section'

export const shadow = {
  extends: DefaultBlock,
  padding: 'D2 D',
  '@mobileL': { padding: 'E C' },
  '@mobileS': { padding: 'E B' },

  Title: null,

  Paragraph: {
    display: 'grid',
    columns: 'repeat(8, 1fr)',
    gap: 'C2',
    '@tabletM': { gap: 'B2' },
    '@tabletS': { columns: 'repeat(4, 1fr)' },
    '@mobileL': { gap: 'B1' },
    '@mobileS': { gap: 'B' },
    '@mobileXS': { gap: 'A1' },
    childProps: {
      theme: 'dialog',
      aspectRatio: '1 / 1',
      round: 'Z'
    },
    ...[
      {
        boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px'
      },
      {
        boxShadow: 'rgba(38, 57, 77, 0.56) 0px 22px 70px 4px'
      },
      {
        boxShadow:
          'rgba(38, 57, 77, 0.19) 0px 10px 20px, rgba(38, 57, 77, 0.23) 0px 6px 6px'
      },
      {
        boxShadow:
          'rgba(38, 57, 77, 0.12) 0px 2px 4px 0px, rgba(38, 57, 77, 0.32) 0px 2px 16px 0px'
      },
      {
        boxShadow:
          'rgba(38, 57, 77, 0.3) 0px 19px 38px, rgba(38, 57, 77, 0.22) 0px 15px 12px'
      },
      {
        boxShadow: 'rgba(38, 57, 77, 0.35) 0px 5px 15px'
      },
      {
        boxShadow:
          'rgba(38, 57, 77, 0.25) 0px 13px 27px -5px, rgba(38, 57, 77, 0.35) 0px 8px 16px -8px'
      },
      {
        boxShadow:
          'rgba(38, 57, 77, 0.25) 0px 30px 60px -12px, rgba(38, 57, 77, 0.25) 0px 18px 36px -18px'
      }
    ]
  }
}
