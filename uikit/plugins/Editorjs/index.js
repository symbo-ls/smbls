'use strict'

import {editorJsToDOMQL, getSystem, initMutiny} from '@domql/converter'
import domqlConverterLib from '@domql/converter';

import { DomValueInterceptor } from "./data/DomValueInterceptor";

export const Editorjs = {
  define: {
    $editorjs: (param, el, state) => {
      if (!param) return

      if (!domqlConverterLib.getSystem()) {
        const { interceptorApi, virtualStorage } = domqlConverterLib.getSystem();
        initMutiny();
        interceptorApi.addInterceptor(DomValueInterceptor, 'before');
      }

      const content = editorJsToDOMQL(param)
      el.content = content
    }
  }
}

