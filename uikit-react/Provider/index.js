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
  snippets: {},
  setGlobalTheme: () => {}
}

export const SymbolsContext = React.createContext(DEFAULT_PROPS)

export const useGlobalState = () => {
  const { state } = useContext(SymbolsContext)
  return state
}

export const useGlobalTheme = (prop) => {
  const { designSystem } = useContext(SymbolsContext)
  const [ globalTheme, setGlobalTheme ] = useState(designSystem.globalTheme)
  designSystem.globalTheme = globalTheme
  return [globalTheme, setGlobalTheme]
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
        if (options.editor.async) fetchStateAsync(appKey, options, (data) => {
          setStaste(data)
        })
      } catch (e) {
        console.error(e)
      }
    }
  }, [Object.values[state]])

  return React.createElement(
    Provider,
    { value: { designSystem, state } },
    children
  )
}
