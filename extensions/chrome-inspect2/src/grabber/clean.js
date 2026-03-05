import { deepClone } from '@domql/utils'
import { allEqual } from './utils'

/**
 * Utility function to consolidate CSS values
 * @param {string[]} values
 * @returns string
 */
function consolidateValues(values) {
  const uniqueValues = new Set(values)

  if (uniqueValues.size === 1) {
    return values[0] // All values are the same
  }

  if (uniqueValues.size === 2) {
    const [vertical, horizontal] = values
    if (vertical === horizontal) {
      return `${vertical}`
    }
  } else if (uniqueValues.size === 4) {
    const [topLeft, topRight, bottomRight, bottomLeft] = values
    if (topLeft === topRight && bottomLeft === bottomRight) {
      return `${topLeft} ${bottomLeft}`
    }
  }

  return values.join(' ')
}

function consolidateTextDecoration(style) {
  const updatedStyle = deepClone(style)

  const decorationProps = [
    'textDecorationThickness',
    'textDecorationStyle',
    'textDecorationColor'
  ]

  const thickness =
    style.textDecorationThickness && style.textDecorationThickness !== 'initial'
      ? style.textDecorationThickness
      : ''
  const styleProp =
    style.textDecorationStyle && style.textDecorationStyle !== 'initial'
      ? style.textDecorationStyle
      : ''
  const color =
    style.textDecorationColor && style.textDecorationColor !== 'initial'
      ? style.textDecorationColor
      : ''

  // Build the consolidated textDecoration shorthand
  const consolidatedTextDecoration = [thickness, styleProp, color]
    .filter(Boolean)
    .join(' ')
    .trim()

  // Set the textDecoration shorthand if there's any valid value
  if (consolidatedTextDecoration) {
    updatedStyle.textDecoration = consolidatedTextDecoration
  }

  // Remove individual textDecoration properties from the style
  decorationProps.forEach((prop) => delete updatedStyle[prop])

  return updatedStyle
}

function consolidateBorderRadius(style) {
  const radiusProps = [
    'borderBottomLeftRadius',
    'borderBottomRightRadius',
    'borderEndEndRadius',
    'borderEndStartRadius',
    'borderStartEndRadius',
    'borderStartStartRadius',
    'borderTopLeftRadius',
    'borderTopRightRadius'
  ]

  const sides = ['TopLeft', 'TopRight', 'BottomRight', 'BottomLeft']
  const radii = []

  // Collect valid border radius values from each side
  sides.forEach((side) => {
    const radius = style[`border${side}Radius`]
    if (radius && radius !== 'initial') {
      radii.push(radius)
    } else {
      radii.push('0') // If undefined or initial, add 0
    }
  })

  // Consolidate border radius values
  const consolidatedRadius = consolidateValues(radii).trim()

  const updated = { ...style }
  // Set the consolidated border radius if there's a valid value
  if (consolidatedRadius && consolidatedRadius !== '0') {
    updated.borderRadius = consolidatedRadius
  }

  // Remove individual radius properties from the style object
  radiusProps.forEach((prop) => delete updated[prop])

  return updated
}

