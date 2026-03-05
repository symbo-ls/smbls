// Design system token values for smart value completions

// Sequence-based design tokens
// Each type (spacing, typography, timing) has its own base, ratio, and unit
// Formula: value = base × ratio^index
// Letter mapping: U(-6) V(-5) W(-4) X(-3) Y(-2) Z(-1) A(0) B(1) C(2) D(3) E(4) F(5) G(6) H(7)
// Sub-steps (1,2) interpolate between main steps using golden-ratio subdivision

export interface SequenceToken {
  label: string
  approxValue: string  // includes unit
  index: number
}

export interface SequenceConfig {
  type: string
  base: number
  ratio: number
  unit: string
  description: string
}

// Default configs per type
export const SEQUENCE_CONFIGS: Record<string, SequenceConfig> = {
  spacing: { type: 'spacing', base: 16, ratio: 1.618, unit: 'em', description: 'Spacing (golden ratio)' },
  typography: { type: 'font-size', base: 16, ratio: 1.25, unit: 'em', description: 'Typography (major third)' },
  timing: { type: 'timing', base: 150, ratio: 1.333, unit: 'ms', description: 'Timing (perfect fourth)' },
}

// Sub-ratio calculation (matches getSubratioDifference in sequence.js)
function getSubValues(base: number, ratio: number, value: number): number[] {
  const next = value * ratio
  const diff = next - value
  const subRatio = diff / 1.618
  const first = next - subRatio
  const second = value + subRatio
  const middle = (first + second) / 2
  const diffRounded = Math.floor(next) - Math.floor(value)
  return diffRounded > 16 ? [first, middle, second] : [first, second]
}

function formatValue(val: number, unit: string): string {
  if (unit === 'ms') return `~${Math.round(val)}ms`
  if (val >= 100) return `~${Math.round(val)}px`
  if (val >= 10) return `~${Math.round(val * 10) / 10}px`
  return `~${Math.round(val * 100) / 100}px`
}

// Letter map (matches numToLetterMap in sequence.js)
const NUM_TO_LETTER: Record<number, string> = {
  '-6': 'U', '-5': 'V', '-4': 'W', '-3': 'X', '-2': 'Y', '-1': 'Z',
  0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H',
} as any

function generateTokens(config: SequenceConfig, rangeStart: number, rangeEnd: number): SequenceToken[] {
  const tokens: SequenceToken[] = []
  for (let key = rangeStart; key <= rangeEnd; key++) {
    const letter = (NUM_TO_LETTER as any)[key]
    if (!letter) continue
    const value = config.base * Math.pow(config.ratio, key)
    const approx = key === 0 && config.unit !== 'ms'
      ? `${config.base}px`
      : formatValue(value, config.unit)
    tokens.push({ label: letter, approxValue: approx, index: key })

    // Generate sub-steps
    const subs = getSubValues(config.base, config.ratio, value)
    subs.forEach((sv, i) => {
      tokens.push({
        label: `${letter}${i + 1}`,
        approxValue: formatValue(sv, config.unit),
        index: key + (i + 1) / 10,
      })
    })
  }
  return tokens
}

// Pre-generate tokens for each type
export const SPACING_TOKENS = generateTokens(SEQUENCE_CONFIGS.spacing, -4, 7)
export const TYPOGRAPHY_TOKENS = generateTokens(SEQUENCE_CONFIGS.typography, -3, 7)
export const TIMING_TOKENS = generateTokens(SEQUENCE_CONFIGS.timing, -3, 7)

export const SPACING_SCALE = SPACING_TOKENS.map(t => t.label)
export const FONT_SIZE_SCALE = TYPOGRAPHY_TOKENS.map(t => t.label)

// Default color tokens with hex values
export interface ColorToken {
  label: string
  hex: string
  description?: string
}

export const COLOR_TOKEN_MAP: ColorToken[] = [
  { label: 'blue', hex: '#213eb0' },
  { label: 'green', hex: '#389d34' },
  { label: 'red', hex: '#e15c55' },
  { label: 'yellow', hex: '#EDCB38' },
  { label: 'orange', hex: '#e97c16' },
  { label: 'transparent', hex: 'rgba(0,0,0,0)' },
  { label: 'black', hex: '#000000' },
  { label: 'gray', hex: '#4e4e50' },
  { label: 'white', hex: '#ffffff' },
  { label: 'title', hex: '', description: 'Near-black text (light) / near-white text (dark)' },
  { label: 'caption', hex: '', description: 'Secondary text color, adapts to theme' },
  { label: 'paragraph', hex: '', description: 'Body text color, adapts to theme' },
  { label: 'disabled', hex: '', description: 'Muted/disabled text color' },
  { label: 'line', hex: '', description: 'Border/divider color, adapts to theme' },
  { label: 'currentColor', hex: '', description: 'Inherits current text color' },
  { label: 'inherit', hex: '', description: 'Inherits from parent' },
  { label: 'none', hex: '', description: 'No color' },
]

export const COLOR_TOKENS = COLOR_TOKEN_MAP.map(t => t.label)

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
