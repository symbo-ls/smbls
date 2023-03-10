'use strict'

// import { init } from '@symbo.ls/init'

// create SVG symbol
export const Svg = {
  tag: 'svg',
  props: {
    style: { '*': { fill: 'currentColor' } }
  },
  attr: {
    xmlns: 'http://www.w3.org/2000/svg',
    'xmlns:xlink': 'http://www.w3.org/1999/xlink'
  },
  html: ({ key, props, context, ...el }) => {
    const { designSystem, packages } = context
    const SVG = designSystem && designSystem.SVG
    const useSvgSprite = props.spriteId || (context.designSystem && context.designSystem.useSvgSprite)
    const useSVGSymbol = icon => `<use xlink:href="#${icon}" />`

    const init = (packages && packages.init) || require('@symbo.ls/init').init

    if (!useSvgSprite && props.src) return props.src

    const spriteId = props.spriteId
    if (spriteId) return useSVGSymbol(spriteId)

    const symbolId = Symbol.for(props.src)
    let SVGKey = SVG[symbolId]
    if (SVGKey && SVG[SVGKey]) return useSVGSymbol(SVGKey)

    SVGKey = SVG[symbolId] = Math.random()
    if (props.src) {
      init({
        svg: { [SVGKey]: props.src }
      }, {
        document: context.document,
        emotion: context.emotion
      })
    }

    return useSVGSymbol(SVGKey)
  }
}