function consolidateAndUpdateBorderProperties(style) {
  const updatedStyle = deepClone(style)
  const result = {}
  const sides = ['Top', 'Right', 'Bottom', 'Left']
  const properties = ['Width', 'Style', 'Color']

  // Extract border properties
  const borderProps = {}
  sides.forEach((side) => {
    properties.forEach((prop) => {
      const key = `border${side}${prop}`
      if (updatedStyle[key] && updatedStyle[key] !== 'initial') {
        borderProps[key] = updatedStyle[key]
      }
    })
  })

  // Check if all sides are equal
  const allSidesEqual = properties.every((prop) =>
    allEqual(sides.map((side) => borderProps[`border${side}${prop}`]))
  )

  if (allSidesEqual) {
    // All sides are equal, use shorthand
    const width = borderProps.borderTopWidth
    const borderStyle = borderProps.borderTopStyle
    const color = borderProps.borderTopColor

    if (width && borderStyle && color) {
      result.border = `${width} ${borderStyle} ${color}`
    } else {
      if (width) {
        result.borderWidth = width
      }
      if (borderStyle) {
        result.borderStyle = borderStyle
      }
      if (color) {
        result.borderColor = color
      }
    }
  } else {
    // Check if logical properties can be used
    const logicalSides = ['BlockStart', 'BlockEnd', 'InlineStart', 'InlineEnd']
    const logicalEqual = properties.every((prop) =>
      allEqual(logicalSides.map((side) => borderProps[`border${side}${prop}`]))
    )

    if (logicalEqual) {
      // Use logical shorthands
      const blockWidth = borderProps.borderBlockStartWidth
      const blockStyle = borderProps.borderBlockStartStyle
      const blockColor = borderProps.borderBlockStartColor
      const inlineWidth = borderProps.borderInlineStartWidth
      const inlineStyle = borderProps.borderInlineStartStyle
      const inlineColor = borderProps.borderInlineStartColor

      if (
        blockWidth === inlineWidth &&
        blockStyle === inlineStyle &&
        blockColor === inlineColor
      ) {
        result.border = `${blockWidth} ${blockStyle} ${blockColor}`
      } else {
        if (blockWidth) {
          result.borderBlockWidth = blockWidth
        }
        if (blockStyle) {
          result.borderBlockStyle = blockStyle
        }
        if (blockColor) {
          result.borderBlockColor = blockColor
        }
        if (inlineWidth && inlineWidth !== blockWidth) {
          result.borderInlineWidth = inlineWidth
        }
        if (inlineStyle && inlineStyle !== blockStyle) {
          result.borderInlineStyle = inlineStyle
        }
        if (inlineColor && inlineColor !== blockColor) {
          result.borderInlineColor = inlineColor
        }
      }
    } else {
      // Use individual logical properties
      logicalSides.forEach((side) => {
        const width = borderProps[`border${side}Width`]
        const borderStyle = borderProps[`border${side}Style`]
        const color = borderProps[`border${side}Color`]
        if (width && borderStyle && color) {
          result[`border${side}`] = `${width} ${borderStyle} ${color}`
        } else {
          if (width) {
            result[`border${side}Width`] = width
          }
          if (borderStyle) {
            result[`border${side}Style`] = borderStyle
          }
          if (color) {
            result[`border${side}Color`] = color
          }
        }
      })
    }
  }

  // Add any border image properties
  ;[
    'borderImageSource',
    'borderImageSlice',
    'borderImageWidth',
    'borderImageOutset',
    'borderImageRepeat'
  ].forEach((prop) => {
    if (updatedStyle[prop] && updatedStyle[prop] !== 'initial') {
      result[prop] = updatedStyle[prop]
    }
    delete updatedStyle[prop]
  })

  // Clean up old border properties
  sides.forEach((side) => {
    properties.forEach((prop) => {
      delete updatedStyle[`border${side}${prop}`]
    })
  })
  ;[
    'border',
    'borderWidth',
    'borderStyle',
    'borderColor',
    'borderBlock',
    'borderInline'
  ].forEach((prop) => {
    delete updatedStyle[prop]
  })

  // Add consolidated properties back to style
  return { ...updatedStyle, ...result }
}

function consolidateSpacing(style, property = 'padding') {
  const updatedStyle = deepClone(style)
  const propertyMap = {
    top:
      style[`${property}Top`] ||
      style[`${property}BlockStart`] ||
      style[`${property}Block`],
    right:
      style[`${property}Right`] ||
      style[`${property}InlineEnd`] ||
      style[`${property}Inline`],
    bottom:
      style[`${property}Bottom`] ||
      style[`${property}BlockEnd`] ||
      style[`${property}Block`],
    left:
      style[`${property}Left`] ||
      style[`${property}InlineStart`] ||
      style[`${property}Inline`]
  }

  const consolidatedValues = ['top', 'right', 'bottom', 'left'].map(
    (side) => propertyMap[side] || '0'
  )

  // Check if any value was actually applied
  if (consolidatedValues.every((value) => value === '0')) {
    return updatedStyle // Return unchanged style if no values were applied
  }

  // Simplify the values if possible
  const [top, right, bottom, left] = consolidatedValues
  let result = consolidatedValues.join(' ') // All four sides are different or have placeholders

  if (right === left) {
    if (top === bottom) {
      if (top === right) {
        // All sides are the same
        result = top
      } else {
        // Vertical and horizontal values are different
        result = `${top} ${right}`
      }
    } else {
      // Top, horizontal, and bottom values
      result = `${top} ${right} ${bottom}`
    }
  }

  // Remove related properties from style
  ;[
    `${property}Top`,
    `${property}Right`,
    `${property}Bottom`,
    `${property}Left`,
    `${property}BlockStart`,
    `${property}BlockEnd`,
    `${property}InlineStart`,
    `${property}InlineEnd`,
    `${property}Block`,
    `${property}Inline`,
    property
  ].forEach((prop) => {
    delete updatedStyle[prop]
  })

  updatedStyle[property] = result

  return updatedStyle
}

