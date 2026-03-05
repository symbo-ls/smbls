"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);
var vscode6 = __toESM(require("vscode"));

// src/providers/completionProvider.ts
var vscode2 = __toESM(require("vscode"));

// src/data/domqlKeys.ts
var DOMQL_REGISTRY_KEYS = [
  {
    label: "extends",
    detail: "extends: string | object | array",
    documentation: 'Extend from one or more registered components. String references a component by name from context.components. Array allows multiple extends (first = highest priority).\n\n```js\nextends: "Button"\nextends: ["IconText", "Focusable"]\nextends: ButtonBase\n```',
    snippet: "extends: '${1:ComponentName}'",
    kind: "property"
  },
  {
    label: "tag",
    detail: "tag: string",
    documentation: 'HTML tag name for the element node. Defaults to `div`.\n\n```js\ntag: "section"\ntag: "button"\ntag: "a"\n```',
    snippet: "tag: '${1:div}'",
    kind: "property"
  },
  {
    label: "text",
    detail: "text: string | function",
    documentation: 'Text content of the element. Can be a static string or a function returning a string.\n\n```js\ntext: "Hello world"\ntext: ({ props }) => props.label\ntext: ({ state }) => `Count: ${state.count}`\n```',
    snippet: "text: '${1:}'",
    kind: "property"
  },
  {
    label: "html",
    detail: "html: string | function",
    documentation: 'Raw HTML content. Sets innerHTML. Use sparingly \u2014 XSS risk with user data.\n\n```js\nhtml: ({ props }) => props.richContent\nhtml: "<strong>Bold</strong>"\n```',
    snippet: "html: ${1:},",
    kind: "property"
  },
  {
    label: "attr",
    detail: "attr: object",
    documentation: 'HTML attributes to set on the DOM node. Values can be static or functions. Returning `null` removes the attribute.\n\n```js\nattr: {\n  placeholder: ({ props }) => props.placeholder,\n  disabled: ({ props }) => props.disabled || null,\n  role: "button",\n  "aria-label": ({ props }) => props.label\n}\n```',
    snippet: "attr: {\n  ${1:placeholder}: ${2:},\n},",
    kind: "property"
  },
  {
    label: "state",
    detail: "state: object | string",
    documentation: 'Local reactive state for the element. Use `state.update()` to update and trigger re-renders. String value inherits from ancestor state.\n\n```js\nstate: { open: false, count: 0, data: null }\nstate: "~/user"  // inherit from root state key\n```',
    snippet: "state: { ${1:key}: ${2:value} },",
    kind: "property"
  },
  {
    label: "if",
    detail: "if: function | boolean",
    documentation: "Conditional rendering. Element only renders when this returns truthy.\n\n```js\nif: ({ state }) => state.isVisible\nif: ({ props }) => Boolean(props.show)\nif: (el, state) => state.isAuthenticated\n```",
    snippet: "if: ({ ${1:state} }) => ${2:condition},",
    kind: "property"
  },
  {
    label: "define",
    detail: "define: object",
    documentation: 'Register custom property transformers. When a matching key appears on an element, this handler runs.\n\n```js\ndefine: {\n  isActive: (param, el, state) => {\n    if (param) el.node.classList.add("active")\n    else el.node.classList.remove("active")\n  }\n}\n```',
    snippet: "define: {\n  ${1:propName}: (param, el, state) => {\n    ${2:}\n  }\n},",
    kind: "property"
  },
  {
    label: "style",
    detail: "style: object",
    documentation: 'Inline styles or emotion CSS-in-JS with nested selectors. Escape hatch for complex selectors.\n\n```js\nstyle: {\n  "&:hover [dropdown]": {\n    opacity: 1,\n    transform: "translate3d(0,0,0)"\n  }\n}\n```',
    snippet: "style: {\n  ${1:property}: ${2:value},\n},",
    kind: "property"
  },
  {
    label: "data",
    detail: "data: object",
    documentation: "Non-reactive data store. Store mutable references (chart instances, timers) that should NOT trigger re-renders.\n\n```js\ndata: {\n  chartInstance: null,\n  timer: null\n}\n```",
    snippet: "data: {\n  ${1:key}: ${2:null},\n},",
    kind: "property"
  },
  {
    label: "scope",
    detail: "scope: string | object",
    documentation: 'Assigns a scope reference. `"state"` makes `element.scope = element.state`. `"props"` makes `element.scope = element.props`.\n\n```js\nscope: "state"\nscope: "props"\nscope: { theme: "dark" }\n```',
    snippet: "scope: '${1:state}',",
    kind: "property"
  },
  {
    label: "on",
    detail: "on: object (v2 compat)",
    documentation: "**v2 style \u2014 prefer top-level `onX` in v3.** Event handlers object.\n\n```js\n// v2\non: { click: fn, render: fn }\n\n// v3 preferred\nonClick: fn\nonRender: fn\n```",
    snippet: "on: {\n  ${1:event}: (event, el, state) => {\n    ${2:}\n  }\n},",
    kind: "property"
  },
  {
    label: "props",
    detail: "props: object",
    documentation: 'Explicit props object. In v3, props are flattened at element root. Use `props:` only for passing props when instantiating a component.\n\n```js\n// Passing props to an instance\nButton: {\n  props: { text: "Submit", disabled: false }\n}\n```',
    snippet: "props: {\n  ${1:key}: ${2:value},\n},",
    kind: "property"
  },
  {
    label: "childProps",
    detail: "childProps: object",
    documentation: 'Props applied to all direct child elements.\n\n```js\nchildProps: { padding: "A", theme: "field" }\n```',
    snippet: "childProps: {\n  ${1:key}: ${2:value},\n},",
    kind: "property"
  },
  {
    label: "childrenAs",
    detail: "childrenAs: string",
    documentation: 'Rename the `children` key to a custom name for semantic clarity.\n\n```js\nchildrenAs: "items"\nchildrenAs: "slides"\n```',
    snippet: "childrenAs: '${1:items}',",
    kind: "property"
  },
  {
    label: "children",
    detail: "children: array | function",
    documentation: 'Dynamic child list. Each item becomes a child element using `childExtends` as template.\n\n```js\nchildren: ({ props }) => props.items\nchildren: [{ text: "Item 1" }, { text: "Item 2" }]\n```',
    snippet: "children: ${1:[]},",
    kind: "property"
  },
  {
    label: "childExtends",
    detail: "childExtends: string | object | array",
    documentation: 'Apply an extend to all direct child elements. Accepts string, object, or array of extends.\n\n```js\nchildExtends: "Button"\nchildExtends: ["IconText", "Focusable"]\nchildExtends: { padding: "Z2 C", round: "0" }\n```',
    snippet: "childExtends: '${1:ComponentName}',",
    kind: "property"
  },
  {
    label: "childExtendsRecursive",
    detail: "childExtendsRecursive: string | object | array",
    documentation: 'Apply an extend to ALL descendants recursively. Accepts string, object, or array of extends.\n\n```js\nchildExtendsRecursive: "Button"\nchildExtendsRecursive: { fontSize: "A" }\n```',
    snippet: "childExtendsRecursive: '${1:ComponentName}',",
    kind: "property"
  },
  {
    label: "content",
    detail: "content: function | object",
    documentation: "Single dynamic child element. Rendered as the element's sole child.\n\n```js\ncontent: ({ props }) => props.page\ncontent: ({ state }) => state.currentView\n```",
    snippet: "content: ({ ${1:props} }) => ${2:},",
    kind: "property"
  },
  {
    label: "classlist",
    detail: "classlist: object | array",
    documentation: "CSS class management object. Keys are class names, values are booleans.\n\n```js\nclasslist: { active: true, hidden: false }\n```",
    snippet: "classlist: { ${1:className}: ${2:true} },",
    kind: "property"
  },
  {
    label: "variables",
    detail: "variables: object",
    documentation: 'CSS custom properties (design tokens) scoped to this element.\n\n```js\nvariables: { color: "blue", spacing: "16px" }\n```',
    snippet: "variables: { ${1:name}: ${2:value} },",
    kind: "property"
  },
  {
    label: "theme",
    detail: "theme: string",
    documentation: 'Apply a design system theme token to this element.\n\n```js\ntheme: "dialog"\ntheme: "field"\ntheme: "primary"\ntheme: "quaternary .child"\n```',
    snippet: "theme: '${1:dialog}',",
    kind: "property"
  },
  {
    label: "deps",
    detail: "deps: object",
    documentation: "Dependencies injection for the element.",
    snippet: "deps: { ${1:} },",
    kind: "property"
  },
  {
    label: "key",
    detail: "key: string",
    documentation: "Explicit element key (overrides the object property name as key).",
    snippet: "key: '${1:}',",
    kind: "property"
  },
  {
    label: "query",
    detail: "query: string",
    documentation: "CSS query selector for targeting DOM elements.",
    snippet: "query: '${1:}',",
    kind: "property"
  }
];
var DOMQL_PSEUDO_SELECTORS = [
  {
    label: ":hover",
    detail: ":hover: object",
    documentation: 'Styles applied on hover.\n\n```js\n":hover": { opacity: 0.9, transform: "scale(1.015)" }\n```',
    snippet: "':hover': { ${1:opacity}: ${2:0.9} },",
    kind: "property"
  },
  {
    label: ":active",
    detail: ":active: object",
    documentation: 'Styles applied when active/pressed.\n\n```js\n":active": { opacity: 1 }\n```',
    snippet: "':active': { ${1:opacity}: ${2:1} },",
    kind: "property"
  },
  {
    label: ":focus",
    detail: ":focus: object",
    documentation: "Styles applied when focused.",
    snippet: "':focus': { ${1:outline}: ${2:'none'} },",
    kind: "property"
  },
  {
    label: ":focus-visible",
    detail: ":focus-visible: object",
    documentation: "Styles applied when focused via keyboard.",
    snippet: "':focus-visible': { ${1:outline}: ${2:'solid, X, blue .3'} },",
    kind: "property"
  },
  {
    label: ":disabled",
    detail: ":disabled: object",
    documentation: "Styles applied when disabled.",
    snippet: "':disabled': { ${1:opacity}: ${2:0.5} },",
    kind: "property"
  },
  {
    label: ":not(:first-child)",
    detail: ":not(:first-child): object",
    documentation: "Styles for all children except the first.",
    snippet: "':not(:first-child)': { ${1:borderTop}: ${2:'solid, 1px, currentColor'} },",
    kind: "property"
  },
  {
    label: ":first-child",
    detail: ":first-child: object",
    documentation: "Styles for the first child element.",
    snippet: "':first-child': { ${1:} },",
    kind: "property"
  },
  {
    label: ":last-child",
    detail: ":last-child: object",
    documentation: "Styles for the last child element.",
    snippet: "':last-child': { ${1:} },",
    kind: "property"
  },
  {
    label: ":before",
    detail: ":before: object",
    documentation: 'CSS ::before pseudo-element styles.\n\n```js\n":before": { content: "\'\'", display: "block" }\n```',
    snippet: "':before': { ${1:content}: ${2:'\\'\\''}  },",
    kind: "property"
  },
  {
    label: ":after",
    detail: ":after: object",
    documentation: "CSS ::after pseudo-element styles.",
    snippet: "':after': { ${1:content}: ${2:'\\'\\''}  },",
    kind: "property"
  }
];
var DOMQL_MEDIA_QUERIES = [
  {
    label: "@dark",
    detail: "@dark: object",
    documentation: 'Styles applied in dark color scheme.\n\n```js\n"@dark": { background: "gray1", color: "gray12" }\n```',
    snippet: "'@dark': { ${1:} },",
    kind: "property"
  },
  {
    label: "@light",
    detail: "@light: object",
    documentation: "Styles applied in light color scheme.",
    snippet: "'@light': { ${1:} },",
    kind: "property"
  },
  {
    label: "@mobile",
    detail: "@mobile: object",
    documentation: "Styles applied on mobile breakpoint.",
    snippet: "'@mobile': { ${1:} },",
    kind: "property"
  },
  {
    label: "@tablet",
    detail: "@tablet: object",
    documentation: "Styles applied on tablet breakpoint.",
    snippet: "'@tablet': { ${1:} },",
    kind: "property"
  },
  {
    label: "@desktop",
    detail: "@desktop: object",
    documentation: "Styles applied on desktop breakpoint.",
    snippet: "'@desktop': { ${1:} },",
    kind: "property"
  }
];
var DOMQL_ALL_KEYS = [...DOMQL_REGISTRY_KEYS, ...DOMQL_PSEUDO_SELECTORS, ...DOMQL_MEDIA_QUERIES];

// src/data/events.ts
var DOM_EVENTS = [
  {
    label: "onClick",
    detail: "onClick: (event, el, state) => void",
    documentation: "Mouse click event handler.\n\n```js\nonClick: (event, el, state) => {\n  event.preventDefault()\n  state.update({ active: true })\n}\n```",
    snippet: "onClick: (event, el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: false
  },
  {
    label: "onDblclick",
    detail: "onDblclick: (event, el, state) => void",
    documentation: "Double-click event handler.",
    snippet: "onDblclick: (event, el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: false
  },
  {
    label: "onChange",
    detail: "onChange: (event, el, state) => void",
    documentation: "Input change event handler. Fires when value commits (on blur for text inputs, immediately for checkboxes/selects).\n\n```js\nonChange: (event, el, state) => {\n  state.update({ value: event.target.value })\n}\n```",
    snippet: "onChange: (event, el, state) => {\n  state.update({ ${1:value}: event.target.value })\n},",
    isDomqlLifecycle: false
  },
  {
    label: "onInput",
    detail: "onInput: (event, el, state) => void",
    documentation: "Input event handler. Fires on every keystroke.\n\n```js\nonInput: (event, el, state) => {\n  state.update({ value: event.target.value })\n}\n```",
    snippet: "onInput: (event, el, state) => {\n  state.update({ ${1:value}: event.target.value })\n},",
    isDomqlLifecycle: false
  },
  {
    label: "onSubmit",
    detail: "onSubmit: (event, el, state) => void",
    documentation: 'Form submit event handler.\n\n```js\nonSubmit: (event, el, state) => {\n  event.preventDefault()\n  el.call("submitForm", state)\n}\n```',
    snippet: "onSubmit: (event, el, state) => {\n  event.preventDefault()\n  ${1:}\n},",
    isDomqlLifecycle: false
  },
  {
    label: "onKeydown",
    detail: "onKeydown: (event, el, state) => void",
    documentation: 'Keydown event handler.\n\n```js\nonKeydown: (event, el, state) => {\n  if (event.key === "Enter") el.call("submit")\n  if (event.key === "Escape") state.update({ open: false })\n}\n```',
    snippet: 'onKeydown: (event, el, state) => {\n  if (event.key === "${1:Enter}") ${2:}\n},',
    isDomqlLifecycle: false
  },
  {
    label: "onKeyup",
    detail: "onKeyup: (event, el, state) => void",
    documentation: "Keyup event handler.",
    snippet: "onKeyup: (event, el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: false
  },
  {
    label: "onKeypress",
    detail: "onKeypress: (event, el, state) => void",
    documentation: "Keypress event handler (deprecated, prefer onKeydown).",
    snippet: "onKeypress: (event, el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: false
  },
  {
    label: "onFocus",
    detail: "onFocus: (event, el, state) => void",
    documentation: "Focus event handler.",
    snippet: "onFocus: (event, el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: false
  },
  {
    label: "onBlur",
    detail: "onBlur: (event, el, state) => void",
    documentation: "Blur (focus lost) event handler.",
    snippet: "onBlur: (event, el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: false
  },
  {
    label: "onFocusin",
    detail: "onFocusin: (event, el, state) => void",
    documentation: "Focusin event (bubbles, unlike focus).",
    snippet: "onFocusin: (event, el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: false
  },
  {
    label: "onFocusout",
    detail: "onFocusout: (event, el, state) => void",
    documentation: "Focusout event (bubbles, unlike blur).",
    snippet: "onFocusout: (event, el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: false
  },
  {
    label: "onMouseover",
    detail: "onMouseover: (event, el, state) => void",
    documentation: "Mouseover event handler (fires on children too).",
    snippet: "onMouseover: (event, el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: false
  },
  {
    label: "onMouseout",
    detail: "onMouseout: (event, el, state) => void",
    documentation: "Mouseout event handler.",
    snippet: "onMouseout: (event, el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: false
  },
  {
    label: "onMouseenter",
    detail: "onMouseenter: (event, el, state) => void",
    documentation: "Mouseenter event (does not bubble).",
    snippet: "onMouseenter: (event, el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: false
  },
  {
    label: "onMouseleave",
    detail: "onMouseleave: (event, el, state) => void",
    documentation: "Mouseleave event (does not bubble).",
    snippet: "onMouseleave: (event, el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: false
  },
  {
    label: "onMousedown",
    detail: "onMousedown: (event, el, state) => void",
    documentation: "Mousedown event handler.",
    snippet: "onMousedown: (event, el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: false
  },
  {
    label: "onMouseup",
    detail: "onMouseup: (event, el, state) => void",
    documentation: "Mouseup event handler.",
    snippet: "onMouseup: (event, el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: false
  },
  {
    label: "onWheel",
    detail: "onWheel: (event, el, state) => void",
    documentation: "Wheel/scroll event handler.",
    snippet: "onWheel: (event, el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: false
  },
  {
    label: "onScroll",
    detail: "onScroll: (event, el, state) => void",
    documentation: "Scroll event handler.",
    snippet: "onScroll: (event, el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: false
  },
  {
    label: "onContextmenu",
    detail: "onContextmenu: (event, el, state) => void",
    documentation: "Context menu (right-click) event handler.",
    snippet: "onContextmenu: (event, el, state) => {\n  event.preventDefault()\n  ${1:}\n},",
    isDomqlLifecycle: false
  },
  {
    label: "onDrag",
    detail: "onDrag: (event, el, state) => void",
    documentation: "Drag event handler.",
    snippet: "onDrag: (event, el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: false
  },
  {
    label: "onDragstart",
    detail: "onDragstart: (event, el, state) => void",
    documentation: "Dragstart event handler.",
    snippet: "onDragstart: (event, el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: false
  },
  {
    label: "onDragend",
    detail: "onDragend: (event, el, state) => void",
    documentation: "Dragend event handler.",
    snippet: "onDragend: (event, el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: false
  },
  {
    label: "onDragover",
    detail: "onDragover: (event, el, state) => void",
    documentation: "Dragover event (fires on drop target).",
    snippet: "onDragover: (event, el, state) => {\n  event.preventDefault()\n  ${1:}\n},",
    isDomqlLifecycle: false
  },
  {
    label: "onDragenter",
    detail: "onDragenter: (event, el, state) => void",
    documentation: "Dragenter event (fires when dragged element enters drop target).",
    snippet: "onDragenter: (event, el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: false
  },
  {
    label: "onDragleave",
    detail: "onDragleave: (event, el, state) => void",
    documentation: "Dragleave event.",
    snippet: "onDragleave: (event, el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: false
  },
  {
    label: "onDrop",
    detail: "onDrop: (event, el, state) => void",
    documentation: "Drop event handler.",
    snippet: "onDrop: (event, el, state) => {\n  event.preventDefault()\n  ${1:}\n},",
    isDomqlLifecycle: false
  },
  {
    label: "onTouchstart",
    detail: "onTouchstart: (event, el, state) => void",
    documentation: "Touch start event handler.",
    snippet: "onTouchstart: (event, el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: false
  },
  {
    label: "onTouchend",
    detail: "onTouchend: (event, el, state) => void",
    documentation: "Touch end event handler.",
    snippet: "onTouchend: (event, el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: false
  },
  {
    label: "onTouchmove",
    detail: "onTouchmove: (event, el, state) => void",
    documentation: "Touch move event handler.",
    snippet: "onTouchmove: (event, el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: false
  },
  {
    label: "onResize",
    detail: "onResize: (event, el, state) => void",
    documentation: "Resize event handler.",
    snippet: "onResize: (event, el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: false
  },
  {
    label: "onPointerdown",
    detail: "onPointerdown: (event, el, state) => void",
    documentation: "Pointer down event handler (touch + mouse unified).",
    snippet: "onPointerdown: (event, el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: false
  },
  {
    label: "onPointerup",
    detail: "onPointerup: (event, el, state) => void",
    documentation: "Pointer up event handler.",
    snippet: "onPointerup: (event, el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: false
  },
  {
    label: "onPointermove",
    detail: "onPointermove: (event, el, state) => void",
    documentation: "Pointer move event handler.",
    snippet: "onPointermove: (event, el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: false
  }
];
var DOMQL_LIFECYCLE_EVENTS = [
  {
    label: "onRender",
    detail: "onRender: (el, state) => void",
    documentation: 'Fires after the element is rendered into the DOM. Ideal for setup, data fetching, or third-party library initialization.\n\n```js\nonRender: async (el, state) => {\n  const data = await el.call("fetchData", el.props.id)\n  state.update({ data, loading: false })\n}\n```',
    snippet: "onRender: async (el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: true
  },
  {
    label: "onInit",
    detail: "onInit: (el, state) => void",
    documentation: "Fires before the element renders. Used for early setup before DOM creation.",
    snippet: "onInit: (el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: true
  },
  {
    label: "onUpdate",
    detail: "onUpdate: (el, state) => void",
    documentation: "Fires after any element update (props or state). Receives the updated element.",
    snippet: "onUpdate: (el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: true
  },
  {
    label: "onStateUpdate",
    detail: "onStateUpdate: (el, state) => void",
    documentation: "Fires specifically after state updates. More focused than `onUpdate`.\n\n```js\nonStateUpdate: (el, state) => {\n  if (state.active) el.node.focus()\n}\n```",
    snippet: "onStateUpdate: (el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: true
  },
  {
    label: "onCreate",
    detail: "onCreate: (el, state) => void",
    documentation: "Fires when the element is fully created (after children are created).",
    snippet: "onCreate: (el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: true
  },
  {
    label: "onDone",
    detail: "onDone: (el, state) => void",
    documentation: "Fires when the element creation cycle is complete.",
    snippet: "onDone: (el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: true
  },
  {
    label: "onComplete",
    detail: "onComplete: (el, state) => void",
    documentation: "Fires when the full element tree is complete.",
    snippet: "onComplete: (el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: true
  },
  {
    label: "onStateInit",
    detail: "onStateInit: (el, state) => void",
    documentation: "Fires when state is initialized for the first time.",
    snippet: "onStateInit: (el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: true
  },
  {
    label: "onStateCreated",
    detail: "onStateCreated: (el, state) => void",
    documentation: "Fires right after state object creation.",
    snippet: "onStateCreated: (el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: true
  },
  {
    label: "onBeforeStateUpdate",
    detail: "onBeforeStateUpdate: (el, state) => void",
    documentation: "Fires before a state update is applied.",
    snippet: "onBeforeStateUpdate: (el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: true
  },
  {
    label: "onBeforeUpdate",
    detail: "onBeforeUpdate: (el, state) => void",
    documentation: "Fires before an element update.",
    snippet: "onBeforeUpdate: (el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: true
  },
  {
    label: "onBeforeClassAssign",
    detail: "onBeforeClassAssign: (el, state) => void",
    documentation: "Fires before CSS classes are assigned to the element.",
    snippet: "onBeforeClassAssign: (el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: true
  },
  {
    label: "onAttachNode",
    detail: "onAttachNode: (el, state) => void",
    documentation: "Fires when the DOM node is attached to parent.",
    snippet: "onAttachNode: (el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: true
  },
  {
    label: "onFrame",
    detail: "onFrame: (el, state) => void",
    documentation: "Fires on every animation frame. Element must have animation frame enabled.\n\n```js\nonFrame: (el) => {\n  el.setNodeStyles({ transform: `translateX(${el.data.x}px)` })\n}\n```",
    snippet: "onFrame: (el, state) => {\n  ${1:}\n},",
    isDomqlLifecycle: true
  }
];
var ALL_EVENTS = [...DOM_EVENTS, ...DOMQL_LIFECYCLE_EVENTS];

