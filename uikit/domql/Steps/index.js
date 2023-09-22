'use strict'

import { Flex } from '@symbo.ls/atoms'
import { ProgressLine } from '@symbo.ls/progress'

export const Step = {
  extend: Flex,
  props: {
    boxSize: 'fit-content',
    align: 'center flex-start',
    gap: 'Y+V'
  },

  CheckIndicatorWithLabel: {},
  ProgressLine: {
    props: {
      value: 1,
      height: 'W',
      minWidth: 'E',
      maxWidth: 'E'
      // isActive: true, // or if `state.isActive` exists
      // '.isActive': {
      //   background: 'blue'
      // }
    }
  }
}

export const Steps = {
  extend: Flex,
  props: {
    boxSize: 'fit-content fit-content',
    align: 'center flex-start',
    gap: 'Y+V',
    childProps: {
      ':last-child > progress': { display: 'none' }
    }
  },

  childExtend: Step,
  ...[
    {},
    {},
    {},
    {},
    {}
  ]
}

export const ProgressLineSteps = {
  extend: Flex,
  props: {
    boxSize: 'fit-content',
    gap: 'Y'
  },

  childExtend: {
    extend: ProgressLine,
    props: {
      value: 1,
      height: 'Y',
      minWidth: 'F',
      round: 'X'
    }
  },

  ...[
    {},
    {},
    { props: { value: 0 } },
    { props: { value: 0 } }
  ]
}

// const Step = {
//   tag: 'label',
//   extend: Flex,

//   props: {
//     cursor: 'pointer',
//     align: 'center flex-start'
//   },

//   Input: {
//     type: 'checkbox',
//     display: 'none',
//     ':checked + div': {
//       theme: 'primary',
//       border: 'none'
//     },
//     ':checked + div > svg': { opacity: '1' },
//     ':checked ~ span': {
//       theme: 'primary'
//     }
//   },

//   Flex: {
//     props: {
//       boxSize: 'B1',
//       border: '2px solid #313141',
//       round: '100%',
//       align: 'center center'
//     },
//     Icon: {
//       fontSize: 'C2',
//       opacity: '0',
//       name: 'checkmark'
//     }
//   },

//   Caption: ({ key }) => ({
//     text: 'Step ' + (parseInt(key) + 1),
//     padding: '- Y2 - Z1'
//   }),

//   Span_line: {
//     if: ({ parent }) => parent.key !== '0',
//     props: {
//       boxSize: '2px D',
//       background: '#313141',
//       margin: '- A - -',
//       order: -1,
//       round: 'Z'
//     }
//   }
// }

// export const Steps = {
//   extend: Flex,

//   props: {
//     position: 'relative',
//     gap: 'Y2',
//     zIndex: '2',
//     options: [{}, {}, {}, {}]
//   },

//   childExtend: Step,

//   $setPropsCollection: ({ props }) => props.options
// }
