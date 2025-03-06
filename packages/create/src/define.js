'use strict'

export const defaultDefine = {
  routes: param => param,
  // deps: (param, el) => param || el.parent.deps,

  $router: async (param, el) => {
    if (!param) return

    const obj = { tag: 'fragment', ...param }

    const set = async () => {
      await el.set(obj, { preventDefineUpdate: '$router' })
    }

    if (el.props && el.props.lazyLoad) {
      window.requestAnimationFrame(set)
    } else await set()

    return obj
  }
}
