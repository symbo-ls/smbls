export function getComputedStyles(node) {
  const computedStyle = window.getComputedStyle(node)
  const style = {}

  for (let i = 0; i < computedStyle.length; i++) {
    const property = computedStyle[i]
    const value = computedStyle.getPropertyValue(property)
    style[property] = value
  }

  return style
}

export function getStyleDefaultsFromEmptyNode(tag) {
  const node = document.createElement(tag)
  document.body.appendChild(node)
  const computed = getComputedStyles(node)
  document.body.removeChild(node)
  return computed
}

export function getAppliedComputedStyles(node, defaults) {
  const css = getComputedStyles(node)
  const styles = {}

  Object.keys(css).forEach((prop) => {
    const value = css[prop]

    const ignoreAllVals = [
      'width',
      'height',
      'inline-size',
      'block-size',
      'transform-origin',
      'perspective-origin'
    ]
    const ignoreAutoVals = [
      'margin',
      'margin-top',
      'margin-bottom',
      'margin-left',
      'margin-right',
      'padding',
      'padding-top',
      'padding-bottom',
      'padding-left',
      'padding-right',
      'top',
      'bottom',
      'left',
      'right',
      'min-width',
      'min-height',
      'min-block-size',
      'min-inline-size'
    ]

    /**
     * @type {Array<[string, () => boolean]>}
     */
    const skipDefault = [['flex-direction', (s) => s.display === 'flex']]

    const defaultIsValid =
      skipDefault.some(([p, con]) => prop === p && con(css)) ||
      value !== defaults[prop]

    if (
      !ignoreAllVals.includes(prop) &&
      value &&
      defaultIsValid &&
      !(ignoreAutoVals.includes(prop) && value === 'auto')
    ) {
      styles[prop] = value
    }
  })

  return styles
}
