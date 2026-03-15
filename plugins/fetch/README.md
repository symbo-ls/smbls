# @symbo.ls/fetch

Declarative data fetching for DOMQL with pluggable adapters. Supports caching, stale-while-revalidate, pagination, infinite queries, retry, deduplication, optimistic updates, and more.

## Setup

Add `db` to `config.js`:

```js
// Supabase
db: { adapter: 'supabase', projectId: '...', key: '...' }

// Supabase — config from state
db: { adapter: 'supabase', state: 'supabase' }  // merges root state.supabase

// REST
db: {
  adapter: 'rest',
  url: 'https://api.example.com',
  headers: { Authorization: 'Bearer token' },
  fetchOptions: { credentials: 'include', mode: 'cors' },
  auth: {
    baseUrl: 'https://api.example.com/auth',
    sessionUrl: '/me',
    signInUrl: '/login',
    signOutUrl: '/logout'
  }
}

// Local
db: { adapter: 'local', data: { articles: [] }, persist: true }
```

## Declarative `fetch`

```js
// Minimal
{ state: 'articles', fetch: true }

// With options
{ state: 'articles', fetch: { params: { status: 'published' }, cache: '5m', order: { by: 'created_at', asc: false }, limit: 20 } }

// String shorthand
{ state: 'data', fetch: 'blog_posts' }
```

### `as` — state key mapping

```js
{ state: { articles: [], loading: false }, fetch: { from: 'articles', as: 'articles' } }
```

### RPC

```js
{ state: { articles: [] }, fetch: { method: 'rpc', from: 'get_content_rows', params: { p_table: 'articles' }, as: 'articles', cache: '5m' } }
```

### `transform`

```js
{
  state: { featured: null, items: [] },
  fetch: {
    from: 'videos',
    transform: (data) => ({
      featured: data.find(v => v.is_featured) || data[0],
      items: data.filter(v => !v.is_featured)
    })
  }
}
```

### `select` — data selector

Like TanStack's `select`, pick or reshape data before it hits state. Runs after cache read and before `transform`:

```js
{
  state: { titles: [] },
  fetch: {
    from: 'articles',
    select: (data) => data.map(a => a.title)
  }
}
```

### Dynamic params

```js
{
  state: { item: null },
  fetch: {
    method: 'rpc',
    from: 'get_content_rows',
    params: (el) => ({ p_table: 'articles', p_id: window.location.pathname.split('/').pop() }),
    transform: (data) => ({ item: data && data[0] || null })
  }
}
```

### Array fetch (parallel)

```js
{
  state: { articles: [], events: [] },
  fetch: [
    { method: 'rpc', from: 'get_content_rows', params: { p_table: 'articles' }, as: 'articles', cache: '5m' },
    { method: 'rpc', from: 'get_content_rows', params: { p_table: 'events' }, as: 'events', cache: '5m' }
  ]
}
```

### Triggers

```js
{ fetch: { from: 'articles' } }                                           // on: 'create' (default)
{ tag: 'form', fetch: { method: 'insert', from: 'contacts', on: 'submit' } }  // on: 'submit'
{ fetch: { method: 'delete', from: 'items', params: (el) => ({ id: el.state.itemId }), on: 'click' } }
{ fetch: { from: 'articles', params: (el, s) => ({ title: { ilike: '%' + s.query + '%' } }), on: 'stateChange' } }
```

### Enabled / disabled queries

```js
// Boolean
{ fetch: { from: 'profile', enabled: false } }

// Function — resolves at fetch time
{ fetch: { from: 'profile', enabled: (el, state) => !!state.userId } }
```

## Cache

Default: all queries cache with `staleTime: 1m`, `gcTime: 5m`.

```js
cache: true                // staleTime 1m, gcTime 5m (default)
cache: false               // no caching
cache: '5m'                // 5 min stale
cache: 30000               // 30s stale
cache: { stale: '1m', gc: '10m' }
cache: { staleTime: '30s', gcTime: '1h', key: 'custom-key' }
```

