'use strict'

import { translate, setLang, loadTranslations, getActiveLang, getLanguages, upsertTranslation, getLocalStateLang } from './index.js'

export const polyglotFunctions = {
  polyglot: translate,
  getLocalStateLang,
  getActiveLang,
  getLang: getActiveLang,
  setLang,
  getLanguages,
  loadTranslations,
  upsertTranslation
}

export default polyglotFunctions
