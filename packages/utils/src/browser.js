'use strict'

export const toggleFullscreen = (el) => {
  if (!document.fullscreenElement) {
    el.node.requestFullscreen().catch((err) => {
      console.warn(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`)
    })
  } else {
    document.exitFullscreen()
  }
}
