'use strict'

import { defaultDefine } from './define'
import { emotion as defaultEmotion } from '@symbo.ls/emotion'

export const DEFAULT_CREATE_OPTIONS = {
  editor: {
    endpoint: 'api.symbols.app'
  },
  state: {},
  pages: {},
  designSystem: {
    useReset: true,
    useVariable: true,
    useIconSprite: true,
    useSvgSprite: true,
    useFontImport: true
  },
  components: {},
  initOptions: {
    emotion: defaultEmotion
  },
  router: {
    initRouter: true,
    injectRouterInLinkComponent: true
  },
  define: defaultDefine
}
