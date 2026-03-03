export interface MethodInfo {
  label: string
  detail: string
  documentation: string
  snippet: string
}

export const ELEMENT_METHODS: MethodInfo[] = [
  // Traversal
  {
    label: 'lookup',
    detail: 'lookup(key: string | function): element',
    documentation:
      'Walk up the ancestor chain to find an element by key name or predicate.\n\n```js\nel.lookup("Modal")              // find ancestor named Modal\nel.lookup(e => e.props.isRoot)  // find by predicate\n```',
    snippet: 'lookup(${1:"key"})'
  },
  {
    label: 'lookdown',
    detail: 'lookdown(key: string | function): element',
    documentation:
      'Find the first matching descendant by key or predicate.\n\n```js\nel.lookdown("Input")    // find first descendant named Input\n```',
    snippet: 'lookdown(${1:"key"})'
  },
  {
    label: 'lookdownAll',
    detail: 'lookdownAll(key: string | function): element[]',
    documentation: 'Find all matching descendants.\n\n```js\nconst buttons = el.lookdownAll("Button")\n```',
    snippet: 'lookdownAll(${1:"key"})'
  },
  {
    label: 'nextElement',
    detail: 'nextElement(): element | null',
    documentation: 'Returns the next sibling element in parent\'s children.',
    snippet: 'nextElement()'
  },
  {
    label: 'previousElement',
    detail: 'previousElement(): element | null',
    documentation: 'Returns the previous sibling element in parent\'s children.',
    snippet: 'previousElement()'
  },
  {
    label: 'getChildren',
    detail: 'getChildren(): element[]',
    documentation: 'Returns all direct child elements as an array.',
    snippet: 'getChildren()'
  },
  {
    label: 'getPath',
    detail: 'getPath(): string[]',
    documentation: 'Returns the path array from root to this element.',
    snippet: 'getPath()'
  },

  // State navigation
  {
    label: 'getRootState',
    detail: 'getRootState(key?: string): state',
    documentation:
      'Get the app-level root state, or a specific key from it.\n\n```js\nconst rootState = el.getRootState()\nconst user = el.getRootState("user")\n```',
    snippet: 'getRootState(${1:"key"})'
  },
  {
    label: 'getRoot',
    detail: 'getRoot(key?: string): element',
    documentation: 'Get the root element of the tree, or a specific property from it.',
    snippet: 'getRoot(${1:"key"})'
  },
  {
    label: 'getRootData',
    detail: 'getRootData(key?: string): any',
    documentation: 'Get data from the root element.',
    snippet: 'getRootData(${1:"key"})'
  },
  {
    label: 'getRootContext',
    detail: 'getRootContext(key?: string): any',
    documentation: 'Get context from the root.',
    snippet: 'getRootContext(${1:"key"})'
  },
  {
    label: 'getContext',
    detail: 'getContext(key: string): any',
    documentation:
      'Get a value from the element\'s context.\n\n```js\nconst router = el.getContext("functions.router")\n```',
    snippet: 'getContext(${1:"key"})'
  },

  // Updates
  {
    label: 'update',
    detail: 'update(params: object, opts?: object): element',
    documentation:
      'Partially update element properties and trigger re-renders.\n\n```js\nel.update({ text: "New text", color: "primary" })\n```',
    snippet: 'update({ ${1:key}: ${2:value} })'
  },
  {
    label: 'set',
    detail: 'set(params: object, opts?: object): element',
    documentation:
      'Full replacement of element content. Removes existing children and creates new ones.\n\n```js\nel.set({ text: "Replaced content" })\n```',
    snippet: 'set({ ${1:key}: ${2:value} })'
  },
  {
    label: 'setProps',
    detail: 'setProps(params: object, opts?: object): void',
    documentation:
      'Update element props specifically and trigger re-render.\n\n```js\nel.setProps({ disabled: true, color: "error" })\n```',
    snippet: 'setProps({ ${1:key}: ${2:value} })'
  },
  {
    label: 'reset',
    detail: 'reset(opts?: object): void',
    documentation: 'Reset element to its original definition.',
    snippet: 'reset()'
  },

  // DOM
  {
    label: 'setNodeStyles',
    detail: 'setNodeStyles(params: object): void',
    documentation:
      'Apply inline styles directly to the DOM node.\n\n```js\nel.setNodeStyles({ transform: "translateX(100px)", opacity: "0.5" })\n```',
    snippet: 'setNodeStyles({ ${1:transform}: "${2:}" })'
  },
  {
    label: 'remove',
    detail: 'remove(opts?: object): void',
    documentation: 'Remove element from DOM and clean up references.',
    snippet: 'remove()'
  },
  {
    label: 'append',
    detail: 'append(el: object, key?: string, opts?: object): element',
    documentation:
      'Append a new child element.\n\n```js\nel.append({ extends: "Button", text: "New" }, "AddButton")\n```',
    snippet: 'append({ ${1:} }, "${2:key}")'
  },

  // Content
  {
    label: 'updateContent',
    detail: 'updateContent(params: any, opts?: object): void',
    documentation: 'Update the element\'s dynamic content (for elements with `content` prop).',
    snippet: 'updateContent(${1:})'
  },
  {
    label: 'removeContent',
    detail: 'removeContent(opts?: object): void',
    documentation: 'Remove the dynamic content child.',
    snippet: 'removeContent()'
  },

  // Context function calls
  {
    label: 'call',
    detail: 'call(fnKey: string, ...args): any',
    documentation:
      'Call a registered function from context (utils → functions → methods → snippets).\n\n```js\nel.call("exec", props.value, el)      // execute dynamic prop\nel.call("fetchData", el.props.id)     // call context function\nel.call("router", href, root, {})    // navigate\nel.call("isString", value)            // call utility\n```',
    snippet: 'call("${1:fnKey}"${2:, args})'
  },

  // Debugging
  {
    label: 'keys',
    detail: 'keys(): string[]',
    documentation: 'Returns the element\'s own keys (excluding internals).',
    snippet: 'keys()'
  },
  {
    label: 'parse',
    detail: 'parse(excl?: string[]): object',
    documentation: 'Serialize element to a plain object.',
    snippet: 'parse()'
  },
  {
    label: 'parseDeep',
    detail: 'parseDeep(excl?: string[]): object',
    documentation: 'Deep serialize the element tree to a plain object.',
    snippet: 'parseDeep()'
  },
  {
    label: 'verbose',
    detail: 'verbose(...args): void',
    documentation: 'Log detailed element information to the console.',
    snippet: 'verbose()'
  },
  {
    label: 'get',
    detail: 'get(key: string): any',
    documentation: 'Get an element property by key.',
    snippet: 'get("${1:key}")'
  },
  {
    label: 'getRef',
    detail: 'getRef(key: string): any',
    documentation: 'Get a value from the `__ref` internal reference.',
    snippet: 'getRef("${1:key}")'
  },
  {
    label: 'spotByPath',
    detail: 'spotByPath(path: string[]): element',
    documentation: 'Traverse element tree to find element at given path array.',
    snippet: 'spotByPath([${1:}])'
  }
]

