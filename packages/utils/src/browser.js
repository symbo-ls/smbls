'use strict'

export async function toggleFullscreen (opts) {
  if (!document.fullscreenElement) {
    try {
      await (this.node || document).requestFullscreen()
    } catch (err) {
      console.warn(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`)
    }
  } else {
    await document.exitFullscreen()
  }
}
