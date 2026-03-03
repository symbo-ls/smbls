import {
  encode,
  decode,
  shorten,
  expand,
  stringify,
  parse,
  stringifyFurther,
  parseFurther,
  propToAbbr,
  abbrToProp
} from '../src/index.js'

// ── Registry tests ──

describe('registry', () => {
  test('every abbreviation is unique', () => {
    const abbrs = Object.values(propToAbbr)
    const unique = new Set(abbrs)
    expect(unique.size).toBe(abbrs.length)
  })

  test('abbrToProp is the exact inverse of propToAbbr', () => {
    for (const [prop, abbr] of Object.entries(propToAbbr)) {
      expect(abbrToProp[abbr]).toBe(prop)
    }
  })

  test('both maps have the same size', () => {
    expect(Object.keys(propToAbbr).length).toBe(Object.keys(abbrToProp).length)
  })
})

// ── Encode tests ──

describe('encode', () => {
  test('encodes simple string props', () => {
    const result = encode({ padding: 'A', background: 'red' })
    expect(result).toBe('p:A bg:red')
  })

  test('encodes multi-word values with underscores', () => {
    const result = encode({ padding: 'A B', flexFlow: 'row wrap' })
    expect(result).toBe('p:A_B fxf:row_wrap')
  })

  test('encodes boolean true as bare abbreviation', () => {
    const result = encode({ hidden: true })
    expect(result).toBe('hid')
  })

  test('encodes boolean false with ! prefix', () => {
    const result = encode({ hidden: false })
    expect(result).toBe('!hid')
  })

  test('encodes arrays with commas', () => {
    const result = encode({ extends: ['Flex', 'Box'] })
    expect(result).toBe('ext:Flex,Box')
  })

  test('encodes numeric values', () => {
    const result = encode({ zIndex: 99, opacity: 0.5 })
    expect(result).toBe('zi:99 op:0.5')
  })

  test('skips functions', () => {
    const result = encode({ padding: 'A', onClick: () => {} })
    expect(result).toBe('p:A')
  })

  test('skips nested objects', () => {
    const result = encode({ padding: 'A', childProps: { color: 'red' } })
    expect(result).toBe('p:A')
  })

  test('skips undefined values', () => {
    const result = encode({ padding: 'A', color: undefined })
    expect(result).toBe('p:A')
  })

  test('returns empty string for null/undefined input', () => {
    expect(encode(null)).toBe('')
    expect(encode(undefined)).toBe('')
  })

  test('passes through unknown properties as-is', () => {
    const result = encode({ customProp: 'value' })
    expect(result).toBe('customProp:value')
  })

  test('encodes DOMQL core props', () => {
    const result = encode({ extends: 'Flex', tag: 'section', text: 'hello' })
    expect(result).toBe('ext:Flex tg:section tx:hello')
  })

  test('encodes Symbols shorthand props', () => {
    const result = encode({ flow: 'y', align: 'center center', round: 'B' })
    expect(result).toBe('fl:y aln:center_center rnd:B')
  })
})

// ── Decode tests ──

describe('decode', () => {
  test('decodes simple key:value pairs', () => {
    const result = decode('p:A bg:red')
    expect(result).toEqual({ padding: 'A', background: 'red' })
  })

  test('decodes underscores back to spaces', () => {
    const result = decode('p:A_B fxf:row_wrap')
    expect(result).toEqual({ padding: 'A B', flexFlow: 'row wrap' })
  })

  test('decodes bare abbreviation as boolean true', () => {
    const result = decode('hid')
    expect(result).toEqual({ hidden: true })
  })

  test('decodes ! prefix as boolean false', () => {
    const result = decode('!hid')
    expect(result).toEqual({ hidden: false })
  })

  test('decodes comma-separated arrays', () => {
    const result = decode('ext:Flex,Box')
    expect(result).toEqual({ extends: ['Flex', 'Box'] })
  })

  test('decodes numeric strings to numbers', () => {
    const result = decode('zi:99 op:0.5')
    expect(result).toEqual({ zIndex: 99, opacity: 0.5 })
  })

  test('returns empty object for null/undefined/empty input', () => {
    expect(decode(null)).toEqual({})
    expect(decode(undefined)).toEqual({})
    expect(decode('')).toEqual({})
  })

  test('passes through unknown abbreviations as-is', () => {
    const result = decode('customProp:value')
    expect(result).toEqual({ customProp: 'value' })
  })

  test('decodes DOMQL core props', () => {
    const result = decode('ext:Flex tg:section tx:hello')
    expect(result).toEqual({ extends: 'Flex', tag: 'section', text: 'hello' })
  })

  test('decodes Symbols shorthand props', () => {
    const result = decode('fl:y aln:center_center rnd:B')
    expect(result).toEqual({ flow: 'y', align: 'center center', round: 'B' })
  })

  test('handles extra whitespace', () => {
    const result = decode('  p:A   bg:red  ')
    expect(result).toEqual({ padding: 'A', background: 'red' })
  })

  test('decodes negative numbers', () => {
    const result = decode('zi:-1')
    expect(result).toEqual({ zIndex: -1 })
  })
})

// ── Round-trip tests ──

describe('round-trip (encode → decode)', () => {
  test('simple string props survive round-trip', () => {
    const original = { padding: 'A', background: 'red', color: 'white' }
    expect(decode(encode(original))).toEqual(original)
  })

  test('multi-word values survive round-trip', () => {
    const original = { padding: 'A B', flexFlow: 'row wrap' }
    expect(decode(encode(original))).toEqual(original)
  })

  test('booleans survive round-trip', () => {
    const original = { hidden: true, disabled: false }
    expect(decode(encode(original))).toEqual(original)
  })

  test('arrays survive round-trip', () => {
    const original = { extends: ['Flex', 'Box'] }
    expect(decode(encode(original))).toEqual(original)
  })

  test('numbers survive round-trip', () => {
    const original = { zIndex: 99, opacity: 0.5 }
    expect(decode(encode(original))).toEqual(original)
  })

  test('mixed props survive round-trip', () => {
    const original = {
      extends: 'Flex',
      padding: 'A B',
      background: 'surface',
      borderRadius: 'B',
      hidden: false,
      zIndex: 10
    }
    expect(decode(encode(original))).toEqual(original)
  })

  test('complex component survives round-trip', () => {
    const original = {
      extends: 'Flex',
      tag: 'section',
      flow: 'y',
      gap: 'B',
      align: 'center center',
      padding: 'C1',
      background: 'softBlack',
      color: 'white.65',
      borderRadius: 'C2',
      theme: 'primary',
      hidden: false
    }
    expect(decode(encode(original))).toEqual(original)
  })
})

// ── Edge cases ──

describe('edge cases', () => {
  test('value containing colons after first', () => {
    // e.g. background: 'url(http://example.com)' — colon only splits on first
    const shorthand = 'bgi:url(http://example.com)'
    const result = decode(shorthand)
    expect(result).toEqual({ backgroundImage: 'url(http://example.com)' })
  })

  test('encode handles empty object', () => {
    expect(encode({})).toBe('')
  })

  test('value with design tokens', () => {
    const original = { padding: 'C2 A', gap: 'A2', borderRadius: 'Z' }
    const encoded = encode(original)
    expect(encoded).toBe('p:C2_A g:A2 bdr:Z')
    expect(decode(encoded)).toEqual(original)
  })

  test('color with opacity syntax', () => {
    const original = { background: 'black.001', color: 'white.65' }
    const encoded = encode(original)
    expect(encoded).toBe('bg:black.001 c:white.65')
    expect(decode(encoded)).toEqual(original)
  })
})

