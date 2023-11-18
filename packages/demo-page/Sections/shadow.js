'use strict'

import { Grid } from '@symbo.ls/atoms'
import { Section } from './Section'

export const shadow = {
  extend: Section,
  props: {
    theme: 'secondary',
    padding: 'E2 D2 F1 D1'
  },

  Title: {
    props: {
      text: ''
      // text: 'Shadows'
    }
  },

  Paragraph: {
    extend: Grid,
    props: {
      columns: 'repeat(3, 1fr)',
      gap: 'D',
      childProps: {
        // border: '2px solid red',
        theme: 'dialog',
        padding: 'E1 -',
        round: 'Z'
      }
    },
    ...[
      {
        props: { style: { boxShadow: 'rgba(38, 57, 77, 0.3) 0px 19px 38px, rgba(38, 57, 77, 0.22) 0px 15px 12px' } }
      },
      {
        props: {
          style: {
            boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px'
          }
        }
      },
      {
        props: {
          style: {
            boxShadow: 'rgba(38, 57, 77, 0.56) 0px 22px 70px 4px'
          }
        }
      },
      {
        props: {
          style: {
            boxShadow: 'rgba(38, 57, 77, 0.35) 0px 5px 15px'
          }
        }
      },
      {
        props: {
          style: {
            boxShadow: 'rgba(38, 57, 77, 0.3) 0px 1px 2px 0px, rgba(38, 57, 77, 0.15) 0px 2px 6px 2px'
          }
        }
      },
      {
        props: {
          style: {
            boxShadow: 'rgba(38, 57, 77, 0.3) 0px 10px 20px, rgba(38, 57, 77, 0.23) 0px 6px 6px'
          }
        }
      }
    ]
  }
}
