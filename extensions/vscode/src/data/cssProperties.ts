// CSS properties that can be used at the top level of a DOMQL element.
// They get automatically promoted to element.props by propertizeElement().

export interface CssPropInfo {
  label: string
  detail: string
  documentation?: string
}

// Design-system shorthand props (DOMQL/smbls specific)
export const DESIGN_SYSTEM_PROPS: CssPropInfo[] = [
  { label: 'flow', detail: 'flow: string', documentation: 'Shorthand for `flexDirection`. Common values: `"column"`, `"row"`, `"y"`, `"x"`, `"column-reverse"`\n\n```js\nflow: "column"\nflow: "x"  // alias for "row"\n```' },
  { label: 'align', detail: 'align: string', documentation: 'Shorthand for united `alignItems` and `justifyContent`.\n\n```js\nalign: "center center"\nalign: "flex-start space-between"\n```' },
  { label: 'flexAlign', detail: 'flexAlign: string', documentation: 'Shorthand for united `alignItems` and `justifyContent`.\n\n```js\nflexAlign: "flex-start center"\n```' },
  { label: 'round', detail: 'round: string', documentation: 'Rounding the corners of the shape. Accepts spacing design tokens or CSS values.\n\n```js\nround: "C2"\nround: "100%"\n```' },
  { label: 'boxSize', detail: 'boxSize: string', documentation: 'Range of width and height. Accepts spacing design tokens.\n\n```js\nboxSize: "C1 E"  // width: C1, height: E\nboxSize: "D"     // both width and height\n```' },
  { label: 'widthRange', detail: 'widthRange: string', documentation: 'Range of min-width and max-width.\n\n```js\nwidthRange: "A1 B2"  // minWidth: A1, maxWidth: B2\nwidthRange: "H2 50%"\n```' },
  { label: 'heightRange', detail: 'heightRange: string', documentation: 'Range of min-height and max-height.\n\n```js\nheightRange: "A1 B2"  // minHeight: A1, maxHeight: B2\n```' },
  { label: 'theme', detail: 'theme: string | object', documentation: 'Reference the value from the Themes configuration.\n\n```js\ntheme: "primary"\ntheme: "primary .active"\ntheme: { color: "white", "@dark": { color: "blue" } }\n```' },
  { label: 'columns', detail: 'columns: string', documentation: 'Shorthand for `gridTemplateColumns`.' },
  { label: 'rows', detail: 'rows: string', documentation: 'Shorthand for `gridTemplateRows`.' },
  { label: 'wrap', detail: 'wrap: string', documentation: 'Shorthand for `flexWrap`. E.g. `"wrap"`, `"nowrap"`' },
  { label: 'inset', detail: 'inset: string', documentation: 'CSS inset shorthand (top, right, bottom, left).' },
  { label: 'shape', detail: 'shape: string', documentation: 'Name of the shape from Shapes configuration.\n\n```js\nshape: "tag"\nshape: "tooltip top"\n```' },
  { label: 'shapeModifier', detail: 'shapeModifier: string | object', documentation: 'If the shape is either tooltip or tag, sets additional attributes like direction or position.\n\n```js\nshapeModifier: { position: "block center", direction: "north west" }\n```' },
  { label: 'shadow', detail: 'shadow: string', documentation: 'Level of the shadow that adds depth to the element.\n\n```js\nshadow: "black A A C"  // color x y depth\n```' },
]

