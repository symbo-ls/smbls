'use strict'

export const toggleFullscreen = async (el) => {
  if (!document.fullscreenElement && el.node) {
    try {
      await el.node.requestFullscreen()
    } catch (err) {
      console.warn(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`)
    }
  } else {
    await document.exitFullscreen()
  }
}
