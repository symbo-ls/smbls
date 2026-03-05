# @domql/router

Client-side router plugin for DOMQL. Handles route matching, navigation, scroll management, and state updates within DOMQL elements.

## Install

```bash
npm install @domql/router
```

## Basic Usage

```js
import { router } from '@domql/router'

// Navigate to a path
router('/about', element)

// With state and options
router('/dashboard', element, { userId: 1 }, { scrollToTop: true })
```

Define routes on your DOMQL element:

```js
const App = {
  routes: {
    '/': HomePage,
    '/about': AboutPage,
    '/contact': ContactPage,
    '/*': NotFoundPage
  }
}
```

## Dynamic Route Params

Match routes with `:param` segments. Enable with `useParamsMatching: true`.

```js
const App = {
  routes: {
    '/': HomePage,
    '/:id': UserPage,
    '/:category/:slug': ArticlePage,
    '/*': NotFoundPage
  }
}

router('/users/42', element, {}, { useParamsMatching: true })
// state.params = { id: '42' }

router('/tech/my-article', element, {}, { useParamsMatching: true })
// state.params = { category: 'tech', slug: 'my-article' }
```

Exact segments score higher than params, so `/about` will match a literal `/about` route before `/:id`.

## Query String Parsing

Query parameters are automatically parsed and stored in state.

```js
router('/search?q=hello&tag=a&tag=b', element)
// state.query = { q: 'hello', tag: ['a', 'b'] }
```

Duplicate keys are collected into arrays.

## Guards / Middleware

Run async guard functions before navigation. Return `true` to allow, `false` to block, or a string to redirect.

```js
const authGuard = ({ element }) => {
  if (!element.state.root.isLoggedIn) return '/login'
  return true
}

const roleGuard = ({ params }) => {
  if (params.section === 'admin') return false
  return true
}

router('/dashboard', element, {}, {
  guards: [authGuard, roleGuard]
})
```

Guard functions receive a context object:

```js
{
  pathname,  // full pathname
  route,     // matched route key
  params,    // dynamic route params
  query,     // parsed query string
  hash,      // URL hash
  element,   // DOMQL element
  state      // navigation state
}
```

## 404 Handling

Provide an `onNotFound` callback for unmatched routes:

```js
router('/unknown', element, {}, {
  onNotFound: ({ pathname, route, element }) => {
    console.warn(`No route found for ${pathname}`)
  }
})
```

You can also define a `/*` wildcard route as a catch-all fallback.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `level` | `number` | `0` | Route nesting level (which path segment to match) |
| `pushState` | `boolean` | `true` | Push to browser history |
| `initialRender` | `boolean` | `false` | Whether this is the initial page render |
| `scrollToTop` | `boolean` | `true` | Scroll to top after navigation |
| `scrollToNode` | `boolean` | `false` | Scroll within the element node |
| `scrollNode` | `Element` | `document.documentElement` | Node to scroll |
| `scrollToOffset` | `number` | `0` | Offset when scrolling to hash anchors |
| `scrollToOptions` | `object` | `{ behavior: 'smooth' }` | Options passed to `scrollTo()` |
| `useFragment` | `boolean` | `false` | Use fragment tag for content |
| `updateState` | `boolean` | `true` | Update element state on navigation |
| `contentElementKey` | `string` | `'content'` | Key for the content element slot |
| `removeOldElement` | `boolean` | `false` | Remove old content element before setting new |
| `useParamsMatching` | `boolean` | `false` | Enable dynamic `:param` route matching |
| `guards` | `function[]` | `undefined` | Array of guard/middleware functions |
| `onNotFound` | `function` | `undefined` | Callback when no route matches |

## Exported Utilities

### `getActiveRoute(level, route)`

Returns the active route segment at the given nesting level.

```js
import { getActiveRoute } from '@domql/router'

getActiveRoute(0, '/users/42')  // '/users'
getActiveRoute(1, '/users/42')  // '/42'
```

### `parseQuery(search)`

Parses a query string into an object.

```js
import { parseQuery } from '@domql/router'

parseQuery('?page=1&sort=name')  // { page: '1', sort: 'name' }
```

### `matchRoute(pathname, routes, level)`

Matches a pathname against a routes object. Returns `{ key, content, params }`.

```js
import { matchRoute } from '@domql/router'

const routes = { '/': Home, '/:id': Detail, '/*': NotFound }
const result = matchRoute('/42', routes)
// { key: '/:id', content: Detail, params: { id: '42' } }
```

### `parseRoutePattern(pattern)`

Parses a route pattern string into segments, param definitions, and wildcard flag. Results are cached.

### `runGuards(guards, context)`

Runs an array of async guard functions sequentially. Returns `true`, `false`, or a redirect path string.

## Events

The router triggers an `on.routeChanged` event on the element after navigation completes. Listen for it in your element definition:

```js
const App = {
  routes: { ... },
  on: {
    routeChanged: (element, options) => {
      console.log('Route changed:', element.state.route)
    }
  }
}
```

## License

MIT
