'use strict'

export const COLOR = {
  transparent: 'rgba(0, 0, 0, 0)',
  black: 'black',
  gray: '#4e4e50',
  blue: '#0e80fd',
  indigo: '#50E1FF',
  green: '#59AC56',
  red: '#FE5B47',
  yellow: '#EDCB38',
  orange: '#E2862F',
  brown: '#7D6755',
  pink: '#FD8ABF',
  purple: '#7345AF',
  white: 'white',

  green2: '#04F214',
  blue2: '#0474F2',
  gray2: '#A3A3A8',
  gray3: '#1C1C1F',
  gray4: '#BDBDC1',

  title: ['--black 1', '--white 1'],
  caption: ['--gray 1 +16', '--gray4 1'],
  paragraph: ['--gray 1', '--gray 1 +65']
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
