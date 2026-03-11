'use strict'

import { document, window, triggerEventOn } from '@domql/utils'
import { setContentKey } from '@domql/element/set'

// --- Route matching utilities ---

const paramPattern = /^:(.+)/
const wildcardPattern = /^\*$/

const routeCache = new Map()

export const parseRoutePattern = (pattern) => {
  const cached = routeCache.get(pattern)
  if (cached) return cached

  const segments = pattern.replace(/^\//, '').split('/')
  const params = []
  let hasWildcard = false

  for (let i = 0; i < segments.length; i++) {
    const match = segments[i].match(paramPattern)
    if (match) {
      params.push({ index: i, name: match[1] })
    } else if (wildcardPattern.test(segments[i])) {
      hasWildcard = true
    }
  }

  const result = { segments, params, hasWildcard, pattern }
  routeCache.set(pattern, result)
  return result
}

export const matchRoute = (pathname, routes, level = 0) => {
  const pathSegments = pathname.replace(/^\//, '').split('/').filter(Boolean)
  const relevantSegments = pathSegments.slice(level)
  const routePath = '/' + (relevantSegments[0] || '')

  let bestMatch = null
  let bestScore = -1
  let matchedParams = {}

  for (const key in routes) {
    if (key === '/*') continue

    const parsed = parseRoutePattern(key)
    const score = scoreMatch(relevantSegments, parsed)

    if (score > bestScore) {
      bestScore = score
      bestMatch = key
      matchedParams = extractParams(relevantSegments, parsed)
    }
  }

  if (!bestMatch && routes['/*']) {
    bestMatch = '/*'
  }

  return {
    key: bestMatch,
    content: bestMatch ? routes[bestMatch] : null,
    params: matchedParams,
    routePath
  }
}

const scoreMatch = (pathSegments, parsed) => {
  const { segments, hasWildcard } = parsed

  if (!hasWildcard && segments.length !== pathSegments.length &&
      segments.length !== 1) {
    // For single-segment patterns, match just the first segment
    if (segments.length > pathSegments.length) return -1
  }

  let score = 0
  const len = Math.min(segments.length, pathSegments.length)

  for (let i = 0; i < len; i++) {
    if (segments[i] === pathSegments[i]) {
      score += 3 // exact match
    } else if (paramPattern.test(segments[i])) {
      score += 1 // param match
    } else if (wildcardPattern.test(segments[i])) {
      score += 0.5
    } else {
      return -1 // no match
    }
  }

  return score
}

const extractParams = (pathSegments, parsed) => {
  const params = {}
  for (const { index, name } of parsed.params) {
    if (pathSegments[index]) {
      params[name] = decodeURIComponent(pathSegments[index])
    }
  }
  return params
}

export const parseQuery = (search) => {
  if (!search || search === '?') return {}
  const params = {}
  const searchParams = new URLSearchParams(search)
  searchParams.forEach((value, key) => {
    if (params[key] !== undefined) {
      if (!Array.isArray(params[key])) params[key] = [params[key]]
      params[key].push(value)
    } else {
      params[key] = value
    }
  })
  return params
}

// --- Route guards / middleware ---

export const runGuards = async (guards, context) => {
  if (!guards || !guards.length) return true
  for (const guard of guards) {
    const result = await guard(context)
    if (result === false) return false
    if (typeof result === 'string') return result // redirect path
  }
  return true
}

// --- Core router ---

export const getActiveRoute = (level = 0, route = window.location.pathname) => {
  const routeArray = route.split('/')
  const activeRoute = routeArray[level + 1]
  if (activeRoute) return `/${activeRoute}`
}

export let lastPathname
export let lastLevel = 0

const defaultOptions = {
  level: lastLevel,
  pushState: true,
  initialRender: false,
  scrollToTop: true,
  scrollToNode: false,
  scrollNode: document && document.documentElement,
  scrollBody: false,
  useFragment: false,
  updateState: true,
  scrollToOffset: 0,
  contentElementKey: 'content',
  scrollToOptions: { behavior: 'smooth' },
  useParamsMatching: false
}

export const router = (path, el, state = {}, options = {}) => {
  const element = el || this
  const win = element.context.window || window
  const doc = element.context.document || document
  const opts = {
    ...defaultOptions,
    ...element.context.routerOptions,
    ...options
  }
  lastLevel = opts.lastLevel

  const ref = element.__ref

  if (
    (opts.contentElementKey !== 'content' &&
      opts.contentElementKey !== ref.contentElementKey) ||
    !ref.contentElementKey
  ) {
    ref.contentElementKey = opts.contentElementKey || 'content'
  }

  const contentElementKey = setContentKey(element, opts)

  const urlObj = new win.URL(win.location.origin + path)
  const { pathname, search, hash } = urlObj

  const query = parseQuery(search)

  const rootNode = element.node
  const hashChanged = hash && hash !== win.location.hash.slice(1)
  const pathChanged = pathname !== lastPathname
  lastPathname = pathname

  // Route matching - support both simple and param-based
  let route, content, params
  if (opts.useParamsMatching) {
    const match = matchRoute(pathname, element.routes, opts.level)
    route = match.routePath
    content = match.content
    params = match.params
  } else {
    route = getActiveRoute(opts.level, pathname)
    content = element.routes[route || '/'] || element.routes['/*']
    params = {}
  }

  const scrollNode = opts.scrollToNode ? rootNode : opts.scrollNode

  if (!content || element.state.root.debugging) {
    element.state.root.debugging = false

    if (opts.onNotFound) {
      opts.onNotFound({ pathname, route, element })
    }
    return
  }

  // Run guards
  if (opts.guards && opts.guards.length) {
    const guardContext = { pathname, route, params, query, hash, element, state }
    const guardResult = runGuards(opts.guards, guardContext)
    if (guardResult === false) return
    if (typeof guardResult === 'string') {
      // Redirect
      return router(guardResult, el, state, { ...options, guards: [] })
    }
  }

  if (opts.pushState) {
    win.history.pushState(state, null, pathname + (search || '') + (hash || ''))
  }

  if (pathChanged || !hashChanged) {
    const stateUpdate = { route, hash, debugging: false }
    if (Object.keys(params).length) stateUpdate.params = params
    if (Object.keys(query).length) stateUpdate.query = query

    if (opts.updateState) {
      element.state.update(
        stateUpdate,
        { preventContentUpdate: true }
      )
    }

    if (contentElementKey && opts.removeOldElement) {
      element[contentElementKey].remove()
    }

    // Merge parent's original content definition (styles like overflow, maxHeight)
    // with the route's content component
    const originContent = element.__ref?.origin?.content
    const contentStyles = {}
    if (originContent) {
      for (const k in originContent) {
        const v = originContent[k]
        if (k === '__ref' || k === 'props' || k === 'node' || k === 'parent' || k === 'key') continue
        if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean' || (typeof v === 'object' && v !== null && !v.node && !v.__ref)) {
          contentStyles[k] = v
        }
      }
    }

    element.set(
      {
        ...contentStyles,
        tag: opts.useFragment && 'fragment',
        extends: content
      },
      { contentElementKey }
    )
  }

  if (opts.scrollToTop) {
    scrollNode.scrollTo({
      ...(opts.scrollToOptions || {}),
      top: 0,
      left: 0
    })
  }
  if (opts.scrollToNode) {
    content[contentElementKey].node.scrollTo({
      ...(opts.scrollToOptions || {}),
      top: 0,
      left: 0
    })
  }

  if (hash) {
    const activeNode = doc.getElementById(hash)
    if (activeNode) {
      const top =
        activeNode.getBoundingClientRect().top +
          rootNode.scrollTop -
          (opts.scrollToOffset || 0)
      scrollNode.scrollTo({
        ...(opts.scrollToOptions || {}),
        top,
        left: 0
      })
    }
  }

  // trigger `on.routeChanged`
  triggerEventOn('routeChanged', element, opts)
}

export default router
