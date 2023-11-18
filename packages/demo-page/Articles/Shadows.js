'use strict'

import { Flex } from '@symbo.ls/atoms'

import { Banner } from '@symbo.ls/banner'

import { shadow } from '../Sections'

// import { Color } from '../Sections'

export const Shadows = {
  tag: 'article',
  extend: Flex,

  Header: {
    tag: 'header',
    extend: Banner,

    Title: { text: 'Shadows' },
    Paragraph: {
      P: {},
      Flex: {
        Title: {},
        Paragraph: {
          ...[{
            props: { text: 'Brant font' }
          }, {
            props: { text: 'Functional font' }
          }]
        }
      }
    }
  },

  Section: {
    extend: shadow
    // props: { border: '3px solid red' }
  }

  // Section: {

  //   extend: Color,
  //   // props: { padding: 'E C1 - C1' },

  //   TitleParagraph: { Title: { props: { text: 'Shadow system' } } },
  //   Grid: {
  //     props: {
  //       columns: 'repeat(3, 1fr)',
  //       theme: 'secondary',
  //       padding: 'D',
  //       margin: '- -D',
  //       gap: 'B'
  //     },
  //     childExtend: {
  //       extend: Flex,
  //       props: {
  //         align: 'flex-end flex-start',
  //         padding: 'A'
  //       },
  //       title: {
  //         tag: 'h6',
  //         props: {
  //           text: 'Shadow 1',
  //           fontSize: 'A1',
  //           fontWeight: '500'
  //         }
  //       }
  //     },
  //     ...[
  //       {
  //         props: { style: { boxShadow: 'rgba(38, 57, 77, 0.45) 0px 25px 20px -20px' } }
  //       },
  //       {
  //         props: { style: { boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px' } }
  //       },
  //       {
  //         props: { style: { boxShadow: 'rgba(38, 57, 77, 0.57) 0px 22px 70px 4px' } }

  //       },
  //       {
  //         props: { style: { boxShadow: 'rgba(38, 57, 77, 0.3) 0px 19px 38px, rgba(38, 57, 77, 0.22) 0px 15px 12px' } }
  //       },
  //       {
  //         props: { style: { boxShadow: 'rgba(38, 57, 77, 0.3) 2.4px 2.4px 3.2px' } }
  //       },
  //       {
  //         props: { style: { boxShadow: 'rgba(38, 57, 77, 0.4) 0px 2px 4px, rgba(38, 57, 77, 0.3) 0px 7px 13px -3px, rgba(38, 57, 77, 0.2) 0px -3px 0px inset' } }
  //       }
  //     ]
  //   }
  // }
}
