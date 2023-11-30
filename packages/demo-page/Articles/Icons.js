'use strict'

import { Flex } from '@symbo.ls/atoms'

import { Banner } from '@symbo.ls/banner'

import { icon } from '../Sections'

export const Icons = {
  tag: 'article',
  extend: Flex,

  Header: {
    tag: 'header',
    extend: Banner,
    Title: { text: 'Icons' },
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

  Section: {
    extend: icon
  }

  // Flex: {
  //   props: {
  //     flow: 'column',
  //     padding: 'E C1 - C1',
  //     gap: 'A1'
  //   },

  //   Hgroup: {
  //     props: {
  //       flow: 'row'
  //     },
  //     Title: {
  //       props: {
  //         text: 'Library',
  //         fontSize: 'C',
  //         gap: 'Z2',
  //         padding: '- C - Y',
  //         fontWeight: '900',
  //         ':after': {
  //           content: '""',
  //           height: '1px',
  //           flex: '1',
  //           display: 'block',
  //           background: 'white .2',
  //           round: 'C'
  //         }

  //       }
  //     }
  //   },

  //   Grid: {
  //     props: {
  //       columns: 'repeat(12, 1fr)',
  //       gap: 'Z'
  //     },

  //     childExtend: {
  //       extend: 'Flex',
  //       props: {
  //         align: 'center',
  //         aspectRatio: '1/1',
  //         theme: 'dialog',
  //         round: 'Z'
  //       },
  //       Icon: {
  //         margin: 'auto',
  //         fontSize: 'D'
  //       }
  //     },

  //     $collection: ({ context }) => {
  //       const { ICONS } = context.designSystem
  //       return Object.keys(ICONS).map(name => ({
  //         Icon: { name }
  //       }))
  //     }
  //   }
  // }
}
