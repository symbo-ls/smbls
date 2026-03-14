import {
  consolidateStyles,
  consolidateFlexCSS,
  consolidateGridCSS,
  splitPropsFromStyles
} from './clean'
import {
  getAppliedComputedStyles,
  getStyleDefaultsFromEmptyNode
} from './computed'
import { getAllAppliedSheetStyles } from './stylesheets'
import {
  capitalize,
  cleanSharedProperties,
  convertKeysToCamelCase,
  extractRootVars,
  reformatChildren
} from './utils'

export function getNodeText(node) {
  if (node.nodeType === window.Node.TEXT_NODE) {
    return window.Node.TEXT_NODE // This node itself is text
  }

  let val = ''
  for (const child of node.childNodes) {
    if (
      child.nodeType === window.Node.TEXT_NODE &&
      child.textContent.trim() !== ''
    ) {
      val += child.textContent.trim()
    }
  }

  if (val.trim() !== '') {
    return val
  }
}

export function parseNodeAttributes(node) {
  const attributes = {}

  if (node && node.attributes) {
    for (const { name, value } of node.attributes) {
      if (name !== 'class' && name !== 'style') {
        attributes[name] = value
      }
    }
  }

  return Object.keys(attributes).length ? attributes : null
}

export function extendsFromTag(props) {
  const extend = []

  const tag = (props.tag ?? 'div').toLowerCase()

  if (tag === 'a') {
    extend.push('Link')
  }

  const validTags = [
    'input',
    'button',
    'img',
    'span',
    'strong',
    'section',
    'picture',
    'form',
    'dialog',
    'p',
    'hr',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'header',
    'footer',
    'progress',
    'select',
    'textarea',
    'aside',
    'pre',
    'code',
    'svg',
    'label',
    'hgroup'
  ]

  if (validTags.includes(tag)) {
    extend.push(capitalize(tag))
  }

  return extend
}

/**
 * Parse a DOM element into a Symbols component object
 * @param {HTMLElement} node
 * @param {CSSStyleDeclaration} rootStyles
 * @param {object} [options]
 * @param {boolean} [options.useStylesheets=true]
 * @param {boolean} [options.useComputed=false]
 * @returns {object}
 */
export async function parseElement(node, rootStyles, options = {}) {
  const tag = node.tagName.toLowerCase()
  const defaults = getStyleDefaultsFromEmptyNode(tag)

  const useStylesheets = options.useStylesheets ?? true
  const useComputed = options.useComputed ?? false

  const [sheets, conditionalSheets] = useStylesheets
    ? getAllAppliedSheetStyles(node, defaults)
    : [{}, {}]
  const computed = useComputed
    ? getAppliedComputedStyles(node, defaults)
    : {}

  const rawStyles = {
    ...sheets,
    ...computed
  }

  let rootVars = extractRootVars(rawStyles, rootStyles)

  const camelCased = convertKeysToCamelCase(rawStyles)

  // Process all conditional styles updating both variables as well as resulting props/styles
  const camelCasedConditionals = {}
  Object.entries(conditionalSheets).forEach(([query, cSheet]) => {
    rootVars = { ...extractRootVars(cSheet, rootStyles), ...rootVars }

    const { props, style } = splitPropsFromStyles(
      convertKeysToCamelCase(cSheet)
    )
    camelCasedConditionals[query] = {}
    if (Object.keys(props).length) {
      camelCasedConditionals[query] = props
    }

    if (Object.keys(style).length) {
      camelCasedConditionals[query].style = style
    }
  })

  let props = { ...rootVars }
  if (tag !== 'div') {
    props.tag = tag
  }

  const { props: styleProps, style } = splitPropsFromStyles(
    consolidateStyles(camelCased)
  )
  props = { ...props, ...styleProps }

  const text = getNodeText(node)

  let children = []
  const childPromises = []

  if (node.children.length > 0) {
    const ignore = ['STYLE', 'SCRIPT']

    for (const childNode of node.children) {
      if (!ignore.includes(childNode.tagName)) {
        if (childNode.tagName === 'svg') {
          const html = childNode.innerHTML
          const attr = parseNodeAttributes(childNode)

          children.push({
            extend: ['Svg'],
            attr,
            props: { html }
          })
        } else {
          childPromises.push(parseElement(childNode, rootStyles, options))
        }
      }
    }
  }

  const results = await Promise.all(childPromises)
  children = [...children, ...results]

  // check all children for shared props and hoist them to childProps
  let childProps = null
  if (children.length > 1) {
    childProps = cleanSharedProperties(children)
    // remove shared props from each child
    Object.keys(childProps).forEach((key) => {
      children.forEach((child) => delete child.props[key])
    })
  }

  const attr = parseNodeAttributes(node)
  // process attributes of specific tags to props
  const copyAttrFromThese = ['a', 'img', 'input', 'button', 'iframe']
  if (attr && copyAttrFromThese.includes(tag)) {
    Object.keys(attr).forEach((prop) => {
      props[prop] = attr[prop]
      delete attr[prop]
    })
  }

  // fix relative src for images
  if (tag === 'img' && props.src && props.src.startsWith('/')) {
    props.src = window.location.origin + props.src
  }

  if (tag === 'a' && props.href && props.href.startsWith('/')) {
    props.href = window.location.origin + props.href
  }

  const extend = extendsFromTag(props)
  if (extend.length === 1) {
    delete props.tag
  }

  if (props.display === 'flex') {
    props = consolidateFlexCSS(props)
    delete props.display
    extend.push('Flex')
  }

  if (props.display === 'grid') {
    props = consolidateGridCSS(props)
    delete props.display
    extend.push('Grid')
  }

  let element = {
    props: { ...props }
  }

  if (Object.keys(style).length) {
    element.props.style = style
  }

  if (Object.keys(camelCasedConditionals).length) {
    element.props = { ...element.props, ...camelCasedConditionals }
  }

  if (text) {
    element.props.text = text
  }

  if (attr && Object.keys(attr).length) {
    element.props.attr = attr
  }

  if (extend.length) {
    element.extend = extend
  }

  if (children.length) {
    if (childProps && Object.keys(childProps).length) {
      element.props.childProps = childProps
    }

    element = { ...element, ...reformatChildren(children) }
  } else if (childProps) {
    console.warn('childProps without children')
  }

  return element
}
