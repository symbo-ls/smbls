'use strict'

import { isString } from '@domql/utils'

export const Icon = {
  extend: 'Svg',
  deps: { isString },
  props: ({ key, props, parent, context, deps }) => {
    const { ICONS, useIconSprite, verbose } = context && context.designSystem
    const { toCamelCase } = context && context.utils
    const iconName = props.name || props.icon || key
    const camelCase = toCamelCase(deps.isString(iconName) ? iconName : key)

    const isArray = camelCase.split(/([a-z])([A-Z])/g)

    let activeIconName
    if (props.active) {
      activeIconName = props['.active'].name || props['.active'].icon
    }
    if (
      parent &&
      parent.props &&
      parent.props.active &&
      parent.props['.active'] &&
      parent.props['.active'].icon
    ) {
      activeIconName = parent.props['.active'].icon.name || parent.props['.active'].icon.icon || parent.props['.active'].icon
    }

    let validIconName
    if (ICONS[activeIconName]) validIconName = activeIconName
    if (ICONS[camelCase]) validIconName = camelCase
    else if (ICONS[isArray[0] + isArray[1]]) validIconName = isArray[0] + isArray[1]
    else if (ICONS[isArray[0]]) validIconName = isArray[0]
    else {
      if (verbose) console.warn('Can\'t find icon:', iconName, validIconName)
    }

    const iconFromLibrary = ICONS[validIconName]
    const directSrc = (parent && parent.props && parent.props.src) || props.src

    return {
      width: 'A',
      height: 'A',
      display: 'inline-block',
      spriteId: useIconSprite && validIconName,
      src: iconFromLibrary || directSrc || ICONS.noIcon,
      style: { fill: 'currentColor' }
    }
  },
  attr: { viewBox: '0 0 24 24' }
}

export const IconText = {
  extend: 'Flex',

  props: {
    align: 'center center',
    lineHeight: 1
  },

  Icon: {
    props: ({ parent, props }) => ({ icon: parent.props.icon }),
    if: ({ parent, props }) => {
      const doesExist = parent.props.icon || parent.props.Icon || props.name || props.icon
      return doesExist
    }
  },

  text: ({ props }) => props.text,

  '.reversed': {
    props: { flow: 'row-reverse' }
  },

  '.vertical': {
    props: { flow: 'column' }
  }
}

export const FileIcon = {
  extend: 'Flex',
  props: {
    theme: 'tertiary',
    boxSize: 'C1',
    align: 'center center',
    round: 'Z'
  },
  Icon: {
    fontSize: 'B',
    margin: 'auto',
    icon: 'file'
  }
}