// src/data/cssProperties.ts
var DESIGN_SYSTEM_PROPS = [
  { label: "flow", detail: "Shorthand for flexDirection", documentation: 'Shorthand for `flexDirection`. Common values: `"column"`, `"row"`, `"y"`, `"x"`, `"column-reverse"`\n\n```js\nflow: "column"\nflow: "x"  // alias for "row"\n```' },
  { label: "align", detail: "Shorthand for alignItems and justifyContent", documentation: 'Shorthand for united `alignItems` and `justifyContent`.\n\n```js\nalign: "center center"\nalign: "flex-start space-between"\n```' },
  { label: "flexAlign", detail: "Shorthand for alignItems and justifyContent", documentation: 'Shorthand for united `alignItems` and `justifyContent`.\n\n```js\nflexAlign: "flex-start center"\n```' },
  { label: "round", detail: "Rounding the corners of the shape", documentation: 'Rounding the corners of the shape. Accepts spacing design tokens or CSS values.\n\n```js\nround: "C2"\nround: "100%"\n```' },
  { label: "boxSize", detail: "Range of width and height", documentation: 'Range of width and height. Accepts spacing design tokens.\n\n```js\nboxSize: "C1 E"  // width: C1, height: E\nboxSize: "D"     // both width and height\n```' },
  { label: "widthRange", detail: "Range of min-width and max-width", documentation: 'Range of min-width and max-width.\n\n```js\nwidthRange: "A1 B2"  // minWidth: A1, maxWidth: B2\nwidthRange: "H2 50%"\n```' },
  { label: "heightRange", detail: "Range of min-height and max-height", documentation: 'Range of min-height and max-height.\n\n```js\nheightRange: "A1 B2"  // minHeight: A1, maxHeight: B2\n```' },
  { label: "theme", detail: "Reference a theme from Themes configuration", documentation: 'Reference the value from the Themes configuration.\n\n```js\ntheme: "primary"\ntheme: "primary .active"\ntheme: { color: "white", "@dark": { color: "blue" } }\n```' },
  { label: "columns", detail: "Shorthand for gridTemplateColumns", documentation: "Shorthand for `gridTemplateColumns`." },
  { label: "rows", detail: "Shorthand for gridTemplateRows", documentation: "Shorthand for `gridTemplateRows`." },
  { label: "wrap", detail: "Shorthand for flexWrap", documentation: 'Shorthand for `flexWrap`. E.g. `"wrap"`, `"nowrap"`' },
  { label: "inset", detail: "CSS inset shorthand (top, right, bottom, left)", documentation: "CSS inset shorthand (top, right, bottom, left)." },
  { label: "shape", detail: "Name of the shape from Shapes configuration", documentation: 'Name of the shape from Shapes configuration.\n\n```js\nshape: "tag"\nshape: "tooltip top"\n```' },
  { label: "shapeModifier", detail: "Shape direction and position attributes", documentation: 'If the shape is either tooltip or tag, sets additional attributes like direction or position.\n\n```js\nshapeModifier: { position: "block center", direction: "north west" }\n```' },
  { label: "shadow", detail: "Shadow depth with color and offset tokens", documentation: 'Level of the shadow that adds depth to the element.\n\n```js\nshadow: "black A A C"  // color x y depth\n```' }
];
var STANDARD_CSS_PROPS = [
  // Layout
  { label: "display", detail: "CSS display mode" },
  { label: "position", detail: "CSS positioning method" },
  { label: "top", detail: "Top offset position" },
  { label: "right", detail: "Right offset position" },
  { label: "bottom", detail: "Bottom offset position" },
  { label: "left", detail: "Left offset position" },
  { label: "zIndex", detail: "Stack order of the element" },
  { label: "overflow", detail: "Content overflow behavior" },
  { label: "overflowX", detail: "Horizontal overflow behavior" },
  { label: "overflowY", detail: "Vertical overflow behavior" },
  { label: "visibility", detail: "Element visibility" },
  // Flexbox
  { label: "flexDirection", detail: "CSS flexDirection property" },
  { label: "flexFlow", detail: "CSS flexFlow property" },
  { label: "flexWrap", detail: "CSS flexWrap property" },
  { label: "flexGrow", detail: "Flex grow factor" },
  { label: "flexShrink", detail: "Flex shrink factor" },
  { label: "flexBasis", detail: "Initial main size of flex item" },
  { label: "flex", detail: "Flex shorthand (grow shrink basis)" },
  { label: "alignItems", detail: "CSS alignItems property" },
  { label: "alignContent", detail: "CSS alignContent property" },
  { label: "alignSelf", detail: "CSS alignSelf property" },
  { label: "justifyContent", detail: "CSS justifyContent property" },
  { label: "justifyItems", detail: "CSS justifyItems property" },
  { label: "justifySelf", detail: "CSS justifySelf property" },
  { label: "gap", detail: "gap: string", documentation: 'The space between children inside the element. Accepts spacing design tokens.\n\n```js\ngap: "A2"\ngap: "B C"  // rowGap columnGap\n```' },
  { label: "rowGap", detail: "Space between rows" },
  { label: "columnGap", detail: "Space between columns" },
  { label: "order", detail: "Flex/grid item order" },
  // Grid
  { label: "gridTemplateColumns", detail: "Grid column track sizes" },
  { label: "gridTemplateRows", detail: "Grid row track sizes" },
  { label: "gridTemplateAreas", detail: "Named grid template areas" },
  { label: "gridColumn", detail: "Grid column placement" },
  { label: "gridRow", detail: "Grid row placement" },
  { label: "gridArea", detail: "Grid area placement" },
  { label: "gridAutoFlow", detail: "Auto-placement algorithm" },
  { label: "gridAutoColumns", detail: "Auto-generated column size" },
  { label: "gridAutoRows", detail: "Auto-generated row size" },
  // Sizing
  { label: "width", detail: "Width of the element", documentation: 'Width of the element. Accepts spacing design tokens or CSS values.\n\n```js\nwidth: "F1"\nwidth: "100%"\n```' },
  { label: "height", detail: "Height of the element", documentation: 'Height of the element. Accepts spacing design tokens or CSS values.\n\n```js\nheight: "F1"\n```' },
  { label: "minWidth", detail: "Min width of the box", documentation: "Min width of the box. Accepts spacing design tokens or CSS values." },
  { label: "maxWidth", detail: "Max width of the box", documentation: "Max width of the box. Accepts spacing design tokens or CSS values." },
  { label: "minHeight", detail: "Min height of the box", documentation: "Min height of the box. Accepts spacing design tokens or CSS values." },
  { label: "maxHeight", detail: "Max height of the box", documentation: "Max height of the box. Accepts spacing design tokens or CSS values." },
  { label: "aspectRatio", detail: "Aspect ratio of the box (1/3, 3/7\u2026)", documentation: 'Aspect ratio of the box.\n\n```js\naspectRatio: "1 / 2"\n```' },
  // Spacing
  { label: "padding", detail: "Space inside the element", documentation: 'Space inside the element. Accepts spacing design tokens or CSS values.\n\n```js\npadding: "A1 C2"\npadding: "Z2 C"\n```' },
  { label: "paddingTop", detail: "Top inner space" },
  { label: "paddingRight", detail: "Right inner space" },
  { label: "paddingBottom", detail: "Bottom inner space" },
  { label: "paddingLeft", detail: "Left inner space" },
  { label: "paddingInline", detail: "Inline (horizontal) inner space" },
  { label: "paddingBlock", detail: "Block (vertical) inner space" },
  { label: "margin", detail: "Outer space of the element", documentation: 'Outer space of the element. Accepts spacing design tokens or CSS values.\n\n```js\nmargin: "0 -B2"\n```' },
  { label: "marginTop", detail: "Top outer space" },
  { label: "marginRight", detail: "Right outer space" },
  { label: "marginBottom", detail: "Bottom outer space" },
  { label: "marginLeft", detail: "Left outer space" },
  { label: "marginInline", detail: "Inline (horizontal) outer space" },
  { label: "marginBlock", detail: "Block (vertical) outer space" },
  // Background
  { label: "background", detail: "background: string", documentation: 'Setting the specific background color matching with one from the Colors page. Accepts color tokens with modifiers.\n\n```js\nbackground: "gray"\nbackground: "blue.5"  // with opacity\n```' },
  { label: "backgroundColor", detail: "Background color of the element" },
  { label: "backgroundImage", detail: "Background image URL or gradient" },
  { label: "backgroundSize", detail: "Background image sizing" },
  { label: "backgroundPosition", detail: "Background image position" },
  { label: "backgroundRepeat", detail: "Background image repeat behavior" },
  { label: "backgroundClip", detail: "Background painting area" },
  // Border
  { label: "border", detail: "border: string", documentation: 'Border with design system color tokens. Order: color, size, style.\n\n```js\nborder: "blue 1px solid"\nborderTop: "1px solid gray.5"\n```' },
  { label: "borderTop", detail: "Top border with color tokens" },
  { label: "borderRight", detail: "Right border with color tokens" },
  { label: "borderBottom", detail: "Bottom border with color tokens" },
  { label: "borderLeft", detail: "Left border with color tokens" },
  { label: "borderWidth", detail: "Border width" },
  { label: "borderStyle", detail: "Border line style" },
  { label: "borderColor", detail: "Border color from design system" },
  { label: "borderRadius", detail: "borderRadius: string", documentation: 'Rounding the corners of the shape. Accepts spacing design tokens.\n\n```js\nborderRadius: "C2"\n```' },
  { label: "borderTopLeftRadius", detail: "Top-left corner radius" },
  { label: "borderTopRightRadius", detail: "Top-right corner radius" },
  { label: "borderBottomLeftRadius", detail: "Bottom-left corner radius" },
  { label: "borderBottomRightRadius", detail: "Bottom-right corner radius" },
  { label: "outline", detail: "Outline around the element" },
  { label: "outlineOffset", detail: "Space between element and outline" },
  // Typography
  { label: "color", detail: "Text color from design system", documentation: 'Setting the specific text color matching with one from the Colors page. Accepts color tokens with modifiers.\n\n```js\ncolor: "title"\ncolor: "blue.5"  // with opacity\n```' },
  { label: "fontSize", detail: "Typography sequence or CSS value", documentation: 'Using typography sequence or default CSS values. Accepts typography design tokens.\n\n```js\nfontSize: "B"\nfontSize: "Z1"\n```' },
  { label: "fontWeight", detail: "Font weight from configuration", documentation: 'CSS font-weight value. Finds the closest weight in configuration or sets variable font value.\n\n```js\nfontWeight: "500"\n```' },
  { label: "fontFamily", detail: "Font family name" },
  { label: "fontStyle", detail: "Font style (normal, italic)" },
  { label: "lineHeight", detail: "Line height of text" },
  { label: "letterSpacing", detail: "Space between characters" },
  { label: "textAlign", detail: "Text horizontal alignment" },
  { label: "textDecoration", detail: "Text decoration (underline, etc.)" },
  { label: "textTransform", detail: "Text case transformation" },
  { label: "textOverflow", detail: "Overflowed text behavior" },
  { label: "whiteSpace", detail: "White space handling" },
  { label: "wordBreak", detail: "Word breaking rules" },
  { label: "wordWrap", detail: "Word wrapping behavior" },
  // Effects
  { label: "opacity", detail: "Element transparency (0-1)" },
  { label: "boxShadow", detail: "CSS box shadow" },
  { label: "filter", detail: "Visual filter effects (blur, brightness)" },
  { label: "backdropFilter", detail: "Backdrop filter effects" },
  { label: "transform", detail: "CSS transform (translate, rotate, scale)" },
  { label: "transformOrigin", detail: "Transform origin point" },
  { label: "transition", detail: "transition: string", documentation: 'Transition using timing design tokens.\n\n```js\ntransition: "A defaultBezier"\n```' },
  { label: "transitionProperty", detail: "Properties to transition" },
  { label: "transitionDuration", detail: "transitionDuration: string", documentation: "Duration value from Timing sequence, or CSS value." },
  { label: "transitionTimingFunction", detail: "Transition easing function" },
  { label: "transitionDelay", detail: "Delay before transition starts" },
  { label: "animation", detail: "animation: string", documentation: 'Bundle animation properties. Accepts animation name and timing tokens.\n\n```js\nanimation: "fadeIn"\nanimation: "fadeIn C1 my-custom-bezier"\n```' },
  { label: "animationName", detail: "animationName: string", documentation: "Name of the animation defined in design system." },
  { label: "animationDuration", detail: "animationDuration: string", documentation: 'Duration value from Timing sequence, or CSS value.\n\n```js\nanimationDuration: "C"\n```' },
  { label: "animationDelay", detail: "animationDelay: string", documentation: "Delay value from Timing sequence, or CSS value." },
  { label: "animationTimingFunction", detail: "animationTimingFunction: string", documentation: "A value from Timing sequence, or CSS animation-timing-function property." },
  { label: "animationFillMode", detail: "animationFillMode: string" },
  { label: "animationPlayState", detail: "animationPlayState: string" },
  { label: "animationIterationCount", detail: "animationIterationCount: string" },
  { label: "animationDirection", detail: "animationDirection: string" },
  // Cursor / pointer
  { label: "cursor", detail: "Mouse cursor appearance" },
  { label: "pointerEvents", detail: "Pointer event targeting" },
  { label: "userSelect", detail: "Text selection behavior" },
  // Misc
  { label: "objectFit", detail: "Replaced element fitting" },
  { label: "objectPosition", detail: "Replaced element position" },
  { label: "resize", detail: "Element resize behavior" },
  { label: "content", detail: "Generated content for pseudo-elements" },
  { label: "listStyle", detail: "List marker style" },
  { label: "tableLayout", detail: "Table layout algorithm" },
  { label: "verticalAlign", detail: "Vertical alignment" },
  { label: "appearance", detail: "Native UI appearance" },
  { label: "boxSizing", detail: "Box model sizing method" },
  { label: "isolation", detail: "Stacking context isolation" },
  { label: "mixBlendMode", detail: "Color blending mode" },
  { label: "willChange", detail: "Performance optimization hint" },
  { label: "clipPath", detail: "Clipping region shape" },
  { label: "fill", detail: "SVG fill color" },
  { label: "stroke", detail: "SVG stroke color" },
  { label: "strokeWidth", detail: "SVG stroke width" }
];
var ALL_CSS_PROPS = [...DESIGN_SYSTEM_PROPS, ...STANDARD_CSS_PROPS];

