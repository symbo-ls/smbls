'use strict'

import PACKAGE from './package.json'
import { Avatar } from './'

const key = 'Avatar'
const title = 'Avatar'
const description = ''
const category = ['Atoms']
const extend = 'Avatar'

const state = {}
const props = {}

const value = {
  extends: Avatar
}

const code = ''

const settings = {
  gridOptions: { colspan: 2, rowspan: 1 }
}

export default {
  key,
  title,
  description,
  category,
  extend,

  value,
  code,
  state,
  props,

  settings,
  package: PACKAGE.name,
  version: PACKAGE.version,
  interactivity: [],
  dataTypes: []
}
