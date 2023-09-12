'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Button } from '@symbo.ls/button'

export const DropdownList = {
  extend: Flex,

  props: {
    padding: '0 Y',
    maxHeight: 'G',
    flow: 'column',
    theme: 'quaternary',
    overflow: 'hidden auto',
    style: { listStyleType: 'none' }
  },

  childExtend: {
    extend: Button,
    state: {},
    props: ({ key, state }) => ({
      active: state.active === key,
      position: 'relative',
      round: '0',
      align: 'center flex-end',
      flow: 'row-reverse',
      padding: 'Z2 C Z2 Y2',
      margin: '0',
      gap: 'Y2',
      theme: 'quaternary .child',

      ':hover': {
        style: {
          svg: { opacity: '0.5' }
        }
      },

      icon: {
        active: state.active === key,
        name: 'checkmark',
        opacity: '0.1',
        '.active': { opacity: '1' }
      },

      ':not(:first-child)': {
        '@dark': { border: 'gray4 .65, solid' },
        '@light': { border: 'gray11, solid' },
        borderWidth: '1px 0 0'
      }
    })
  }
}

export const DropdownParent = {
  props: {
    position: 'relative',
    zIndex: 999,
    style: {
      '&:hover': {
        zIndex: 1000,
        '& [dropdown]': {
          transform: 'translate3d(0,0,0)',
          opacity: 1,
          visibility: 'visible'
        }
      }
    }
  }
}

export const DropDownComponent = {
  extend: Flex,

  arrowButton: {
    extend: Button,
    props: { icon: { name: 'chevronRight' } }
  },
  CheckBoxWithImgWithLabel: {},
  UnitValue: {
    value: { text: '5' },
    unit: { text: 'MB' }
  },
  threeDotButton: {
    extend: Button,
    props: { icon: { name: 'moreHorizontal' } }
  },

  props: {
    align: 'center flex-start',
    height: 'fit-content',
    maxWidth: 'G+D',
    background: '#1C1C1F',
    padding: 'Z A',
    round: 'Z',
    gap: 'A',
    '& > button': {
      boxSize: 'fit-content fit-content',
      padding: '0',
      color: '#A3A3A8',
      background: 'transparent',
      fontSize: 'C'
    },
    UnitValue: {
      gap: 'Y',
      margin: '- - - auto'
    }
  }
}

export const DropDownComponent2 = {
  extend: DropDownComponent,

  arrowButton: {},
  CheckBoxWithImgWithLabel: null,
  CheckboxWithLabel: {},
  UnitValue: null,
  caption: { props: { text: 'Captions' } },

  props: {
    caption: {
      fontSize: 'Z',
      color: '#A3A3A8',
      margin: '- - - auto'
    }
  }
}

export const DropDownGroupList = {
  extend: Flex,
  childExtend: DropDownComponent2,
  ...[{}],
  props: {
    flow: 'column'
    // gap: 'Z'
  }
}

export const DropDownGroupListWithTitle = {
  extend: Flex,
  title: { text: 'Group name' },
  groupList: { extend: DropDownGroupList },
  props: {
    flow: 'column',
    gap: 'Z',
    title: {
      color: '#818186',
      fontSize: 'Z'
    }
  }
}

export const DropDownGroup = {
  extend: Flex,
  header: {
    title: { props: { text: 'Header' } }
  },
  content: {
    extend: Flex,
    Search: {},
    groupsContainer: {
      groups: {
        childExtend: DropDownGroupListWithTitle,
        ...[
          {
            title: null,
            groupList: {
              ...[{}, {}]
            }
          },
          {
            title: {},
            groupList: {
              ...[{}, {}, {}, {}, {}]
            }
          },
          {
            title: {},
            groupList: {
              ...[{}, {}, {}, {}, {}]
            }
          }
        ]
      }
    }
  },

  props: {
    flow: 'column',
    maxWidth: 'G+D',
    overflow: 'hidden',
    boxSizing: 'border-box',
    background: '#1C1C1F',
    round: 'Z',

    header: {
      padding: 'Z A',
      background: '#141416'
    },

    content: {
      boxSizing: 'border-box',
      padding: 'Z+X Z+X A Z+X',
      flow: 'column',
      flex: '1',

      Search: {
        width: '100%',
        minHeight: 'C+Y',
        padding: '- A',
        fontSize: 'Z',
        round: 'Z+X',
        Icon: { color: '#818186' }
      },

      groupsContainer: {
        overflow: 'hidden',
        position: 'relative',
        maxHeight: 'G+B',
        padding: 'V - - -',
        ':before': {
          content: '""',
          boxSize: 'B+Z 100%',
          background: 'linear-gradient(to bottom, rgba(28, 28, 31, 1) 0%, rgba(28, 28, 31, 0) 100%)',
          position: 'absolute',
          top: '0',
          left: '0',
          zIndex: '3'
        },
        ':after': {
          content: '""',
          boxSize: 'C 100%',
          background: 'linear-gradient(to top, rgba(28, 28, 31, 1) 0%, rgba(28, 28, 31, 0) 100%)',
          position: 'absolute',
          bottom: '-1px',
          left: '0',
          zIndex: '3'
        },

        groups: {
          maxHeight: 'G+B',
          padding: 'A -',
          style: {
            overflowY: 'auto',
            '::-webkit-scrollbar': { display: 'none' }
          },
          childProps: {
            gap: '0',
            title: {
              padding: 'Z+X -'
            },
            groupList: {
              childProps: {
                maxWidth: '100%',
                background: 'transparent',
                padding: 'Z Z Z X'
              }
            }
          }
        }
      }
    }

  }
}
