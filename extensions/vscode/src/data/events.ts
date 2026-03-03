export interface EventInfo {
  label: string
  detail: string
  documentation: string
  snippet: string
  isDomqlLifecycle: boolean
}

export const DOM_EVENTS: EventInfo[] = [
  {
    label: 'onClick',
    detail: 'onClick: (event, el, state) => void',
    documentation:
      'Mouse click event handler.\n\n```js\nonClick: (event, el, state) => {\n  event.preventDefault()\n  state.update({ active: true })\n}\n```',
    snippet: 'onClick: (event, el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: false
  },
  {
    label: 'onDblclick',
    detail: 'onDblclick: (event, el, state) => void',
    documentation: 'Double-click event handler.',
    snippet: 'onDblclick: (event, el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: false
  },
  {
    label: 'onChange',
    detail: 'onChange: (event, el, state) => void',
    documentation:
      'Input change event handler. Fires when value commits (on blur for text inputs, immediately for checkboxes/selects).\n\n```js\nonChange: (event, el, state) => {\n  state.update({ value: event.target.value })\n}\n```',
    snippet: 'onChange: (event, el, state) => {\n  state.update({ ${1:value}: event.target.value })\n},',
    isDomqlLifecycle: false
  },
  {
    label: 'onInput',
    detail: 'onInput: (event, el, state) => void',
    documentation:
      'Input event handler. Fires on every keystroke.\n\n```js\nonInput: (event, el, state) => {\n  state.update({ value: event.target.value })\n}\n```',
    snippet: 'onInput: (event, el, state) => {\n  state.update({ ${1:value}: event.target.value })\n},',
    isDomqlLifecycle: false
  },
  {
    label: 'onSubmit',
    detail: 'onSubmit: (event, el, state) => void',
    documentation:
      'Form submit event handler.\n\n```js\nonSubmit: (event, el, state) => {\n  event.preventDefault()\n  el.call("submitForm", state)\n}\n```',
    snippet: 'onSubmit: (event, el, state) => {\n  event.preventDefault()\n  ${1:}\n},',
    isDomqlLifecycle: false
  },
  {
    label: 'onKeydown',
    detail: 'onKeydown: (event, el, state) => void',
    documentation:
      'Keydown event handler.\n\n```js\nonKeydown: (event, el, state) => {\n  if (event.key === "Enter") el.call("submit")\n  if (event.key === "Escape") state.update({ open: false })\n}\n```',
    snippet: 'onKeydown: (event, el, state) => {\n  if (event.key === "${1:Enter}") ${2:}\n},',
    isDomqlLifecycle: false
  },
  {
    label: 'onKeyup',
    detail: 'onKeyup: (event, el, state) => void',
    documentation: 'Keyup event handler.',
    snippet: 'onKeyup: (event, el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: false
  },
  {
    label: 'onKeypress',
    detail: 'onKeypress: (event, el, state) => void',
    documentation: 'Keypress event handler (deprecated, prefer onKeydown).',
    snippet: 'onKeypress: (event, el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: false
  },
  {
    label: 'onFocus',
    detail: 'onFocus: (event, el, state) => void',
    documentation: 'Focus event handler.',
    snippet: 'onFocus: (event, el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: false
  },
  {
    label: 'onBlur',
    detail: 'onBlur: (event, el, state) => void',
    documentation: 'Blur (focus lost) event handler.',
    snippet: 'onBlur: (event, el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: false
  },
  {
    label: 'onFocusin',
    detail: 'onFocusin: (event, el, state) => void',
    documentation: 'Focusin event (bubbles, unlike focus).',
    snippet: 'onFocusin: (event, el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: false
  },
  {
    label: 'onFocusout',
    detail: 'onFocusout: (event, el, state) => void',
    documentation: 'Focusout event (bubbles, unlike blur).',
    snippet: 'onFocusout: (event, el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: false
  },
  {
    label: 'onMouseover',
    detail: 'onMouseover: (event, el, state) => void',
    documentation: 'Mouseover event handler (fires on children too).',
    snippet: 'onMouseover: (event, el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: false
  },
  {
    label: 'onMouseout',
    detail: 'onMouseout: (event, el, state) => void',
    documentation: 'Mouseout event handler.',
    snippet: 'onMouseout: (event, el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: false
  },
  {
    label: 'onMouseenter',
    detail: 'onMouseenter: (event, el, state) => void',
    documentation: 'Mouseenter event (does not bubble).',
    snippet: 'onMouseenter: (event, el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: false
  },
  {
    label: 'onMouseleave',
    detail: 'onMouseleave: (event, el, state) => void',
    documentation: 'Mouseleave event (does not bubble).',
    snippet: 'onMouseleave: (event, el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: false
  },
  {
    label: 'onMousedown',
    detail: 'onMousedown: (event, el, state) => void',
    documentation: 'Mousedown event handler.',
    snippet: 'onMousedown: (event, el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: false
  },
  {
    label: 'onMouseup',
    detail: 'onMouseup: (event, el, state) => void',
    documentation: 'Mouseup event handler.',
    snippet: 'onMouseup: (event, el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: false
  },
  {
    label: 'onWheel',
    detail: 'onWheel: (event, el, state) => void',
    documentation: 'Wheel/scroll event handler.',
    snippet: 'onWheel: (event, el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: false
  },
  {
    label: 'onScroll',
    detail: 'onScroll: (event, el, state) => void',
    documentation: 'Scroll event handler.',
    snippet: 'onScroll: (event, el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: false
  },
  {
    label: 'onContextmenu',
    detail: 'onContextmenu: (event, el, state) => void',
    documentation: 'Context menu (right-click) event handler.',
    snippet: 'onContextmenu: (event, el, state) => {\n  event.preventDefault()\n  ${1:}\n},',
    isDomqlLifecycle: false
  },
  {
    label: 'onDrag',
    detail: 'onDrag: (event, el, state) => void',
    documentation: 'Drag event handler.',
    snippet: 'onDrag: (event, el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: false
  },
  {
    label: 'onDragstart',
    detail: 'onDragstart: (event, el, state) => void',
    documentation: 'Dragstart event handler.',
    snippet: 'onDragstart: (event, el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: false
  },
  {
    label: 'onDragend',
    detail: 'onDragend: (event, el, state) => void',
    documentation: 'Dragend event handler.',
    snippet: 'onDragend: (event, el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: false
  },
  {
    label: 'onDragover',
    detail: 'onDragover: (event, el, state) => void',
    documentation: 'Dragover event (fires on drop target).',
    snippet: 'onDragover: (event, el, state) => {\n  event.preventDefault()\n  ${1:}\n},',
    isDomqlLifecycle: false
  },
  {
    label: 'onDragenter',
    detail: 'onDragenter: (event, el, state) => void',
    documentation: 'Dragenter event (fires when dragged element enters drop target).',
    snippet: 'onDragenter: (event, el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: false
  },
  {
    label: 'onDragleave',
    detail: 'onDragleave: (event, el, state) => void',
    documentation: 'Dragleave event.',
    snippet: 'onDragleave: (event, el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: false
  },
  {
    label: 'onDrop',
    detail: 'onDrop: (event, el, state) => void',
    documentation: 'Drop event handler.',
    snippet: 'onDrop: (event, el, state) => {\n  event.preventDefault()\n  ${1:}\n},',
    isDomqlLifecycle: false
  },
  {
    label: 'onTouchstart',
    detail: 'onTouchstart: (event, el, state) => void',
    documentation: 'Touch start event handler.',
    snippet: 'onTouchstart: (event, el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: false
  },
  {
    label: 'onTouchend',
    detail: 'onTouchend: (event, el, state) => void',
    documentation: 'Touch end event handler.',
    snippet: 'onTouchend: (event, el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: false
  },
  {
    label: 'onTouchmove',
    detail: 'onTouchmove: (event, el, state) => void',
    documentation: 'Touch move event handler.',
    snippet: 'onTouchmove: (event, el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: false
  },
  {
    label: 'onResize',
    detail: 'onResize: (event, el, state) => void',
    documentation: 'Resize event handler.',
    snippet: 'onResize: (event, el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: false
  },
  {
    label: 'onPointerdown',
    detail: 'onPointerdown: (event, el, state) => void',
    documentation: 'Pointer down event handler (touch + mouse unified).',
    snippet: 'onPointerdown: (event, el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: false
  },
  {
    label: 'onPointerup',
    detail: 'onPointerup: (event, el, state) => void',
    documentation: 'Pointer up event handler.',
    snippet: 'onPointerup: (event, el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: false
  },
  {
    label: 'onPointermove',
    detail: 'onPointermove: (event, el, state) => void',
    documentation: 'Pointer move event handler.',
    snippet: 'onPointermove: (event, el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: false
  }
]