// ────────────────────────────────────────────────────────────────────────────
// shorten / expand tests
// ────────────────────────────────────────────────────────────────────────────

describe('shorten', () => {
  test('shortens flat props', () => {
    expect(shorten({ padding: 'A', background: 'red' })).toEqual({
      p: 'A',
      bg: 'red'
    })
  })

  test('shortens extends and tag', () => {
    expect(shorten({ extends: 'Flex', tag: 'section', text: 'hello' })).toEqual(
      { ext: 'Flex', tg: 'section', tx: 'hello' }
    )
  })

  test('preserves boolean values', () => {
    expect(shorten({ hidden: true, disabled: false })).toEqual({
      hid: true,
      dis: false
    })
  })

  test('preserves numeric values', () => {
    expect(shorten({ zIndex: 99, opacity: 0.5 })).toEqual({ zi: 99, op: 0.5 })
  })

  test('preserves string arrays', () => {
    expect(shorten({ extends: ['Flex', 'Box'] })).toEqual({
      ext: ['Flex', 'Box']
    })
  })

  test('preserves functions with shortened key', () => {
    const fn = (e, el, s) => {}
    expect(shorten({ onClick: fn })).toEqual({ '@ck': fn })
  })

  test('keeps PascalCase child component keys, recurses value', () => {
    expect(shorten({ Header: { padding: 'A', color: 'red' } })).toEqual({
      Header: { p: 'A', c: 'red' }
    })
  })

  test('keeps CSS selector keys, recurses value', () => {
    expect(shorten({ ':hover': { background: 'blue' } })).toEqual({
      ':hover': { bg: 'blue' }
    })
  })

  test('keeps media query keys, recurses value', () => {
    expect(shorten({ '@mobile': { padding: 'A', fontSize: 'Z' } })).toEqual({
      '@mobile': { p: 'A', fs: 'Z' }
    })
  })

  test('keeps case keys (dot prefix), recurses value', () => {
    expect(shorten({ '.isActive': { color: 'blue' } })).toEqual({
      '.isActive': { c: 'blue' }
    })
  })

  test('keeps > selector keys, recurses value', () => {
    expect(shorten({ '> *': { minWidth: '100%' } })).toEqual({
      '> *': { mnw: '100%' }
    })
  })

  test('preserves state value as-is (no key shortening inside)', () => {
    expect(shorten({ state: { currentValue: 0, color: 'red' } })).toEqual({
      st: { currentValue: 0, color: 'red' }
    })
  })

  test('preserves scope value as-is', () => {
    const fn = (el, s) => {}
    expect(shorten({ scope: { fetchData: fn } })).toEqual({
      scp: { fetchData: fn }
    })
  })

  test('shortens childProps recursively', () => {
    expect(
      shorten({ childProps: { theme: 'dialog', padding: 'A1 B2' } })
    ).toEqual({ cp: { thm: 'dialog', p: 'A1 B2' } })
  })

  test('shortens children array items recursively', () => {
    expect(
      shorten({ children: [{ text: 'hello' }, { text: 'world' }] })
    ).toEqual({ ch: [{ tx: 'hello' }, { tx: 'world' }] })
  })

  test('preserves null child component values', () => {
    expect(shorten({ Input: null })).toEqual({ Input: null })
  })

  test('preserves empty string values', () => {
    expect(shorten({ minWidth: '' })).toEqual({ mnw: '' })
  })

  test('passes through unknown properties', () => {
    expect(shorten({ customProp: 'value' })).toEqual({ customProp: 'value' })
  })

  test('handles null/undefined input', () => {
    expect(shorten(null)).toBe(null)
    expect(shorten(undefined)).toBe(undefined)
  })

  test('handles empty object', () => {
    expect(shorten({})).toEqual({})
  })
})

describe('expand', () => {
  test('expands flat abbreviated props', () => {
    expect(expand({ p: 'A', bg: 'red' })).toEqual({
      padding: 'A',
      background: 'red'
    })
  })

  test('expands core DOMQL props', () => {
    expect(expand({ ext: 'Flex', tg: 'section', tx: 'hello' })).toEqual({
      extends: 'Flex',
      tag: 'section',
      text: 'hello'
    })
  })

  test('expands event abbreviations', () => {
    const fn = (e, el, s) => {}
    expect(expand({ '@ck': fn })).toEqual({ onClick: fn })
  })

  test('keeps PascalCase keys, recurses value', () => {
    expect(expand({ Header: { p: 'A', c: 'red' } })).toEqual({
      Header: { padding: 'A', color: 'red' }
    })
  })

  test('keeps CSS selector keys, recurses value', () => {
    expect(expand({ ':hover': { bg: 'blue' } })).toEqual({
      ':hover': { background: 'blue' }
    })
  })

  test('keeps media query keys, recurses value', () => {
    expect(expand({ '@mobile': { p: 'A', fs: 'Z' } })).toEqual({
      '@mobile': { padding: 'A', fontSize: 'Z' }
    })
  })

  test('expands @-prefixed events but keeps @-prefixed media queries', () => {
    const fn = () => {}
    const result = expand({ '@ck': fn, '@mobile': { p: 'A' } })
    expect(result).toEqual({ onClick: fn, '@mobile': { padding: 'A' } })
  })

  test('preserves state value as-is', () => {
    expect(expand({ st: { currentValue: 0, color: 'red' } })).toEqual({
      state: { currentValue: 0, color: 'red' }
    })
  })

  test('expands childProps recursively', () => {
    expect(expand({ cp: { thm: 'dialog', p: 'A1 B2' } })).toEqual({
      childProps: { theme: 'dialog', padding: 'A1 B2' }
    })
  })

  test('expands children array items', () => {
    expect(expand({ ch: [{ tx: 'hello' }, { tx: 'world' }] })).toEqual({
      children: [{ text: 'hello' }, { text: 'world' }]
    })
  })

  test('handles null/undefined input', () => {
    expect(expand(null)).toBe(null)
    expect(expand(undefined)).toBe(undefined)
  })
})

// ────────────────────────────────────────────────────────────────────────────
// Round-trip: shorten → expand (real components from examples/)
// ────────────────────────────────────────────────────────────────────────────

