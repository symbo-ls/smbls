// CSS properties that can be used at the top level of a DOMQL element.
// They get automatically promoted to element.props by propertizeElement().

export interface CssPropInfo {
  label: string
  detail: string
  documentation?: string
}

// Design-system shorthand props (DOMQL/smbls specific)
export const DESIGN_SYSTEM_PROPS: CssPropInfo[] = [
  { label: 'flow', detail: 'flow: string', documentation: 'Shorthand for `flexDirection`. Common values: `"column"`, `"row"`, `"y"`, `"x"`, `"column-reverse"`' },
  { label: 'align', detail: 'align: string', documentation: 'Shorthand for `alignItems justifyContent`. E.g. `"center space-between"`, `"center center"`' },
  { label: 'round', detail: 'round: string', documentation: 'Design token for border-radius. E.g. `"C"`, `"A"`, `"100%"`' },
  { label: 'boxSize', detail: 'boxSize: string', documentation: 'Sets both width and height. Design token or CSS value.' },
  { label: 'widthRange', detail: 'widthRange: string', documentation: 'Sets minWidth and maxWidth to the same value.' },
  { label: 'heightRange', detail: 'heightRange: string', documentation: 'Sets minHeight and maxHeight to the same value.' },
  { label: 'theme', detail: 'theme: string', documentation: 'Apply a design-system theme token. E.g. `"dialog"`, `"field"`, `"primary"`' },
  { label: 'columns', detail: 'columns: string', documentation: 'Shorthand for `gridTemplateColumns`.' },
  { label: 'rows', detail: 'rows: string', documentation: 'Shorthand for `gridTemplateRows`.' },
  { label: 'wrap', detail: 'wrap: string', documentation: 'Shorthand for `flexWrap`. E.g. `"wrap"`, `"nowrap"`' },
  { label: 'inset', detail: 'inset: string', documentation: 'CSS inset shorthand (top, right, bottom, left).' },
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
  { label: 'gap', detail: 'gap: string', documentation: 'Design token or CSS value. E.g. `"A"`, `"B C"`, `"8px"`' },
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
  { label: 'width', detail: 'width: string' },
  { label: 'height', detail: 'height: string' },
  { label: 'minWidth', detail: 'minWidth: string' },
  { label: 'maxWidth', detail: 'maxWidth: string' },
  { label: 'minHeight', detail: 'minHeight: string' },
  { label: 'maxHeight', detail: 'maxHeight: string' },

  // Spacing
  { label: 'padding', detail: 'padding: string', documentation: 'Design token or CSS value. E.g. `"A B"`, `"Z2 C"`' },
  { label: 'paddingTop', detail: 'paddingTop: string' },
  { label: 'paddingRight', detail: 'paddingRight: string' },
  { label: 'paddingBottom', detail: 'paddingBottom: string' },
  { label: 'paddingLeft', detail: 'paddingLeft: string' },
  { label: 'paddingInline', detail: 'paddingInline: string' },
  { label: 'paddingBlock', detail: 'paddingBlock: string' },
  { label: 'margin', detail: 'margin: string' },
  { label: 'marginTop', detail: 'marginTop: string' },
  { label: 'marginRight', detail: 'marginRight: string' },
  { label: 'marginBottom', detail: 'marginBottom: string' },
  { label: 'marginLeft', detail: 'marginLeft: string' },
  { label: 'marginInline', detail: 'marginInline: string' },
  { label: 'marginBlock', detail: 'marginBlock: string' },

  // Background
  { label: 'background', detail: 'background: string', documentation: 'Color name, design token, or CSS value. E.g. `"codGray"`, `"surface"`, `"primary"`' },
  { label: 'backgroundColor', detail: 'backgroundColor: string' },
  { label: 'backgroundImage', detail: 'backgroundImage: string' },
  { label: 'backgroundSize', detail: 'backgroundSize: string' },
  { label: 'backgroundPosition', detail: 'backgroundPosition: string' },
  { label: 'backgroundRepeat', detail: 'backgroundRepeat: string' },
  { label: 'backgroundClip', detail: 'backgroundClip: string' },

  // Border
  { label: 'border', detail: 'border: string' },
  { label: 'borderTop', detail: 'borderTop: string' },
  { label: 'borderRight', detail: 'borderRight: string' },
  { label: 'borderBottom', detail: 'borderBottom: string' },
  { label: 'borderLeft', detail: 'borderLeft: string' },
  { label: 'borderWidth', detail: 'borderWidth: string' },
  { label: 'borderStyle', detail: 'borderStyle: string' },
  { label: 'borderColor', detail: 'borderColor: string' },
  { label: 'borderRadius', detail: 'borderRadius: string' },
  { label: 'borderTopLeftRadius', detail: 'borderTopLeftRadius: string' },
  { label: 'borderTopRightRadius', detail: 'borderTopRightRadius: string' },
  { label: 'borderBottomLeftRadius', detail: 'borderBottomLeftRadius: string' },
  { label: 'borderBottomRightRadius', detail: 'borderBottomRightRadius: string' },
  { label: 'outline', detail: 'outline: string' },
  { label: 'outlineOffset', detail: 'outlineOffset: string' },

  // Typography
  { label: 'color', detail: 'color: string', documentation: 'Color name from design system or CSS value. E.g. `"primary"`, `"title"`, `"currentColor"`' },
  { label: 'fontSize', detail: 'fontSize: string', documentation: 'Design token (e.g. `"A"`, `"B"`, `"C"`) or CSS value.' },
  { label: 'fontWeight', detail: 'fontWeight: string | number' },
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
  { label: 'transition', detail: 'transition: string', documentation: 'E.g. `"B defaultBezier"` using design tokens.' },
  { label: 'transitionProperty', detail: 'transitionProperty: string' },
  { label: 'transitionDuration', detail: 'transitionDuration: string' },
  { label: 'transitionTimingFunction', detail: 'transitionTimingFunction: string' },
  { label: 'transitionDelay', detail: 'transitionDelay: string' },
  { label: 'animation', detail: 'animation: string' },
  { label: 'animationName', detail: 'animationName: string' },
  { label: 'animationDuration', detail: 'animationDuration: string' },

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