// Standard CSS properties
export const STANDARD_CSS_PROPS: CssPropInfo[] = [
  // Layout
  { label: 'display', detail: 'display: string' },
  { label: 'position', detail: 'position: string' },
  { label: 'top', detail: 'top: string' },
  { label: 'right', detail: 'right: string' },
  { label: 'bottom', detail: 'bottom: string' },
  { label: 'left', detail: 'left: string' },
  { label: 'zIndex', detail: 'zIndex: number | string' },
  { label: 'overflow', detail: 'overflow: string' },
  { label: 'overflowX', detail: 'overflowX: string' },
  { label: 'overflowY', detail: 'overflowY: string' },
  { label: 'visibility', detail: 'visibility: string' },

  // Flexbox
  { label: 'flexDirection', detail: 'flexDirection: string' },
  { label: 'flexFlow', detail: 'flexFlow: string' },
  { label: 'flexWrap', detail: 'flexWrap: string' },
  { label: 'flexGrow', detail: 'flexGrow: string | number' },
  { label: 'flexShrink', detail: 'flexShrink: string | number' },
  { label: 'flexBasis', detail: 'flexBasis: string' },
  { label: 'flex', detail: 'flex: string' },
  { label: 'alignItems', detail: 'alignItems: string' },
  { label: 'alignContent', detail: 'alignContent: string' },
  { label: 'alignSelf', detail: 'alignSelf: string' },
  { label: 'justifyContent', detail: 'justifyContent: string' },
  { label: 'justifyItems', detail: 'justifyItems: string' },
  { label: 'justifySelf', detail: 'justifySelf: string' },
  { label: 'gap', detail: 'gap: string', documentation: 'The space between children inside the element. Accepts spacing design tokens.\n\n```js\ngap: "A2"\ngap: "B C"  // rowGap columnGap\n```' },
  { label: 'rowGap', detail: 'rowGap: string' },
  { label: 'columnGap', detail: 'columnGap: string' },
  { label: 'order', detail: 'order: number' },

  // Grid
  { label: 'gridTemplateColumns', detail: 'gridTemplateColumns: string' },
  { label: 'gridTemplateRows', detail: 'gridTemplateRows: string' },
  { label: 'gridTemplateAreas', detail: 'gridTemplateAreas: string' },
  { label: 'gridColumn', detail: 'gridColumn: string' },
  { label: 'gridRow', detail: 'gridRow: string' },
  { label: 'gridArea', detail: 'gridArea: string' },
  { label: 'gridAutoFlow', detail: 'gridAutoFlow: string' },
  { label: 'gridAutoColumns', detail: 'gridAutoColumns: string' },
  { label: 'gridAutoRows', detail: 'gridAutoRows: string' },

  // Sizing
  { label: 'width', detail: 'width: string', documentation: 'Width of the element. Accepts spacing design tokens or CSS values.\n\n```js\nwidth: "F1"\nwidth: "100%"\n```' },
  { label: 'height', detail: 'height: string', documentation: 'Height of the element. Accepts spacing design tokens or CSS values.\n\n```js\nheight: "F1"\n```' },
  { label: 'minWidth', detail: 'minWidth: string', documentation: 'Min width of the box. Accepts spacing design tokens or CSS values.' },
  { label: 'maxWidth', detail: 'maxWidth: string', documentation: 'Max width of the box. Accepts spacing design tokens or CSS values.' },
  { label: 'minHeight', detail: 'minHeight: string', documentation: 'Min height of the box. Accepts spacing design tokens or CSS values.' },
  { label: 'maxHeight', detail: 'maxHeight: string', documentation: 'Max height of the box. Accepts spacing design tokens or CSS values.' },
  { label: 'aspectRatio', detail: 'aspectRatio: string', documentation: 'Aspect ratio of the box.\n\n```js\naspectRatio: "1 / 2"\n```' },

  // Spacing
  { label: 'padding', detail: 'padding: string', documentation: 'Space inside the element. Accepts spacing design tokens or CSS values.\n\n```js\npadding: "A1 C2"\npadding: "Z2 C"\n```' },
  { label: 'paddingTop', detail: 'paddingTop: string' },
  { label: 'paddingRight', detail: 'paddingRight: string' },
  { label: 'paddingBottom', detail: 'paddingBottom: string' },
  { label: 'paddingLeft', detail: 'paddingLeft: string' },
  { label: 'paddingInline', detail: 'paddingInline: string' },
  { label: 'paddingBlock', detail: 'paddingBlock: string' },
  { label: 'margin', detail: 'margin: string', documentation: 'Outer space of the element. Accepts spacing design tokens or CSS values.\n\n```js\nmargin: "0 -B2"\n```' },
  { label: 'marginTop', detail: 'marginTop: string' },
  { label: 'marginRight', detail: 'marginRight: string' },
  { label: 'marginBottom', detail: 'marginBottom: string' },
  { label: 'marginLeft', detail: 'marginLeft: string' },
  { label: 'marginInline', detail: 'marginInline: string' },
  { label: 'marginBlock', detail: 'marginBlock: string' },

  // Background
  { label: 'background', detail: 'background: string', documentation: 'Setting the specific background color matching with one from the Colors page. Accepts color tokens with modifiers.\n\n```js\nbackground: "gray"\nbackground: "blue.5"  // with opacity\n```' },
  { label: 'backgroundColor', detail: 'backgroundColor: string' },
  { label: 'backgroundImage', detail: 'backgroundImage: string' },
  { label: 'backgroundSize', detail: 'backgroundSize: string' },
  { label: 'backgroundPosition', detail: 'backgroundPosition: string' },
  { label: 'backgroundRepeat', detail: 'backgroundRepeat: string' },
  { label: 'backgroundClip', detail: 'backgroundClip: string' },

  // Border
  { label: 'border', detail: 'border: string', documentation: 'Border with design system color tokens. Order: color, size, style.\n\n```js\nborder: "blue 1px solid"\nborderTop: "1px solid gray.5"\n```' },
  { label: 'borderTop', detail: 'borderTop: string' },
  { label: 'borderRight', detail: 'borderRight: string' },
  { label: 'borderBottom', detail: 'borderBottom: string' },
  { label: 'borderLeft', detail: 'borderLeft: string' },
  { label: 'borderWidth', detail: 'borderWidth: string' },
  { label: 'borderStyle', detail: 'borderStyle: string' },
  { label: 'borderColor', detail: 'borderColor: string' },
  { label: 'borderRadius', detail: 'borderRadius: string', documentation: 'Rounding the corners of the shape. Accepts spacing design tokens.\n\n```js\nborderRadius: "C2"\n```' },
  { label: 'borderTopLeftRadius', detail: 'borderTopLeftRadius: string' },
  { label: 'borderTopRightRadius', detail: 'borderTopRightRadius: string' },
  { label: 'borderBottomLeftRadius', detail: 'borderBottomLeftRadius: string' },
  { label: 'borderBottomRightRadius', detail: 'borderBottomRightRadius: string' },
  { label: 'outline', detail: 'outline: string' },
  { label: 'outlineOffset', detail: 'outlineOffset: string' },

  // Typography
  { label: 'color', detail: 'color: string', documentation: 'Setting the specific text color matching with one from the Colors page. Accepts color tokens with modifiers.\n\n```js\ncolor: "title"\ncolor: "blue.5"  // with opacity\n```' },
  { label: 'fontSize', detail: 'fontSize: string', documentation: 'Using typography sequence or default CSS values. Accepts typography design tokens.\n\n```js\nfontSize: "B"\nfontSize: "Z1"\n```' },
  { label: 'fontWeight', detail: 'fontWeight: string | number', documentation: 'CSS font-weight value. Finds the closest weight in configuration or sets variable font value.\n\n```js\nfontWeight: "500"\n```' },
  { label: 'fontFamily', detail: 'fontFamily: string' },
  { label: 'fontStyle', detail: 'fontStyle: string' },
  { label: 'lineHeight', detail: 'lineHeight: string | number' },
  { label: 'letterSpacing', detail: 'letterSpacing: string' },
  { label: 'textAlign', detail: 'textAlign: string' },
  { label: 'textDecoration', detail: 'textDecoration: string' },
  { label: 'textTransform', detail: 'textTransform: string' },
  { label: 'textOverflow', detail: 'textOverflow: string' },
  { label: 'whiteSpace', detail: 'whiteSpace: string' },
  { label: 'wordBreak', detail: 'wordBreak: string' },
  { label: 'wordWrap', detail: 'wordWrap: string' },

  // Effects
  { label: 'opacity', detail: 'opacity: string | number' },
  { label: 'boxShadow', detail: 'boxShadow: string' },
  { label: 'filter', detail: 'filter: string' },
  { label: 'backdropFilter', detail: 'backdropFilter: string' },
  { label: 'transform', detail: 'transform: string' },
  { label: 'transformOrigin', detail: 'transformOrigin: string' },
  { label: 'transition', detail: 'transition: string', documentation: 'Transition using timing design tokens.\n\n```js\ntransition: "A defaultBezier"\n```' },
  { label: 'transitionProperty', detail: 'transitionProperty: string' },
  { label: 'transitionDuration', detail: 'transitionDuration: string', documentation: 'Duration value from Timing sequence, or CSS value.' },
  { label: 'transitionTimingFunction', detail: 'transitionTimingFunction: string' },
  { label: 'transitionDelay', detail: 'transitionDelay: string' },
  { label: 'animation', detail: 'animation: string', documentation: 'Bundle animation properties. Accepts animation name and timing tokens.\n\n```js\nanimation: "fadeIn"\nanimation: "fadeIn C1 my-custom-bezier"\n```' },
  { label: 'animationName', detail: 'animationName: string', documentation: 'Name of the animation defined in design system.' },
  { label: 'animationDuration', detail: 'animationDuration: string', documentation: 'Duration value from Timing sequence, or CSS value.\n\n```js\nanimationDuration: "C"\n```' },
  { label: 'animationDelay', detail: 'animationDelay: string', documentation: 'Delay value from Timing sequence, or CSS value.' },
  { label: 'animationTimingFunction', detail: 'animationTimingFunction: string', documentation: 'A value from Timing sequence, or CSS animation-timing-function property.' },
  { label: 'animationFillMode', detail: 'animationFillMode: string' },
  { label: 'animationPlayState', detail: 'animationPlayState: string' },
  { label: 'animationIterationCount', detail: 'animationIterationCount: string' },
  { label: 'animationDirection', detail: 'animationDirection: string' },

  // Cursor / pointer
  { label: 'cursor', detail: 'cursor: string' },
  { label: 'pointerEvents', detail: 'pointerEvents: string' },
  { label: 'userSelect', detail: 'userSelect: string' },

  // Misc
  { label: 'objectFit', detail: 'objectFit: string' },
  { label: 'objectPosition', detail: 'objectPosition: string' },
  { label: 'resize', detail: 'resize: string' },
  { label: 'content', detail: 'content: string' },
  { label: 'listStyle', detail: 'listStyle: string' },
  { label: 'tableLayout', detail: 'tableLayout: string' },
  { label: 'verticalAlign', detail: 'verticalAlign: string' },
  { label: 'appearance', detail: 'appearance: string' },
  { label: 'boxSizing', detail: 'boxSizing: string' },
  { label: 'isolation', detail: 'isolation: string' },
  { label: 'mixBlendMode', detail: 'mixBlendMode: string' },
  { label: 'willChange', detail: 'willChange: string' },
  { label: 'clipPath', detail: 'clipPath: string' },
  { label: 'fill', detail: 'fill: string' },
  { label: 'stroke', detail: 'stroke: string' },
  { label: 'strokeWidth', detail: 'strokeWidth: string | number' },
]

export const ALL_CSS_PROPS = [...DESIGN_SYSTEM_PROPS, ...STANDARD_CSS_PROPS]