// src/data/components.ts
var BUILT_IN_ATOMS = [
  {
    label: "Box",
    detail: "Box: object \u2192 <div>",
    documentation: "Generic container element. Maps to `<div>`.\n\nCommon props: `padding`, `margin`, `background`, `border`, `borderRadius`, `width`, `height`, `overflow`, `position`",
    snippet: 'Box: {\n  ${1:padding}: "${2:A}",\n},'
  },
  {
    label: "Flex",
    detail: "Flex: object \u2192 <div> (flexbox)",
    documentation: 'Flexbox layout container.\n\nCommon props: `flow`, `align`, `gap`, `wrap`, `alignItems`, `justifyContent`\n\n```js\nFlex: {\n  flow: "y",\n  align: "center space-between",\n  gap: "B"\n}\n```',
    snippet: 'Flex: {\n  flow: "${1:y}",\n  gap: "${2:B}",\n},'
  },
  {
    label: "Grid",
    detail: "Grid: object \u2192 <div> (CSS grid)",
    documentation: 'CSS Grid layout container.\n\nCommon props: `columns`, `rows`, `gap`\n\n```js\nGrid: {\n  columns: "repeat(3, 1fr)",\n  gap: "A"\n}\n```',
    snippet: 'Grid: {\n  columns: "${1:repeat(3, 1fr)}",\n  gap: "${2:A}",\n},'
  },
  {
    label: "Text",
    detail: "Text: object \u2192 <span>",
    documentation: 'Inline text element.\n\nCommon props: `text`, `color`, `fontSize`, `fontWeight`, `lineHeight`\n\n```js\nText: { text: "Hello", fontSize: "B", color: "title" }\n```',
    snippet: 'Text: {\n  text: "${1:}",\n},'
  },
  {
    label: "Button",
    detail: "Button: object \u2192 <button>",
    documentation: 'Actionable button element.\n\nCommon props: `text`, `icon`, `type`, `disabled`, `theme`, `padding`, `round`, `onClick`\n\n```js\nButton: { text: "Save", theme: "primary", onClick: (ev, el) => {} }\n```',
    snippet: 'Button: {\n  text: "${1:Label}",\n  onClick: (event, el, state) => {\n    ${2:}\n  },\n},'
  },
  {
    label: "Link",
    detail: "Link: object \u2192 <a>",
    documentation: 'Anchor/link element.\n\nCommon props: `text`, `href`, `target`, `rel`, `color`, `textDecoration`\n\n```js\nLink: { text: "Read more", href: "/article" }\n```',
    snippet: 'Link: {\n  text: "${1:}",\n  href: "${2:/}",\n},'
  },
  {
    label: "Input",
    detail: "Input: object \u2192 <input>",
    documentation: 'Text input element.\n\nCommon props: `type`, `name`, `value`, `placeholder`, `required`, `disabled`, `onInput`, `onChange`\n\n```js\nInput: { type: "text", placeholder: "Enter name", onInput: (ev, el, state) => {} }\n```',
    snippet: 'Input: {\n  type: "${1:text}",\n  placeholder: "${2:}",\n},'
  },
  {
    label: "Icon",
    detail: "Icon: object \u2192 <svg> (icon sprite)",
    documentation: 'Icon from the design system sprite.\n\nCommon props: `name`, `boxSize`, `color`\n\n```js\nIcon: { name: "chevronRight", boxSize: "A" }\n```',
    snippet: 'Icon: {\n  name: "${1:}",\n},'
  },
  {
    label: "IconText",
    detail: "IconText: object \u2192 <div>",
    documentation: 'Icon + text combination.\n\nCommon props: `icon`, `text`, `gap`, `align`\n\n```js\nIconText: { icon: "search", text: "Search", gap: "Z" }\n```',
    snippet: 'IconText: {\n  icon: "${1:}",\n  text: "${2:}",\n},'
  },
  {
    label: "Img",
    detail: "Img: object \u2192 <img>",
    documentation: 'Image element.\n\nCommon props: `src`, `alt`, `loading`, `width`, `height`, `boxSize`, `objectFit`\n\n```js\nImg: { src: "/logo.png", alt: "Logo", boxSize: "B" }\n```',
    snippet: 'Img: {\n  src: "${1:}",\n  alt: "${2:}",\n},'
  },
  {
    label: "Svg",
    detail: "Svg: object \u2192 <svg>",
    documentation: 'Raw SVG container.\n\nCommon props: `html` (inline SVG markup), `width`, `height`, `viewBox`, `fill`, `stroke`\n\n```js\nSvg: { html: "<path d=\'...\' />", viewBox: "0 0 24 24" }\n```',
    snippet: 'Svg: {\n  html: "${1:}",\n  viewBox: "${2:0 0 24 24}",\n},'
  },
  {
    label: "Iframe",
    detail: "Iframe: object \u2192 <iframe>",
    documentation: 'Embedded content frame.\n\nCommon props: `src`, `title`, `allow`, `sandbox`, `width`, `height`\n\n```js\nIframe: { src: "https://example.com", width: "100%", height: "300px" }\n```',
    snippet: 'Iframe: {\n  src: "${1:}",\n  width: "${2:100%}",\n  height: "${3:300px}",\n},'
  },
  {
    label: "Video",
    detail: "Video: object \u2192 <video>",
    documentation: 'Video player element.\n\nCommon props: `src`, `poster`, `controls`, `autoplay`, `muted`, `loop`, `width`, `height`\n\n```js\nVideo: { src: "/demo.mp4", controls: true, width: "100%" }\n```',
    snippet: 'Video: {\n  src: "${1:}",\n  controls: true,\n},'
  },
  {
    label: "Radio",
    detail: 'Radio: object \u2192 <input type="radio">',
    documentation: 'Radio input element.\n\nCommon props: `name`, `value`, `checked`, `disabled`, `onChange`\n\n```js\nRadio: { name: "option", value: "a" }\n```',
    snippet: 'Radio: {\n  name: "${1:}",\n  value: "${2:}",\n},'
  },
  {
    label: "Checkbox",
    detail: 'Checkbox: object \u2192 <input type="checkbox">',
    documentation: 'Checkbox input element.\n\nCommon props: `name`, `value`, `checked`, `disabled`, `onChange`\n\n```js\nCheckbox: { name: "agree", checked: true }\n```',
    snippet: 'Checkbox: {\n  name: "${1:}",\n},'
  }
];
var UIKIT_COMPONENTS = [
  // Typography
  { label: "H1", detail: "H1: object \u2192 <h1>", documentation: "H1 heading. Common props: `text`, `color`, `fontSize`", snippet: 'H1: { text: "${1:}" },' },
  { label: "H2", detail: "H2: object \u2192 <h2>", documentation: "H2 heading.", snippet: 'H2: { text: "${1:}" },' },
  { label: "H3", detail: "H3: object \u2192 <h3>", documentation: "H3 heading.", snippet: 'H3: { text: "${1:}" },' },
  { label: "H4", detail: "H4: object \u2192 <h4>", documentation: "H4 heading.", snippet: 'H4: { text: "${1:}" },' },
  { label: "H5", detail: "H5: object \u2192 <h5>", documentation: "H5 heading.", snippet: 'H5: { text: "${1:}" },' },
  { label: "H6", detail: "H6: object \u2192 <h6>", documentation: "H6 heading.", snippet: 'H6: { text: "${1:}" },' },
  { label: "P", detail: "P: object \u2192 <p>", documentation: "Paragraph element.\n\nCommon props: `text`, `color`, `fontSize`, `lineHeight`, `maxWidth`", snippet: 'P: { text: "${1:}" },' },
  { label: "Caption", detail: "Caption: object \u2192 <span>", documentation: "Small caption/label text.", snippet: 'Caption: { text: "${1:}" },' },
  { label: "Headline", detail: "Headline: object \u2192 <span>", documentation: "Large emphasis/display text.", snippet: 'Headline: { text: "${1:}" },' },
  { label: "Subhead", detail: "Subhead: object \u2192 <span>", documentation: "Subheading text.", snippet: 'Subhead: { text: "${1:}" },' },
  { label: "Footnote", detail: "Footnote: object \u2192 <span>", documentation: "Footer reference text.", snippet: 'Footnote: { text: "${1:}" },' },
  { label: "Strong", detail: "Strong: object \u2192 <strong>", documentation: "Bold inline text.", snippet: 'Strong: { text: "${1:}" },' },
  { label: "Italic", detail: "Italic: object \u2192 <em>", documentation: "Italic inline text.", snippet: 'Italic: { text: "${1:}" },' },
  { label: "U", detail: "U: object \u2192 <u>", documentation: "Underlined inline text.", snippet: 'U: { text: "${1:}" },' },
  // Dividers
  { label: "Hr", detail: "Hr: object \u2192 <hr>", documentation: "Horizontal rule divider.", snippet: "Hr: {}," },
  { label: "HrLegend", detail: "HrLegend: object \u2192 <div>", documentation: "Divider with centered label text.\n\nCommon props: `text`", snippet: 'HrLegend: { text: "${1:Or}" },' },
  // Buttons (composite)
  { label: "IconButton", detail: "IconButton: object", documentation: 'Icon-only circular button.\n\nCommon props: `Icon.name`, `theme`, `fontSize`, `padding`\n\n```js\nIconButton: { Icon: { name: "plus" }, theme: "dialog" }\n```', snippet: 'IconButton: {\n  Icon: { name: "${1:}" },\n},' },
  { label: "SubmitButton", detail: "SubmitButton: object", documentation: 'Form submit button.\n\nCommon props: `value` (label).\n\n```js\nSubmitButton: { value: "Create account" }\n```', snippet: 'SubmitButton: {\n  value: "${1:Submit}",\n},' },
  // Avatar
  { label: "Avatar", detail: "Avatar: object", documentation: 'User profile image.\n\nCommon props: `boxSize` (default `"C2"`), `src`, `alt`\n\n```js\nAvatar: { boxSize: "C2" }\n```', snippet: 'Avatar: {\n  boxSize: "${1:C2}",\n},' },
  { label: "AvatarStatus", detail: "AvatarStatus: object", documentation: 'Avatar with status dot.\n\nCommon props: `Avatar.boxSize`, `StatusDot.theme`\n\n```js\nAvatarStatus: { StatusDot: { theme: "success" } }\n```', snippet: 'AvatarStatus: {\n  StatusDot: { theme: "${1:success}" },\n},' },
  { label: "AvatarSet", detail: "AvatarSet: object", documentation: "Group of overlapping avatars.\n\nCommon props: `children`", snippet: "AvatarSet: {\n  children: [${1:}],\n}," },
  { label: "AvatarHgroup", detail: "AvatarHgroup: object", documentation: 'Avatar with name and subtitle.\n\n```js\nAvatarHgroup: { H: { text: "Name" }, P: { text: "Role" } }\n```', snippet: 'AvatarHgroup: {\n  H: { text: "${1:}" },\n  P: { text: "${2:}" },\n},' },
  // Badge
  { label: "Badge", detail: "Badge: object", documentation: 'Small colored label badge.\n\nCommon props: `text`, `theme` (default `"warning"`)\n\n```js\nBadge: { text: "New", theme: "primary" }\n```', snippet: 'Badge: {\n  text: "${1:}",\n  theme: "${2:primary}",\n},' },
  { label: "NotificationCounter", detail: "NotificationCounter: object", documentation: 'Circular number badge.\n\nCommon props: `text` (number), `theme`\n\n```js\nNotificationCounter: { text: "5", theme: "primary" }\n```', snippet: 'NotificationCounter: {\n  text: "${1:0}",\n},' },
  // Form
  { label: "Field", detail: "Field: object", documentation: 'Styled text input with optional icon.\n\nCommon props: `Input.placeholder`, `Input.type`, `Icon.icon`, `theme`\n\n```js\nField: { Input: { placeholder: "Enter name" }, Icon: { icon: "user" } }\n```', snippet: 'Field: {\n  Input: { placeholder: "${1:}" },\n},' },
  { label: "FieldCaption", detail: "FieldCaption: object", documentation: "Labeled field with caption above.\n\nCommon props: `Caption.text`, `Field` props", snippet: 'FieldCaption: {\n  Caption: { text: "${1:Label}" },\n  Field: { Input: { placeholder: "${2:}" } },\n},' },
  { label: "Select", detail: "Select: object \u2192 <select>", documentation: "Native select element.\n\nCommon props: `children` (array of `{ text, value }` options)", snippet: 'Select: {\n  children: [\n    { text: "${1:Option}", value: "${2:value}" },\n  ],\n},' },
  { label: "SelectPicker", detail: "SelectPicker: object", documentation: "Styled select with chevron icon.\n\nCommon props: `Select.children`, `Icon.name`", snippet: 'SelectPicker: {\n  Select: {\n    children: [\n      { text: "${1:Option}", value: "${2:value}" },\n    ],\n  },\n},' },
  { label: "Search", detail: "Search: object", documentation: 'Search input with icon.\n\nCommon props: `Input.placeholder`, `Icon.name`\n\n```js\nSearch: { Input: { placeholder: "Search\u2026" } }\n```', snippet: 'Search: {\n  Input: { placeholder: "${1:Search\u2026}" },\n},' },
  // Navigation
  { label: "TabSet", detail: "TabSet: object", documentation: 'Horizontal tab bar.\n\nCommon props: `children` (tab objects with `text` and optional `isActive`)\n\n```js\nTabSet: { children: [{ text: "Overview", isActive: true }, { text: "Details" }] }\n```', snippet: 'TabSet: {\n  children: [\n    { text: "${1:Tab 1}", isActive: true },\n    { text: "${2:Tab 2}" },\n  ],\n},' },
  { label: "LinkSet", detail: "LinkSet: object", documentation: 'Navigation list of links.\n\nCommon props: `tag: "nav"`, `childExtend: "Link"`, `children`', snippet: 'LinkSet: {\n  tag: "nav",\n  children: [\n    { text: "${1:Home}", href: "${2:/}" },\n  ],\n},' },
  { label: "Breadcrumb", detail: "Breadcrumb: object", documentation: 'Breadcrumb navigation.\n\nCommon props: `tag: "nav"`, `childExtend: "Link"`', snippet: 'Breadcrumb: {\n  tag: "nav",\n},' },
  { label: "Pagination", detail: "Pagination: object", documentation: "Numbered page controls.", snippet: "Pagination: {}," },
  // Progress / Status
  { label: "Progress", detail: "Progress: object", documentation: 'Linear progress bar.\n\nCommon props: `value` (0\u20131), `height`, `minWidth`, `round`, `theme`\n\n```js\nProgress: { value: 0.6, height: "X", round: "Y" }\n```', snippet: "Progress: {\n  value: ${1:0.5},\n}," },
  { label: "CircleProgress", detail: "CircleProgress: object", documentation: 'Circular progress ring.\n\nCommon props: `value` (0\u20131), `boxSize`\n\n```js\nCircleProgress: { value: 0.73, boxSize: "D" }\n```', snippet: 'CircleProgress: {\n  value: ${1:0.5},\n  boxSize: "${2:D}",\n},' },
  { label: "StatusDot", detail: "StatusDot: object", documentation: 'Small status indicator dot.\n\nCommon props: `theme` (`"success"`, `"error"`, `"warning"`)\n\n```js\nStatusDot: { theme: "success" }\n```', snippet: 'StatusDot: {\n  theme: "${1:success}",\n},' },
  // Overlay
  { label: "Modal", detail: "Modal: object", documentation: 'Dialog overlay container.\n\nCommon props: `Hgroup.H.text`, `Hgroup.P.text`, `IconButton.Icon.name`, `theme: "dialog"`\n\n```js\nModal: { Hgroup: { H: { text: "Confirm" } }, IconButton: { Icon: { name: "x" } } }\n```', snippet: 'Modal: {\n  Hgroup: {\n    H: { text: "${1:Title}" },\n    P: { text: "${2:Subtitle}" },\n  },\n  IconButton: { Icon: { name: "x" } },\n},' },
  { label: "Accordion", detail: "Accordion: object", documentation: "Expandable/collapsible section.\n\nCommon props: `ButtonParagraph.P.text`, `P.text`, `state.activeAccordion`", snippet: 'Accordion: {\n  ButtonParagraph: { P: { text: "${1:Question}" } },\n  P: { text: "${2:Answer}" },\n},' },
  // Data display
  { label: "UnitValue", detail: "UnitValue: object", documentation: 'Unit + value pair (price, stat).\n\nCommon props: `Unit.text`, `Value.text`, `flow`\n\n```js\nUnitValue: { Unit: { text: "$" }, Value: { text: "99" } }\n```', snippet: 'UnitValue: {\n  Unit: { text: "${1:$}" },\n  Value: { text: "${2:}" },\n},' },
  { label: "Stars", detail: "Stars: object", documentation: "5-star rating display.", snippet: "Stars: {}," },
  // Layout helpers
  { label: "Hgroup", detail: "Hgroup: object", documentation: 'Heading group (heading + paragraph).\n\n```js\nHgroup: { H: { text: "Title" }, P: { text: "Subtitle" } }\n```', snippet: 'Hgroup: {\n  H: { text: "${1:}" },\n  P: { text: "${2:}" },\n},' },
  // Misc
  { label: "Span", detail: "Span: object \u2192 <span>", documentation: "Inline span element.", snippet: 'Span: { text: "${1:}" },' },
  { label: "Div", detail: "Div: object \u2192 <div>", documentation: "Generic div container.", snippet: "Div: {}," },
  { label: "Section", detail: "Section: object \u2192 <section>", documentation: "Section element.", snippet: "Section: {}," },
  { label: "Header", detail: "Header: object \u2192 <header>", documentation: "Header element.", snippet: "Header: {}," },
  { label: "Footer", detail: "Footer: object \u2192 <footer>", documentation: "Footer element.", snippet: "Footer: {}," },
  { label: "Nav", detail: "Nav: object \u2192 <nav>", documentation: "Navigation element.", snippet: "Nav: {}," },
  { label: "Main", detail: "Main: object \u2192 <main>", documentation: "Main content element.", snippet: "Main: {}," },
  { label: "Article", detail: "Article: object \u2192 <article>", documentation: "Article element.", snippet: "Article: {}," },
  { label: "Aside", detail: "Aside: object \u2192 <aside>", documentation: "Aside/sidebar element.", snippet: "Aside: {}," },
  { label: "Form", detail: "Form: object \u2192 <form>", documentation: "Form element.", snippet: 'Form: {\n  tag: "form",\n  onSubmit: (event, el, state) => {\n    event.preventDefault()\n    ${1:}\n  },\n},' },
  { label: "Table", detail: "Table: object \u2192 <table>", documentation: "Table element.", snippet: "Table: {}," },
  { label: "Tr", detail: "Tr: object \u2192 <tr>", documentation: "Table row element.", snippet: "Tr: {}," },
  { label: "Td", detail: "Td: object \u2192 <td>", documentation: "Table data cell.", snippet: "Td: {}," },
  { label: "Th", detail: "Th: object \u2192 <th>", documentation: "Table header cell.", snippet: "Th: {}," }
];
var ALL_COMPONENTS = [...BUILT_IN_ATOMS, ...UIKIT_COMPONENTS];