export const STATE_METHODS: MethodInfo[] = [
  {
    label: 'update',
    detail: 'state.update(obj: object, opts?: object): void',
    documentation:
      'Partially update state values and trigger re-renders for all dependent elements.\n\n```js\nstate.update({ count: state.count + 1 })\nstate.update({ open: !state.open, loading: false })\n```',
    snippet: 'update({ ${1:key}: ${2:value} })'
  },
  {
    label: 'set',
    detail: 'state.set(val: any, opts?: object): void',
    documentation:
      'Replace the entire state with a new value.\n\n```js\nstate.set({ name: "New", count: 0 })\n```',
    snippet: 'set(${1:value})'
  },
  {
    label: 'reset',
    detail: 'state.reset(opts?: object): void',
    documentation: 'Reset state to its initial values.',
    snippet: 'reset()'
  },
  {
    label: 'toggle',
    detail: 'state.toggle(key: string, opts?: object): void',
    documentation:
      'Flip a boolean state property.\n\n```js\nstate.toggle("open")    // open: false → true → false\nstate.toggle("active")\n```',
    snippet: 'toggle("${1:key}")'
  },
  {
    label: 'remove',
    detail: 'state.remove(key?: string, opts?: object): void',
    documentation: 'Remove a property (or the whole state node) from state.',
    snippet: 'remove("${1:key}")'
  },
  {
    label: 'add',
    detail: 'state.add(value: any, opts?: object): void',
    documentation: 'Push an item to an array state.\n\n```js\nstate.add({ id: 1, text: "New item" })\n```',
    snippet: 'add(${1:value})'
  },
  {
    label: 'quietUpdate',
    detail: 'state.quietUpdate(obj: object, opts?: object): void',
    documentation: 'Update state WITHOUT triggering listeners or re-renders. Useful for internal tracking.',
    snippet: 'quietUpdate({ ${1:key}: ${2:value} })'
  },
  {
    label: 'quietReplace',
    detail: 'state.quietReplace(obj: object, opts?: object): void',
    documentation: 'Replace state values without triggering listeners.',
    snippet: 'quietReplace({ ${1:key}: ${2:value} })'
  },
  {
    label: 'replace',
    detail: 'state.replace(obj: object, opts?: object): void',
    documentation: 'Replace state values (triggers listeners).',
    snippet: 'replace({ ${1:key}: ${2:value} })'
  },
  {
    label: 'apply',
    detail: 'state.apply(func: function, opts?: object): void',
    documentation:
      'Mutate state with a function (for array operations like push).\n\n```js\nstate.apply(s => { s.items.push(newItem) })\n```',
    snippet: 'apply(s => { ${1:} })'
  },
  {
    label: 'applyFunction',
    detail: 'state.applyFunction(func: function, opts?: object): Promise<void>',
    documentation: 'Async version of apply.',
    snippet: 'applyFunction(async s => { ${1:} })'
  },
  {
    label: 'setByPath',
    detail: 'state.setByPath(path: string, value: any, opts?: object): void',
    documentation:
      'Set a nested property using dot-path string.\n\n```js\nstate.setByPath("user.profile.name", "Alice")\n```',
    snippet: 'setByPath("${1:path}", ${2:value})'
  },
  {
    label: 'getByPath',
    detail: 'state.getByPath(path: string, opts?: object): any',
    documentation:
      'Get a nested value by dot-path string.\n\n```js\nconst name = state.getByPath("user.profile.name")\n```',
    snippet: 'getByPath("${1:path}")'
  },
  {
    label: 'setPathCollection',
    detail: 'state.setPathCollection(changes: object, opts?: object): void',
    documentation: 'Batch update multiple nested paths at once.',
    snippet: 'setPathCollection({ "${1:path}": ${2:value} })'
  },
  {
    label: 'removeByPath',
    detail: 'state.removeByPath(path: string, opts?: object): void',
    documentation: 'Remove a nested property by dot-path string.',
    snippet: 'removeByPath("${1:path}")'
  },
  {
    label: 'removePathCollection',
    detail: 'state.removePathCollection(changes: object, opts?: object): void',
    documentation: 'Batch remove multiple nested paths.',
    snippet: 'removePathCollection({ "${1:path}": ${2:true} })'
  },
  {
    label: 'parse',
    detail: 'state.parse(): object',
    documentation: 'Return state as plain object (strips methods and internal keys).',
    snippet: 'parse()'
  },
  {
    label: 'clean',
    detail: 'state.clean(opts?: object): void',
    documentation: 'Clear all state properties.',
    snippet: 'clean()'
  },
  {
    label: 'destroy',
    detail: 'state.destroy(opts?: object): void',
    documentation: 'Destroy state and sever element relationship.',
    snippet: 'destroy()'
  },
  {
    label: 'parentUpdate',
    detail: 'state.parentUpdate(obj: object, opts?: object): void',
    documentation: 'Update parent element\'s state.',
    snippet: 'parentUpdate({ ${1:key}: ${2:value} })'
  },
  {
    label: 'rootUpdate',
    detail: 'state.rootUpdate(obj: object, opts?: object): void',
    documentation: 'Update the root application state.',
    snippet: 'rootUpdate({ ${1:key}: ${2:value} })'
  },
  {
    label: 'keys',
    detail: 'state.keys(): string[]',
    documentation: 'Returns state property keys.',
    snippet: 'keys()'
  },
  {
    label: 'values',
    detail: 'state.values(): any[]',
    documentation: 'Returns state property values.',
    snippet: 'values()'
  }
]

