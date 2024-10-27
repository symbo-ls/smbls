'use strict'

import { mergeArray } from '@domql/utils'
import * as preprocs from './props'

import {
  Shape,
  Position,
  Theme,
  Block,
  Text,
  Overflow,
  Timing,
  Transform,
  Media,
  Interaction,
  XYZ,
  Animation
} from '@symbo.ls/atoms'

export const CSS_PROPS_REGISTRY = mergeArray([
  Shape,
  Position,
  Theme,
  Block,
  Text,
  Overflow,
  Timing,
  Transform,
  Media,
  Interaction,
  XYZ,
  Animation
]).class

export const CSS_PREPROCS_DEFAULTS = mergeArray(Object.values(preprocs))
