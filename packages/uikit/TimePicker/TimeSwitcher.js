'use strict'

const props = {
  boxSize: 'C B2',
  flow: 'column',
  overflow: 'hidden',
  round: 'Z',
  theme: 'field'
}

export const TimeSwitcher = {
  props,
  extends: 'Flex',

  childExtends: {
    extends: 'Button',
    props: {
      padding: '0',
      flex: '1',
      width: '100%',
      fontSize: 'Y',
      textTransform: 'uppercase',
      round: '0',
      background: 'transparent',
      color: 'currentColor',
      lineHeight: '1',
      isActive: ({ state, key }) => state.activeShift === key,
      '.isActive': { theme: 'primary' }
    },
    on: {
      click: (ev, { key, state }) => {
        state.update({ activeShift: key })
      }
    }
  },

  am: { text: 'am' },
  pm: { text: 'pm' }
}