describe('shorten/expand round-trip', () => {
  test('flat props survive round-trip', () => {
    const original = {
      padding: 'A',
      background: 'red',
      color: 'white',
      hidden: true
    }
    expect(expand(shorten(original))).toEqual(original)
  })

  test('AvatarChatPreview', () => {
    const original = {
      Avatar: {},
      Flex: {
        flow: 'y',
        flex: '1',
        '> *': {
          minWidth: '100%'
        },
        ValueHeading: {
          H: {},
          UnitValue: {
            flow: 'row-reverse',
            Unit: {
              text: 'am'
            },
            Value: {
              text: '2:20'
            }
          }
        },
        NotCounterParagraph: {
          P: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            maxWidth: 'F2'
          },
          NotificationCounter: {}
        }
      },
      extends: 'Flex',
      gap: 'Z1',
      minWidth: 'G3',
      align: 'center flex-start'
    }

    const shortened = shorten(original)

    // Verify key shortening
    expect(shortened.ext).toBe('Flex')
    expect(shortened.g).toBe('Z1')
    expect(shortened.mnw).toBe('G3')
    expect(shortened.aln).toBe('center flex-start')

    // Verify nested PascalCase children are kept
    expect(shortened.Avatar).toEqual({})
    expect(shortened.Flex.fl).toBe('y')
    expect(shortened.Flex.fx).toBe('1')
    expect(shortened.Flex['> *']).toEqual({ mnw: '100%' })
    expect(shortened.Flex.ValueHeading.UnitValue.Unit.tx).toBe('am')
    expect(shortened.Flex.NotCounterParagraph.P.ws).toBe('nowrap')

    // Round-trip must be lossless
    expect(expand(shortened)).toEqual(original)
  })

  test('ButtonSet', () => {
    const original = {
      extends: 'Flex',
      childExtends: 'Button',
      gap: 'Z',
      align: 'center flex-start',
      childProps: {
        theme: 'dialog',
        padding: 'A1 B2'
      },
      children: [{ text: 'BUTTON 1' }, { text: 'BUTTEN 2' }]
    }

    const shortened = shorten(original)
    expect(shortened.ext).toBe('Flex')
    expect(shortened.cex).toBe('Button')
    expect(shortened.g).toBe('Z')
    expect(shortened.cp).toEqual({ thm: 'dialog', p: 'A1 B2' })
    expect(shortened.ch).toEqual([{ tx: 'BUTTON 1' }, { tx: 'BUTTEN 2' }])

    expect(expand(shortened)).toEqual(original)
  })

  test('NumberPicker with functions and state', () => {
    const minusClick = (event, element, state) => {
      if (state.currentValue <= 0) return
      state.update({ currentValue: state.currentValue - 1 })
    }
    const plusClick = (event, element, state) => {
      state.update({ currentValue: state.currentValue + 1 })
    }

    const original = {
      state: { currentValue: 0 },
      Minus: {
        extends: 'IconButton',
        Icon: { name: 'minus' },
        onClick: minusClick
      },
      Value: {
        text: '{{ currentValue }}'
      },
      Plus: {
        extends: 'IconButton',
        Icon: { name: 'plus' },
        onClick: plusClick
      },
      extends: 'Flex',
      align: 'center flex-start',
      gap: 'Z',
      '> button': { theme: 'transparent' }
    }

    const shortened = shorten(original)

    // State preserved as-is
    expect(shortened.st).toEqual({ currentValue: 0 })
    // Functions preserved
    expect(shortened.Minus['@ck']).toBe(minusClick)
    expect(shortened.Plus['@ck']).toBe(plusClick)
    // Nested Icon component
    expect(shortened.Minus.Icon).toEqual({ nm: 'minus' })
    expect(shortened.Plus.Icon).toEqual({ nm: 'plus' })
    // Template string preserved
    expect(shortened.Value.tx).toBe('{{ currentValue }}')
    // CSS selector key preserved, value shortened
    expect(shortened['> button']).toEqual({ thm: 'transparent' })

    expect(expand(shortened)).toEqual(original)
  })

  test('SearchDropdown with deep nesting, functions, state, selectors', () => {
    const onInputFn = (e, el, state) => {
      const value = e.target.value.trim().toLowerCase()
      const filtered = state.data.filter((item) =>
        item.toLowerCase().includes(value)
      )
      state.replace({ searchValue: value, filtered: filtered })
    }
    const childPropClickFn = (ev, el, s) => {
      s.parent.update({
        selected: s.value,
        isOpen: false,
        searchValue: ''
      })
    }
    const isSelectedFn = (el, s) => s.selected !== 'Search and Select'
    const toggleFn = (e, el, s) => s.toggle('isOpen')
    const showOpenFn = (el, s) => s.isOpen
    const showSearchFn = (el, s) => !!s.searchValue && s.filtered.length
    const showNoSearchFn = (el, s) => !s.searchValue
    const showNoResultsFn = (el, s) => !!s.searchValue && !s.filtered.length
    const childrenFn = (el, s) => s.filtered

    const original = {
      state: {
        isOpen: false,
        selected: 'Search and Select',
        data: ['Los Angeles', 'New York', 'San Fransisco', 'San Diego'],
        filtered: [],
        searchValue: ''
      },
      SelectedContainer: {
        text: '{{ selected }}',
        padding: 'Z A2',
        minHeight: 'B2',
        position: 'relative',
        cursor: 'pointer',
        color: 'caption',
        isSelected: isSelectedFn,
        '.isSelected': { color: 'blue' },
        onClick: toggleFn
      },
      Options: {
        show: showOpenFn,
        borderWidth: '1px 0 0 0',
        borderStyle: 'solid',
        borderColor: 'line.35',
        padding: 'Z Z2',
        theme: 'dialog',
        flexFlow: 'y',
        round: '0 0 A2 A2',
        Input: {
          theme: 'field-dialog',
          placeholder: 'Search and Select',
          padding: 'Y2 A',
          margin: '- -Y',
          display: 'block',
          minWidth: '',
          boxSizing: 'border-box',
          border: 'none',
          outline: 'none',
          onInput: onInputFn
        },
        Results: {
          marginTop: 'X',
          show: showSearchFn,
          children: childrenFn,
          childrenAs: 'state',
          childProps: {
            padding: 'Z',
            text: '{{ value }}',
            onClick: childPropClickFn
          }
        },
        Placeholder: {
          padding: 'Z',
          show: showNoSearchFn,
          text: 'Enter name to search',
          color: 'disabled'
        },
        NoResults: {
          padding: 'Z',
          show: showNoResultsFn,
          text: 'No results found',
          color: 'disabled'
        }
      },
      position: 'relative',
      width: 'G3',
      theme: 'field',
      round: 'A2'
    }

    const shortened = shorten(original)

    // State preserved as-is (not recursed)
    expect(shortened.st).toEqual(original.state)

    // SelectedContainer — nested component
    expect(shortened.SelectedContainer.tx).toBe('{{ selected }}')
    expect(shortened.SelectedContainer.p).toBe('Z A2')
    expect(shortened.SelectedContainer.mnh).toBe('B2')
    expect(shortened.SelectedContainer.pos).toBe('relative')
    expect(shortened.SelectedContainer.cur).toBe('pointer')
    expect(shortened.SelectedContainer.c).toBe('caption')
    expect(shortened.SelectedContainer.isSelected).toBe(isSelectedFn)
    expect(shortened.SelectedContainer['.isSelected']).toEqual({ c: 'blue' })
    expect(shortened.SelectedContainer['@ck']).toBe(toggleFn)

    // Options.Input — deep nesting
    expect(shortened.Options.Input.thm).toBe('field-dialog')
    expect(shortened.Options.Input.phd).toBe('Search and Select')
    expect(shortened.Options.Input.bd).toBe('none')
    expect(shortened.Options.Input.ol).toBe('none')
    expect(shortened.Options.Input['@ip']).toBe(onInputFn)

    // Options.Results — childProps with functions
    expect(shortened.Options.Results.mt).toBe('X')
    expect(shortened.Options.Results.shw).toBe(showSearchFn)
    expect(shortened.Options.Results.ch).toBe(childrenFn)
    expect(shortened.Options.Results.cha).toBe('state')
    expect(shortened.Options.Results.cp.p).toBe('Z')
    expect(shortened.Options.Results.cp.tx).toBe('{{ value }}')
    expect(shortened.Options.Results.cp['@ck']).toBe(childPropClickFn)

    // Root props
    expect(shortened.pos).toBe('relative')
    expect(shortened.w).toBe('G3')
    expect(shortened.thm).toBe('field')
    expect(shortened.rnd).toBe('A2')

    // Full round-trip
    expect(expand(shortened)).toEqual(original)
  })

  test('component with suffix naming pattern', () => {
    const original = {
      NavButton: { text: 'All Networks', icon: 'chevron left' },
      NavButton_add: { icon: 'plus', text: 'Add node', margin: '- - - auto' }
    }
    const shortened = shorten(original)
    expect(shortened.NavButton).toEqual({
      tx: 'All Networks',
      ico: 'chevron left'
    })
    expect(shortened.NavButton_add).toEqual({
      ico: 'plus',
      tx: 'Add node',
      m: '- - - auto'
    })
    expect(expand(shortened)).toEqual(original)
  })

  test('childExtends as inline object', () => {
    const fn = (el, s) => ({ alignSelf: 'start' })
    const original = {
      childExtends: { extends: 'ListItem', padding: 'A' }
    }
    const shortened = shorten(original)
    expect(shortened.cex).toEqual({ ext: 'ListItem', p: 'A' })
    expect(expand(shortened)).toEqual(original)
  })

  test('multiple pseudo selectors', () => {
    const original = {
      ':hover': { background: 'deepFir' },
      ':active': { background: 'deepFir+5' },
      '::after': { content: '""', position: 'absolute' }
    }
    const shortened = shorten(original)
    expect(shortened[':hover']).toEqual({ bg: 'deepFir' })
    expect(shortened[':active']).toEqual({ bg: 'deepFir+5' })
    expect(shortened['::after']).toEqual({ cnt: '""', pos: 'absolute' })
    expect(expand(shortened)).toEqual(original)
  })

  test('dark/light mode cases', () => {
    const original = {
      '@dark': { background: 'gray-900', color: 'white' },
      '@light': { background: 'white', color: 'black' }
    }
    const shortened = shorten(original)
    expect(shortened['@dark']).toEqual({ bg: 'gray-900', c: 'white' })
    expect(expand(shortened)).toEqual(original)
  })

  test('negation case (!isActive)', () => {
    const original = {
      '.isActive': { background: 'blue' },
      '!isActive': { background: 'gray' }
    }
    const shortened = shorten(original)
    expect(shortened['.isActive']).toEqual({ bg: 'blue' })
    expect(shortened['!isActive']).toEqual({ bg: 'gray' })
    expect(expand(shortened)).toEqual(original)
  })

  test('global cases with $ prefix', () => {
    const original = {
      $ios: { color: 'black' },
      $android: { color: 'green' }
    }
    const shortened = shorten(original)
    expect(shortened['$ios']).toEqual({ c: 'black' })
    expect(expand(shortened)).toEqual(original)
  })

  test('& combinator selectors', () => {
    const original = {
      '&:hover': { opacity: '1' },
      '& > span': { color: 'red' }
    }
    const shortened = shorten(original)
    expect(shortened['&:hover']).toEqual({ op: '1' })
    expect(shortened['& > span']).toEqual({ c: 'red' })
    expect(expand(shortened)).toEqual(original)
  })
})