export function splitPropsFromStyles(style) {
  const updatedStyle = deepClone(style)
  const props = {}

  const stylesWithProps = [
    'alignContent',
    'alignItems',
    'alignSelf',
    'animation',
    'animationDelay',
    'animationDirection',
    'animationDuration',
    'animationFillMode',
    'animationIterationCount',
    'animationName',
    'animationPlayState',
    'animationTimingFunction',
    'appearance',
    'aspectRatio',
    'background',
    'backgroundColor',
    'backgroundPosition',
    'backgroundRepeat',
    'backgroundSize',
    'backfaceVisibility',
    'backdropFilter',
    'blockSize',
    'border',
    'borderBottom',
    'borderColor',
    'borderLeft',
    'borderRadius',
    'borderRight',
    'borderStyle',
    'borderTop',
    'borderWidth',
    'bottom',
    'boxShadow',
    'boxSize',
    'boxSizing',
    'caretColor',
    'columns',
    'columnCount',
    'columnFill',
    'columnGap',
    'columnRule',
    'columnRule',
    'columnSpan',
    'columnWidth',
    'color',
    'content',
    'cursor',
    'depth',
    'direction',
    'direction',
    'display',
    'filter',
    'flex',
    'flexAlign',
    'flexDirection',
    'flexFlow',
    'flexWrap',
    'float',
    'gap',
    'gridArea',
    'gridColumn',
    'gridColumnStart',
    'gridRow',
    'gridRowStart',
    'height',
    'heightRange',
    'horizontalInset',
    'inlineSize',
    'inset',
    'justifyContent',
    'justifyItems',
    'left',
    'maxBlockSize',
    'maxHeight',
    'maxInlineSize',
    'maxSize',
    'maxWidth',
    'mixBlendMode',
    'minBlockSize',
    'minHeight',
    'minInlineSize',
    'minSize',
    'minWidth',
    'margin',
    'marginBlock',
    'marginBlockEnd',
    'marginBlockStart',
    'marginInline',
    'marginInlineEnd',
    'marginInlineStart',
    'objectFit',
    'opacity',
    'order',
    'overflow',
    'overflowX',
    'overflowY',
    'outline',
    'outlineOffset',
    'overscrollBehavior',
    'padding',
    'paddingBlock',
    'paddingBlockEnd',
    'paddingBlockStart',
    'paddingInline',
    'paddingInlineEnd',
    'paddingInlineStart',
    'perspective',
    'perspectiveOrigin',
    'pointerEvents',
    'position',
    'right',
    'resize',
    'round',
    'rowGap',
    'scrollPadding',
    'shape',
    'shapeDirection',
    'shapeDirectionColor',
    'shadow',
    'size',
    'textShadow',
    'textStroke',
    'theme',
    'top',
    'transform',
    'transformOrigin',
    'transition',
    'transitionDelay',
    'transitionDuration',
    'transitionProperty',
    'transitionTimingFunction',
    'userSelect',
    'verticalAlign',
    'verticalInset',
    'visibility',
    'width',
    'widthRange',
    'willChange',
    'zIndex',
    'zoom'
  ]

  stylesWithProps.forEach((key) => {
    if (key in updatedStyle) {
      props[key] = updatedStyle[key]
      delete updatedStyle[key]
    }
  })

  return { props, style: updatedStyle }
}

