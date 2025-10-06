import { router } from '@domql/router'
import { init } from '@symbo.ls/init'
import { io } from 'socket.io-client'
import { window, overwriteShallow, overwriteDeep } from '@domql/utils'
import { connectedToSymbols, Notifications } from './SyncNotifications'
import { Inspect } from './Inspect'
export { Inspect, Notifications }

const isLocal = process.env.NODE_ENV === 'local'

// ---------------------------------------------
// Utility helpers to apply ops

const deletePath = (obj, path) => {
  if (!obj || !Array.isArray(path)) {
    return
  }
  path.reduce((acc, v, i, arr) => {
    if (acc && v in acc) {
      if (i !== arr.length - 1) {
        return acc[v]
      }
      delete acc[v]
    }
    return void 0
  }, obj)
}

const setPath = (obj, path, value, createNestedObjects = false) => {
  if (!obj || !Array.isArray(path)) {
    return
  }
  path.reduce((acc, v, i, arr) => {
    if (!acc) {
      return void 0
    }
    if (i !== arr.length - 1) {
      if (!acc[v] && createNestedObjects) {
        acc[v] = {}
      }
      return acc[v]
    }
    acc[v] = value
    return void 0
  }, obj)
}

const applyOpsToCtx = (ctx, changes) => {
  const topLevelChanged = new Set()
  if (!Array.isArray(changes)) {
    return topLevelChanged
  }
  for (const [action, path, change] of changes) {
    if (!Array.isArray(path) || !path.length) {
      continue
    }
    topLevelChanged.add(path[0])
    switch (action) {
      case 'delete':
        deletePath(ctx, path)
        break
      case 'update':
      case 'set':
        setPath(ctx, path, change, true)
        break
      default:
        // Unsupported action – ignore
        break
    }
  }
  return topLevelChanged
}

// ---------------------------------------------

const fetchServiceToken = async () => {
  try {
    const urlBase = isLocal
      ? 'http://localhost:8080'
      : 'https://api.symbols.app'
    const res = await window.fetch(`${urlBase}/service-token`, {
      method: 'GET'
    })

    // Attempt to parse JSON first – recent versions return `{ token: "..." }`
    // Fall back to treating the response as raw text for backward-compatibility.
    let txt
    try {
      const json = await res.clone().json()
      if (json && typeof json.token === 'string') {
        return json.token.trim()
      }
      // If json parsing succeeds but no token field, fall back to text below.
      txt = await res.text()
    } catch {
      // Response is not JSON – treat as plain text token.
      txt = await res.text()
    }

    return (txt || '').replace(/\s+/gu, '') || void 0
  } catch (e) {
    console.error('[sync] Failed to fetch service-token', e)
  }
}

const onSnapshot =
  (el, s, ctx) =>
  (payload = {}) => {
    let { data } = payload
    const { schema } = payload
    if (!data) {
      return
    }

    data = el.call(
      'deepDestringifyFunctions',
      data,
      Array.isArray(data) ? [] : {}
    )

    // Overwrite high-level objects shallowly so references are preserved
    Object.entries(data).forEach(([key, val]) => {
      if (ctx[key] && typeof ctx[key] === 'object') {
        if (key === 'designSystem') {
          init(val)
        } else {
          overwriteShallow(ctx[key], val)
        }
      } else {
        ctx[key] = val
      }
    })

    // Optionally make schema available on ctx
    if (schema) {
      ctx.schema = schema
    }

    // Trigger routing so UI reflects latest data
    const { pathname, search, hash } = ctx.window.location
    el.call(
      'router',
      pathname + search + hash,
      el.__ref.root,
      {},
      { scrollToTop: false }
    )
  }

const onOps =
  (el, s, ctx) =>
  (payload = {}) => {
    let { changes } = payload
    if (!changes || !Array.isArray(changes) || !changes.length) {
      return
    }

    changes = el.call(
      'deepDestringifyFunctions',
      changes,
      Array.isArray(changes) ? [] : {}
    )

    const changed = applyOpsToCtx(ctx, changes)

    // React to specific top-level changes
    if (changed.has('state')) {
      const route = ctx.state?.route
      if (route) {
        el.call(
          'router',
          route.replace('/state', '') || '/',
          el.__ref.root,
          {},
          { scrollToTop: false }
        )
      } else {
        s.update(ctx.state)
      }
    }

    if (
      ['pages', 'components', 'snippets', 'functions'].some((k) =>
        changed.has(k)
      )
    ) {
      const { pathname, search, hash } = ctx.window.location
      el.call(
        'router',
        pathname + search + hash,
        el.__ref.root,
        {},
        { scrollToTop: false }
      )
    }

    if (changed.has('designSystem')) {
      init(ctx.designSystem)
    }
  }

export const connectToSocket = async (el, s, ctx) => {
  const token = await fetchServiceToken()
  if (!token) {
    console.warn('[sync] No service token – live collaboration disabled')
    return null
  }

  const projectKey = ctx.key
  if (!projectKey) {
    console.warn(
      '[sync] ctx.key missing – cannot establish collaborative connection'
    )
    return null
  }

  const socketBaseUrl = isLocal
    ? 'http://localhost:8080'
    : 'https://api.symbols.app'

  const socket = io(socketBaseUrl, {
    path: '/collab-socket',
    transports: ['websocket'],
    auth: {
      token,
      projectKey,
      branch: 'main',
      live: true,
      clientType: 'platform'
    },
    reconnectionAttempts: Infinity,
    reconnectionDelayMax: 4000
  })

  socket.on('connect', () => {
    if (ctx.editor?.verbose) {
      console.info('[sync] Connected to collab socket')
    }
  })

  socket.on('snapshot', onSnapshot(el, s, ctx))
  socket.on('ops', onOps(el, s, ctx))

  socket.on('clients', (data) => {
    if (ctx.editor?.verbose) {
      connectedToSymbols(data, el, s)
    }
  })

  socket.on('disconnect', (reason) => {
    if (ctx.editor?.verbose) {
      console.info('[sync] Disconnected from collab socket', reason)
    }
  })

  return socket
}

export const SyncComponent = {
  on: {
    initSync: connectToSocket
  }
}

export const DefaultSyncApp = {
  extend: [SyncComponent, Inspect, Notifications]
}
