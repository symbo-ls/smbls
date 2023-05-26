'use strict'

import { editorJsToDOMQL, getSystem } from '@domql/converter'
import getSystem from '@domql/converter';

import { DomValueInterceptor } from "./data/DomValueInterceptor";

export const Editorjs = {
  define: {
    $editorjs: (param, el, state) => {
      if (!param) return

      const { interceptorApi, virtualStorage } = getSystem();
      interceptorApi.addInterceptor(DomValueInterceptor, 'before');

      const content = editorJsToDOMQL(param)
      el.content = content
    }
  }
}

