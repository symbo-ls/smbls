'use strict'

import { isDefined, isString } from '@domql/utils'

export const ARIA_ROLES = [
  'alert',
  'alertdialog',
  'application',
  'article',
  'banner',
  'button',
  'cell',
  'checkbox',
  'columnheader',
  'combobox',
  'complementary',
  'contentinfo',
  'definition',
  'dialog',
  'directory',
  'document',
  'feed',
  'figure',
  'form',
  'grid',
  'gridcell',
  'group',
  'heading',
  'img',
  'link',
  'list',
  'listbox',
  'listitem',
  'log',
  'main',
  'marquee',
  'math',
  'menu',
  'menubar',
  'menuitem',
  'menuitemcheckbox',
  'menuitemradio',
  'navigation',
  'none',
  'note',
  'option',
  'presentation',
  'progressbar',
  'radio',
  'radiogroup',
  'region',
  'row',
  'rowgroup',
  'rowheader',
  'scrollbar',
  'search',
  'searchbox',
  'separator',
  'slider',
  'spinbutton',
  'status',
  'switch',
  'tab',
  'table',
  'tablist',
  'tabpanel',
  'term',
  'textbox',
  'timer',
  'toolbar',
  'tooltip',
  'tree',
  'treegrid',
  'treeitem'
]

