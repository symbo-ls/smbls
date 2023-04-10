'use strict'

import { toDashCase } from './'
// import { convert } from 'domql-to-mitosis/src/convert'

export const stringifyProps = (props, indent = 2) => JSON.stringify(props, null, indent)
export const replaceKeysWithAttr = str => str
  .replaceAll('": "', '="')
  .replaceAll('\n  "', ' ')
  .replaceAll('{ ', '\n  ')
  .replaceAll('}', '')
  .replaceAll(', ', '\n  ')

export const codify = (key, props) => ({
  react: `import { ${key} } from '@symbo.ls/react'

const props = ${stringifyProps(props)}

<${key} {...props} />`,

  domql: `import { ${key} } from 'smbls'

const props = ${stringifyProps(props)}

const component = {
  extend: ${key},
  props
}`,

  iframe: `<iframe
  title="${key}"
  style="border: 0; resize: both; padding: 0 10px 10px 0"
  src="https://demo.symbols.app/scene/${key}/fullscreen/smbls.symbo.ls" 
  referrerpolicy="no-referrer-when-downgrade"
></iframe>`,

  html: `<script src="smbls.js"></script>

<${key && toDashCase(key)} ${replaceKeysWithAttr(stringifyProps(props))}/>`
})
