'use strict'

import { fetchProject, fetchStateAsync } from '@symbo.ls/fetch'

export const fetchSync = async (key, options) => {
  if (key && options.editor) {
    try {
      if (!options.editor.async) await fetchProject(key, options)
    } catch (e) {
      console.error(e)
    }
  }
}

export const fetchAsync = (app, key, options, callback) => {
  if (key && options.editor) {
    try {
      const defaultCallback = (data) => app.state.set(data)
      if (options.editor.async) fetchStateAsync(key, options, callback || defaultCallback)
    } catch (e) {
      console.error(e)
    }
  }
}