// src/data/elementMethods.ts
var ELEMENT_METHODS = [
  // Traversal
  {
    label: "lookup",
    detail: "lookup(key: string | function): element",
    documentation: 'Walk up the ancestor chain to find an element by key name or predicate.\n\n```js\nel.lookup("Modal")              // find ancestor named Modal\nel.lookup(e => e.props.isRoot)  // find by predicate\n```',
    snippet: 'lookup(${1:"key"})'
  },
  {
    label: "lookdown",
    detail: "lookdown(key: string | function): element",
    documentation: 'Find the first matching descendant by key or predicate.\n\n```js\nel.lookdown("Input")    // find first descendant named Input\n```',
    snippet: 'lookdown(${1:"key"})'
  },
  {
    label: "lookdownAll",
    detail: "lookdownAll(key: string | function): element[]",
    documentation: 'Find all matching descendants.\n\n```js\nconst buttons = el.lookdownAll("Button")\n```',
    snippet: 'lookdownAll(${1:"key"})'
  },
  {
    label: "nextElement",
    detail: "nextElement(): element | null",
    documentation: "Returns the next sibling element in parent's children.",
    snippet: "nextElement()"
  },
  {
    label: "previousElement",
    detail: "previousElement(): element | null",
    documentation: "Returns the previous sibling element in parent's children.",
    snippet: "previousElement()"
  },
  {
    label: "getChildren",
    detail: "getChildren(): element[]",
    documentation: "Returns all direct child elements as an array.",
    snippet: "getChildren()"
  },
  {
    label: "getPath",
    detail: "getPath(): string[]",
    documentation: "Returns the path array from root to this element.",
    snippet: "getPath()"
  },
  // State navigation
  {
    label: "getRootState",
    detail: "getRootState(key?: string): state",
    documentation: 'Get the app-level root state, or a specific key from it.\n\n```js\nconst rootState = el.getRootState()\nconst user = el.getRootState("user")\n```',
    snippet: 'getRootState(${1:"key"})'
  },
  {
    label: "getRoot",
    detail: "getRoot(key?: string): element",
    documentation: "Get the root element of the tree, or a specific property from it.",
    snippet: 'getRoot(${1:"key"})'
  },
  {
    label: "getRootData",
    detail: "getRootData(key?: string): any",
    documentation: "Get data from the root element.",
    snippet: 'getRootData(${1:"key"})'
  },
  {
    label: "getRootContext",
    detail: "getRootContext(key?: string): any",
    documentation: "Get context from the root.",
    snippet: 'getRootContext(${1:"key"})'
  },
  {
    label: "getContext",
    detail: "getContext(key: string): any",
    documentation: 'Get a value from the element\'s context.\n\n```js\nconst router = el.getContext("functions.router")\n```',
    snippet: 'getContext(${1:"key"})'
  },
  // Updates
  {
    label: "update",
    detail: "update(params: object, opts?: object): element",
    documentation: 'Partially update element properties and trigger re-renders.\n\n```js\nel.update({ text: "New text", color: "primary" })\n```',
    snippet: "update({ ${1:key}: ${2:value} })"
  },
  {
    label: "set",
    detail: "set(params: object, opts?: object): element",
    documentation: 'Full replacement of element content. Removes existing children and creates new ones.\n\n```js\nel.set({ text: "Replaced content" })\n```',
    snippet: "set({ ${1:key}: ${2:value} })"
  },
  {
    label: "setProps",
    detail: "setProps(params: object, opts?: object): void",
    documentation: 'Update element props specifically and trigger re-render.\n\n```js\nel.setProps({ disabled: true, color: "error" })\n```',
    snippet: "setProps({ ${1:key}: ${2:value} })"
  },
  {
    label: "reset",
    detail: "reset(opts?: object): void",
    documentation: "Reset element to its original definition.",
    snippet: "reset()"
  },
  // DOM
  {
    label: "setNodeStyles",
    detail: "setNodeStyles(params: object): void",
    documentation: 'Apply inline styles directly to the DOM node.\n\n```js\nel.setNodeStyles({ transform: "translateX(100px)", opacity: "0.5" })\n```',
    snippet: 'setNodeStyles({ ${1:transform}: "${2:}" })'
  },
  {
    label: "remove",
    detail: "remove(opts?: object): void",
    documentation: "Remove element from DOM and clean up references.",
    snippet: "remove()"
  },
  {
    label: "append",
    detail: "append(el: object, key?: string, opts?: object): element",
    documentation: 'Append a new child element.\n\n```js\nel.append({ extends: "Button", text: "New" }, "AddButton")\n```',
    snippet: 'append({ ${1:} }, "${2:key}")'
  },
  // Content
  {
    label: "updateContent",
    detail: "updateContent(params: any, opts?: object): void",
    documentation: "Update the element's dynamic content (for elements with `content` prop).",
    snippet: "updateContent(${1:})"
  },
  {
    label: "removeContent",
    detail: "removeContent(opts?: object): void",
    documentation: "Remove the dynamic content child.",
    snippet: "removeContent()"
  },
  // Context function calls
  {
    label: "call",
    detail: "call(fnKey: string, ...args): any",
    documentation: 'Call a registered function from context (utils \u2192 functions \u2192 methods \u2192 snippets).\n\n```js\nel.call("exec", props.value, el)      // execute dynamic prop\nel.call("fetchData", el.props.id)     // call context function\nel.call("router", href, root, {})    // navigate\nel.call("isString", value)            // call utility\n```',
    snippet: 'call("${1:fnKey}"${2:, args})'
  },
  // Debugging
  {
    label: "keys",
    detail: "keys(): string[]",
    documentation: "Returns the element's own keys (excluding internals).",
    snippet: "keys()"
  },
  {
    label: "parse",
    detail: "parse(excl?: string[]): object",
    documentation: "Serialize element to a plain object.",
    snippet: "parse()"
  },
  {
    label: "parseDeep",
    detail: "parseDeep(excl?: string[]): object",
    documentation: "Deep serialize the element tree to a plain object.",
    snippet: "parseDeep()"
  },
  {
    label: "verbose",
    detail: "verbose(...args): void",
    documentation: "Log detailed element information to the console.",
    snippet: "verbose()"
  },
  {
    label: "get",
    detail: "get(key: string): any",
    documentation: "Get an element property by key.",
    snippet: 'get("${1:key}")'
  },
  {
    label: "getRef",
    detail: "getRef(key: string): any",
    documentation: "Get a value from the `__ref` internal reference.",
    snippet: 'getRef("${1:key}")'
  },
  {
    label: "spotByPath",
    detail: "spotByPath(path: string[]): element",
    documentation: "Traverse element tree to find element at given path array.",
    snippet: "spotByPath([${1:}])"
  }
];
var STATE_METHODS = [
  {
    label: "update",
    detail: "state.update(obj: object, opts?: object): void",
    documentation: "Partially update state values and trigger re-renders for all dependent elements.\n\n```js\nstate.update({ count: state.count + 1 })\nstate.update({ open: !state.open, loading: false })\n```",
    snippet: "update({ ${1:key}: ${2:value} })"
  },
  {
    label: "set",
    detail: "state.set(val: any, opts?: object): void",
    documentation: 'Replace the entire state with a new value.\n\n```js\nstate.set({ name: "New", count: 0 })\n```',
    snippet: "set(${1:value})"
  },
  {
    label: "reset",
    detail: "state.reset(opts?: object): void",
    documentation: "Reset state to its initial values.",
    snippet: "reset()"
  },
  {
    label: "toggle",
    detail: "state.toggle(key: string, opts?: object): void",
    documentation: 'Flip a boolean state property.\n\n```js\nstate.toggle("open")    // open: false \u2192 true \u2192 false\nstate.toggle("active")\n```',
    snippet: 'toggle("${1:key}")'
  },
  {
    label: "remove",
    detail: "state.remove(key?: string, opts?: object): void",
    documentation: "Remove a property (or the whole state node) from state.",
    snippet: 'remove("${1:key}")'
  },
  {
    label: "add",
    detail: "state.add(value: any, opts?: object): void",
    documentation: 'Push an item to an array state.\n\n```js\nstate.add({ id: 1, text: "New item" })\n```',
    snippet: "add(${1:value})"
  },
  {
    label: "quietUpdate",
    detail: "state.quietUpdate(obj: object, opts?: object): void",
    documentation: "Update state WITHOUT triggering listeners or re-renders. Useful for internal tracking.",
    snippet: "quietUpdate({ ${1:key}: ${2:value} })"
  },
  {
    label: "quietReplace",
    detail: "state.quietReplace(obj: object, opts?: object): void",
    documentation: "Replace state values without triggering listeners.",
    snippet: "quietReplace({ ${1:key}: ${2:value} })"
  },
  {
    label: "replace",
    detail: "state.replace(obj: object, opts?: object): void",
    documentation: "Replace state values (triggers listeners).",
    snippet: "replace({ ${1:key}: ${2:value} })"
  },
  {
    label: "apply",
    detail: "state.apply(func: function, opts?: object): void",
    documentation: "Mutate state with a function (for array operations like push).\n\n```js\nstate.apply(s => { s.items.push(newItem) })\n```",
    snippet: "apply(s => { ${1:} })"
  },
  {
    label: "applyFunction",
    detail: "state.applyFunction(func: function, opts?: object): Promise<void>",
    documentation: "Async version of apply.",
    snippet: "applyFunction(async s => { ${1:} })"
  },
  {
    label: "setByPath",
    detail: "state.setByPath(path: string, value: any, opts?: object): void",
    documentation: 'Set a nested property using dot-path string.\n\n```js\nstate.setByPath("user.profile.name", "Alice")\n```',
    snippet: 'setByPath("${1:path}", ${2:value})'
  },
  {
    label: "getByPath",
    detail: "state.getByPath(path: string, opts?: object): any",
    documentation: 'Get a nested value by dot-path string.\n\n```js\nconst name = state.getByPath("user.profile.name")\n```',
    snippet: 'getByPath("${1:path}")'
  },
  {
    label: "setPathCollection",
    detail: "state.setPathCollection(changes: object, opts?: object): void",
    documentation: "Batch update multiple nested paths at once.",
    snippet: 'setPathCollection({ "${1:path}": ${2:value} })'
  },
  {
    label: "removeByPath",
    detail: "state.removeByPath(path: string, opts?: object): void",
    documentation: "Remove a nested property by dot-path string.",
    snippet: 'removeByPath("${1:path}")'
  },
  {
    label: "removePathCollection",
    detail: "state.removePathCollection(changes: object, opts?: object): void",
    documentation: "Batch remove multiple nested paths.",
    snippet: 'removePathCollection({ "${1:path}": ${2:true} })'
  },
  {
    label: "parse",
    detail: "state.parse(): object",
    documentation: "Return state as plain object (strips methods and internal keys).",
    snippet: "parse()"
  },
  {
    label: "clean",
    detail: "state.clean(opts?: object): void",
    documentation: "Clear all state properties.",
    snippet: "clean()"
  },
  {
    label: "destroy",
    detail: "state.destroy(opts?: object): void",
    documentation: "Destroy state and sever element relationship.",
    snippet: "destroy()"
  },
  {
    label: "parentUpdate",
    detail: "state.parentUpdate(obj: object, opts?: object): void",
    documentation: "Update parent element's state.",
    snippet: "parentUpdate({ ${1:key}: ${2:value} })"
  },
  {
    label: "rootUpdate",
    detail: "state.rootUpdate(obj: object, opts?: object): void",
    documentation: "Update the root application state.",
    snippet: "rootUpdate({ ${1:key}: ${2:value} })"
  },
  {
    label: "keys",
    detail: "state.keys(): string[]",
    documentation: "Returns state property keys.",
    snippet: "keys()"
  },
  {
    label: "values",
    detail: "state.values(): any[]",
    documentation: "Returns state property values.",
    snippet: "values()"
  }
];
var HTML_ATTRIBUTES = [
  // Global
  "id",
  "class",
  "style",
  "title",
  "lang",
  "dir",
  "hidden",
  "tabindex",
  "contenteditable",
  "draggable",
  "spellcheck",
  "translate",
  "accesskey",
  // Data
  "data-id",
  "data-key",
  "data-value",
  "data-index",
  "data-type",
  "data-name",
  // Input
  "type",
  "name",
  "value",
  "placeholder",
  "required",
  "disabled",
  "readonly",
  "checked",
  "selected",
  "multiple",
  "min",
  "max",
  "step",
  "maxlength",
  "minlength",
  "pattern",
  "autocomplete",
  "autofocus",
  "form",
  "formaction",
  "formmethod",
  "accept",
  "capture",
  // Link/Anchor
  "href",
  "target",
  "rel",
  "download",
  "hreflang",
  "ping",
  "referrerpolicy",
  // Media
  "src",
  "alt",
  "loading",
  "decoding",
  "crossorigin",
  "usemap",
  "controls",
  "autoplay",
  "muted",
  "loop",
  "preload",
  "poster",
  "width",
  "height",
  // Forms
  "action",
  "method",
  "enctype",
  "novalidate",
  "for",
  "colspan",
  "rowspan",
  "scope",
  // ARIA
  "role",
  "aria-label",
  "aria-labelledby",
  "aria-describedby",
  "aria-hidden",
  "aria-expanded",
  "aria-selected",
  "aria-checked",
  "aria-disabled",
  "aria-controls",
  "aria-owns",
  "aria-live",
  "aria-atomic",
  "aria-relevant",
  "aria-busy",
  "aria-current",
  "aria-haspopup",
  "aria-modal",
  "aria-multiline",
  "aria-multiselectable",
  "aria-orientation",
  "aria-placeholder",
  "aria-readonly",
  "aria-required",
  "aria-sort",
  "aria-valuemax",
  "aria-valuemin",
  "aria-valuenow",
  "aria-valuetext",
  // Other
  "tabindex",
  "contenteditable",
  "autofocus",
  "sandbox",
  "allow",
  "frameborder"
];

