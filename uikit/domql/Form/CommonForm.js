'use strict'

import { Flex, Grid } from '@symbo.ls/atoms'
import { Modal } from '@symbo.ls/modal'
import { FieldWithTitle } from '@symbo.ls/field'

export const CommonForm = {
  extend: Modal,
  props: {
    gap: 'B',
    boxSizing: 'border-box',
    padding: 'A+V A'
  },

  Header: {
    props: { gap: 'Z' },
    Title: {
      caption: { props: { padding: 'Y W2 - W2' } },
      x: {
        props: {
          margin: '-Y+V - - -',
          fontSize: 'C'
        }
      }
    }
  },

  Form: {
    extend: Flex,
    props: {
      flow: 'column',
      '> div ~ button': { padding: 'Z2+V1 -' },
      '> div ~ div:last-child > button': { padding: 'Z2+V1 B' },
      '> div ~ div:last-child > button:first-child': { padding: 'Z2+V Z' }
    },

    Fields: {
      extend: Grid,
      props: {
        columnGap: 'A',
        rowGap: 'A1'
      },
      childExtend: {
        extend: FieldWithTitle,
        props: {
          width: '100%',
          Field: { minWidth: '100%' }
        }
      }
    },

    Submit: {
      props: {
        minWidth: '100%',
        margin: 'C - - -'
      }
    }
  }
}
