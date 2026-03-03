'use strict'

import { defaultDefine } from './define.js'

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

export const CREATE_OPTIONS = {
  state: {},
  pages: {},
  components: {},
  router: {
    initRouter: true,
    popState: true,
    injectRouterInLinkComponent: true
  },
  define: defaultDefine
}

export default CREATE_OPTIONS
