'use strict'

export const registerFrameListener = (el) => el.__ref.root.data.frameListeners?.set(el, true)
