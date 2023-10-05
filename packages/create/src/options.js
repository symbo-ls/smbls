'use strict'

import { defaultDefine } from './define'

export const DESIGN_SYSTEM_OPTIONS = {
  useReset: true,
  useVariable: true,
  useIconSprite: true,
  useSvgSprite: true,
  useDocumentTheme: true,
  useFontImport: true
}

export const CREATE_OPTIONS = {
  editor: {},
  state: {},
  pages: {},
  defaultConfig: true,
  components: {},
  router: {
    initRouter: true,
    popState: true,
    injectRouterInLinkComponent: true
  },
  define: defaultDefine
}

export default CREATE_OPTIONS
