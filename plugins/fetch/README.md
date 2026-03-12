# @symbo.ls/fetch

Declarative data fetching for DOMQL with pluggable adapters.

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

### Array fetch

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

### Mutations

```js
{ tag: 'form', fetch: { method: 'insert', from: 'articles', on: 'submit', fields: true } }
{ tag: 'form', fetch: { method: 'insert', from: 'contacts', on: 'submit', fields: ['name', 'email'] } }
```

### Auth guard

```js
{ fetch: { from: 'profile', auth: true } }
```

### Subscribe

```js
{ state: 'messages', fetch: { method: 'subscribe', from: 'messages', subscribeOn: 'INSERT' } }
```

### Callbacks

```js
{
  fetch: true,
  onFetchComplete: (data, el) => {},
  onFetchError: (error, el) => {},
  onFetchStart: (el) => {}
}
```

### Per-request overrides (REST)

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

## Cache

```js
cache: true          // 1 min stale
cache: '5m'          // 5 min stale
cache: 30000         // 30s stale
cache: { stale: '1m', expire: '1h', key: 'custom-key' }
```

Stale-while-revalidate for `select` and `rpc`.

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
