'use strict'

// ─────────────────────────────────────────────────────────────────────────────
// funcql examples
//
// Each example shows the original function and its funcql schema equivalent.
// ─────────────────────────────────────────────────────────────────────────────

// ─── 1. Interval timer (onRender) ────────────────────────────────────────────
//
// Original:
//   onRender: (e, t) => {
//     setInterval(() => {
//       t.running && t.update({ time: t.time + 1 })
//     }, 1e3)
//   }
//
export const onRenderTimer = {
  interval: {
    every: 1000,
    if: ['running', [
      ['update', { time: ['+', 'time', 1] }]
    ]]
  }
}

// ─── 2. Play/pause toggle (onClick) ──────────────────────────────────────────
//
// Original:
//   onClick: (e, el, s) => {
//     const audio = el.scope.audio
//     if (!audio) return
//     if (!audio.paused) {
//       audio.pause()
//       el.setProps({ text: 'Play Sound' })
//     } else {
//       audio.play()
//       el.setProps({ text: 'Pause Sound' })
//     }
//   }
//
export const onClickPlayPause = {
  audio: 'scope.audio',
  if: [
    ['!audio', 'return'],
    ['!audio.paused', [
      'audio.pause()',
      ['setProps', { text: 'Play Sound' }]
    ], [
      'audio.play()',
      ['setProps', { text: 'Pause Sound' }]
    ]]
  ]
}

// ─── 3. Async modal opener (onChoose) ────────────────────────────────────────
//
// Original:
//   onChoose: async (ev, el, s, ctx, callee) => {
//     if (callee.props.href && !callee.props.isCanvas) {
//       await el.call('openModal', '/settings', {
//         key: callee.props.href
//       })
//     }
//   }
//
export const onChooseModal = {
  async: true,
  href: 'callee.props.href',
  isCanvas: 'callee.props.isCanvas',
  if: ['href', {
    if: ['!isCanvas', {
      await: [
        ['call', 'openModal', '/settings', { key: 'href' }]
      ]
    }]
  }]
}

// ─── 4. Simple delegation (onClick) ──────────────────────────────────────────
//
// Original:
//   onClick: (f, el, st) => {
//     el.call('openInNewTab')
//   }
//
export const onClickOpenTab = [
  ['call', 'openInNewTab']
]

// ─── 5. Complex async with branching (addLayerChildren) ──────────────────────
//
// Original:
//   export async function addLayerChildren(options) {
//     const { state: s } = this
//     const { key, type } = getSidebarItem(this)
//     const propKey = 'NewChild'
//     const propValue = {}
//     const typePlural = this.getPlural(type)
//     const linePath = getLinePath(s, key, typePlural, propKey)
//     this.sdk.updateData([
//       ['update', linePath, propValue],
//       ['delete', ['schema', typePlural, key, 'code']]
//     ])
//     await this.updateComponentOnCanvas(this.getItem(key), {
//       updatePane: true, cleanCodeStr: true
//     })
//     const newChild = { extend: 'Layer', state: { key: 'NewChild', props: {} } }
//     const newChildKey = '+NewChild'
//     if (options?.isRoot) {
//       s.update({ value: { NewChild: {} } }, { preventUpdate: true })
//       this.lookup('layers').content.append(newChild, newChildKey)
//     } else {
//       s.update({ props: { NewChild: {} } }, { preventUpdate: true })
//       this.parent.parent.append(newChild, newChildKey)
//     }
//   }
//
export const addLayerChildren = {
  async: true,

  s: 'this.state',
  sidebarItem: ['getSidebarItem', 'this'],
  key: 'sidebarItem.key',
  type: 'sidebarItem.type',

  propKey: 'NewChild',
  propValue: {},
  typePlural: ['this.getPlural', 'type'],

  linePath: ['getLinePath', 's', 'key', 'typePlural', 'propKey'],

  _updateData: ['this.sdk.updateData', [
    ['update', 'linePath', 'propValue'],
    ['delete', ['schema', 'typePlural', 'key', 'code']]
  ]],

  await: [
    ['this.updateComponentOnCanvas', ['this.getItem', 'key'], {
      updatePane: true,
      cleanCodeStr: true
    }]
  ],

  newChild: {
    extend: 'Layer',
    state: {
      key: 'NewChild',
      props: {}
    }
  },
  newChildKey: '+NewChild',

  if: ['options.isRoot', [
    ['s.update', { value: { NewChild: {} } }, { preventUpdate: true }],
    ['this.lookup("layers").content.append', 'newChild', 'newChildKey']
  ], [
    ['s.update', { props: { NewChild: {} } }, { preventUpdate: true }],
    ['this.parent.parent.append', 'newChild', 'newChildKey']
  ]]
}

