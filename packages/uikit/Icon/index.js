'use strict'

import { isString, exec, replaceLiteralsWithObjectFields } from '@domql/utils'

const inheritFromIsActive = (el) => {
  const { props } = el
  const propsActive = props['.isActive']
  return el.call('exec', propsActive.name || propsActive.icon)
}

const getIconName = (el, s) => {
  const { key, props, deps } = el
  let iconName = el.call('exec', props.name || props.icon || key, el)

  if (isString(iconName) && iconName.includes('{{')) {
    iconName = deps.replaceLiteralsWithObjectFields(iconName, s)
  }

  return deps.isString(iconName) ? iconName : key
}

export const Icon = {
  extend: 'Svg',
  deps: { isString, replaceLiteralsWithObjectFields },
  props: (el, s, ctx) => {
    const { props, parent, deps } = el
    const { ICONS, useIconSprite, verbose } = ctx && ctx.designSystem
    const { toCamelCase } = ctx && ctx.utils

    const iconName = getIconName(el, s)
    const camelCase = toCamelCase(iconName)
    const isArray = camelCase.split(/([a-z])([A-Z])/g)
    const semanticIcon = getSemanticIcon(el, s, ctx)
    if (semanticIcon) return semanticIcon

    let activeIconName
    if (props.isActive) activeIconName = inheritFromIsActive(el)
    const parentProps = parent.props
    const parentPropsActive = parentProps['.isActive']
    if (
      parent &&
      parentProps &&
      parentProps.isActive &&
      parentPropsActive &&
      parentPropsActive.icon
    ) {
      activeIconName = exec(
        parentPropsActive.icon || parentPropsActive.Icon.name || parentPropsActive.Icon.icon,
        el
      )
    }

    if (isString(activeIconName) && activeIconName.includes('{{')) {
      activeIconName = deps.replaceLiteralsWithObjectFields(activeIconName, s)
    }

    let iconInContext
    if (ICONS[activeIconName]) iconInContext = activeIconName
    if (ICONS[camelCase]) iconInContext = camelCase
    else if (ICONS[isArray[0] + isArray[1]]) iconInContext = isArray[0] + isArray[1]
    else if (ICONS[isArray[0]]) iconInContext = isArray[0]
    else {
      if (verbose) el.warn('Can\'t find icon:', iconName, iconInContext)
    }

    const iconFromLibrary = ICONS[iconInContext]
    const directSrc = (parent && parent.props && parent.props.src) || props.src

    return {
      width: 'A',
      height: 'A',
      display: 'inline-block',
      spriteId: useIconSprite && iconInContext,
      src: iconFromLibrary || directSrc || ICONS.noIcon,
      style: { fill: 'currentColor', '*': { fill: 'currentColor' } }
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
    props: el => ({ icon: el.call('exec', el.parent.props.icon, el.parent) }),
    if: ({ parent, props }) => {
      return parent.props.icon || parent.props.Icon || props.name || props.icon || props.sfSymbols || parent.props.sfSymbols
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

const getSemanticIcon = (el, s, ctx) => {
  const { SEMANTIC_ICONS } = ctx && ctx.designSystem
  const { toCamelCase } = ctx && ctx.utils

  let iconName = getIconName(el, s)
  const camelCase = toCamelCase(iconName)
  const isArray = camelCase.split(/([a-z])([A-Z])/g)
  const semanticIconRootName = isArray[1] ? isArray[0] : iconName.split('.')[0].split(' ')[0]
  const semanticIcon = SEMANTIC_ICONS && SEMANTIC_ICONS[semanticIconRootName]
  if (semanticIcon) {
    const iconKey = iconName.includes('.') ? 'sfsymbols.' + iconName.split('.').slice(1).join('.') : 'sfsymbols'
    iconName = semanticIcon[iconKey] || semanticIcon[iconName.split('.')[0].split(' ')[0]]
    return {
      tag: 'span',
      semantic_symbols: true,
      width: 'A',
      height: 'A',
      lineHeight: '1em',
      ':after': {
        fontSize: 'Z',
        fontWeight: '300',
        content: `"${iconName}"`,
        textAlign: 'center',
        display: 'inline-block',
        style: {
          color: 'currentColor',
          fontFamily: "'SF Pro Icons', 'SF Pro', 'SF Symbols', 'Segoe UI'"
        }
      }
    }
  }
}
