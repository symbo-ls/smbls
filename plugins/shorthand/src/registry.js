'use strict'

/**
 * Bidirectional registry mapping property names to shorthand abbreviations.
 *
 * propToAbbr: { propertyName → abbreviation }
 * abbrToProp: { abbreviation → propertyName }
 */

const propToAbbr = {
  // ── Core DOMQL Properties ──
  attr: 'at',
  childExtends: 'cex',
  childExtendsRecursive: 'cexr',
  childProps: 'cp',
  children: 'ch',
  childrenAs: 'cha',
  class: 'cl',
  content: 'cnt',
  context: 'ctx',
  data: 'dt',
  extends: 'ext',
  hide: 'hd',
  html: 'htm',
  if: 'if',
  ignoreChildExtend: 'icex',
  key: 'ky',
  query: 'qy',
  routes: 'rt',
  scope: 'scp',
  show: 'shw',
  state: 'st',
  style: 'sy',
  tag: 'tg',
  text: 'tx',

  // ── Symbols Shorthand Props ──
  align: 'aln',
  boxSize: 'bsz',
  flow: 'fl',
  heightRange: 'hr',
  horizontalInset: 'hi',
  round: 'rnd',
  shadow: 'shd',
  size: 'sz',
  templateColumns: 'tcol',
  verticalInset: 'vi',
  widthRange: 'wr',
  wrap: 'wrp',

  // ── Box / Sizing ──
  aspectRatio: 'ar',
  blockSize: 'bks',
  boxSizing: 'bxs',
  height: 'h',
  inlineSize: 'ins',
  margin: 'm',
  marginBottom: 'mb',
  marginLeft: 'ml',
  marginRight: 'mr',
  marginTop: 'mt',
  maxBlockSize: 'mxbs',
  maxHeight: 'mxh',
  maxInlineSize: 'mxis',
  maxWidth: 'mxw',
  minBlockSize: 'mnbs',
  minHeight: 'mnh',
  minInlineSize: 'mnis',
  minWidth: 'mnw',
  padding: 'p',
  paddingBottom: 'pb',
  paddingInline: 'pil',
  paddingLeft: 'pl',
  paddingRight: 'pr',
  paddingTop: 'pt',
  width: 'w',

  // ── Flexbox ──
  alignContent: 'ac',
  alignItems: 'ai',
  alignSelf: 'as',
  flex: 'fx',
  flexBasis: 'fxb',
  flexDirection: 'fxd',
  flexFlow: 'fxf',
  flexGrow: 'fxg',
  flexShrink: 'fxs',
  flexWrap: 'fxw',
  gap: 'g',
  justifyContent: 'jc',
  justifyItems: 'ji',
  justifySelf: 'js',
  order: 'od',
  placeContent: 'pcn',
  placeItems: 'pit',
  placeSelf: 'psl',
  rowGap: 'rg',

  // ── Grid ──
  columnGap: 'cg',
  gridArea: 'ga',
  gridAutoColumns: 'gac',
  gridAutoFlow: 'gaf',
  gridAutoRows: 'gar',
  gridColumn: 'gc',
  gridColumnEnd: 'gce',
  gridColumnStart: 'gcs',
  gridRow: 'gr',
  gridRowEnd: 'gre',
  gridRowStart: 'grs',
  gridTemplateAreas: 'gta',
  gridTemplateColumns: 'gtc',
  gridTemplateRows: 'gtr',

  // ── Position ──
  bottom: 'bot',
  float: 'flt',
  inset: 'ist',
  left: 'lft',
  position: 'pos',
  right: 'rgt',
  top: 'tp',
  zIndex: 'zi',

  // ── Display / Visibility ──
  clear: 'clr',
  contain: 'ctn',
  cursor: 'cur',
  display: 'd',
  opacity: 'op',
  overflow: 'ov',
  overflowX: 'ovx',
  overflowY: 'ovy',
  pointerEvents: 'pe',
  resize: 'rsz',
  userSelect: 'us',
  visibility: 'vis',

  // ── Color / Theme ──
  background: 'bg',
  backgroundAttachment: 'bga',
  backgroundBlendMode: 'bgbm',
  backgroundClip: 'bgcl',
  backgroundColor: 'bgc',
  backgroundImage: 'bgi',
  backgroundOrigin: 'bgo',
  backgroundPosition: 'bgp',
  backgroundPositionX: 'bgpx',
  backgroundPositionY: 'bgpy',
  backgroundRepeat: 'bgr',
  backgroundRepeatX: 'bgrx',
  backgroundRepeatY: 'bgry',
  backgroundSize: 'bgs',
  color: 'c',
  theme: 'thm',
  themeModifier: 'thmm',

  // ── Border ──
  border: 'bd',
  borderBottom: 'bdb',
  borderBottomLeftRadius: 'bdblr',
  borderBottomRightRadius: 'bdbrr',
  borderCollapse: 'bdcl',
  borderColor: 'bdc',
  borderImage: 'bdi',
  borderImageOutset: 'bdio',
  borderImageRepeat: 'bdir',
  borderImageSlice: 'bdis',
  borderImageSource: 'bdisrc',
  borderImageWidth: 'bdiw',
  borderLeft: 'bdl',
  borderRadius: 'bdr',
  borderRight: 'bdrg',
  borderSpacing: 'bdsp',
  borderStyle: 'bdst',
  borderTop: 'bdt',
  borderTopLeftRadius: 'bdtlr',
  borderTopRightRadius: 'bdtrr',
  borderWidth: 'bdw',

  // ── Outline ──
  outline: 'ol',
  outlineColor: 'olc',
  outlineOffset: 'olo',
  outlineStyle: 'ols',
  outlineWidth: 'olw',

  // ── Shadow ──
  boxShadow: 'bxsh',
  textShadow: 'txsh',

  // ── Typography ──
  direction: 'dir',
  fontDisplay: 'fdi',
  fontFamily: 'ff',
  fontFeatureSettings: 'ffs',
  fontKerning: 'fk',
  fontOpticalSizing: 'fos',
  fontPalette: 'fpl',
  fontSize: 'fs',
  fontSizeAdjust: 'fsa',
  fontSmooth: 'fsm',
  fontStretch: 'fsr',
  fontStyle: 'fsy',
  fontSynthesis: 'fsyn',
  fontVariant: 'fv',
  fontVariationSettings: 'fvs',
  fontWeight: 'fw',
  hyphens: 'hyp',
  letterSpacing: 'ls',
  lineHeight: 'lh',
  tabSize: 'tsz',
  textAlign: 'ta',
  textDecoration: 'td',
  textDecorationColor: 'tdc',
  textDecorationLine: 'tdl',
  textDecorationStyle: 'tds',
  textIndent: 'ti',
  textOverflow: 'tov',
  textStroke: 'tsk',
  textTransform: 'tt',
  unicodeBidi: 'ub',
  verticalAlign: 'va',
  whiteSpace: 'ws',
  wordBreak: 'wbr',
  wordSpacing: 'wsp',
  wordWrap: 'wwr',
  writingMode: 'wm',

  // ── List / Table ──
  captionSide: 'cps',
  counterIncrement: 'ci',
  counterReset: 'cr',
  emptyCells: 'ec',
  listStyle: 'lst',
  listStyleImage: 'lsi',
  listStylePosition: 'lsp',
  listStyleType: 'lsty',
  quotes: 'qt',
  tableLayout: 'tl',

  // ── Column ──
  columnCount: 'cc',
  columnFill: 'cf',
  columnRule: 'crl',
  columnRuleColor: 'crlc',
  columnRuleStyle: 'crls',
  columnRuleWidth: 'crlw',
  columnSpan: 'cspn',
  columnWidth: 'cwi',
  columns: 'col',

  // ── Filter / Effects ──
  backdropFilter: 'bdf',
  boxDecorationBreak: 'bxdb',
  clipPath: 'cpth',
  filter: 'fil',
  isolation: 'iso',
  mixBlendMode: 'mbm',
  objectFit: 'obf',
  objectPosition: 'obp',
  perspective: 'prs',
  perspectiveOrigin: 'prso',
  willChange: 'wc',

  // ── Transform ──
  transform: 'tf',
  transformOrigin: 'tfo',
  transformStyle: 'tfs',

  // ── Transition ──
  transition: 'trn',
  transitionDelay: 'trnd',
  transitionDuration: 'trndr',
  transitionProperty: 'trnp',
  transitionTimingFunction: 'trntf',

  // ── Animation ──
  animation: 'an',
  animationDelay: 'and',
  animationDirection: 'andr',
  animationDuration: 'andur',
  animationFillMode: 'anfm',
  animationIterationCount: 'anic',
  animationName: 'ann',
  animationPlayState: 'anps',
  animationTimingFunction: 'antf',

  // ── Scroll ──
  scrollBehavior: 'sb',
  scrollMargin: 'smr',
  scrollMarginBottom: 'smrb',
  scrollMarginLeft: 'smrl',
  scrollMarginRight: 'smrr',
  scrollMarginTop: 'smrt',
  scrollPadding: 'spd',
  scrollPaddingBottom: 'spdb',
  scrollPaddingLeft: 'spdl',
  scrollPaddingRight: 'spdr',
  scrollPaddingTop: 'spdt',
  scrollSnapAlign: 'ssa',
  scrollSnapStop: 'sss',
  scrollSnapType: 'sst',

  // ── Page Break ──
  breakAfter: 'bka',
  breakBefore: 'bkb',
  breakInside: 'bki',
  pageBreakAfter: 'pbka',
  pageBreakBefore: 'pbkb',
  pageBreakInside: 'pbki',

  // ── HTML Attributes: Global ──
  accessKey: 'ack',
  className: 'cn',
  contentEditable: 'ced',
  contextMenu: 'cmu',
  draggable: 'drg',
  hidden: 'hid',
  id: 'id',
  is: 'is',
  lang: 'lng',
  nonce: 'nnc',
  spellCheck: 'spc',
  tabIndex: 'tbi',
  title: 'ttl',
  translate: 'trl',

  // ── HTML Attributes: Form ──
  accept: 'acp',
  acceptCharset: 'accs',
  action: 'act',
  autoComplete: 'atc',
  autoFocus: 'atf',
  capture: 'cap',
  challenge: 'chg',
  checked: 'chk',
  cols: 'cls',
  colSpan: 'csn',
  controls: 'ctl',
  default: 'def',
  defer: 'dfr',
  disabled: 'dis',
  encType: 'ect',
  form: 'frm',
  formAction: 'fac',
  formEncType: 'fect',
  formMethod: 'fme',
  formNoValidate: 'fnv',
  formTarget: 'ftg',
  high: 'hgh',
  inputMode: 'imd',
  kind: 'knd',
  label: 'lbl',
  list: 'lis',
  loop: 'lp',
  low: 'lw',
  max: 'mx',
  maxLength: 'mxl',
  method: 'mtd',
  min: 'mn',
  minLength: 'mnl',
  multiple: 'mul',
  muted: 'mut',
  name: 'nm',
  open: 'opn',
  optimum: 'opt',
  pattern: 'ptn',
  placeholder: 'phd',
  readOnly: 'ro',
  required: 'req',
  reversed: 'rev',
  rows: 'rws',
  rowSpan: 'rsn',
  selected: 'sel',
  span: 'spn',
  start: 'srt',
  step: 'stp',
  type: 'typ',
  value: 'val',

  // ── HTML Attributes: Link / Navigation ──
  download: 'dl',
  href: 'hrf',
  hrefLang: 'hrl',
  ping: 'png',
  referrerPolicy: 'rfp',
  rel: 'rl',
  target: 'tgt',

  // ── HTML Attributes: Media ──
  allow: 'alw',
  allowFullScreen: 'afs',
  allowPaymentRequest: 'apr',
  alt: 'alt',
  cellPadding: 'cpg',
  cellSpacing: 'csg',
  cite: 'cit',
  coords: 'crd',
  crossOrigin: 'cor',
  dateTime: 'dtm',
  fetchPriority: 'fpr',
  headers: 'hds',
  httpEquiv: 'hte',
  integrity: 'itg',
  isMap: 'ism',
  keyType: 'kty',
  loading: 'ldg',
  manifest: 'mft',
  media: 'mda',
  poster: 'pst',
  preload: 'prl',
  radioGroup: 'rdg',
  sandbox: 'sbx',
  scoped: 'scod',
  seamless: 'sml',
  shape: 'shp',
  sizes: 'szs',
  src: 'src',
  srcDoc: 'srd',
  srcLang: 'srl',
  srcSet: 'srs',
  useMap: 'ump',

  // ── HTML Attributes: ARIA ──
  ariaActiveDescendant: 'aad',
  ariaAtomic: 'aat',
  ariaBusy: 'abu',
  ariaChecked: 'achk',
  ariaControls: 'acl',
  ariaCurrent: 'acr',
  ariaDescribedBy: 'adb',
  ariaDetails: 'adt',
  ariaDisabled: 'adis',
  ariaDropEffect: 'ade',
  ariaErrorMessage: 'aem',
  ariaExpanded: 'aexp',
  ariaGrabbed: 'agr',
  ariaHasPopup: 'ahp',
  ariaHidden: 'ahid',
  ariaInvalid: 'ainv',
  ariaLabel: 'alb',
  ariaLabelledBy: 'alby',
  ariaLive: 'alv',
  ariaModal: 'amod',
  ariaMultiSelectable: 'ams',
  ariaOrientation: 'aor',
  ariaOwns: 'aow',
  ariaPosInSet: 'apis',
  ariaPressed: 'aprs',
  ariaReadOnly: 'aro',
  ariaRelevant: 'arl',
  ariaRequired: 'areq',
  ariaSelected: 'asel',
  ariaSetSize: 'assz',
  ariaValueMax: 'avmx',
  ariaValueMin: 'avmn',
  ariaValueNow: 'avn',
  role: 'role',

  // ── Events: Lifecycle ──
  onInit: '@in',
  onRender: '@rn',
  onUpdate: '@up',
  onStateChange: '@sc',
  onStateUpdate: '@su',

  // ── Events: Mouse ──
  onClick: '@ck',
  onContextMenu: '@cm',
  onDblClick: '@dc',
  onMouseDown: '@md',
  onMouseEnter: '@me',
  onMouseLeave: '@ml',
  onMouseMove: '@mm',
  onMouseOut: '@mo',
  onMouseOver: '@mv',
  onMouseUp: '@mu',

  // ── Events: Keyboard ──
  onKeyDown: '@kd',
  onKeyPress: '@kp',
  onKeyUp: '@ku',

  // ── Events: Focus ──
  onBlur: '@bl',
  onFocus: '@fc',
  onFocusIn: '@fi',
  onFocusOut: '@fo',

  // ── Events: Form ──
  onBeforeInput: '@bi',
  onChange: '@cg',
  onFormData: '@fd',
  onInput: '@ip',
  onInvalid: '@iv',
  onReset: '@rs',
  onSearch: '@sr',
  onSelect: '@sl',
  onSubmit: '@sm',

  // ── Events: Touch ──
  onTouchCancel: '@tc',
  onTouchEnd: '@te',
  onTouchMove: '@tm',
  onTouchStart: '@ts',

  // ── Events: Pointer ──
  onPointerCancel: '@pc',
  onPointerDown: '@pd',
  onPointerEnter: '@pe',
  onPointerLeave: '@ple',
  onPointerMove: '@pm',
  onPointerOut: '@po',
  onPointerOver: '@pov',
  onPointerUp: '@pu',

  // ── Events: Drag ──
  onDrag: '@dg',
  onDragEnd: '@dge',
  onDragEnter: '@dgn',
  onDragLeave: '@dgl',
  onDragOver: '@dgo',
  onDragStart: '@dgs',
  onDrop: '@dp',

  // ── Events: Scroll / Resize ──
  onResize: '@rz',
  onScroll: '@scl',
  onWheel: '@wh',

  // ── Events: Clipboard ──
  onCopy: '@cy',
  onCut: '@ct',
  onPaste: '@pt',

  // ── Events: Composition ──
  onCompositionEnd: '@cpe',
  onCompositionStart: '@cps',
  onCompositionUpdate: '@cpu',

  // ── Events: Animation / Transition ──
  onAnimationEnd: '@ae',
  onAnimationIteration: '@ai',
  onAnimationStart: '@as',
  onTransitionEnd: '@tre',
  onTransitionStart: '@trs',

  // ── Events: Media ──
  onAbort: '@ab',
  onCanPlay: '@cap',
  onCanPlayThrough: '@cpt',
  onDurationChange: '@duc',
  onEmptied: '@em',
  onEncrypted: '@enc',
  onEnded: '@end',
  onError: '@er',
  onLoad: '@ld',
  onLoadedData: '@ldd',
  onLoadedMetadata: '@ldm',
  onPause: '@pa',
  onPlay: '@pl',
  onPlaying: '@plg',
  onProgress: '@prg',
  onRateChange: '@rc',
  onSeeked: '@sk',
  onSeeking: '@skg',
  onStalled: '@stl',
  onSuspend: '@ssp',
  onTimeUpdate: '@tu',
  onVolumeChange: '@vc',
  onWaiting: '@wt',

  // ── Special / Advanced ──
  icon: 'ico',
  iconText: 'ict',
  lookup: 'lkp',
  router: 'rtr',
  shapeModifier: 'shpm'
}