// ─── 6. State toggle ─────────────────────────────────────────────────────────
//
// Original:
//   onClick: (e, el, s) => s.toggle('isActive')
//
export const onClickToggle = [
  ['toggle', 'isActive']
]

// ─── 7. State increment ─────────────────────────────────────────────────────
//
// Original:
//   onClick: (e, el, s) => s.update({ count: s.count + 1 })
//
export const onClickIncrement = [
  ['update', { count: ['+', 'count', 1] }]
]

// ─── 8. Navigate ─────────────────────────────────────────────────────────────
//
// Original:
//   onClick: (e, el) => el.router('/dashboard', el.getRoot())
//
export const onClickNavigate = [
  ['router', '/dashboard', ['getRoot']]
]

// ─── 9. Conditional rendering ────────────────────────────────────────────────
//
// Original:
//   if: (el, s) => s.isLoggedIn && s.hasPermission
//
export const conditionalIf = {
  if: ['isLoggedIn', {
    if: ['hasPermission', true, false]
  }, false]
}

// ─── 10. Fetch and update ────────────────────────────────────────────────────
//
// Original:
//   onRender: async (el, s) => {
//     const data = await fetch('/api/items').then(r => r.json())
//     s.update({ items: data })
//   }
//
export const onRenderFetch = {
  async: true,
  await: [
    ['fetch', '/api/items']
  ],
  data: ['response.json'],
  _update: ['update', { items: 'data' }]
}

// ─── 11. Form submit ─────────────────────────────────────────────────────────
//
// Original:
//   onSubmit: (e, el, s) => {
//     e.preventDefault()
//     el.call('submitForm', { name: s.name, email: s.email })
//   }
//
export const onSubmitForm = [
  'event.preventDefault()',
  ['call', 'submitForm', { name: 'name', email: 'email' }]
]

// ─── 12. Loop over items ─────────────────────────────────────────────────────
//
// Original:
//   onRender: (el, s) => {
//     for (const item of s.items) {
//       el.call('renderItem', item)
//     }
//   }
//
export const onRenderLoop = {
  for: ['item', 'in', 'items', [
    ['call', 'renderItem', 'item']
  ]]
}

// ─── 13. Debounced input ─────────────────────────────────────────────────────
//
// Original:
//   onInput: (e, el, s) => {
//     clearTimeout(s._debounce)
//     s._debounce = setTimeout(() => {
//       s.update({ search: e.target.value })
//     }, 300)
//   }
//
export const onInputDebounced = {
  _clearPrev: ['clearTimeout', '_debounce'],
  timeout: {
    delay: 300,
    do: [
      ['update', { search: 'event.target.value' }]
    ]
  }
}

// ─── 14. Chained async operations ────────────────────────────────────────────
//
// Original:
//   onClick: async (e, el, s) => {
//     await el.call('save')
//     await el.call('refresh')
//     s.update({ saved: true })
//   }
//
export const onClickChainedAsync = {
  async: true,
  await: [
    ['call', 'save'],
    ['call', 'refresh']
  ],
  _done: ['update', { saved: true }]
}

// ─── 15. Root state update with modal ────────────────────────────────────────
//
// Original:
//   onClick: (e, el, s) => s.root.update({ modal: '/add-item' })
//
export const onClickOpenModal = [
  ['root.update', { modal: '/add-item' }]
]

