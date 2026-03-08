# attrs-in-props

HTML attributes as props for DOMQL elements. Provides attribute validation, filtering, and automatic resolution for HTML elements.

## What it does

- Validates HTML attributes by tag name (knows which attributes are valid for `<img>`, `<a>`, `<input>`, etc.)
- Filters props to extract valid HTML attributes and DOM events
- Provides attribute transform plugins for common patterns (src, href resolution)
- Supports all standard HTML attributes, ARIA attributes, SVG attributes, and DOM events

## API

### `checkAttributeByTagName(tag, attribute)`

Check if an attribute is valid for a specific HTML tag.

```javascript
import { checkAttributeByTagName } from 'attrs-in-props'

checkAttributeByTagName('img', 'src')     // true
checkAttributeByTagName('img', 'href')    // false
checkAttributeByTagName('div', 'id')      // true (default attribute)
```

### `filterAttributesByTagName(tag, props, cssProps?)`

Filter component props to extract only valid HTML attributes and DOM events.

```javascript
import { filterAttributesByTagName } from 'attrs-in-props'

filterAttributesByTagName('img', {
  src: '/photo.jpg',
  alt: 'Photo',
  theme: 'primary',     // filtered out (not an HTML attr)
  padding: '10px'       // filtered out (CSS prop)
})
// -> { src: '/photo.jpg', alt: 'Photo' }
```

### `resolvePropValue(el, value)`

Resolves a prop value: executes dynamic values and replaces `{{template}}` literals.

```javascript
import { resolvePropValue } from 'attrs-in-props'

// In an attr handler:
const src = resolvePropValue(el, el.props.src)
```

### `ATTR_TRANSFORMS`

Auto-resolve map for common attributes. Handles `exec` + template literal replacement for: `src`, `href`, `action`, `poster`, `data`.

```javascript
import { ATTR_TRANSFORMS, applyAttrTransforms } from 'attrs-in-props'

// Apply all valid transforms for an element's tag
const attrs = applyAttrTransforms(element)
```

Components using standard `src`/`href` patterns no longer need custom `attr` blocks — `ATTR_TRANSFORMS` handles resolution automatically.

### `executeAttr(elem, element)`

Execute all handler functions in an element's `attr` block.

```javascript
import { executeAttr } from 'attrs-in-props'

const resolved = executeAttr(componentDef, element)
// -> { src: '/resolved-path.jpg', alt: 'Photo' }
```

## Default attributes

All HTML elements support these attributes by default: `id`, `title`, `class`, `style`, `dir`, `lang`, `hidden`, `tabindex`, `draggable`, `contenteditable`, `spellcheck`, `translate`, `role`, `slot`, and more.

Element-specific attributes are supported for 50+ HTML tags including `a`, `img`, `input`, `video`, `iframe`, `form`, `select`, `textarea`, `svg`, and all ARIA attributes.
