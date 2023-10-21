'use strict'

import { Flex, Grid } from '@symbo.ls/atoms'
import { Modal } from '@symbo.ls/modal'
import { FieldWithTitle } from '@symbo.ls/field'

export const CommonForm = {
  extend: Modal,
  props: {
    gap: 'B',
    boxSizing: 'border-box',
    padding: 'A1 A A A'
  },

  X: {
    props: {
      top: 'Y2',
      right: 'Y2'
    }
  },

  Header: { props: { gap: 'Y' } },

  Form: {
    extend: Flex,
    props: {
      flow: 'column',
      ParagraphButton: { margin: 'Z2 - - Z2' },
      ParagraphButtonWithCheckbox: { margin: 'Z1 - - Z' },
      '> div ~ div > button': { padding: 'Z2+V1 B1' },
      '> div ~ button': { padding: 'Z2+V1 B1' }
    },

    Fields: {
      extend: Grid,
      props: {
        columnGap: 'A',
        rowGap: 'A2'
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
        margin: 'C1 - - -',
        childProps: {
          fontWeight: '500'
        }
      }
    }
  }
}