export function consolidateStyles(style) {
  let updatedStyle = deepClone(style)

  // Consolidate outline properties
  if (style.outlineWidth || style.outlineStyle || style.outlineColor) {
    updatedStyle.outline = `${style.outlineWidth || 'initial'} ${
      style.outlineStyle || 'initial'
    } ${style.outlineColor || 'initial'}`

    delete updatedStyle.outlineWidth
    delete updatedStyle.outlineStyle
    delete updatedStyle.outlineColor
  }

  // Consolidate padding
  const insetProps = [
    'insetInlineStart',
    'insetBlockEnd',
    'insetInlineEnd',
    'insetBlockStart'
  ]
  const insetValues = insetProps.map((prop) => style[prop] || '0')
  if (insetValues.some((val) => val !== '0')) {
    updatedStyle.inset = consolidateValues(insetValues)
    insetProps.forEach((prop) => delete updatedStyle[prop])
  }

  // Consolidate transition properties
  if (
    style.transition &&
    style.transitionProperty &&
    style.transitionDuration
  ) {
    updatedStyle.transition = `${style.transition} ${style.transitionProperty} ${style.transitionDuration}`

    delete updatedStyle.transitionProperty
    delete updatedStyle.transitionDuration
  }

  const sizeProps = ['inlineSize', 'blockSize']
  const sizeValues = sizeProps.map((prop) => style[prop] || '0')
  if (sizeValues.some((val) => val !== '0')) {
    updatedStyle.size = consolidateValues(sizeValues)
    sizeProps.forEach((prop) => delete updatedStyle[prop])
  }

  let gapValues = []
  if (style.gap) {
    gapValues = [...gapValues, ...style.gap.split(' ')]
    delete updatedStyle.gap
  }
  const gapProps = ['rowGap', 'columnGap']
  gapValues = [...gapValues, ...gapProps.map((prop) => style[prop] || '0')]
  if (gapValues.some((val) => val !== '0')) {
    updatedStyle.gap = consolidateValues(gapValues)
    gapProps.forEach((prop) => delete updatedStyle[prop])
  }

  if (style.webkitTextStroke) {
    updatedStyle.textStroke = style.webkitTextStroke
    delete updatedStyle.webkitTextStroke
  }

  updatedStyle = consolidateBorderRadius(updatedStyle)
  updatedStyle = consolidateAndUpdateBorderProperties(updatedStyle)
  updatedStyle = consolidateSpacing(updatedStyle, 'padding')
  updatedStyle = consolidateSpacing(updatedStyle, 'margin')
  updatedStyle = consolidateSpacing(updatedStyle, 'borderWidth')
  updatedStyle = consolidateTextDecoration(updatedStyle)

  if (style.minWidth && style.maxWidth) {
    updatedStyle.widthRange = `${style.minWidth} ${style.maxWidth}`

    delete updatedStyle.minWidth
    delete updatedStyle.maxWidth
  }

  if (style.minHeight && style.maxHeight) {
    style.heightRange = `${style.minHeight} ${style.maxHeight}`

    delete updatedStyle.minHeight
    delete updatedStyle.maxHeight
  }

  // Return the new cleaned style object
  return updatedStyle
}

export function consolidateFlexCSS(props) {
  const updatedProps = deepClone(props)

  // Consolidate alignItems and justifyContent
  if (props.alignItems || props.justifyContent) {
    updatedProps.align = `${props.alignItems || ''} ${
      props.justifyContent || ''
    }`.trim()
    delete updatedProps.alignItems
    delete updatedProps.justifyContent
  }

  // Consolidate flexDirection and flexWrap
  if (props.flexDirection || props.flexWrap) {
    updatedProps.flow = `${props.flexDirection || 'row'} ${
      props.flexWrap || ''
    }`.trim()
    delete updatedProps.flexDirection
    delete updatedProps.flexWrap
  }

  return updatedProps
}

export function consolidateGridCSS(props) {
  const updatedProps = deepClone(props)

  if (props.gridTemplateColumns) {
    updatedProps.columns = props.gridTemplateColumns
    delete updatedProps.gridTemplateColumns
  }

  if (props.gridTemplateRows) {
    updatedProps.rows = props.gridTemplateRows
    delete updatedProps.gridTemplateRows
  }

  return updatedProps
}