### Stale-while-revalidate

When cached data exists but is stale, it's served immediately while a background refetch happens. Fresh data replaces it once the refetch completes — no loading spinner for stale data.

### Garbage collection

Unused cache entries (no active subscribers) are cleaned up after `gcTime` (default 5 minutes).

## Retry

Failed queries automatically retry with exponential backoff.

```js
// Default: 3 retries with exponential backoff (1s, 2s, 4s... max 30s)
{ fetch: { from: 'articles' } }

// Disable retry
{ fetch: { from: 'articles', retry: false } }

// Custom count
{ fetch: { from: 'articles', retry: 5 } }

// Full control
{
  fetch: {
    from: 'articles',
    retry: {
      count: 3,
      delay: (attempt, error) => Math.min(1000 * 2 ** attempt, 30000)
    }
  }
}
```

## Query deduplication

Multiple elements fetching the same query simultaneously share a single network request. The cache key is built from `from`, `method`, and `params`.

```js
// Both share one request
{ Header: { state: 'user', fetch: { from: 'profile', cache: '5m' } } }
{ Sidebar: { state: 'user', fetch: { from: 'profile', cache: '5m' } } }
```

## Refetch on window focus

Stale queries automatically refetch when the user returns to the tab. Enabled by default.

```js
// Disable
{ fetch: { from: 'articles', refetchOnWindowFocus: false } }
```

## Refetch on reconnect

Queries refetch when the browser comes back online. Enabled by default.

```js
// Disable
{ fetch: { from: 'articles', refetchOnReconnect: false } }
```

## Polling / refetch interval

```js
// Poll every 30 seconds
{ fetch: { from: 'notifications', refetchInterval: 30000 } }
{ fetch: { from: 'notifications', refetchInterval: '30s' } }

// Also poll when tab is in background
{ fetch: { from: 'alerts', refetchInterval: '1m', refetchIntervalInBackground: true } }
```

## Placeholder data

Show temporary data immediately while the real query loads:

```js
{
  state: { articles: [] },
  fetch: {
    from: 'articles',
    placeholderData: []   // show empty array instead of undefined while loading
  }
}

// Function form
{
  fetch: {
    from: 'article_detail',
    placeholderData: (el, state) => state.articles?.find(a => a.id === state.currentId)
  }
}
```

## Initial data

