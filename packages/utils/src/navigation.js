'use strict'

export const filterHrefs = (sitemap) => {
  return Object.values(sitemap)
    .map(({ href, sub_links }) => // eslint-disable-line
      [href, sub_links.map(({ href }) => href) // eslint-disable-line
        .filter(v => v.indexOf('#') === -1)]
        .filter(v => v.length > 0)
    )
}

export const findCurrentIndex = (sitemap) => { // eslint-disable-line
  const { pathname } = window.location
  const hrefArray = filterHrefs(sitemap)
  let index

  hrefArray.forEach((v, k) => {
    if (v[0] === pathname) index = k
    if (v[1] && v[1].indexOf(pathname) > -1) {
      const i = v[1].indexOf(pathname)
      index = `${k}.${i}`
    }
  })

  return { active: index }
}

/** Parses sitemap and detects current, active, and previous pages from current url path */
export const setPaginationNames = (sitemap) => {
  const { pathname } = window.location
  const hrefArray = filterHrefs(sitemap)
  const state = {}

  hrefArray.forEach((v, k) => {
    const categoryRoute = v[0]
    const subcategoryRoutes = v[1]
    const previousCat = sitemap[k - 1]
    const activeCat = sitemap[k]
    const nextCat = sitemap[k + 1]

    const isRootCategory = categoryRoute === pathname
    const isSubcategory = subcategoryRoutes && subcategoryRoutes.indexOf(pathname) > -1

    if (isRootCategory) {
      const previousSubcat = hrefArray[k - 1] && hrefArray[k - 1][1] && previousCat.sub_links[previousCat.sub_links.length - 1]
      const nextSubcat = subcategoryRoutes && activeCat.sub_links[0]

      state.previous = previousSubcat || previousCat
      state.active = activeCat
      state.next = nextSubcat || nextCat
      state.moveOn = nextSubcat && nextCat
    } else if (isSubcategory) {
      const i = subcategoryRoutes.indexOf(pathname)
      const activeSubcat = activeCat.sub_links[i]
      const previousSubcat = subcategoryRoutes[i - 1] && activeCat.sub_links[i - 1]
      const nextSubcat = subcategoryRoutes[i + 1] && activeCat.sub_links[i + 1]

      state.previous = previousSubcat || activeCat
      state.active = activeSubcat
      state.next = nextSubcat || nextCat
      state.moveOn = nextSubcat && nextCat
    }
  })

  return state
}
