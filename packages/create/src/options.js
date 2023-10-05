'use strict'

import { defaultDefine } from './define'
import { emotion as defaultEmotion } from '@symbo.ls/emotion'

export default {
  editor: {},
  state: {},
  pages: {},
  defaultConfig: true,
  designSystem: {
    useReset: true,
    useVariable: true,
    useIconSprite: true,
    useSvgSprite: true,
    useDocumentTheme: true,
    useFontImport: true
  },
  components: {},
  initOptions: {
    emotion: defaultEmotion
  },
  router: {
    initRouter: true,
    popState: true,
    injectRouterInLinkComponent: true
  },
  define: defaultDefine
}
