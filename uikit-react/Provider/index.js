"use strict"

import React from "react"
import DEFAULT_CONFIG from '@symbo.ls/default-config'
import { init } from "@symbo.ls/init"

const context = React.createContext({ config: {} })

const Provider = context.Provider

export const SymbolsProvider = ({ system, children }) => {
  system = init(system || DEFAULT_CONFIG)

  return React.createElement(
    Provider,
    { value: { system } },
    children
  )
}