Pre-populate the cache (counts as fresh data, won't trigger a refetch until stale):

```js
{
  fetch: {
    from: 'settings',
    initialData: { theme: 'dark', lang: 'en' }
  }
}

// Function form
{
  fetch: {
    from: 'settings',
    initialData: () => JSON.parse(localStorage.getItem('settings'))
  }
}
```

## Keep previous data

Prevent UI flicker during page changes — keep showing current data while the next page loads:

```js
{
  state: { items: [], page: 1 },
  fetch: {
    from: 'articles',
    page: (el, s) => s.page,
    keepPreviousData: true
  }
}
```

## Pagination

### Offset-based

```js
// Page number — auto-calculates offset from pageSize
{
  state: { items: [], currentPage: 1 },
  fetch: {
    from: 'articles',
    page: 1,
    pageSize: 20,         // default: limit or 20
    keepPreviousData: true
  }
}

// Manual offset/limit
{
  fetch: {
    from: 'articles',
    page: { offset: 0, limit: 20 }
  }
}
```

### Cursor-based

```js
{
  fetch: {
    from: 'articles',
    page: { cursor: 'abc123', limit: 20 }
  }
}
```

## Infinite queries

Load pages incrementally with automatic page tracking:

```js
{
  state: { items: [] },
  fetch: {
    from: 'articles',
    limit: 20,
    infinite: true,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 20) return null  // no more pages
      return lastPage[lastPage.length - 1].id  // cursor
    }
  }
}
```

### Fetching pages

After mount, use the imperative methods exposed on `element.__ref`:

```js
// In an event handler or callback
el.__ref.fetchNextPage()     // loads next page, appends to state
el.__ref.fetchPreviousPage() // loads previous page, prepends to state

// Status
el.__ref.__hasNextPage       // boolean
el.__ref.__hasPreviousPage   // boolean
el.__ref.__pages             // array of page arrays
el.__ref.__nextPageParam     // current next cursor
el.__ref.__prevPageParam     // current previous cursor
```

### Bidirectional infinite scroll

```js
{
  fetch: {
    from: 'messages',
    infinite: true,
    getNextPageParam: (lastPage) => lastPage[lastPage.length - 1]?.id,
    getPreviousPageParam: (firstPage) => firstPage[0]?.id
  }
}
```

## Mutations

Mutations (`insert`, `update`, `upsert`, `delete`) support optimistic updates, cache invalidation, and lifecycle callbacks.

```js
{ tag: 'form', fetch: { method: 'insert', from: 'articles', on: 'submit', fields: true } }
{ tag: 'form', fetch: { method: 'insert', from: 'contacts', on: 'submit', fields: ['name', 'email'] } }
```

### Optimistic updates

Update the UI immediately, roll back if the mutation fails:

```js
{
  extends: 'Button',
  text: 'Like',
  fetch: {
    method: 'update',
    from: 'posts',
    params: (el) => ({ id: el.state.postId }),
    on: 'click',
    optimistic: (mutationData, currentState) => ({
      ...currentState,
      likes: currentState.likes + 1
    }),
    invalidates: ['posts']
  }
}
```

### Cache invalidation

After a mutation, invalidate related queries so they refetch:

```js
{
  fetch: {
    method: 'insert',
    from: 'articles',
    on: 'submit',
    fields: true,
    invalidates: true          // invalidates all "articles:*" cache keys
  }
}

// Invalidate specific keys
{ fetch: { method: 'delete', from: 'items', invalidates: ['items:select:'] } }

// Invalidate everything
{ fetch: { method: 'update', from: 'settings', invalidates: ['*'] } }
```

### Mutation callbacks

```js
{
  fetch: {
    method: 'insert',
    from: 'contacts',
    on: 'submit',
    fields: true,
    onMutate: (data, el) => console.log('Sending...', data),
    onSuccess: (responseData, sentData, el) => console.log('Done!', responseData),
    onError: (error, sentData, el) => console.error('Failed', error),
    onSettled: (data, error, sentData, el) => console.log('Finished')
  }
}
```

## Callbacks

```js
{
  fetch: true,
  onFetchComplete: (data, el) => {},
  onFetchError: (error, el) => {},
  onFetchStart: (el) => {}
}
```

## Fetch status

Every fetch exposes status on `element.__ref.__fetchStatus`:

```js
{
  isFetching,   // true while any request is in-flight (including background)
  isLoading,    // true only on first load (no cached data)
  isStale,      // true if data is past staleTime
  isSuccess,    // true after successful fetch
  isError,      // alias: !!error
  error,        // error object or null
  status,       // 'pending' | 'success' | 'error'
  fetchStatus   // 'fetching' | 'idle'
}
```

Also available: `el.__ref.__fetching`, `el.__ref.__fetchError`.

## Imperative refetch

```js
// Refetch all queries on this element
el.__ref.refetch()

// Force (skip dedup)
el.__ref.refetch({ force: true })
```

## Query client

Global cache management, importable anywhere:

```js
import { queryClient } from '@symbo.ls/fetch'
```

### Invalidate queries

```js
queryClient.invalidateQueries('articles')       // all keys containing "articles"
queryClient.invalidateQueries(['articles', 'select'])
queryClient.invalidateQueries()                  // invalidate everything
```

### Get / set cache

```js
const articles = queryClient.getQueryData('articles:select:')

// Direct set
queryClient.setQueryData('articles:select:', newArticles)

// Updater function
queryClient.setQueryData('articles:select:', (old) => [...old, newArticle])
```

### Remove queries

```js
queryClient.removeQueries('articles')
queryClient.removeQueries()  // clear all
```

### Prefetch

Prefetch data before it's needed (e.g. on hover):

```js
await queryClient.prefetchQuery({
  from: 'article_detail',
  method: 'select',
  params: { id: 42 },
  cache: '5m'
}, context)
```

## Auth guard

```js
{ fetch: { from: 'profile', auth: true } }
```

## Subscribe (realtime)

```js
{ state: 'messages', fetch: { method: 'subscribe', from: 'messages', subscribeOn: 'INSERT' } }
```

## Per-request overrides (REST)

```js
{ fetch: { from: '/users', baseUrl: 'https://api.example.com/auth', headers: { 'X-Custom': 'value' } } }
```

## State inheritance

When `state` is a string, the element inherits that key from the parent state. Fetch uses the same string as the default `from` (table name), so declaring `state` is often enough:

```js
// Parent holds the data, child inherits and fetches into it
{
  state: { articles: [], users: [] },
  ArticleList: {
    state: 'articles',  // inherits parent.state.articles + fetches from "articles"
    fetch: true,
    children: '.'
  },
  UserList: {
    state: 'users',
    fetch: true,
    children: '.'
  }
}
```

### How it works

1. `state: 'articles'` tells DOMQL to bind this element's state to `parent.state.articles`
2. `fetch: true` resolves `from` using the same state key — equivalent to `fetch: { from: 'articles' }`
3. Fetched data flows into `parent.state.articles`, and all elements inheriting that key update automatically

### Nested paths

Use `/` to traverse deeper into the state tree:

```js
{
  state: { dashboard: { stats: {} } },
  Stats: {
    state: 'dashboard/stats',
    fetch: { from: 'get_dashboard_stats', method: 'rpc' }
  }
}
```

### Root and parent references

```js
// ~/ resolves from root state
{ state: '~/articles', fetch: true }

// ../ goes up one level in the state tree
{ state: '../articles', fetch: true }
```

### Separate `from` and state key

When the table name differs from the state key, use `from` explicitly:

```js
{
  state: { posts: [] },
  Posts: {
    state: 'posts',
    fetch: { from: 'blog_posts' }  // fetches from "blog_posts", stores in state.posts
  }
}
```

### `as` with inherited state

Use `as` to place fetched data at a specific key when the element has its own object state:

```js
{
  state: { articles: [], total: 0 },
  Articles: {
    state: 'articles',
    fetch: true   // replaces state.articles entirely
  },
  Dashboard: {
    state: { items: [], loading: false },
    fetch: { from: 'articles', as: 'items' }  // sets state.items, preserves state.loading
  }
}
```

## `getDB()`

```js
const db = await this.getDB()
const { data, error } = await db.select({ from: 'articles' })
```

## Adapter interface

All return `{ data, error }`.

```js
db.select({ from, select, params, limit, offset, order, single, headers, baseUrl })
db.insert({ from, data, select, headers, baseUrl })
db.update({ from, data, params, method, headers, baseUrl })  // method: 'PUT' | 'PATCH'
db.delete({ from, params, headers, baseUrl })
db.rpc({ from, params, headers, baseUrl })

// Auth
db.getSession()
db.signIn({ email, password })
db.signOut()
db.setToken(jwt)                    // REST
db.signUp({ email, password })      // Supabase
db.onAuthStateChange(callback)      // Supabase

// Storage (Supabase)
db.upload({ bucket, path, file })
db.download({ bucket, path })
db.getPublicUrl({ bucket, path })
```

### Params

```js
params: { status: 'published' }              // eq
params: { age: { gt: 18 } }                  // gt, gte, lt, lte, neq
params: { title: { ilike: '%search%' } }     // like, ilike
params: { id: [1, 2, 3] }                    // in
params: { deleted_at: null }                  // is null
```

### Order

```js
order: 'created_at'                           // string
order: { by: 'created_at', asc: false }       // object
order: [{ by: 'col1' }, { by: 'col2', asc: false }]  // array
```

## Custom adapter

```js
import { createAdapter } from '@symbo.ls/fetch'

const db = createAdapter({
  name: 'custom',
  select: async ({ from, params }) => { /* { data, error } */ },
  insert: async ({ from, data }) => { /* { data, error } */ },
  update: async ({ from, data, params }) => { /* { data, error } */ },
  delete: async ({ from, params }) => { /* { data, error } */ }
})
```

## Language / i18n

Fetch automatically injects the current language into every request — both as a `lang` query parameter and as an `Accept-Language` header.

### Setting the language

Set the language in root state:

```js
state: { root: { lang: 'ka' } }
```

Or use the polyglot plugin which manages `state.root.lang` automatically.

### Per-request override

Override the language for a specific fetch by including `lang` in params:

```js
{
  fetch: {
    from: 'articles',
    params: { lang: 'de' }  // overrides global language for this request
  }
}
```

### How it works

1. `lang` is added to `params` (sent as query parameter / RPC argument)
2. `Accept-Language` header is set on the request
3. If `params.lang` is already set explicitly, it is not overwritten

This follows the same pattern as XMA's `t()` function where `state.root.lang` is the source of truth for the current language.

## Disabling fetch

Fetch is included by default in smbls. To disable it:

```js
import { createDefine } from '@symbo.ls/smbls'

// Disable fetch, keep everything else
const options = {
  define: createDefine({ fetch: false })
}
```

## domql plugin

Fetch can also be used as a domql plugin:

```js
import { fetchPlugin } from '@symbo.ls/fetch'

context.plugins = [fetchPlugin]
```

When used as a plugin, fetch hooks into the `create` lifecycle to auto-execute fetch configs defined on elements.

## All `fetch` options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `from` | string | state key or element key | Table/endpoint name |
| `method` | string | `'select'` | `select`, `rpc`, `insert`, `update`, `upsert`, `delete`, `subscribe` |
| `params` | object/function | — | Filter params or function `(el, state) => params` |
| `cache` | boolean/string/number/object | `true` (1m stale) | Cache configuration |
| `retry` | boolean/number/object | `3` | Retry on failure |
| `transform` | function | — | Reshape data before state update |
| `select` | function | — | Pick/reshape data (runs before transform) |
| `as` | string | — | Target state key |
| `on` | string | `'create'` | Trigger: `create`, `click`, `submit`, `stateChange` |
| `enabled` | boolean/function | `true` | Enable/disable query |
| `placeholderData` | any/function | — | Temporary data while loading |
| `initialData` | any/function | — | Pre-populate cache |
| `keepPreviousData` | boolean | `false` | Keep current data during refetch |
| `page` | number/object | — | Pagination: page number or `{ offset, limit, cursor }` |
| `pageSize` | number | `limit` or `20` | Items per page |
| `infinite` | boolean | `false` | Enable infinite query mode |
| `getNextPageParam` | function | — | `(lastPage, allPages) => cursor \| null` |
| `getPreviousPageParam` | function | — | `(firstPage, allPages) => cursor \| null` |
| `refetchInterval` | number/string | — | Polling interval |
| `refetchIntervalInBackground` | boolean | `false` | Poll when tab hidden |
| `refetchOnWindowFocus` | boolean | `true` | Refetch on tab focus |
| `refetchOnReconnect` | boolean | `true` | Refetch on online |
| `optimistic` | any/function | — | Optimistic update data |
| `invalidates` | string/array/boolean | — | Cache keys to invalidate after mutation |
| `onMutate` | function | — | Before mutation fires |
| `onSuccess` | function | — | After successful mutation |
| `onError` | function | — | After failed mutation |
| `onSettled` | function | — | After mutation completes (success or error) |
| `auth` | boolean | `false` | Require authentication |
| `fields` | boolean/array | — | Collect form fields for mutations |
| `single` | boolean | `false` | Return single row |
| `limit` | number | — | Row limit |
| `offset` | number | — | Row offset |
| `order` | string/object/array | — | Sort order |
| `headers` | object | — | Per-request headers (REST) |
| `baseUrl` | string | — | Per-request base URL (REST) |
| `lang` | string | auto from context/state | Language override (via params) |