export const HTML_ATTRIBUTES = {
  default: [
    'accesskey',
    'autofocus',
    'class',
    'contenteditable',
    'contextmenu',
    'dir',
    'draggable',
    'hidden',
    'id',
    'lang',
    'part',
    'placeholder',
    'slot',
    'spellcheck',
    'style',
    'tabindex',
    'title',
    'translate',
    'inert',
    'radiogroup',
    'role',
    'about',
    'datatype',
    'inlist',
    'prefix',
    'property',
    'resource',
    'typeof',
    'vocab',
    'autocapitalize',
    'autocorrect',
    'autosave',
    'color',
    'itemprop',
    'itemscope',
    'itemtype',
    'itemid',
    'itemref',
    'results',
    'security',
    'unselectable',
    'is'
  ],

  a: [
    'accesskey',
    'charset',
    'coords',
    'download',
    'href',
    'hreflang',
    'name',
    'rel',
    'rev',
    'shape',
    'target',
    'type'
  ],

  aria: [
    'aria-activedescendant',
    'aria-atomic',
    'aria-autocomplete',
    'aria-checked',
    'aria-colcount',
    'aria-colindex',
    'aria-colspan',
    'aria-controls',
    'aria-current',
    'aria-describedby',
    'aria-details',
    'aria-dropeffect',
    'aria-errormessage',
    'aria-expanded',
    'aria-flowto',
    'aria-grabbed',
    'aria-haspopup',
    'aria-hidden',
    'aria-invalid',
    'aria-keyshortcuts',
    'aria-label',
    'aria-labelledby',
    'aria-level',
    'aria-live',
    'aria-modal',
    'aria-multiline',
    'aria-multiselectable',
    'aria-orientation',
    'aria-owns',
    'aria-placeholder',
    'aria-posinset',
    'aria-pressed',
    'aria-readonly',
    'aria-relevant',
    'aria-required',
    'aria-roledescription',
    'aria-rowcount',
    'aria-rowindex',
    'aria-rowspan',
    'aria-selected',
    'aria-setsize',
    'aria-sort',
    'aria-valuemax',
    'aria-valuemin',
    'aria-valuenow',
    'aria-valuetext'
  ],

  anchor: [
    'download',
    'href',
    'hreflang',
    'media',
    'ping',
    'rel',
    'target',
    'type',
    'referrerpolicy'
  ],

  audio: [

  ],

  area: [
    'alt',
    'coords',
    'download',
    'href',
    'hreflang',
    'media',
    'referrerpolicy',
    'rel',
    'shape',
    'target',
    'ping'
  ],

  base: [
    'href',
    'target'
  ],

  blockquote: [
    'cite'
  ],

  button: [
    'disabled',
    'form',
    'formaction',
    'formenctype',
    'formmethod',
    'formnovalidate',
    'formtarget',
    'name',
    'type',
    'value'
  ],

  canvas: [
    'height',
    'width'
  ],

  col: [
    'span',
    'width'
  ],

  colgroup: [
    'span'
  ],

  data: [
    'value'
  ],

  details: [
    'open'
  ],

  del: [
    'cite',
    'datetime'
  ],

  dialog: [
    'open'
  ],

  embed: [
    'height',
    'src',
    'type',
    'width'
  ],

  fieldset: [
    'disabled',
    'form',
    'name'
  ],

  form: [
    'acceptcharset',
    'action',
    'autocomplete',
    'enctype',
    'method',
    'name',
    'novalidate',
    'target',
    'rel'
  ],

  html: [
    'manifest'
  ],

  iframe: [
    'allow',
    'allowfullscreen',
    'allowtransparency',
    'frameborder',
    'height',
    'loading',
    'marginheight',
    'marginwidth',
    'name',
    'referrerpolicy',
    'sandbox',
    'scrolling',
    'seamless',
    'src',
    'srcdoc',
    'width'
  ],

  img: [
    'alt',
    'crossorigin',
    'decoding',
    'height',
    'ismap',
    'loading',
    'referrerpolicy',
    'sizes',
    'src',
    'srcset',
    'usemap',
    'width'
  ],

  ins: [
    'cite',
    'datetime'
  ],

  input: [
    'accept',
    'alt',
    'autocomplete',
    'capture',
    'checked',
    'crossorigin',
    'disabled',
    'form',
    'formaction',
    'formenctype',
    'formmethod',
    'formnovalidate',
    'formtarget',
    'height',
    'indeterminate',
    'list',
    'max',
    'maxlength',
    'min',
    'minlength',
    'multiple',
    'name',
    'pattern',
    'placeholder',
    'readonly',
    'required',
    'size',
    'src',
    'step',
    'type',
    'value',
    'width'
  ],

  keygen: [
    'challenge',
    'disabled',
    'form',
    'keytype',
    'keyparams',
    'name'
  ],

  label: [
    'form',
    'for'
  ],

  li: [
    'value'
  ],

  link: [
    'as',
    'crossorigin',
    'href',
    'hreflang',
    'integrity',
    'media',
    'imagesrcset',
    'imagesizes',
    'referrerpolicy',
    'rel',
    'sizes',
    'type',
    'charset'
  ],

  map: [
    'name'
  ],

  menu: [
    'type'
  ],

  media: [
    'autoplay',
    'controls',
    'currenttime',
    'defaultmuted',
    'defaultplaybackrate',
    'loop',
    'mediagroup',
    'muted',
    'playsinline',
    'preload',
    'src',
    'volume'
  ],

  meta: [
    'charset',
    'content',
    'http-equiv',
    'name',
    'media'
  ],

  meter: [
    'form',
    'high',
    'low',
    'max',
    'min',
    'optimum',
    'value'
  ],

  quote: [
    'cite'
  ],

  object: [
    'classid',
    'data',
    'form',
    'height',
    'name',
    'type',
    'usemap',
    'width',
    'wmode'
  ],

  ol: [
    'reversed',
    'start',
    'type'
  ],

  optgroup: [
    'disabled',
    'label'
  ],

  option: [
    'disabled',
    'label',
    'selected',
    'value'
  ],

  output: [
    'form',
    'for',
    'name'
  ],

  param: [
    'name',
    'value'
  ],

  progress: [
    'max',
    'value'
  ],

  slot: [
    'name'
  ],

  script: [
    'async',
    'charset',
    'crossorigin',
    'defer',
    'integrity',
    'nomodule',
    'nonce',
    'referrerpolicy',
    'src',
    'type'
  ],

  select: [
    'autocomplete',
    'disabled',
    'form',
    'multiple',
    'name',
    'required',
    'size',
    'value',

    'onchange'
  ],

  source: [
    'height',
    'media',
    'sizes',
    'src',
    'srcset',
    'type',
    'width'
  ],

  style: [
    'media',
    'nonce',
    'scoped',
    'type'
  ],

  table: [
    'align',
    'bgcolor',
    'border',
    'cellpadding',
    'cellspacing',
    'frame',
    'rules',
    'summary',
    'width'
  ],

  textarea: [
    'autocomplete',
    'cols',
    'dirname',
    'disabled',
    'form',
    'maxlength',
    'minlength',
    'name',
    'placeholder',
    'readonly',
    'required',
    'rows',
    'value',
    'wrap'
  ],

  td: [
    'align',
    'colspan',
    'headers',
    'rowspan',
    'scope',
    'abbr',
    'height',
    'width',
    'valign'
  ],

  th: [
    'align',
    'colspan',
    'headers',
    'rowspan',
    'scope',
    'abbr'
  ],

  time: [
    'datetime'
  ],

  track: [
    'default',
    'kind',
    'label',
    'src',
    'srclang'
  ],

  video: [
    'height',
    'playsinline',
    'poster',
    'width',
    'disablepictureinpicture',
    'disableremoteplayback'
  ],

  svg: [
    'className',
    'class',
    'color',
    'height',
    'id',
    'lang',
    'max',
    'media',
    'method',
    'min',
    'name',
    'style',
    'target',
    'type',
    'width',

    // Other HTML properties supported by SVG elements in browsers
    'role',
    'tabindex',
    'crossorigin',

    // SVG Specific attributes
    'accent-height',
    'accumulate',
    'additive',
    'alignment-baseline',
    'allowReorder',
    'alphabetic',
    'amplitude',
    'arabic-form',
    'ascent',
    'attributeName',
    'attributeType',
    'autoReverse',
    'azimuth',
    'baseFrequency',
    'baseline-shift',
    'baseProfile',
    'bbox',
    'begin',
    'bias',
    'by',
    'calcMode',
    'cap-height',
    'clip',
    'clip-path',
    'clipPathUnits',
    'clip-rule',
    'color-interpolation',
    'color-interpolation-filters',
    'color-profile',
    'color-rendering',
    'contentScriptType',
    'contentStyleType',
    'cursor',
    'cx',
    'cy',
    'd',
    'decelerate',
    'descent',
    'diffuseConstant',
    'direction',
    'display',
    'divisor',
    'dominant-baseline',
    'dur',
    'dx',
    'dy',
    'edgeMode',
    'elevation',
    'enable-background',
    'end',
    'exponent',
    'externalResourcesRequired',
    'fill',
    'fill-opacity',
    'fill-rule',
    'filter',
    'filterRes',
    'filterUnits',
    'flood-color',
    'flood-opacity',
    'focusable',
    'font-family',
    'font-size',
    'font-size-adjust',
    'font-stretch',
    'font-style',
    'font-variant',
    'font-weight',
    'format',
    'from',
    'fx',
    'fy',
    'g1',
    'g2',
    'glyph-name',
    'glyph-orientation-horizontal',
    'glyph-orientation-vertical',
    'glyphRef',
    'gradientTransform',
    'gradientUnits',
    'hanging',
    'href',
    'horiz-adv-x',
    'horiz-origin-x',
    'ideographic',
    'image-rendering',
    'in2',
    'in',
    'intercept',
    'k1',
    'k2',
    'k3',
    'k4',
    'k',
    'kernelMatrix',
    'kernelUnitLength',
    'kerning',
    'keyPoints',
    'keySplines',
    'keyTimes',
    'lengthAdjust',
    'letter-spacing',
    'lighting-color',
    'limitingConeAngle',
    'local',
    'marker-end',
    'markerHeight',
    'marker-mid',
    'marker-start',
    'markerUnits',
    'markerWidth',
    'mask',
    'maskContentUnits',
    'maskUnits',
    'mathematical',
    'mode',
    'numOctaves',
    'offset',
    'opacity',
    'operator',
    'order',
    'orient',
    'orientation',
    'origin',
    'overflow',
    'overline-position',
    'overline-thickness',
    'paint-order',
    'panose-1',
    'path',
    'pathLength',
    'patternContentUnits',
    'patternTransform',
    'patternUnits',
    'pointer-events',
    'points',
    'pointsAtX',
    'pointsAtY',
    'pointsAtZ',
    'preserveAlpha',
    'preserveAspectRatio',
    'primitiveUnits',
    'r',
    'radius',
    'refX',
    'refY',
    'rendering-intent',
    'repeatCount',
    'repeatDur',
    'requiredExtensions',
    'requiredFeatures',
    'restart',
    'result',
    'rotate',
    'rx',
    'ry',
    'scale',
    'seed',
    'shape-rendering',
    'slope',
    'spacing',
    'specularConstant',
    'specularExponent',
    'speed',
    'spreadMethod',
    'startOffset',
    'stdDeviation',
    'stemh',
    'stemv',
    'stitchTiles',
    'stop-color',
    'stop-opacity',
    'strikethrough-position',
    'strikethrough-thickness',
    'string',
    'stroke',
    'stroke-dasharray',
    'stroke-dashoffset',
    'stroke-linecap',
    'stroke-linejoin',
    'stroke-miterlimit',
    'stroke-opacity',
    'stroke-width',
    'surfaceScale',
    'systemLanguage',
    'tableValues',
    'targetX',
    'targetY',
    'text-anchor',
    'text-decoration',
    'textLength',
    'text-rendering',
    'to',
    'transform',
    'u1',
    'u2',
    'underline-position',
    'underline-thickness',
    'unicode',
    'unicode-bidi',
    'unicode-range',
    'units-per-em',
    'v-alphabetic',
    'values',
    'vector-effect',
    'version',
    'vert-adv-y',
    'vert-origin-x',
    'vert-origin-y',
    'v-hanging',
    'v-ideographic',
    'viewBox',
    'viewTarget',
    'visibility',
    'v-mathematical',
    'widths',
    'word-spacing',
    'writing-mode',
    'x1',
    'x2',
    'x',
    'xChannelSelector',
    'x-height',
    'xlink:actuate',
    'xlink:arcrole',
    'xlink:href',
    'xlink:role',
    'xlink:show',
    'xlink:title',
    'xlink:type',
    'xml:base',
    'xml:lang',
    'xmlns',
    'xmlns:xlink',
    'xml:space',
    'y1',
    'y2',
    'y',
    'yChannelSelector',
    'z',
    'zoomAndPan'
  ]
}

