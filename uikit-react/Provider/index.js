"use strict"

import React, { useContext, useEffect, useState } from "react"
import DEFAULT_CONFIG from '@symbo.ls/default-config'
import { init } from "@symbo.ls/init"
import { fetchStateAsync } from "@symbo.ls/fetch"

const DEFAULT_PROPS = {
  editor: {
    remote: true,
    async: true,
    serviceRoute: 'state',
    endpoint: 'api.symbols.dev'
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
  snippets: {}
}

export const SymbolsContext = React.createContext(DEFAULT_PROPS)

export const useData = () => {
  const { state } = useContext(SymbolsContext)
  return state
}

export const useDesignSystem = () => {
  const { designSystem } = useContext(SymbolsContext)
  return designSystem
}

export const SymbolsProvider = (options = DEFAULT_PROPS) => {
  const { appKey, children } = options

  const designSystem = init(options.designSystem || DEFAULT_CONFIG)
  const [state, setStaste] = useState(options.state)

  const { Provider } = SymbolsContext

  useEffect(() => {
    if (appKey && options.editor) {
      try {
        if (options.editor.async && !state) fetchStateAsync(appKey, options, (data) => {
          setStaste(data)
        })
      } catch (e) {
        console.error(e)
      }
    }
  })

  return React.createElement(
    Provider,
    { value: { designSystem, state } },
    children
  )
}
