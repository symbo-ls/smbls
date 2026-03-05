// Design system token values for smart value completions

// Spacing / Typography scale: generated from ratio-based sequences
// Base = A (16px), ratio ~1.618 (golden) for spacing, ~1.25 for typography
// Positive: A B C D E F G H (larger)
// Negative: Z Y X W V U T S (smaller)
// Sub-steps: A1 A2 B1 B2 etc.
export const SPACING_SCALE = [
  'W2', 'W1', 'W',
  'X2', 'X1', 'X',
  'Y2', 'Y1', 'Y',
  'Z2', 'Z1', 'Z',
  'A', 'A1', 'A2',
  'B', 'B1', 'B2',
  'C', 'C1', 'C2',
  'D', 'D1', 'D2',
  'E', 'E1', 'E2',
  'F', 'F1', 'F2',
  'G', 'G1', 'G2',
  'H', 'H1', 'H2'
]

export const FONT_SIZE_SCALE = [...SPACING_SCALE]

// Default color tokens
export const COLOR_TOKENS = [
  'blue', 'green', 'red', 'yellow', 'orange',
  'transparent', 'black', 'gray', 'white',
  'title', 'caption', 'paragraph', 'disabled', 'line',
  'currentColor', 'inherit', 'none'
]

// Color modifier syntax hints
export const COLOR_MODIFIERS = [
  { suffix: '.5', description: '50% opacity (e.g. blue.5)' },
  { suffix: '+N', description: 'Lighten by N (e.g. gray+16)' },
  { suffix: '-N', description: 'Darken by N (e.g. gray-26)' },
  { suffix: '=N', description: 'Set HSL lightness to N (e.g. gray=50)' },
]

// Default gradient tokens
export const GRADIENT_TOKENS = [
  'gradient-blue-light', 'gradient-blue-dark',
  'gradient-dark', 'gradient-dark-active',
  'gradient-light', 'gradient-light-active',
  'gradient-colorful'
]

// Theme tokens (from default config)
export const THEME_TOKENS = [
  'document', 'primary', 'secondary', 'tertiary', 'quaternary', 'quinary',
  'alert', 'warning', 'success',
  'field', 'label', 'card', 'dialog',
  'none', 'transparent'
]

// Theme modifiers that can be appended with space
export const THEME_MODIFIERS = [
  '.color-only', '.inactive', '.gradient',
  '.child', '.secondary', '.helper',
  '.light', '.dark', '.active'
]

// Default icon names (feather icons + custom)
export const ICON_NAMES = [
  'symbols', 'logo',
  'arrowDownCircle', 'arrowDownLeft', 'arrowDownRight', 'arrowDown',
  'arrowLeftCircle', 'arrowLeft', 'arrowRight', 'arrowRightCircle',
  'arrowUpCircle', 'arrowUpLeft', 'arrowUpRight', 'arrowUp',
  'checkCircle', 'check',
  'chevronDown', 'chevronLeft', 'chevronRight', 'chevronUp',
  'copy', 'eyeOff', 'eye', 'info', 'lock', 'minus',
  'sun', 'moon', 'moreHorizontal', 'moreVertical',
  'send', 'smile', 'search', 'upload', 'video', 'x', 'star', 'plus'
]

// Media query tokens (for @media keys)
export const MEDIA_TOKENS = [
  'tv',
  'screenL', 'screenL<', 'screenM', 'screenM<', 'screenS', 'screenS<',
  'tabletL', 'tabletL<', 'tabletM', 'tabletM<', 'tabletS', 'tabletS<',
  'mobileL', 'mobileL<', 'mobileM', 'mobileM<',
  'mobileS', 'mobileS<', 'mobileXS', 'mobileXS<',
  'light', 'dark', 'print'
]

// HTML tag names for tag: completions
export const HTML_TAGS = [
  'div', 'span', 'p', 'a', 'button', 'input', 'textarea', 'select', 'option',
  'form', 'label', 'fieldset', 'legend',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li', 'dl', 'dt', 'dd',
  'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
  'section', 'article', 'aside', 'header', 'footer', 'nav', 'main',
  'figure', 'figcaption', 'blockquote', 'pre', 'code',
  'img', 'picture', 'source', 'video', 'audio', 'canvas',
  'svg', 'path', 'circle', 'rect', 'line', 'g',
  'iframe', 'embed', 'object',
  'details', 'summary', 'dialog', 'menu',
  'hr', 'br', 'wbr',
  'strong', 'em', 'b', 'i', 'u', 's', 'small', 'sub', 'sup', 'mark', 'abbr',
  'time', 'data', 'output', 'progress', 'meter'
]

