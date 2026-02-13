'use strict'

export const Icon = {
  extend: 'Svg',
  props: (el, s, ctx) => {
    const { props, parent } = el
    const { ICONS, useIconSprite, verbose } = ctx && ctx.designSystem
    const { toCamelCase } = ctx && ctx.utils

    const inheritFromIsActive = (el) => {
      const { props } = el
      const propsActive = props['.isActive']
      return el.call('exec', propsActive.name || propsActive.icon)
    }

    const getSemanticIcon = (el, s, ctx) => {
      const { SEMANTIC_ICONS } = ctx && ctx.designSystem
      const { toCamelCase } = ctx && ctx.utils

      let iconName = getIconName(el, s)
      const camelCase = toCamelCase(iconName)
      const isArray = camelCase.split(/([a-z])([A-Z])/g)
      const semanticIconRootName = isArray[1]
        ? isArray[0]
        : iconName.split('.')[0].split(' ')[0]
      const semanticIcon =
        SEMANTIC_ICONS && SEMANTIC_ICONS[semanticIconRootName]
      if (semanticIcon) {
        const iconKey = iconName.includes('.')
          ? 'sfsymbols.' + iconName.split('.').slice(1).join('.')
          : 'sfsymbols'
        iconName =
          semanticIcon[iconKey] ||
          semanticIcon[iconName.split('.')[0].split(' ')[0]]
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

    const getIconName = (el, s) => {
      const { key, props } = el
      let icon = el.call('exec', props.name || props.icon || key, el)

      if (el.call('isString', icon) && icon.includes('{{')) {
        icon = el.call('replaceLiteralsWithObjectFields', icon)
      }

      return el.call('isString', icon) ? icon : key
    }

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
      activeIconName = el.call(
        'exec',
        parentPropsActive.icon ||
          parentPropsActive.Icon.name ||
          parentPropsActive.Icon.icon,
        el
      )
    }

    if (el.call('isString', activeIconName) && activeIconName.includes('{{')) {
      activeIconName = el.call(
        'replaceLiteralsWithObjectFields',
        activeIconName
      )
    }

    let iconInContext
    if (ICONS[activeIconName]) iconInContext = activeIconName
    if (ICONS[camelCase]) iconInContext = camelCase
    else if (ICONS[isArray[0] + isArray[1]])
      iconInContext = isArray[0] + isArray[1]
    else if (ICONS[isArray[0]]) iconInContext = isArray[0]
    else {
      if (verbose) el.warn("Can't find icon:", iconName, iconInContext)
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
    lineHeight: 1,
    gap: 'X',

    '.reversed': {
      flow: 'row-reverse'
    },

    '.vertical': {
      flow: 'column'
    }
  },

  Icon: {
    if: (el) => {
      const { parent, props } = el
      return el.call(
        'exec',
        parent.props.icon ||
          props.name ||
          props.sfSymbols ||
          parent.props.sfSymbols,
        el
      )
    },
    icon: (el) => el.call('exec', el.parent.props.icon, el.parent)
  },

  text: ({ props }) => props.text
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