// ────────────────────────────────────────────────────────────────────────────
// stringify / parse tests
// ────────────────────────────────────────────────────────────────────────────

describe('stringify', () => {
  test('encodes flat component into in string', () => {
    const result = stringify({ extends: 'smbls.Avatar', boxSize: 'C2' })
    expect(result).toEqual({ in: 'ext:smbls.Avatar bsz:C2' })
  })

  test('encodes booleans in in string', () => {
    const result = stringify({ hidden: true, disabled: false })
    expect(result).toEqual({ in: 'hid !dis' })
  })

  test('keeps numbers as object keys', () => {
    const result = stringify({ zIndex: 99, opacity: 0.5 })
    expect(result).toEqual({ zi: 99, op: 0.5 })
  })

  test('encodes multi-word values with underscores', () => {
    const result = stringify({ padding: 'A B', align: 'center flex-start' })
    expect(result).toEqual({ in: 'p:A_B aln:center_flex-start' })
  })

  test('encodes primitive arrays into in string', () => {
    const result = stringify({ extends: ['Flex', 'Box'] })
    expect(result).toEqual({ in: 'ext:Flex,Box' })
  })

  test('keeps functions as shortened keys', () => {
    const fn = (e, el, s) => {}
    const result = stringify({ padding: 'A', onClick: fn })
    expect(result).toEqual({ in: 'p:A', '@ck': fn })
  })

  test('keeps PascalCase children, recurses into them', () => {
    const result = stringify({
      Header: { padding: 'A', color: 'red' },
      extends: 'Flex'
    })
    expect(result).toEqual({
      Header: { in: 'p:A c:red' },
      in: 'ext:Flex'
    })
  })

  test('keeps selector keys, recurses values', () => {
    const result = stringify({
      ':hover': { background: 'blue' },
      padding: 'A'
    })
    expect(result).toEqual({
      ':hover': { in: 'bg:blue' },
      in: 'p:A'
    })
  })

  test('keeps media query keys, recurses values', () => {
    const result = stringify({ '@mobile': { padding: 'A' }, gap: 'B' })
    expect(result).toEqual({ '@mobile': { in: 'p:A' }, in: 'g:B' })
  })

  test('keeps case keys', () => {
    const result = stringify({
      '.isActive': { color: 'blue' },
      '!isActive': { color: 'gray' }
    })
    expect(result).toEqual({
      '.isActive': { in: 'c:blue' },
      '!isActive': { in: 'c:gray' }
    })
  })

  test('preserves state as-is with shortened key', () => {
    const result = stringify({ state: { count: 0 }, padding: 'A' })
    expect(result).toEqual({ st: { count: 0 }, in: 'p:A' })
  })

  test('keeps arrays of objects as shortened key, recurses items', () => {
    const result = stringify({
      children: [{ text: 'hello' }, { text: 'world' }]
    })
    expect(result).toEqual({
      ch: [{ tx: 'hello' }, { tx: 'world' }]
    })
  })

  test('keeps childProps as shortened key, recurses', () => {
    const result = stringify({
      childProps: { theme: 'dialog', padding: 'A1 B2' }
    })
    expect(result).toEqual({ cp: { in: 'thm:dialog p:A1_B2' } })
  })

  test('empty object stays empty', () => {
    expect(stringify({})).toEqual({})
  })

  test('null child component stays null', () => {
    expect(stringify({ Input: null })).toEqual({ Input: null })
  })

  test('empty child component stays empty', () => {
    expect(stringify({ Avatar: {} })).toEqual({ Avatar: {} })
  })

  test('handles null/undefined input', () => {
    expect(stringify(null)).toBe(null)
    expect(stringify(undefined)).toBe(undefined)
  })

  test('Avatar component', () => {
    expect(stringify({ extends: 'smbls.Avatar', boxSize: 'C2' })).toEqual({
      in: 'ext:smbls.Avatar bsz:C2'
    })
  })

  test('ButtonSet component', () => {
    const result = stringify({
      extends: 'Flex',
      childExtends: 'Button',
      gap: 'Z',
      align: 'center flex-start',
      childProps: { theme: 'dialog', padding: 'A1 B2' },
      children: [{ text: 'BUTTON 1' }, { text: 'BUTTEN 2' }]
    })
    expect(result).toEqual({
      in: 'ext:Flex cex:Button g:Z aln:center_flex-start',
      cp: { in: 'thm:dialog p:A1_B2' },
      ch: [{ tx: 'BUTTON 1' }, { tx: 'BUTTEN 2' }]
    })
  })

  test('NumberPicker with functions and state', () => {
    const minusFn = (event, element, state) => {}
    const plusFn = (event, element, state) => {}
    const result = stringify({
      state: { currentValue: 0 },
      Minus: {
        extends: 'IconButton',
        Icon: { name: 'minus' },
        onClick: minusFn
      },
      Value: { text: '{{ currentValue }}' },
      Plus: {
        extends: 'IconButton',
        Icon: { name: 'plus' },
        onClick: plusFn
      },
      extends: 'Flex',
      align: 'center flex-start',
      gap: 'Z',
      '> button': { theme: 'transparent' }
    })
    expect(result.st).toEqual({ currentValue: 0 })
    expect(result.in).toBe('ext:Flex aln:center_flex-start g:Z')
    expect(result.Minus).toEqual({
      in: 'ext:IconButton',
      Icon: { in: 'nm:minus' },
      '@ck': minusFn
    })
    expect(result.Value).toEqual({ tx: '{{ currentValue }}' })
    expect(result.Plus).toEqual({
      in: 'ext:IconButton',
      Icon: { in: 'nm:plus' },
      '@ck': plusFn
    })
    expect(result['> button']).toEqual({ in: 'thm:transparent' })
  })

  test('Modal with $case and nested children', () => {
    const result = stringify({
      Hgroup: {
        gap: 'X1',
        H: { tag: 'h5', fontWeight: '700' },
        P: {}
      },
      IconButton: {
        position: 'absolute',
        right: 'X2',
        top: 'X2',
        round: '100%',
        $isSafari: { top: 'Z2', right: 'Z2' },
        Icon: { name: 'x' }
      },
      extends: 'Flex',
      boxSize: 'fit-content',
      theme: 'dialog'
    })
    expect(result.in).toBe('ext:Flex bsz:fit-content thm:dialog')
    expect(result.Hgroup.in).toBe('g:X1')
    expect(result.Hgroup.H).toEqual({ in: 'tg:h5 fw:700' })
    expect(result.Hgroup.P).toEqual({})
    expect(result.IconButton.in).toBe('pos:absolute rgt:X2 tp:X2 rnd:100%')
    expect(result.IconButton.$isSafari).toEqual({ in: 'tp:Z2 rgt:Z2' })
    expect(result.IconButton.Icon).toEqual({ in: 'nm:x' })
  })
})

