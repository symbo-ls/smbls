'use strict'

import { Grid, Form } from '@symbo.ls/atoms'
import { CommonField } from '@symbo.ls/field'

export const CommonForm = {
  extend: [Form, Grid],
  props: {
    gap: 'A1',
    height: 'fit-content',
    margin: '0',
    width: '100%'
  },

  childExtend: {
    extend: CommonField,
    props: {
      minWidth: '100%',
      Textarea: { width: '100%' },
      Hint: { color: 'gray .92 +68' }
    },

    Title: { props: { fontSize: 'Y2' } },
    Field: {
      props: { minWidth: '100%' },
      Input: { fontSize: 'Y2' }
    }
  }
}
