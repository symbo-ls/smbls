'use strict'

export const COLOR = {
  blue: '#213eb0',
  green: '#389d34',
  red: '#e15c55',
  yellow: '#EDCB38',
  orange: '#e97c16',
  transparent: 'rgba(0, 0, 0, 0)',
  black: 'black',
  gray: '#4e4e50',
  white: 'white',
  title: [
    '--gray 1 -168',
    '--gray 1 +168'
  ],
  caption: [
    '--gray 1 -68',
    '--gray 1 +68'
  ],
  paragraph: [
    '--gray 1 -42',
    '--gray 1 +42'
  ],
  disabled: [
    '--gray 1 -26',
    '--gray 1 +26'
  ],
  line: [
    '--gray 1 -16',
    '--gray 1 +16'
  ]
}

export const GRADIENT = {
  'gradient-blue-light': `linear-gradient(to right,
    rgba(4, 116, 242, 1),
    rgba(0, 48, 103, 1)
  )`,
  'gradient-blue-dark': `linear-gradient(to right,
    #0474F2,
    #003067
  )`,

  'gradient-dark': `linear-gradient(0deg,
    rgba(0,0,0,0.06) 0%,
    rgba(0,0,0,0.07) 100%
  )`,
  'gradient-dark-active': `linear-gradient(0deg,
    rgba(0,0,0,0.09) 0%,
    rgba(0,0,0,0.1) 100%
  )`,
  'gradient-light': `linear-gradient(
    0deg,
    rgba(255,255,255,0.05) 0%,
    rgba(255,255,255,0.06) 100%
  )`,
  'gradient-light-active': `linear-gradient(
    0deg,
    rgba(255,255,255,0.09) 0%,
    rgba(255,255,255,0.10) 100%
  )`,
  'gradient-colorful': `linear-gradient(60deg,
    #00A2E7 0%,
    #185DF3 31%,
    #1E54F0 36%,
    #8B4CCA 69%,
    #C66894 100%
  )`
}
