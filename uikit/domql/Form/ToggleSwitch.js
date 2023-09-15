'use strict'

import { Flex } from '@symbo.ls/atoms'

// export const ToggleSwitch = {
//   extend: Checkbox,
//   props: {
//     padding: 'Y',
//     round: 'B',
//     ':hover > div': { opacity: '1' }
//   },

//   Input: {},
//   Flex: {
//     props: {
//       boxSize: 'B C',
//       padding: '- W',
//       round: 'D',
//       opacity: '.5',
//       align: 'center flex-start',
//       background: '#CFCFD1',
//       border: 'none',
//       transition: 'opacity .15s ease',
//       '.checked': {
//         justifyContent: 'flex-end',
//         theme: 'primary'
//       }
//     },
//     Icon: null,
//     Circle: {
//       boxSize: 'A1 A1',
//       round: '100%',
//       background: 'currentColor',
//       boxShadow: '1px, 1px, Z, gray .2'
//     }
//   }
// }

export const ToggleSwithWithLabel = {
  extend: Flex,
  props: {
    gap: 'A',
    width: 'fit-content'
  },
  ToggleSwitch: {},
  FieldLabel: { padding: 'Z - - -' }
}