export const DOM_EVENTS = [
  // Clipboard Events
  'oncopy',
  'oncut',
  'onpaste',

  // Composition Events
  'oncompositionend',
  'oncompositionstart',
  'oncompositionupdate',

  // Focus Events
  'onfocus',
  'onfocusin',
  'onfocusout',
  'onblur',

  // Form Events
  'onchange',
  'onbeforeinput',
  'oninput',
  'onreset',
  'onsubmit',
  'oninvalid',
  'onformdata',

  // Image Events
  'onload',
  'onerror', // also a Media Event

  // Detail Events
  'ontoggle',

  // Keyboard Events
  'onkeydown',
  'onkeypress',
  'onkeyup',

  // Media Events
  'onabort',
  'oncanplay',
  'oncanplaythrough',
  'oncuechange',
  'ondurationchange',
  'onemptied',
  'onencrypted',
  'onended',
  'onloadeddata',
  'onloadedmetadata',
  'onloadstart',
  'onpause',
  'onplay',
  'onplaying',
  'onprogress',
  'onratechange',
  'onseeked',
  'onseeking',
  'onstalled',
  'onsuspend',
  'ontimeupdate',
  'onvolumechange',
  'onwaiting',

  // MouseEvents
  'onauxclick',
  'onclick',
  'oncontextmenu',
  'ondblclick',
  'ondrag',
  'ondragend',
  'ondragenter',
  'ondragexit',
  'ondragleave',
  'ondragover',
  'ondragstart',
  'ondrop',
  'onmousedown',
  'onmouseenter',
  'onmouseleave',
  'onmousemove',
  'onmouseout',
  'onmouseover',
  'onmouseup',

  // Selection Events
  'onselect',
  'onselectionchange',
  'onselectstart',

  // Touch Events
  'ontouchcancel',
  'ontouchend',
  'ontouchmove',
  'ontouchstart',

  // Pointer Events
  'ongotpointercapture',
  'onpointercancel',
  'onpointerdown',
  'onpointerenter',
  'onpointerleave',
  'onpointermove',
  'onpointerout',
  'onpointerover',
  'onpointerup',
  'onlostpointercapture',

  // UI Events
  'onscroll',
  'onresize',

  // Wheel Events
  'onwheel',

  // Animation Events
  'onanimationstart',
  'onanimationend',
  'onanimationiteration',

  // Transition Events
  'ontransitionstart',
  'ontransitionrun',
  'ontransitionend',
  'ontransitioncancel',

  // Svelte Transition Events
  'onoutrostart',
  'onoutroend',
  'onintrostart',
  'onintroend',

  // Message Events
  'onmessage',
  'onmessageerror',

  // Document Events
  'onvisibilitychange',

  // Global Events
  'oncancel',
  'onclose',
  'onfullscreenchange',
  'onfullscreenerror'
]

export const checkAttributeByTagName = (tag, attribute) => {
  if (Object.prototype.hasOwnProperty.call(HTML_ATTRIBUTES, tag)) {
    const attributes = HTML_ATTRIBUTES[tag]
    return attributes.includes(attribute) || attributes.includes('default')
  } else {
    const defaultAttributes = HTML_ATTRIBUTES.default
    return defaultAttributes.includes(attribute)
  }
}

export const checkEventFunctions = (key) => {
  if (!isString(key)) return false
  const normalizedKey = key.toLowerCase()
  return DOM_EVENTS.includes(normalizedKey)
}

export const filterAttributesByTagName = (tag, props) => {
  const filteredObject = {}

  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      const isAttribute = checkAttributeByTagName(tag, key)
      const isEvent = checkEventFunctions(key)
      if (isDefined(props[key]) && (isAttribute || isEvent)) {
        filteredObject[key] = props[key]
      }
    }
  }

  return filteredObject
}

export const exetuteAttrPerComponent = (component, element) => {
  const attrObj = {}
  if (component.attr) {
    for (const attrProp in component.attr) {
      attrObj[attrProp] = component.attr[attrProp](element)
    }
  }
  return attrObj
}
