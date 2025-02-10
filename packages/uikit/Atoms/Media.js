'use strict'

import { useCssInProps } from 'css-in-props'

// Main class assignment handler
const beforeClassAssign = (element, s, ctx) => {
  if (!element.context) return

  // console.group(element.key)
  // Initialize class names container
  const { props, __ref: ref } = element

  // // Handle global theme
  // const globalTheme = element.context.designSystem.globalTheme
  // if (globalTheme && props.theme && !props.themeModifier) {
  //   props.themeModifier = globalTheme
  // //   props.update({ themeModifier: globalTheme }, {
  // //     preventListeners: true,
  // //     preventRecursive: true,
  // //     isForced: true,
  // //     preventDefineUpdate: true
  // //   })
  // }

  // if (element.key === 'Logo') debugger

  // Process props in two passes
  // console.log('----')
  // console.log('before', ref.__class)
  ref.__class = useCssInProps(props, element, { unpack: false })
  // console.log('after', ref.__class)

  // console.error('yo')
  // console.log(CLASS_NAMES)

  // Handle spacing inheritance
  // const { parent } = element
  // if (parent?.props?.spacingRatio && parent.props.inheritSpacingRatio) {
  //   element.setProps({
  //     spacingRatio: parent.props.spacingRatio,
  //     inheritSpacingRatio: true
  //   }, {
  //     preventListeners: true,
  //     preventRecursive: true,
  //     isForced: true,
  //     preventDefineUpdate: true
  //   })
  // }

  // console.log(CLASS_NAMES)

  // console.log(CLASS_NAMES, className, ref.__class)
  // overwriteShallow(ref.__class, CLASS_NAMES)

  // console.groupEnd(element.key)
}

// Export Media component
export const Media = {
  on: { beforeClassAssign }
}
