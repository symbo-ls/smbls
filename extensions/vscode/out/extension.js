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
var vscode3 = __toESM(require("vscode"));
var fs = __toESM(require("fs"));
var path = __toESM(require("path"));

// src/providers/completionProvider.ts
var vscode = __toESM(require("vscode"));

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
    label: "children",
    detail: "children: array | function",
    documentation: 'Dynamic child list. Each item becomes a child element using `childExtends` as template.\n\n```js\nchildren: ({ props }) => props.items\nchildren: [{ text: "Item 1" }, { text: "Item 2" }]\n```',
    snippet: "children: ${1:[]},",
    kind: "property"
  },
  {
    label: "childExtends",
    detail: "childExtends: string | object",
    documentation: 'Apply an extend to all direct child elements.\n\n```js\nchildExtends: "Button"\nchildExtends: { padding: "Z2 C", round: "0" }\n```',
    snippet: "childExtends: '${1:ComponentName}',",
    kind: "property"
  },
  {
    label: "childExtendsRecursive",
    detail: "childExtendsRecursive: string | object",
    documentation: 'Apply an extend to ALL descendants recursively.\n\n```js\nchildExtendsRecursive: { fontSize: "A" }\n```',
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
  { label: "flow", detail: "flow: string", documentation: 'Shorthand for `flexDirection`. Common values: `"column"`, `"row"`, `"y"`, `"x"`, `"column-reverse"`' },
  { label: "align", detail: "align: string", documentation: 'Shorthand for `alignItems justifyContent`. E.g. `"center space-between"`, `"center center"`' },
  { label: "round", detail: "round: string", documentation: 'Design token for border-radius. E.g. `"C"`, `"A"`, `"100%"`' },
  { label: "boxSize", detail: "boxSize: string", documentation: "Sets both width and height. Design token or CSS value." },
  { label: "widthRange", detail: "widthRange: string", documentation: "Sets minWidth and maxWidth to the same value." },
  { label: "heightRange", detail: "heightRange: string", documentation: "Sets minHeight and maxHeight to the same value." },
  { label: "theme", detail: "theme: string", documentation: 'Apply a design-system theme token. E.g. `"dialog"`, `"field"`, `"primary"`' },
  { label: "columns", detail: "columns: string", documentation: "Shorthand for `gridTemplateColumns`." },
  { label: "rows", detail: "rows: string", documentation: "Shorthand for `gridTemplateRows`." },
  { label: "wrap", detail: "wrap: string", documentation: 'Shorthand for `flexWrap`. E.g. `"wrap"`, `"nowrap"`' },
  { label: "inset", detail: "inset: string", documentation: "CSS inset shorthand (top, right, bottom, left)." }
];
var STANDARD_CSS_PROPS = [
  // Layout
  { label: "display", detail: "display: string" },
  { label: "position", detail: "position: string" },
  { label: "top", detail: "top: string" },
  { label: "right", detail: "right: string" },
  { label: "bottom", detail: "bottom: string" },
  { label: "left", detail: "left: string" },
  { label: "zIndex", detail: "zIndex: number | string" },
  { label: "overflow", detail: "overflow: string" },
  { label: "overflowX", detail: "overflowX: string" },
  { label: "overflowY", detail: "overflowY: string" },
  { label: "visibility", detail: "visibility: string" },
  // Flexbox
  { label: "flexDirection", detail: "flexDirection: string" },
  { label: "flexFlow", detail: "flexFlow: string" },
  { label: "flexWrap", detail: "flexWrap: string" },
  { label: "flexGrow", detail: "flexGrow: string | number" },
  { label: "flexShrink", detail: "flexShrink: string | number" },
  { label: "flexBasis", detail: "flexBasis: string" },
  { label: "flex", detail: "flex: string" },
  { label: "alignItems", detail: "alignItems: string" },
  { label: "alignContent", detail: "alignContent: string" },
  { label: "alignSelf", detail: "alignSelf: string" },
  { label: "justifyContent", detail: "justifyContent: string" },
  { label: "justifyItems", detail: "justifyItems: string" },
  { label: "justifySelf", detail: "justifySelf: string" },
  { label: "gap", detail: "gap: string", documentation: 'Design token or CSS value. E.g. `"A"`, `"B C"`, `"8px"`' },
  { label: "rowGap", detail: "rowGap: string" },
  { label: "columnGap", detail: "columnGap: string" },
  { label: "order", detail: "order: number" },
  // Grid
  { label: "gridTemplateColumns", detail: "gridTemplateColumns: string" },
  { label: "gridTemplateRows", detail: "gridTemplateRows: string" },
  { label: "gridTemplateAreas", detail: "gridTemplateAreas: string" },
  { label: "gridColumn", detail: "gridColumn: string" },
  { label: "gridRow", detail: "gridRow: string" },
  { label: "gridArea", detail: "gridArea: string" },
  { label: "gridAutoFlow", detail: "gridAutoFlow: string" },
  { label: "gridAutoColumns", detail: "gridAutoColumns: string" },
  { label: "gridAutoRows", detail: "gridAutoRows: string" },
  // Sizing
  { label: "width", detail: "width: string" },
  { label: "height", detail: "height: string" },
  { label: "minWidth", detail: "minWidth: string" },
  { label: "maxWidth", detail: "maxWidth: string" },
  { label: "minHeight", detail: "minHeight: string" },
  { label: "maxHeight", detail: "maxHeight: string" },
  // Spacing
  { label: "padding", detail: "padding: string", documentation: 'Design token or CSS value. E.g. `"A B"`, `"Z2 C"`' },
  { label: "paddingTop", detail: "paddingTop: string" },
  { label: "paddingRight", detail: "paddingRight: string" },
  { label: "paddingBottom", detail: "paddingBottom: string" },
  { label: "paddingLeft", detail: "paddingLeft: string" },
  { label: "paddingInline", detail: "paddingInline: string" },
  { label: "paddingBlock", detail: "paddingBlock: string" },
  { label: "margin", detail: "margin: string" },
  { label: "marginTop", detail: "marginTop: string" },
  { label: "marginRight", detail: "marginRight: string" },
  { label: "marginBottom", detail: "marginBottom: string" },
  { label: "marginLeft", detail: "marginLeft: string" },
  { label: "marginInline", detail: "marginInline: string" },
  { label: "marginBlock", detail: "marginBlock: string" },
  // Background
  { label: "background", detail: "background: string", documentation: 'Color name, design token, or CSS value. E.g. `"codGray"`, `"surface"`, `"primary"`' },
  { label: "backgroundColor", detail: "backgroundColor: string" },
  { label: "backgroundImage", detail: "backgroundImage: string" },
  { label: "backgroundSize", detail: "backgroundSize: string" },
  { label: "backgroundPosition", detail: "backgroundPosition: string" },
  { label: "backgroundRepeat", detail: "backgroundRepeat: string" },
  { label: "backgroundClip", detail: "backgroundClip: string" },
  // Border
  { label: "border", detail: "border: string" },
  { label: "borderTop", detail: "borderTop: string" },
  { label: "borderRight", detail: "borderRight: string" },
  { label: "borderBottom", detail: "borderBottom: string" },
  { label: "borderLeft", detail: "borderLeft: string" },
  { label: "borderWidth", detail: "borderWidth: string" },
  { label: "borderStyle", detail: "borderStyle: string" },
  { label: "borderColor", detail: "borderColor: string" },
  { label: "borderRadius", detail: "borderRadius: string" },
  { label: "borderTopLeftRadius", detail: "borderTopLeftRadius: string" },
  { label: "borderTopRightRadius", detail: "borderTopRightRadius: string" },
  { label: "borderBottomLeftRadius", detail: "borderBottomLeftRadius: string" },
  { label: "borderBottomRightRadius", detail: "borderBottomRightRadius: string" },
  { label: "outline", detail: "outline: string" },
  { label: "outlineOffset", detail: "outlineOffset: string" },
  // Typography
  { label: "color", detail: "color: string", documentation: 'Color name from design system or CSS value. E.g. `"primary"`, `"title"`, `"currentColor"`' },
  { label: "fontSize", detail: "fontSize: string", documentation: 'Design token (e.g. `"A"`, `"B"`, `"C"`) or CSS value.' },
  { label: "fontWeight", detail: "fontWeight: string | number" },
  { label: "fontFamily", detail: "fontFamily: string" },
  { label: "fontStyle", detail: "fontStyle: string" },
  { label: "lineHeight", detail: "lineHeight: string | number" },
  { label: "letterSpacing", detail: "letterSpacing: string" },
  { label: "textAlign", detail: "textAlign: string" },
  { label: "textDecoration", detail: "textDecoration: string" },
  { label: "textTransform", detail: "textTransform: string" },
  { label: "textOverflow", detail: "textOverflow: string" },
  { label: "whiteSpace", detail: "whiteSpace: string" },
  { label: "wordBreak", detail: "wordBreak: string" },
  { label: "wordWrap", detail: "wordWrap: string" },
  // Effects
  { label: "opacity", detail: "opacity: string | number" },
  { label: "boxShadow", detail: "boxShadow: string" },
  { label: "filter", detail: "filter: string" },
  { label: "backdropFilter", detail: "backdropFilter: string" },
  { label: "transform", detail: "transform: string" },
  { label: "transformOrigin", detail: "transformOrigin: string" },
  { label: "transition", detail: "transition: string", documentation: 'E.g. `"B defaultBezier"` using design tokens.' },
  { label: "transitionProperty", detail: "transitionProperty: string" },
  { label: "transitionDuration", detail: "transitionDuration: string" },
  { label: "transitionTimingFunction", detail: "transitionTimingFunction: string" },
  { label: "transitionDelay", detail: "transitionDelay: string" },
  { label: "animation", detail: "animation: string" },
  { label: "animationName", detail: "animationName: string" },
  { label: "animationDuration", detail: "animationDuration: string" },
  // Cursor / pointer
  { label: "cursor", detail: "cursor: string" },
  { label: "pointerEvents", detail: "pointerEvents: string" },
  { label: "userSelect", detail: "userSelect: string" },
  // Misc
  { label: "objectFit", detail: "objectFit: string" },
  { label: "objectPosition", detail: "objectPosition: string" },
  { label: "resize", detail: "resize: string" },
  { label: "content", detail: "content: string" },
  { label: "listStyle", detail: "listStyle: string" },
  { label: "tableLayout", detail: "tableLayout: string" },
  { label: "verticalAlign", detail: "verticalAlign: string" },
  { label: "appearance", detail: "appearance: string" },
  { label: "boxSizing", detail: "boxSizing: string" },
  { label: "isolation", detail: "isolation: string" },
  { label: "mixBlendMode", detail: "mixBlendMode: string" },
  { label: "willChange", detail: "willChange: string" },
  { label: "clipPath", detail: "clipPath: string" },
  { label: "fill", detail: "fill: string" },
  { label: "stroke", detail: "stroke: string" },
  { label: "strokeWidth", detail: "strokeWidth: string | number" }
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

// src/providers/completionProvider.ts
var DOMQL_IMPORT_RE = /from\s+['"](@domql\/|domql|@symbo\.ls\/|smbls)/;
var DOMQL_SIGNATURE_RE = /\b(extends|childExtends|childExtendsRecursive|onRender|onStateUpdate|onInit)\s*:/;
function isDomqlFile(text, detectByImports) {
  if (DOMQL_IMPORT_RE.test(text)) return true;
  if (!detectByImports) return true;
  return DOMQL_SIGNATURE_RE.test(text);
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
function detectContext(document, position) {
  const linePrefix = document.lineAt(position).text.substring(0, position.character);
  if (/\bel\.\s*$/.test(linePrefix)) return "el-method";
  if (/\bstate\.\s*$/.test(linePrefix)) return "state-method";
  const fullText = document.getText();
  const config = vscode.workspace.getConfiguration("symbolsApp");
  if (!isDomqlFile(fullText, config.get("detectByImports", true))) return "none";
  const offset = document.offsetAt(position);
  const enclosingKey = findEnclosingKey(fullText, offset);
  if (enclosingKey === "attr") return "attr-key";
  if (enclosingKey === "state") return "state-key";
  if (enclosingKey === "on") return "on-key";
  if (enclosingKey === "define") return "define-key";
  if (isAtKeyPosition(linePrefix)) return "element-key";
  return "none";
}
function mkItem(label, kind, detail, docs, snippet, sort = "5") {
  const item = new vscode.CompletionItem(label, kind);
  item.detail = detail;
  const md = new vscode.MarkdownString(docs);
  md.isTrusted = true;
  item.documentation = md;
  if (snippet) item.insertText = new vscode.SnippetString(snippet);
  item.sortText = sort + label;
  return item;
}
function getElementKeyCompletions() {
  const config = vscode.workspace.getConfiguration("symbolsApp");
  const items = [];
  for (const k of DOMQL_ALL_KEYS) {
    items.push(mkItem(k.label, vscode.CompletionItemKind.Property, k.detail, k.documentation, k.snippet, "1"));
  }
  for (const ev of DOMQL_LIFECYCLE_EVENTS) {
    items.push(mkItem(ev.label, vscode.CompletionItemKind.Event, ev.detail, ev.documentation, ev.snippet, "2"));
  }
  for (const ev of DOM_EVENTS) {
    items.push(mkItem(ev.label, vscode.CompletionItemKind.Event, ev.detail, ev.documentation, ev.snippet, "3"));
  }
  for (const c of ALL_COMPONENTS) {
    items.push(mkItem(c.label, vscode.CompletionItemKind.Class, c.detail, c.documentation, c.snippet, "4"));
  }
  if (config.get("completeCssProps", true)) {
    for (const p of ALL_CSS_PROPS) {
      items.push(mkItem(p.label, vscode.CompletionItemKind.Property, p.detail, p.documentation ?? "", void 0, "5"));
    }
  }
  return items;
}
function getAttrKeyCompletions() {
  return HTML_ATTRIBUTES.map((attr) => {
    const item = new vscode.CompletionItem(attr, vscode.CompletionItemKind.Property);
    item.detail = `HTML attribute: ${attr}`;
    const needsQuotes = attr.includes("-");
    item.insertText = new vscode.SnippetString(
      needsQuotes ? `"${attr}": \${1:},` : `${attr}: \${1:},`
    );
    return item;
  });
}
function getOnKeyCompletions() {
  return [...DOM_EVENTS, ...DOMQL_LIFECYCLE_EVENTS].map((ev) => {
    const raw = ev.label.charAt(2).toLowerCase() + ev.label.slice(3);
    const item = new vscode.CompletionItem(raw, vscode.CompletionItemKind.Event);
    item.detail = `on.${raw} (v2 \u2014 prefer top-level ${ev.label})`;
    const md = new vscode.MarkdownString(`**v2 style** \u2014 prefer \`${ev.label}\` in v3.

${ev.documentation}`);
    md.isTrusted = true;
    item.documentation = md;
    const sig = ev.isDomqlLifecycle ? `${raw}: (el, state) => {
  \${1:}
},` : `${raw}: (event, el, state) => {
  \${1:}
},`;
    item.insertText = new vscode.SnippetString(sig);
    return item;
  });
}
function getElementMethodCompletions() {
  return ELEMENT_METHODS.map((m) => {
    const item = new vscode.CompletionItem(m.label, vscode.CompletionItemKind.Method);
    item.detail = m.detail;
    const md = new vscode.MarkdownString(m.documentation);
    md.isTrusted = true;
    item.documentation = md;
    item.insertText = new vscode.SnippetString(m.snippet);
    return item;
  });
}
function getStateMethodCompletions() {
  return STATE_METHODS.map((m) => {
    const item = new vscode.CompletionItem(m.label, vscode.CompletionItemKind.Method);
    item.detail = m.detail;
    const md = new vscode.MarkdownString(m.documentation);
    md.isTrusted = true;
    item.documentation = md;
    item.insertText = new vscode.SnippetString(m.snippet);
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
    const item = new vscode.CompletionItem(key, vscode.CompletionItemKind.Property);
    item.detail = `${key}: ${def}`;
    item.documentation = new vscode.MarkdownString(desc);
    item.insertText = new vscode.SnippetString(`${key}: \${1:${def}},`);
    return item;
  });
}
var DomqlCompletionProvider = class {
  provideCompletionItems(document, position) {
    if (!vscode.workspace.getConfiguration("symbolsApp").get("enable", true)) return [];
    switch (detectContext(document, position)) {
      case "el-method":
        return getElementMethodCompletions();
      case "state-method":
        return getStateMethodCompletions();
      case "attr-key":
        return getAttrKeyCompletions();
      case "on-key":
        return getOnKeyCompletions();
      case "state-key":
        return getStateKeyCompletions();
      case "define-key":
        return [mkItem(
          "propName",
          vscode.CompletionItemKind.Property,
          "(param, el, state, context) => void",
          "Custom property transformer \u2014 runs when this key appears on any element.",
          "propName: (param, el, state) => {\n  ${1:}\n},",
          "1"
        )];
      case "element-key":
        return getElementKeyCompletions();
      default:
        return [];
    }
  }
};

// src/providers/hoverProvider.ts
var vscode2 = __toESM(require("vscode"));
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
var DomqlHoverProvider = class {
  provideHover(document, position) {
    if (!vscode2.workspace.getConfiguration("symbolsApp").get("enable", true)) return null;
    const fullText = document.getText();
    const config = vscode2.workspace.getConfiguration("symbolsApp");
    if (!isDomqlFile(fullText, config.get("detectByImports", true))) return null;
    const wordRange = document.getWordRangeAtPosition(position, /[\w.]+/);
    if (!wordRange) return null;
    const word = document.getText(wordRange);
    const docs = keyMap.get(word) ?? keyMap.get(word);
    if (!docs) return null;
    const md = new vscode2.MarkdownString(docs);
    md.isTrusted = true;
    return new vscode2.Hover(md, wordRange);
  }
};

// src/extension.ts
var LANGUAGES = ["javascript", "typescript", "javascriptreact", "typescriptreact"];
function hasSymbolsJson(dir) {
  let current = dir;
  while (true) {
    if (fs.existsSync(path.join(current, "symbols.json"))) return true;
    const parent = path.dirname(current);
    if (parent === current) return false;
    current = parent;
  }
}
function activate(context) {
  const workspaceFolders = vscode3.workspace.workspaceFolders;
  if (!workspaceFolders || !workspaceFolders.some((f) => hasSymbolsJson(f.uri.fsPath))) return;
  const completionProvider = new DomqlCompletionProvider();
  const hoverProvider = new DomqlHoverProvider();
  for (const lang of LANGUAGES) {
    context.subscriptions.push(
      vscode3.languages.registerCompletionItemProvider(
        { language: lang, scheme: "file" },
        completionProvider,
        ".",
        // trigger for el. / state. method completions
        " ",
        // trigger inside objects
        "\n",
        ","
      )
    );
    context.subscriptions.push(
      vscode3.languages.registerHoverProvider(
        { language: lang, scheme: "file" },
        hoverProvider
      )
    );
  }
  context.subscriptions.push(
    vscode3.commands.registerCommand("symbolsApp.toggle", () => {
      const config = vscode3.workspace.getConfiguration("symbolsApp");
      const current = config.get("enable", true);
      config.update("enable", !current, vscode3.ConfigurationTarget.Global);
      vscode3.window.showInformationMessage(
        `Symbols.app ${!current ? "enabled" : "disabled"}`
      );
    })
  );
  vscode3.window.setStatusBarMessage("Symbols.app active", 3e3);
}
function deactivate() {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
