'use strict'

import { defaultDefine } from './define.js'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const { version } = require('../package.json')

export const DESIGN_SYSTEM_OPTIONS = {
  useReset: true,
  useVariable: true,
  useIconSprite: true,
  useSvgSprite: true,
  useDocumentTheme: true,
  useDefaultIcons: true,
  useFontImport: true,
  useDefaultConfig: true
}

export const ROUTER_OPTIONS = {
  initRouter: true,
  popState: true,
  injectRouterInLinkComponent: true
}

export const DEFAULT_CONTEXT = {
  ...DESIGN_SYSTEM_OPTIONS,
  router: ROUTER_OPTIONS,
  version
}

export const CREATE_OPTIONS = {
  state: {},
  pages: {},
  components: {},
  router: ROUTER_OPTIONS,
  define: defaultDefine
}

export default CREATE_OPTIONS
