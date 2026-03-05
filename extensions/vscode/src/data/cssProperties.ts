// CSS properties that can be used at the top level of a DOMQL element.
// They get automatically promoted to element.props by propertizeElement().

export interface CssPropInfo {
  label: string
  detail: string
  documentation?: string
}

// Design-system shorthand props (DOMQL/smbls specific)
export const DESIGN_SYSTEM_PROPS: CssPropInfo[] = [
  { label: 'flow', detail: 'Shorthand for flexDirection', documentation: 'Shorthand for `flexDirection`. Common values: `"column"`, `"row"`, `"y"`, `"x"`, `"column-reverse"`\n\n```js\nflow: "column"\nflow: "x"  // alias for "row"\n```' },
  { label: 'align', detail: 'Shorthand for alignItems and justifyContent', documentation: 'Shorthand for united `alignItems` and `justifyContent`.\n\n```js\nalign: "center center"\nalign: "flex-start space-between"\n```' },
  { label: 'flexAlign', detail: 'Shorthand for alignItems and justifyContent', documentation: 'Shorthand for united `alignItems` and `justifyContent`.\n\n```js\nflexAlign: "flex-start center"\n```' },
  { label: 'round', detail: 'Rounding the corners of the shape', documentation: 'Rounding the corners of the shape. Accepts spacing design tokens or CSS values.\n\n```js\nround: "C2"\nround: "100%"\n```' },
  { label: 'boxSize', detail: 'Range of width and height', documentation: 'Range of width and height. Accepts spacing design tokens.\n\n```js\nboxSize: "C1 E"  // width: C1, height: E\nboxSize: "D"     // both width and height\n```' },
  { label: 'widthRange', detail: 'Range of min-width and max-width', documentation: 'Range of min-width and max-width.\n\n```js\nwidthRange: "A1 B2"  // minWidth: A1, maxWidth: B2\nwidthRange: "H2 50%"\n```' },
  { label: 'heightRange', detail: 'Range of min-height and max-height', documentation: 'Range of min-height and max-height.\n\n```js\nheightRange: "A1 B2"  // minHeight: A1, maxHeight: B2\n```' },
  { label: 'theme', detail: 'Reference a theme from Themes configuration', documentation: 'Reference the value from the Themes configuration.\n\n```js\ntheme: "primary"\ntheme: "primary .active"\ntheme: { color: "white", "@dark": { color: "blue" } }\n```' },
  { label: 'columns', detail: 'Shorthand for gridTemplateColumns', documentation: 'Shorthand for `gridTemplateColumns`.' },
  { label: 'rows', detail: 'Shorthand for gridTemplateRows', documentation: 'Shorthand for `gridTemplateRows`.' },
  { label: 'wrap', detail: 'Shorthand for flexWrap', documentation: 'Shorthand for `flexWrap`. E.g. `"wrap"`, `"nowrap"`' },
  { label: 'inset', detail: 'CSS inset shorthand (top, right, bottom, left)', documentation: 'CSS inset shorthand (top, right, bottom, left).' },
  { label: 'shape', detail: 'Name of the shape from Shapes configuration', documentation: 'Name of the shape from Shapes configuration.\n\n```js\nshape: "tag"\nshape: "tooltip top"\n```' },
  { label: 'shapeModifier', detail: 'Shape direction and position attributes', documentation: 'If the shape is either tooltip or tag, sets additional attributes like direction or position.\n\n```js\nshapeModifier: { position: "block center", direction: "north west" }\n```' },
  { label: 'shadow', detail: 'Shadow depth with color and offset tokens', documentation: 'Level of the shadow that adds depth to the element.\n\n```js\nshadow: "black A A C"  // color x y depth\n```' },
]

