'use strict'

export const TimeSwitcher = {
  display: 'flex',
  boxSize: 'C B2',
  flow: 'column',
  overflow: 'hidden',
  round: 'Z',
  theme: 'field',

  childExtends: {
    extends: 'Button',
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
    '.isActive': { theme: 'primary' },
    onClick: (ev, { key, state }) => {
      state.update({ activeShift: key })
    }
  },

  Am: { text: 'am' },
  Pm: { text: 'pm' }
}
