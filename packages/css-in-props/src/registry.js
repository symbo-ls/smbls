'use strict'

import { mergeArray } from '@domql/utils'
import * as preprocs from './props'

import { Text } from '@symbo.ls/atoms'

// TODO: due to recent updates inherit from BOX instead
export const CSS_PROPS_REGISTRY = mergeArray([Text]).class
export const CSS_PREPROCS_DEFAULTS = mergeArray(Object.values(preprocs))
