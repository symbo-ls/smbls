'use strict'

import { merge } from '@domql/utils'
import { getActiveConfig } from '../factory.js'

import {
  applyMediaSequenceVars,
  applySequenceVars,
  findHeadings,
  generateSequence,
  getSequenceValuePropertyPair
} from '../utils'

export const runThroughMedia = FACTORY => {
  const CONFIG = getActiveConfig()
  const { TYPOGRAPHY, MEDIA } = CONFIG

  for (const prop in FACTORY) {
    const isPropMedia = prop.slice(0, 1) === '@'
    const mediaValue = FACTORY[prop]
    if (!isPropMedia) continue

    const { mediaRegenerate } = FACTORY
    const mediaName = prop.slice(1)

    const {
      type,
      base,
      ratio,
      range,
      subSequence,
      h1Matches,
      unit
    } = FACTORY

    merge(mediaValue, {
      type,
      base,
      ratio,
      range,
      subSequence,
      h1Matches,
      unit,
      sequence: {},
      scales: {},
      templates: {},
      vars: {}
    })

    const query = MEDIA[mediaName]
    TYPOGRAPHY.templates[`@media screen and ${query}`] = {
      fontSize: mediaValue.base / TYPOGRAPHY.browserDefault + unit
    }

    if (!mediaRegenerate) {
      applyMediaSequenceVars(FACTORY, prop)
      continue
    }

    generateSequence(mediaValue)

    applyMediaSequenceVars(FACTORY, prop)
  }
}

export const applyHeadings = (props) => {
  const CONFIG = getActiveConfig()
  if (props.h1Matches) {
    const unit = props.unit
    const HEADINGS = findHeadings(props)
    const { templates } = props
    for (const k in HEADINGS) {
      const headerName = `h${parseInt(k) + 1}`
      const headerStyle = templates[headerName]
      templates[headerName] = {
        fontSize: CONFIG.useVariable ? `var(${HEADINGS[k].variable})` : `${HEADINGS[k].scaling}${unit}`,
        margin: headerStyle ? headerStyle.margin : 0,
        lineHeight: headerStyle ? headerStyle.lineHeight : props.lineHeight,
        letterSpacing: headerStyle ? headerStyle.letterSpacing : props.letterSpacing,
        fontWeight: headerStyle ? headerStyle.fontWeight : 900 - (k * 100)
      }
    }
  }
}

export const applyTypographySequence = () => {
  const CONFIG = getActiveConfig()
  const { TYPOGRAPHY } = CONFIG

  generateSequence(TYPOGRAPHY)
  applyHeadings(TYPOGRAPHY)
  applySequenceVars(TYPOGRAPHY)
  runThroughMedia(TYPOGRAPHY)
}

export const getFontSizeByKey = value => {
  const CONFIG = getActiveConfig()
  const { TYPOGRAPHY } = CONFIG
  return getSequenceValuePropertyPair(
    value,
    'fontSize',
    TYPOGRAPHY
  )
}
