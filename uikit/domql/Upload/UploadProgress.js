'use strict'

export const UploadProgress = {
  props: {
    position: 'relative',
    height: 'Y2',
    minWidth: 'G1',
    theme: 'tertiary',
    round: 'W',
    overflow: 'hidden',
    margin: 'auto - - -'
  },

  Box: {
    props: ({ state }) => ({
      position: 'absolute',
      theme: 'primary',
      left: '0',
      top: '0',
      round: 'V',
      bottom: '0',
      width: state.progress ? state.progress + '%' : '30%'
    })
  }
}