export const HTML_ATTRIBUTES = [
  // Global
  'id', 'class', 'style', 'title', 'lang', 'dir', 'hidden', 'tabindex', 'contenteditable',
  'draggable', 'spellcheck', 'translate', 'accesskey',
  // Data
  'data-id', 'data-key', 'data-value', 'data-index', 'data-type', 'data-name',
  // Input
  'type', 'name', 'value', 'placeholder', 'required', 'disabled', 'readonly',
  'checked', 'selected', 'multiple', 'min', 'max', 'step', 'maxlength', 'minlength',
  'pattern', 'autocomplete', 'autofocus', 'form', 'formaction', 'formmethod',
  'accept', 'capture',
  // Link/Anchor
  'href', 'target', 'rel', 'download', 'hreflang', 'ping', 'referrerpolicy',
  // Media
  'src', 'alt', 'loading', 'decoding', 'crossorigin', 'usemap',
  'controls', 'autoplay', 'muted', 'loop', 'preload', 'poster',
  'width', 'height',
  // Forms
  'action', 'method', 'enctype', 'novalidate',
  'for', 'colspan', 'rowspan', 'scope',
  // ARIA
  'role', 'aria-label', 'aria-labelledby', 'aria-describedby', 'aria-hidden',
  'aria-expanded', 'aria-selected', 'aria-checked', 'aria-disabled',
  'aria-controls', 'aria-owns', 'aria-live', 'aria-atomic', 'aria-relevant',
  'aria-busy', 'aria-current', 'aria-haspopup', 'aria-modal', 'aria-multiline',
  'aria-multiselectable', 'aria-orientation', 'aria-placeholder',
  'aria-readonly', 'aria-required', 'aria-sort', 'aria-valuemax',
  'aria-valuemin', 'aria-valuenow', 'aria-valuetext',
  // Other
  'tabindex', 'contenteditable', 'autofocus', 'sandbox', 'allow', 'frameborder'
]