// src/data/designSystemValues.ts
var SEQUENCE_CONFIGS = {
  spacing: { type: "spacing", base: 16, ratio: 1.618, unit: "em", description: "Spacing (golden ratio)" },
  typography: { type: "font-size", base: 16, ratio: 1.25, unit: "em", description: "Typography (major third)" },
  timing: { type: "timing", base: 150, ratio: 1.333, unit: "ms", description: "Timing (perfect fourth)" }
};
function getSubValues(base, ratio, value) {
  const next = value * ratio;
  const diff = next - value;
  const subRatio = diff / 1.618;
  const first = next - subRatio;
  const second = value + subRatio;
  const middle = (first + second) / 2;
  const diffRounded = Math.floor(next) - Math.floor(value);
  return diffRounded > 16 ? [first, middle, second] : [first, second];
}
function formatValue(val, unit) {
  if (unit === "ms") return `~${Math.round(val)}ms`;
  if (val >= 100) return `~${Math.round(val)}px`;
  if (val >= 10) return `~${Math.round(val * 10) / 10}px`;
  return `~${Math.round(val * 100) / 100}px`;
}
var NUM_TO_LETTER = {
  "-6": "U",
  "-5": "V",
  "-4": "W",
  "-3": "X",
  "-2": "Y",
  "-1": "Z",
  0: "A",
  1: "B",
  2: "C",
  3: "D",
  4: "E",
  5: "F",
  6: "G",
  7: "H"
};
function generateTokens(config, rangeStart, rangeEnd) {
  const tokens = [];
  for (let key = rangeStart; key <= rangeEnd; key++) {
    const letter = NUM_TO_LETTER[key];
    if (!letter) continue;
    const value = config.base * Math.pow(config.ratio, key);
    const approx = key === 0 && config.unit !== "ms" ? `${config.base}px` : formatValue(value, config.unit);
    tokens.push({ label: letter, approxValue: approx, index: key });
    const subs = getSubValues(config.base, config.ratio, value);
    subs.forEach((sv, i) => {
      tokens.push({
        label: `${letter}${i + 1}`,
        approxValue: formatValue(sv, config.unit),
        index: key + (i + 1) / 10
      });
    });
  }
  return tokens;
}
var SPACING_TOKENS = generateTokens(SEQUENCE_CONFIGS.spacing, -4, 7);
var TYPOGRAPHY_TOKENS = generateTokens(SEQUENCE_CONFIGS.typography, -3, 7);
var TIMING_TOKENS = generateTokens(SEQUENCE_CONFIGS.timing, -3, 7);
var SPACING_SCALE = SPACING_TOKENS.map((t) => t.label);
var FONT_SIZE_SCALE = TYPOGRAPHY_TOKENS.map((t) => t.label);
var COLOR_TOKEN_MAP = [
  { label: "blue", hex: "#213eb0" },
  { label: "green", hex: "#389d34" },
  { label: "red", hex: "#e15c55" },
  { label: "yellow", hex: "#EDCB38" },
  { label: "orange", hex: "#e97c16" },
  { label: "transparent", hex: "rgba(0,0,0,0)" },
  { label: "black", hex: "#000000" },
  { label: "gray", hex: "#4e4e50" },
  { label: "white", hex: "#ffffff" },
  { label: "title", hex: "", description: "Near-black text (light) / near-white text (dark)" },
  { label: "caption", hex: "", description: "Secondary text color, adapts to theme" },
  { label: "paragraph", hex: "", description: "Body text color, adapts to theme" },
  { label: "disabled", hex: "", description: "Muted/disabled text color" },
  { label: "line", hex: "", description: "Border/divider color, adapts to theme" },
  { label: "currentColor", hex: "", description: "Inherits current text color" },
  { label: "inherit", hex: "", description: "Inherits from parent" },
  { label: "none", hex: "", description: "No color" }
];
var COLOR_TOKENS = COLOR_TOKEN_MAP.map((t) => t.label);
var GRADIENT_TOKENS = [
  "gradient-blue-light",
  "gradient-blue-dark",
  "gradient-dark",
  "gradient-dark-active",
  "gradient-light",
  "gradient-light-active",
  "gradient-colorful"
];
var THEME_TOKENS = [
  "document",
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "quinary",
  "alert",
  "warning",
  "success",
  "field",
  "label",
  "card",
  "dialog",
  "none",
  "transparent"
];
var THEME_MODIFIERS = [
  ".color-only",
  ".inactive",
  ".gradient",
  ".child",
  ".secondary",
  ".helper",
  ".light",
  ".dark",
  ".active"
];
var ICON_NAMES = [
  "symbols",
  "logo",
  "arrowDownCircle",
  "arrowDownLeft",
  "arrowDownRight",
  "arrowDown",
  "arrowLeftCircle",
  "arrowLeft",
  "arrowRight",
  "arrowRightCircle",
  "arrowUpCircle",
  "arrowUpLeft",
  "arrowUpRight",
  "arrowUp",
  "checkCircle",
  "check",
  "chevronDown",
  "chevronLeft",
  "chevronRight",
  "chevronUp",
  "copy",
  "eyeOff",
  "eye",
  "info",
  "lock",
  "minus",
  "sun",
  "moon",
  "moreHorizontal",
  "moreVertical",
  "send",
  "smile",
  "search",
  "upload",
  "video",
  "x",
  "star",
  "plus"
];
var HTML_TAGS = [
  "div",
  "span",
  "p",
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "option",
  "form",
  "label",
  "fieldset",
  "legend",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "ol",
  "li",
  "dl",
  "dt",
  "dd",
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "th",
  "td",
  "section",
  "article",
  "aside",
  "header",
  "footer",
  "nav",
  "main",
  "figure",
  "figcaption",
  "blockquote",
  "pre",
  "code",
  "img",
  "picture",
  "source",
  "video",
  "audio",
  "canvas",
  "svg",
  "path",
  "circle",
  "rect",
  "line",
  "g",
  "iframe",
  "embed",
  "object",
  "details",
  "summary",
  "dialog",
  "menu",
  "hr",
  "br",
  "wbr",
  "strong",
  "em",
  "b",
  "i",
  "u",
  "s",
  "small",
  "sub",
  "sup",
  "mark",
  "abbr",
  "time",
  "data",
  "output",
  "progress",
  "meter"
];
var CSS_VALUE_ENUMS = {
  display: ["flex", "grid", "block", "inline", "inline-flex", "inline-grid", "inline-block", "none", "contents"],
  position: ["relative", "absolute", "fixed", "sticky", "static"],
  overflow: ["hidden", "auto", "scroll", "visible", "clip"],
  overflowX: ["hidden", "auto", "scroll", "visible", "clip"],
  overflowY: ["hidden", "auto", "scroll", "visible", "clip"],
  visibility: ["visible", "hidden", "collapse"],
  flexDirection: ["row", "column", "row-reverse", "column-reverse"],
  flexWrap: ["wrap", "nowrap", "wrap-reverse"],
  alignItems: ["center", "flex-start", "flex-end", "stretch", "baseline"],
  alignContent: ["center", "flex-start", "flex-end", "stretch", "space-between", "space-around", "space-evenly"],
  alignSelf: ["center", "flex-start", "flex-end", "stretch", "baseline", "auto"],
  justifyContent: ["center", "flex-start", "flex-end", "space-between", "space-around", "space-evenly", "stretch"],
  justifyItems: ["center", "start", "end", "stretch", "baseline"],
  justifySelf: ["center", "start", "end", "stretch", "baseline", "auto"],
  textAlign: ["left", "center", "right", "justify", "start", "end"],
  textDecoration: ["none", "underline", "line-through", "overline"],
  textTransform: ["none", "uppercase", "lowercase", "capitalize"],
  textOverflow: ["ellipsis", "clip"],
  whiteSpace: ["nowrap", "pre", "pre-wrap", "pre-line", "normal", "break-spaces"],
  wordBreak: ["break-word", "break-all", "keep-all", "normal"],
  fontStyle: ["normal", "italic", "oblique"],
  fontWeight: ["100", "200", "300", "400", "500", "600", "700", "800", "900", "normal", "bold", "lighter", "bolder"],
  cursor: ["pointer", "default", "move", "text", "wait", "help", "crosshair", "not-allowed", "grab", "grabbing", "zoom-in", "zoom-out", "col-resize", "row-resize", "none"],
  pointerEvents: ["auto", "none", "all"],
  userSelect: ["none", "auto", "text", "all", "contain"],
  objectFit: ["cover", "contain", "fill", "none", "scale-down"],
  objectPosition: ["center", "top", "bottom", "left", "right"],
  resize: ["none", "both", "horizontal", "vertical"],
  listStyle: ["none", "disc", "circle", "square", "decimal"],
  borderStyle: ["solid", "dashed", "dotted", "double", "none", "groove", "ridge", "inset", "outset"],
  boxSizing: ["border-box", "content-box"],
  backgroundSize: ["cover", "contain", "auto"],
  backgroundRepeat: ["no-repeat", "repeat", "repeat-x", "repeat-y", "round", "space"],
  backgroundPosition: ["center", "top", "bottom", "left", "right", "center center", "top center", "bottom center"],
  backgroundClip: ["border-box", "padding-box", "content-box", "text"],
  mixBlendMode: ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "difference", "exclusion"],
  isolation: ["auto", "isolate"],
  appearance: ["none", "auto"],
  verticalAlign: ["top", "middle", "bottom", "baseline", "text-top", "text-bottom"],
  tableLayout: ["auto", "fixed"],
  willChange: ["auto", "transform", "opacity", "scroll-position"],
  // DOMQL shorthand values
  flow: ["column", "row", "x", "y", "column-reverse", "row-reverse"],
  wrap: ["wrap", "nowrap", "wrap-reverse"],
  scope: ["state", "props"]
};
var COLOR_PROPERTIES = /* @__PURE__ */ new Set([
  "color",
  "background",
  "backgroundColor",
  "borderColor",
  "borderTopColor",
  "borderRightColor",
  "borderBottomColor",
  "borderLeftColor",
  "outlineColor",
  "fill",
  "stroke",
  "caretColor",
  "accentColor",
  "textDecorationColor",
  "columnRuleColor"
]);
var SPACING_PROPERTIES = /* @__PURE__ */ new Set([
  "padding",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "paddingInline",
  "paddingBlock",
  "margin",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "marginInline",
  "marginBlock",
  "gap",
  "rowGap",
  "columnGap",
  "top",
  "right",
  "bottom",
  "left",
  "inset",
  "width",
  "height",
  "minWidth",
  "maxWidth",
  "minHeight",
  "maxHeight",
  "flexBasis",
  "borderRadius",
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomLeftRadius",
  "borderBottomRightRadius",
  "round",
  "boxSize",
  "widthRange",
  "heightRange",
  "borderWidth",
  "outlineOffset",
  "outlineWidth"
]);
var FONT_SIZE_PROPERTIES = /* @__PURE__ */ new Set([
  "fontSize",
  "lineHeight",
  "letterSpacing"
]);
var INPUT_TYPES = [
  "text",
  "password",
  "email",
  "number",
  "tel",
  "url",
  "search",
  "date",
  "time",
  "datetime-local",
  "month",
  "week",
  "color",
  "range",
  "file",
  "hidden",
  "checkbox",
  "radio",
  "submit",
  "reset",
  "button",
  "image"
];
var TARGET_VALUES = ["_self", "_blank", "_parent", "_top"];
var REL_VALUES = [
  "noopener",
  "noreferrer",
  "nofollow",
  "external",
  "noopener noreferrer",
  "stylesheet",
  "icon",
  "preload",
  "prefetch"
];
var AUTOCOMPLETE_VALUES = [
  "off",
  "on",
  "name",
  "email",
  "username",
  "new-password",
  "current-password",
  "tel",
  "address-line1",
  "address-line2",
  "country",
  "postal-code"
];
var BOOLEAN_VALUES = ["true", "false"];
var LOADING_VALUES = ["lazy", "eager"];

