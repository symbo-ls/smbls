// 'use strict'

// // import { Modal } from './Modal'
// // import { Flex } from '@symbo.ls/atoms'
// // import { ParagraphButton } from '@symbo.ls/paragraphbutton'
// // import { CancelConfirmButtons } from '@symbo.ls/button'

// // const NUMBERS = [null, null, null, null]

// export const VerificationCode = {
//   // extend: Modal,
//   // props: {
//   //   maxWidth: 'G3',
//   //   gap: 'A2'
//   // },

//   // state: { value: NUMBERS },

//   // Header: {
//   //   props: { gap: 'A' },
//   //   Title: { h5: { text: 'Verify your email' } },
//   //   Paragraph: {
//   //     p: {
//   //       props: {
//   //         text: 'Verification code has been sent to you. Enter the code below.',
//   //         lineHeight: '1.5em'
//   //       }
//   //     }
//   //   }
//   // },

//   // Content: {
//   //   props: {
//   //     flow: 'column',
//   //     gap: 'A2'
//   //   },
//   //   Fields: {
//   //     extend: 'Flex',
//   //     props: {
//   //       justifyContent: 'space-between',
//   //       flex: '1'
//   //     },
//   //     // childExtend: {
//   //     //   // extend: NumberField,
//   //     //   NumberInput: {
//   //     //     props: ({ parent, state }) => ({
//   //     //       ...NumberField.NumberInput.props,
//   //     //       value: state.value[parent.key] || ''
//   //     //     }),
//   //     //     on: {
//   //     //       keydown: (event, { node }) => {
//   //     //         const { value } = node
//   //     //         if (value.length > 1) return false
//   //     //       },
//   //     //       keyup: (event, { parent, state }) => {
//   //     //         const { target, keyCode } = event
//   //     //         const { value } = target
//   //     //         const next = parent.nextElement()
//   //     //         const previous = parent.previousElement()

//   //     //         const isNumber = (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105)
//   //     //         const isBackspace = event.keyCode === 8 || event.keyCode === 46

//   //     //         target.select()

//   //     //         if (isNumber && value.length && next) next.NumberInput.node.focus()
//   //     //         if ((!value.length || isBackspace) && previous) previous.NumberInput.node.focus()

//   //     //         state.value[parent.key] = value
//   //     //       },
//   //     //       paste: (event, { state }) => {
//   //     //         event.preventDefault()
//   //     //         const paste = (event.clipboardData || window.clipboardData).getData('text')
//   //     //         if (!paste) return
//   //     //         const value = paste.split('')
//   //     //         state.update({ value }, { overwrite: 'shallow' })
//   //     //       }
//   //     //     }
//   //     //   }
//   //     // },

//   //     ...[{}, {}, {}, {}]
//   //   },

//   //   ParagraphButton: {
//   //     extend: ParagraphButton,
//   //     props: { padding: '- - - Y' }
//   //   }
//   // },

//   // Footer: {
//   //   props: {
//   //     justifyContent: 'flex-end',
//   //     padding: 'Y2 - - -'
//   //   },
//   //   Buttons: {
//   //     extend: CancelConfirmButtons,
//   //     props: { childProps: { ':first-child': { border: 'none' } } },
//   //     ...[
//   //       { Caption: { text: 'Cancel' } },
//   //       { Caption: { text: 'Verify' } }
//   //     ]
//   //   }
//   // }
// }
