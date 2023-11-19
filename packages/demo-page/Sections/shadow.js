'use strict'

import { Grid } from '@symbo.ls/atoms'
import { Section } from './Section'

export const shadow = {
  extend: Section,
  props: {
    theme: 'secondary',
    padding: 'F D1 F C1'
  },

  Title: {
    props: {
      text: ''
    }
  },

  Paragraph: {
    extend: Grid,
    props: {
      columns: 'repeat(4, 1fr)',
      gap: 'D',
      childProps: {
        theme: 'dialog',
        padding: 'E',
        aspectRatio: '1 / 1',
        round: 'Z'
      }
    },
    ...[
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
            boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px'
          }
        }
      },
      {
        props: {
          style: {
            boxShadow: 'rgba(38, 57, 77, 0.19) 0px 10px 20px, rgba(38, 57, 77, 0.23) 0px 6px 6px'
          }
        }
      },
      {
        props: {
          style: {
            boxShadow: 'rgba(38, 57, 77, 0.09) 0px 2px 1px, rgba(38, 57, 77, 0.09) 0px 4px 2px, rgba(38, 57, 77, 0.09)0px 8px 4px, rgba(38, 57, 77, 0.09) 0px 16px 8px, rgba(38, 57, 77, 0.09) 0px 32px 16px'
          }
        }
      },
      {
        props: {
          style: {
            boxShadow: 'rgba(38, 57, 77, 0.15) 0px 15px 25px, rgba(38, 57, 77, 0.05) 0px 5px 10px'
          }
        }
      },
      {
        props: {
          style: {
            boxShadow: 'rgba(38, 57, 77, 0.12) 0px 2px 4px 0px, rgba(38, 57, 77, 0.32) 0px 2px 16px 0px'
          }
        }
      },
      {
        props: {
          style: {
            boxShadow: 'rgba(38, 57, 77, 0.25) 0px 25px 50px -12px'
          }
        }
      },
      {
        props: {
          style: {
            boxShadow: 'rgba(38, 57, 77, 0.25) 0px 30px 60px -12px, rgba(38, 57, 77, 0.25) 0px 18px 36px -18px'
          }
        }
      }
    ]
  }
}