describe('parse', () => {
  test('decodes in string back to flat props', () => {
    const result = parse({ in: 'ext:smbls.Avatar bsz:C2' })
    expect(result).toEqual({ extends: 'smbls.Avatar', boxSize: 'C2' })
  })

  test('decodes booleans from in string', () => {
    const result = parse({ in: 'hid !dis' })
    expect(result).toEqual({ hidden: true, disabled: false })
  })

  test('decodes in string values as strings', () => {
    const result = parse({ in: 'zi:99 op:0.5' })
    expect(result).toEqual({ zIndex: '99', opacity: '0.5' })
  })

  test('decodes underscores back to spaces', () => {
    const result = parse({ in: 'p:A_B aln:center_flex-start' })
    expect(result).toEqual({ padding: 'A B', align: 'center flex-start' })
  })

  test('decodes comma-separated arrays', () => {
    const result = parse({ in: 'ext:Flex,Box' })
    expect(result).toEqual({ extends: ['Flex', 'Box'] })
  })

  test('restores functions with expanded keys', () => {
    const fn = () => {}
    const result = parse({ '@ck': fn, in: 'p:A' })
    expect(result).toEqual({ padding: 'A', onClick: fn })
  })

  test('recurses into PascalCase children', () => {
    const result = parse({
      Header: { in: 'p:A c:red' },
      in: 'ext:Flex'
    })
    expect(result).toEqual({
      extends: 'Flex',
      Header: { padding: 'A', color: 'red' }
    })
  })

  test('recurses into selector keys', () => {
    const result = parse({ ':hover': { in: 'bg:blue' }, in: 'p:A' })
    expect(result).toEqual({ padding: 'A', ':hover': { background: 'blue' } })
  })

  test('preserves state value', () => {
    const result = parse({ st: { count: 0 }, in: 'p:A' })
    expect(result).toEqual({ state: { count: 0 }, padding: 'A' })
  })

  test('recurses into children array items', () => {
    const result = parse({ ch: [{ in: 'tx:hello' }, { in: 'tx:world' }] })
    expect(result).toEqual({ children: [{ text: 'hello' }, { text: 'world' }] })
  })

  test('recurses into childProps', () => {
    const result = parse({ cp: { in: 'thm:dialog p:A1_B2' } })
    expect(result).toEqual({
      childProps: { theme: 'dialog', padding: 'A1 B2' }
    })
  })

  test('handles empty object', () => {
    expect(parse({})).toEqual({})
  })

  test('handles null/undefined input', () => {
    expect(parse(null)).toBe(null)
    expect(parse(undefined)).toBe(undefined)
  })
})

// ────────────────────────────────────────────────────────────────────────────
// stringify/parse round-trip
// ────────────────────────────────────────────────────────────────────────────

