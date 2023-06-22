'use strict'

import { Button } from "smbls"

const props = {
  boxSize: 'fit-content fit-content',
  background: '#141416',
  border: '1px solid #313141',
  icon: 'circle',
  color: 'white',
  gap: 'Z',
  round: 'Z2',
  padding: 'Y2 Z1',
  align: 'center center',
  '& > svg': { fontSize: `${19 / 16}em` },
  span: { textTransform: 'capitalize' },
  box: {
    background: '#313141',
    padding: 'Y Y',
    round: 'Y1',
    textAlign: 'center'
  }
}

export const Tab = {
  extend: Button,
  props,
  icon: {},
  span: { props: { text: 'label'} },
  box: { props: { text: '19' }}

}