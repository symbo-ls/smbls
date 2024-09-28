'use strict'

export const registerFrameListener = (el) => {
  const { __ref: ref } = el
  const { frameListeners } = ref.root.data

  // Check if frameListeners exists and the element is not already in the Set
  if (frameListeners && !frameListeners.has(el)) {
    frameListeners.add(el) // Add the element to the Set
  }
}
