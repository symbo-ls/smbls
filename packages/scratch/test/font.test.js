'use strict'

import {
  getFontFormat,
  isGoogleFontsUrl,
  setFontImport,
  setCustomFont,
  setCustomFontMedia,
  getFontFaceEachString,
  getFontFaceString
} from '../src/utils/font'

import { setFont } from '../src/system/font'

// --- getFontFormat ---

test('getFontFormat returns woff2 for .woff2 URLs', () => {
  expect(getFontFormat('https://example.com/Inter.woff2')).toBe('woff2')
})

test('getFontFormat returns woff for .woff URLs', () => {
  expect(getFontFormat('https://example.com/Inter.woff')).toBe('woff')
})

test('getFontFormat returns ttf for .ttf URLs', () => {
  expect(getFontFormat('/fonts/Inter.ttf')).toBe('ttf')
})

test('getFontFormat returns otf for .otf URLs', () => {
  expect(getFontFormat('/fonts/Inter.otf')).toBe('otf')
})

test('getFontFormat returns null for Google Fonts CSS URLs', () => {
  expect(
    getFontFormat(
      'https://fonts.googleapis.com/css2?family=Inter:wght@100..900'
    )
  ).toBe(null)
})

test('getFontFormat returns null for URLs with query params but no font extension', () => {
  expect(getFontFormat('https://example.com/api/font?name=inter')).toBe(null)
})

test('getFontFormat handles URL with hash', () => {
  expect(getFontFormat('https://example.com/Inter.woff2#iefix')).toBe('woff2')
})

// --- isGoogleFontsUrl ---

test('isGoogleFontsUrl detects fonts.googleapis.com', () => {
  expect(
    isGoogleFontsUrl(
      'https://fonts.googleapis.com/css2?family=Inter:wght@100..900'
    )
  ).toBe(true)
})

test('isGoogleFontsUrl detects fonts.gstatic.com', () => {
  expect(
    isGoogleFontsUrl('https://fonts.gstatic.com/s/inter/v13/abc.woff2')
  ).toBe(true)
})

test('isGoogleFontsUrl returns false for other URLs', () => {
  expect(isGoogleFontsUrl('https://example.com/Inter.woff2')).toBe(false)
})

test('isGoogleFontsUrl returns false for null/undefined', () => {
  expect(isGoogleFontsUrl(null)).toBeFalsy()
  expect(isGoogleFontsUrl(undefined)).toBeFalsy()
})

// --- setFontImport ---

test('setFontImport generates @import statement', () => {
  const url =
    'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap'
  expect(setFontImport(url)).toBe(`@import url('${url}');`)
})

// --- setCustomFont ---

test('setCustomFont generates font-face body with weight', () => {
  const result = setCustomFont('Inter', '/fonts/Inter-Regular.woff2', 400)
  expect(result).toContain("font-family: 'Inter'")
  expect(result).toContain('font-style: normal')
  expect(result).toContain('font-weight: 400')
  expect(result).toContain(
    "src: url('/fonts/Inter-Regular.woff2') format('woff2')"
  )
})

test('setCustomFont omits font-weight when weight is falsy', () => {
  const result = setCustomFont('Inter', '/fonts/Inter.woff2')
  expect(result).toContain("font-family: 'Inter'")
  expect(result).not.toContain('font-weight')
})

test('setCustomFont supports font-weight range for variable fonts', () => {
  const result = setCustomFont(
    'Inter',
    '/fonts/Inter-Variable.woff2',
    '100 900'
  )
  expect(result).toContain('font-weight: 100 900')
})

test('setCustomFont includes fontStretch when provided', () => {
  const result = setCustomFont(
    'Inter',
    '/fonts/Inter-Variable.woff2',
    '100 900',
    {
      fontStretch: '25% 151%'
    }
  )
  expect(result).toContain('font-stretch: 25% 151%')
})

test('setCustomFont includes fontDisplay when provided', () => {
  const result = setCustomFont(
    'Inter',
    '/fonts/Inter-Variable.woff2',
    '100 900',
    {
      fontDisplay: 'swap'
    }
  )
  expect(result).toContain('font-display: swap')
})

