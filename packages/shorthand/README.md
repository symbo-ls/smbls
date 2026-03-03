# @symbo.ls/shorthand

Bidirectional shorthand transpiler for [Symbols](https://github.com/symbo-ls/smbls) component properties. Compresses DOMQL component objects using abbreviated property names and compact string encoding — and losslessly expands them back.

## Install

```sh
npm install @symbo.ls/shorthand
```

## API

Six functions in three complementary pairs:

| Pair       | Forward     | Inverse  | Description                                                  |
| ---------- | ----------- | -------- | ------------------------------------------------------------ |
| **String** | `encode`    | `decode` | Flat object ↔ single-line shorthand string                  |
| **Object** | `shorten`   | `expand` | Recursive key abbreviation preserving structure              |
| **Hybrid** | `stringify` | `parse`  | Primitive props → `in` string, structural props stay as keys |

### encode / decode

Converts flat primitive props into a compact single-line string.

```js
import { encode, decode } from '@symbo.ls/shorthand'

encode({ padding: 'A B', background: 'red', hidden: true })
// → 'p:A_B bg:red hid'

decode('p:A_B bg:red hid')
// → { padding: 'A B', background: 'red', hidden: true }
```

**Syntax rules:**

- `abbr:value` — key-value pair
- `_` — represents spaces inside values
- `,` — array separator (`ext:Flex,Box` → `extends: ['Flex', 'Box']`)
- bare `abbr` — boolean `true`
- `!abbr` — boolean `false`

Functions, objects, and other non-serializable values are skipped.

### shorten / expand

Recursively abbreviates (or expands) property keys throughout the component tree while preserving the full object structure — child components, selectors, functions, arrays, and everything else stays intact.

```js
import { shorten, expand } from '@symbo.ls/shorthand'

const component = {
  extends: 'Flex',
  padding: 'A B',
  gap: 'C',
  flexDirection: 'column',
  onClick: (e, el) => {},
  Header: { fontSize: 'B' },
  ':hover': { background: 'blue' }
}

shorten(component)
// {
//   ext: 'Flex',
//   p: 'A B',
//   g: 'C',
//   fxd: 'column',
//   '@ck': (e, el) => {},
//   Header: { fs: 'B' },
//   ':hover': { bg: 'blue' }
// }

expand(shorten(component)) // deeply equals original
```

**Preservation rules:**

- **PascalCase keys** (child components) — key kept as-is, value recursed
- **Selector keys** (`:hover`, `@dark`, `.isActive`, `> *`) — key kept, value recursed
- **`state`, `scope`, `attr`, `style`, `data`, `context`, `query`, `class`** — values preserved as-is (no key abbreviation inside)
- **Functions** — preserved, only the key is shortened

### stringify / parse

Hybrid encoding: flat primitive props go into a compact `in` string, while structural props (functions, nested objects, child components, selectors) remain as shortened object keys.

```js
import { stringify, parse } from '@symbo.ls/shorthand'

const component = {
  extends: 'Flex',
  padding: 'A',
  background: 'surface',
  borderRadius: 'B',
  onClick: (e, el) => {},
  Header: { fontSize: 'B', color: 'title' }
}

stringify(component)
// {
//   in: 'ext:Flex p:A bg:surface bdr:B',
//   '@ck': (e, el) => {},
//   Header: { in: 'fs:B c:title' }
// }

parse(stringify(component)) // deeply equals original
```

**What goes into `in`:**

- String props (except `text`, `html`, `content`, `placeholder`, `src`, `href`)
- Boolean props
- Primitive arrays (length > 1)

**What stays as object keys:**

- Functions, `null`, `undefined`
- Nested objects, arrays of objects
- PascalCase children, selector keys
- Preserved keys (`state`, `scope`, `style`, etc.)
- Skip-inline keys (`text`, `html`, `content`, `placeholder`, `src`, `href`)
- Numbers (to preserve type through round-trip)
- Strings containing `,` or `_` (to avoid encoding ambiguity)

## Registry

The package ships with 300+ bidirectional abbreviation mappings covering:

- **DOMQL core** — `extends` → `ext`, `childExtends` → `cex`, `state` → `st`, `tag` → `tg`
- **Symbols shorthand** — `flow` → `fl`, `align` → `aln`, `round` → `rnd`, `boxSize` → `bsz`
- **CSS properties** — `padding` → `p`, `background` → `bg`, `flexDirection` → `fxd`, `zIndex` → `zi`
- **HTML attributes** — `placeholder` → `phd`, `disabled` → `dis`, `required` → `req`
- **ARIA attributes** — `ariaLabel` → `alb`, `ariaHidden` → `ahid`, `role` → `role`
- **Events** — `onClick` → `@ck`, `onRender` → `@rn`, `onSubmit` → `@sm`, `onKeyDown` → `@kd`

Access the maps directly:

```js
import { propToAbbr, abbrToProp } from '@symbo.ls/shorthand'

propToAbbr['padding'] // 'p'
propToAbbr['onClick'] // '@ck'
abbrToProp['bg'] // 'background'
abbrToProp['@rn'] // 'onRender'
```

### Helpers

```js
import {
  isComponentKey,
  isSelectorKey,
  PRESERVE_VALUE_KEYS,
  SKIP_INLINE_KEYS
} from '@symbo.ls/shorthand'

isComponentKey('Header') // true  (PascalCase)
isComponentKey('padding') // false

isSelectorKey(':hover') // true
isSelectorKey('@dark') // true
isSelectorKey('.isActive') // true
isSelectorKey('> *') // true
isSelectorKey('padding') // false
```

## Round-trip guarantee

All three pairs are lossless — the inverse function always reproduces the original:

```js
decode(encode(obj)) // ≈ obj (flat primitives only)
expand(shorten(obj)) // ≡ obj (full structure)
parse(stringify(obj)) // ≡ obj (full structure)
```

The test suite verifies round-trip correctness against 200+ real-world Symbols components.

## License

ISC
