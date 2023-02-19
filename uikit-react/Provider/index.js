"use strict"

import React from "react"
import CONFIG_DEFAULT from '@symbo.ls/config-default'
import { init } from "@symbo.ls/init"

const context = React.createContext({ config: {} })

const Provider = context.Provider

export const SymbolsProvider = ({ config, children }) => {
  const defaultConfig = config || CONFIG_DEFAULT

  React.useEffect(() => {
    init(defaultConfig)
  }, []) 

  return React.createElement(
    Provider,
    { value: { config: config } },
    children
  )
}
