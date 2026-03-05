'use strict'

export const registerFrameListener = el => {
  if (!el || !el.__ref) {
    throw new Error('Element reference is invalid')
  }

  const { __ref: ref } = el

  if (!ref.root) {
    throw new Error('Root reference is invalid')
  }

  if (!ref.root.data) {
    throw new Error('Data are undefined')
  }

  const { frameListeners } = ref.root.data

  // Check if frameListeners exists and the element is not already in the Set
  if (frameListeners && !frameListeners.has(el)) {
    frameListeners.add(el) // Add the element to the Set
  }
}

const processFrameListeners = (frameListeners) => {
  for (const element of frameListeners) {
    // Cache the handler on first use to avoid repeated property lookups per frame
    if (!element.__ref.__frameHandler) {
      const handler = element.on?.frame || element.onFrame || element.props?.onFrame
      if (handler) element.__ref.__frameHandler = handler
      else {
        frameListeners.delete(element)
        continue
      }
    }

    if (!element.node?.parentNode) {
      frameListeners.delete(element)
      delete element.__ref.__frameHandler
    } else {
      try {
        element.__ref.__frameHandler(element, element.state, element.context)
      } catch (e) {
        console.warn(e)
        frameListeners.delete(element)
        delete element.__ref.__frameHandler
      }
    }
  }
}

const startFrameLoop = (frameListeners) => {
  if (_frameRunning) return
  _frameRunning = true

  function requestFrame () {
    if (frameListeners.size === 0) {
      _frameRunning = false
      return
    }
    processFrameListeners(frameListeners)
    window.requestAnimationFrame(requestFrame)
  }

  window.requestAnimationFrame(requestFrame)
}

export const applyAnimationFrame = element => {
  if (!element) {
    throw new Error('Element is invalid')
  }
  const { on, props, __ref: ref } = element
  if (!ref.root || !ref.root.data) return
  const { frameListeners } = ref.root.data

  // Register if any of the frame handlers exists
  if (frameListeners && (on?.frame || element.onFrame || props?.onFrame)) {
    registerFrameListener(element)
    startFrameLoop(frameListeners)
  }
}

let _frameRunning = false

export const initAnimationFrame = () => {
  const frameListeners = new Set()

  startFrameLoop(frameListeners)

  return frameListeners
}