// ─── 16. Keyboard shortcut handler ───────────────────────────────────────────
//
// Original:
//   onKeydown: (e, el, s) => {
//     if (e.key === 'Escape') {
//       s.update({ modal: null, dropdown: null })
//     } else if (e.key === 'Enter' && e.metaKey) {
//       el.call('submit')
//     }
//   }
//
export const onKeydownShortcuts = {
  key: 'event.key',
  metaKey: 'event.metaKey',
  if: [
    ['key', {
      if: [
        ['key === "Escape"', [
          ['update', { modal: null, dropdown: null }]
        ]],
        ['metaKey', {
          if: ['key === "Enter"', [
            ['call', 'submit']
          ]]
        }]
      ]
    }]
  ]
}

// ─── 17. Drag and drop reorder ───────────────────────────────────────────────
//
// Original:
//   onDrop: (e, el, s) => {
//     e.preventDefault()
//     const dragKey = e.dataTransfer.getData('text/plain')
//     const dropKey = s.key
//     if (dragKey !== dropKey) {
//       el.call('reorderItems', dragKey, dropKey)
//     }
//   }
//
export const onDropReorder = {
  dragKey: 'event.dataTransfer.getData("text/plain")',
  dropKey: 'key',
  if: ['dragKey !== dropKey', [
    'event.preventDefault()',
    ['call', 'reorderItems', 'dragKey', 'dropKey']
  ]]
}

// ─── 18. Copy to clipboard ───────────────────────────────────────────────────
//
// Original:
//   onClick: async (e, el, s) => {
//     await navigator.clipboard.writeText(s.value)
//     s.update({ copied: true })
//     setTimeout(() => s.update({ copied: false }), 2000)
//   }
//
export const onClickCopyClipboard = {
  async: true,
  await: [
    ['navigator.clipboard.writeText', 'value']
  ],
  _notify: ['update', { copied: true }],
  timeout: {
    delay: 2000,
    do: [['update', { copied: false }]]
  }
}

// ─── 19. Multi-step wizard navigation ────────────────────────────────────────
//
// Original:
//   onClick: (e, el, s) => {
//     if (s.step < s.totalSteps) {
//       s.update({ step: s.step + 1 })
//     } else {
//       el.call('completeWizard')
//     }
//   }
//
export const onClickWizardNext = {
  if: ['step < totalSteps', [
    ['update', { step: ['+', 'step', 1] }]
  ], [
    ['call', 'completeWizard']
  ]]
}

// ─── 20. Double click to edit ────────────────────────────────────────────────
//
// Original:
//   onDblclick: (e, el, s) => {
//     s.update({ editing: true, editValue: s.text })
//     el.lookup('Input').node.focus()
//   }
//
export const onDblclickEdit = [
  ['update', { editing: true, editValue: 'text' }],
  ['lookup("Input").node.focus']
]

// ─── 21. Scroll-based lazy loading ───────────────────────────────────────────
//
// Original:
//   onScroll: (e, el, s) => {
//     const { scrollTop, scrollHeight, clientHeight } = el.node
//     if (scrollTop + clientHeight >= scrollHeight - 100) {
//       if (!s.loading) {
//         el.call('loadMore')
//       }
//     }
//   }
//
export const onScrollLazyLoad = {
  scrollTop: 'node.scrollTop',
  scrollHeight: 'node.scrollHeight',
  clientHeight: 'node.clientHeight',
  if: ['scrollTop + clientHeight >= scrollHeight - 100', {
    if: ['!loading', [
      ['call', 'loadMore']
    ]]
  }]
}

// ─── 22. Theme toggler ──────────────────────────────────────────────────────
//
// Original:
//   onClick: (e, el, s) => {
//     const next = s.root.globalTheme === 'dark' ? 'light' : 'dark'
//     s.root.update({ globalTheme: next })
//   }
//
export const onClickThemeToggle = {
  current: 'root.globalTheme',
  if: ['current === "dark"', [
    ['root.update', { globalTheme: 'light' }]
  ], [
    ['root.update', { globalTheme: 'dark' }]
  ]]
}

