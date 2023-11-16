'use strict'

import { Flex } from '@symbo.ls/atoms'

import { Color } from '../Sections'

export const Shadows = {
  extend: Flex,
  props: { flow: 'column' },

  Banner: {
    props: { round: '0 Z Z 0' },
    Title: {
      props: {
        text: 'Shadows',
        padding: '- - W1 -'
      }
    },
    Paragraph: {
      props: { alignItems: 'flex-end' },
      list: {
        Title: { text: 'What you’ll find' },
        Paragraph: {
          ...[
            { text: 'Shadow System' }
          ]
        }
      },
      P: {
        text: 'Our color palette is led by a bold, distinct primary color and rounded out by a select set of secondary colors that give depth and diversity to our designs.'
      }
    }
  },

  Flex: {
    extend: Color,
    props: {
      padding: 'E C1 - C1'
    },

    TitleParagraph: {
      Title: { props: { text: 'Shadow system' } }
    },
    Grid: {
      props: {
        columns: 'repeat(3, 1fr)',
        theme: 'secondary',
        padding: 'D',
        margin: '- -D',
        gap: 'B'
      },
      childExtend: {
        extend: Flex,
        props: {
          align: 'flex-end flex-start',
          padding: 'A'
        },
        title: {
          tag: 'h6',
          props: {
            text: 'Shadow 1',
            fontSize: 'A1',
            fontWeight: '500'
          }
        }
      },
      ...[
        {
          props: { style: { boxShadow: 'rgba(38, 57, 77, 0.45) 0px 25px 20px -20px' } }
        },
        {
          props: { style: { boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px' } }
        },
        {
          props: { style: { boxShadow: 'rgba(38, 57, 77, 0.57) 0px 22px 70px 4px' } }

        },
        {
          props: { style: { boxShadow: 'rgba(38, 57, 77, 0.3) 0px 19px 38px, rgba(38, 57, 77, 0.22) 0px 15px 12px' } }
        },
        {
          props: { style: { boxShadow: 'rgba(38, 57, 77, 0.3) 2.4px 2.4px 3.2px' } }
        },
        {
          props: { style: { boxShadow: 'rgba(38, 57, 77, 0.4) 0px 2px 4px, rgba(38, 57, 77, 0.3) 0px 7px 13px -3px, rgba(38, 57, 77, 0.2) 0px -3px 0px inset' } }
        }
      ]
    }
  }
}