// CSS property value enums
export const CSS_VALUE_ENUMS: Record<string, string[]> = {
  display: ['flex', 'grid', 'block', 'inline', 'inline-flex', 'inline-grid', 'inline-block', 'none', 'contents'],
  position: ['relative', 'absolute', 'fixed', 'sticky', 'static'],
  overflow: ['hidden', 'auto', 'scroll', 'visible', 'clip'],
  overflowX: ['hidden', 'auto', 'scroll', 'visible', 'clip'],
  overflowY: ['hidden', 'auto', 'scroll', 'visible', 'clip'],
  visibility: ['visible', 'hidden', 'collapse'],
  flexDirection: ['row', 'column', 'row-reverse', 'column-reverse'],
  flexWrap: ['wrap', 'nowrap', 'wrap-reverse'],
  alignItems: ['center', 'flex-start', 'flex-end', 'stretch', 'baseline'],
  alignContent: ['center', 'flex-start', 'flex-end', 'stretch', 'space-between', 'space-around', 'space-evenly'],
  alignSelf: ['center', 'flex-start', 'flex-end', 'stretch', 'baseline', 'auto'],
  justifyContent: ['center', 'flex-start', 'flex-end', 'space-between', 'space-around', 'space-evenly', 'stretch'],
  justifyItems: ['center', 'start', 'end', 'stretch', 'baseline'],
  justifySelf: ['center', 'start', 'end', 'stretch', 'baseline', 'auto'],
  textAlign: ['left', 'center', 'right', 'justify', 'start', 'end'],
  textDecoration: ['none', 'underline', 'line-through', 'overline'],
  textTransform: ['none', 'uppercase', 'lowercase', 'capitalize'],
  textOverflow: ['ellipsis', 'clip'],
  whiteSpace: ['nowrap', 'pre', 'pre-wrap', 'pre-line', 'normal', 'break-spaces'],
  wordBreak: ['break-word', 'break-all', 'keep-all', 'normal'],
  fontStyle: ['normal', 'italic', 'oblique'],
  fontWeight: ['100', '200', '300', '400', '500', '600', '700', '800', '900', 'normal', 'bold', 'lighter', 'bolder'],
  cursor: ['pointer', 'default', 'move', 'text', 'wait', 'help', 'crosshair', 'not-allowed', 'grab', 'grabbing', 'zoom-in', 'zoom-out', 'col-resize', 'row-resize', 'none'],
  pointerEvents: ['auto', 'none', 'all'],
  userSelect: ['none', 'auto', 'text', 'all', 'contain'],
  objectFit: ['cover', 'contain', 'fill', 'none', 'scale-down'],
  objectPosition: ['center', 'top', 'bottom', 'left', 'right'],
  resize: ['none', 'both', 'horizontal', 'vertical'],
  listStyle: ['none', 'disc', 'circle', 'square', 'decimal'],
  borderStyle: ['solid', 'dashed', 'dotted', 'double', 'none', 'groove', 'ridge', 'inset', 'outset'],
  boxSizing: ['border-box', 'content-box'],
  backgroundSize: ['cover', 'contain', 'auto'],
  backgroundRepeat: ['no-repeat', 'repeat', 'repeat-x', 'repeat-y', 'round', 'space'],
  backgroundPosition: ['center', 'top', 'bottom', 'left', 'right', 'center center', 'top center', 'bottom center'],
  backgroundClip: ['border-box', 'padding-box', 'content-box', 'text'],
  mixBlendMode: ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'difference', 'exclusion'],
  isolation: ['auto', 'isolate'],
  appearance: ['none', 'auto'],
  verticalAlign: ['top', 'middle', 'bottom', 'baseline', 'text-top', 'text-bottom'],
  tableLayout: ['auto', 'fixed'],
  willChange: ['auto', 'transform', 'opacity', 'scroll-position'],

  // DOMQL shorthand values
  flow: ['column', 'row', 'x', 'y', 'column-reverse', 'row-reverse'],
  wrap: ['wrap', 'nowrap', 'wrap-reverse'],
  scope: ['state', 'props'],
}

// Properties that accept color values
export const COLOR_PROPERTIES = new Set([
  'color', 'background', 'backgroundColor', 'borderColor',
  'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor',
  'outlineColor', 'fill', 'stroke', 'caretColor', 'accentColor',
  'textDecorationColor', 'columnRuleColor'
])

// Properties that accept spacing/size tokens
export const SPACING_PROPERTIES = new Set([
  'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
  'paddingInline', 'paddingBlock',
  'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
  'marginInline', 'marginBlock',
  'gap', 'rowGap', 'columnGap',
  'top', 'right', 'bottom', 'left', 'inset',
  'width', 'height', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight',
  'flexBasis',
  'borderRadius', 'borderTopLeftRadius', 'borderTopRightRadius',
  'borderBottomLeftRadius', 'borderBottomRightRadius',
  'round', 'boxSize', 'widthRange', 'heightRange',
  'borderWidth', 'outlineOffset', 'outlineWidth'
])

// Properties that accept font size tokens
export const FONT_SIZE_PROPERTIES = new Set([
  'fontSize', 'lineHeight', 'letterSpacing'
])

// Input type attribute values
export const INPUT_TYPES = [
  'text', 'password', 'email', 'number', 'tel', 'url', 'search',
  'date', 'time', 'datetime-local', 'month', 'week',
  'color', 'range', 'file', 'hidden',
  'checkbox', 'radio', 'submit', 'reset', 'button', 'image'
]

// Target attribute values
export const TARGET_VALUES = ['_self', '_blank', '_parent', '_top']

// Rel attribute values
export const REL_VALUES = [
  'noopener', 'noreferrer', 'nofollow', 'external',
  'noopener noreferrer', 'stylesheet', 'icon', 'preload', 'prefetch'
]

// Autocomplete attribute values
export const AUTOCOMPLETE_VALUES = [
  'off', 'on', 'name', 'email', 'username', 'new-password', 'current-password',
  'tel', 'address-line1', 'address-line2', 'country', 'postal-code'
]

// Boolean-like attribute values
export const BOOLEAN_VALUES = ['true', 'false']

// Loading attribute values
export const LOADING_VALUES = ['lazy', 'eager']