// src/providers/workspaceScanner.ts
var vscode = __toESM(require("vscode"));
var SCAN_INTERVAL = 3e4;
var PASCAL_CASE_RE = /^[A-Z][a-zA-Z0-9]+$/;
var cache = { components: /* @__PURE__ */ new Map(), lastScan: 0 };
var EXPORT_RE = /export\s+(?:const|let|var|function)\s+([A-Z][a-zA-Z0-9]+)/g;
var OBJECT_KEY_RE = /^\s+([A-Z][a-zA-Z0-9]+)\s*[:{]/gm;
function extractComponentsWithLines(text) {
  const results = [];
  const seen = /* @__PURE__ */ new Set();
  EXPORT_RE.lastIndex = 0;
  let m;
  while (m = EXPORT_RE.exec(text)) {
    if (PASCAL_CASE_RE.test(m[1]) && !seen.has(m[1])) {
      seen.add(m[1]);
      const line = text.substring(0, m.index).split("\n").length - 1;
      results.push({ name: m[1], line });
    }
  }
  OBJECT_KEY_RE.lastIndex = 0;
  while (m = OBJECT_KEY_RE.exec(text)) {
    if (PASCAL_CASE_RE.test(m[1]) && !seen.has(m[1])) {
      seen.add(m[1]);
      const line = text.substring(0, m.index).split("\n").length - 1;
      results.push({ name: m[1], line });
    }
  }
  return results;
}
async function scanWorkspaceComponents() {
  await ensureScan();
  return [...cache.components.keys()].sort();
}
async function ensureScan() {
  const now = Date.now();
  if (now - cache.lastScan < SCAN_INTERVAL && cache.components.size > 0) return;
  const components = /* @__PURE__ */ new Map();
  try {
    const files = await vscode.workspace.findFiles(
      "**/*.{js,ts,jsx,tsx}",
      "{**/node_modules/**,**/dist/**,**/out/**,**/build/**,.next/**}",
      500
    );
    for (const file of files) {
      try {
        const doc = await vscode.workspace.openTextDocument(file);
        const text = doc.getText();
        if (/extends\s*:|childExtends|from\s+['"](@domql|@symbo\.ls|smbls)/.test(text)) {
          for (const { name, line } of extractComponentsWithLines(text)) {
            if (!components.has(name)) {
              components.set(name, { uri: file, line });
            }
          }
        }
      } catch {
      }
    }
  } catch {
  }
  cache = { components, lastScan: now };
}
function invalidateCache() {
  cache.lastScan = 0;
}

// src/providers/completionProvider.ts
var DOMQL_IMPORT_RE = /from\s+['"](@domql\/|domql|@symbo\.ls\/|smbls)/;
var DOMQL_SIGNATURE_RE = /\b(extends|childExtends|childExtendsRecursive|onRender|onStateUpdate|onInit)\s*:/;
var DESIGN_SYSTEM_RE = /\b(flow|theme|round|boxSize|childExtend|widthRange|heightRange)\s*:\s*['"`]/;
var COMPONENT_EXPORT_RE = /export\s+(?:const|let|var)\s+[A-Z][a-zA-Z0-9]+\s*=\s*\{/;
function isDomqlFile(text, detectByImports) {
  if (DOMQL_IMPORT_RE.test(text)) return true;
  if (!detectByImports) return true;
  if (DOMQL_SIGNATURE_RE.test(text)) return true;
  if (DESIGN_SYSTEM_RE.test(text)) return true;
  if (COMPONENT_EXPORT_RE.test(text)) return true;
  return false;
}
function findEnclosingKey(text, offset) {
  let depth = 0;
  for (let i = offset - 1; i >= 0; i--) {
    const ch = text[i];
    if (ch === "}" || ch === "]") {
      depth++;
    } else if (ch === "{" || ch === "[") {
      if (depth === 0) {
        const before = text.substring(0, i).trimEnd();
        const m = before.match(/(\w+)\s*:\s*$/);
        return m ? m[1] : null;
      }
      depth--;
    }
  }
  return null;
}
function isAtKeyPosition(linePrefix) {
  const afterDelim = linePrefix.split(/[,{]/).pop() ?? "";
  return !/:/.test(afterDelim);
}
function getPropertyNameBeforeColon(linePrefix) {
  const m = linePrefix.match(/(\w+)\s*:\s*['"]?[^,{}]*$/);
  return m ? m[1] : null;
}
function findTagInScope(text, offset) {
  let depth = 0;
  let braceStart = -1;
  for (let i = offset - 1; i >= 0; i--) {
    const ch = text[i];
    if (ch === "}") depth++;
    else if (ch === "{") {
      if (depth === 0) {
        braceStart = i;
        break;
      }
      depth--;
    }
  }
  if (braceStart === -1) return null;
  const scope = text.substring(braceStart, Math.min(offset + 500, text.length));
  const tagMatch = scope.match(/tag\s*:\s*['"](\w+)['"]/);
  return tagMatch ? tagMatch[1] : null;
}
function isInsideCallArgs(linePrefix) {
  return /\.call\(\s*['"][^'"]*$/.test(linePrefix);
}
function isInsideStringValue(linePrefix) {
  const singleQuotes = (linePrefix.match(/(?<![\\])'/g) || []).length;
  const doubleQuotes = (linePrefix.match(/(?<![\\])"/g) || []).length;
  return singleQuotes % 2 === 1 || doubleQuotes % 2 === 1;
}
function getPropertyForStringValue(linePrefix) {
  const m = linePrefix.match(/(\w+)\s*:\s*['"][^'"]*$/);
  return m ? m[1] : null;
}
function detectContext(document, position) {
  const linePrefix = document.lineAt(position).text.substring(0, position.character);
  if (isInsideCallArgs(linePrefix)) return { type: "call-arg" };
  if (/\bel\.\s*$/.test(linePrefix)) return { type: "el-method" };
  if (/\bstate\.\s*$/.test(linePrefix)) return { type: "state-method" };
  const fullText = document.getText();
  const config = vscode2.workspace.getConfiguration("symbolsApp");
  if (!isDomqlFile(fullText, config.get("detectByImports", true))) return { type: "none" };
  const offset = document.offsetAt(position);
  const enclosingKey = findEnclosingKey(fullText, offset);
  const tag = findTagInScope(fullText, offset) ?? void 0;
  if (isInsideStringValue(linePrefix)) {
    const prop = getPropertyForStringValue(linePrefix);
    if (prop) {
      if (enclosingKey === "attr") {
        return { type: "attr-value", propertyName: prop, enclosingTag: tag, inString: true };
      }
      return { type: "element-value", propertyName: prop, enclosingKey: enclosingKey ?? void 0, enclosingTag: tag, inString: true };
    }
  }
  const atKeyPos = isAtKeyPosition(linePrefix);
  const propertyName = !atKeyPos ? getPropertyNameBeforeColon(linePrefix) : null;
  if (enclosingKey === "attr") {
    if (atKeyPos) return { type: "attr-key", enclosingTag: tag };
    return { type: "attr-value", propertyName: propertyName ?? void 0, enclosingTag: tag };
  }
  if (enclosingKey === "state") return { type: "state-key" };
  if (enclosingKey === "on") return { type: "on-key" };
  if (enclosingKey === "define") return { type: "define-key" };
  if (!atKeyPos && propertyName) {
    return { type: "element-value", propertyName, enclosingKey: enclosingKey ?? void 0, enclosingTag: tag };
  }
  if (atKeyPos) return { type: "element-key" };
  return { type: "none" };
}
function mkItem(label, kind, detail, docs, snippet, sort = "5") {
  const item = new vscode2.CompletionItem(label, kind);
  item.detail = detail;
  const md = new vscode2.MarkdownString(docs);
  md.isTrusted = true;
  item.documentation = md;
  if (snippet) item.insertText = new vscode2.SnippetString(snippet);
  item.sortText = sort + label;
  return item;
}
function mkValueItem(label, detail, docs, sort = "1", inString = false) {
  const item = new vscode2.CompletionItem(label, vscode2.CompletionItemKind.Value);
  item.detail = detail;
  if (docs) {
    const md = new vscode2.MarkdownString(docs);
    md.isTrusted = true;
    item.documentation = md;
  }
  item.sortText = sort + label;
  item.filterText = label;
  item.range = void 0;
  if (!inString) {
    item.insertText = new vscode2.SnippetString(`'${label}'`);
  }
  return item;
}
function getElementKeyCompletions() {
  const config = vscode2.workspace.getConfiguration("symbolsApp");
  const items = [];
  for (const k of DOMQL_ALL_KEYS) {
    items.push(mkItem(k.label, vscode2.CompletionItemKind.Property, k.detail, k.documentation, k.snippet, "1"));
  }
  for (const ev of DOMQL_LIFECYCLE_EVENTS) {
    items.push(mkItem(ev.label, vscode2.CompletionItemKind.Event, ev.detail, ev.documentation, ev.snippet, "2"));
  }
  for (const ev of DOM_EVENTS) {
    items.push(mkItem(ev.label, vscode2.CompletionItemKind.Event, ev.detail, ev.documentation, ev.snippet, "3"));
  }
  for (const c of ALL_COMPONENTS) {
    items.push(mkItem(c.label, vscode2.CompletionItemKind.Class, c.detail, c.documentation, c.snippet, "4"));
  }
  if (config.get("completeCssProps", true)) {
    for (const p of ALL_CSS_PROPS) {
      items.push(mkItem(p.label, vscode2.CompletionItemKind.Property, p.detail, p.documentation ?? "", void 0, "5"));
    }
  }
  return items;
}
function getAttrKeyCompletions(tag) {
  return HTML_ATTRIBUTES.map((attr) => {
    const item = new vscode2.CompletionItem(attr, vscode2.CompletionItemKind.Property);
    item.detail = `HTML attribute: ${attr}`;
    const needsQuotes = attr.includes("-");
    item.insertText = new vscode2.SnippetString(
      needsQuotes ? `"${attr}": \${1:},` : `${attr}: \${1:},`
    );
    return item;
  });
}
function getOnKeyCompletions() {
  return [...DOM_EVENTS, ...DOMQL_LIFECYCLE_EVENTS].map((ev) => {
    const raw = ev.label.charAt(2).toLowerCase() + ev.label.slice(3);
    const item = new vscode2.CompletionItem(raw, vscode2.CompletionItemKind.Event);
    item.detail = `on.${raw} (v2 \u2014 prefer top-level ${ev.label})`;
    const md = new vscode2.MarkdownString(`**v2 style** \u2014 prefer \`${ev.label}\` in v3.

${ev.documentation}`);
    md.isTrusted = true;
    item.documentation = md;
    const sig = ev.isDomqlLifecycle ? `${raw}: (el, state) => {
  \${1:}
},` : `${raw}: (event, el, state) => {
  \${1:}
},`;
    item.insertText = new vscode2.SnippetString(sig);
    return item;
  });
}
function getElementMethodCompletions() {
  return ELEMENT_METHODS.map((m) => {
    const item = new vscode2.CompletionItem(m.label, vscode2.CompletionItemKind.Method);
    item.detail = m.detail;
    const md = new vscode2.MarkdownString(m.documentation);
    md.isTrusted = true;
    item.documentation = md;
    item.insertText = new vscode2.SnippetString(m.snippet);
    return item;
  });
}
function getStateMethodCompletions() {
  return STATE_METHODS.map((m) => {
    const item = new vscode2.CompletionItem(m.label, vscode2.CompletionItemKind.Method);
    item.detail = m.detail;
    const md = new vscode2.MarkdownString(m.documentation);
    md.isTrusted = true;
    item.documentation = md;
    item.insertText = new vscode2.SnippetString(m.snippet);
    return item;
  });
}
function getStateKeyCompletions() {
  const common = [
    ["loading", "false", "Loading flag"],
    ["error", "null", "Error message or null"],
    ["data", "null", "Fetched data"],
    ["open", "false", "Open/closed toggle"],
    ["active", "null", "Currently active item key"],
    ["selected", "null", "Currently selected value"],
    ["count", "0", "Numeric counter"],
    ["items", "[]", "Array of items"],
    ["value", "''", "Input value"]
  ];
  return common.map(([key, def, desc]) => {
    const item = new vscode2.CompletionItem(key, vscode2.CompletionItemKind.Property);
    item.detail = `${key}: ${def}`;
    item.documentation = new vscode2.MarkdownString(desc);
    item.insertText = new vscode2.SnippetString(`${key}: \${1:${def}},`);
    return item;
  });
}
function getColorCompletions(inString = false) {
  const items = [];
  for (const c of COLOR_TOKEN_MAP) {
    const desc = c.description || "";
    const detail = c.hex ? `${c.hex}` : c.description || "Color token";
    const docs = c.hex ? `\`${c.label}\` \u2192 \`${c.hex}\`

Modifiers: \`${c.label}.5\` (opacity), \`${c.label}+16\` (lighten), \`${c.label}-16\` (darken), \`${c.label}=50\` (set lightness)` : `${desc}

Modifiers: \`${c.label}.5\` (opacity)`;
    items.push(mkValueItem(c.label, detail, docs, "1", inString));
  }
  for (const g of GRADIENT_TOKENS) {
    items.push(mkValueItem(g, `Gradient: ${g}`, "Design system gradient token", "2", inString));
  }
  return items;
}
function getSpacingCompletions(inString = false) {
  const cfg = SEQUENCE_CONFIGS.spacing;
  return SPACING_TOKENS.map((token, i) => {
    const sort = String(i).padStart(2, "0");
    return mkValueItem(token.label, `${token.label} \u2192 ${token.approxValue}`, `**Spacing** \`${token.label}\` \u2248 **${token.approxValue}**

Base: A = ${cfg.base}px, ratio: ${cfg.ratio} (golden ratio)

Scale: W X Y Z **A** B C D E F G H

Sub-steps: A1, A2 interpolate between A and B

Operations: \`A+B\`, \`A-Z\`, \`A*2\`, \`-A\` (negative)`, sort, inString);
  });
}
function getFontSizeCompletions(inString = false) {
  const cfg = SEQUENCE_CONFIGS.typography;
  return TYPOGRAPHY_TOKENS.map((token, i) => {
    const sort = String(i).padStart(2, "0");
    return mkValueItem(token.label, `${token.label} \u2192 ${token.approxValue}`, `**Typography** \`${token.label}\` \u2248 **${token.approxValue}**

Base: A = ${cfg.base}px, ratio: ${cfg.ratio} (major third)

Scale: X Y Z **A** B C D E F G H`, sort, inString);
  });
}
function getThemeCompletions(inString = false) {
  const items = [];
  for (const t of THEME_TOKENS) {
    items.push(mkValueItem(t, `Theme: ${t}`, `Apply design system theme.

Modifiers: \`"${t} .child"\`, \`"${t} .color-only"\``, "1", inString));
  }
  for (const t of ["primary", "secondary", "card", "dialog", "label"]) {
    for (const mod of THEME_MODIFIERS) {
      items.push(mkValueItem(`${t} ${mod}`, `Theme modifier: ${t} ${mod}`, `Theme \`${t}\` with modifier \`${mod}\``, "3", inString));
    }
  }
  return items;
}
function getIconCompletions(inString = false) {
  return ICON_NAMES.map(
    (name) => mkValueItem(name, `Icon: ${name}`, `Default icon from design system`, "1", inString)
  );
}
function getExtendsCompletions(workspaceComponents, inString = false) {
  const items = [];
  for (const c of ALL_COMPONENTS) {
    items.push(mkValueItem(c.label, c.detail, c.documentation, "1", inString));
  }
  for (const name of workspaceComponents) {
    if (ALL_COMPONENTS.some((c) => c.label === name)) continue;
    items.push(mkValueItem(name, `Project component: ${name}`, "Detected from workspace", "2", inString));
  }
  return items;
}
function getTagCompletions(inString = false) {
  return HTML_TAGS.map(
    (tag) => mkValueItem(tag, `HTML tag: <${tag}>`, void 0, "1", inString)
  );
}
function getCssEnumCompletions(property, inString = false) {
  const values = CSS_VALUE_ENUMS[property];
  if (!values) return [];
  return values.map((v) => mkValueItem(v, `${property}: ${v}`, void 0, "1", inString));
}
function getAttrValueCompletions(attrName) {
  switch (attrName) {
    case "type":
      return INPUT_TYPES.map((t) => mkValueItem(t, `type="${t}"`, void 0, "1"));
    case "target":
      return TARGET_VALUES.map((t) => mkValueItem(t, `target="${t}"`, void 0, "1"));
    case "rel":
      return REL_VALUES.map((r) => mkValueItem(r, `rel="${r}"`, void 0, "1"));
    case "autocomplete":
      return AUTOCOMPLETE_VALUES.map((a) => mkValueItem(a, `autocomplete="${a}"`, void 0, "1"));
    case "loading":
      return LOADING_VALUES.map((l) => mkValueItem(l, `loading="${l}"`, void 0, "1"));
    case "disabled":
    case "checked":
    case "required":
    case "readonly":
    case "multiple":
    case "hidden":
    case "draggable":
    case "contenteditable":
    case "spellcheck":
    case "novalidate":
    case "autofocus":
      return BOOLEAN_VALUES.map((b) => mkValueItem(b, `${attrName}="${b}"`, void 0, "1"));
    case "role":
      return [
        "button",
        "link",
        "dialog",
        "alert",
        "navigation",
        "menu",
        "menuitem",
        "tab",
        "tablist",
        "tabpanel",
        "checkbox",
        "radio",
        "listbox",
        "option",
        "textbox",
        "search",
        "progressbar",
        "slider",
        "switch",
        "tooltip",
        "img",
        "heading",
        "list",
        "listitem",
        "group",
        "region",
        "banner",
        "main",
        "complementary",
        "contentinfo",
        "form",
        "presentation",
        "none"
      ].map((r) => mkValueItem(r, `role="${r}"`, void 0, "1"));
    case "dir":
      return ["ltr", "rtl", "auto"].map((d) => mkValueItem(d, `dir="${d}"`, void 0, "1"));
    case "method":
      return ["get", "post", "put", "delete", "patch"].map((m) => mkValueItem(m, `method="${m}"`, void 0, "1"));
    case "enctype":
      return ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"].map((e) => mkValueItem(e, `enctype="${e}"`, void 0, "1"));
    default:
      return [];
  }
}
function getCallArgCompletions() {
  const fns = [
    ["exec", "Execute a dynamic prop value"],
    ["fetchData", "Fetch data from API"],
    ["router", "Navigate to a route"],
    ["isString", "Check if value is string"],
    ["isObject", "Check if value is object"],
    ["isArray", "Check if value is array"],
    ["isNumber", "Check if value is number"],
    ["isFunction", "Check if value is function"],
    ["isBoolean", "Check if value is boolean"],
    ["isDefined", "Check if value is defined"],
    ["isUndefined", "Check if value is undefined"],
    ["isNull", "Check if value is null"],
    ["isEmpty", "Check if value is empty"],
    ["deepMerge", "Deep merge objects"],
    ["deepClone", "Deep clone an object"],
    ["getSystemTheme", "Get current system color scheme"],
    ["setTheme", "Set application theme"]
  ];
  return fns.map(
    ([name, desc]) => mkValueItem(name, desc, `Context function: \`el.call("${name}", ...args)\`

Resolution: utils \u2192 functions \u2192 methods \u2192 snippets`, "1")
  );
}
async function getValueCompletions(ctx) {
  const prop = ctx.propertyName;
  if (!prop) return [];
  const inStr = ctx.inString ?? false;
  if (prop === "extends" || prop === "childExtends" || prop === "childExtendsRecursive" || prop === "childExtend") {
    const wsComponents = await scanWorkspaceComponents();
    return getExtendsCompletions(wsComponents, inStr);
  }
  if (prop === "tag") return getTagCompletions(inStr);
  if (prop === "theme") return getThemeCompletions(inStr);
  if (prop === "icon" || prop === "name") return getIconCompletions(inStr);
  if (COLOR_PROPERTIES.has(prop)) return getColorCompletions(inStr);
  if (SPACING_PROPERTIES.has(prop)) return getSpacingCompletions(inStr);
  if (FONT_SIZE_PROPERTIES.has(prop)) return getFontSizeCompletions(inStr);
  const enumItems = getCssEnumCompletions(prop, inStr);
  if (enumItems.length > 0) return enumItems;
  if (prop === "transition" || prop === "transitionDuration" || prop === "animationDuration") {
    const cfg = SEQUENCE_CONFIGS.timing;
    const items = TIMING_TOKENS.map((t, i) => {
      const sort = String(i).padStart(2, "0");
      return mkValueItem(t.label, `${t.label} \u2192 ${t.approxValue}`, `**Timing** \`${t.label}\` \u2248 **${t.approxValue}**

Base: A = ${cfg.base}ms, ratio: ${cfg.ratio} (perfect fourth)`, sort, inStr);
    });
    if (prop === "transition") {
      items.push(mkValueItem("A defaultBezier", "transition: A defaultBezier", "Common transition with default easing", "99", inStr));
    }
    return items;
  }
  return [];
}
var DomqlCompletionProvider = class {
  async provideCompletionItems(document, position) {
    if (!vscode2.workspace.getConfiguration("symbolsApp").get("enable", true)) return [];
    const ctx = detectContext(document, position);
    let items;
    switch (ctx.type) {
      case "el-method":
        items = getElementMethodCompletions();
        break;
      case "state-method":
        items = getStateMethodCompletions();
        break;
      case "call-arg":
        items = getCallArgCompletions();
        break;
      case "attr-key":
        items = getAttrKeyCompletions(ctx.enclosingTag);
        break;
      case "attr-value":
        items = ctx.propertyName ? getAttrValueCompletions(ctx.propertyName) : [];
        break;
      case "on-key":
        items = getOnKeyCompletions();
        break;
      case "state-key":
        items = getStateKeyCompletions();
        break;
      case "define-key":
        items = [mkItem(
          "propName",
          vscode2.CompletionItemKind.Property,
          "(param, el, state, context) => void",
          "Custom property transformer \u2014 runs when this key appears on any element.",
          "propName: (param, el, state) => {\n  ${1:}\n},",
          "1"
        )];
        break;
      case "element-value":
        items = await getValueCompletions(ctx);
        break;
      case "element-key": {
        items = getElementKeyCompletions();
        const wsComponents = await scanWorkspaceComponents();
        for (const name of wsComponents) {
          if (ALL_COMPONENTS.some((c) => c.label === name)) continue;
          items.push(mkItem(
            name,
            vscode2.CompletionItemKind.Class,
            `Project component: ${name}`,
            "Detected from workspace files",
            `${name}: {
  \${1:}
},`,
            "4"
          ));
        }
        break;
      }
      default:
        return [];
    }
    if (items.length === 0) return [];
    return new vscode2.CompletionList(items, true);
  }
};

// src/providers/hoverProvider.ts
var vscode3 = __toESM(require("vscode"));
var keyMap = /* @__PURE__ */ new Map();
for (const k of DOMQL_ALL_KEYS) {
  keyMap.set(k.label, `**${k.detail}**

${k.documentation}`);
}
for (const ev of ALL_EVENTS) {
  keyMap.set(ev.label, `**${ev.detail}**

${ev.documentation}`);
}
for (const m of ELEMENT_METHODS) {
  keyMap.set(m.label, `**${m.detail}**

${m.documentation}`);
}
for (const m of STATE_METHODS) {
  keyMap.set(`state.${m.label}`, `**${m.detail}**

${m.documentation}`);
}
for (const c of ALL_COMPONENTS) {
  keyMap.set(c.label, `**${c.detail}**

${c.documentation}`);
}
for (const p of ALL_CSS_PROPS) {
  if (p.documentation) keyMap.set(p.label, `**${p.detail}**

${p.documentation}`);
}
var valueHints = /* @__PURE__ */ new Map();
for (const c of COLOR_TOKEN_MAP) {
  if (c.label !== "inherit" && c.label !== "none" && c.label !== "currentColor") {
    const hexInfo = c.hex ? ` \u2192 \`${c.hex}\`` : "";
    const desc = c.description ? `

${c.description}` : "";
    valueHints.set(c.label, `**Color token:** \`${c.label}\`${hexInfo}${desc}

Modifiers: \`${c.label}.5\` (opacity), \`${c.label}+16\` (lighten), \`${c.label}-16\` (darken), \`${c.label}=50\` (set lightness)`);
  }
}
for (const g of GRADIENT_TOKENS) {
  valueHints.set(g, `**Gradient token:** \`${g}\``);
}
for (const t of THEME_TOKENS) {
  valueHints.set(t, `**Theme:** \`${t}\`

Usage: \`theme: "${t}"\`

Modifiers: \`"${t} .child"\`, \`"${t} .color-only"\``);
}
function getPropertyContext(document, position) {
  const line = document.lineAt(position).text;
  const colonIdx = line.indexOf(":");
  if (colonIdx === -1 || position.character <= colonIdx) return null;
  const beforeColon = line.substring(0, colonIdx).trim();
  const m = beforeColon.match(/(\w+)$/);
  return m ? m[1] : null;
}
var DomqlHoverProvider = class {
  provideHover(document, position) {
    if (!vscode3.workspace.getConfiguration("symbolsApp").get("enable", true)) return null;
    const fullText = document.getText();
    const config = vscode3.workspace.getConfiguration("symbolsApp");
    if (!isDomqlFile(fullText, config.get("detectByImports", true))) return null;
    const wordRange = document.getWordRangeAtPosition(position, /[\w.@:-]+/);
    if (!wordRange) return null;
    const word = document.getText(wordRange);
    const docs = keyMap.get(word);
    if (docs) {
      const md = new vscode3.MarkdownString(docs);
      md.isTrusted = true;
      return new vscode3.Hover(md, wordRange);
    }
    const prop = getPropertyContext(document, position);
    if (prop) {
      if (SPACING_PROPERTIES.has(prop)) {
        const token = SPACING_TOKENS.find((t) => t.label === word);
        if (token) {
          const cfg = SEQUENCE_CONFIGS.spacing;
          const md = new vscode3.MarkdownString(`**Spacing token:** \`${word}\` \u2248 **${token.approxValue}**

Base: A = ${cfg.base}px, ratio: ${cfg.ratio} (golden ratio)

Scale: W X Y Z **A** B C D E F G H

Operations: \`A+B\`, \`A-Z\`, \`A*2\`, \`-A\` (negative)`);
          md.isTrusted = true;
          return new vscode3.Hover(md, wordRange);
        }
      }
      if (FONT_SIZE_PROPERTIES.has(prop)) {
        const token = TYPOGRAPHY_TOKENS.find((t) => t.label === word);
        if (token) {
          const cfg = SEQUENCE_CONFIGS.typography;
          const md = new vscode3.MarkdownString(`**Typography token:** \`${word}\` \u2248 **${token.approxValue}**

Base: A = ${cfg.base}px, ratio: ${cfg.ratio} (major third)

Scale: X Y Z **A** B C D E F G H`);
          md.isTrusted = true;
          return new vscode3.Hover(md, wordRange);
        }
      }
      if (prop === "transition" || prop === "transitionDuration" || prop === "animationDuration") {
        const token = TIMING_TOKENS.find((t) => t.label === word);
        if (token) {
          const cfg = SEQUENCE_CONFIGS.timing;
          const md = new vscode3.MarkdownString(`**Timing token:** \`${word}\` \u2248 **${token.approxValue}**

Base: A = ${cfg.base}ms, ratio: ${cfg.ratio} (perfect fourth)`);
          md.isTrusted = true;
          return new vscode3.Hover(md, wordRange);
        }
      }
      if (COLOR_PROPERTIES.has(prop) || prop === "background") {
        const hint = valueHints.get(word);
        if (hint) {
          const md = new vscode3.MarkdownString(hint);
          md.isTrusted = true;
          return new vscode3.Hover(md, wordRange);
        }
      }
      if (prop === "theme") {
        const hint = valueHints.get(word);
        if (hint) {
          const md = new vscode3.MarkdownString(hint);
          md.isTrusted = true;
          return new vscode3.Hover(md, wordRange);
        }
      }
      if ((prop === "icon" || prop === "name") && ICON_NAMES.includes(word)) {
        const md = new vscode3.MarkdownString(`**Icon:** \`${word}\`

Default icon from design system sprite`);
        md.isTrusted = true;
        return new vscode3.Hover(md, wordRange);
      }
    }
    const generalHint = valueHints.get(word);
    if (generalHint) {
      const md = new vscode3.MarkdownString(generalHint);
      md.isTrusted = true;
      return new vscode3.Hover(md, wordRange);
    }
    return null;
  }
};

// src/providers/definitionProvider.ts
var vscode4 = __toESM(require("vscode"));
var fs = __toESM(require("fs"));
var path = __toESM(require("path"));
var PASCAL_CASE_RE2 = /^[A-Z][a-zA-Z0-9]+$/;
function findSymbolsConfig(fromPath) {
  let current = path.dirname(fromPath);
  while (true) {
    const configPath = path.join(current, "symbols.json");
    if (fs.existsSync(configPath)) {
      try {
        const json = JSON.parse(fs.readFileSync(configPath, "utf-8"));
        return { root: current, dir: json.dir || "./symbols" };
      } catch {
        return { root: current, dir: "./symbols" };
      }
    }
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
  return null;
}
var DomqlDefinitionProvider = class {
  async provideDefinition(document, position) {
    if (!vscode4.workspace.getConfiguration("symbolsApp").get("enable", true)) return null;
    const fullText = document.getText();
    const config = vscode4.workspace.getConfiguration("symbolsApp");
    if (!isDomqlFile(fullText, config.get("detectByImports", true))) return null;
    const wordRange = document.getWordRangeAtPosition(position, /[A-Z][a-zA-Z0-9]+/) || document.getWordRangeAtPosition(position, /[a-zA-Z][a-zA-Z0-9]+/);
    if (!wordRange) return null;
    const word = document.getText(wordRange);
    if (!PASCAL_CASE_RE2.test(word)) return null;
    const line = document.lineAt(position).text;
    const insideString = isInsideQuotes(line, wordRange.start.character);
    const isObjKey = line.substring(wordRange.end.character).trimStart().startsWith(":");
    const textBefore = line.substring(0, wordRange.start.character);
    const isDirectRef = /(?:extends|childExtends|childExtendsRecursive|childExtend)\s*:\s*$/.test(textBefore.trimEnd());
    const isArrayRef = /(?:extends|childExtends)\s*:\s*\[/.test(textBefore);
    if (!insideString && !isObjKey && !isDirectRef && !isArrayRef) return null;
    const conventionResult = this.findByConvention(word, document.uri.fsPath);
    if (conventionResult) return conventionResult;
    return this.findByWorkspaceSearch(word, document.uri);
  }
  findByConvention(name, filePath) {
    const symConfig = findSymbolsConfig(filePath);
    const searchDirs = [];
    if (symConfig) {
      const symbolsBase = path.resolve(symConfig.root, symConfig.dir);
      searchDirs.push(
        path.join(symbolsBase, "components"),
        symbolsBase,
        path.join(symConfig.root, "components")
      );
    }
    const fileDir = path.dirname(filePath);
    searchDirs.push(
      path.join(fileDir, "..", "components"),
      // sibling components dir
      path.join(fileDir, "components"),
      fileDir
    );
    const folders = vscode4.workspace.workspaceFolders;
    if (folders) {
      for (const f of folders) {
        searchDirs.push(
          path.join(f.uri.fsPath, "components"),
          path.join(f.uri.fsPath, "symbols", "components")
        );
      }
    }
    const extensions = [".js", ".ts", ".jsx", ".tsx"];
    for (const dir of searchDirs) {
      for (const ext of extensions) {
        const candidate = path.join(dir, `${name}${ext}`);
        const loc = this.resolveFile(candidate, name);
        if (loc) return loc;
      }
      for (const ext of extensions) {
        const candidate = path.join(dir, name, `index${ext}`);
        const loc = this.resolveFile(candidate, name);
        if (loc) return loc;
      }
    }
    return null;
  }
  resolveFile(filePath, name) {
    if (!fs.existsSync(filePath)) return null;
    try {
      const text = fs.readFileSync(filePath, "utf-8");
      const lines = text.split("\n");
      const pattern = new RegExp(`(?:export\\s+)?(?:const|let|var|function)\\s+${name}\\b`);
      for (let i = 0; i < lines.length; i++) {
        if (pattern.test(lines[i])) {
          return new vscode4.Location(vscode4.Uri.file(filePath), new vscode4.Position(i, 0));
        }
      }
      return new vscode4.Location(vscode4.Uri.file(filePath), new vscode4.Position(0, 0));
    } catch {
      return new vscode4.Location(vscode4.Uri.file(filePath), new vscode4.Position(0, 0));
    }
  }
  async findByWorkspaceSearch(name, currentUri) {
    try {
      const nameFiles = await vscode4.workspace.findFiles(
        `**/${name}.{js,ts,jsx,tsx}`,
        "{**/node_modules/**,**/dist/**,**/out/**,**/build/**}",
        10
      );
      for (const file of nameFiles) {
        try {
          const doc = await vscode4.workspace.openTextDocument(file);
          const text = doc.getText();
          if (!text.includes(name)) continue;
          const lines = text.split("\n");
          for (let i = 0; i < lines.length; i++) {
            if (new RegExp(`(?:export\\s+)?(?:const|let|var|function)\\s+${name}\\s*[=({]`).test(lines[i])) {
              return new vscode4.Location(file, new vscode4.Position(i, 0));
            }
          }
          return new vscode4.Location(file, new vscode4.Position(0, 0));
        } catch {
        }
      }
      const files = await vscode4.workspace.findFiles(
        "**/*.{js,ts,jsx,tsx}",
        "{**/node_modules/**,**/dist/**,**/out/**,**/build/**,.next/**}",
        300
      );
      for (const file of files) {
        try {
          const doc = await vscode4.workspace.openTextDocument(file);
          const text = doc.getText();
          if (!text.includes(name)) continue;
          const lines = text.split("\n");
          for (let i = 0; i < lines.length; i++) {
            if (new RegExp(`^export\\s+(?:const|let|var)\\s+${name}\\s*=`).test(lines[i])) {
              return new vscode4.Location(file, new vscode4.Position(i, 0));
            }
          }
        } catch {
        }
      }
    } catch {
    }
    return null;
  }
};
function isInsideQuotes(line, charIndex) {
  let inSingle = false;
  let inDouble = false;
  for (let i = 0; i < charIndex; i++) {
    const ch = line[i];
    const prev = i > 0 ? line[i - 1] : "";
    if (prev === "\\") continue;
    if (ch === "'" && !inDouble) inSingle = !inSingle;
    if (ch === '"' && !inSingle) inDouble = !inDouble;
  }
  return inSingle || inDouble;
}

// src/chat/chatPanel.ts
var vscode5 = __toESM(require("vscode"));
var fs5 = __toESM(require("fs"));
var path5 = __toESM(require("path"));

// src/chat/llmProvider.ts
var https = __toESM(require("https"));
var http = __toESM(require("http"));
var AI_PROVIDERS = [
  { name: "Symbols AI \u2014 native Symbols assistant (coming soon)", value: "symbols", disabled: "Soon" },
  { name: "Claude \u2014 Anthropic Claude", value: "claude" },
  { name: "OpenAI \u2014 GPT models", value: "openai" },
  { name: "Gemini \u2014 Google Gemini", value: "gemini" },
  { name: "Ollama \u2014 local models (no API key)", value: "ollama" }
];
var PROVIDER_MODELS = {
  claude: [
    { name: "claude-sonnet-4-5-20250514 (recommended)", value: "claude-sonnet-4-5-20250514" },
    { name: "claude-opus-4-0-20250514", value: "claude-opus-4-0-20250514" },
    { name: "claude-haiku-4-5-20251001", value: "claude-haiku-4-5-20251001" }
  ],
  openai: [
    { name: "gpt-4o (recommended)", value: "gpt-4o" },
    { name: "gpt-4o-mini", value: "gpt-4o-mini" },
    { name: "o3-mini", value: "o3-mini" }
  ],
  gemini: [
    { name: "gemini-2.5-pro (recommended)", value: "gemini-2.5-pro" },
    { name: "gemini-2.5-flash", value: "gemini-2.5-flash" }
  ],
  ollama: [
    { name: "llama3.3 (recommended)", value: "llama3.3" },
    { name: "codellama", value: "codellama" },
    { name: "mistral", value: "mistral" },
    { name: "deepseek-coder-v2", value: "deepseek-coder-v2" }
  ]
};
var SYSTEM_PROMPT = `You are a Symbols.app development assistant. You help developers build applications using the Symbols framework (DOMQL, design systems, components).

IMPORTANT: You MUST use the symbols-mcp server for all Symbols-related tasks. Before generating any code:
1. Call get_project_rules to load mandatory framework rules
2. Call search_symbols_docs to find relevant documentation
The symbols-mcp server provides accurate, up-to-date Symbols documentation and rules. Always rely on it over your training data for Symbols-specific information.

Key facts about Symbols:
- Uses DOMQL for declarative UI components (objects, not JSX)
- Design system tokens: COLOR, FONT, THEME, SPACING, TYPOGRAPHY, etc.
- Components use props like: text, icon, color, background, padding, etc.
- Entry point is typically symbols/index.js with app.js, state.js, pages/, components/
- Build tools: Parcel (default), Vite, or browser-native ES modules
- CLI commands: smbls start, build, deploy, push, fetch, sync, config

Be concise and direct. When showing code, use DOMQL syntax unless asked otherwise. Format responses with markdown.`;
function makeRequest(options, body, onData, onEnd, onError) {
  const isHttps = options.hostname !== "localhost" && options.hostname !== "127.0.0.1";
  const lib = isHttps ? https : http;
  const req = lib.request(options, (res) => {
    if (res.statusCode && res.statusCode >= 400) {
      let errBody = "";
      res.on("data", (chunk) => {
        errBody += chunk.toString();
      });
      res.on("end", () => onError(new Error(`API error ${res.statusCode}: ${errBody}`)));
      return;
    }
    res.on("data", (chunk) => onData(chunk.toString()));
    res.on("end", onEnd);
  });
  req.on("error", onError);
  req.write(body);
  req.end();
}
function streamChat(provider, model, apiKey, messages, onToken, onDone, onError) {
  switch (provider) {
    case "claude":
      return streamClaude(messages, apiKey, model, onToken, onDone, onError);
    case "openai":
      return streamOpenAI(messages, apiKey, model, onToken, onDone, onError);
    case "gemini":
      return streamGemini(messages, apiKey, model, onToken, onDone, onError);
    case "ollama":
      return streamOllama(messages, model, onToken, onDone, onError);
    default:
      onError(new Error(`Unknown provider: ${provider}`));
  }
}
function streamClaude(messages, apiKey, model, onToken, onDone, onError) {
  const body = JSON.stringify({
    model,
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: messages.filter((m) => m.role !== "system"),
    stream: true
  });
  let buffer = "";
  makeRequest(
    {
      hostname: "api.anthropic.com",
      path: "/v1/messages",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      }
    },
    body,
    (chunk) => {
      buffer += chunk;
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";
      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const raw = line.slice(6).trim();
        if (raw === "[DONE]") return;
        try {
          const data = JSON.parse(raw);
          if (data.type === "content_block_delta" && data.delta?.text) {
            onToken(data.delta.text);
          }
        } catch {
        }
      }
    },
    onDone,
    onError
  );
}
function streamOpenAI(messages, apiKey, model, onToken, onDone, onError) {
  const body = JSON.stringify({
    model,
    messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    stream: true
  });
  let buffer = "";
  makeRequest(
    {
      hostname: "api.openai.com",
      path: "/v1/chat/completions",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      }
    },
    body,
    (chunk) => {
      buffer += chunk;
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";
      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const raw = line.slice(6).trim();
        if (raw === "[DONE]") return;
        try {
          const data = JSON.parse(raw);
          if (data.choices?.[0]?.delta?.content) {
            onToken(data.choices[0].delta.content);
          }
        } catch {
        }
      }
    },
    onDone,
    onError
  );
}
function streamGemini(messages, apiKey, model, onToken, onDone, onError) {
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }]
  }));
  const body = JSON.stringify({
    contents,
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] }
  });
  let buffer = "";
  makeRequest(
    {
      hostname: "generativelanguage.googleapis.com",
      path: `/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`,
      method: "POST",
      headers: { "Content-Type": "application/json" }
    },
    body,
    (chunk) => {
      buffer += chunk;
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";
      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const raw = line.slice(6).trim();
        if (raw === "[DONE]") return;
        try {
          const data = JSON.parse(raw);
          if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
            onToken(data.candidates[0].content.parts[0].text);
          }
        } catch {
        }
      }
    },
    onDone,
    onError
  );
}
function streamOllama(messages, model, onToken, onDone, onError) {
  const body = JSON.stringify({
    model,
    messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    stream: true
  });
  let buffer = "";
  makeRequest(
    {
      hostname: "localhost",
      port: 11434,
      path: "/api/chat",
      method: "POST",
      headers: { "Content-Type": "application/json" }
    },
    body,
    (chunk) => {
      buffer += chunk;
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";
      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const data = JSON.parse(line);
          if (data.message?.content) {
            onToken(data.message.content);
          }
        } catch {
        }
      }
    },
    onDone,
    onError
  );
}

// src/chat/configManager.ts
var fs2 = __toESM(require("fs"));
var path2 = __toESM(require("path"));
var os = __toESM(require("os"));
var CONFIG_PATH = path2.join(os.homedir(), ".smblsrc");
var ENV_KEY_NAMES = {
  claude: "ANTHROPIC_API_KEY",
  openai: "OPENAI_API_KEY",
  gemini: "GEMINI_API_KEY"
};
function loadAiConfig() {
  try {
    const data = JSON.parse(fs2.readFileSync(CONFIG_PATH, "utf8"));
    return data.ai || {};
  } catch {
    return {};
  }
}
function saveAiConfig(aiConfig) {
  let data = {};
  try {
    data = JSON.parse(fs2.readFileSync(CONFIG_PATH, "utf8"));
  } catch {
  }
  data.ai = { ...data.ai, ...aiConfig };
  fs2.writeFileSync(CONFIG_PATH, JSON.stringify(data, null, 2) + "\n");
}
function getApiKey(provider) {
  const envName = ENV_KEY_NAMES[provider];
  if (envName && process.env[envName]) return process.env[envName];
  const config = loadAiConfig();
  return config[`${provider}ApiKey`] || null;
}
function setApiKey(provider, key) {
  saveAiConfig({ [`${provider}ApiKey`]: key });
}

// src/chat/mcpManager.ts
var fs3 = __toESM(require("fs"));
var path3 = __toESM(require("path"));
var os2 = __toESM(require("os"));
var import_child_process = require("child_process");
var MCP_EDITORS = [
  {
    name: "claude",
    label: "Claude Desktop",
    configPath: path3.join(os2.homedir(), ".claude", "claude_desktop_config.json")
  },
  {
    name: "cursor",
    label: "Cursor",
    configPath: path3.join(os2.homedir(), ".cursor", "mcp.json")
  },
  {
    name: "windsurf",
    label: "Windsurf",
    configPath: path3.join(os2.homedir(), ".windsurf", "mcp.json")
  },
  {
    name: "claude-code",
    label: "Claude Code",
    configPath: path3.join(os2.homedir(), ".claude", "claude_desktop_config.json")
  }
];
function detectMcpEditors() {
  const results = [];
  for (const editor of MCP_EDITORS) {
    const dir = path3.dirname(editor.configPath);
    const exists = fs3.existsSync(dir);
    let hasSymbolsMcp = false;
    let config;
    if (exists) {
      try {
        config = JSON.parse(fs3.readFileSync(editor.configPath, "utf8"));
        const servers = config?.mcpServers || {};
        hasSymbolsMcp = !!(servers["symbols-mcp"] || servers.symbols);
      } catch {
      }
    }
    results.push({
      name: editor.name,
      label: editor.label,
      configPath: editor.configPath,
      exists,
      hasSymbolsMcp,
      config
    });
  }
  return results;
}
function getSymbolsMcpEntry() {
  return {
    command: "uvx",
    args: ["symbols-mcp"]
  };
}
function installMcpForEditor(editor) {
  try {
    let config = {};
    try {
      config = JSON.parse(fs3.readFileSync(editor.configPath, "utf8"));
    } catch {
    }
    if (!config.mcpServers) config.mcpServers = {};
    if (config.mcpServers["symbols-mcp"] || config.mcpServers.symbols) {
      return { success: true, message: `${editor.label}: symbols-mcp already configured` };
    }
    config.mcpServers["symbols-mcp"] = getSymbolsMcpEntry();
    fs3.mkdirSync(path3.dirname(editor.configPath), { recursive: true });
    fs3.writeFileSync(editor.configPath, JSON.stringify(config, null, 2) + "\n");
    return { success: true, message: `${editor.label}: symbols-mcp installed` };
  } catch (err) {
    return { success: false, message: `${editor.label}: ${err.message}` };
  }
}
function removeMcpForEditor(editor) {
  try {
    let config = {};
    try {
      config = JSON.parse(fs3.readFileSync(editor.configPath, "utf8"));
    } catch {
      return { success: true, message: `${editor.label}: no config file found` };
    }
    if (!config.mcpServers) {
      return { success: true, message: `${editor.label}: no MCP servers configured` };
    }
    delete config.mcpServers["symbols-mcp"];
    delete config.mcpServers.symbols;
    fs3.writeFileSync(editor.configPath, JSON.stringify(config, null, 2) + "\n");
    return { success: true, message: `${editor.label}: symbols-mcp removed` };
  } catch (err) {
    return { success: false, message: `${editor.label}: ${err.message}` };
  }
}
function checkMcpServerAvailable() {
  try {
    (0, import_child_process.execSync)("which symbols-mcp 2>/dev/null || where symbols-mcp 2>nul", { timeout: 2e3, stdio: "pipe" });
    return { available: true, method: "direct", detail: "symbols-mcp installed" };
  } catch {
  }
  try {
    (0, import_child_process.execSync)("which uvx 2>/dev/null || where uvx 2>nul", { timeout: 2e3, stdio: "pipe" });
    return { available: true, method: "uvx", detail: "uvx available \u2014 will run via uvx symbols-mcp" };
  } catch {
  }
  try {
    (0, import_child_process.execSync)("which npx 2>/dev/null || where npx 2>nul", { timeout: 2e3, stdio: "pipe" });
    return { available: true, method: "npx", detail: "npx available \u2014 will run via npx @symbo.ls/mcp" };
  } catch {
  }
  return { available: false, method: "none", detail: "symbols-mcp not found. Install: pip install symbols-mcp or npm i -g @symbo.ls/mcp" };
}
function getMcpStatus() {
  const editors = detectMcpEditors();
  const detected = editors.filter((e) => e.exists);
  const configured = editors.filter((e) => e.hasSymbolsMcp);
  let summary;
  if (configured.length > 0) {
    summary = `MCP active in: ${configured.map((e) => e.label).join(", ")}`;
  } else if (detected.length > 0) {
    summary = `Editors detected: ${detected.map((e) => e.label).join(", ")} (MCP not configured)`;
  } else {
    summary = "No AI editors detected";
  }
  return { editors, summary };
}

// src/chat/librariesApi.ts
var https2 = __toESM(require("https"));
var fs4 = __toESM(require("fs"));
var path4 = __toESM(require("path"));
var os3 = __toESM(require("os"));
var DEFAULT_API = "https://api.symbols.app";
var RC_PATH = path4.join(os3.homedir(), ".smblsrc");
function loadRcState() {
  try {
    return JSON.parse(fs4.readFileSync(RC_PATH, "utf8"));
  } catch {
    return {};
  }
}
function getApiBaseUrl() {
  const env = process.env.SYMBOLS_API_BASE_URL || process.env.SMBLS_API_URL;
  if (env) return env;
  const state = loadRcState();
  return state.currentApiBaseUrl || DEFAULT_API;
}
function getAuthToken() {
  const env = process.env.SYMBOLS_TOKEN || process.env.SMBLS_TOKEN;
  if (env) return env;
  const state = loadRcState();
  const baseUrl = state.currentApiBaseUrl || DEFAULT_API;
  if (state.profiles && typeof state.profiles === "object") {
    const profile = state.profiles[baseUrl] || {};
    return profile.authToken || profile.token || profile.accessToken || profile.jwt || null;
  }
  return state.authToken || state.token || state.accessToken || state.jwt || null;
}
function apiRequest(method, pathname, query, body) {
  return new Promise((resolve2, reject) => {
    const baseUrl = getApiBaseUrl();
    const url = new URL(`${baseUrl}${pathname.startsWith("/") ? "" : "/"}${pathname}`);
    if (query) {
      for (const [k, v] of Object.entries(query)) {
        if (v !== void 0 && v !== null && v !== "") {
          url.searchParams.set(k, v);
        }
      }
    }
    const authToken = getAuthToken();
    const headers = {};
    if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
    if (body) headers["Content-Type"] = "application/json";
    const bodyStr = body ? JSON.stringify(body) : void 0;
    const options = {
      hostname: url.hostname,
      port: url.port || void 0,
      path: url.pathname + url.search,
      method,
      headers
    };
    const req = https2.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk.toString();
      });
      res.on("end", () => {
        if (res.statusCode && res.statusCode >= 400) {
          try {
            const parsed = JSON.parse(data);
            reject(new Error(parsed.message || `API error ${res.statusCode}`));
          } catch {
            reject(new Error(`API error ${res.statusCode}: ${data}`));
          }
          return;
        }
        try {
          const json = JSON.parse(data);
          resolve2(json.data || json);
        } catch {
          resolve2(data);
        }
      });
    });
    req.on("error", reject);
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
}
function extractItems(payload) {
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.libraries)) return payload.libraries;
  return [];
}
async function listAvailableLibraries(opts) {
  const query = {};
  if (opts?.page) query.page = String(opts.page);
  if (opts?.limit) query.limit = String(opts.limit);
  if (opts?.search) query.search = opts.search;
  if (opts?.framework) query.framework = opts.framework;
  const payload = await apiRequest("GET", "/core/projects/libraries/available", query);
  return extractItems(payload);
}
async function listProjectLibraries(projectId) {
  const payload = await apiRequest("GET", `/core/projects/${encodeURIComponent(projectId)}/libraries`);
  return extractItems(payload);
}
async function addProjectLibraries(projectId, libraryIds) {
  return apiRequest("POST", `/core/projects/${encodeURIComponent(projectId)}/libraries`, void 0, { libraryIds });
}
async function removeProjectLibraries(projectId, libraryIds) {
  return apiRequest("DELETE", `/core/projects/${encodeURIComponent(projectId)}/libraries`, void 0, { libraryIds });
}
function isAuthenticated() {
  return !!getAuthToken();
}
function resolveProjectId(workspaceRoot) {
  const envId = process.env.SYMBOLS_PROJECT_ID;
  if (envId) return envId;
  if (!workspaceRoot) return null;
  try {
    const configPath = path4.join(workspaceRoot, ".symbols_cache", "config.json");
    const config = JSON.parse(fs4.readFileSync(configPath, "utf8"));
    if (config.projectId) return config.projectId;
  } catch {
  }
  try {
    const lockPath = path4.join(workspaceRoot, ".symbols_cache", "lock.json");
    const lock = JSON.parse(fs4.readFileSync(lockPath, "utf8"));
    if (lock.projectId) return lock.projectId;
  } catch {
  }
  return null;
}

// src/chat/chatPanel.ts
var ChatViewProvider = class {
  constructor(_extensionUri) {
    this._extensionUri = _extensionUri;
    this._messages = [];
  }
  static {
    this.viewType = "symbolsChat";
  }
  resolveWebviewView(webviewView) {
    this._view = webviewView;
    webviewView.webview.options = { enableScripts: true, localResourceRoots: [this._extensionUri] };
    webviewView.webview.html = this._getHtmlFromFile();
    webviewView.webview.onDidReceiveMessage(async (msg) => {
      switch (msg.type) {
        case "sendMessage":
          await this._handleSendMessage(msg.text);
          break;
        case "getConfig":
          this._sendConfig();
          break;
        case "setProvider":
          saveAiConfig({ provider: msg.provider, model: msg.model });
          this._sendConfig();
          break;
        case "setApiKey":
          setApiKey(msg.provider, msg.key);
          this._sendConfig();
          break;
        case "getMcpStatus":
          this._sendMcpStatus();
          break;
        case "installMcp":
          this._handleInstallMcp(msg.editorName);
          break;
        case "removeMcp":
          this._handleRemoveMcp(msg.editorName);
          break;
        case "clearChat":
          this._messages = [];
          break;
        case "openSettings":
          vscode5.commands.executeCommand("workbench.action.openSettings", "symbolsApp");
          break;
        case "insertCode":
          this._insertCode(msg.code);
          break;
        case "listAvailableLibs":
          this._listAvailableLibs(msg.search, msg.page);
          break;
        case "listProjectLibs":
          this._listProjectLibs();
          break;
        case "addLib":
          this._addLib(msg.libraryId);
          break;
        case "removeLib":
          this._removeLib(msg.libraryId);
          break;
        case "getProjectConfig":
          this._sendProjectConfig();
          break;
        case "saveProjectConfig":
          this._saveProjectConfig(msg.config);
          break;
      }
    });
    setTimeout(() => {
      this._sendConfig();
      this._sendMcpStatus();
      this._sendAuthStatus();
    }, 150);
  }
  _getHtmlFromFile() {
    const candidates = [
      path5.join(__dirname, "webview.html"),
      path5.join(this._extensionUri.fsPath, "out", "webview.html"),
      path5.join(this._extensionUri.fsPath, "src", "chat", "webview.html")
    ];
    for (const filePath of candidates) {
      if (fs5.existsSync(filePath)) {
        try {
          return fs5.readFileSync(filePath, "utf8");
        } catch {
        }
      }
    }
    return `<!DOCTYPE html><html><body><p style="color:red;padding:20px">Failed to load webview HTML. Looked in: ${candidates.join(", ")}</p></body></html>`;
  }
  _post(msg) {
    this._view?.webview.postMessage(msg);
  }
  _sendConfig() {
    const config = loadAiConfig();
    const providers = AI_PROVIDERS.filter((p) => !p.disabled);
    const models = config.provider ? PROVIDER_MODELS[config.provider] || [] : [];
    const hasKey = config.provider ? config.provider === "ollama" || !!getApiKey(config.provider) : false;
    this._post({
      type: "config",
      provider: config.provider || "",
      model: config.model || "",
      providers,
      models,
      hasApiKey: hasKey,
      needsSetup: !config.provider || !hasKey && config.provider !== "ollama"
    });
  }
  _sendAuthStatus() {
    this._post({
      type: "authStatus",
      authenticated: isAuthenticated(),
      hasProject: !!this._getProjectId()
    });
  }
  _sendMcpStatus() {
    const status = getMcpStatus();
    let server;
    try {
      server = checkMcpServerAvailable();
    } catch {
      server = { available: false, method: "none", detail: "Could not check availability" };
    }
    this._post({ type: "mcpStatus", editors: status.editors, summary: status.summary, server });
  }
  _handleInstallMcp(name) {
    const ed = getMcpStatus().editors.find((e) => e.name === name);
    if (ed) {
      const r = installMcpForEditor(ed);
      vscode5.window.showInformationMessage(r.message);
      this._sendMcpStatus();
    }
  }
  _handleRemoveMcp(name) {
    const ed = getMcpStatus().editors.find((e) => e.name === name);
    if (ed) {
      const r = removeMcpForEditor(ed);
      vscode5.window.showInformationMessage(r.message);
      this._sendMcpStatus();
    }
  }
  async _listAvailableLibs(search, page) {
    try {
      const libs = await listAvailableLibraries({ search, page: page || 1, limit: 20 });
      this._post({ type: "availableLibs", libs, search: search || "" });
    } catch (err) {
      this._post({ type: "libsError", text: err.message });
    }
  }
  async _listProjectLibs() {
    const pid = this._getProjectId();
    if (!pid) {
      this._post({ type: "libsError", text: "No project linked. Run smbls project link first." });
      return;
    }
    try {
      const libs = await listProjectLibraries(pid);
      this._post({ type: "projectLibs", libs });
    } catch (err) {
      this._post({ type: "libsError", text: err.message });
    }
  }
  async _addLib(id) {
    const pid = this._getProjectId();
    if (!pid) {
      this._post({ type: "libsError", text: "No project linked." });
      return;
    }
    try {
      await addProjectLibraries(pid, [id]);
      vscode5.window.showInformationMessage("Shared library added");
      this._listProjectLibs();
    } catch (err) {
      this._post({ type: "libsError", text: err.message });
    }
  }
  async _removeLib(id) {
    const pid = this._getProjectId();
    if (!pid) {
      this._post({ type: "libsError", text: "No project linked." });
      return;
    }
    try {
      await removeProjectLibraries(pid, [id]);
      vscode5.window.showInformationMessage("Shared library removed");
      this._listProjectLibs();
    } catch (err) {
      this._post({ type: "libsError", text: err.message });
    }
  }
  _getProjectId() {
    const root = vscode5.workspace.workspaceFolders?.[0]?.uri.fsPath;
    return resolveProjectId(root);
  }
  _sendProjectConfig() {
    const root = vscode5.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (!root) {
      this._post({ type: "projectConfig", found: false, config: {} });
      return;
    }
    const cfgPath = path5.join(root, "symbols.json");
    try {
      if (fs5.existsSync(cfgPath)) {
        const config = JSON.parse(fs5.readFileSync(cfgPath, "utf8"));
        this._post({ type: "projectConfig", found: true, config });
      } else {
        this._post({ type: "projectConfig", found: false, config: {} });
      }
    } catch {
      this._post({ type: "projectConfig", found: false, config: {} });
    }
  }
  _saveProjectConfig(config) {
    const root = vscode5.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (!root) {
      this._post({ type: "projectConfigError", text: "No workspace folder open" });
      return;
    }
    const cfgPath = path5.join(root, "symbols.json");
    try {
      let existing = {};
      if (fs5.existsSync(cfgPath)) {
        existing = JSON.parse(fs5.readFileSync(cfgPath, "utf8"));
      }
      const merged = { ...existing, ...config };
      for (const key of Object.keys(merged)) {
        if (merged[key] === "") delete merged[key];
      }
      fs5.writeFileSync(cfgPath, JSON.stringify(merged, null, 2) + "\n", "utf8");
      this._post({ type: "projectConfigSaved" });
    } catch (err) {
      this._post({ type: "projectConfigError", text: err.message });
    }
  }
  async _handleSendMessage(text) {
    const trimmed = text.trim();
    if (trimmed.startsWith("/")) {
      const parts = trimmed.split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);
      if (cmd === "/libraries" || cmd === "/libs") {
        const sub = args[0]?.toLowerCase();
        if (sub === "available" || sub === "search") {
          this._post({ type: "switchTab", tab: "libraries" });
          await this._listAvailableLibs(args.slice(1).join(" ") || void 0);
        } else if (sub === "add" && args[1]) {
          await this._addLib(args[1]);
        } else if (sub === "remove" && args[1]) {
          await this._removeLib(args[1]);
        } else {
          this._post({ type: "switchTab", tab: "libraries" });
          this._listProjectLibs();
          this._listAvailableLibs();
        }
        return;
      }
      if (cmd === "/mcp") {
        this._post({ type: "switchTab", tab: "mcp" });
        this._sendMcpStatus();
        return;
      }
      if (cmd === "/project") {
        this._post({ type: "switchTab", tab: "project" });
        this._sendProjectConfig();
        return;
      }
      if (cmd === "/clear") {
        this._messages = [];
        this._post({ type: "chatCleared" });
        return;
      }
      if (cmd === "/config" || cmd === "/settings") {
        this._post({ type: "switchTab", tab: "settings" });
        return;
      }
      if (cmd === "/help") {
        this._post({ type: "systemMessage", text: "**Commands:** /libraries, /mcp, /project, /config, /clear, /help" });
        return;
      }
    }
    const config = loadAiConfig();
    if (!config.provider || !config.model) {
      this._post({ type: "error", text: "Configure your AI provider in the Settings tab first." });
      return;
    }
    const apiKey = config.provider === "ollama" ? "" : getApiKey(config.provider);
    if (config.provider !== "ollama" && !apiKey) {
      this._post({ type: "error", text: `No API key for ${config.provider}. Set it in Settings tab.` });
      return;
    }
    let content = text;
    if (this._messages.length === 0) {
      const ctx = this._getWorkspaceContext();
      if (ctx) content = `[Context: ${ctx}]

${text}`;
    }
    this._messages.push({ role: "user", content });
    this._post({ type: "streamStart" });
    let response = "";
    streamChat(
      config.provider,
      config.model,
      apiKey || "",
      this._messages,
      (token) => {
        response += token;
        this._post({ type: "streamToken", text: token });
      },
      () => {
        this._messages.push({ role: "assistant", content: response });
        this._post({ type: "streamEnd" });
      },
      (err) => {
        this._messages.pop();
        this._post({ type: "error", text: err.message });
        this._post({ type: "streamEnd" });
      }
    );
  }
  _getWorkspaceContext() {
    const root = vscode5.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (!root) return "";
    try {
      const cfgPath = path5.join(root, "symbols.json");
      if (fs5.existsSync(cfgPath)) {
        const c = JSON.parse(fs5.readFileSync(cfgPath, "utf8"));
        return `Project: ${c.key || "unnamed"}, bundler: ${c.bundler || "parcel"}, dir: ${c.dir || "./symbols"}`;
      }
    } catch {
    }
    return `Workspace: ${path5.basename(root)}`;
  }
  _insertCode(code) {
    const editor = vscode5.window.activeTextEditor;
    if (editor) editor.edit((b) => b.insert(editor.selection.active, code));
  }
};

