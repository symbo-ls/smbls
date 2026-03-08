# DOMQL Element
Takes object and creates DOMQL element.

[![npm version](https://badge.fury.io/js/%40domql%2Felement.svg)](https://badge.fury.io/js/%40domql%2Felement)

### Example:
```javascript
import DOM from 'domql'

const Poster = {
  extends: [Link, Img],
  boxSize: [100, 200],
  borderRadius: 12,
  padding: 16,
  background: '#fff'
}

DOM.create(Poster, document.body)
```

### html mixin

The `html` mixin sets raw HTML content on an element. It supports both direct assignment and props:

```javascript
// Direct assignment (el.html)
const MyComponent = {
  html: '<strong>Hello</strong>'
}

// Via props (el.props.html) — works as an alias
const MyComponent = {
  props: { html: '<strong>Hello</strong>' }
}
```

`el.html` takes priority when both are set. `props.html` is used as a fallback when `el.html` is not defined.