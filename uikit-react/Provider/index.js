"use strict"

import React from "react"
import CONFIG_DEFAULT from '@symbo.ls/config-default'
import { init } from "@symbo.ls/init"

const context = React.createContext({ config: {} })

const Provider = context.Provider

export const SymbolsProvider = ({ config, children }) => {
  React.useEffect(() => {
    init(config || CONFIG_DEFAULT)
  }, []) 

  return React.createElement(
    Provider,
    { value: { config: config } },
    children
  )
}
