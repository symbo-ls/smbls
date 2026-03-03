'use strict'

export const detectHeightOnInit = (element, state) => {
  const heightTimeout = setTimeout(() => {
    const { props } = element
    if (!state.clientHeight) {
      const {
        node: { clientHeight }
      } = element
      if (clientHeight) {
        state.clientHeight = clientHeight
      }
    }

    if (state.active) {
      if (props.height === 'auto') return
      element.setProps(
        {
          height: state.clientHeight
        },
        { preventBeforeUpdateListener: true, preventChildrenUpdate: true }
      )
      const setAutoTimeout = setTimeout(() => {
        element.setProps(
          {
            height: 'auto'
          },
          { preventBeforeUpdateListener: true, preventChildrenUpdate: true }
        )
        clearTimeout(setAutoTimeout)
      }, 450)
    } else {
      element.setProps(
        {
          height: '0'
        },
        { preventBeforeUpdateListener: true, preventChildrenUpdate: true }
      )
    }
    clearTimeout(heightTimeout)
  })
}
