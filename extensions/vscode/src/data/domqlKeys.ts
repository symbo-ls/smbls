export interface DomqlKeyInfo {
  label: string
  detail: string
  documentation: string
  snippet?: string
  kind: 'property' | 'method' | 'event' | 'component'
}

export const DOMQL_REGISTRY_KEYS: DomqlKeyInfo[] = [
  {
    label: 'extends',
    detail: 'extends: string | object | array',
    documentation:
      'Extend from one or more registered components. String references a component by name from context.components. Array allows multiple extends (first = highest priority).\n\n```js\nextends: "Button"\nextends: ["IconText", "Focusable"]\nextends: ButtonBase\n```',
    snippet: "extends: '${1:ComponentName}'",
    kind: 'property'
  },
  {
    label: 'tag',
    detail: 'tag: string',
    documentation:
      'HTML tag name for the element node. Defaults to `div`.\n\n```js\ntag: "section"\ntag: "button"\ntag: "a"\n```',
    snippet: "tag: '${1:div}'",
    kind: 'property'
  },
  {
    label: 'text',
    detail: 'text: string | function',
    documentation:
      'Text content of the element. Can be a static string or a function returning a string.\n\n```js\ntext: "Hello world"\ntext: ({ props }) => props.label\ntext: ({ state }) => `Count: ${state.count}`\n```',
    snippet: "text: '${1:}'",
    kind: 'property'
  },
  {
    label: 'html',
    detail: 'html: string | function',
    documentation:
      'Raw HTML content. Sets innerHTML. Use sparingly — XSS risk with user data.\n\n```js\nhtml: ({ props }) => props.richContent\nhtml: "<strong>Bold</strong>"\n```',
    snippet: 'html: ${1:},',
    kind: 'property'
  },
  {
    label: 'attr',
    detail: 'attr: object',
    documentation:
      'HTML attributes to set on the DOM node. Values can be static or functions. Returning `null` removes the attribute.\n\n```js\nattr: {\n  placeholder: ({ props }) => props.placeholder,\n  disabled: ({ props }) => props.disabled || null,\n  role: "button",\n  "aria-label": ({ props }) => props.label\n}\n```',
    snippet: 'attr: {\n  ${1:placeholder}: ${2:},\n},',
    kind: 'property'
  },
  {
    label: 'state',
    detail: 'state: object | string',
    documentation:
      'Local reactive state for the element. Use `state.update()` to update and trigger re-renders. String value inherits from ancestor state.\n\n```js\nstate: { open: false, count: 0, data: null }\nstate: "~/user"  // inherit from root state key\n```',
    snippet: 'state: { ${1:key}: ${2:value} },',
    kind: 'property'
  },
  {
    label: 'if',
    detail: 'if: function | boolean',
    documentation:
      'Conditional rendering. Element only renders when this returns truthy.\n\n```js\nif: ({ state }) => state.isVisible\nif: ({ props }) => Boolean(props.show)\nif: (el, state) => state.isAuthenticated\n```',
    snippet: 'if: ({ ${1:state} }) => ${2:condition},',
    kind: 'property'
  },
  {
    label: 'define',
    detail: 'define: object',
    documentation:
      'Register custom property transformers. When a matching key appears on an element, this handler runs.\n\n```js\ndefine: {\n  isActive: (param, el, state) => {\n    if (param) el.node.classList.add("active")\n    else el.node.classList.remove("active")\n  }\n}\n```',
    snippet: 'define: {\n  ${1:propName}: (param, el, state) => {\n    ${2:}\n  }\n},',
    kind: 'property'
  },
  {
    label: 'style',
    detail: 'style: object',
    documentation:
      'Inline styles or emotion CSS-in-JS with nested selectors. Escape hatch for complex selectors.\n\n```js\nstyle: {\n  "&:hover [dropdown]": {\n    opacity: 1,\n    transform: "translate3d(0,0,0)"\n  }\n}\n```',
    snippet: 'style: {\n  ${1:property}: ${2:value},\n},',
    kind: 'property'
  },
  {
    label: 'data',
    detail: 'data: object',
    documentation:
      'Non-reactive data store. Store mutable references (chart instances, timers) that should NOT trigger re-renders.\n\n```js\ndata: {\n  chartInstance: null,\n  timer: null\n}\n```',
    snippet: 'data: {\n  ${1:key}: ${2:null},\n},',
    kind: 'property'
  },
  {
    label: 'scope',
    detail: 'scope: string | object',
    documentation:
      'Assigns a scope reference. `"state"` makes `element.scope = element.state`. `"props"` makes `element.scope = element.props`.\n\n```js\nscope: "state"\nscope: "props"\nscope: { theme: "dark" }\n```',
    snippet: "scope: '${1:state}',",
    kind: 'property'
  },
  {
    label: 'on',
    detail: 'on: object (v2 compat)',
    documentation:
      '**v2 style — prefer top-level `onX` in v3.** Event handlers object.\n\n```js\n// v2\non: { click: fn, render: fn }\n\n// v3 preferred\nonClick: fn\nonRender: fn\n```',
    snippet: 'on: {\n  ${1:event}: (event, el, state) => {\n    ${2:}\n  }\n},',
    kind: 'property'
  },
  {
    label: 'props',
    detail: 'props: object',
    documentation:
      'Explicit props object. In v3, props are flattened at element root. Use `props:` only for passing props when instantiating a component.\n\n```js\n// Passing props to an instance\nButton: {\n  props: { text: "Submit", disabled: false }\n}\n```',
    snippet: 'props: {\n  ${1:key}: ${2:value},\n},',
    kind: 'property'
  },
  {
    label: 'children',
    detail: 'children: array | function',
    documentation:
      'Dynamic child list. Each item becomes a child element using `childExtends` as template.\n\n```js\nchildren: ({ props }) => props.items\nchildren: [{ text: "Item 1" }, { text: "Item 2" }]\n```',
    snippet: 'children: ${1:[]},',
    kind: 'property'
  },
  {
    label: 'childExtends',
    detail: 'childExtends: string | object',
    documentation:
      'Apply an extend to all direct child elements.\n\n```js\nchildExtends: "Button"\nchildExtends: { padding: "Z2 C", round: "0" }\n```',
    snippet: "childExtends: '${1:ComponentName}',",
    kind: 'property'
  },
  {
    label: 'childExtendsRecursive',
    detail: 'childExtendsRecursive: string | object',
    documentation:
      'Apply an extend to ALL descendants recursively.\n\n```js\nchildExtendsRecursive: { fontSize: "A" }\n```',
    snippet: "childExtendsRecursive: '${1:ComponentName}',",
    kind: 'property'
  },
  {
    label: 'content',
    detail: 'content: function | object',
    documentation:
      'Single dynamic child element. Rendered as the element\'s sole child.\n\n```js\ncontent: ({ props }) => props.page\ncontent: ({ state }) => state.currentView\n```',
    snippet: 'content: ({ ${1:props} }) => ${2:},',
    kind: 'property'
  },
  {
    label: 'classlist',
    detail: 'classlist: object | array',
    documentation:
      'CSS class management object. Keys are class names, values are booleans.\n\n```js\nclasslist: { active: true, hidden: false }\n```',
    snippet: 'classlist: { ${1:className}: ${2:true} },',
    kind: 'property'
  },
  {
    label: 'variables',
    detail: 'variables: object',
    documentation:
      'CSS custom properties (design tokens) scoped to this element.\n\n```js\nvariables: { color: "blue", spacing: "16px" }\n```',
    snippet: 'variables: { ${1:name}: ${2:value} },',
    kind: 'property'
  },
  {
    label: 'theme',
    detail: 'theme: string',
    documentation:
      'Apply a design system theme token to this element.\n\n```js\ntheme: "dialog"\ntheme: "field"\ntheme: "primary"\ntheme: "quaternary .child"\n```',
    snippet: "theme: '${1:dialog}',",
    kind: 'property'
  },
  {
    label: 'deps',
    detail: 'deps: object',
    documentation: 'Dependencies injection for the element.',
    snippet: 'deps: { ${1:} },',
    kind: 'property'
  },
  {
    label: 'key',
    detail: 'key: string',
    documentation: 'Explicit element key (overrides the object property name as key).',
    snippet: "key: '${1:}',",
    kind: 'property'
  },
  {
    label: 'query',
    detail: 'query: string',
    documentation: 'CSS query selector for targeting DOM elements.',
    snippet: "query: '${1:}',",
    kind: 'property'
  }
]

