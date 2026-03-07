export default {
  '*, *::before, *::after': {
    boxSizing: 'border-box',
    margin: '0',
    padding: '0'
  },
  html: {
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    fontFeatureSettings: '"ss01", "cv01", "cv03"'
  },
  body: {
    fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
    lineHeight: '1.6',
    overflowX: 'hidden'
  },
  a: {
    color: 'inherit',
    textDecoration: 'none'
  },
  img: {
    display: 'block',
    maxWidth: '100%'
  },
  'button, input, textarea, select': {
    fontFamily: 'inherit'
  },
  '::-webkit-scrollbar': {
    width: '4px'
  },
  '::-webkit-scrollbar-track': {
    background: 'transparent'
  },
  '::-webkit-scrollbar-thumb': {
    background: 'rgba(29,27,22,0.10)',
    borderRadius: '99px'
  }
}
