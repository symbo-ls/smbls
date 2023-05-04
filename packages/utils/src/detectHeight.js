'use strict'

export const detectHeightOnInit = (element, state) => {
  const heightTimeout = setTimeout(() => {
    const { props } = element
    if (!state.clientHeight) {
      const { node: { clientHeight } } = element
      if (clientHeight) {
        state.clientHeight = clientHeight
      }
    }

    if (state.active) {
      if (props.height === 'auto') return
      element.update({
        props: { height: state.clientHeight }
      }, { preventInitUpdateListener: true, preventChildrenUpdate: true })
      const setAutoTimeout = setTimeout(() => {
        element.update({
          props: { height: 'auto' }
        }, { preventInitUpdateListener: true, preventChildrenUpdate: true })
        clearTimeout(setAutoTimeout)
      }, 450)
    } else {
      element.update({
        props: { height: '0' }
      }, { preventInitUpdateListener: true, preventChildrenUpdate: true })
    }
    clearTimeout(heightTimeout)
  })
}