describe('stringify/parse round-trip', () => {
  test('Avatar', () => {
    const original = { extends: 'smbls.Avatar', boxSize: 'C2' }
    expect(parse(stringify(original))).toEqual(original)
  })

  test('ButtonSet', () => {
    const original = {
      extends: 'Flex',
      childExtends: 'Button',
      gap: 'Z',
      align: 'center flex-start',
      childProps: { theme: 'dialog', padding: 'A1 B2' },
      children: [{ text: 'BUTTON 1' }, { text: 'BUTTEN 2' }]
    }
    expect(parse(stringify(original))).toEqual(original)
  })

  test('NumberPicker with functions and state', () => {
    const minusFn = (event, element, state) => {}
    const plusFn = (event, element, state) => {}
    const original = {
      state: { currentValue: 0 },
      Minus: {
        extends: 'IconButton',
        Icon: { name: 'minus' },
        onClick: minusFn
      },
      Value: { text: '{{ currentValue }}' },
      Plus: {
        extends: 'IconButton',
        Icon: { name: 'plus' },
        onClick: plusFn
      },
      extends: 'Flex',
      align: 'center flex-start',
      gap: 'Z',
      '> button': { theme: 'transparent' }
    }
    expect(parse(stringify(original))).toEqual(original)
  })

  test('Pills with childProps containing selectors', () => {
    const original = {
      extends: 'Flex',
      childExtends: 'Link',
      gap: 'C1',
      childProps: {
        boxSize: 'Z',
        round: '100%',
        cursor: 'pointer',
        text: '',
        '.isActive': { theme: 'primary' },
        '!isActive': { theme: 'tertiary' },
        ':active': { theme: 'primary' }
      },
      children: [{}, { isActive: true }],
      tag: 'nav'
    }
    expect(parse(stringify(original))).toEqual(original)
  })

  test('Modal with $case and nested children', () => {
    const original = {
      Hgroup: {
        gap: 'X1',
        H: { tag: 'h5', fontWeight: 700 },
        P: {}
      },
      IconButton: {
        position: 'absolute',
        right: 'X2',
        top: 'X2',
        round: '100%',
        $isSafari: { top: 'Z2', right: 'Z2' },
        Icon: { name: 'x' }
      },
      extends: 'Flex',
      boxSize: 'fit-content',
      align: 'stretch flex-start',
      minWidth: 'G+B',
      position: 'relative',
      round: 'B',
      theme: 'dialog',
      flow: 'y',
      padding: 'A2 A2 A1 A2',
      borderStyle: 'none'
    }
    expect(parse(stringify(original))).toEqual(original)
  })

  test('Stars with children array of objects', () => {
    const original = {
      extends: 'Flex',
      childExtends: 'Icon',
      fontSize: 'B',
      gap: 'W',
      children: [
        { name: 'star' },
        { name: 'star' },
        { name: 'star' },
        { name: 'star' },
        { name: 'star' }
      ]
    }
    expect(parse(stringify(original))).toEqual(original)
  })

  test('Accordion with state, functions, and case selectors', () => {
    const clickFn = (event, element, state) => {
      state.update({ activeAccordion: !state.activeAccordion })
    }
    const original = {
      state: { activeAccordion: false },
      ButtonParagraph: {
        cursor: 'pointer',
        gap: 'D1',
        onClick: clickFn,
        P: { text: 'Question text' },
        Button: {
          text: '',
          Icon: {
            name: 'chevronDown',
            '.activeAccordion': { transform: 'rotate(-180deg)' },
            transition: 'transform .3s ease'
          }
        }
      },
      P: {
        text: 'Answer text',
        margin: 0,
        '.activeAccordion': {
          minHeight: '4em',
          maxHeight: '10em',
          opacity: 1
        },
        '!activeAccordion': { minHeight: 0, maxHeight: 0, opacity: 0 }
      },
      extends: 'Flex',
      flow: 'y',
      gap: 'Y2',
      position: 'relative'
    }
    expect(parse(stringify(original))).toEqual(original)
  })

  test('AvatarChatPreview with deep nesting', () => {
    const original = {
      Avatar: {},
      Flex: {
        flow: 'y',
        flex: 1,
        '> *': { minWidth: '100%' },
        ValueHeading: {
          H: {},
          UnitValue: {
            flow: 'row-reverse',
            Unit: { text: 'am' },
            Value: { text: '2:20' }
          }
        },
        NotCounterParagraph: {
          P: { whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: 'F2' },
          NotificationCounter: {}
        }
      },
      extends: 'Flex',
      gap: 'Z1',
      minWidth: 'G3',
      align: 'center flex-start'
    }
    expect(parse(stringify(original))).toEqual(original)
  })

  test('SearchDropdown with deep nesting and functions', () => {
    const isSelectedFn = (el, s) => s.selected !== 'Search and Select'
    const toggleFn = (e, el, s) => s.toggle('isOpen')
    const showFn = (el, s) => s.isOpen
    const onInputFn = (e, el, state) => {}
    const showSearchFn = (el, s) => !!s.searchValue && s.filtered.length
    const childrenFn = (el, s) => s.filtered
    const childClickFn = (ev, el, s) => {}
    const showNoSearchFn = (el, s) => !s.searchValue
    const showNoResultsFn = (el, s) => !!s.searchValue && !s.filtered.length

    const original = {
      state: {
        isOpen: false,
        selected: 'Search and Select',
        data: ['Los Angeles', 'New York'],
        filtered: [],
        searchValue: ''
      },
      SelectedContainer: {
        text: '{{ selected }}',
        padding: 'Z A2',
        minHeight: 'B2',
        position: 'relative',
        cursor: 'pointer',
        color: 'caption',
        isSelected: isSelectedFn,
        '.isSelected': { color: 'blue' },
        onClick: toggleFn
      },
      Options: {
        show: showFn,
        borderWidth: '1px 0 0 0',
        borderStyle: 'solid',
        borderColor: 'line.35',
        padding: 'Z Z2',
        theme: 'dialog',
        flexFlow: 'y',
        round: '0 0 A2 A2',
        Input: {
          theme: 'field-dialog',
          placeholder: 'Search and Select',
          padding: 'Y2 A',
          margin: '- -Y',
          display: 'block',
          minWidth: '',
          boxSizing: 'border-box',
          border: 'none',
          outline: 'none',
          onInput: onInputFn
        },
        Results: {
          marginTop: 'X',
          show: showSearchFn,
          children: childrenFn,
          childrenAs: 'state',
          childProps: {
            padding: 'Z',
            text: '{{ value }}',
            onClick: childClickFn
          }
        },
        Placeholder: {
          padding: 'Z',
          show: showNoSearchFn,
          text: 'Enter name to search',
          color: 'disabled'
        },
        NoResults: {
          padding: 'Z',
          show: showNoResultsFn,
          text: 'No results found',
          color: 'disabled'
        }
      },
      position: 'relative',
      width: 'G3',
      theme: 'field',
      round: 'A2'
    }
    expect(parse(stringify(original))).toEqual(original)
  })
})

// ────────────────────────────────────────────────────────────────────────────
// stringifyFurther / parseFurther tests
// ────────────────────────────────────────────────────────────────────────────

describe('stringifyFurther', () => {
  test('encodes flat component into in string', () => {
    const result = stringifyFurther({ extends: 'Flex', boxSize: 'C2' })
    expect(result).toEqual({ in: 'ext:Flex bsz:C2' })
  })

  test('inlines numbers with # prefix', () => {
    const result = stringifyFurther({ zIndex: 99, opacity: 0.5 })
    expect(result).toEqual({ in: 'zi:#99 op:#0.5' })
  })

  test('inlines strings with commas using escape', () => {
    const result = stringifyFurther({
      boxShadow: 'black.1 0px 2px 8px 0px'
    })
    expect(result.in).toBe('bxsh:black.1_0px_2px_8px_0px')
  })

  test('inlines strings with underscores using escape', () => {
    const result = stringifyFurther({ background: 'my_custom_token' })
    expect(result.in).toBe('bg:my\\_custom\\_token')
  })

  test('inlines strings with backslashes using escape', () => {
    const result = stringifyFurther({ content: '"\\\\"' })
    // content is skip-inline, stays as separate key
    expect(result.cnt).toBe('"\\\\"')
  })

  test('collapses leaf children to strings', () => {
    const result = stringifyFurther({
      Icon: { name: 'search', boxSize: 'A' }
    })
    expect(result.Icon).toBe('nm:search bsz:A')
  })

  test('collapses selector-only objects to strings', () => {
    const result = stringifyFurther({
      '@mobile': { padding: 'Y2 A' },
      ':hover': { background: 'gray2+2' }
    })
    expect(result['@mobile']).toBe('p:Y2_A')
    expect(result[':hover']).toBe('bg:gray2+2')
  })

  test('does NOT collapse children with mixed content', () => {
    const fn = () => {}
    const result = stringifyFurther({
      Button: { padding: 'A', onClick: fn }
    })
    expect(typeof result.Button).toBe('object')
    expect(result.Button['@ck']).toBe(fn)
    expect(result.Button.in).toBe('p:A')
  })

  test('does NOT collapse selectors with nested children', () => {
    const result = stringifyFurther({
      ':hover': { background: 'blue', Icon: { color: 'white' } }
    })
    expect(typeof result[':hover']).toBe('object')
    expect(result[':hover'].in).toBe('bg:blue')
    expect(result[':hover'].Icon).toBe('c:white')
  })

  test('preserves empty child objects', () => {
    expect(stringifyFurther({ Avatar: {} })).toEqual({ Avatar: {} })
  })

  test('preserves null child values', () => {
    expect(stringifyFurther({ Input: null })).toEqual({ Input: null })
  })

  test('preserves state as-is', () => {
    const result = stringifyFurther({ state: { count: 0 }, padding: 'A' })
    expect(result).toEqual({ st: { count: 0 }, in: 'p:A' })
  })

  test('preserves functions with shortened key', () => {
    const fn = (e, el, s) => {}
    const result = stringifyFurther({ onClick: fn })
    expect(result['@ck']).toBe(fn)
  })

  test('keeps skip-inline keys as separate', () => {
    const result = stringifyFurther({ text: 'Hello', padding: 'A' })
    expect(result.tx).toBe('Hello')
    expect(result.in).toBe('p:A')
  })

  test('handles booleans', () => {
    const result = stringifyFurther({ hidden: true, disabled: false })
    expect(result).toEqual({ in: 'hid !dis' })
  })

  test('handles arrays', () => {
    const result = stringifyFurther({ extends: ['Flex', 'Box'] })
    expect(result).toEqual({ in: 'ext:Flex,Box' })
  })

  test('handles single-element arrays as separate keys', () => {
    const result = stringifyFurther({ extends: ['Flex'] })
    expect(result).toEqual({ ext: ['Flex'] })
  })

  test('handles null/undefined input', () => {
    expect(stringifyFurther(null)).toBe(null)
    expect(stringifyFurther(undefined)).toBe(undefined)
  })

  test('handles empty object', () => {
    expect(stringifyFurther({})).toEqual({})
  })

  test('collapses case keys with only inline props', () => {
    const result = stringifyFurther({
      '.isActive': { background: 'blue', color: 'white' },
      '!isActive': { background: 'gray' }
    })
    expect(result['.isActive']).toBe('bg:blue c:white')
    expect(result['!isActive']).toBe('bg:gray')
  })

  test('collapses $case keys', () => {
    const result = stringifyFurther({
      $ios: { color: 'black' }
    })
    expect(result.$ios).toBe('c:black')
  })

  test('collapses dark/light mode', () => {
    const result = stringifyFurther({
      '@dark': { background: 'gray1', color: 'white' }
    })
    expect(result['@dark']).toBe('bg:gray1 c:white')
  })

  test('deep nesting with collapse', () => {
    const result = stringifyFurther({
      Logo: {
        extends: 'Flex',
        align: 'center',
        Icon: { name: 'logo', boxSize: 'B1' },
        Title: {
          tag: 'strong',
          text: 'Dashboard',
          '@mobile': { display: 'none' }
        }
      }
    })
    expect(result.Logo.Icon).toBe('nm:logo bsz:B1')
    expect(result.Logo.Title.tx).toBe('Dashboard')
    expect(result.Logo.Title['@mobile']).toBe('d:none')
    expect(result.Logo.in).toBe('ext:Flex aln:center')
  })

  test('transition with commas gets inlined', () => {
    const result = stringifyFurther({
      transition: 'background 0.15s ease, border-color 0.15s ease'
    })
    expect(result.in).toBe(
      'trn:background_0.15s_ease\\,_border-color_0.15s_ease'
    )
  })
})

