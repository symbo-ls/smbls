'use strict'

import { isObject } from '@domql/utils'
import { fetchProject, fetchProjectAsync } from '@symbo.ls/fetch'

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
      if (options.editor.async) {
        fetchProjectAsync(key, options, callback || ((data) => {
          const designSystem = data.designSystem
          if (isObject(designSystem)) {
            options.utils.init(designSystem)
          }
          if (isObject(data.state)) {
            app.state.set(data.state)
          }
        }))
      }
    } catch (e) {
      console.error(e)
    }
  }
}