export const DOMQL_LIFECYCLE_EVENTS: EventInfo[] = [
  {
    label: 'onRender',
    detail: 'onRender: (el, state) => void',
    documentation:
      'Fires after the element is rendered into the DOM. Ideal for setup, data fetching, or third-party library initialization.\n\n```js\nonRender: async (el, state) => {\n  const data = await el.call("fetchData", el.props.id)\n  state.update({ data, loading: false })\n}\n```',
    snippet: 'onRender: async (el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: true
  },
  {
    label: 'onInit',
    detail: 'onInit: (el, state) => void',
    documentation:
      'Fires before the element renders. Used for early setup before DOM creation.',
    snippet: 'onInit: (el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: true
  },
  {
    label: 'onUpdate',
    detail: 'onUpdate: (el, state) => void',
    documentation:
      'Fires after any element update (props or state). Receives the updated element.',
    snippet: 'onUpdate: (el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: true
  },
  {
    label: 'onStateUpdate',
    detail: 'onStateUpdate: (el, state) => void',
    documentation:
      'Fires specifically after state updates. More focused than `onUpdate`.\n\n```js\nonStateUpdate: (el, state) => {\n  if (state.active) el.node.focus()\n}\n```',
    snippet: 'onStateUpdate: (el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: true
  },
  {
    label: 'onCreate',
    detail: 'onCreate: (el, state) => void',
    documentation: 'Fires when the element is fully created (after children are created).',
    snippet: 'onCreate: (el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: true
  },
  {
    label: 'onDone',
    detail: 'onDone: (el, state) => void',
    documentation: 'Fires when the element creation cycle is complete.',
    snippet: 'onDone: (el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: true
  },
  {
    label: 'onComplete',
    detail: 'onComplete: (el, state) => void',
    documentation: 'Fires when the full element tree is complete.',
    snippet: 'onComplete: (el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: true
  },
  {
    label: 'onStateInit',
    detail: 'onStateInit: (el, state) => void',
    documentation: 'Fires when state is initialized for the first time.',
    snippet: 'onStateInit: (el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: true
  },
  {
    label: 'onStateCreated',
    detail: 'onStateCreated: (el, state) => void',
    documentation: 'Fires right after state object creation.',
    snippet: 'onStateCreated: (el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: true
  },
  {
    label: 'onBeforeStateUpdate',
    detail: 'onBeforeStateUpdate: (el, state) => void',
    documentation: 'Fires before a state update is applied.',
    snippet: 'onBeforeStateUpdate: (el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: true
  },
  {
    label: 'onBeforeUpdate',
    detail: 'onBeforeUpdate: (el, state) => void',
    documentation: 'Fires before an element update.',
    snippet: 'onBeforeUpdate: (el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: true
  },
  {
    label: 'onBeforeClassAssign',
    detail: 'onBeforeClassAssign: (el, state) => void',
    documentation: 'Fires before CSS classes are assigned to the element.',
    snippet: 'onBeforeClassAssign: (el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: true
  },
  {
    label: 'onAttachNode',
    detail: 'onAttachNode: (el, state) => void',
    documentation: 'Fires when the DOM node is attached to parent.',
    snippet: 'onAttachNode: (el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: true
  },
  {
    label: 'onFrame',
    detail: 'onFrame: (el, state) => void',
    documentation:
      'Fires on every animation frame. Element must have animation frame enabled.\n\n```js\nonFrame: (el) => {\n  el.setNodeStyles({ transform: `translateX(${el.data.x}px)` })\n}\n```',
    snippet: 'onFrame: (el, state) => {\n  ${1:}\n},',
    isDomqlLifecycle: true
  }
]

export const ALL_EVENTS = [...DOM_EVENTS, ...DOMQL_LIFECYCLE_EVENTS]
