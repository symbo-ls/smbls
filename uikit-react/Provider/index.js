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

export const useGlobalState = () => {
  const { state, setState } = useContext(SymbolsContext)
  return [state, setState]
}

export const useGlobalTheme = (prop) => {
  const { designSystem, globalTheme, setGlobalTheme } = useContext(SymbolsContext)
  console.log('DSys', designSystem, 'Global theme', globalTheme, 'setGlobalTheme', setGlobalTheme);

  designSystem.globalTheme = globalTheme
  return [globalTheme, setGlobalTheme]
}

export const useDesignSystem = () => {
  const { designSystem } = useContext(SymbolsContext)
  return designSystem
}

export const useSymbols = () => useContext(SymbolsContext)

export const SymbolsProvider = (options = DEFAULT_PROPS) => {
  const { appKey, children } = options

  const ds = init(options.designSystem || DEFAULT_CONFIG)
  const [ designSystem, setDesignSystem ] = useState(ds)
  const [ state, setState ] = useState(options.state)
  const [ globalTheme, setGlobalTheme ] = useState(designSystem.globalTheme)
  const { Provider } = SymbolsContext

  useEffect(() => {
    if (appKey && options.editor) {
      try {
        if (options.editor.async) fetchStateAsync(appKey, options, (data) => {
          setState(data)
        })
      } catch (e) {
        console.error(e)
      }
    }
  }, [Object.values[state]])

  return React.createElement(
    Provider,
    { value: {
      designSystem, setDesignSystem,
      state, setState,
      globalTheme, setGlobalTheme
    } },
    children
  )
}
