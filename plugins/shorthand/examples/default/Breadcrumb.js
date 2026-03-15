export const Breadcrumb = {
  tag: 'nav',
  childExtends: 'Link',
  display: 'flex',
  align: 'center',
  childProps: {
    fontWeight: '400',
    textDecoration: 'none',
    scrollToTop: false,
    color: 'white 0.35',
    '&[href]': {
      color: 'title',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    '&:not([href])': {
      cursor: 'default',
    },
    '&:not(:first-child):before': {
      content: '""',
      display: 'inline-block',
      width: '2px',
      height: '2px',
      borderRadius: '100%',
      background: 'white',
      verticalAlign: '0.2em',
      marginInline: '.65em',
      opacity: '.5',
    },
  },
  children: (el, s, ctx) => {
  const routeArr = (s.root.route || window.top.location.pathname).split('/').slice(1)
  return routeArr
    .map((text, i) => text === 'page' ? ({
      href: '/pages',
      text: 'Page'
    }) : el.getData('pages')['/' + text] ? ({
      href: '/' + routeArr.slice(0, i + 1).join('/'),
      text: '/' + text
    }) : ({
      href: '/' + routeArr.slice(0, i + 1).join('/'),
      text: i === 0 ? ctx.utils.toTitleCase(text) : text
    }))
    .filter((_, k) => {
      const v = routeArr[k]
      return !v.includes('-') && !v.includes('editor') && !v.includes('preview')
    })
  },
};