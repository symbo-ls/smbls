'use strict'

import { Grid, Form } from '@symbo.ls/atoms'
import { CommonField } from '@symbo.ls/field'

export const CommonForm = {
  extend: [Form, Grid],

  props: {
    gap: 'B2',
    height: 'fit-content',
    margin: '0',
    width: '100%'
  },

  childExtend: {
    extend: CommonField,
    props: {
      minWidth: '100%',
      Textarea: {
        width: '100%',
        maxWidth: '100%'
      },
      Hint: { color: 'gray .92 +68' }
    },

    Title: {},
    Field: {
      props: { minWidth: '100%' }
    }
  }
}