// ─── 23. Filter list by search input ─────────────────────────────────────────
//
// Original:
//   onInput: (e, el, s) => {
//     const query = e.target.value.toLowerCase()
//     const filtered = s.allItems.filter(item =>
//       item.name.toLowerCase().includes(query)
//     )
//     s.update({ search: query, items: filtered })
//   }
//
export const onInputFilterList = {
  query: 'event.target.value',
  _filter: ['call', 'filterItems', 'query'],
  _update: ['update', { search: 'query' }]
}

// ─── 24. Accordion toggle ───────────────────────────────────────────────────
//
// Original:
//   onClick: (e, el, s) => {
//     const isOpen = s.openSection === s.key
//     s.parent.update({ openSection: isOpen ? null : s.key })
//   }
//
export const onClickAccordion = {
  isOpen: 'openSection === key',
  if: ['isOpen', [
    ['parent.update', { openSection: null }]
  ], [
    ['parent.update', { openSection: 'key' }]
  ]]
}

// ─── 25. Tab switching ──────────────────────────────────────────────────────
//
// Original:
//   onClick: (e, el, s) => {
//     s.root.update({ activeTab: s.key })
//   }
//
export const onClickTab = [
  ['root.update', { activeTab: 'key' }]
]

// ─── 26. Confirmation dialog ─────────────────────────────────────────────────
//
// Original:
//   onClick: async (e, el, s) => {
//     const confirmed = await el.call('openConfirm', {
//       title: 'Delete item?',
//       message: 'This action cannot be undone.'
//     })
//     if (confirmed) {
//       await el.call('deleteItem', s.key)
//       s.update({ deleted: true })
//     }
//   }
//
export const onClickConfirmDelete = {
  async: true,
  confirmed: ['call', 'openConfirm', {
    title: 'Delete item?',
    message: 'This action cannot be undone.'
  }],
  if: ['confirmed', {
    await: [
      ['call', 'deleteItem', 'key']
    ],
    _done: ['update', { deleted: true }]
  }]
}

// ─── 27. Resize observer callback ────────────────────────────────────────────
//
// Original:
//   onRender: (el, s) => {
//     const observer = new ResizeObserver(entries => {
//       for (const entry of entries) {
//         s.update({
//           width: entry.contentRect.width,
//           height: entry.contentRect.height
//         })
//       }
//     })
//     observer.observe(el.node)
//     return () => observer.disconnect()
//   }
//
export const onRenderResizeObserver = {
  observe: {
    target: 'node',
    type: 'resize',
    for: ['entry', 'in', 'entries', [
      ['update', {
        width: 'entry.contentRect.width',
        height: 'entry.contentRect.height'
      }]
    ]],
    cleanup: 'disconnect'
  }
}

// ─── 28. Multiple class toggle ───────────────────────────────────────────────
//
// Original:
//   onClick: (e, el, s) => {
//     s.update({
//       isExpanded: !s.isExpanded,
//       isAnimating: true
//     })
//     setTimeout(() => s.update({ isAnimating: false }), 300)
//   }
//
export const onClickExpandToggle = [
  ['update', { isExpanded: '!isExpanded', isAnimating: true }],
  { timeout: { delay: 300, do: [['update', { isAnimating: false }]] } }
]

// ─── 29. Batch state operations ──────────────────────────────────────────────
//
// Original:
//   onClick: (e, el, s) => {
//     s.update({
//       count: 0,
//       items: [],
//       search: '',
//       page: 1
//     })
//   }
//
export const onClickReset = [
  ['update', { count: 0, items: [], search: '', page: 1 }]
]

// ─── 30. Computed value + conditional style ──────────────────────────────────
//
// Original:
//   onStateUpdate: (changes, el, s) => {
//     const progress = (s.current / s.total) * 100
//     el.setProps({
//       width: progress + '%',
//       background: progress >= 100 ? 'green' : 'blue'
//     })
//   }
//
export const onStateUpdateProgress = {
  progress: ['*', ['/', 'current', 'total'], 100],
  if: ['progress >= 100', [
    ['setProps', { width: 'progress', background: 'green' }]
  ], [
    ['setProps', { width: 'progress', background: 'blue' }]
  ]]
}