describe('parseFurther', () => {
  test('decodes in string to full props', () => {
    const result = parseFurther({ in: 'ext:Flex bsz:C2' })
    expect(result).toEqual({ extends: 'Flex', boxSize: 'C2' })
  })

  test('decodes # numbers back to actual numbers', () => {
    const result = parseFurther({ in: 'zi:#99 op:#0.5' })
    expect(result).toEqual({ zIndex: 99, opacity: 0.5 })
  })

  test('decodes escaped commas back to literal commas', () => {
    const result = parseFurther({
      in: 'bxsh:black.1_0px_2px_8px_0px'
    })
    expect(result).toEqual({
      boxShadow: 'black.1 0px 2px 8px 0px'
    })
  })

  test('decodes escaped underscores back to literal underscores', () => {
    const result = parseFurther({ in: 'bg:my\\_custom\\_token' })
    expect(result).toEqual({ background: 'my_custom_token' })
  })

  test('decodes collapsed child strings to objects', () => {
    const result = parseFurther({ Icon: 'nm:search bsz:A' })
    expect(result).toEqual({
      Icon: { name: 'search', boxSize: 'A' }
    })
  })

  test('decodes collapsed selector strings to objects', () => {
    const result = parseFurther({
      '@mobile': 'p:Y2_A',
      ':hover': 'bg:gray2+2'
    })
    expect(result).toEqual({
      '@mobile': { padding: 'Y2 A' },
      ':hover': { background: 'gray2+2' }
    })
  })

  test('decodes children with object values normally', () => {
    const fn = () => {}
    const result = parseFurther({
      Button: { '@ck': fn, in: 'p:A' }
    })
    expect(result).toEqual({
      Button: { padding: 'A', onClick: fn }
    })
  })

  test('decodes booleans', () => {
    const result = parseFurther({ in: 'hid !dis' })
    expect(result).toEqual({ hidden: true, disabled: false })
  })

  test('decodes comma-separated arrays', () => {
    const result = parseFurther({ in: 'ext:Flex,Box' })
    expect(result).toEqual({ extends: ['Flex', 'Box'] })
  })

  test('decodes case key strings', () => {
    const result = parseFurther({
      '.isActive': 'bg:blue c:white',
      '!isActive': 'bg:gray'
    })
    expect(result).toEqual({
      '.isActive': { background: 'blue', color: 'white' },
      '!isActive': { background: 'gray' }
    })
  })

  test('preserves state', () => {
    const result = parseFurther({ st: { count: 0 }, in: 'p:A' })
    expect(result).toEqual({ state: { count: 0 }, padding: 'A' })
  })

  test('expands event abbreviations', () => {
    const fn = () => {}
    const result = parseFurther({ '@ck': fn, in: 'p:A' })
    expect(result).toEqual({ padding: 'A', onClick: fn })
  })

  test('handles empty object', () => {
    expect(parseFurther({})).toEqual({})
  })

  test('handles null/undefined input', () => {
    expect(parseFurther(null)).toBe(null)
    expect(parseFurther(undefined)).toBe(undefined)
  })

  test('handles empty child objects', () => {
    expect(parseFurther({ Avatar: {} })).toEqual({ Avatar: {} })
  })

  test('handles null child values', () => {
    expect(parseFurther({ Input: null })).toEqual({ Input: null })
  })
})

// ────────────────────────────────────────────────────────────────────────────
// stringifyFurther/parseFurther round-trip
// ────────────────────────────────────────────────────────────────────────────

