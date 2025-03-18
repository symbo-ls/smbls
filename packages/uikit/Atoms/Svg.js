'use strict'

// create SVG symbol
export const Svg = {
  tag: 'svg',
  attr: {
    xmlns: 'http://www.w3.org/2000/svg',
    'xmlns:xlink': 'http://www.w3.org/1999/xlink'
  },
  html: (el) => {
    const { props, context } = el
    if (props.semantic_symbols) return
    if (props.html) return el.call('exec', props.html, el)

    const { designSystem, utils } = context
    const SVG = designSystem && designSystem.SVG
    const useSvgSprite = props.spriteId || (context.designSystem && context.designSystem.useSvgSprite)

    const src = el.call('exec', props.src, el)
    if (!useSvgSprite && src) return src

    const useSVGSymbol = icon => `<use xlink:href="#${icon}" />`

    const spriteId = props.spriteId
    if (spriteId) return useSVGSymbol(spriteId)

    const symbolId = Symbol.for(src)
    let SVGKey = SVG[symbolId]
    if (SVGKey && SVG[SVGKey]) return useSVGSymbol(SVGKey)

    SVGKey = SVG[symbolId] = Math.random()
    if (src) {
      utils.init({
        svg: { [SVGKey]: src }
      }, {
        document: context.document,
        emotion: context.emotion
      })
    }

    return useSVGSymbol(SVGKey)
  }
}
