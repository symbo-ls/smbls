'use strict'

import { Shape, Position, Block, Text } from '..'

import { RESPONSIVE } from '@symbo.ls/scratch'

export const Box = {
  proto: [Shape, Position, Block, Text],

  on: {
    init: (el, s) => {
      const { props } = el
      for (const screen in props) {
        if (screen.slice(0, 1) === '@') {
          const screenName = screen.slice(1)
          const responsiveKey = `@media screen and ${RESPONSIVE[screenName]}`
          const screenProps = props[screen]
          const calculatedScreenProps = {}

          for (const prop in screenProps) {
            // if (!el.class || !el.class[prop]) return
            // const classProp = el.class[prop]
            const classProp = el.class[prop]
            if (typeof classProp !== 'function') continue
            const calculatedProp = classProp({ props: screenProps })
            for (const finalProp in calculatedProp) {
              calculatedScreenProps[finalProp] = calculatedProp[finalProp]
            }
          }

          const { responsive } = el.class
          if (responsive) responsive[responsiveKey] = calculatedScreenProps
          else {
            el.class.responsive = {
              [responsiveKey]: calculatedScreenProps
            }
          }
        }
      }
      // el.class.responsive = mediaScreens
      // console.log(mediaScreens)
      // if (mediaScreens.mobile) console.log(mediaScreens)
    }
  }
}