export const DOMQL_PSEUDO_SELECTORS: DomqlKeyInfo[] = [
  {
    label: ':hover',
    detail: ':hover: object',
    documentation: 'Styles applied on hover.\n\n```js\n":hover": { opacity: 0.9, transform: "scale(1.015)" }\n```',
    snippet: "':hover': { ${1:opacity}: ${2:0.9} },",
    kind: 'property'
  },
  {
    label: ':active',
    detail: ':active: object',
    documentation: 'Styles applied when active/pressed.\n\n```js\n":active": { opacity: 1 }\n```',
    snippet: "':active': { ${1:opacity}: ${2:1} },",
    kind: 'property'
  },
  {
    label: ':focus',
    detail: ':focus: object',
    documentation: 'Styles applied when focused.',
    snippet: "':focus': { ${1:outline}: ${2:'none'} },",
    kind: 'property'
  },
  {
    label: ':focus-visible',
    detail: ':focus-visible: object',
    documentation: 'Styles applied when focused via keyboard.',
    snippet: "':focus-visible': { ${1:outline}: ${2:'solid, X, blue .3'} },",
    kind: 'property'
  },
  {
    label: ':disabled',
    detail: ':disabled: object',
    documentation: 'Styles applied when disabled.',
    snippet: "':disabled': { ${1:opacity}: ${2:0.5} },",
    kind: 'property'
  },
  {
    label: ':not(:first-child)',
    detail: ':not(:first-child): object',
    documentation: 'Styles for all children except the first.',
    snippet: "':not(:first-child)': { ${1:borderTop}: ${2:'solid, 1px, currentColor'} },",
    kind: 'property'
  },
  {
    label: ':first-child',
    detail: ':first-child: object',
    documentation: 'Styles for the first child element.',
    snippet: "':first-child': { ${1:} },",
    kind: 'property'
  },
  {
    label: ':last-child',
    detail: ':last-child: object',
    documentation: 'Styles for the last child element.',
    snippet: "':last-child': { ${1:} },",
    kind: 'property'
  },
  {
    label: ':before',
    detail: ':before: object',
    documentation:
      'CSS ::before pseudo-element styles.\n\n```js\n":before": { content: "\'\'", display: "block" }\n```',
    snippet: "':before': { ${1:content}: ${2:'\\'\\''}  },",
    kind: 'property'
  },
  {
    label: ':after',
    detail: ':after: object',
    documentation: 'CSS ::after pseudo-element styles.',
    snippet: "':after': { ${1:content}: ${2:'\\'\\''}  },",
    kind: 'property'
  }
]

