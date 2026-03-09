import {
  shorten,
  expand,
  stringify,
  parse,
  stringifyFurther,
  parseFurther
} from '../src/index.js'
import * as defaultComponents from '../examples/default/index.js'
import * as landingComponents from '../examples/landing/index.js'

/**
 * For every exported component in the examples folders, verify that
 * expand(shorten(component)) produces an object deeply equal to the original.
 *
 * This guarantees lossless round-tripping for real-world components.
 */

describe('examples/default — shorten/expand round-trip', () => {
  const entries = Object.entries(defaultComponents)

  test.each(entries)('%s', (_name, component) => {
    const shortened = shorten(component)
    const expanded = expand(shortened)
    expect(expanded).toEqual(component)
  })
})

describe('examples/landing — shorten/expand round-trip', () => {
  const entries = Object.entries(landingComponents)

  test.each(entries)('%s', (_name, component) => {
    const shortened = shorten(component)
    const expanded = expand(shortened)
    expect(expanded).toEqual(component)
  })
})

describe('examples/default — stringify/parse round-trip', () => {
  const entries = Object.entries(defaultComponents)

  test.each(entries)('%s', (_name, component) => {
    const stringified = stringify(component)
    const parsed = parse(stringified)
    expect(parsed).toEqual(component)
  })
})

describe('examples/landing — stringify/parse round-trip', () => {
  const entries = Object.entries(landingComponents)

  test.each(entries)('%s', (_name, component) => {
    const stringified = stringify(component)
    const parsed = parse(stringified)
    expect(parsed).toEqual(component)
  })
})

describe('examples/default — stringifyFurther/parseFurther round-trip', () => {
  const entries = Object.entries(defaultComponents)

  test.each(entries)('%s', (_name, component) => {
    const stringified = stringifyFurther(component)
    const parsed = parseFurther(stringified)
    expect(parsed).toEqual(component)
  })
})

describe('examples/landing — stringifyFurther/parseFurther round-trip', () => {
  const entries = Object.entries(landingComponents)

  test.each(entries)('%s', (_name, component) => {
    const stringified = stringifyFurther(component)
    const parsed = parseFurther(stringified)
    expect(parsed).toEqual(component)
  })
})
