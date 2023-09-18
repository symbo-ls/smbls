'use strict'

export * from './List'
export * from './ListWithLabel'
export * from './GroupList'
export * from './GroupListWithSearch'

// export const List = {
//   props: {
//     position: 'relative',
//     overflow: 'hidden',
//     round: 'Z+Y',
//     background: '#1C1C1F',
//     minWidth: 'F',
//     maxWidth: 'G',
//     ':before': {
//       content: '""',
//       position: 'absolute',
//       boxSize: 'A 100%',
//       top: '0',
//       left: '0',
//       zIndex: '2'
//     },
//     ':after': {
//       content: '""',
//       position: 'absolute',
//       boxSize: 'A 100%',
//       bottom: '0',
//       left: '0',
//       zIndex: '2'
//     }
//   },
//   Flex: {
//     props: {
//       flow: 'column',
//       maxHeight: 'G',
//       style: {
//         overflowY: 'auto',
//         '::-webkit-scrollbar': { display: 'none' }
//       }
//     },
//     childExtend: {
//       props: {
//         padding: 'A A+Y',
//         position: 'relative',
//         cursor: 'pointer',
//         ':after': {
//           content: '""',
//           boxSize: '100% 100%',
//           position: 'absolute',
//           top: '0',
//           left: '0',
//           opacity: '0',
//           transition: 'opacity .15s ease-in-out'
//         },
//         ':hover > *': { zIndex: '5' },
//         ':hover:after': { opacity: '1', zIndex: '4' },

//         childProps: { position: 'relative' }
//       }
//     }
//   }
// }

// export const ListTemplate = {
//   extend: List,
//   props: {
//     maxWidth: 'F',
//     ':before': { background: 'linear-gradient(to bottom, rgba(28, 28, 31, 1) 0%, rgba(28, 28, 31, 0) 100%)' },
//     ':after': { background: 'linear-gradient(to top, rgba(28, 28, 31, 1) 0%, rgba(28, 28, 31, 0) 100%)' }
//   },
//   Flex: {
//     childExtend: {
//       props: { ':after': { background: '#141416' } }
//     },
//     ...[
//       { span: { text: 'Label' } },
//       { span: { text: 'Label' } },
//       { span: { text: 'Label' } },
//       { span: { text: 'Label' } },
//       { span: { text: 'Label' } },
//       { span: { text: 'Label' } },
//       { span: { text: 'Label' } }
//     ]
//   }
// }

// export const List = {
//   props: {
//     overflow: 'hidden',
//     position: 'relative',
//     round: 'Z+Y',
//     ':before': {
//       content: '""',
//       position: 'absolute',
//       boxSize: 'A 100%',
//       top: '0',
//       left: '0',
//       zIndex: '3'
//     },
//     ':after': {
//       content: '""',
//       position: 'absolute',
//       boxSize: 'A 100%',
//       bottom: '0',
//       left: '0',
//       zIndex: '3'
//     },

//     listContainer: {
//       flow: 'column',
//       style: {
//         overflowY: 'auto',
//         '::-webkit-scrollbar': { display: 'none' }
//       },

//       childProps: {
//         padding: 'A A+Y',
//         position: 'relative',
//         ':after': {
//           content: '""',
//           boxSize: '100% 100%',
//           position: 'absolute',
//           top: '0',
//           left: '0',
//           opacity: '0'
//           // transition: 'opacity .1s ease-in-out'
//         },
//         ':hover > *': { zIndex: '5' },
//         ':hover:after': { opacity: '1', zIndex: '4' }
//       }
//     }
//   },

//   listContainer: {
//     extend: Flex,
//     childExtend: Flex,
//     ...[]
//   }
// }

// export const ListWithLabel = {
//   extend: Flex,

//   props: {
//     flow: 'column',
//     background: 'rgba(28, 28, 31, 1)',
//     round: 'Z+Y',
//     overflow: 'hidden',
//     maxWidth: 'F'
//   },

//   Title: {
//     props: {
//       text: 'Group name',
//       fontSize: 'Z',
//       color: '#818186',
//       padding: 'A A+Y'
//     }
//   },

//   List: {
//     props: {
//       round: '0',
//       background: '0',
//       maxWidth: '100%'
//     }
//   }
// }

// export const GroupList = {
//   Flex: {
//     childExtend: ListWithLabel
//   },