// Build the reverse map
const abbrToProp = Object.create(null)
for (const prop in propToAbbr) {
  abbrToProp[propToAbbr[prop]] = prop
}

// Validate uniqueness at load time
const seen = Object.create(null)
for (const prop in propToAbbr) {
  const abbr = propToAbbr[prop]
  if (seen[abbr]) {
    throw new Error(
      `Duplicate abbreviation "${abbr}" for "${prop}" — already used by "${seen[abbr]}"`
    )
  }
  seen[abbr] = prop
}

/**
 * Keys whose object values must NOT be recursively shortened/expanded.
 * These contain user-defined keys (state data, scope function names, etc.)
 * that would break if accidentally matched against the abbreviation registry.
 */
const PRESERVE_VALUE_KEYS = new Set([
  'state',
  'st',
  'scope',
  'scp',
  'attr',
  'at',
  'style',
  'sy',
  'data',
  'dt',
  'context',
  'ctx',
  'query',
  'qy',
  'class',
  'cl'
])

const SKIP_INLINE_KEYS = new Set([
  'text',
  'tx',
  'html',
  'htm',
  'content',
  'cnt',
  'placeholder',
  'phd',
  'src',
  'href',
  'hrf'
])

/**
 * Returns true if the key is a PascalCase component name (starts with uppercase).
 */
function isComponentKey(key) {
  return /^[A-Z]/.test(key)
}

/**
 * Returns true if the key is a CSS selector, media query, or case prefix.
 */
function isSelectorKey(key) {
  return /^[:@.!$>&]/.test(key) || key.startsWith('> ')
}

export {
  propToAbbr,
  abbrToProp,
  PRESERVE_VALUE_KEYS,
  SKIP_INLINE_KEYS,
  isComponentKey,
  isSelectorKey
}
