'use strict'

export const toggleFullscreen = async (el) => {
  if (!document.fullscreenElement) {
    try {
      await (el.node || document).requestFullscreen()
    } catch (err) {
      console.warn(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`)
    }
  } else {
    await document.exitFullscreen()
  }
}