test('setCustomFont omits format for Google Fonts CSS URLs', () => {
  const url = 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900'
  const result = setCustomFont('Inter', url, '100 900')
  expect(result).not.toContain('format(')
  expect(result).toContain(`src: url('${url}')`)
})

// --- setCustomFontMedia ---

test('setCustomFontMedia wraps in @font-face', () => {
  const result = setCustomFontMedia('Inter', '/fonts/Inter.woff2', 400)
  expect(result).toContain('@font-face')
  expect(result).toContain("font-family: 'Inter'")
  expect(result).toContain('font-weight: 400')
})

// --- getFontFaceEachString ---

test('getFontFaceEachString handles array of weights (traditional fonts)', () => {
  const weights = [
    { url: '/fonts/Inter-Regular.woff2', fontWeight: 400 },
    { url: '/fonts/Inter-Bold.woff2', fontWeight: 700 }
  ]
  const result = getFontFaceEachString('Inter', weights)
  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBe(2)
  expect(result[0]).toContain('@font-face')
  expect(result[0]).toContain('font-weight: 400')
  expect(result[1]).toContain('font-weight: 700')
})

test('getFontFaceEachString handles single font object', () => {
  const weights = { url: '/fonts/Inter.woff2' }
  const result = getFontFaceEachString('Inter', weights)
  expect(typeof result).toBe('string')
  expect(result).toContain('@font-face')
  expect(result).toContain("font-family: 'Inter'")
})

test('getFontFaceEachString handles isVariable with Google Fonts URL', () => {
  const weights = {
    url: 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap',
    isVariable: true,
    fontWeight: '100 900'
  }
  const result = getFontFaceEachString('Inter', weights)
  expect(typeof result).toBe('string')
  expect(result).toContain('@import url(')
  expect(result).toContain('fonts.googleapis.com')
  expect(result).not.toContain('@font-face')
})

test('getFontFaceEachString handles isVariable with self-hosted woff2', () => {
  const weights = {
    url: '/fonts/Inter-Variable.woff2',
    isVariable: true,
    fontWeight: '100 900'
  }
  const result = getFontFaceEachString('Inter', weights)
  expect(typeof result).toBe('string')
  expect(result).toContain('@font-face')
  expect(result).toContain('font-weight: 100 900')
  expect(result).toContain("format('woff2')")
  expect(result).toContain('font-display: swap')
})

test('getFontFaceEachString handles isVariable with fontStretch', () => {
  const weights = {
    url: '/fonts/Inter-Variable.woff2',
    isVariable: true,
    fontWeight: '100 900',
    fontStretch: '75% 125%'
  }
  const result = getFontFaceEachString('Inter', weights)
  expect(result).toContain('font-stretch: 75% 125%')
})

test('getFontFaceEachString handles isVariable with custom fontDisplay', () => {
  const weights = {
    url: '/fonts/Inter-Variable.woff2',
    isVariable: true,
    fontWeight: '100 900',
    fontDisplay: 'optional'
  }
  const result = getFontFaceEachString('Inter', weights)
  expect(result).toContain('font-display: optional')
})

// --- getFontFaceString (integration) ---

test('getFontFaceString processes multiple fonts including variable', () => {
  const LIBRARY = {
    Inter: {
      value: {
        url: 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap',
        isVariable: true,
        fontWeight: '100 900'
      }
    },
    Roboto: {
      value: [
        { url: '/fonts/Roboto-Regular.woff2', fontWeight: 400 },
        { url: '/fonts/Roboto-Bold.woff2', fontWeight: 700 }
      ]
    }
  }
  const result = getFontFaceString(LIBRARY)
  expect(result.length).toBe(2)
  // Inter should be @import
  expect(result[0]).toContain('@import url(')
  // Roboto should be array of @font-face
  expect(Array.isArray(result[1])).toBe(true)
  expect(result[1].length).toBe(2)
})

// --- Google Webfonts stress test ---

test('Google Webfonts: Inter variable', () => {
  const config = {
    url: 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap',
    isVariable: true,
    fontWeight: '100 900'
  }
  const result = getFontFaceEachString('Inter', config)
  expect(result).toBe(
    "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');"
  )
})