// src/extension.ts
var LANGUAGES = ["javascript", "typescript", "javascriptreact", "typescriptreact"];
var output;
function activate(context) {
  output = vscode6.window.createOutputChannel("Symbols.app");
  output.appendLine("Symbols.app extension activating...");
  const completionProvider = new DomqlCompletionProvider();
  const hoverProvider = new DomqlHoverProvider();
  const definitionProvider = new DomqlDefinitionProvider();
  for (const lang of LANGUAGES) {
    const selector = { language: lang, scheme: "file" };
    context.subscriptions.push(
      vscode6.languages.registerCompletionItemProvider(
        selector,
        completionProvider,
        ".",
        " ",
        "\n",
        ",",
        ":",
        "'",
        '"'
      )
    );
    context.subscriptions.push(
      vscode6.languages.registerHoverProvider(selector, hoverProvider)
    );
    context.subscriptions.push(
      vscode6.languages.registerDefinitionProvider(selector, definitionProvider)
    );
  }
  const watcher = vscode6.workspace.createFileSystemWatcher("**/*.{js,ts,jsx,tsx}");
  watcher.onDidChange(() => invalidateCache());
  watcher.onDidCreate(() => invalidateCache());
  watcher.onDidDelete(() => invalidateCache());
  context.subscriptions.push(watcher);
  context.subscriptions.push(
    vscode6.commands.registerCommand("symbolsApp.toggle", () => {
      const config = vscode6.workspace.getConfiguration("symbolsApp");
      const current = config.get("enable", true);
      config.update("enable", !current, vscode6.ConfigurationTarget.Global);
      vscode6.window.showInformationMessage(
        `Symbols.app ${!current ? "enabled" : "disabled"}`
      );
    })
  );
  context.subscriptions.push(
    vscode6.commands.registerCommand("symbolsApp.diagnose", () => {
      output.show();
      output.appendLine("--- Diagnostics ---");
      output.appendLine(`Workspace folders: ${vscode6.workspace.workspaceFolders?.map((f) => f.uri.fsPath).join(", ")}`);
      const editor = vscode6.window.activeTextEditor;
      if (editor) {
        output.appendLine(`Active file: ${editor.document.uri.fsPath}`);
        output.appendLine(`Language: ${editor.document.languageId}`);
        const text = editor.document.getText();
        output.appendLine(`File length: ${text.length}`);
        output.appendLine(`Has DOMQL import: ${/from\s+['"](@domql\/|domql|@symbo\.ls\/|smbls)/.test(text)}`);
        output.appendLine(`Has extends/childExtends: ${/\b(extends|childExtends|childExtendsRecursive|onRender|onStateUpdate|onInit)\s*:/.test(text)}`);
        output.appendLine(`Has design system props: ${/\b(flow|theme|round|boxSize|childExtend|widthRange|heightRange)\s*:\s*['"\`]/.test(text)}`);
        output.appendLine(`Has component export: ${/export\s+(?:const|let|var)\s+[A-Z][a-zA-Z0-9]+\s*=\s*\{/.test(text)}`);
      }
      output.appendLine("--- End ---");
      vscode6.window.showInformationMessage("Symbols.app: Check Output panel (Symbols.app channel)");
    })
  );
  const chatProvider = new ChatViewProvider(context.extensionUri);
  context.subscriptions.push(
    vscode6.window.registerWebviewViewProvider(ChatViewProvider.viewType, chatProvider)
  );
  context.subscriptions.push(
    vscode6.commands.registerCommand("symbolsApp.openChat", () => {
      vscode6.commands.executeCommand("symbolsChat.focus");
    })
  );
  output.appendLine("Symbols.app extension activated successfully");
  vscode6.window.showInformationMessage("Symbols.app Connect active");
}
function deactivate() {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