//   props: {
//     round: 'Z+Y',
//     overflow: 'hidden',
//     position: 'relative',
//     ':before': {
//       content: '""',
//       position: 'absolute',
//       boxSize: 'A 100%',
//       top: '0',
//       left: '0',
//       zIndex: '3'
//     },
//     ':after': {
//       content: '""',
//       position: 'absolute',
//       boxSize: 'A 100%',
//       bottom: '0',
//       left: '0',
//       zIndex: '3'
//     },

//     groups: {
//       flow: 'column',
//       style: {
//         overflowY: 'auto',
//         '::-webkit-scrollbar': { display: 'none' }
//       },
//       childProps: {
//         round: '0',
//         maxWidth: '100%',
//         overflow: 'visible',
//         list: {
//           ':before': null,
//           ':after': null,
//           listContainer: {
//             maxHeight: 'fit-content'
//           }
//         }
//       }
//     }
//   }
// }

// export const GroupListWithSearch = {
//   extend: Flex,

//   header: {
//     title: {
//       tag: 'h5',
//       props: { text: 'Header' }
//     }
//   },

//   content: {
//     extend: Flex,
//     searchContainer: { Search: {} },
//     groupList: { extend: GroupList }

//   },

//   props: {
//     flow: 'column',
//     round: 'Z+X',
//     overflow: 'hidden',

//     header: {
//       padding: 'Z A',
//       background: '#141416',
//       title: { fontSize: 'A' }
//     },

//     content: {
//       flow: 'column',
//       searchContainer: {
//         padding: 'Z+X Z+X Y Z+X',
//         Search: {
//           width: '100%',
//           minHeight: 'C+Z',
//           padding: '- A',
//           fontSize: 'Z',
//           round: 'Z+X',
//           Icon: { color: '#818186' }
//         }
//       },

//       groupList: {
//         maxWidth: '100%',
//         round: '0',
//         background: 'transparent',
//         childProps: {
//           childProps: {
//             list: {
//               listContainer: {
//                 childProps: {
//                   padding: 'A A+Z'
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }

// // templates

// export const ListTemplate = {
//   extend: List,
//   listContainer: {
//     childExtend: {
//       extend: Button,
//       span: {}
//     },
//     ...[
//       { props: { span: { text: 'Label' } } },
//       { props: { span: { text: 'Label' } } },
//       { props: { span: { text: 'Label' } } },
//       { props: { span: { text: 'Label' } } },
//       { props: { span: { text: 'Label' } } },
//       { props: { span: { text: 'Label' } } },
//       { props: { span: { text: 'Label' } } }
//     ]
//   },

//   props: {
//     background: 'rgba(28, 28, 31, 1)',
//     maxWidth: 'F',
//     ':before': { background: 'linear-gradient(to bottom, rgba(28, 28, 31, 1) 0%, rgba(28, 28, 31, 0) 100%)' },
//     ':after': { background: 'linear-gradient(to top, rgba(28, 28, 31, 1) 0%, rgba(28, 28, 31, 0) 100%)' },

//     listContainer: {
//       maxHeight: 'G',
//       childProps: {
//         color: 'white',
//         background: 'transparent',
//         align: 'center flex-start',
//         round: '0',
//         cursor: 'pointer',
//         position: 'relative',
//         ':after': { background: '#141416' }
//       }
//     }
//   }
// }

// export const ListWithLabelTemplate = {
//   extend: ListWithLabel,
//   label: {},
//   list: { extend: ListTemplate }
// }

// export const GroupListTemplate = {
//   extend: GroupList,
//   groups: {
//     childExtend: ListWithLabelTemplate,
//     ...[{}, {}]
//   },

//   props: {
//     background: 'rgba(28, 28, 31, 1)',
//     maxWidth: 'G',
//     ':before': { background: 'linear-gradient(to bottom, rgba(28, 28, 31, 1) 0%, rgba(28, 28, 31, 0) 100%)' },
//     ':after': { background: 'linear-gradient(to top, rgba(28, 28, 31, 1) 0%, rgba(28, 28, 31, 0) 100%)' },
//     groups: {
//       maxHeight: 'H'
//     }
//   }
// }

// export const GroupListWithSearchTemplate = {
//   extend: GroupListWithSearch,

//   header: {},
//   content: {
//     searchContainer: { Search: {} },
//     groupList: { extend: GroupListTemplate }
//   },

//   props: {
//     maxWidth: 'G+D',
//     background: 'rgba(28, 28, 31, 1)'
//   }
// }