export const DOMQL_MEDIA_QUERIES: DomqlKeyInfo[] = [
  {
    label: '@dark',
    detail: '@dark: object',
    documentation: 'Styles applied in dark color scheme.\n\n```js\n"@dark": { background: "gray1", color: "gray12" }\n```',
    snippet: "'@dark': { ${1:} },",
    kind: 'property'
  },
  {
    label: '@light',
    detail: '@light: object',
    documentation: 'Styles applied in light color scheme.',
    snippet: "'@light': { ${1:} },",
    kind: 'property'
  },
  {
    label: '@mobile',
    detail: '@mobile: object',
    documentation: 'Styles applied on mobile breakpoint.',
    snippet: "'@mobile': { ${1:} },",
    kind: 'property'
  },
  {
    label: '@tablet',
    detail: '@tablet: object',
    documentation: 'Styles applied on tablet breakpoint.',
    snippet: "'@tablet': { ${1:} },",
    kind: 'property'
  },
  {
    label: '@desktop',
    detail: '@desktop: object',
    documentation: 'Styles applied on desktop breakpoint.',
    snippet: "'@desktop': { ${1:} },",
    kind: 'property'
  }
]

export const DOMQL_ALL_KEYS = [...DOMQL_REGISTRY_KEYS, ...DOMQL_PSEUDO_SELECTORS, ...DOMQL_MEDIA_QUERIES]