// ─── 31. Toggle visibility ─────────────────────────────────────────────────
//
// Original:
//   onClick: (e, el, s) => {
//     s.update({ visible: !s.visible })
//   }
//
export const onClickToggleVisibility = [
  ['update', { visible: '!visible' }]
]

// ─── 32. Set value from event target ────────────────────────────────────────
//
// Original:
//   onInput: (e, el, s) => {
//     s.update({ value: e.target.value })
//   }
//
export const onInputSetValue = [
  ['update', { value: 'event.target.value' }]
]

// ─── 33. Prevent default and stop propagation ──────────────────────────────
//
// Original:
//   onClick: (e, el) => {
//     e.preventDefault()
//     e.stopPropagation()
//     el.call('handleClick')
//   }
//
export const onClickPreventAndStop = [
  'event.preventDefault()',
  'event.stopPropagation()',
  ['call', 'handleClick']
]

// ─── 34. Select all / deselect all ─────────────────────────────────────────
//
// Original:
//   onClick: (e, el, s) => {
//     const allSelected = s.items.every(i => i.selected)
//     s.items.forEach(i => { i.selected = !allSelected })
//     s.update({ items: s.items })
//   }
//
export const onClickSelectAll = {
  allSelected: ['items.every', { selected: true }],
  if: ['allSelected', [
    ['call', 'deselectAll']
  ], [
    ['call', 'selectAll']
  ]]
}

// ─── 35. Increment with max limit ──────────────────────────────────────────
//
// Original:
//   onClick: (e, el, s) => {
//     if (s.count < s.max) {
//       s.update({ count: s.count + 1 })
//     }
//   }
//
export const onClickIncrementLimited = {
  if: ['count < max', [
    ['update', { count: ['+', 'count', 1] }]
  ]]
}

// ─── 36. Close on outside click ─────────────────────────────────────────────
//
// Original:
//   onClick: (e, el, s) => {
//     if (!el.node.contains(e.target)) {
//       s.update({ open: false })
//     }
//   }
//
export const onClickOutside = {
  contains: ['node.contains', 'event.target'],
  if: ['!contains', [
    ['update', { open: false }]
  ]]
}

// ─── 37. Batch API calls ───────────────────────────────────────────────────
//
// Original:
//   onClick: async (e, el, s) => {
//     s.update({ loading: true })
//     await Promise.all([
//       el.call('saveProfile'),
//       el.call('saveSettings'),
//       el.call('savePreferences')
//     ])
//     s.update({ loading: false, saved: true })
//   }
//
export const onClickBatchSave = {
  async: true,
  _loading: ['update', { loading: true }],
  await: [
    ['call', 'saveProfile'],
    ['call', 'saveSettings'],
    ['call', 'savePreferences']
  ],
  _done: ['update', { loading: false, saved: true }]
}

// ─── 38. Delegate to parent ────────────────────────────────────────────────
//
// Original:
//   onClick: (e, el, s) => {
//     el.parent.update({ selectedChild: s.key })
//   }
//
export const onClickDelegateToParent = [
  ['parent.update', { selectedChild: 'key' }]
]

// ─── 39. Focus next input ──────────────────────────────────────────────────
//
// Original:
//   onKeydown: (e, el) => {
//     if (e.key === 'Tab') {
//       e.preventDefault()
//       el.call('focusNext')
//     }
//   }
//
export const onKeydownFocusNext = {
  if: ['event.key', {
    if: ['event.key === "Tab"', [
      'event.preventDefault()',
      ['call', 'focusNext']
    ]]
  }]
}

// ─── 40. Counter with reset ────────────────────────────────────────────────
//
// Original:
//   onClick: (e, el, s) => {
//     if (s.count >= 10) {
//       s.update({ count: 0 })
//     } else {
//       s.update({ count: s.count + 1 })
//     }
//   }
//
export const onClickCounterWithReset = {
  if: ['count >= 10', [
    ['update', { count: 0 }]
  ], [
    ['update', { count: ['+', 'count', 1] }]
  ]]
}