describe('stringifyFurther/parseFurther round-trip', () => {
  test('flat component', () => {
    const original = { extends: 'Flex', boxSize: 'C2' }
    expect(parseFurther(stringifyFurther(original))).toEqual(original)
  })

  test('component with numbers', () => {
    const original = { zIndex: 99, opacity: 0.5, padding: 'A' }
    expect(parseFurther(stringifyFurther(original))).toEqual(original)
  })

  test('component with commas in values', () => {
    const original = {
      boxShadow: 'black.1 0px 2px 8px 0px',
      transition: 'background 0.15s ease, border-color 0.15s ease'
    }
    expect(parseFurther(stringifyFurther(original))).toEqual(original)
  })

  test('component with underscores in values', () => {
    const original = { background: 'my_custom_token' }
    expect(parseFurther(stringifyFurther(original))).toEqual(original)
  })

  test('component with backslash in values', () => {
    const original = { background: 'test\\value' }
    expect(parseFurther(stringifyFurther(original))).toEqual(original)
  })

  test('component with booleans', () => {
    const original = { hidden: true, disabled: false }
    expect(parseFurther(stringifyFurther(original))).toEqual(original)
  })

  test('component with arrays', () => {
    const original = { extends: ['Flex', 'Box'] }
    expect(parseFurther(stringifyFurther(original))).toEqual(original)
  })

  test('leaf child components collapse and restore', () => {
    const original = {
      Icon: { name: 'search', boxSize: 'A' },
      Badge: { background: 'red', color: 'white' }
    }
    expect(parseFurther(stringifyFurther(original))).toEqual(original)
  })

  test('selector collapse and restore', () => {
    const original = {
      '@mobile': { padding: 'Y2 A' },
      '@tablet': { padding: 'Z A1' },
      ':hover': { background: 'gray2+2' },
      '.isActive': { background: 'blue', color: 'white' },
      '!isActive': { background: 'gray' }
    }
    expect(parseFurther(stringifyFurther(original))).toEqual(original)
  })

  test('component with functions preserves them', () => {
    const fn = (e, el, s) => {}
    const original = { padding: 'A', onClick: fn }
    expect(parseFurther(stringifyFurther(original))).toEqual(original)
  })

  test('state preserved', () => {
    const original = { state: { count: 0, items: [] }, padding: 'A' }
    expect(parseFurther(stringifyFurther(original))).toEqual(original)
  })

  test('ButtonSet component', () => {
    const original = {
      extends: 'Flex',
      childExtends: 'Button',
      gap: 'Z',
      align: 'center flex-start',
      childProps: { theme: 'dialog', padding: 'A1 B2' },
      children: [{ text: 'BUTTON 1' }, { text: 'BUTTEN 2' }]
    }
    expect(parseFurther(stringifyFurther(original))).toEqual(original)
  })

  test('NumberPicker with functions, state, selectors', () => {
    const minusFn = (event, element, state) => {}
    const plusFn = (event, element, state) => {}
    const original = {
      state: { currentValue: 0 },
      Minus: {
        extends: 'IconButton',
        Icon: { name: 'minus' },
        onClick: minusFn
      },
      Value: { text: '{{ currentValue }}' },
      Plus: {
        extends: 'IconButton',
        Icon: { name: 'plus' },
        onClick: plusFn
      },
      extends: 'Flex',
      align: 'center flex-start',
      gap: 'Z',
      '> button': { theme: 'transparent' }
    }
    expect(parseFurther(stringifyFurther(original))).toEqual(original)
  })

  test('Modal with $case and nested children', () => {
    const original = {
      Hgroup: {
        gap: 'X1',
        H: { tag: 'h5', fontWeight: 700 },
        P: {}
      },
      IconButton: {
        position: 'absolute',
        right: 'X2',
        top: 'X2',
        round: '100%',
        $isSafari: { top: 'Z2', right: 'Z2' },
        Icon: { name: 'x' }
      },
      extends: 'Flex',
      boxSize: 'fit-content',
      align: 'stretch flex-start',
      minWidth: 'G+B',
      position: 'relative',
      round: 'B',
      theme: 'dialog',
      flow: 'y',
      padding: 'A2 A2 A1 A2',
      borderStyle: 'none'
    }
    expect(parseFurther(stringifyFurther(original))).toEqual(original)
  })

  test('SearchDropdown with deep nesting and functions', () => {
    const isSelectedFn = (el, s) => s.selected !== 'Search and Select'
    const toggleFn = (e, el, s) => s.toggle('isOpen')
    const showFn = (el, s) => s.isOpen
    const onInputFn = (e, el, state) => {}
    const showSearchFn = (el, s) => !!s.searchValue && s.filtered.length
    const childrenFn = (el, s) => s.filtered
    const childClickFn = (ev, el, s) => {}
    const showNoSearchFn = (el, s) => !s.searchValue
    const showNoResultsFn = (el, s) => !!s.searchValue && !s.filtered.length

    const original = {
      state: {
        isOpen: false,
        selected: 'Search and Select',
        data: ['Los Angeles', 'New York'],
        filtered: [],
        searchValue: ''
      },
      SelectedContainer: {
        text: '{{ selected }}',
        padding: 'Z A2',
        minHeight: 'B2',
        position: 'relative',
        cursor: 'pointer',
        color: 'caption',
        isSelected: isSelectedFn,
        '.isSelected': { color: 'blue' },
        onClick: toggleFn
      },
      Options: {
        show: showFn,
        borderWidth: '1px 0 0 0',
        borderStyle: 'solid',
        borderColor: 'line.35',
        padding: 'Z Z2',
        theme: 'dialog',
        flexFlow: 'y',
        round: '0 0 A2 A2',
        Input: {
          theme: 'field-dialog',
          placeholder: 'Search and Select',
          padding: 'Y2 A',
          margin: '- -Y',
          display: 'block',
          minWidth: '',
          boxSizing: 'border-box',
          border: 'none',
          outline: 'none',
          onInput: onInputFn
        },
        Results: {
          marginTop: 'X',
          show: showSearchFn,
          children: childrenFn,
          childrenAs: 'state',
          childProps: {
            padding: 'Z',
            text: '{{ value }}',
            onClick: childClickFn
          }
        },
        Placeholder: {
          padding: 'Z',
          show: showNoSearchFn,
          text: 'Enter name to search',
          color: 'disabled'
        },
        NoResults: {
          padding: 'Z',
          show: showNoResultsFn,
          text: 'No results found',
          color: 'disabled'
        }
      },
      position: 'relative',
      width: 'G3',
      theme: 'field',
      round: 'A2'
    }
    expect(parseFurther(stringifyFurther(original))).toEqual(original)
  })

  test('complex TopNav with all feature types', () => {
    const clickFn = (e, el, s) => s.update({ sidebarOpen: !s.sidebarOpen })
    const original = {
      extends: 'Flex',
      tag: 'header',
      padding: 'Z2 A2',
      background: 'gray2',
      align: 'center space-between',
      position: 'sticky',
      top: '0',
      zIndex: 100,
      borderWidth: '0 0 1px 0',
      borderStyle: 'solid',
      borderColor: 'line',
      transition: 'background 0.2s ease',
      boxShadow: 'black.1 0px 2px 8px 0px',
      '@mobile': { padding: 'Y2 A' },
      '@tablet': { padding: 'Z A1' },
      ':hover': { background: 'gray2+2' },
      LeftSection: {
        extends: 'Flex',
        align: 'center',
        gap: 'A',
        MenuButton: {
          extends: 'IconButton',
          icon: 'menu',
          theme: 'transparent',
          padding: 'Y2',
          borderRadius: 'Z',
          cursor: 'pointer',
          display: 'none',
          '@tablet': { display: 'flex' },
          onClick: clickFn
        }
      }
    }
    expect(parseFurther(stringifyFurther(original))).toEqual(original)
  })

  test('Pills with childProps containing selectors', () => {
    const original = {
      extends: 'Flex',
      childExtends: 'Link',
      gap: 'C1',
      childProps: {
        boxSize: 'Z',
        round: '100%',
        cursor: 'pointer',
        text: '',
        '.isActive': { theme: 'primary' },
        '!isActive': { theme: 'tertiary' },
        ':active': { theme: 'primary' }
      },
      children: [{}, { isActive: true }],
      tag: 'nav'
    }
    expect(parseFurther(stringifyFurther(original))).toEqual(original)
  })

  test('Accordion with state, functions, and case selectors', () => {
    const clickFn = (event, element, state) => {
      state.update({ activeAccordion: !state.activeAccordion })
    }
    const original = {
      state: { activeAccordion: false },
      ButtonParagraph: {
        cursor: 'pointer',
        gap: 'D1',
        onClick: clickFn,
        P: { text: 'Question text' },
        Button: {
          text: '',
          Icon: {
            name: 'chevronDown',
            '.activeAccordion': { transform: 'rotate(-180deg)' },
            transition: 'transform .3s ease'
          }
        }
      },
      P: {
        text: 'Answer text',
        margin: 0,
        '.activeAccordion': {
          minHeight: '4em',
          maxHeight: '10em',
          opacity: 1
        },
        '!activeAccordion': { minHeight: 0, maxHeight: 0, opacity: 0 }
      },
      extends: 'Flex',
      flow: 'y',
      gap: 'Y2',
      position: 'relative'
    }
    expect(parseFurther(stringifyFurther(original))).toEqual(original)
  })

  test('AvatarChatPreview with deep nesting', () => {
    const original = {
      Avatar: {},
      Flex: {
        flow: 'y',
        flex: 1,
        '> *': { minWidth: '100%' },
        ValueHeading: {
          H: {},
          UnitValue: {
            flow: 'row-reverse',
            Unit: { text: 'am' },
            Value: { text: '2:20' }
          }
        },
        NotCounterParagraph: {
          P: { whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: 'F2' },
          NotificationCounter: {}
        }
      },
      extends: 'Flex',
      gap: 'Z1',
      minWidth: 'G3',
      align: 'center flex-start'
    }
    expect(parseFurther(stringifyFurther(original))).toEqual(original)
  })
})
