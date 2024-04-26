'use strict'

export const DatePickerDay = {
  extend: 'Button',
  state: true,

  props: ({ state, key }) => {
    const rootState = state.parent.parent.parent
    const date = new Date(state._d)
    const isSelected = rootState.activeDay === date.toString()
    const gridColumnStart = 7 - state.parent.weekItems.weeks[0].dates.length
    const { moment } = state
    moment._d = date
    const isWeekend = moment.day() === 0 || moment.day() === 6
    // const isWeekend = state.moment.day() === 0 || state.moment.day() === 6
    // const isWeekend = state.moment.isWeekend

    return {
      isSelected,
      isWeekend,
      date: date.toString(),
      textAlign: 'center',
      fontSize: 'Z1',
      round: '100%',
      height: 'B1',
      aspectRatio: '1/1',
      lineHeight: '.9',
      background: 'transparent',
      theme: 'field @dark .color',
      text: parseInt(key) + 1,
      ':first-child': {
        style: { gridColumnStart }
      },
      '.isSelected': { theme: 'primary' },
      '!isSelected': {
        '.isWeekend': { opacity: '.5' },
        ':hover': { theme: 'field' }
      }
    }
  },

  on: {
    click: (event, element, state) => {
      state.parent.parent.parent.update({
        activeDay: element.props.date
      })
    }
  }
}