test('Google Webfonts: Roboto Flex variable with stretch', () => {
  const config = {
    url: 'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap',
    isVariable: true,
    fontWeight: '100 1000',
    fontStretch: '25% 151%'
  }
  const result = getFontFaceEachString('Roboto Flex', config)
  expect(result).toContain('@import url(')
  expect(result).toContain('Roboto+Flex')
})

test('Google Webfonts: Playfair Display with specific weights (non-variable)', () => {
  const config = [
    {
      url: 'https://fonts.gstatic.com/s/playfairdisplay/v30/nuFlD-vYSZviVYUb_rj3ij__anPXBYf9pWkU5A.woff2',
      fontWeight: 400
    },
    {
      url: 'https://fonts.gstatic.com/s/playfairdisplay/v30/nuFlD-vYSZviVYUb_rj3ij__anPXBYf9p2kZ5A.woff2',
      fontWeight: 700
    }
  ]
  const result = getFontFaceEachString('Playfair Display', config)
  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBe(2)
  expect(result[0]).toContain('font-weight: 400')
  expect(result[1]).toContain('font-weight: 700')
  expect(result[0]).toContain("format('woff2')")
})

test('Google Webfonts: JetBrains Mono variable', () => {
  const config = {
    url: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap',
    isVariable: true,
    fontWeight: '100 800'
  }
  const result = getFontFaceEachString('JetBrains Mono', config)
  expect(result).toContain('@import url(')
  expect(result).toContain('JetBrains+Mono')
})

test('Google Webfonts: Fira Code self-hosted variable woff2', () => {
  const config = {
    url: '/fonts/FiraCode-Variable.woff2',
    isVariable: true,
    fontWeight: '300 700',
    fontDisplay: 'swap'
  }
  const result = getFontFaceEachString('Fira Code', config)
  expect(result).toContain('@font-face')
  expect(result).toContain("font-family: 'Fira Code'")
  expect(result).toContain('font-weight: 300 700')
  expect(result).toContain('font-display: swap')
  expect(result).toContain("format('woff2')")
  expect(result).not.toContain('@import')
})

test('Google Webfonts: Recursive variable with all options', () => {
  const config = {
    url: '/fonts/Recursive-Variable.woff2',
    isVariable: true,
    fontWeight: '300 1000',
    fontStretch: '75% 125%',
    fontDisplay: 'block'
  }
  const result = getFontFaceEachString('Recursive', config)
  expect(result).toContain('font-weight: 300 1000')
  expect(result).toContain('font-stretch: 75% 125%')
  expect(result).toContain('font-display: block')
})

// --- setFont integration ---

test('setFont with isVariable Google Fonts returns @import fontFace', () => {
  const val = {
    url: 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap',
    isVariable: true,
    fontWeight: '100 900'
  }
  const result = setFont(val, 'Inter')
  expect(result.var).toBe('--font-Inter')
  expect(result.value).toBe(val)
  expect(result.fontFace).toContain('@import url(')
})

test('setFont with isVariable self-hosted returns @font-face', () => {
  const val = {
    url: '/fonts/Inter-Variable.woff2',
    isVariable: true,
    fontWeight: '100 900'
  }
  const result = setFont(val, 'Inter')
  expect(result.fontFace).toContain('@font-face')
  expect(result.fontFace).toContain('font-weight: 100 900')
  expect(result.fontFace).toContain('font-display: swap')
})

test('setFont with traditional array format still works', () => {
  const val = [
    { url: '/fonts/Inter-Regular.woff2', fontWeight: 400 },
    { url: '/fonts/Inter-Bold.woff2', fontWeight: 700 }
  ]
  const result = setFont(val, 'Inter')
  expect(Array.isArray(result.fontFace)).toBe(true)
  expect(result.fontFace.length).toBe(2)
})

test('setFont with single object (no isVariable) still works', () => {
  const val = { url: '/fonts/Inter.woff2' }
  const result = setFont(val, 'Inter')
  expect(result.fontFace).toContain('@font-face')
})

test('setFont returns undefined for empty array', () => {
  expect(setFont([], 'test')).toBeUndefined()
})

test('setFont returns undefined for null', () => {
  expect(setFont(null, 'test')).toBeUndefined()
})