// Standard CSS properties
export const STANDARD_CSS_PROPS: CssPropInfo[] = [
  // Layout
  { label: 'display', detail: 'CSS display mode' },
  { label: 'position', detail: 'CSS positioning method' },
  { label: 'top', detail: 'Top offset position' },
  { label: 'right', detail: 'Right offset position' },
  { label: 'bottom', detail: 'Bottom offset position' },
  { label: 'left', detail: 'Left offset position' },
  { label: 'zIndex', detail: 'Stack order of the element' },
  { label: 'overflow', detail: 'Content overflow behavior' },
  { label: 'overflowX', detail: 'Horizontal overflow behavior' },
  { label: 'overflowY', detail: 'Vertical overflow behavior' },
  { label: 'visibility', detail: 'Element visibility' },

  // Flexbox
  { label: 'flexDirection', detail: 'CSS flexDirection property' },
  { label: 'flexFlow', detail: 'CSS flexFlow property' },
  { label: 'flexWrap', detail: 'CSS flexWrap property' },
  { label: 'flexGrow', detail: 'Flex grow factor' },
  { label: 'flexShrink', detail: 'Flex shrink factor' },
  { label: 'flexBasis', detail: 'Initial main size of flex item' },
  { label: 'flex', detail: 'Flex shorthand (grow shrink basis)' },
  { label: 'alignItems', detail: 'CSS alignItems property' },
  { label: 'alignContent', detail: 'CSS alignContent property' },
  { label: 'alignSelf', detail: 'CSS alignSelf property' },
  { label: 'justifyContent', detail: 'CSS justifyContent property' },
  { label: 'justifyItems', detail: 'CSS justifyItems property' },
  { label: 'justifySelf', detail: 'CSS justifySelf property' },
  { label: 'gap', detail: 'gap: string', documentation: 'The space between children inside the element. Accepts spacing design tokens.\n\n```js\ngap: "A2"\ngap: "B C"  // rowGap columnGap\n```' },
  { label: 'rowGap', detail: 'Space between rows' },
  { label: 'columnGap', detail: 'Space between columns' },
  { label: 'order', detail: 'Flex/grid item order' },

  // Grid
  { label: 'gridTemplateColumns', detail: 'Grid column track sizes' },
  { label: 'gridTemplateRows', detail: 'Grid row track sizes' },
  { label: 'gridTemplateAreas', detail: 'Named grid template areas' },
  { label: 'gridColumn', detail: 'Grid column placement' },
  { label: 'gridRow', detail: 'Grid row placement' },
  { label: 'gridArea', detail: 'Grid area placement' },
  { label: 'gridAutoFlow', detail: 'Auto-placement algorithm' },
  { label: 'gridAutoColumns', detail: 'Auto-generated column size' },
  { label: 'gridAutoRows', detail: 'Auto-generated row size' },

  // Sizing
  { label: 'width', detail: 'Width of the element', documentation: 'Width of the element. Accepts spacing design tokens or CSS values.\n\n```js\nwidth: "F1"\nwidth: "100%"\n```' },
  { label: 'height', detail: 'Height of the element', documentation: 'Height of the element. Accepts spacing design tokens or CSS values.\n\n```js\nheight: "F1"\n```' },
  { label: 'minWidth', detail: 'Min width of the box', documentation: 'Min width of the box. Accepts spacing design tokens or CSS values.' },
  { label: 'maxWidth', detail: 'Max width of the box', documentation: 'Max width of the box. Accepts spacing design tokens or CSS values.' },
  { label: 'minHeight', detail: 'Min height of the box', documentation: 'Min height of the box. Accepts spacing design tokens or CSS values.' },
  { label: 'maxHeight', detail: 'Max height of the box', documentation: 'Max height of the box. Accepts spacing design tokens or CSS values.' },
  { label: 'aspectRatio', detail: 'Aspect ratio of the box (1/3, 3/7…)', documentation: 'Aspect ratio of the box.\n\n```js\naspectRatio: "1 / 2"\n```' },

  // Spacing
  { label: 'padding', detail: 'Space inside the element', documentation: 'Space inside the element. Accepts spacing design tokens or CSS values.\n\n```js\npadding: "A1 C2"\npadding: "Z2 C"\n```' },
  { label: 'paddingTop', detail: 'Top inner space' },
  { label: 'paddingRight', detail: 'Right inner space' },
  { label: 'paddingBottom', detail: 'Bottom inner space' },
  { label: 'paddingLeft', detail: 'Left inner space' },
  { label: 'paddingInline', detail: 'Inline (horizontal) inner space' },
  { label: 'paddingBlock', detail: 'Block (vertical) inner space' },
  { label: 'margin', detail: 'Outer space of the element', documentation: 'Outer space of the element. Accepts spacing design tokens or CSS values.\n\n```js\nmargin: "0 -B2"\n```' },
  { label: 'marginTop', detail: 'Top outer space' },
  { label: 'marginRight', detail: 'Right outer space' },
  { label: 'marginBottom', detail: 'Bottom outer space' },
  { label: 'marginLeft', detail: 'Left outer space' },
  { label: 'marginInline', detail: 'Inline (horizontal) outer space' },
  { label: 'marginBlock', detail: 'Block (vertical) outer space' },

  // Background
  { label: 'background', detail: 'background: string', documentation: 'Setting the specific background color matching with one from the Colors page. Accepts color tokens with modifiers.\n\n```js\nbackground: "gray"\nbackground: "blue.5"  // with opacity\n```' },
  { label: 'backgroundColor', detail: 'Background color of the element' },
  { label: 'backgroundImage', detail: 'Background image URL or gradient' },
  { label: 'backgroundSize', detail: 'Background image sizing' },
  { label: 'backgroundPosition', detail: 'Background image position' },
  { label: 'backgroundRepeat', detail: 'Background image repeat behavior' },
  { label: 'backgroundClip', detail: 'Background painting area' },

  // Border
  { label: 'border', detail: 'border: string', documentation: 'Border with design system color tokens. Order: color, size, style.\n\n```js\nborder: "blue 1px solid"\nborderTop: "1px solid gray.5"\n```' },
  { label: 'borderTop', detail: 'Top border with color tokens' },
  { label: 'borderRight', detail: 'Right border with color tokens' },
  { label: 'borderBottom', detail: 'Bottom border with color tokens' },
  { label: 'borderLeft', detail: 'Left border with color tokens' },
  { label: 'borderWidth', detail: 'Border width' },
  { label: 'borderStyle', detail: 'Border line style' },
  { label: 'borderColor', detail: 'Border color from design system' },
  { label: 'borderRadius', detail: 'borderRadius: string', documentation: 'Rounding the corners of the shape. Accepts spacing design tokens.\n\n```js\nborderRadius: "C2"\n```' },
  { label: 'borderTopLeftRadius', detail: 'Top-left corner radius' },
  { label: 'borderTopRightRadius', detail: 'Top-right corner radius' },
  { label: 'borderBottomLeftRadius', detail: 'Bottom-left corner radius' },
  { label: 'borderBottomRightRadius', detail: 'Bottom-right corner radius' },
  { label: 'outline', detail: 'Outline around the element' },
  { label: 'outlineOffset', detail: 'Space between element and outline' },

  // Typography
  { label: 'color', detail: 'Text color from design system', documentation: 'Setting the specific text color matching with one from the Colors page. Accepts color tokens with modifiers.\n\n```js\ncolor: "title"\ncolor: "blue.5"  // with opacity\n```' },
  { label: 'fontSize', detail: 'Typography sequence or CSS value', documentation: 'Using typography sequence or default CSS values. Accepts typography design tokens.\n\n```js\nfontSize: "B"\nfontSize: "Z1"\n```' },
  { label: 'fontWeight', detail: 'Font weight from configuration', documentation: 'CSS font-weight value. Finds the closest weight in configuration or sets variable font value.\n\n```js\nfontWeight: "500"\n```' },
  { label: 'fontFamily', detail: 'Font family name' },
  { label: 'fontStyle', detail: 'Font style (normal, italic)' },
  { label: 'lineHeight', detail: 'Line height of text' },
  { label: 'letterSpacing', detail: 'Space between characters' },
  { label: 'textAlign', detail: 'Text horizontal alignment' },
  { label: 'textDecoration', detail: 'Text decoration (underline, etc.)' },
  { label: 'textTransform', detail: 'Text case transformation' },
  { label: 'textOverflow', detail: 'Overflowed text behavior' },
  { label: 'whiteSpace', detail: 'White space handling' },
  { label: 'wordBreak', detail: 'Word breaking rules' },
  { label: 'wordWrap', detail: 'Word wrapping behavior' },

  // Effects
  { label: 'opacity', detail: 'Element transparency (0-1)' },
  { label: 'boxShadow', detail: 'CSS box shadow' },
  { label: 'filter', detail: 'Visual filter effects (blur, brightness)' },
  { label: 'backdropFilter', detail: 'Backdrop filter effects' },
  { label: 'transform', detail: 'CSS transform (translate, rotate, scale)' },
  { label: 'transformOrigin', detail: 'Transform origin point' },
  { label: 'transition', detail: 'transition: string', documentation: 'Transition using timing design tokens.\n\n```js\ntransition: "A defaultBezier"\n```' },
  { label: 'transitionProperty', detail: 'Properties to transition' },
  { label: 'transitionDuration', detail: 'transitionDuration: string', documentation: 'Duration value from Timing sequence, or CSS value.' },
  { label: 'transitionTimingFunction', detail: 'Transition easing function' },
  { label: 'transitionDelay', detail: 'Delay before transition starts' },
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
  { label: 'cursor', detail: 'Mouse cursor appearance' },
  { label: 'pointerEvents', detail: 'Pointer event targeting' },
  { label: 'userSelect', detail: 'Text selection behavior' },

  // Misc
  { label: 'objectFit', detail: 'Replaced element fitting' },
  { label: 'objectPosition', detail: 'Replaced element position' },
  { label: 'resize', detail: 'Element resize behavior' },
  { label: 'content', detail: 'Generated content for pseudo-elements' },
  { label: 'listStyle', detail: 'List marker style' },
  { label: 'tableLayout', detail: 'Table layout algorithm' },
  { label: 'verticalAlign', detail: 'Vertical alignment' },
  { label: 'appearance', detail: 'Native UI appearance' },
  { label: 'boxSizing', detail: 'Box model sizing method' },
  { label: 'isolation', detail: 'Stacking context isolation' },
  { label: 'mixBlendMode', detail: 'Color blending mode' },
  { label: 'willChange', detail: 'Performance optimization hint' },
  { label: 'clipPath', detail: 'Clipping region shape' },
  { label: 'fill', detail: 'SVG fill color' },
  { label: 'stroke', detail: 'SVG stroke color' },
  { label: 'strokeWidth', detail: 'SVG stroke width' },
]

export const ALL_CSS_PROPS = [...DESIGN_SYSTEM_PROPS, ...STANDARD_CSS_PROPS]
